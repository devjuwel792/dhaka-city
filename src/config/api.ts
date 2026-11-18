import type { ApiSource } from "@/types/api";

/**
 * Centralized API configuration. Frontend-only: public, key-less endpoints only.
 * No secrets/credentials belong here or anywhere in client code.
 */
export const API_CONFIG = {
  /** Per-attempt timeout (ms). */
  timeoutMs: 8000,
  /** Retries after the first attempt. */
  retries: 2,
  /** Exponential backoff base delay (ms). */
  retryBaseDelayMs: 500,
  /** Exponential backoff ceiling (ms). */
  retryMaxDelayMs: 4000,
  /** Default cache TTL (ms). */
  defaultCacheTtlMs: 5 * 60 * 1000,
  /** localStorage cache settings. */
  localStorage: {
    enabled: true,
    keyPrefix: "dhaka-city:api-cache:",
    maxEntries: 50,
  },
} as const;

/** Public, no-key APIs. All must allow browser CORS (see docs/API_INTEGRATION.md). */
export const API_ENDPOINTS = {
  openMeteo: {
    weather: "https://api.open-meteo.com/v1/forecast",
    airQuality: "https://air-quality-api.open-meteo.com/v1/air-quality",
    geocoding: "https://geocoding-api.open-meteo.com/v1/search",
    source: {
      name: "Open-Meteo",
      url: "https://open-meteo.com/",
      attribution: "Weather data by Open-Meteo.com",
      license: "CC BY 4.0",
    } satisfies ApiSource,
  },
  gdelt: {
    doc: "https://api.gdeltproject.org/api/v2/doc/doc",
    source: {
      name: "GDELT Project",
      url: "https://www.gdeltproject.org/",
      attribution: "News search via the GDELT DOC 2.0 API",
      license: "Public / open",
    } satisfies ApiSource,
  },
} as const;

/** Default coordinates for Dhaka (used when no location is supplied). */
export const DHAKA_COORDS = { lat: 23.8103, lon: 90.4125 } as const;