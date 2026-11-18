import type { Lang } from "@/types";

export interface LocationCoords {
  lat: number;
  lon: number;
}

/** A selectable Dhaka-area location with bilingual names and metadata. */
export interface CityLocation extends LocationCoords {
  /** Stable identifier used for persistence and map markers. */
  id: string;
  /** English display name. */
  nameEn: string;
  /** Bangla display name. */
  nameBn: string;
  /** Administrative district (e.g. Dhaka, Narayanganj). */
  district: string;
  /** Area / thana / neighbourhood within the district. */
  area: string;
}

/**
 * Centralized, reusable location registry. Coordinates are public, approximate
 * area centres — no precise user geolocation and no geocoding calls required.
 */
export const CITY_LOCATIONS: CityLocation[] = [
  {
    id: "dhaka",
    nameEn: "Dhaka",
    nameBn: "ঢাকা",
    lat: 23.8103,
    lon: 90.4125,
    district: "Dhaka",
    area: "Dhaka",
  },
  {
    id: "mirpur-10",
    nameEn: "Mirpur 10",
    nameBn: "মিরপুর ১০",
    lat: 23.8069,
    lon: 90.3687,
    district: "Dhaka",
    area: "Mirpur",
  },
  {
    id: "gulshan",
    nameEn: "Gulshan",
    nameBn: "গুলশান",
    lat: 23.7925,
    lon: 90.4152,
    district: "Dhaka",
    area: "Gulshan",
  },
  {
    id: "dhanmondi",
    nameEn: "Dhanmondi",
    nameBn: "ধানমন্ডি",
    lat: 23.7465,
    lon: 90.3759,
    district: "Dhaka",
    area: "Dhanmondi",
  },
  {
    id: "uttara",
    nameEn: "Uttara",
    nameBn: "উত্তরা",
    lat: 23.8607,
    lon: 90.3951,
    district: "Dhaka",
    area: "Uttara",
  },
  {
    id: "motijheel",
    nameEn: "Motijheel",
    nameBn: "মতিঝিল",
    lat: 23.733,
    lon: 90.4177,
    district: "Dhaka",
    area: "Motijheel",
  },
  {
    id: "farmgate",
    nameEn: "Farmgate",
    nameBn: "ফার্মগেট",
    lat: 23.7583,
    lon: 90.3833,
    district: "Dhaka",
    area: "Farmgate",
  },
  {
    id: "shahbagh",
    nameEn: "Shahbagh",
    nameBn: "শাহবাগ",
    lat: 23.7389,
    lon: 90.3958,
    district: "Dhaka",
    area: "Shahbagh",
  },
  {
    id: "mohakhali",
    nameEn: "Mohakhali",
    nameBn: "মহাখালী",
    lat: 23.7777,
    lon: 90.4031,
    district: "Dhaka",
    area: "Mohakhali",
  },
  {
    id: "savar",
    nameEn: "Savar",
    nameBn: "সাভার",
    lat: 23.8354,
    lon: 90.267,
    district: "Dhaka",
    area: "Savar",
  },
  {
    id: "narayanganj",
    nameEn: "Narayanganj",
    nameBn: "নারায়ণগঞ্জ",
    lat: 23.6238,
    lon: 90.5,
    district: "Narayanganj",
    area: "Narayanganj",
  },
];

export const DEFAULT_LOCATION_ID = "dhaka";

/** localStorage key for the persisted selected location id. */
export const LOCATION_STORAGE_KEY = "dhaka-city:selected-location";

const byId = new Map<string, CityLocation>(CITY_LOCATIONS.map((loc) => [loc.id, loc]));
const byName = new Map<string, CityLocation>();
for (const loc of CITY_LOCATIONS) {
  byName.set(loc.nameEn.toLowerCase(), loc);
  byName.set(loc.nameBn, loc);
  byName.set(loc.id, loc);
}

export function getLocationById(id: string): CityLocation | undefined {
  return byId.get(id);
}

/** Resolve by id, English name, or Bangla name (case-insensitive for English). */
export function getLocationByName(name: string): CityLocation | undefined {
  return byName.get(name.trim().toLowerCase()) ?? byName.get(name.trim());
}

/** Resolve any stored value to a valid location, falling back to Dhaka. */
export function resolveLocation(idOrName: string | null | undefined): CityLocation {
  if (!idOrName) return byId.get(DEFAULT_LOCATION_ID)!;
  return (
    getLocationById(idOrName) ??
    getLocationByName(idOrName) ??
    byId.get(DEFAULT_LOCATION_ID)!
  );
}

/** Coordinates for a location id or name (used by Weather / Air Quality / Map). */
export function getLocationCoords(idOrName: string): LocationCoords {
  const loc = resolveLocation(idOrName);
  return { lat: loc.lat, lon: loc.lon };
}

/** Localized display name. */
export function getLocationLabel(loc: CityLocation, lang: Lang): string {
  return lang === "bn" ? loc.nameBn : loc.nameEn;
}

/** Full localized label including area/district metadata. */
export function getLocationMeta(loc: CityLocation, lang: Lang): string {
  const district = lang === "bn" ? toBnDistrict(loc.district) : loc.district;
  return `${loc.area}, ${district}`;
}

function toBnDistrict(district: string): string {
  if (district === "Narayanganj") return "নারায়ণগঞ্জ";
  return "ঢাকা";
}

export function loadStoredLocationId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(LOCATION_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function saveStoredLocationId(id: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCATION_STORAGE_KEY, id);
  } catch {
    // Storage can be unavailable (private mode / quota); selection still works.
  }
}

// ── Backwards-compatible aliases ────────────────────────────────────────────

/** @deprecated Use `getLocationCoords`. Kept for older imports. */
export const LOCATION_COORDS: Record<string, LocationCoords> = Object.fromEntries(
  CITY_LOCATIONS.map((loc) => [loc.nameEn, { lat: loc.lat, lon: loc.lon }]),
);

/** @deprecated Use `resolveLocation(DEFAULT_LOCATION_ID)`. */
export const DEFAULT_COORDS: LocationCoords = getLocationCoords(DEFAULT_LOCATION_ID);