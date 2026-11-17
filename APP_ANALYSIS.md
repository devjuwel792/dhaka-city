# ঢাকা সিটি ড্যাশবোর্ড — সম্পূর্ণ অ্যাপ বিশ্লেষণ (Full App Analysis)

এই ডকুমেন্টে **dhaka-city** প্রজেক্টটির সম্পূর্ণ বিশ্লেষণ দেওয়া হয়েছে — এটি কী, কীভাবে কাজ করে, প্রতিটি ফিচারের আচরণ, state management, data simulation এবং চালানোর নিয়ম।

---

## ১. সংক্ষিপ্ত পরিচিতি (Overview)

এটি একটি **ঢাকা শহরের Smart City Dashboard** ওয়েব অ্যাপ্লিকেশন। এটি একটি single-page interactive portal যেখানে নাগরিকরা রিয়েল-টাইম (সিমুলেটেড) তথ্য দেখতে পারে:

- **আবহাওয়া (Weather)** — তাপমাত্রা, আর্দ্রতা, বাতাস, AQI, forecast
- **ট্রানজিট (Transit)** — বাস রুট, মেট্রোরেল, CNG, রিকশার অবস্থা
- **ট্রাফিক (Traffic)** — সেক্টরভিত্তিক যানজট বিশ্লেষণ
- **লাইভ স্ট্রিট (Live Street)** — অ্যানিমেটেড CCTV ক্যামেরা ফিড
- **নিউজ ও তথ্য (News & Info)** — এলাকাভিত্তিক সংবাদ
- **Settings / Support / About**

> **মূল কথা:** পুরো অ্যাপটির সব ডেটা **mock/simulation** — কোনো আসল API, ব্যাকএন্ড বা ডেটাবেস নেই। সবকিছু React state ও সিমুলেশন লজিক দিয়ে চলে।

---

## ২. টেকনোলজি স্ট্যাক (Tech Stack)

| স্তর | প্রযুক্তি |
|------|-----------|
| Framework | **Next.js 16.2.9** (App Router) |
| UI Library | **React 19.2.4** |
| Language | **TypeScript 5** |
| Styling | **Tailwind CSS v4** (`@tailwindcss/postcss`) |
| Icons | **lucide-react** |
| Fonts | **next/font/google** (Geist, Geist_Mono) |
| Lint | ESLint 9 (`eslint-config-next`) |

### package.json এর মূল অংশ
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
}
```

**নোট:** `AGENTS.md` সতর্ক করে — এটি আপনার পরিচিত Next.js এর চেয়ে ভিন্ন ভার্সন (16), তাই `node_modules/next/dist/docs/` এর ডকুমেন্টেশন দেখে কোড লিখতে হবে।

---

## ৩. প্রজেক্ট স্ট্রাকচার (Project Structure)

```
dhaka-city/
├── app/
│   ├── layout.tsx        # Root layout (fonts, metadata, <html>/<body>)
│   ├── page.tsx          # ⭐ পুরো অ্যাপের সমস্ত কোড (2520 lines)
│   ├── globals.css       # Tailwind import + CSS variables
│   └── favicon.ico
├── public/               # static assets (svg)
├── package.json
├── next.config.ts        # Next.js config (খালি)
├── tsconfig.json         # TypeScript config (@/* path alias)
├── eslint.config.mjs
├── postcss.config.mjs
├── CLAUDE.md → @AGENTS.md
├── AGENTS.md
└── README.md
```

### মূল ফাইল দুটির ভূমিকা

**`app/layout.tsx`** — এটি root shell:
- `Geist` ও `Geist_Mono` ফন্ট লোড করে CSS variable হিসেবে (`--font-geist-sans`, `--font-geist-mono`)
- `metadata` (title/description) সেট করে
- `<html lang="en">` ও `<body>` রেন্ডার করে, সব page এই body-র ভেতরে আসে

**`app/page.tsx`** — এটাই সমগ্র অ্যাপ:
- `"use client"` ডাইরেক্টিভ দিয়ে শুরু — মানে এটি **Client Component** (সব interactivity browser-এ চলে)
- সব state, translation dictionary, mock data, UI, modals — সব এক ফাইলের ভেতরে

---

## ৪. সামগ্রিক আর্কিটেকচার (Architecture)

এটি ** monolithic single-file client app**। কোনো routing নেই — একটাই `page.tsx` এর ভেতরে `activeTab` state দিয়ে ৯টি "ভিউ" টগল হয়।

```
┌─────────────────────────────────────────────┐
│                  <div> root wrapper           │
│  (dark/light class toggle)                    │
│  ┌──────────────┐  ┌───────────────────────┐ │
│  │  1. SIDEBAR   │  │   2. MAIN CONTENT      │ │
│  │  (nav menu)   │  │  ┌─────────────────┐   │ │
│  │               │  │  │ HEADER          │   │ │
│  │ - Dashboard   │──│  │ (clock, pills)  │   │ │
│  │ - Weather     │  │  ├─────────────────┤   │ │
│  │ - Transit     │  │  │ DYNAMIC DOCK    │   │ │
│  │ - Traffic     │  │  │ (activeTab অনুযায়ী │ │
│  │ - Live Street │  │  │  9টি ভিউ)         │   │ │
│  │ - News        │  │  └─────────────────┘   │ │
│  │ - Settings... │  └───────────────────────┘ │
│  └──────────────┘                              │
│  ┌────────────────────────────────────────────┐│
│  │   3. MODALS (Map, Emergency, Camera, News)  ││
│  └────────────────────────────────────────────┘│
└─────────────────────────────────────────────┘
```

### Layout-এর ৪টি প্রধান অংশ

1. **Sidebar (বাম)** — নেভিগেশন মেনু (৬টি মূল ট্যাব + Settings/Support/About + Logout)
2. **Header (উপরে)** — লাইভ ঘড়ি, তারিখ, location selector, map/mode/language/emergency/notification pills, avatar
3. **Dynamic Content Dock** — `activeTab` অনুযায়ী ৯টি ভিউ এর একটা দেখায়
4. **Modals** — ৪টি পপআপ (Map, Emergency, Camera, News article)

---

## ৫. State Management (সব State এক জায়গায়)

সব state `Home()` কম্পোনেন্টের ভেতরে `useState` দিয়ে রাখা। কোনো Redux/Zustand/Context নেই।

### ৫.১ নেভিগেশন ও ইউজার-প্রেফারেন্স
| State | ধরন | কাজ |
|-------|------|-----|
| `activeTab` | string | কোন ভিউ দেখাচ্ছে (default: `"transit"`) |
| `lang` | `"en" \| "bn"` | ভাষা (English/Bangla) |
| `isDark` | boolean | dark/light mode |
| `location` | string | নির্বাচিত এলাকা (default: `"Mirpur 10"`) |

### ৫.২ UI পপআপ/মড নিয়ন্ত্রণ
| State | কাজ |
|-------|-----|
| `showLocationDropdown` | location dropdown খোলা/বন্ধ |
| `showMapModal` | ম্যাপ মডাল |
| `showEmergencyModal` | ইমার্জেন্সি নম্বর মডাল |
| `showNotificationPanel` | নোটিফিকেশন প্যানেল |
| `showCameraModal` | কোন camera feed (id) — null হলে বন্ধ |
| `showNewsModal` | কোন news article (id) — null হলে বন্ধ |

### ৫.৩ ঘড়ি
- `currentTime`, `currentDate` — প্রতি সেকেন্ডে আপডেট হয়

### ৫.৪ Transport Alerts ফিল্টার
- `alertsSearch` — সার্চ টেক্সট
- `alertsFilter` — `"all" / "good" / "minor" / "major"`

### ৫.৫ Settings
- `tempUnit` (`"C"|"F"`), `refreshRate` (5/10/15/30), `weatherAlerts`, `preferredRoutes`, `trafficAlerts`, `congestionAlerts`, `newsSources`

### ৫.৬ Support/Feedback
- `openFaq`, `contactName`, `contactEmail`, `contactMessage`, `feedbackSubject`, `feedbackDesc`, `selectedFile`, `fileInputRef`

---

## ৬. মূল কার্যকারিতা — কীভাবে কাজ করে (How It Works)

### ৬.১ ভাষা অনুবাদ (Translation System) — `page.tsx:39-304`
`translations` নামে একটি বড় object আছে যার দুইটা key: `en` ও `bn`। প্রতিটা UI টেক্সট এখানে key-value আকারে আছে।
```tsx
const t = translations[lang];
```
এরপর JSX-এ `{t.dashboard}`, `{t.weather}` ইত্যাদি লেখা হয়। ভাষা বদলালে `lang` state বদলায় → `t` রেফারেন্স বদলায় → পুরো UI-র টেক্সট সাথে সাথে বদলে যায়।

**ভাষা টগল বাটন:** `setLang(lang === "en" ? "bn" : "en")` — `page.tsx:835`

### ৬.২ লাইভ ঘড়ি (Real-time Clock) — `page.tsx:394-409`
```tsx
useEffect(() => {
  const updateTime = () => {
    const now = new Date();
    // locale অনুযায়ী তারিখ ও সময় ফরম্যাট
    setCurrentTime(...);
    setCurrentDate(...);
  };
  updateTime();
  const interval = setInterval(updateTime, 1000); // প্রতি সেকেন্ড
  return () => clearInterval(interval);
}, [lang]); // ভাষা বদলালে আবার চলে
```
- `lang` change হলে আবার রান হয়, locale বদলে যায় (`en-US` / `bn-BD`)

### ৬.৩ ডেটা রিফ্রেশ ট্রিগার — `page.tsx:356-362`
```tsx
useEffect(() => {
  const interval = setInterval(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, refreshRate * 1000);
  return () => clearInterval(interval);
}, [refreshRate]);
```
- Settings-এ `refreshRate` (5/10/15/30s) বদলালে interval রিসেট হয়
- `refreshTrigger` প্রতি টিকে বাড়ে, যা `currentDetails` (মক ডেটা) এর fluctuation হিসাব করে — মানে ডেটা "লাইভ আপডেট হচ্ছে" এর মতো দেখায়

### ৬.৪ এলাকাভিত্তিক ডাইনামিক ডেটা (Simulation) — `page.tsx:524-551`
`useMemo` দিয়ে `currentDetails` হিসাব হয়। এলাকা অনুযায়ী একটা **multiplier** ঠিক হয়:

| এলাকা | multiplier |
|-------|-----------|
| Gulshan | 1.15 |
| Dhanmondi | 0.95 |
| Uttara | 0.85 |
| Motijheel | 1.25 |
| (বাকি) | 1.0 |

তারপর `Math.sin(refreshTrigger)` দিয়ে সামান্য fluctuation যোগ হয়। এভাবে তৈরি হয়:
- `temp`, `feelsLike`, `aqi`, `pm25`, `waterloggingRisk`
- `cngAvailability` (high/mod/low), `rickshawAvailability` (high/mod/low)

**ফলে:** location বদলালে বা সময়ের সাথে সাথে সংখ্যাগুলো বদলায় — বাস্তব ডেটার মতো লাগে, আসলে সব গণনা করা সিমুলেশন।

### ৬.৫ তাপমাত্রা ফরম্যাটার — `page.tsx:369-388`
`tempUnit` অনুযায়ী C ↔ F রূপান্তর:
- `formatTemp`: `23° C` / `73° F`
- `formatTempFull`: `23° Celsius` / `73° Fahrenheit`
- `formatTempNum`: শুধু সংখ্যা + `°`

```tsx
Math.round((celsius * 9) / 5 + 32)  // C → F সূত্র
```

### ৬.৬ Transport Alerts ফিল্টারিং — `page.tsx:628-637`
`useMemo` দিয়ে `filteredAlerts` তৈরি হয়:
- `alertsSearch` দিয়ে নাম মেলে কিনা (case-insensitive)
- `alertsFilter` অনুযায়ী status ফিল্টার (all/good/minor/major)

---

## ৭. প্রতিটি ভিউ / ট্যাব বিস্তারিত (Tabs Explained)

Sidebar-এ ক্লিক করলে `setActiveTab(item.id)` কল হয়, আর `activeTab === "..."` শর্তে সেই ভিউ রেন্ডার হয়।

### ৭.১ Dashboard (`activeTab === "dashboard"`) — `page.tsx:924`
সবচেয়ে বড় ভিউ, ১২-কলাম গ্রিডে সাজানো:
- **Weather card** (আজকের তাপমাত্রা, CloudSun অ্যানিমেশন) + **৫-দিনের forecast**
- **Street Map widget** (SVG দিয়ে আঁকা সিমুলেটেড ম্যাপ + লোকেশন pin)
- **Air Pollution (DEFRA)** — Ozone/NO2/Dust বার চার্ট
- **App-Based Rides** — ৩টি circular gauge (Available/Limited/Busy)
- **Transport Alerts table** (প্রথম ৫টি) — "See details" এ Transit ট্যাবে নিয়ে যায়
- ডান কলামে: **News widget**, **Traffic Now indicator**, **Live Street Camera feeds** (canvas)

### ৭.২ Weather (`activeTab === "weather"`) — `page.tsx:1284`
- বড় আজকের আবহাওয়া banner + ৫-দিনের forecast
- **Hourly Forecast** — ৪টি ঘণ্টার তথ্য (আইকন, তাপমাত্রা, hum, wind)
- **Temperature Map** — SVG তাপমাত্রা ম্যাপ (Savar/Dhaka/Narayanganj)
- Weather details grid (feels like, UV, wind, visibility, humidity, AQI)
- **Satellite card** (SVG)
- ডান কলাম: **Sun Cycle** (sunrise/sunset), **Waterlogging Risk** (slider), **Air Quality** (AQI + pollutants)

### ৭.৩ Transit (`activeTab === "transit"`) — `page.tsx:1622` (ডিফল্ট ভিউ)
- **Transport Alerts** টেবিল — সার্চ বক্স + ফিল্টার dropdown + স্ট্যাটাস লেজেন্ড
- ডান কলাম:
  - **Bus Routes Status** — গ্রিডে সব রুটের অবস্থা
  - **Metro Rail Status** — দুই track-এর (Uttara/Motijheel) প্রোগ্রেস বার + স্টেশন node
  - **CNG Availability** — ৩টি circular gauge
  - **Rickshaw Availability** — ৩টি circular gauge

### ৭.৪ Traffic (`activeTab === "traffic"`) — `page.tsx:1876`
- সেক্টরভিত্তিক কার্ড (Mirpur 10, Rokeya, Dhanmondi, Mohakhali) — speed + status
- "Open Interactive Map" বাটন → Map modal খোলে

### ৭.৫ Live Street (`activeTab === "livestreet"`) — `page.tsx:1910`
- ৩টি বড় camera card, প্রতিটিতে animated `<canvas>` (চলতি গাড়ি, scanline, REC dot)
- ক্লিক করলে fullscreen camera modal

### ৭.৬ News (`activeTab === "news"`) — `page.tsx:1958`
- ৩টি সংবাদ কার্ড (tag, title, summary) — ক্লিক করলে বিস্তারিত modal

### ৭.৭ Settings (`activeTab === "settings"`) — `page.tsx:1995`
- **General**: temp unit toggle (C/F), refresh rate (5/10/15/30), theme toggle
- **Weather**: weather alerts switch
- **Transit**: preferred routes switch
- **Traffic**: traffic alerts + congestion alerts switch
- **News**: customized news sources switch
- সব switch গুলো শুধু state বদলায় (কোনো persistence নেই)

### ৭.৮ Support (`activeTab === "support"`) — `page.tsx:2120`
- **FAQs** — ১০টি প্রশ্ন, accordion (ক্লিক করলে answer খোলে) — `openFaq` state
- **Contact Form** — name/email/message → Send এ `alert()` দেখায়, field reset
- **Feedback Form** — subject/desc/file upload → Submit এ `alert()`, reset
- Contact info (email)

### ৭.৯ About (`activeTab === "about"`) — `page.tsx:2236`
- Hero banner, Mission, Data Sources, Team (FK, MS), Contact

---

## ৮. CCTV ক্যামেরা অ্যানিমেশন (Canvas Simulation) — `page.tsx:426-521`

এটি অ্যাপের সবচেয়ে ইন্টারেস্টিং অংশ। কোনো আসল ভিডিও নেই — `<canvas>`-এ 2D অ্যানিমেশন আঁকা হয়:

1. `canvasIds = ["mirpur10", "avenue5", "rokeya"]` — ৩টি ক্যামেরা
2. প্রতিটির জন্য ৬টি "car" তৈরি (random x, y, speed, color, size)
3. `setInterval(animate, 33)` — প্রতি ৩৩ms এ (~30 FPS) এডিট:
   - asphalt পটভূমি, রাস্তার লাইন, dashed center line
   - গাড়ি আঁকে + headlights, গাড়ি ডানে সরে, শেষ হলে আবার বাম থেকে
   - CCTV scanline effect (সবুজ/সাদা horizontal line)
   - overlay text: `CAM-XXXX 1080p`, `FPS: 30.00`, বর্তমান সময়
   - `REC` লাল ডট ফ্ল্যাশ করে
4. `canvasRefs` — প্রতিটি canvas এর DOM reference রাখে
5. dependency: `[activeTab, showCameraModal]` — ট্যাব/মডাল বদলালে পুনরায় চালু হয়
6. cleanup: সব interval `clearInterval` করা হয় (memory leak এড়াতে)

> **দ্রষ্টব্য:** এই canvas গুলো Dashboard (ছোট) ও Live Street (বড়) — দুই জায়গায় একই `feed.id` দিয়ে রেন্ডার হয়। একই id-তে দুইটা canvas ref ওভাররাইট হতে পারে (একটা সীমাবদ্ধতা)।

---

## ৯. মডালসমূহ (Modals) — `page.tsx:2304-2516`

সব modal `fixed inset-0 bg-black/60 backdrop-blur` দিয়ে full-screen overlay:

1. **Map Modal** (`showMapModal`) — SVG-তে আঁকা ঢাকা শহরের ম্যাপ: নদী (Buriganga/Turag), রাস্তা, ট্রানজিট লাইন, ৬টি city node (Uttara, Mirpur 10, Farmgate, Shahbagh, Motijheel, Gulshan 2), legend
2. **Emergency Modal** (`showEmergencyModal`) — `emergencyContacts` array (৯৯৯, Fire Service, DMP, WASA, Shastho Batayon), প্রতিটিতে `tel:` লিংক (ক্লিক করলে ফোন ডায়াল)
3. **Camera Modal** (`showCameraModal`) — বড় canvas ভিডিও প্লেয়ার + LIVE badge + codec info
4. **News Modal** (`showNewsModal`) — নির্বাচিত সংবাদ নিবন্ধের বিস্তারিত (IIFE দিয়ে article খোঁজা হয়)

---

## ১০. Emergency Contacts ডেটা — `page.tsx:307-313`

```tsx
const emergencyContacts = [
  { service: "National Emergency Helpline", number: "999", ... },
  { service: "Dhaka Fire Service Headquarters", number: "02-9555555", ... },
  { service: "Dhaka Metropolitan Police (DMP)", number: "01713-373100", ... },
  { service: "Dhaka WASA Water Supply Emergency", number: "16162", ... },
  { service: "Government Health Call Center", number: "16263", ... }
];
```
প্রতিটির icon, color, description আছে। `tel:` লিংকের মাধ্যমে সরাসরি ডায়াল করা যায়।

---

## ১১. Mock Data Lists (কোথায় ডেটা আসে)

| Data | অবস্থান | ব্যবহার |
|------|---------|--------|
| `transportAlertsList` | `page.tsx:554` | Transit alerts (২৫টি রুট, status+color) |
| `busRoutesStatus` | `page.tsx:582` | Bus route grid |
| `newsList` | `page.tsx:594` | ৩টি সংবাদ (id, title, summary, full, tag, image gradient) |
| `cameraFeeds` | `page.tsx:621` | ৩টি camera feed (id, name, live) |
| `notifications` | `page.tsx:640` | ৩টি নোটিফিকেশন (high/med level) |
| `locationsList` | `page.tsx:391` | ৮টি এলাকা |

সব ডেটা কম্পোনেন্টের ভেতরে hard-coded — বাইরে থেকে আসে না।

---

## ১২. কী কী ইন্টারঅ্যাকশন কাজ করে (Working Interactions)

✅ **কাজ করে:**
- Sidebar-এ ভিউ বদলানো (৯টি ট্যাব)
- Dark/Light mode toggle
- English ↔ বাংলা ভাষা toggle (সব টেক্সট বদলায়)
- Location dropdown থেকে এলাকা বদলালে ডেটা বদলায়
- Transport search + filter
- Temp unit C/F (সব জায়গায় তাপমাত্রা বদলায়)
- Settings-এ সব switch/toggle
- FAQ accordion
- Map/Emergency/Camera/News modals
- Emergency number-এ `tel:` লিংক
- Contact/Feedback form (alert + reset)

⚠️ **শুধু UI/সিমুলেশন (আসল কাজ করে না):**
- Logout → শুধু `alert("Logged out successfully")`
- Contact/Feedback submit → শুধু `alert()`, কোথাও পাঠায় না
- Weather "Full Map", forecast arrows, temperature map +/- বাটন — কোনো handler নেই
- Settings switches — কোনো persistence নেই (রিফ্রেশ করলে রিসেট)
- Live camera — আসল ভিডিও নয়, canvas অ্যানিমেশন
- আসল weather/traffic/news API সংযোগ নেই

---

## ১৩. ডিজাইন প্যাটার্ন ও Conventions

- **Utility-first styling**: সব styling Tailwind class দিয়ে inline (কোনো CSS module নেই)
- **Dark mode**: `isDark` state দিয়ে conditionally class বদল (`dark:` variant ও শর্তসাপেক্ষ class দুটোই ব্যবহৃত)
- **Responsive**: `grid-cols-1 xl:grid-cols-12`, `md:grid-cols-*`, `flex-col md:flex-row` — মোবাইল থেকে ডেস্কটপ
- **Reusable visual components**: circular gauge (SVG `strokeDasharray`/`strokeDashoffset`), status dot + label pattern বারবার ব্যবহৃত
- **Color coding**: সবুজ=ভালো, amber=মাঝারি, লাল=খারাপ/সতর্কতা
- **Animation**: `animate-pulse`, `animate-bounce`, `animate-ping`, `animate-spin` (Tailwind + inline duration)

---

## ১৪. চালানোর নিয়ম (How to Run)

```bash
# ১. dependencies install
npm install

# ২. dev server (http://localhost:3000)
npm run dev

# ৩. production build
npm run build
npm run start

# ৪. lint
npm run lint
```

- Node.js 20+ প্রয়োজন (`@types/node: ^20`)
- কোনো `.env` ফাইল লাগে না (সব mock)
- কোনো external API key লাগে না

---

## ১৫. সারসংক্ষেপ (Summary)

| বিষয় | বিবরestation |
|-------mati|
| ধরন | Single-page Smart City Dashboard |
| ফ্রেমওয়ার্ক | Next.js 16 + React 19 + TypeScript |
| স্টাইল | Tailwind CSS v4 |
| মূল ফাইল | `app/page.tsx` (২৫২০ লাইন, সবকিছু এখানে) |
| স্টেট | একাধিক `useState`, কোনো global store নেই |
| ডেটা | সম্পূর্ণ mock/hard-coded + simulation |
| ভিউ | ৯টি (activeTab দিয়ে টগল) |
| মডাল | ৪টি |
| ইন্টারঅ্যাকশন | navigation, theme, language, filter, settings, forms, canvas CCTV |
| আসল ব্যাকএন্ড | ❌ নেই |

**উপসংহার:** এটি মূলত একটি **ফ্রন্টএন্ড প্রোটোটাইপ / UI ডেমো** — ভিজ্যুয়াল ও ইন্টারঅ্যাকটিভ feature সমৃদ্ধ, কিন্তু সব ডেটা সিমুলেটেড। এটি বাস্তব ডেটা (weather/traffic API, auth, database) এর সাথে যুক্ত করলে একটি সম্পূর্ণ প্রোডাকশন অ্যাপে পরিণত হতে পারে।