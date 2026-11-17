# EXISTING FEATURES â€” Dhaka City Smart Dashboard

> **à¦‰à¦¦à§à¦¦à§‡à¦¶à§à¦¯:** à¦ªà¦°à¦¬à¦°à§à¦¤à§€ phase-à¦ à¦¯à§‡à¦¸à¦¬ UI/à¦«à¦¿à¦šà¦¾à¦° **à¦…à¦¬à¦¶à§à¦¯à¦‡ à¦¸à¦‚à¦°à¦•à§à¦·à¦£ (preserve)** à¦•à¦°à¦¤à§‡ à¦¹à¦¬à§‡, à¦¤à¦¾à¦° à¦¸à¦®à§à¦ªà§‚à¦°à§à¦£ à¦¤à¦¾à¦²à¦¿à¦•à¦¾à¥¤ à¦•à§‹à¦¨à§‹ feature delete à¦¬à¦¾ à¦¬à¦¦à¦²à¦¾à¦¨à§‹ à¦¯à¦¾à¦¬à§‡ à¦¨à¦¾à¥¤

---

## à§§. à¦¸à§à¦•à§à¦°à¦¿à¦¨ / à¦­à¦¿à¦‰ (à§¯à¦Ÿà¦¿) â€” à¦¸à¦¬ à¦°à¦¾à¦–à¦¤à§‡ à¦¹à¦¬à§‡

| # | à¦­à¦¿à¦‰ | `activeTab` value | à¦²à¦¾à¦‡à¦¨ | à¦®à§‚à¦² à¦‰à¦ªà¦¾à¦¦à¦¾à¦¨ |
|---|-----|-------------------|------|-----------|
| 1 | Dashboard | `dashboard` | 924 | Weather card + 5-day forecast, street map, DEFRA bar chart, ride gauges, transport table, news, traffic now, camera feeds |
| 2 | Weather | `weather` | 1284 | Today banner, 5-day forecast, hourly, temperature map, details grid, satellite, sun cycle, waterlogging risk, air quality |
| 3 | Transit (default) | `transit` | 1622 | Transport alerts (search+filter), bus routes grid, metro rail tracks, CNG gauges, rickshaw gauges |
| 4 | Traffic | `traffic` | 1876 | Sector cards (speed+status), Open Map button |
| 5 | Live Street | `livestreet` | 1910 | 3à¦Ÿà¦¿ animated camera card (canvas) |
| 6 | News | `news` | 1958 | 3à¦Ÿà¦¿ news card (tag, title, summary) |
| 7 | Settings | `settings` | 1995 | General/Weather/Transit/Traffic/News toggles |
| 8 | Support | `support` | 2120 | FAQs accordion, Contact form, Feedback form, contact info |
| 9 | About | `about` | 2236 | Hero, mission, data sources, team, contact |

> **à¦¨à¦¿à¦¯à¦¼à¦®:** à¦à¦‡ à§¯à¦Ÿà¦¿ à¦­à¦¿à¦‰ à¦à¦¬à¦‚ à¦¤à¦¾à¦¦à§‡à¦° à¦¸à¦¬ à¦­à¦¿à¦œà§à¦¯à§à¦¯à¦¼à¦¾à¦² à¦‰à¦ªà¦¾à¦¦à¦¾à¦¨ à¦…à¦ªà¦°à¦¿à¦¬à¦°à§à¦¤à¦¿à¦¤ à¦¥à¦¾à¦•à¦¬à§‡à¥¤

---

## à§¨. à¦•à¦¾à¦œ à¦•à¦°à¦¾ à¦‡à¦¨à§à¦Ÿà¦¾à¦°à¦…à§à¦¯à¦¾à¦•à¦¶à¦¨ (Preserve â€” à¦•à¦¾à¦œ à¦¬à¦¨à§à¦§ à¦•à¦°à¦¾ à¦¯à¦¾à¦¬à§‡ à¦¨à¦¾)

### à§¨.à§§ à¦¨à§‡à¦­à¦¿à¦—à§‡à¦¶à¦¨
- Sidebar-à¦ à§¬à¦Ÿà¦¿ à¦®à§‚à¦² à¦Ÿà§à¦¯à¦¾à¦¬ + Settings/Support/About â€” à¦•à§à¦²à¦¿à¦• à¦•à¦°à¦²à§‡ `activeTab` à¦¬à¦¦à¦²à¦¾à¦¯à¦¼à¥¤
- Active tab à¦¹à¦¾à¦‡à¦²à¦¾à¦‡à¦Ÿ (à¦¸à¦¬à§à¦œ bg + white text + shadow)à¥¤

### à§¨.à§¨ Header controls
- **Live clock + date** â€” à¦ªà§à¦°à¦¤à¦¿ à¦¸à§‡à¦•à§‡à¦¨à§à¦¡à§‡ à¦†à¦ªà¦¡à§‡à¦Ÿ, locale-aware (en-US / bn-BD)à¥¤
- **Location dropdown** â€” à§®à¦Ÿà¦¿ à¦à¦²à¦¾à¦•à¦¾, à¦¬à¦¾à¦‡à¦°à§‡ à¦•à§à¦²à¦¿à¦• à¦•à¦°à¦²à§‡ à¦¬à¦¨à§à¦§ (outside-click)à¥¤
- **Map pill** â†’ Map modalà¥¤
- **Mode pill** â†’ dark/light toggle (Sun/Moon icon)à¥¤
- **Language pill** â†’ English/à¦¬à¦¾à¦‚à¦²à¦¾ toggle (ðŸŒ)à¥¤
- **Emergency pill** (animate-bounce) â†’ Emergency modalà¥¤
- **Notification bell** (ping dot) â†’ notification panel (outside-click close)à¥¤
- **Profile avatar** (SVG)à¥¤

### à§¨.à§© Cross-cutting
- **Dark/Light mode** â€” à¦ªà§à¦°à§‹ à¦…à§à¦¯à¦¾à¦ªà§‡ conditional class (à¦¸à¦¬ card, sidebar, header)à¥¤
- **Language switch** â€” à¦¸à¦¬ UI text à¦¬à¦¦à¦²à¦¾à¦¯à¦¼ (translations dictionary)à¥¤
- **Location switch** â€” `currentDetails` (temp, aqi, pm25, waterlogging, cng, rickshaw) à¦¬à¦¦à¦²à¦¾à¦¯à¦¼à¥¤
- **Temperature unit C/F** â€” à¦¸à¦¬ à¦¤à¦¾à¦ªà¦®à¦¾à¦¤à§à¦°à¦¾ à¦¸à¦ à¦¿à¦•à¦­à¦¾à¦¬à§‡ à¦°à§‚à¦ªà¦¾à¦¨à§à¦¤à¦°à¥¤
- **Refresh rate** â€” interval reset (5/10/15/30s)à¥¤
- **Transport search + filter** â€” à¦•à¦¾à¦œ à¦•à¦°à§‡à¥¤
- **Settings switches** â€” à¦¸à¦¬ à§«à¦Ÿà¦¿ toggle à¦•à¦¾à¦œ à¦•à¦°à§‡à¥¤

### à§¨.à§ª Forms
- **Contact form** â€” name/email/message â†’ submit alert + resetà¥¤
- **Feedback form** â€” subject/desc/file upload (file name à¦¦à§‡à¦–à¦¾à¦¯à¦¼) â†’ submit alert + resetà¥¤
- **FAQ accordion** â€” à§§à§¦à¦Ÿà¦¿ à¦ªà§à¦°à¦¶à§à¦¨, à¦•à§à¦²à¦¿à¦• à¦•à¦°à¦²à§‡ answer à¦–à§‹à¦²à§‡à¥¤

### à§¨.à§« Modals (à§ªà¦Ÿà¦¿)
- Map (SVG + legend), Emergency (tel: links), Camera (canvas + LIVE), News (article view).

### à§¨.à§¬ Canvas
- à§©à¦Ÿà¦¿ CCTV feed animated (car movement, scanline, REC dot) â€” Dashboard à¦“ Live Street-à¦à¥¤

---

## à§©. à¦¡à¦¿à¦œà¦¾à¦‡à¦¨ à¦¸à¦¿à¦¸à§à¦Ÿà§‡à¦® (Preserve â€” tokens/à¦¨à¦¿à¦¯à¦¼à¦®)

### à§©.à§§ à¦°à¦™
- **Primary green:** `#4CAF50` (logo), `#78D47E` (active), `#4CAF50`à¥¤
- **Status color code:** à¦¸à¦¬à§à¦œ=Good, amber=Minor/Delayed, à¦²à¦¾à¦²=Major/Disrupted/Criticalà¥¤
- **Dashboard bg:** `#F4F6F8` (light) / `#121212` (dark)à¥¤
- **Card bg:** white (light) / `#1E1E1E` (dark)à¥¤

### à§©.à§¨ Typography
- `font-sans` (Geist), tracking-wider/bold/black à¦…à¦¨à§‡à¦• à¦œà¦¾à¦¯à¦¼à¦—à¦¾à¦¯à¦¼à¥¤
- Sizes: `text-[10px]`..`text-5xl`à¥¤

### à§©.à§© Visual patterns (reusable)
- **Circular gauge:** SVG circle + `strokeDasharray`/`strokeDashoffset` (CNG, Rickshaw, Rides, Pollutants)à¥¤
- **Status dot + label:** `<span dot>` + `<span text>`à¥¤
- **Legend dots:** green/amber/redà¥¤
- **Progress/track bars:** Metro rail (segments + station nodes), waterlogging slider, AQI sliderà¥¤
- **Cards:** `rounded-2xl border p-5 shadow-sm`, dark/light conditionalà¥¤
- **SVG maps:** street map, temperature map, satellite, city transit mapà¥¤
- **Modal shell:** overlay + rounded card + X buttonà¥¤

### à§©.à§ª Animation (Preserve)
- `animate-pulse`, `animate-bounce`, `animate-ping`, `animate-spin`à¥¤
- CloudSun bounce, live dots ping, REC flash, canvas traffic, transition-colorsà¥¤

### à§©.à§« Responsive classes
- `grid-cols-1 xl:grid-cols-12`, `md:col-span-*`, `flex-col md:flex-row` â€” desktop-first, à¦°à¦¾à¦–à¦¤à§‡ à¦¹à¦¬à§‡à¥¤

---

## à§ª. à¦¡à§‡à¦Ÿà¦¾ (Preserve â€” à¦¸à¦¬ mock à¦¥à¦¾à¦•à¦¬à§‡)

| à¦¡à§‡à¦Ÿà¦¾à¦¸à§‡à¦Ÿ | à¦•à¦¨à¦Ÿà§‡à¦¨à§à¦Ÿ |
|----------|---------|
| `emergencyContacts` | à§¯à§¯à§¯, Fire Service, DMP, WASA, Shastho Batayon |
| `locationsList` | Mirpur 10, Dhanmondi 27, Gulshan 2, Uttara Sector 7, Banani, Mohakhali, Farmgate, Motijheel |
| `transportAlertsList` | à§¨à§«à¦Ÿà¦¿ à¦°à§à¦Ÿ (status+color) |
| `busRoutesStatus` | à§¯à¦Ÿà¦¿ |
| `newsList` | à§©à¦Ÿà¦¿ (title/summary/full/tag/image gradient) |
| `cameraFeeds` | mirpur10, avenue5, rokeya |
| `notifications` | 3à¦Ÿà¦¿ (high/med level) |
| `translations` | en + bn |

> **à¦¨à¦¿à¦¯à¦¼à¦®:** mock à¦¡à§‡à¦Ÿà¦¾ backend-à¦ à¦¸à¦°à¦¾à¦¨à§‹ à¦¹à¦¬à§‡ à¦¨à¦¾à¥¤ à¦•à§‹à¦¨à§‹ external API à¦¯à§‹à¦— à¦¹à¦¬à§‡ à¦¨à¦¾à¥¤

---

## à§«. Preserve Priority Levels

### P0 â€” à¦•à¦ à¦¿à¦¨à¦­à¦¾à¦¬à§‡ à¦…à¦ªà¦°à¦¿à¦¬à¦°à§à¦¤à¦¿à¦¤ (à¦à¦—à§à¦²à§‹ à¦­à¦¾à¦™à¦²à§‡ à¦à¦•à¦¦à¦®à¦‡ à¦šà¦²à¦¬à§‡ à¦¨à¦¾)
- à§¯à¦Ÿà¦¿ à¦­à¦¿à¦‰ à¦“ à¦¤à¦¾à¦¦à§‡à¦° layout
- Dark/light, language, location, temp unit
- Search + filter
- Modals (à§ªà¦Ÿà¦¿)
- Canvas CCTV
- Forms + FAQ

### P1 â€” à¦•à¦¾à¦œ à¦¬à¦œà¦¾à¦¯à¦¼ à¦°à¦¾à¦–à¦¤à§‡ à¦¹à¦¬à§‡, à¦›à§‹à¦Ÿ à¤¸à¥à¤§à¦¾à¦° à¦¯à¦¾à¦¬à§‡
- Header pills responsive wrap
- Mobile sidebar (drawer)
- i18n completeness (hard-coded English string â†’ translation)
- Non-standard Tailwind tokens (4.5, 450, 505, 605, 150, via- duplicate)

### P2 â€” à¦‰à¦¨à§à¦¨à¦¤ à¦•à¦°à¦¾ à¦¯à¦¾à¦¬à§‡ (behavior à¦¬à¦¦à¦²à¦¾à¦¬à§‡ à¦¨à¦¾)
- Duplicated forecast/gauge markup â†’ reusable component
- Mixed dark mode approach â†’ à¦à¦•à¦Ÿà¦¾à¦‡ à¦ªà¦¦à§à¦§à¦¤à¦¿
- Accessibility (aria, keyboard)
- Code organization (component split)

---

## à§¬. à¦¯à¦¾ à¦ªà¦°à¦¬à¦°à§à¦¤à§€ phase-à¦ à¦¨à¦·à§à¦Ÿ à¦•à¦°à¦¾ à¦¯à¦¾à¦¬à§‡ à¦¨à¦¾ (Hard Don'ts)

1. âŒ à¦•à§‹à¦¨à§‹ UI element delete à¦¬à¦¾ re-skinà¥¤
2. âŒ à¦•à¦¾à¦œ à¦•à¦°à¦¾ interaction remove/replaceà¥¤
3. âŒ à¦¨à¦¤à§à¦¨ npm package (lucide-react à¦›à¦¾à¦¡à¦¼à¦¾)à¥¤
4. âŒ backend / database / API route à¦¯à§‹à¦—à¥¤
5. âŒ routing à¦ªà¦¦à§à¦§à¦¤à¦¿ à¦¬à¦¦à¦² (à¦¬à¦°à§à¦¤à¦®à¦¾à¦¨à§‡ tab-based) â€” à¦šà¦¾à¦‡à¦²à§‡ wrapper à¦¦à¦¿à¦¯à¦¼à§‡, à¦­à¦¾à¦™à¦¾ à¦›à¦¾à¦¡à¦¼à¦¾à¥¤
6. âŒ mock à¦¡à§‡à¦Ÿà¦¾ à¦¸à¦°à¦¾à¦¨à§‹à¥¤

---

## à§­. Audit-à¦ à¦šà¦¿à¦¹à§à¦¨à¦¿à¦¤ à¦‰à¦¨à§à¦¨à¦¤à¦¿à¦° à¦¸à§à¦¯à§‹à¦— (behavior à¦¬à¦¦à¦²à¦¾à¦¯à¦¼ à¦¨à¦¾)

| à¦¬à¦¿à¦·à¦¯à¦¼ | à¦¬à¦°à§à¦¤à¦®à¦¾à¦¨ | à¦ªà§à¦°à¦¸à§à¦¤à¦¾à¦¬à¦¿à¦¤ (Phase à¦ªà¦°à¦¬à¦°à§à¦¤à§€) |
|------|---------|---------------------------|
| Mobile sidebar | fixed w-[250px] | responsive drawer (overlay) |
| Header pills overflow | wrap à¦¹à¦¯à¦¼ à¦¨à¦¾ | responsive wrap / collapse |
| Forecast data | à¦¦à§à¦‡ à¦œà¦¾à¦¯à¦¼à¦—à¦¾à¦¯à¦¼ à¦¡à§à¦ªà§à¦²à¦¿à¦•à§‡à¦Ÿ | à¦à¦•à¦Ÿà¦¾à¦‡ source |
| Temperature in Weather | hard-coded `Â° Celsius` | `formatTempFull` à¦¬à§à¦¯à¦¬à¦¹à¦¾à¦° |
| `dark:` variants | à¦•à¦¾à¦œ à¦¨à¦¾à¦“ à¦•à¦°à¦¤à§‡ à¦ªà¦¾à¦°à§‡ | à¦à¦•à¦Ÿà¦¾à¦‡ dark-mode à¦ªà¦¦à§à¦§à¦¤à¦¿ |
| Hard-coded English strings | i18n à¦¹à¦¯à¦¼ à¦¨à¦¾ | translations-à¦ à¦¯à§‹à¦— |
| Handler-less buttons | à§«+ | handler à¦¬à¦¾ disabled state |
| Component size | 2520 à¦²à¦¾à¦‡à¦¨ à¦à¦• à¦«à¦¾à¦‡à¦² | à¦›à§‹à¦Ÿ reusable component (split) |

> à¦¬à¦¿à¦¸à§à¦¤à¦¾à¦°à¦¿à¦¤ à¦¬à¦¿à¦¶à§à¦²à§‡à¦·à¦£: `docs/PROJECT_AUDIT.md`
> à¦°à§‹à¦¡à¦®à§à¦¯à¦¾à¦ª: `docs/IMPLEMENTATION_PLAN.md`
