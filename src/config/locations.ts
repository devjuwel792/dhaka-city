export interface LocationCoords {
  lat: number;
  lon: number;
}

/**
 * Verified coordinates for every selectable dashboard location (Dhaka, BD).
 * Used by the Open-Meteo weather integration. No secrets — public lat/lon only.
 */
export const LOCATION_COORDS: Record<string, LocationCoords> = {
  "Mirpur 10": { lat: 23.8069, lon: 90.3687 },
  "Dhanmondi 27": { lat: 23.7465, lon: 90.3759 },
  "Gulshan 2": { lat: 23.7925, lon: 90.4152 },
  "Uttara Sector 7": { lat: 23.8607, lon: 90.3951 },
  Banani: { lat: 23.7937, lon: 90.4066 },
  Mohakhali: { lat: 23.7777, lon: 90.4031 },
  Farmgate: { lat: 23.7583, lon: 90.3833 },
  Motijheel: { lat: 23.733, lon: 90.4177 },
};

export const DEFAULT_COORDS: LocationCoords = LOCATION_COORDS["Mirpur 10"];

export function getLocationCoords(name: string): LocationCoords {
  return LOCATION_COORDS[name] ?? DEFAULT_COORDS;
}