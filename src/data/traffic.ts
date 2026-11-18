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
 * DEMO congestion provider. These values are simulated and must always be
 * labelled as such. OpenStreetMap supplies geography only — it does not provide
 * traffic speeds. No live GPS or road-closure data is included.
 */
export const TRAFFIC_ZONES: TrafficZone[] = [
  {
    id: "mirpur-10",
    nameEn: "Mirpur 10 Circle",
    nameBn: "মিরপুর ১০ গোলচত্বর",
    lat: 23.8069,
    lon: 90.3687,
    road: "Mirpur Road",
    level: "heavy",
    speedKph: 12,
  },
  {
    id: "rokeya-avenue",
    nameEn: "Rokeya Avenue",
    nameBn: "রোকেয়া অ্যাভিনিউ",
    lat: 23.7509,
    lon: 90.3828,
    road: "Begum Rokeya Avenue",
    level: "moderate",
    speedKph: 28,
  },
  {
    id: "dhanmondi-27",
    nameEn: "Dhanmondi Road 27",
    nameBn: "ধানমন্ডি রোড ২৭",
    lat: 23.7465,
    lon: 90.3759,
    road: "Road 27 (Satmasjid Road)",
    level: "fluid",
    speedKph: 34,
  },
  {
    id: "mohakhali-flyover",
    nameEn: "Mohakhali Flyover",
    nameBn: "মহাখালী ফ্লাইওভার",
    lat: 23.7777,
    lon: 90.4031,
    road: "Kazi Nazrul Islam Avenue",
    level: "heavy",
    speedKph: 8,
  },
  {
    id: "farmgate",
    nameEn: "Farmgate",
    nameBn: "ফার্মগেট",
    lat: 23.7583,
    lon: 90.3833,
    road: "Kazi Nazrul Islam Avenue",
    level: "heavy",
    speedKph: 10,
  },
  {
    id: "gulshan-2",
    nameEn: "Gulshan 2",
    nameBn: "গুলশান ২",
    lat: 23.7925,
    lon: 90.4152,
    road: "Gulshan Avenue",
    level: "moderate",
    speedKph: 24,
  },
  {
    id: "motijheel",
    nameEn: "Motijheel",
    nameBn: "মতিঝিল",
    lat: 23.733,
    lon: 90.4177,
    road: "Outer Circular Road",
    level: "moderate",
    speedKph: 22,
  },
  {
    id: "shahbagh",
    nameEn: "Shahbagh",
    nameBn: "শাহবাগ",
    lat: 23.7389,
    lon: 90.3958,
    road: "Kazi Nazrul Islam Avenue",
    level: "fluid",
    speedKph: 31,
  },
  {
    id: "uttara",
    nameEn: "Uttara",
    nameBn: "উত্তরা",
    lat: 23.8607,
    lon: 90.3951,
    road: "Airport Road",
    level: "moderate",
    speedKph: 26,
  },
  {
    id: "savar",
    nameEn: "Savar",
    nameBn: "সাভার",
    lat: 23.8354,
    lon: 90.267,
    road: "Dhaka–Aricha Highway",
    level: "fluid",
    speedKph: 42,
  },
  {
    id: "narayanganj",
    nameEn: "Narayanganj",
    nameBn: "নারায়ণগঞ্জ",
    lat: 23.6238,
    lon: 90.5,
    road: "Dhaka–Chittagong Highway",
    level: "moderate",
    speedKph: 20,
  },
];

export interface TrafficIncident {
  id: string;
  zone: string;
  titleEn: string;
  titleBn: string;
  isDemo: true;
}

/** Demo incident scenarios. Not real road-closure reports. */
export const DEMO_TRAFFIC_INCIDENTS: TrafficIncident[] = [
  {
    id: "inc-1",
    zone: "Mirpur 10 Circle",
    titleEn: "Simulated queue build-up near the roundabout",
    titleBn: "গোলচত্বরের কাছে অনুকরণীয় যানজট",
    isDemo: true,
  },
  {
    id: "inc-2",
    zone: "Mohakhali Flyover",
    titleEn: "Simulated slow movement on the flyover approach",
    titleBn: "ফ্লাইওভার প্রবেশপথে অনুকরণীয় ধীরগতি",
    isDemo: true,
  },
];

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