# API INTEGRATION FOUNDATION — Dhaka City Smart Dashboard

> Frontend-only data layer built on the browser `fetch()` API. **No backend, no database, no proxy server, no paid APIs, no API keys or secrets.** Every request flows through one hardened pipeline and returns a standard envelope.

---

## ১. Core Principles

1. **Never fake live data.** A failed request returns `data: null` + a typed `error`. It is never replaced by fabricated "live" values.
2. **Demo data is explicit.** The legacy dashboard uses seeded mock data. When the API layer is wired to a demo source it is always flagged `isDemo: true` and carries the real `error`. Demo is opt-in per call (`options.demo`), never automatic.
3. **No secrets in the client.** Only public, key-less endpoints are used. There is nothing to leak.
4. **Every response is traceable.** `source` + `fetchedAt` + `isCached` + `isDemo` + `error` are always present.

---

## ২. Standard Response Envelope — `ApiResponse<T>`

Defined in `src/types/api.ts`.

```ts
interface ApiResponse<T> {
  data: T | null;        // payload on success, null on failure
  source: ApiSource;     // { name, url?, attribution?, license? }
  fetchedAt: string | null; // ISO timestamp of fetch/cache store
  isCached: boolean;     // true when served from memory/localStorage cache
  isDemo: boolean;       // true only for explicitly opted-in demo fallback
  error: ApiErrorInfo | null; // typed error on failure
}

interface ApiErrorInfo {
  type: "network" | "timeout" | "aborted" | "http" | "parse" | "validation" | "unavailable" | "unknown";
  message: string;
  status?: number;       // HTTP status when applicable
  retryable: boolean;    // whether a retry could succeed
}
```

Consumers should always branch on `response.error` and `response.data`, and may show `response.fetchedAt` as a "last updated" timestamp and `response.source.attribution` as credit.

---

## ৩. Architecture / Files

```
src/
  config/
    api.ts                # Centralized config: timeouts, retries, cache, endpoints, coords
  types/
    api.ts                # ApiResponse, ApiErrorInfo, RequestOptions, health/cache types
  services/api/
    http.ts               # Core request(): cache -> dedupe -> retry -> timeout -> validate
    cache.ts              # In-memory Map + optional localStorage (TTL, pruning)
    dedup.ts              # In-flight request de-duplication
    retry.ts              # Limited exponential backoff with jitter (+ abort-aware sleep)
    health.ts             # Per-source health tracking (healthy/degraded/down/unknown)
    validators.ts         # Runtime type guards + ValidationError
    openMeteo.ts          # Real key-less public API modules (weather, air quality)
    index.ts              # Barrel exports (mock services + foundation)
  hooks/
    useApiResource.ts     # React hook: runs a request with AbortController cancellation
```

The pre-existing mock services (`weather.ts`, `transit.ts`, `news.ts`, `cameras.ts`, `client.ts`) are untouched and still power the dashboard. The new foundation is **additive** and ready to be adopted per-view.

---

## ৪. Request Lifecycle (what `request()` does)

`request<T>(options)` in `src/services/api/http.ts`:

1. **Cache check (memory → localStorage).** Fresh entry ⇒ returns `isCached: true` with the stored `fetchedAt`.
2. **De-duplication.** Concurrent identical URLs share one in-flight promise (`dedup.ts`).
3. **Fetch with AbortController timeout.** Each attempt aborts after `timeoutMs`. An external `AbortSignal` (caller cancellation) is linked in.
4. **HTTP status validation.** `res.ok` is required. `5xx` and `429` are `retryable`; `503` maps to `type: "unavailable"`; other `4xx` are non-retryable `http`.
5. **JSON parse.** Parse failure ⇒ `type: "parse"`.
6. **Runtime validation.** `options.validate(raw)` narrows `unknown` → `T`; failure ⇒ `type: "validation"`.
7. **Retry with exponential backoff + jitter.** Only retryable errors repeat, up to `retries` times (`retry.ts`).
8. **Health tracking.** Success/failure recorded per source (`health.ts`).
9. **Envelope.** Success caches the value and returns `isCached: false`. Failure returns `data: null` (+ optional flagged demo).

Cancellation & timeout are distinct error types (`aborted` vs `timeout`), both surfaced in `error`.

---

## ৫. Configuration (no secrets)

`src/config/api.ts`:

| Setting | Default | Purpose |
|---------|---------|---------|
| `timeoutMs` | 8000 | per-attempt timeout |
| `retries` | 2 | retries after first attempt |
| `retryBaseDelayMs` | 500 | backoff base |
| `retryMaxDelayMs` | 4000 | backoff ceiling |
| `defaultCacheTtlMs` | 300000 | default cache TTL |
| `localStorage.enabled` | true | persist cache to localStorage |
| `localStorage.keyPrefix` | `dhaka-city:api-cache:` | key namespace |
| `localStorage.maxEntries` | 50 | prune oldest beyond this |

Endpoints and source attribution live here too. **Do not add secrets, tokens, or keys to this file or anywhere in client code.**

---

## ৬. Public APIs Documented

Only **public, key-less, CORS-enabled** APIs are integrated. Browser `fetch()` cannot bypass CORS; a provider that does not send `Access-Control-Allow-Origin` will fail with a `network` error (no proxy is used, by constraint).

### ৬.১ Open-Meteo — Weather (`getWeather`)

- **Endpoint:** `https://api.open-meteo.com/v1/forecast`
- **Docs:** https://open-meteo.com/en/docs
- **Auth:** none (free tier, no key)
- **CORS:** ✅ Fully supported (`Access-Control-Allow-Origin: *`) — works directly from the browser.
- **License / attribution:** CC BY 4.0 — "Weather data by Open-Meteo.com" (must be shown).
- **Params used:** `latitude`, `longitude`, `current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`, `daily=weather_code,temperature_2m_max,temperature_2m_min`, `timezone=auto`.
- **Returns:** `ApiResponse<OpenMeteoWeather>`.
- **Rate limits (free, approximate — verify with provider):** ~10,000/day, ~5,000/hour, ~600/min. Exceeding limits returns HTTP `429` (retryable).
- **Limitations:**
  - Data is **model-derived** (global/regional models), not a single physical station; local microclimate may differ.
  - Forecast horizon and variables are limited on the free tier.
  - No historical archive beyond the free allowance.
  - Availability/accuracy can change; always display `fetchedAt` + attribution.

### ৬.২ Open-Meteo — Air Quality (`getAirQuality`)

- **Endpoint:** `https://air-quality-api.open-meteo.com/v1/air-quality`
- **Docs:** https://open-meteo.com/en/docs/air-quality-api
- **Auth:** none (free tier, no key)
- **CORS:** ✅ Fully supported — browser-safe.
- **License / attribution:** CC BY 4.0 — "Weather data by Open-Meteo.com".
- **Params used:** `current=european_aqi,us_aqi,pm2_5,pm10,nitrogen_dioxide,ozone,sulphur_dioxide`, `timezone=auto`.
- **Returns:** `ApiResponse<OpenMeteoAirQuality>`.
- **Rate limits:** same free-tier family as the weather API (approximate).
- **Limitations:**
  - Modeled from CAMS (Copernicus) + satellite, **not** live ground sensors; treat as indicative.
  - Pollutant set is limited to the modeled variables above.
  - Same attribution and rate-limit caveats as weather.

### ৬.৩ Open-Meteo — Geocoding (`API_ENDPOINTS.openMeteo.geocoding`)

- **Endpoint:** `https://geocoding-api.open-meteo.com/v1/search`
- **Auth / CORS / License:** none / ✅ / CC BY 4.0.
- **Status:** Endpoint constant is defined for future location search; no wrapper function is exported yet (add `getGeocode()` following the `openMeteo.ts` pattern).
- **Limitations:** city-level search only; not reverse geocoding.

### CORS Compatibility Summary

| Provider | Endpoint | CORS | Key | Notes |
|----------|----------|------|-----|-------|
| Open-Meteo | forecast | ✅ | none | Primary weather source |
| Open-Meteo | air-quality | ✅ | none | Modeled AQI |
| Open-Meteo | geocoding | ✅ | none | City search (not yet wrapped) |

> Rule of thumb: if a provider lacks CORS, the browser cannot call it directly. Under the "no proxy" constraint, such providers are simply **not integrated**; the layer reports a `network` error rather than faking data.

---

## ৭. Usage

### Direct call

```ts
import { getWeather } from "@/services/api";

const res = await getWeather(23.8103, 90.4125, { signal });
if (res.error) {
  // handle res.error.type / res.error.retryable
} else if (res.data) {
  // res.data.current.temperature_2m
  // res.fetchedAt -> "last updated"
  // res.source.attribution -> "Weather data by Open-Meteo.com"
}
```

### React hook (with cancellation)

```ts
import { useApiResource } from "@/hooks/useApiResource";
import { getAirQuality } from "@/services/api";

const { response, loading, reload } = useApiResource(
  (signal) => getAirQuality(23.81, 90.41, { signal }),
  [], // re-run when these change
);
```

The hook aborts the in-flight request on unmount / dependency change / `reload()`.

### Demo fallback (explicit, flagged)

```ts
await request({
  url,
  source,
  validate,
  demo: () => seededData, // only used if the real request fails
});
// on failure => { data: seededData, isDemo: true, error: <real error> }
```

---

## ৮. Health & Observability

```ts
import { getHealthSnapshot } from "@/services/api";
getHealthSnapshot("Open-Meteo");
// { name, status: "healthy" | "degraded" | "down" | "unknown",
//   lastSuccessAt, lastErrorAt, lastError, consecutiveFailures }
```

- `healthy` — last call succeeded.
- `degraded` — 1–2 consecutive failures.
- `down` — ≥3 consecutive failures.
- `unknown` — never called.

---

## ৯. Caching & Freshness

- Two-tier: in-memory `Map` (fast) + optional `localStorage` (survives reloads).
- TTL per module (weather 10 min, air quality 15 min by default).
- localStorage is pruned to `maxEntries`, oldest first; corrupt entries are dropped safely.
- `fetchedAt` reflects the original store time, so the UI can show an accurate "last updated".

---

## ۱۰. Security Notes

- ✅ No API keys, tokens, or secrets anywhere in client code.
- ✅ Only HTTPS public endpoints.
- ✅ No `dangerouslySetInnerHTML`; all data rendered as text.
- ✅ localStorage cache is namespaced and bounded; no sensitive data is stored.
- ⚠️ Free public APIs are rate-limited and can be abused; the retry/backoff + cache layer reduces load, and callers should surface `429`/`unavailable` gracefully.

---

## ۱۱. Adding a New Provider

1. Add endpoint + source metadata to `src/config/api.ts`.
2. Create `src/services/api/<provider>.ts`:
   - define response types + a `validateX(raw): X` function using `validators.ts`;
   - export `getX(...)` that calls `request({ url, source, validate, ttlMs, ... })`.
3. Re-export from `src/services/api/index.ts`.
4. Document endpoint, auth (must be none), CORS status, license, rate limits, and limitations in this file.