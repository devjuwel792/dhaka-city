import type { LucideIcon } from "lucide-react";

export type Lang = "en" | "bn";
export type TempUnit = "C" | "F";

export type ViewId =
  | "dashboard"
  | "weather"
  | "transit"
  | "traffic"
  | "livestreet"
  | "news"
  | "settings"
  | "support"
  | "about";

export type Translations = Record<string, string>;

export interface NavItem {
  id: ViewId;
  label: string;
  icon: LucideIcon;
}

export type StatusColor = "green" | "orange" | "red";

export type EmergencyCategory = "national" | "police" | "fire" | "medical" | "utility";

export interface EmergencyContact {
  id: string;
  category: EmergencyCategory;
  service: string;
  serviceBn: string;
  number: string;
  desc: string;
  descBn: string;
  icon: LucideIcon;
  color: string;
  /** Public body that publishes this helpline. */
  source: string;
}

export interface TransportAlert {
  name: string;
  status: string;
  color: StatusColor;
}

export interface BusRoute {
  name: string;
  status: string;
  color: StatusColor;
}

export interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  full: string;
  tag: string;
  image: string;
}

export interface CameraFeed {
  id: string;
  name: string;
  live: boolean;
}

export type NotificationLevel = "high" | "med";

export interface CityNotification {
  id: number;
  title: string;
  text: string;
  time: string;
  level: NotificationLevel;
}

export interface ForecastDay {
  day: string;
  temp: number | string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

export interface HourlyForecast {
  time: string;
  temp: string;
  icon: LucideIcon;
  color: string;
  hum: string;
  wind: string;
}

export interface Availability {
  high: number;
  mod: number;
  low: number;
}

export interface CitySnapshot {
  temp: number;
  feelsLike: number;
  aqi: number;
  pm25: number;
  waterloggingRisk: number;
  cngAvailability: Availability;
  rickshawAvailability: Availability;
}

export interface GaugeDatum {
  pct: number;
  label: string;
  stroke: string;
}

export interface SectorInfo {
  sector: string;
  speed: string;
  status: string;
  color: string;
}

export interface Pollutant {
  label: string;
  val: number;
  max: number;
  col: string;
  stroke: string;
}