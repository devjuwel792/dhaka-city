import { Sun, CloudSun, Moon } from "lucide-react";
import type {
  ForecastDay,
  HourlyForecast,
  GaugeDatum,
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

/** App-based rides availability gauges (dashboard). */
export const ridesGauges: GaugeDatum[] = [
  { pct: 43, label: "Available", stroke: "#10B981" },
  { pct: 71, label: "Limited", stroke: "#F59E0B" },
  { pct: 86, label: "Busy", stroke: "#EF4444" },
];