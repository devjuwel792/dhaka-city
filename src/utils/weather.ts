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
  type LucideIcon,
} from "lucide-react";

export type WeatherCondition =
  | "clear"
  | "partlyCloudy"
  | "cloudy"
  | "fog"
  | "drizzle"
  | "rain"
  | "snow"
  | "thunder";

/** Map a WMO weather interpretation code to a coarse condition group. */
export function conditionFromCode(code: number): WeatherCondition {
  if (code === 0) return "clear";
  if (code === 1 || code === 2) return "partlyCloudy";
  if (code === 3) return "cloudy";
  if (code === 45 || code === 48) return "fog";
  if (code >= 51 && code <= 57) return "drizzle";
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return "rain";
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return "snow";
  if (code >= 95) return "thunder";
  return "cloudy";
}

export function iconForCondition(condition: WeatherCondition, isDay: boolean): LucideIcon {
  switch (condition) {
    case "clear":
      return isDay ? Sun : Moon;
    case "partlyCloudy":
      return isDay ? CloudSun : CloudMoon;
    case "fog":
      return CloudFog;
    case "drizzle":
      return CloudDrizzle;
    case "rain":
      return CloudRain;
    case "snow":
      return CloudSnow;
    case "thunder":
      return CloudLightning;
    case "cloudy":
    default:
      return Cloud;
  }
}

/** Translation key for the condition label. */
export function conditionLabelKey(condition: WeatherCondition): string {
  switch (condition) {
    case "clear":
      return "weatherClear";
    case "partlyCloudy":
      return "weatherPartlyCloudy";
    case "fog":
      return "weatherFog";
    case "drizzle":
      return "weatherDrizzle";
    case "rain":
      return "weatherRain";
    case "snow":
      return "weatherSnow";
    case "thunder":
      return "weatherThunder";
    case "cloudy":
    default:
      return "weatherCloudy";
  }
}

const COMPASS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"] as const;

/** Degrees (meteorological) to 8-point compass label. */
export function degreesToCompass(degrees: number): string {
  const index = Math.round(degrees / 45) % 8;
  return COMPASS[(index + 8) % 8];
}