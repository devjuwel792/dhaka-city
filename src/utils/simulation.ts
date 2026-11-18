import type { CitySnapshot } from "@/types";
import { resolveLocation } from "@/config/locations";

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

/**
 * Deterministic mock "simulation" that produces weather / air-quality /
 * availability values based on the selected location and a refresh tick.
 * Preserves the original behaviour of the dashboard.
 */
export function computeCitySnapshot(
  location: string,
  refreshTrigger: number,
): CitySnapshot {
  const name = resolveLocation(location).nameEn;
  let multiplier = 1.0;
  if (name.includes("Gulshan")) multiplier = 1.15;
  if (name.includes("Dhanmondi")) multiplier = 0.95;
  if (name.includes("Uttara")) multiplier = 0.85;
  if (name.includes("Motijheel")) multiplier = 1.25;

  const fluctuation = Math.sin(refreshTrigger) * 2;

  return {
    temp: Math.round(23 * multiplier + fluctuation / 2),
    feelsLike: Math.round(21 * multiplier + fluctuation / 2),
    aqi: Math.round(201 * multiplier + fluctuation * 4),
    pm25: Math.round(241 * multiplier + fluctuation * 5),
    waterloggingRisk: clamp(Math.round(73 * multiplier + fluctuation), 0, 100),
    cngAvailability: {
      high: clamp(Math.round(70 / multiplier + fluctuation), 0, 100),
      mod: clamp(Math.round(22 * multiplier - fluctuation), 0, 100),
      low: clamp(Math.round(8 * multiplier), 0, 100),
    },
    rickshawAvailability: {
      high: clamp(Math.round(95 / multiplier + fluctuation / 2), 0, 100),
      mod: clamp(Math.round(3 * multiplier - fluctuation / 2), 0, 100),
      low: clamp(Math.round(2 * multiplier), 0, 100),
    },
  };
}