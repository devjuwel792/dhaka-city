import type { Lang, TempUnit } from "@/types";
import { APP_CONFIG } from "@/config";
import { MAP_LAYERS, DEFAULT_MAP_LAYER_ID } from "@/config/map";
import { DEFAULT_LOCATION_ID } from "@/config/locations";

export const STORAGE_PREFIX = "dhaka-city:";
const SETTINGS_KEY = `${STORAGE_PREFIX}settings`;

export interface WidgetVisibility {
  weather: boolean;
  airQuality: boolean;
  map: boolean;
  traffic: boolean;
  transit: boolean;
  news: boolean;
  cameras: boolean;
}

export interface AppSettings {
  theme: "light" | "dark";
  lang: Lang;
  location: string;
  tempUnit: TempUnit;
  refreshRate: number;
  weatherAlerts: boolean;
  trafficAlerts: boolean;
  congestionAlerts: boolean;
  preferredRoutes: boolean;
  newsSources: boolean;
  widgets: WidgetVisibility;
  mapLayer: string;
  cameraAutoplay: boolean;
}

export const DEFAULT_WIDGETS: WidgetVisibility = {
  weather: true,
  airQuality: true,
  map: true,
  traffic: true,
  transit: true,
  news: true,
  cameras: true,
};

export const DEFAULT_SETTINGS: AppSettings = {
  theme: "light",
  lang: "en",
  location: DEFAULT_LOCATION_ID,
  tempUnit: "C",
  refreshRate: 10,
  weatherAlerts: true,
  trafficAlerts: true,
  congestionAlerts: true,
  preferredRoutes: true,
  newsSources: true,
  widgets: DEFAULT_WIDGETS,
  mapLayer: DEFAULT_MAP_LAYER_ID,
  cameraAutoplay: true,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function booleanOr(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

/** Validates and merges an unknown object into a complete, safe `AppSettings`. */
export function validateSettings(raw: unknown): AppSettings {
  if (!isRecord(raw)) return DEFAULT_SETTINGS;

  const widgetsRaw = isRecord(raw.widgets) ? raw.widgets : {};
  const widgets: WidgetVisibility = {
    weather: booleanOr(widgetsRaw.weather, DEFAULT_WIDGETS.weather),
    airQuality: booleanOr(widgetsRaw.airQuality, DEFAULT_WIDGETS.airQuality),
    map: booleanOr(widgetsRaw.map, DEFAULT_WIDGETS.map),
    traffic: booleanOr(widgetsRaw.traffic, DEFAULT_WIDGETS.traffic),
    transit: booleanOr(widgetsRaw.transit, DEFAULT_WIDGETS.transit),
    news: booleanOr(widgetsRaw.news, DEFAULT_WIDGETS.news),
    cameras: booleanOr(widgetsRaw.cameras, DEFAULT_WIDGETS.cameras),
  };

  const refreshRate = APP_CONFIG.refreshOptions.includes(
    raw.refreshRate as (typeof APP_CONFIG.refreshOptions)[number],
  )
    ? (raw.refreshRate as number)
    : DEFAULT_SETTINGS.refreshRate;

  const mapLayer = MAP_LAYERS.some((layer) => layer.id === raw.mapLayer)
    ? (raw.mapLayer as string)
    : DEFAULT_SETTINGS.mapLayer;

  return {
    theme: raw.theme === "dark" ? "dark" : "light",
    lang: raw.lang === "bn" ? "bn" : "en",
    location: typeof raw.location === "string" ? raw.location : DEFAULT_SETTINGS.location,
    tempUnit: raw.tempUnit === "F" ? "F" : "C",
    refreshRate,
    weatherAlerts: booleanOr(raw.weatherAlerts, DEFAULT_SETTINGS.weatherAlerts),
    trafficAlerts: booleanOr(raw.trafficAlerts, DEFAULT_SETTINGS.trafficAlerts),
    congestionAlerts: booleanOr(raw.congestionAlerts, DEFAULT_SETTINGS.congestionAlerts),
    preferredRoutes: booleanOr(raw.preferredRoutes, DEFAULT_SETTINGS.preferredRoutes),
    newsSources: booleanOr(raw.newsSources, DEFAULT_SETTINGS.newsSources),
    widgets,
    mapLayer,
    cameraAutoplay: booleanOr(raw.cameraAutoplay, DEFAULT_SETTINGS.cameraAutoplay),
  };
}

function getStore(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function loadSettings(): AppSettings {
  const store = getStore();
  if (!store) return DEFAULT_SETTINGS;
  try {
    const raw = store.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return validateSettings(JSON.parse(raw));
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: AppSettings): void {
  const store = getStore();
  if (!store) return;
  try {
    store.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // Ignore quota / private-mode failures.
  }
}

export function exportSettings(settings: AppSettings): string {
  return JSON.stringify(settings, null, 2);
}

/** Parses imported JSON; throws a readable error when the shape is invalid. */
export function parseImportedSettings(json: string): AppSettings {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    throw new Error("Invalid JSON file.");
  }
  if (!isRecord(parsed)) throw new Error("Settings must be a JSON object.");
  return validateSettings(parsed);
}

/** Removes every namespaced app key (settings, caches, notifications, drafts). */
export function clearAppStorage(): void {
  const store = getStore();
  if (!store) return;
  try {
    const keys: string[] = [];
    for (let i = 0; i < store.length; i += 1) {
      const key = store.key(i);
      if (key && key.startsWith(STORAGE_PREFIX)) keys.push(key);
    }
    keys.forEach((key) => store.removeItem(key));
  } catch {
    // Ignore storage failures.
  }
}