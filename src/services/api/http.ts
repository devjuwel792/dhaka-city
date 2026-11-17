import type { ApiResponse, ApiErrorInfo, RequestOptions } from "@/types/api";
import { API_CONFIG } from "@/config/api";
import { getCached, setCached } from "./cache";
import { dedupe } from "./dedup";
import { withRetry } from "./retry";
import { recordSuccess, recordFailure } from "./health";
import { ValidationError } from "./validators";

class RequestError extends Error {
  info: ApiErrorInfo;
  constructor(info: ApiErrorInfo) {
    super(info.message);
    this.name = "RequestError";
    this.info = info;
  }
}

function isAbortError(err: unknown): boolean {
  return err instanceof DOMException && err.name === "AbortError";
}

function toErrorInfo(err: unknown): ApiErrorInfo {
  if (err instanceof RequestError) return err.info;
  if (isAbortError(err)) {
    return { type: "aborted", message: "Request aborted", retryable: false };
  }
  if (err instanceof ValidationError) {
    return { type: "validation", message: err.message, retryable: false };
  }
  if (err instanceof Error) {
    // Network failures (includes CORS/opaque failures surfaced as TypeError).
    return { type: "network", message: err.message, retryable: true };
  }
  return { type: "unknown", message: String(err), retryable: false };
}

interface FetchAttemptOptions<T> extends RequestOptions<T> {
  fetcher: typeof fetch;
}

/** Single fetch attempt with AbortController timeout + external cancellation. */
async function fetchAttempt<T>(opts: FetchAttemptOptions<T>): Promise<T> {
  const timeoutMs = opts.timeoutMs ?? API_CONFIG.timeoutMs;
  const controller = new AbortController();
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);

  const external = opts.signal;
  const onExternalAbort = () => controller.abort();
  if (external) {
    if (external.aborted) controller.abort();
    else external.addEventListener("abort", onExternalAbort, { once: true });
  }

  try {
    const res = await opts.fetcher(opts.url, {
      ...opts.init,
      signal: controller.signal,
    });

    if (!res.ok) {
      const retryable = res.status >= 500 || res.status === 429;
      throw new RequestError({
        type: res.status === 503 ? "unavailable" : "http",
        message: `HTTP ${res.status}${res.statusText ? ` ${res.statusText}` : ""}`,
        status: res.status,
        retryable,
      });
    }

    let raw: unknown;
    try {
      raw = await res.json();
    } catch {
      throw new RequestError({
        type: "parse",
        message: "Failed to parse JSON response",
        retryable: false,
      });
    }

    if (!opts.validate) return raw as T;
    try {
      return opts.validate(raw);
    } catch (err) {
      if (err instanceof ValidationError) {
        throw new RequestError({ type: "validation", message: err.message, retryable: false });
      }
      throw err;
    }
  } catch (err) {
    if (timedOut) {
      throw new RequestError({
        type: "timeout",
        message: `Request timed out after ${timeoutMs}ms`,
        retryable: true,
      });
    }
    if (isAbortError(err)) {
      throw new RequestError({ type: "aborted", message: "Request aborted", retryable: false });
    }
    throw err;
  } finally {
    clearTimeout(timer);
    if (external) external.removeEventListener("abort", onExternalAbort);
  }
}

function okResponse<T>(
  opts: RequestOptions<T>,
  data: T,
  fetchedAt: string,
  isCached: boolean,
): ApiResponse<T> {
  return {
    data,
    source: opts.source,
    fetchedAt,
    isCached,
    isDemo: false,
    error: null,
  };
}

function errorResponse<T>(opts: RequestOptions<T>, error: ApiErrorInfo): ApiResponse<T> {
  // Demo fallback is opt-in and always flagged isDemo:true, never presented as live.
  if (opts.demo) {
    return {
      data: opts.demo(),
      source: opts.source,
      fetchedAt: null,
      isCached: false,
      isDemo: true,
      error,
    };
  }
  return {
    data: null,
    source: opts.source,
    fetchedAt: null,
    isCached: false,
    isDemo: false,
    error,
  };
}

/**
 * Central request function used by every API module.
 * Implements: cache -> dedupe -> retry(backoff) -> timeout -> validate ->
 * health tracking. Always resolves with an ApiResponse envelope; failures
 * surface via `error` with `data: null` (never fabricated live data).
 */
export async function request<T>(opts: RequestOptions<T>): Promise<ApiResponse<T>> {
  const fetcher = opts.fetcher ?? fetch;
  const ttlMs = opts.ttlMs ?? API_CONFIG.defaultCacheTtlMs;
  const cacheKey = opts.url;

  const cached = getCached<T>(cacheKey);
  if (cached) {
    return okResponse(opts, cached.value, cached.storedAt, true);
  }

  return dedupe(cacheKey, async (): Promise<ApiResponse<T>> => {
    const retries = opts.retries ?? API_CONFIG.retries;

    try {
      const data = await withRetry(() => fetchAttempt<T>({ ...opts, fetcher }), {
        retries,
        baseDelayMs: API_CONFIG.retryBaseDelayMs,
        maxDelayMs: API_CONFIG.retryMaxDelayMs,
        signal: opts.signal,
        shouldRetry: (error) => error instanceof RequestError && error.info.retryable,
      });

      const entry = setCached(cacheKey, data, ttlMs);
      recordSuccess(opts.source.name);
      return okResponse(opts, data, entry.storedAt, false);
    } catch (err) {
      const info = toErrorInfo(err);
      recordFailure(opts.source.name, info.message);
      return errorResponse(opts, info);
    }
  });
}