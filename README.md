# Dhaka City Smart Dashboard

A frontend-only Next.js dashboard for Dhaka: live weather, model-based air quality, an interactive OpenStreetMap view and a GDELT-powered news search. Traffic, transit status, camera footage and vehicle availability are **clearly labelled demo samples**, never presented as live feeds.

No backend, database, API keys or secrets. Everything runs in the browser and is deployed as static output.

## Live vs demo

| Area | Status | Source |
|------|--------|--------|
| Weather (current, hourly, 7-day) | **Live** | [Open-Meteo](https://open-meteo.com/) forecast API |
| Air quality (current, hourly, daily) | **Live (model-based)** | Open-Meteo / CAMS |
| Map tiles | **Live** | OpenStreetMap, optional OpenTopoMap |
| News search | **Live (best effort)** | [GDELT DOC 2.0](https://www.gdeltproject.org/) |
| Metro station reference (MRT Line 6) | Static reference | Published station list |
| Traffic congestion & incidents | **DEMO** | Locally seeded sample data |
| Bus/metro route status | **DEMO** | Locally seeded sample status |
| Street cameras | **DEMO video files** | Locally generated MP4/JPEG assets in `public/videos/` |
| Vehicle availability, waterlogging risk | **DEMO** | Seeded simulation |
| City alerts / notifications | **DEMO** | Seeded store, local only |

If a live request fails, the UI shows an error/unavailable state with source attribution. It never invents values. Demo content is always marked with a `DEMO` badge and an explanatory note in English and Bangla.

## Features

- **Weather**: current conditions, hourly strip, 7-day forecast, unit toggle, last-updated status.
- **Air quality**: US AQI + European AQI, pollutant breakdown, hourly trend, daily summary, health guidance.
- **Traffic**: demo congestion map over OpenStreetMap (Leaflet), level filters, incident list.
- **Transit**: MRT Line 6 station reference with search, demo route status, demo availability gauges.
- **Live Street**: demo MP4 footage with a permanent "DEMO FOOTAGE — NOT LIVE CCTV" overlay, play/pause, fullscreen and poster images.
- **News**: GDELT search with topics, keyword search, publisher links, accessible article preview modal, offline demo fallback.
- **Settings**: theme, language, units, refresh rate, map layer, camera autoplay, widget visibility, export/import, reset and clear local data.
- **Support**: FAQ search, validated contact/feedback forms with local drafts and file validation (demo submission, nothing transmitted).
- **Emergency**: bilingual helplines, category filters, tap-to-call, copy-to-clipboard and sources.
- **Accessibility**: skip link, keyboard-operable modals with `Escape`, ARIA labels, focus states, `html lang` sync.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (Turbopack)
npm run lint     # ESLint
npm run start    # serve the production build
```

Requires Node 20+.

## Project structure

```
app/                     # App Router entry (layout + page shell)
src/
  components/            # UI by feature (weather, traffic, transit, cameras, news, ...)
  config/                # App config, API endpoints, locations, map layers
  constants/             # Bilingual translations
  context/               # AppContext: settings, location, feeds, overlays
  data/                  # Static + demo data (always labelled DEMO in UI)
  hooks/                 # Data feeds, clock, notifications, online status
  services/
    api/                 # request pipeline, Open-Meteo, GDELT, cache/retry/health
    storage.ts           # Versioned settings schema + validation
    notificationStore.ts # useSyncExternalStore notification store
    dataSources.ts       # Source registry + LIVE/CACHED/STALE/DEMO/UNAVAILABLE
  types/                 # Shared TS types
  utils/                 # Weather/AQI helpers, formatting, cn
public/videos/           # Locally generated demo footage + posters
docs/                    # Architecture, data sources, storage and policy docs
```

## Documentation

- [docs/PROJECT_ARCHITECTURE.md](docs/PROJECT_ARCHITECTURE.md) — layers, state, data flow.
- [docs/API_INTEGRATION.md](docs/API_INTEGRATION.md) — endpoints, envelope, errors, caching.
- [docs/DATA_SOURCES.md](docs/DATA_SOURCES.md) — every provider, license and attribution.
- [docs/DEMO_DATA_POLICY.md](docs/DEMO_DATA_POLICY.md) — what is simulated and how it is labelled.
- [docs/LOCALSTORAGE.md](docs/LOCALSTORAGE.md) — keys, schema, export/import, clearing.
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) — static hosting and checks.
- [docs/KNOWN_LIMITATIONS.md](docs/KNOWN_LIMITATIONS.md) — honest current constraints.

## License & attribution

Weather and air-quality data by [Open-Meteo.com](https://open-meteo.com/) (CC BY 4.0), includes CAMS ENSEMBLE data. Map data © OpenStreetMap contributors (ODbL). Optional topo tiles © OpenTopoMap (CC-BY-SA). News search via the GDELT Project. Demo media is generated locally for this project.
