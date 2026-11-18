import { Sun, CloudSun, Moon } from "lucide-react";
import type {
  ForecastDay,
  HourlyForecast,
  SectorInfo,
  GaugeDatum,
  MapNode,
} from "@/types";

export const forecastDays: ForecastDay[] = [
  { day: "Fri, 13th", temp: 28, icon: Sun, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/10" },
  { day: "Sat, 14th", temp: 27, icon: Sun, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/10" },
  { day: "Sun, 15th", temp: 26, icon: CloudSun, color: "text-sky-400", bg: "bg-sky-50 dark:bg-sky-950/10" },
  { day: "Mon, 16th", temp: 23, icon: CloudSun, color: "text-sky-400", bg: "bg-sky-50 dark:bg-sky-950/10" },
  { day: "Tue, 17th", temp: 24, icon: CloudSun, color: "text-sky-400", bg: "bg-sky-50 dark:bg-sky-950/10" },
];

export const hourlyForecast: HourlyForecast[] = [
  { time: "Now", temp: "19°", icon: Moon, color: "text-indigo-400", hum: "32%", wind: "NE 5 kmph" },
  { time: "2 a.m.", temp: "18°", icon: CloudSun, color: "text-sky-400", hum: "35%", wind: "NE 6 kmph" },
  { time: "3 a.m.", temp: "16°", icon: CloudSun, color: "text-sky-400", hum: "37%", wind: "NE 8 kmph" },
  { time: "4 a.m.", temp: "13°", icon: Moon, color: "text-indigo-400", hum: "38%", wind: "NE 7 kmph" },
];

export const trafficSectors: SectorInfo[] = [
  { sector: "Mirpur 10 Circle", speed: "12 km/h", status: "Critical", color: "text-red-500" },
  { sector: "Rokeya Avenue", speed: "28 km/h", status: "Moderate", color: "text-amber-500" },
  { sector: "Dhanmondi Road 27", speed: "34 km/h", status: "Fluid", color: "text-emerald-500" },
  { sector: "Mohakhali Flyover", speed: "8 km/h", status: "Gridlock", color: "text-red-500" },
];

/** App-based rides availability gauges (dashboard). */
export const ridesGauges: GaugeDatum[] = [
  { pct: 43, label: "Available", stroke: "#10B981" },
  { pct: 71, label: "Limited", stroke: "#F59E0B" },
  { pct: 86, label: "Busy", stroke: "#EF4444" },
];

/** City nodes rendered on the interactive transit map modal. */
export const mapNodes: MapNode[] = [
  { x: 120, y: 50, name: "Uttara", col: "#EF4444" },
  { x: 120, y: 140, name: "Mirpur 10", col: "#10B981" },
  { x: 200, y: 200, name: "Farmgate", col: "#F59E0B" },
  { x: 250, y: 280, name: "Shahbagh", col: "#3B82F6" },
  { x: 350, y: 300, name: "Motijheel", col: "#10B981" },
  { x: 400, y: 110, name: "Gulshan 2", col: "#EF4444" },
];