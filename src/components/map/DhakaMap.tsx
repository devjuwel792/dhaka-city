"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import type { Map as LeafletMap } from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { CITY_LOCATIONS, type CityLocation } from "@/config/locations";
import {
  MAP_LAYERS,
  MAP_DEFAULT_ZOOM,
  MAP_MIN_ZOOM,
  MAP_MAX_ZOOM,
} from "@/config/map";
import type { Lang } from "@/types";

export interface DhakaMapProps {
  selectedId: string;
  lang: Lang;
  className?: string;
  /** Map layer id from settings (see MAP_LAYERS). */
  activeLayerId?: string;
  /** Show every configured area marker, not just the selected one. */
  showAllMarkers?: boolean;
}

const MARKER_COLOR = "#10B981";
const SELECTED_COLOR = "#4F46E5";

function markerIcon(selected: boolean): L.DivIcon {
  const size = selected ? 20 : 14;
  const color = selected ? SELECTED_COLOR : MARKER_COLOR;
  const ring = selected ? "0 0 0 4px rgba(79,70,229,0.25)" : "0 0 0 3px rgba(16,185,129,0.2)";
  return L.divIcon({
    className: "dhaka-map-marker",
    html: `<span style="display:block;width:${size}px;height:${size}px;border-radius:9999px;background:${color};border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.35),${ring}"></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2 - 4],
  });
}

function LocationMarker({
  loc,
  selected,
  lang,
}: {
  loc: CityLocation;
  selected: boolean;
  lang: Lang;
}) {
  return (
    <Marker
      position={[loc.lat, loc.lon]}
      icon={markerIcon(selected)}
      title={lang === "bn" ? loc.nameBn : loc.nameEn}
    >
      <Popup>
        <div className="min-w-[150px] space-y-1">
          <p className="text-[13px] font-extrabold text-gray-900">
            {lang === "bn" ? loc.nameBn : loc.nameEn}
          </p>
          <p className="text-[10px] text-gray-500">
            {loc.area}, {loc.district}
          </p>
          <p className="text-[10px] text-gray-500 font-mono">
            {loc.lat.toFixed(4)}, {loc.lon.toFixed(4)}
          </p>
          <a
            href={`https://www.openstreetmap.org/?mlat=${loc.lat}&mlon=${loc.lon}#map=15/${loc.lat}/${loc.lon}`}
            target="_blank"
            rel="noreferrer"
            className="inline-block text-[11px] font-bold text-emerald-600 hover:underline"
          >
            Open in OpenStreetMap
          </a>
        </div>
      </Popup>
    </Marker>
  );
}

function MapController({ selected, zoom }: { selected: CityLocation; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([selected.lat, selected.lon], Math.max(map.getZoom(), zoom), {
      duration: 0.8,
    });
  }, [map, selected.lat, selected.lon, zoom]);
  return null;
}

export function DhakaMap({
  selectedId,
  lang,
  className,
  activeLayerId,
  showAllMarkers = true,
}: DhakaMapProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  const selected =
    CITY_LOCATIONS.find((loc) => loc.id === selectedId) ?? CITY_LOCATIONS[0];
  const layerId = MAP_LAYERS.some((layer) => layer.id === activeLayerId)
    ? (activeLayerId as string)
    : MAP_LAYERS[0].id;

  useEffect(() => {
    const onFullscreenChange = () => {
      // Leaflet needs to recompute its size after entering/leaving fullscreen.
      window.setTimeout(() => mapRef.current?.invalidateSize(), 120);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    const el = wrapperRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void el.requestFullscreen?.();
    }
  };

  const markers = showAllMarkers ? CITY_LOCATIONS : [selected];

  return (
    <div ref={wrapperRef} className="relative h-full w-full">
      <MapContainer
        key={layerId}
        ref={mapRef}
        center={[selected.lat, selected.lon]}
        zoom={MAP_DEFAULT_ZOOM}
        minZoom={MAP_MIN_ZOOM}
        maxZoom={MAP_MAX_ZOOM}
        scrollWheelZoom
        zoomControl
        attributionControl
        className={className ?? "h-full w-full"}
      >
        <LayersControl position="topright">
          {MAP_LAYERS.map((layer) => (
            <LayersControl.BaseLayer
              key={layer.id}
              checked={layer.id === layerId}
              name={`${lang === "bn" ? layer.nameBn : layer.nameEn}`}
            >
              <TileLayer
                url={layer.url}
                attribution={layer.attribution}
                maxZoom={layer.maxZoom}
                subdomains={layer.subdomains ?? "abc"}
              />
            </LayersControl.BaseLayer>
          ))}
        </LayersControl>

        {markers.map((loc) => (
          <LocationMarker
            key={loc.id}
            loc={loc}
            selected={loc.id === selected.id}
            lang={lang}
          />
        ))}

        <MapController selected={selected} zoom={MAP_DEFAULT_ZOOM} />
      </MapContainer>

      <button
        type="button"
        onClick={toggleFullscreen}
        aria-label="Toggle fullscreen map"
        className="absolute bottom-3 left-3 z-[1000] px-2.5 py-1.5 rounded-lg bg-white/95 text-gray-700 text-[11px] font-bold shadow border border-gray-200 hover:bg-white dark:bg-zinc-800/95 dark:text-gray-200 dark:border-zinc-700 dark:hover:bg-zinc-800"
      >
        ⛶ Fullscreen
      </button>
    </div>
  );
}