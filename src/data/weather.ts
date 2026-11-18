import { Sun, CloudSun, Moon } from "lucide-react";
import type { ForecastDay, HourlyForecast, GaugeDatum } from "@/types";
import demoData from "./demo-data.json";

type WeatherIcon = "sun" | "cloud-sun" | "moon";
type ForecastRecord = Omit<ForecastDay, "icon"> & { icon: WeatherIcon };
type HourlyRecord = Omit<HourlyForecast, "icon"> & { icon: WeatherIcon };

const ICONS: Record<WeatherIcon, ForecastDay["icon"]> = {
  sun: Sun,
  "cloud-sun": CloudSun,
  moon: Moon,
};

const withIcon = <T extends { icon: WeatherIcon }>(record: T) => {
  const { icon, ...rest } = record;
  return { ...rest, icon: ICONS[icon] };
};

export const forecastDays: ForecastDay[] = (
  demoData.weather.forecastDays as ForecastRecord[]
).map(withIcon);

export const hourlyForecast: HourlyForecast[] = (
  demoData.weather.hourlyForecast as HourlyRecord[]
).map(withIcon);

/** App-based rides availability gauges (dashboard demo values). */
export const ridesGauges: GaugeDatum[] = demoData.weather.ridesGauges as GaugeDatum[];
