# Data Sources

All live sources are public, key-less and called directly from the browser. No proxy, backend or secrets are used. If a provider does not allow the request (CORS, rate limit, outage), the UI surfaces an unavailable state — it never substitutes fabricated "live" values.

## Live providers

### 1. Open-Meteo — Weather

| Field | Value |
|-------|-------|
| Endpoint | `https://api.open-meteo.com/v1/forecast` |
| Docs | https://open-meteo.com/en/docs |
| Auth | None |
| CORS | Yes |
| License | CC BY 4.0 — "Weather data by Open-Meteo.com" |
| Refresh | 10 minutes (cache TTL) |
| Code | `src/services/api/openMeteo.ts`, `src/hooks/useWeatherFeed.ts` |

Parameters: `current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,precipitation,pressure_msl,cloud_cover,uv_index,is_day`, `hourly`, `daily`, `timezone=Asia/Dhaka`, `forecast_days=7`.

Notes: model-derived forecast, not a physical station. Values are not interpolated or invented when missing.

### 2. Open-Meteo — Air Quality (CAMS)

| Field | Value |
|-------|-------|
| Endpoint | `https://air-quality-api.open-meteo.com/v1/air-quality` |
| Docs | https://open-meteo.com/en/docs/air-quality-api |
| Auth | None |
| CORS | Yes |
| License | CC BY 4.0; CAMS ENSEMBLE attribution required |
| Refresh | 30 minutes |
| Code | `src/services/api/openMeteo.ts`, `src/hooks/useAirQualityFeed.ts` |

Parameters: current/hourly `us_aqi`, `european_aqi`, `pm10`, `pm2_5`, `carbon_monoxide`, `nitrogen_dioxide`, `sulphur_dioxide`, `ozone`; `forecast_days=5`.

Notes: CAMS is a model (~11–45 km resolution), labelled "Model-based". Daily AQI is derived from the hourly API (no native daily aggregate). Missing pollutants are `null`, shown as "—".

### 3. OpenStreetMap — Map tiles

| Field | Value |
|-------|-------|
| Endpoint | `https://tile.openstreetmap.org/{z}/{x}/{y}.png` |
| License | © OpenStreetMap contributors, ODbL |
| Code | `src/config/map.ts`, `src/components/map/*` |

Optional layer: OpenTopoMap (`https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png`, CC-BY-SA, SRTM). Tiles are only requested for the current viewport; attribution is always shown. Respect the [OSM tile usage policy](https://operations.osmfoundation.org/policies/tiles/).

### 4. GDELT — News search

| Field | Value |
|-------|-------|
| Endpoint | `https://api.gdeltproject.org/api/v2/doc/doc` |
| Docs | https://blog.gdeltproject.org/gdelt-doc-2-0-api-debuts/ |
| Auth | None |
| CORS | Not guaranteed (rate limiting observed) |
| Refresh | 10 minutes, no automatic retries |
| Code | `src/services/api/gdelt.ts`, `src/hooks/useNewsFeed.ts` |

Parameters: `query`, `mode=artlist`, `format=json`, `maxrecords=30`, `sort=datedesc`, `timespan=7d`.

Notes: returns headline metadata only. Full text stays on the publisher's site and opens via a `noopener noreferrer` link. On failure (`429`, network, parse), the view shows an error and a **separately labelled** demo headline list.

## Static reference data

- **MRT Line 6 stations** (`src/data/transit.ts`) — published station names and order, English and Bangla. No live train positions or arrival times.
- **Emergency helplines** (`src/data/emergency.ts`) — public national short codes (999, 16163, 16263, 16162) and the DMP control room number, each with the publishing body.

## Demo sources (not live)

Traffic congestion/incidents, bus and metro route status, vehicle availability, waterlogging risk, notifications, demo news headlines and camera footage are locally seeded or generated. See [DEMO_DATA_POLICY.md](DEMO_DATA_POLICY.md).

## Attribution requirements checklist

- [x] "Weather data by Open-Meteo.com" visible in weather and air-quality views.
- [x] CAMS mention for air quality.
- [x] OpenStreetMap attribution on every map (Leaflet control).
- [x] OpenTopoMap attribution when that layer is selected.
- [x] "GDELT Project" link in the news view.
- [x] `DEMO` badges and notes on all simulated values.
