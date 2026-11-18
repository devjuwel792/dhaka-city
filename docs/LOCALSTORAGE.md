# Local Storage

Everything is stored in the browser under the `dhaka-city:` prefix. There is no account, cookie, analytics or server-side persistence.

## Keys

| Key | Contents | Written by |
|-----|----------|-----------|
| `dhaka-city:settings` | Full `AppSettings` JSON (theme, language, location, unit, refresh, alert flags, widgets, map layer, camera autoplay) | `src/services/storage.ts` |
| `dhaka-city:selected-location` | Location id (mirrors `settings.location`) | `src/config/locations.ts` |
| `dhaka-city:notifications` | Array of `StoredNotification` (read state included) | `src/services/notificationStore.ts` |
| `dhaka-city:api-cache:<url>` | Cached `ApiResponse` payload with `storedAt` / `expiresAt`, bounded to 50 entries | `src/services/api/cache.ts` |
| `dhaka-city:support-contact-draft` | `{ name, email, message }` | Support view |
| `dhaka-city:support-feedback-draft` | `{ subject, description }` | Support view |

Camera/notification preferences live inside `settings`, not separate keys.

## Settings schema

```ts
interface AppSettings {
  theme: "light" | "dark";
  lang: "en" | "bn";
  location: string;
  tempUnit: "C" | "F";
  refreshRate: number;            // one of APP_CONFIG.refreshOptions
  weatherAlerts: boolean;
  trafficAlerts: boolean;
  congestionAlerts: boolean;
  preferredRoutes: boolean;
  newsSources: boolean;
  widgets: {
    weather: boolean; airQuality: boolean; map: boolean;
    traffic: boolean; transit: boolean; news: boolean; cameras: boolean;
  };
  mapLayer: string;               // id from src/config/map.ts
  cameraAutoplay: boolean;
}
```

`validateSettings()` coerces unknown/invalid input to safe defaults; `parseImportedSettings()` rejects non-objects and invalid JSON with a readable error.

## Lifecycle

1. First render uses defaults (SSR-safe).
2. After mount, settings hydrate from storage; the app then persists every change.
3. API cache entries expire by TTL (weather 10 min, AQI 30 min, news 10 min) and are pruned to 50 entries.
4. Cross-tab notification sync uses the `storage` event. Settings do not live-sync across tabs.

## Export / import

- **Export** (Settings → Data & privacy): downloads `dhaka-city-settings.json` with the validated settings object.
- **Import**: accepts a JSON object, validates and applies it immediately. Unknown keys are ignored; invalid values fall back to defaults.

## Clearing

- **Reset to defaults**: restores `DEFAULT_SETTINGS` (including widget visibility), keeps notifications/drafts.
- **Clear local data**: removes every key with the `dhaka-city:` prefix (settings, location, cache, notifications, drafts) and re-applies defaults.

Both actions require a second confirmation click. Nothing is sent anywhere.
