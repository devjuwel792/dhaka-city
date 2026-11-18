# Project Architecture

## Overview

```
app/layout.tsx  → metadata + fonts
app/page.tsx    → AppProvider → AppShell
                              ├─ Sidebar / Header
                              ├─ view switch (dashboard, weather, transit, …)
                              └─ modals (map, emergency, camera, news)
```

`src/context/AppContext.tsx` is the composition root for UI state and data feeds. It is a client component tree; the app builds as static output.

## Layers

```
components/   presentation only (props + context)
hooks/        React data feeds (AbortController, intervals, keep-last-good)
services/     fetch pipeline, stores, persistence, source registry
config/       endpoints, locations, map layers, app constants
data/         static reference data and clearly-labelled demo samples
utils/        pure helpers (weather codes, AQI, formatting)
types/        shared TypeScript types
```

Rules:

- Components never call `fetch` directly; they use hooks/services.
- Demo data lives in `src/data/demo-data.json` and is re-exported by typed wrappers in `src/data/*.ts`; it must be labelled in the UI.
- API responses always use the `ApiResponse<T>` envelope from `src/types/api.ts`.

## Data flow

```
UI component
   └─ hook (useWeatherFeed / useAirQualityFeed / useNewsFeed)
        └─ service (openMeteo.ts / gdelt.ts)
             └─ request()  [cache → dedupe → retry → timeout → validate → health]
                  └─ ApiResponse<T> { data, error, source, fetchedAt, isCached, isDemo }
```

Hooks expose `loading`, `error`, `data`, `fetchedAt`, `source`, `isCached`. Views decide how to render loading, error and empty states. When a refresh fails, the previous valid payload for the same location/query is kept and the error is surfaced; data from a different location/query is discarded.

## State

### Persisted settings

`AppContext` holds theme, language, location, unit, refresh rate, alert preferences, widget visibility, map layer and camera autoplay. On mount it hydrates from `src/services/storage.ts` (SSR renders defaults, avoiding mismatches) and writes subsequent changes back to `localStorage`.

### Ephemeral UI state

Active tab, overlay visibility (`showMapModal`, `showEmergencyModal`, `showCameraModal`, `showNewsModal`, notification panel, location dropdown), selected location and the refresh trigger.

### Derived state

`t` (translations for the active language), `snapshot` (demo city snapshot for the gauges), `formatTemp*` helpers. `document.documentElement.lang` and `color-scheme` are synced to the current language/theme.

### Notifications

`src/services/notificationStore.ts` is a small external store consumed with `useSyncExternalStore`:

- one shared array of `StoredNotification` (`read`, `createdAt`, level),
- mutations: mark read, mark all read, remove, clear,
- persisted to `localStorage`, synced across tabs via the `storage` event,
- server snapshot is a stable empty array for hydration safety.

## Rendering and performance

- Leaflet maps are loaded with `next/dynamic(..., { ssr: false })`; the rest of the page is static.
- Demo video files are `preload="none"` in cards and `preload="metadata"` in the modal; only one video plays at a time.
- Refresh intervals come from settings (`refreshRate`), with service-level TTLs preventing extra network calls.
- No client-side secrets; only public key-less endpoints.

## Error and demo model

Two separate concepts:

1. **Unavailable live data** — `error` is set, `data` is null (or stale-but-real), UI shows an explanatory state. Generated demo fallback in the news view is rendered in a clearly separated "Demo headlines" block.
2. **Intentionally simulated features** — served from `src/data/` and always shown with a `DEMO` badge plus a bilingual note. A simulated value is never labelled live.

`src/services/dataSources.ts` defines the shared status vocabulary: `LIVE`, `CACHED`, `STALE`, `DEMO`, `UNAVAILABLE`, rendered by `DataSourceBadge`.

## Accessibility

- Skip link to `#main-content`.
- `ModalShell` exposes `role="dialog"` / `aria-modal` with an accessible name; modals close on `Escape` and expose labelled close buttons.
- Interactive cards are keyboard-operable buttons; filters use `aria-pressed` / `aria-selected`.
- Form fields have labels, `aria-invalid` and inline error text; submission results use `role="status"`.
- Demo/status text is text content, not colour-only signalling.
