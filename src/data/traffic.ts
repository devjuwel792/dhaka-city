import demoData from "./demo-data.json";

export type CongestionLevel = "fluid" | "moderate" | "heavy";

export interface TrafficZone {
  id: string;
  nameEn: string;
  nameBn: string;
  lat: number;
  lon: number;
  road: string;
  level: CongestionLevel;
  /** Simulated speed. Never presented as a live measurement. */
  speedKph: number;
}

/**
 * DEMO congestion provider. Values live in `src/data/demo-data.json` and are
 * simulated. OpenStreetMap supplies geography only — it does not provide
 * traffic speeds. No live GPS or road-closure data is included.
 */
export const TRAFFIC_ZONES: TrafficZone[] = demoData.traffic.zones as TrafficZone[];

export interface TrafficIncident {
  id: string;
  zone: string;
  titleEn: string;
  titleBn: string;
  isDemo: true;
}

/** Demo incident scenarios from JSON. Not real road-closure reports. */
export const DEMO_TRAFFIC_INCIDENTS: TrafficIncident[] =
  demoData.traffic.incidents as TrafficIncident[];

export const TRAFFIC_LEVELS: Record<
  CongestionLevel,
  { labelEn: string; labelBn: string; color: string; dot: string; text: string }
> = {
  fluid: {
    labelEn: "Fluid",
    labelBn: "স্বাভাবিক",
    color: "#10B981",
    dot: "bg-emerald-500",
    text: "text-emerald-500",
  },
  moderate: {
    labelEn: "Moderate",
    labelBn: "মাঝারি",
    color: "#F59E0B",
    dot: "bg-amber-500",
    text: "text-amber-500",
  },
  heavy: {
    labelEn: "Heavy",
    labelBn: "ভারী",
    color: "#EF4444",
    dot: "bg-red-500",
    text: "text-red-500",
  },
};

export const TRAFFIC_META = {
  provider: "Demo congestion provider",
  isDemo: true as const,
  noteEn:
    "Simulated congestion only. OpenStreetMap provides geographic context, not live traffic speeds.",
  noteBn:
    "শুধুমাত্র অনুকরণীয় যানজট। OpenStreetMap কেবল ভৌগোলিক প্রেক্ষাপট দেয়, লাইভ ট্রাফিক গতি নয়।",
};
