# IMPLEMENTATION PLAN â€” Dhaka City Smart Dashboard

> **Phase 0 result:** Audit à¦¸à¦®à§à¦ªà¦¨à§à¦¨à¥¤ à¦à¦‡ à¦°à§‹à¦¡à¦®à§à¦¯à¦¾à¦ªà¦Ÿà¦¿ à¦ªà¦°à¦¬à¦°à§à¦¤à§€ phase-à¦—à§à¦²à§‹à¦° à¦œà¦¨à§à¦¯à¥¤
>
> **Core principle:** à¦¬à¦¿à¦¦à§à¦¯à¦®à¦¾à¦¨ UI, à¦«à¦¿à¦šà¦¾à¦°, mock à¦¡à§‡à¦Ÿà¦¾, dark/light, i18n â€” à¦¸à¦¬ **à¦¸à¦‚à¦°à¦•à§à¦·à¦£**à¥¤ à¦•à§‹à¦¨à§‹ backend/database/à¦¨à¦¤à§à¦¨ package à¦¨à¦¯à¦¼à¥¤ à¦•à§‹à¦¨à§‹ à¦•à¦¾à¦œ à¦•à¦°à¦¾ feature replace à¦¨à¦¯à¦¼à¥¤

---

## à§§. à¦²à¦•à§à¦·à§à¦¯ à¦“ à¦¸à§€à¦®à¦¾ (Goals & Constraints)

### âœ… à¦•à¦°à¦£à§€à¦¯à¦¼
- à¦¬à¦¿à¦¦à§à¦¯à¦®à¦¾à¦¨ à§¯ à¦­à¦¿à¦‰, à§ª à¦®à¦¡à¦¾à¦², à¦¸à¦¬ interaction à¦…à¦ªà¦°à¦¿à¦¬à¦°à§à¦¤ à¦°à¦¾à¦–à¦¾à¥¤
- à¦›à§‹à¦Ÿ, à¦¨à¦¿à¦°à¦¾à¦ªà¦¦ à¦‰à¦¨à§à¦¨à¦¯à¦¼à¦¨ (responsive, code organization, bug fix)à¥¤
- à¦à¦•à¦‡ mock à¦¡à§‡à¦Ÿà¦¾ / simulation à¦•à¦¨à¦¸à§‡à¦ªà§à¦Ÿ à¦§à¦°à§‡ à¦°à¦¾à¦–à¦¾à¥¤

### âŒ à¦¨à¦¿à¦·à¦¿à¦¦à§à¦§
- UI delete / redesign / re-skinà¥¤
- à¦•à¦¾à¦œ à¦•à¦°à¦¾ feature à¦¸à¦°à¦¾à¦¨à§‹ à¦¬à¦¾ à¦¬à¦¦à¦²à¦¾à¦¨à§‹à¥¤
- à¦¨à¦¤à§à¦¨ npm dependency (lucide-react suffice)à¥¤
- backend / API route / database à¦¯à§‹à¦—à¥¤
- routing à¦ªà¦¦à§à¦§à¦¤à¦¿ à¦¬à¦¦à¦² (tab-based à¦¥à¦¾à¦•à¦¬à§‡)à¥¤
- mock à¦¡à§‡à¦Ÿà¦¾ à¦¸à¦°à¦¾à¦¨à§‹à¥¤

---

## à§¨. à¦¸à¦‚à¦•à§à¦·à¦¿à¦ªà§à¦¤ à¦°à§‹à¦¡à¦®à§à¦¯à¦¾à¦ª (Overview)

| Phase | à¦¨à¦¾à¦® | à¦®à§‚à¦² à¦•à¦¾à¦œ | à¦à§à¦à¦•à¦¿ |
|-------|-----|---------|-------|
| **P-1** | Foundation Fixes | Non-standard Tailwind tokens, duplicate `via-`, bug clean-up (behavior à¦…à¦ªà¦°à¦¿à¦¬à¦°à§à¦¤à¦¿à¦¤) | à¦•à¦® |
| **P-2** | Mobile & Responsive | Sidebar drawer, header pills wrap â€” mobile usable | à¦®à¦¾à¦à¦¾à¦°à¦¿ |
| **P-3** | Dark Mode Unification | `dark:` vs `isDark` à¦à¦•à¦Ÿà¦¾à¦‡ à¦ªà¦¦à§à¦§à¦¤à¦¿ | à¦®à¦¾à¦à¦¾à¦°à¦¿ |
| **P-4** | i18n Completeness | hard-coded English string â†’ translations | à¦•à¦® |
| **P-5** | Handler Completion | handler-less button à¦—à§à¦²à§‹ (disabled/aria/handler) | à¦•à¦® |
| **P-6** | Code Organization | reusable component (Gauge, StatusDot, ModalShell, ForecastCard) | à¦®à¦¾à¦à¦¾à¦°à¦¿ |
| **P-7** | Accessibility Pass | aria, keyboard, focus, alt | à¦•à¦® |

> **à¦ªà§à¦°à¦¤à¦¿ phase à¦¶à§‡à¦·à§‡:** `npm run lint` + `npm run build` à¦šà¦¾à¦²à¦¿à¦¯à¦¼à§‡ à¦¯à¦¾à¦šà¦¾à¦‡ à¦•à¦°à¦¤à§‡ à¦¹à¦¬à§‡à¥¤ à¦•à§‹à¦¨à§‹ à¦­à¦¾à¦™à¦¾ UI/Vew à¦ªà¦¾à¦“à¦¯à¦¼à¦¾ à¦—à§‡à¦²à§‡ à¦¸à§‡à¦‡ phase à¦†à¦Ÿà¦•à§‡ à¦¯à¦¾à¦¬à§‡à¥¤

---

## à§©. Phase-by-Phase à¦¬à¦¿à¦¸à§à¦¤à¦¾à¦°à¦¿à¦¤

### P-1 â€” Foundation Fixes (à¦¸à¦¬à¦šà§‡à¦¯à¦¼à§‡ à¦¨à¦¿à¦°à¦¾à¦ªà¦¦, à¦†à¦—à§‡)
**à¦•à§€:** à¦•à§‹à¦¡-à¦¸à§à¦¤à¦°à§‡à¦° bug, behavior à¦¬à¦¦à¦²à¦¾à¦¬à§‡ à¦¨à¦¾à¥¤
- [ ] Non-standard Tailwind tokens à¦ à¦¿à¦• à¦•à¦°à¦¾ (validation):
  - `w-4.5 h-4.5` â†’ `w-4 h-4` à¦¬à¦¾ `w-5 h-5` (à¦¯à§‡à¦–à¦¾à¦¨à§‡ broken)à¥¤
  - `bg-emerald-450` â†’ `bg-emerald-500` (near match)à¥¤
  - `text-gray-505` â†’ `text-gray-500`, `text-gray-605` â†’ `text-gray-600`, `border-gray-150` â†’ `border-gray-200`à¥¤
  - `via-green-400 via-yellow-400` â†’ duplicate `via-` à¦¸à¦°à¦¿à¦¯à¦¼à§‡ à¦à¦•à¦Ÿà¦¿ à¦°à¦¾à¦–à¦¾à¥¤
  - `animate-duration-3000` â†’ arbitrary `[3s]` à¦¬à¦¾ standardà¥¤
- [ ] `globals.css`-à¦à¦° unused/à¦¬à¦¿à¦°à§‹à¦§à§€ `@media (prefers-color-scheme: dark)` â€” à¦¯à§‡à¦¹à§‡à¦¤à§ class-based, à¦à¦Ÿà¦¿ à¦¸à¦°à¦¾à¦¨à§‹ à¦¬à¦¾ à¦¨à¦¿à¦·à§à¦•à§à¦°à¦¿à¦¯à¦¼ à¦•à¦°à¦¾ (à¦¶à§à¦§à§ à¦¯à¦¦à¦¿ à¦¨à¦¿à¦°à¦¾à¦ªà¦¦ à¦¹à¦¯à¦¼; à¦¨à¦¾à¦¹à¦²à§‡ à¦°à§‡à¦–à§‡ à¦¦à§‡à¦“à¦¯à¦¼à¦¾)à¥¤
- [ ] `next.config.ts` / metadata title-à¦ à¦¬à§à¦°à§à¦¯à¦¾à¦¨à§à¦¡à¦¿à¦‚ (`Create Next App` â†’ Dhaka City) â€” **layout.tsx metadata** (behavior à¦¨à¦¯à¦¼, SEO)à¥¤

**à¦¯à¦¾à¦šà¦¾à¦‡:** à¦ªà§à¦°à¦¤à¦¿à¦Ÿà¦¿ à¦Ÿà§‹à¦•à¦¾ class-à¦à¦° à¦ªà§à¦°à¦­à¦¾à¦¬ à¦šà§‹à¦–à§‡ à¦¦à§‡à¦–à¦¾; `npm run build`à¥¤

---

### P-2 â€” Mobile & Responsive
**à¦•à§€:** Mobile-à¦ sidebar à¦“ header à¦ à¦¿à¦• à¦•à¦°à¦¾ (UI re-skin à¦¨à¦¯à¦¼, responsive wrapper)à¥¤
- [ ] Sidebar: `w-[250px]` + mobile-à¦ `hidden md:flex` + hamburger state à¦¦à¦¿à¦¯à¦¼à§‡ drawer (overlay)à¥¤ desktop-à¦ à¦†à¦—à§‡à¦° à¦®à¦¤à§‹à¦‡à¥¤
- [ ] Header pills: `flex-wrap` à¦¬à¦¾ mobile-à¦ overflow-x-auto; emergency/notification pills resetà¥¤
- [ ] Grid breakpoints à¦¯à¦¾à¦šà¦¾à¦‡ (grid-cols-1 â†’ md/xl)à¥¤
- [ ] Content dock padding (`p-8`) mobile-à¦ `p-4`à¥¤

**à¦¨à¦¿à¦¯à¦¼à¦¨à§à¦¤à§à¦°à¦£:** Desktop view à¦†à¦—à§‡à¦° à¦®à¦¤à§‹ à¦¹à§à¦¬à¦¹à§ à¦¥à¦¾à¦•à¦¬à§‡ â€” à¦¶à§à¦§à§ mobile-à¦ à¦¨à¦¤à§à¦¨ wrapperà¥¤

---

### P-3 â€” Dark Mode Unification
**à¦•à§€:** à¦¬à¦°à§à¦¤à¦®à¦¾à¦¨à§‡ `isDark` state + `dark:` variant à¦®à¦¿à¦¶à§à¦°à¦¿à¦¤à¥¤ à¦à¦•à¦Ÿà¦¾à¦‡ à¦ªà¦¦à§à¦§à¦¤à¦¿à¥¤
- [ ] à¦¸à¦¿à¦¦à§à¦§à¦¾à¦¨à§à¦¤: `isDark` state (class-based) â€” `dark:` variant à¦—à§à¦²à§‹ conditional class-à¦ à¦°à§‚à¦ªà¦¾à¦¨à§à¦¤à¦°à¥¤
- [ ] `<html>`/root-à¦ `.dark` class à¦¨à¦¾ à¦¬à¦¸à¦¿à¦¯à¦¼à§‡ conditional class à¦¬à¦œà¦¾à¦¯à¦¼ à¦°à¦¾à¦–à¦¾ (à¦¬à¦°à§à¦¤à¦®à¦¾à¦¨ à¦ªà¦¦à§à¦§à¦¤à¦¿)à¥¤
- [ ] à¦¸à¦¬ `dark:` utility à¦–à§à¦à¦œà§‡ à¦¬à§‡à¦° à¦•à¦°à§‡ conditional template-à¦ à¦¬à¦¦à¦² (à¦¯à§‡à¦–à¦¾à¦¨à§‡ à¦­à¦¾à¦™à¦›à§‡)à¥¤

**à¦¯à¦¾à¦šà¦¾à¦‡:** à¦ªà§à¦°à¦¤à¦¿à¦Ÿà¦¿ à¦­à¦¿à¦‰ light/dark à¦¦à§à¦‡ mode-à¦ screenshot compareà¥¤

---

### P-4 â€” i18n Completeness
**à¦•à§€:** `translations`-à¦ hard-coded English string à¦¯à§‹à¦— (UI-only)à¥¤
- [ ] Identified hard-coded strings (à¦¯à§‡à¦®à¦¨ `"Cloudy"`, `"Wind Speed"`, `"Book Ride Now â†’"`, `"Air Pollution (DEFRA)"`, forecast day names) â†’ `translations.en` + `translations.bn`.
- [ ] Weather-à¦à¦° hard-coded `Â° Celsius` â†’ `formatTempFull()` (behavior à¦ à¦¿à¦• à¦•à¦°à¦¾, à¦à¦•à¦‡ à¦¦à§‡à¦–à¦¤à§‡ à¦²à¦¾à¦—à¦¬à§‡)à¥¤
- [ ] Full coverage: à¦¬à¦¾à¦‚à¦²à¦¾ mode-à¦ à¦•à§‹à¦¨à§‹ English à¦«à§à¦Ÿà§‡ à¦¨à¦¾ à¦¥à¦¾à¦•à¦¾à¥¤

**à¦¨à¦¿à¦¯à¦¼à¦®:** translation key à¦¯à§‹à¦— à¦•à¦°à¦¾ à¦¹à¦¬à§‡, key structure à¦¬à¦¦à¦²à¦¾à¦¨à§‹ à¦¹à¦¬à§‡ à¦¨à¦¾ (existing key rename à¦à¦¡à¦¼à¦¾à¦¨à§‹)à¥¤

---

### P-5 â€” Handler Completion
**à¦•à§€:** handler-less / stub button à¦—à§à¦²à§‹ à¦¸à§Ž à¦•à¦°à¦¾ (UI à¦…à¦ªà¦°à¦¿à¦¬à¦°à§à¦¤)à¥¤
- [ ] Forecast â† â†’ arrows: disabled style à¦¬à¦¾ no-op (à¦¸à§Ž disabled) â€” à¦…à¦¥à¦¬à¦¾ "coming soon" tooltipà¥¤
- [ ] Temperature map +/- : disabled / aria-disabledà¥¤
- [ ] "Book Ride Now â†’": disabled cursor + "Soon" label (UI layout à¦à¦•)à¥¤
- [ ] Notification items: `read` marker optional (UI à¦à¦•)à¥¤
- [ ] Logout / Contact / Feedback: à¦†à¦šà¦°à¦£ à¦…à¦ªà¦°à¦¿à¦¬à¦°à§à¦¤ (alert+reset) â€” à¦¶à§à¦§à§ comment à¦¨à¦¯à¦¼, UI à¦à¦•; à¦šà¦¾à¦‡à¦²à§‡ à¦¸à§à¦ªà¦·à§à¦Ÿ "demo" à¦¸à§‚à¦šà¦¨à¦¾à¥¤

**à¦¨à¦¿à¦¯à¦¼à¦¨à§à¦¤à§à¦°à¦£:** à¦•à§‹à¦¨à§‹ à¦•à¦¾à¦œ à¦•à¦°à¦¾ button-à¦ à¦¹à¦¾à¦¤ à¦¦à§‡à¦“à¦¯à¦¼à¦¾ à¦¹à¦¬à§‡ à¦¨à¦¾à¥¤

---

### P-6 â€” Code Organization (reusable components)
**à¦•à§€:** `page.tsx`-à¦à¦° 2520 à¦²à¦¾à¦‡à¦¨ à¦­à¦¾à¦™à¦¾ â€” **UI à¦†à¦—à§‡à¦° à¦®à¦¤à§‹à¦‡**, à¦¶à§à¦§à§ markup à¦ªà§à¦¨à¦°à§à¦¬à§à¦¯à¦¬à¦¹à¦¾à¦°à¦¯à§‹à¦—à§à¦¯ component-à¦à¥¤
- [ ] `Gauge` (SVG circular) â€” CNG/Rickshaw/Rides/Pollutantsà¥¤
- [ ] `StatusDot` (dot + label)à¥¤
- [ ] `ForecastCard` (à¦¦à§à¦‡ à¦œà¦¾à¦¯à¦¼à¦—à¦¾à¦° duplicate à¦¸à¦°à¦¿à¦¯à¦¼à§‡ à¦à¦•à¦Ÿà¦¾à¦‡)à¥¤
- [ ] `ModalShell` (overlay + card + X) â€” à§ª modalà¥¤
- [ ] `Card` wrapper (dark/light conditional)à¥¤
- [ ] `components/` à¦«à§‹à¦²à§à¦¡à¦¾à¦° (app-à¦à¦° à¦­à§‡à¦¤à¦°à§‡ à¦¬à¦¾ src/)à¥¤

**à¦¨à¦¿à¦¯à¦¼à¦¨à§à¦¤à§à¦°à¦£:** visual regression â€” à¦†à¦—à§‡à¦° à¦¸à§à¦•à§à¦°à¦¿à¦¨à§‡à¦° à¦¸à¦¾à¦¥à§‡ pixel-ish match; à¦•à§‹à¦¨à§‹ layout shift à¦¨à§‡à¦‡à¥¤

---

### P-7 â€” Accessibility Pass
- [ ] aria-label (icon-only buttons), aria-expanded (dropdowns/accordions)à¥¤
- [ ] Keyboard (Esc to close modal, Enter on nav)à¥¤
- [ ] Focus stylesà¥¤
- [ ] Canvas-à¦ fallback text / aria-hiddenà¥¤

---

## à§ª. Phase Dependency

```
P-1 (Foundation)  â”€â”€â–º P-2 (Responsive)
        â”‚
        â”œâ”€â”€â–º P-3 (Dark Mode)
        â”œâ”€â”€â–º P-4 (i18n)
        â””â”€â”€â–º P-5 (Handlers)
P-6 (Components) â”€â”€â–º P-7 (A11y)
```
P-1 à¦…à¦¬à¦¶à§à¦¯à¦‡ à¦ªà§à¦°à¦¥à¦®à¥¤ P-2..P-5 à¦•à§à¦°à¦®à¦¿à¦• à¦¨à¦¯à¦¼, à¦¤à¦¬à§‡ à¦ªà§à¦°à¦¤à§à¦¯à§‡à¦•à¦Ÿà¦¾ P-1-à¦à¦° à¦ªà¦°à¥¤ P-6 à¦¬à¦¡à¦¼ (refactor) â€” P-1..P-5 à¦¶à¦¾à¦¨à§à¦¤ à¦¹à¦²à§‡à¥¤

---

## à§«. Verification Protocol (à¦ªà§à¦°à¦¤à¦¿ phase-à¦)

1. `npm run lint` â€” à¦•à§‹à¦¨à§‹ à¦¨à¦¤à§à¦¨ error à¦¨à§‡à¦‡à¥¤
2. `npm run build` â€” build successfulà¥¤
3. **Manual QA checklist** (à¦ªà§à¦°à¦¤à¦¿ phase):
   - [ ] à§¯à¦Ÿà¦¿ à¦­à¦¿à¦‰ à¦–à§‹à¦²à§‡ (sidebar navigation)à¥¤
   - [ ] Dark â†” Light toggle à¦ à¦¿à¦• (à¦¸à¦¬ à¦­à¦¿à¦‰)à¥¤
   - [ ] English â†” à¦¬à¦¾à¦‚à¦²à¦¾ toggle (à¦¸à¦¬ text)à¥¤
   - [ ] Location à¦¬à¦¦à¦²à¦¾à¦²à§‡ temp/aqi/cng/rickshaw à¦¬à¦¦à¦²à¦¾à¦¯à¦¼à¥¤
   - [ ] Temp C/F à¦¸à¦ à¦¿à¦•à¥¤
   - [ ] Transport search + filter à¦•à¦¾à¦œ à¦•à¦°à§‡à¥¤
   - [ ] à§ªà¦Ÿà¦¿ modal à¦–à§‹à¦²à§‡/à¦¬à¦¨à§à¦§ à¦¹à¦¯à¦¼ (X)à¥¤
   - [ ] Canvas CCTV à¦šà¦²à§‡ (Dashboard + Live Street)à¥¤
   - [ ] Contact/Feedback form alert + resetà¥¤
   - [ ] FAQ accordionà¥¤
   - [ ] Notification panel + outside clickà¥¤
   - [ ] Map/Emergency tel: linkà¥¤
   - [ ] Mobile viewport (375px) â€” sidebar/header à¦ à¦¿à¦•à¥¤

4. à¦•à§‹à¦¨à§‹ regression à¦ªà§‡à¦²à§‡: à¦¸à§‡à¦‡ phase stop, bug report, à¦¤à¦¾à¦°à¦ªà¦° proceedà¥¤

---

## à§¬. Out of Scope (à¦à¦‡ à¦°à§‹à¦¡à¦®à§à¦¯à¦¾à¦ªà§‡ à¦¨à§‡à¦‡)

- Backend / API / databaseà¥¤
- Authentication / login flow (logout stub à¦¥à¦¾à¦•à¦¬à§‡)à¥¤
- Real-time API integration (weather/traffic)à¥¤
- à¦¨à¦¤à§à¦¨ packageà¥¤
- à¦¨à¦¤à§à¦¨ à¦­à¦¿à¦‰/à¦¸à§à¦•à§à¦°à¦¿à¦¨ à¦¯à§‹à¦— (à¦•à§‡à¦¬à¦² à¦¸à¦‚à¦¶à§‹à¦§à¦¨/à¦¸à¦‚à¦—à¦ à¦¨)à¥¤
- Routingruleset à¦ªà¦°à¦¿à¦¬à¦°à§à¦¤à¦¨à¥¤

---

## à§­. Definition of Done

- [ ] à¦¸à¦¬ à§¯ à¦­à¦¿à¦‰, à§ª à¦®à¦¡à¦¾à¦², à¦¸à¦¬ interaction à¦…à¦ªà¦°à¦¿à¦¬à¦°à§à¦¤à¦¿à¦¤à¥¤
- [ ] `npm run lint` + `npm run build` à¦ªà¦¾à¦¸à¥¤
- [ ] Manual QA checklist à¦¸à¦¬ à¦ªà¦¾à¦¸à¥¤
- [ ] Desktop view à¦†à¦—à§‡à¦° à¦®à¦¤à§‹ (regression-free)à¥¤
- [ ] Mobile view usableà¥¤
- [ ] à¦•à§‹à¦¡ à¦ªà§à¦¨à¦°à§à¦¬à§à¦¯à¦¬à¦¹à¦¾à¦°à¦¯à§‹à¦—à§à¦¯ (P-6 à¦¸à¦®à§à¦ªà¦¨à§à¦¨)à¥¤
- [ ] à¦•à§‹à¦¨à§‹ à¦¨à¦¤à§à¦¨ dependency/backend à¦¨à§‡à¦‡à¥¤

---

> **à¦ªà¦°à¦¬à¦°à§à¦¤à§€ à¦ªà¦¦à¦•à§à¦·à§‡à¦ª:** Phase 1 (P-1 Foundation Fixes) à¦¶à§à¦°à§ à¦•à¦°à¦¾à¦° à¦œà¦¨à§à¦¯ à¦…à¦¨à§à¦®à¦¤à¦¿/à¦¨à¦¿à¦°à§à¦¦à§‡à¦¶à¦¨à¦¾ à¦ªà§à¦°à¦¯à¦¼à§‹à¦œà¦¨à¥¤ à¦à¦‡ audit à¦¶à§‡à¦· â€” **behavior à¦ªà¦°à¦¿à¦¬à¦°à§à¦¤à¦¨ à¦¹à¦¯à¦¼à¦¨à¦¿**à¥¤
