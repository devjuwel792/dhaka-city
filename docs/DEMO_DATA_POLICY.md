# Demo Data Policy

## Principle

> A simulated value must never look live. Demo content is always (a) labelled with a visible `DEMO` badge and (b) explained in a short bilingual note near the data.

When real data is unavailable, the UI says so. It does not estimate, interpolate or silently substitute a sample value.

## What is demo

| Feature | Where | Label |
|---------|-------|-------|
| Traffic congestion zones & incidents | `src/data/traffic.ts`, Traffic view, dashboard card | DEMO badge + note |
| Bus/metro route status | `src/data/transit.ts`, Transit view | DEMO badge + note |
| Vehicle availability gauges | seeded `snapshot` | DEMO badge |
| Waterlogging risk | seeded `snapshot` | DEMO badge + "sample estimate" |
| App-based ride availability | `src/data/weather.ts` | DEMO badge + "not live" |
| Notifications | `src/services/notificationStore.ts` | "Demo alerts — not live emergency notifications" |
| Camera footage | `public/videos/*`, `src/data/cameras.ts` | permanent "DEMO FOOTAGE — NOT LIVE CCTV" overlay + modal footer |
| News fallback | `src/data/news.ts`, News view | separate "Demo headlines — not live reporting" block |
| Map geography | OpenStreetMap (real map) + simulated congestion overlay | overlay labelled DEMO |

## Camera media

- The MP4s and posters in `public/videos/` were generated locally for this project (ffmpeg testsrc/colour patterns). They are not recordings of Dhaka.
- `CameraFeedConfig.isDemo` is `true` for every feed.
- The label is rendered as an overlay inside the player, so it is visible in cards, the modal and fullscreen.
- Do not describe these as live CCTV, traffic cameras or surveillance feeds.

## Live data failure behaviour

- Weather/air quality: keep the last valid payload for the same location, surface the error and cached/freshness status. Missing fields render as "—".
- News: show the error (rate limit/network), a retry button, and a visually separate demo headline block.
- Maps: if tiles fail, the map shows its error/tile state; congestion is still marked demo.

## Adding demo content

1. Put it in `src/data/` or a clearly named generator.
2. Never include a real-looking timestamp, publisher or sensor attribution that you cannot verify.
3. Render a `DEMO` badge and a bilingual note wherever it appears.
4. Prefer static, explainable samples over random values that change on every render.
