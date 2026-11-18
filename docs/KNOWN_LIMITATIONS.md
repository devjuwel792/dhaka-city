# Known Limitations

These are deliberate, documented constraints — not hidden gaps.

## Data

- **No live traffic feed.** Congestion levels and incidents are demo samples. OSM provides geography only.
- **No live transit feed.** Bus/metro route statuses are demo samples. MRT Line 6 station names/order are static reference data; arrival times are unavailable.
- **No live CCTV.** All camera footage is locally generated demo video with a permanent label. Fullscreen shows the same label.
- **Vehicle availability and waterlogging risk are simulated** and labelled DEMO. They are not derived from sensors.
- **Notifications are demo alerts**, stored locally. They are not emergency broadcasts.
- **Air quality is model-based** (CAMS, coarse resolution), not measured at a Dhaka ground station. Daily AQI is derived from hourly values because the API has no native daily aggregate.
- **Weather is model-derived** and may differ from local conditions.
- **News coverage depends on GDELT indexing** and may be delayed, incomplete, duplicated (deduplicated by URL) or unavailable. GDELT has no article body; the app only shows headline metadata and links out.
- **GDELT CORS/rate limits** may block browser requests. Failures surface as unavailable plus a labelled demo list. There is no proxy by design.
- **Maps require network access** to tile servers and are subject to OSM/OpenTopoMap usage policies.

## Product scope

- No user accounts, cloud sync or multi-device settings.
- Contact/feedback submissions are validated locally and saved as drafts only; nothing is transmitted.
- No push notifications, background refresh or service worker.
- No historical archive, charts beyond the provided hourly windows, or data export of weather history.
- Location search is limited to the configured Dhaka-area list; geocoding is not wired to the UI.
- Search/news is English + Bangla queries only; publisher content is not translated.

## Technical

- Static client app: all API calls happen from the user's browser, so availability depends on the provider and network.
- `localStorage` limits apply; clearing browser data removes settings, notifications and drafts.
- Settings do not sync live between open tabs (notifications do).
- Demo MP4s are small generated clips; they are not representative of real street conditions.
- Map interactivity is limited to the configured layers and area markers.
- No automated end-to-end tests; verification is build + lint + manual checks.

## Accuracy policy

When a value cannot be fetched, the UI shows an unavailable/error state and source attribution. It does not estimate or fabricate the missing value. Demo values are always labelled.
