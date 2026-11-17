import { API_CONFIG } from "@/config/api";

export interface RetryOptions {
  retries: number;
  baseDelayMs: number;
  maxDelayMs: number;
  /** Decide whether an error is worth retrying. */
  shouldRetry?: (error: unknown, attempt: number) => boolean;
  /** Called before each sleep, useful for abort-aware cancellation. */
  onRetry?: (attempt: number, delayMs: number) => void;
  /** Abort-aware sleep: rejects immediately if the signal aborts. */
  signal?: AbortSignal;
}

const sleep = (ms: number, signal?: AbortSignal): Promise<void> =>
  new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }
    function onAbort() {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    }
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    signal?.addEventListener("abort", onAbort, { once: true });
  });

/** Limited exponential backoff with jitter. */
export async function withRetry<T>(fn: () => Promise<T>, options: RetryOptions): Promise<T> {
  const {
    retries,
    baseDelayMs,
    maxDelayMs,
    shouldRetry = () => true,
    onRetry,
    signal,
  } = options;

  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      const canRetry = attempt < retries && shouldRetry(error, attempt);
      if (!canRetry) break;

      const exponential = baseDelayMs * 2 ** attempt;
      const capped = Math.min(exponential, maxDelayMs);
      const jitter = Math.random() * (capped * 0.25);
      const delay = Math.round(capped + jitter);
      onRetry?.(attempt + 1, delay);
      await sleep(delay, signal);
    }
  }
  throw lastError;
}

export const defaultRetryOptions: Omit<RetryOptions, "shouldRetry"> = {
  retries: API_CONFIG.retries,
  baseDelayMs: API_CONFIG.retryBaseDelayMs,
  maxDelayMs: API_CONFIG.retryMaxDelayMs,
};