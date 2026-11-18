export type DataStatus = "LIVE" | "CACHED" | "STALE" | "DEMO" | "UNAVAILABLE";

export type DataCategory =
  | "weather"
  | "air-quality"
  | "traffic"
  | "transit"
  | "news"
  | "map"
  | "emergency"
  | "cameras"
  | "system";

export interface DataSourceMeta {
  id: string;
  name: string;
  url: string;
  category: DataCategory;
  updateIntervalMs: number;
  attribution: string;
  kind: "real" | "demo";
}

export const DATA_SOURCES: Record<string, DataSourceMeta> = {
  "open-meteo-weather": {
    id: "open-meteo-weather",
    name: "Open-Meteo Weather",
    url: "https://api.open-meteo.com/v1/forecast",
    category: "weather",
    updateIntervalMs: 10 * 60 * 1000,
    attribution: "Weather data by Open-Meteo.com (CC BY 4.0)",
    kind: "real",
  },
  "open-meteo-air-quality": {
    id: "open-meteo-air-quality",
    name: "Open-Meteo Air Quality (CAMS)",
    url: "https://air-quality-api.open-meteo.com/v1/air-quality",
    category: "air-quality",
    updateIntervalMs: 30 * 60 * 1000,
    attribution: "CAMS / Open-Meteo.com (CC BY 4.0)",
    kind: "real",
  },
  "osm-tiles": {
    id: "osm-tiles",
    name: "OpenStreetMap Tiles",
    url: "https://tile.openstreetmap.org/",
    category: "map",
    updateIntervalMs: 0,
    attribution: "© OpenStreetMap contributors",
    kind: "real",
  },
  "gdelt-news": {
    id: "gdelt-news",
    name: "GDELT DOC 2.0",
    url: "https://api.gdeltproject.org/api/v2/doc/doc",
    category: "news",
    updateIntervalMs: 10 * 60 * 1000,
    attribution: "GDELT Project",
    kind: "real",
  },
  "demo-traffic": {
    id: "demo-traffic",
    name: "Demo Traffic Provider",
    url: "",
    category: "traffic",
    updateIntervalMs: 60 * 1000,
    attribution: "Simulated congestion (demo)",
    kind: "demo",
  },
  "demo-transit-availability": {
    id: "demo-transit-availability",
    name: "Demo Transit Availability",
    url: "",
    category: "transit",
    updateIntervalMs: 60 * 1000,
    attribution: "Simulated CNG / rickshaw availability (demo)",
    kind: "demo",
  },
  "static-transit": {
    id: "static-transit",
    name: "Static Transit Information",
    url: "https://www.dmtcl.gov.bd/",
    category: "transit",
    updateIntervalMs: 0,
    attribution: "Dhaka Mass Transit Company Limited (static dataset)",
    kind: "real",
  },
  "demo-cameras": {
    id: "demo-cameras",
    name: "Demo Street Footage",
    url: "",
    category: "cameras",
    updateIntervalMs: 0,
    attribution: "Licensed demo footage (not live CCTV)",
    kind: "demo",
  },
  "emergency-static": {
    id: "emergency-static",
    name: "Emergency Contacts",
    url: "https://dmp.gov.bd/",
    category: "emergency",
    updateIntervalMs: 0,
    attribution: "Public emergency contact information",
    kind: "real",
  },
};

export interface SourceStatusInput {
  sourceId: string;
  fetchedAt?: string | null;
  isCached?: boolean;
  isDemo?: boolean;
  hasError?: boolean;
  now?: number;
}

/**
 * Derives a reliability status. LIVE requires a fresh, cache-miss success.
 * A running refresh interval alone never makes a source LIVE.
 */
export function computeDataStatus(input: SourceStatusInput): DataStatus {
  const source = DATA_SOURCES[input.sourceId];
  if (input.isDemo || source?.kind === "demo") return "DEMO";
  if (!input.fetchedAt) return "UNAVAILABLE";

  const ts = new Date(input.fetchedAt).getTime();
  if (!Number.isFinite(ts)) return "UNAVAILABLE";

  const now = input.now ?? Date.now();
  const age = now - ts;
  const staleAfter = source ? Math.max(source.updateIntervalMs * 3, 15 * 60 * 1000) : 30 * 60 * 1000;

  if (age > staleAfter || input.hasError) return "STALE";
  if (input.isCached) return "CACHED";
  return "LIVE";
}

export function getSource(sourceId: string): DataSourceMeta | undefined {
  return DATA_SOURCES[sourceId];
}