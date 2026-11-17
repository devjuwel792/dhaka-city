"use client";

import {
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
} from "lucide-react";
import { conditionFromCode } from "@/utils/weather";

interface WeatherIconProps {
  code: number;
  isDay: boolean;
  className?: string;
}

/** Renders the correct weather icon for a WMO code without dynamic component creation. */
export function WeatherIcon({ code, isDay, className }: WeatherIconProps) {
  switch (conditionFromCode(code)) {
    case "clear":
      return isDay ? <Sun className={className} /> : <Moon className={className} />;
    case "partlyCloudy":
      return isDay ? <CloudSun className={className} /> : <CloudMoon className={className} />;
    case "fog":
      return <CloudFog className={className} />;
    case "drizzle":
      return <CloudDrizzle className={className} />;
    case "rain":
      return <CloudRain className={className} />;
    case "snow":
      return <CloudSnow className={className} />;
    case "thunder":
      return <CloudLightning className={className} />;
    case "cloudy":
    default:
      return <Cloud className={className} />;
  }
}