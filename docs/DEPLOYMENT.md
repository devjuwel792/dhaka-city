# Deployment

## Build

```bash
npm ci
npm run lint
npm run build
npm run start     # local production check
```

The app is a client-rendered Next.js App Router project with no API routes, server actions or environment variables. `next build` produces static pages (`/` and `/_not-found`).

## Hosting

Works on any static/Node host that supports Next.js 16:

- Vercel (zero-config)
- Netlify / Cloudflare Pages with the Next.js adapter
- Any Node host running `npm run start`

If serving the exported static site behind a custom CDN, keep `public/videos/` available at `/videos/*` (demo MP4/JPEG files).

## No environment variables

There are no keys to configure. All endpoints are public and listed in `src/config/api.ts`. Do not add secrets to client code.

## Pre-deploy checklist

- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] Weather and air quality load for the default location.
- [ ] A failed/blocked GDELT request shows the unavailable state and labelled demo headlines.
- [ ] Every DEMO badge is visible (traffic, transit, cameras, availability, notifications).
- [ ] Camera MP4s and posters resolve from `/videos/`.
- [ ] Settings persist after reload; reset/clear confirmations work.
- [ ] Modals close with `Escape` and trap attention visually.
- [ ] Map attribution is visible for the selected layer.

## Caching and rate limits

- The browser cache layer deduplicates requests and applies TTLs.
- Open-Meteo free tier can return `429` under heavy use; the UI keeps the last valid payload and shows an error/freshness status.
- GDELT is best-effort: no retries, 10-minute cache, clear failure state.

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). `localStorage`, `AbortController`, `IntersectionObserver` and ES2022 are assumed.
