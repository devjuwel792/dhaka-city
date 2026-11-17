import type { AirQualityCurrent, AirQualitySubIndices } from "@/services/api";

export type AqiScale = "us" | "european";

export interface AqiCategory {
  id: string;
  min: number;
  /** Inclusive upper bound; `Infinity` for the top band. */
  max: number;
  labelKey: string;
  guidanceKey: string;
  /** Representative band colour (also used for chart marks). */
  color: string;
  textClass: string;
  bgClass: string;
  borderClass: string;
}

/**
 * US EPA AQI bands (0–500). Guidance text mirrors the published AirNow
 * category descriptions. The scale is non-linear, so each band is rendered as
 * one equal segment of the gradient scale.
 */
export const US_AQI_CATEGORIES: AqiCategory[] = [
  {
    id: "good",
    min: 0,
    max: 50,
    labelKey: "aqiGood",
    guidanceKey: "aqiGoodGuidance",
    color: "#00E400",
    textClass: "text-emerald-600 dark:text-emerald-400",
    bgClass: "bg-emerald-50 dark:bg-emerald-950/20",
    borderClass: "border-emerald-200 dark:border-emerald-900/40",
  },
  {
    id: "moderate",
    min: 51,
    max: 100,
    labelKey: "aqiModerate",
    guidanceKey: "aqiModerateGuidance",
    color: "#FACC15",
    textClass: "text-yellow-600 dark:text-yellow-400",
    bgClass: "bg-yellow-50 dark:bg-yellow-950/20",
    borderClass: "border-yellow-200 dark:border-yellow-900/40",
  },
  {
    id: "sensitive",
    min: 101,
    max: 150,
    labelKey: "aqiSensitive",
    guidanceKey: "aqiSensitiveGuidance",
    color: "#FB923C",
    textClass: "text-orange-600 dark:text-orange-400",
    bgClass: "bg-orange-50 dark:bg-orange-950/20",
    borderClass: "border-orange-200 dark:border-orange-900/40",
  },
  {
    id: "unhealthy",
    min: 151,
    max: 200,
    labelKey: "aqiUnhealthy",
    guidanceKey: "aqiUnhealthyGuidance",
    color: "#EF4444",
    textClass: "text-red-600 dark:text-red-400",
    bgClass: "bg-red-50 dark:bg-red-950/20",
    borderClass: "border-red-200 dark:border-red-900/40",
  },
  {
    id: "veryUnhealthy",
    min: 201,
    max: 300,
    labelKey: "aqiVeryUnhealthy",
    guidanceKey: "aqiVeryUnhealthyGuidance",
    color: "#A855F7",
    textClass: "text-purple-600 dark:text-purple-400",
    bgClass: "bg-purple-50 dark:bg-purple-950/20",
    borderClass: "border-purple-200 dark:border-purple-900/40",
  },
  {
    id: "hazardous",
    min: 301,
    max: Number.POSITIVE_INFINITY,
    labelKey: "aqiHazardous",
    guidanceKey: "aqiHazardousGuidance",
    color: "#7F1D1D",
    textClass: "text-red-800 dark:text-red-300",
    bgClass: "bg-red-100 dark:bg-red-950/30",
    borderClass: "border-red-300 dark:border-red-900/50",
  },
];

/** EEA/European AQI bands (2024 revision): 0–100+ across six bands. */
export const EUROPEAN_AQI_CATEGORIES: AqiCategory[] = [
  {
    id: "good",
    min: 0,
    max: 20,
    labelKey: "eaqiGood",
    guidanceKey: "eaqiGoodGuidance",
    color: "#50F0E6",
    textClass: "text-teal-600 dark:text-teal-400",
    bgClass: "bg-teal-50 dark:bg-teal-950/20",
    borderClass: "border-teal-200 dark:border-teal-900/40",
  },
  {
    id: "fair",
    min: 21,
    max: 40,
    labelKey: "eaqiFair",
    guidanceKey: "eaqiFairGuidance",
    color: "#8BE04E",
    textClass: "text-lime-600 dark:text-lime-400",
    bgClass: "bg-lime-50 dark:bg-lime-950/20",
    borderClass: "border-lime-200 dark:border-lime-900/40",
  },
  {
    id: "moderate",
    min: 41,
    max: 60,
    labelKey: "eaqiModerate",
    guidanceKey: "eaqiModerateGuidance",
    color: "#F5E14A",
    textClass: "text-yellow-600 dark:text-yellow-400",
    bgClass: "bg-yellow-50 dark:bg-yellow-950/20",
    borderClass: "border-yellow-200 dark:border-yellow-900/40",
  },
  {
    id: "poor",
    min: 61,
    max: 80,
    labelKey: "eaqiPoor",
    guidanceKey: "eaqiPoorGuidance",
    color: "#F08A3C",
    textClass: "text-orange-600 dark:text-orange-400",
    bgClass: "bg-orange-50 dark:bg-orange-950/20",
    borderClass: "border-orange-200 dark:border-orange-900/40",
  },
  {
    id: "veryPoor",
    min: 81,
    max: 100,
    labelKey: "eaqiVeryPoor",
    guidanceKey: "eaqiVeryPoorGuidance",
    color: "#E8474B",
    textClass: "text-red-600 dark:text-red-400",
    bgClass: "bg-red-50 dark:bg-red-950/20",
    borderClass: "border-red-200 dark:border-red-900/40",
  },
  {
    id: "extremelyPoor",
    min: 101,
    max: Number.POSITIVE_INFINITY,
    labelKey: "eaqiExtremelyPoor",
    guidanceKey: "eaqiExtremelyPoorGuidance",
    color: "#9C4D9E",
    textClass: "text-purple-700 dark:text-purple-400",
    bgClass: "bg-purple-50 dark:bg-purple-950/20",
    borderClass: "border-purple-200 dark:border-purple-900/40",
  },
];

/** Six equal colour segments for the AQI scale gradient. */
export function scaleGradient(categories: AqiCategory[]): string {
  const n = categories.length;
  const stops = categories.map((c, i) => `${c.color} ${(i / n) * 100}% ${((i + 1) / n) * 100}%`);
  return `linear-gradient(to right, ${stops.join(", ")})`;
}

export const US_AQI_GRADIENT = scaleGradient(US_AQI_CATEGORIES);
export const EUROPEAN_AQI_GRADIENT = scaleGradient(EUROPEAN_AQI_CATEGORIES);

export function categoriesForScale(scale: AqiScale): AqiCategory[] {
  return scale === "us" ? US_AQI_CATEGORIES : EUROPEAN_AQI_CATEGORIES;
}

export function categoryForUsAqi(aqi: number | null): AqiCategory | null {
  if (aqi == null || !Number.isFinite(aqi)) return null;
  return US_AQI_CATEGORIES.find((c) => aqi <= c.max) ?? US_AQI_CATEGORIES[US_AQI_CATEGORIES.length - 1];
}

export function categoryForEuropeanAqi(aqi: number | null): AqiCategory | null {
  if (aqi == null || !Number.isFinite(aqi)) return null;
  return (
    EUROPEAN_AQI_CATEGORIES.find((c) => aqi <= c.max) ??
    EUROPEAN_AQI_CATEGORIES[EUROPEAN_AQI_CATEGORIES.length - 1]
  );
}

export interface AqiReading {
  value: number | null;
  scale: AqiScale;
  category: AqiCategory | null;
}

/** Prefers US AQI (broader health guidance); falls back to European AQI. */
export function primaryReading(current: AirQualityCurrent): AqiReading {
  if (current.usAqi != null) {
    return { value: current.usAqi, scale: "us", category: categoryForUsAqi(current.usAqi) };
  }
  if (current.europeanAqi != null) {
    return {
      value: current.europeanAqi,
      scale: "european",
      category: categoryForEuropeanAqi(current.europeanAqi),
    };
  }
  return { value: null, scale: "us", category: null };
}

/**
 * Marker position on the equal-segment scale (0–100%). Each band occupies the
 * same visual width, so the marker reflects both the band and the value within it.
 */
export function scalePositionPercent(aqi: number | null, scale: AqiScale): number {
  if (aqi == null || !Number.isFinite(aqi)) return 0;
  const categories = categoriesForScale(scale);
  const index = categories.findIndex((c) => aqi <= c.max);
  if (index < 0) return 100;
  const band = categories[index];
  const span = band.max - band.min + 1;
  const within = Math.min(1, Math.max(0, (aqi - band.min) / span));
  return ((index + within) / categories.length) * 100;
}

export type PollutantKey =
  | "pm25"
  | "pm10"
  | "carbonMonoxide"
  | "nitrogenDioxide"
  | "sulphurDioxide"
  | "ozone";

export interface PollutantMeta {
  key: PollutantKey;
  symbol: string;
  labelKey: string;
  /** US AQI sub-index key used for the bar length. */
  subIndex: keyof AirQualitySubIndices;
  /** Human unit for the concentration value (all Open-Meteo pollutants are µg/m³). */
  unit: string;
}

export const POLLUTANTS: PollutantMeta[] = [
  { key: "pm25", symbol: "PM2.5", labelKey: "polPm25", subIndex: "pm25", unit: "µg/m³" },
  { key: "pm10", symbol: "PM10", labelKey: "polPm10", subIndex: "pm10", unit: "µg/m³" },
  { key: "carbonMonoxide", symbol: "CO", labelKey: "polCo", subIndex: "co", unit: "µg/m³" },
  { key: "nitrogenDioxide", symbol: "NO₂", labelKey: "polNo2", subIndex: "no2", unit: "µg/m³" },
  { key: "sulphurDioxide", symbol: "SO₂", labelKey: "polSo2", subIndex: "so2", unit: "µg/m³" },
  { key: "ozone", symbol: "O₃", labelKey: "polO3", subIndex: "o3", unit: "µg/m³" },
];

/** Concentration (µg/m³) for a pollutant, or `null` when the API omitted it. */
export function concentrationFor(current: AirQualityCurrent, key: PollutantKey): number | null {
  switch (key) {
    case "pm25":
      return current.pm25;
    case "pm10":
      return current.pm10;
    case "carbonMonoxide":
      return current.carbonMonoxide;
    case "nitrogenDioxide":
      return current.nitrogenDioxide;
    case "sulphurDioxide":
      return current.sulphurDioxide;
    case "ozone":
      return current.ozone;
    default:
      return null;
  }
}

/** Format a concentration for display; `null` stays an em dash (never 0). */
export function formatConcentration(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "—";
  return value >= 100 ? value.toFixed(0) : value.toFixed(1);
}

/** The pollutant with the highest US AQI sub-index (real API values only). */
export function primaryPollutantKey(current: AirQualityCurrent): PollutantKey | null {
  let best: PollutantKey | null = null;
  let bestValue = Number.NEGATIVE_INFINITY;
  for (const p of POLLUTANTS) {
    const value = current.subIndices[p.subIndex];
    if (value != null && value > bestValue) {
      bestValue = value;
      best = p.key;
    }
  }
  return best;
}

export function pollutantMeta(key: PollutantKey): PollutantMeta {
  return POLLUTANTS.find((p) => p.key === key) ?? POLLUTANTS[0];
}

/** Bar length (0–100%) for a US AQI sub-index, capped at the 500 scale ceiling. */
export function aqiBarPercent(subIndex: number | null): number {
  if (subIndex == null || !Number.isFinite(subIndex)) return 0;
  return Math.min(100, Math.max(0, (subIndex / 500) * 100));
}

/** US AQI ceiling used by trend / forecast charts (hazardous is open-ended). */
export const AQI_CHART_MAX = 300;