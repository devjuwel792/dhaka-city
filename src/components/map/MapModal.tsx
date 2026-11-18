"use client";

import { Map as MapIcon, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { getLocationMeta } from "@/config/locations";
import { ModalShell } from "@/components/common/ModalShell";
import { MapCanvas } from "./MapCanvas";
import { cn } from "@/utils/cn";

export function MapModal() {
  const { isDark, lang, showMapModal, setShowMapModal, selectedLocation, mapLayer } = useApp();

  if (!showMapModal) return null;

  return (
    <ModalShell onClose={() => setShowMapModal(false)} maxWidth="max-w-5xl">
      <div
        className={cn(
          "p-4 border-b flex justify-between items-center",
          isDark ? "border-zinc-800" : "border-gray-100",
        )}
      >
        <div className="flex items-center gap-2">
          <MapIcon className="w-5 h-5 text-indigo-500" />
          <div>
            <h3 className="font-extrabold text-base">
              {lang === "bn" ? "ঢাকা সিটি ম্যাপ" : "Dhaka City Map"}
            </h3>
            <p className={cn("text-[11px]", isDark ? "text-zinc-500" : "text-gray-400")}>
              {getLocationMeta(selectedLocation, lang)}
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowMapModal(false)}
          className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="h-[60vh] min-h-[360px] bg-[#E8ECEF] dark:bg-zinc-900 relative">
        <MapCanvas
          selectedId={selectedLocation.id}
          lang={lang}
          activeLayerId={mapLayer}
          className="h-full w-full"
        />
      </div>

      <div
        className={cn(
          "p-4 border-t flex flex-wrap items-center justify-between gap-2",
          isDark ? "border-zinc-800 bg-zinc-900/40" : "border-gray-100 bg-gray-50/50",
        )}
      >
        <span className="text-[11px] text-gray-400">
          Drag to pan · Scroll or use +/− to zoom · Click a marker for details.
        </span>
        <span className="text-[10px] font-mono text-gray-400">
          {selectedLocation.lat.toFixed(4)}, {selectedLocation.lon.toFixed(4)}
        </span>
      </div>
    </ModalShell>
  );
}