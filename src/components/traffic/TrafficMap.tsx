"use client";

import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { TRAFFIC_ZONES, TRAFFIC_LEVELS, type TrafficZone } from "@/data/traffic";
import {
  MAP_LAYERS,
  DEFAULT_MAP_LAYER_ID,
  MAP_DEFAULT_ZOOM,
  MAP_MIN_ZOOM,
  MAP_MAX_ZOOM,
} from "@/config/map";
import type { Lang } from "@/types";

function zoneIcon(zone: TrafficZone): L.DivIcon {
  const color = TRAFFIC_LEVELS[zone.level].color;
  return L.divIcon({
    className: "traffic-map-marker",
    html: `<span style="display:block;width:16px;height:16px;border-radius:9999px;background:${color};border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.35),0 0 0 3px ${color}33"></span>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -10],
  });
}

export function TrafficMap({ lang, className }: { lang: Lang; className?: string }) {
  return (
    <MapContainer
      center={[23.8103, 90.4125]}
      zoom={MAP_DEFAULT_ZOOM - 1}
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
            checked={layer.id === DEFAULT_MAP_LAYER_ID}
            name={lang === "bn" ? layer.nameBn : layer.nameEn}
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

      {TRAFFIC_ZONES.map((zone) => {
        const level = TRAFFIC_LEVELS[zone.level];
        return (
          <Marker key={zone.id} position={[zone.lat, zone.lon]} icon={zoneIcon(zone)}>
            <Popup>
              <div className="min-w-[160px] space-y-1">
                <p className="text-[13px] font-extrabold text-gray-900">
                  {lang === "bn" ? zone.nameBn : zone.nameEn}
                </p>
                <p className="text-[10px] text-gray-500">{zone.road}</p>
                <p className="text-[11px] font-bold" style={{ color: level.color }}>
                  {lang === "bn" ? level.labelBn : level.labelEn} · {zone.speedKph} km/h
                </p>
                <p className="text-[9px] text-amber-600 font-bold">
                  SIMULATED — not live traffic data
                </p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}