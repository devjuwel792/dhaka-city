/**
 * Map tile providers. Only public, key-less, CORS-friendly sources are listed;
 * every entry carries its own required attribution. Add providers here to make
 * them available to the layer control.
 *
 * Respect each provider's tile usage policy: the map only requests tiles inside
 * the current viewport (no bulk downloading / pre-fetching), and the attribution
 * control is always visible.
 */
export interface MapLayer {
  id: string;
  nameEn: string;
  nameBn: string;
  /** Leaflet URL template with `{z}/{x}/{y}` (and optional `{s}`). */
  url: string;
  attribution: string;
  maxZoom: number;
  subdomains?: string;
}

export const MAP_LAYERS: MapLayer[] = [
  {
    id: "osm",
    nameEn: "OpenStreetMap",
    nameBn: "ওপেনস্ট্রিটম্যাপ",
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "© OpenStreetMap contributors",
    maxZoom: 19,
  },
  {
    id: "opentopo",
    nameEn: "OpenTopoMap",
    nameBn: "ওপেনটপোম্যাপ",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution:
      "© OpenStreetMap contributors, SRTM | © OpenTopoMap (CC-BY-SA)",
    maxZoom: 17,
    subdomains: "abc",
  },
];

export const DEFAULT_MAP_LAYER_ID = "osm";

/** Map viewport defaults (Dhaka). */
export const MAP_DEFAULT_ZOOM = 12;
export const MAP_MIN_ZOOM = 5;
export const MAP_MAX_ZOOM = 19;

export function getMapLayer(id: string): MapLayer {
  return MAP_LAYERS.find((layer) => layer.id === id) ?? MAP_LAYERS[0];
}