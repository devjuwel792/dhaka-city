export interface ApiSource {
  /** Human-readable provider name. */
  name: string;
  /** Homepage / docs URL for attribution. */
  url?: string;
  /** Short attribution string to show in the UI. */
  attribution?: string;
  /** Data license (e.g. "CC BY 4.0"). */
  license?: string;
}

export type ApiErrorType =
  | "network"
  | "timeout"
  | "aborted"
  | "http"
  | "parse"
  | "validation"
  | "unavailable"
  | "unknown";

export interface ApiErrorInfo {
  type: ApiErrorType;
  message: string;
  /** HTTP status code, when applicable. */
  status?: number;
  /** Whether retrying the request could succeed. */
  retryable: boolean;
}

/**
 * Standard response envelope returned by every request in the API layer.
 *
 * Contract guarantees:
 * - A failed request NEVER returns fabricated live data.
 * - `isDemo: true` means the payload is explicitly demo/seed data (opt-in only).
 * - `fetchedAt` is the ISO timestamp of the successful fetch (or cache store time).
 * - `isCached` is true when served from memory/localStorage cache.
 */
export interface ApiResponse<T> {
  data: T | null;
  source: ApiSource;
  fetchedAt: string | null;
  isCached: boolean;
  isDemo: boolean;
  error: ApiErrorInfo | null;
}

export type ApiHealthStatus = "healthy" | "degraded" | "down" | "unknown";

export interface ApiHealthSnapshot {
  name: string;
  status: ApiHealthStatus;
  lastSuccessAt: string | null;
  lastErrorAt: string | null;
  lastError: string | null;
  consecutiveFailures: number;
}

export interface CacheEntry<T> {
  value: T;
  storedAt: string;
  expiresAt: number;
}

export interface RequestOptions<T> {
  /** Absolute request URL (query string included). */
  url: string;
  /** Source metadata attached to the response. */
  source: ApiSource;
  /** Runtime validator that narrows `unknown` to `T`. Throws on invalid shape. */
  validate?: (raw: unknown) => T;
  /** Cache TTL in ms. Defaults to the global default. */
  ttlMs?: number;
  /** Persist to localStorage in addition to memory. Default: false. */
  persist?: boolean;
  /** Retries after the first attempt. Default: global config. */
  retries?: number;
  /** Per-attempt timeout in ms. Default: global config. */
  timeoutMs?: number;
  /** External AbortSignal for caller-initiated cancellation. */
  signal?: AbortSignal;
  /** Injectable fetch (mainly for tests). */
  fetcher?: typeof fetch;
  /** Extra RequestInit merged into the fetch call. */
  init?: RequestInit;
  /**
   * Opt-in demo fallback. If provided and all real attempts fail, it is returned
   * with `isDemo: true` and the original error is preserved. It is never merged
   * into the live path and never presented as live data.
   */
  demo?: () => T;
}