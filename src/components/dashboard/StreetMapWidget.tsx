"use client";

import { useApp } from "@/context/AppContext";
import { cn } from "@/utils/cn";
import { getLocationLabel } from "@/config/locations";
import { MapCanvas } from "@/components/map/MapCanvas";

/** Dashboard map widget. Centers on the selected location and shows area markers. */
export function StreetMapWidget({ className }: { className?: string }) {
  const { isDark, lang, t, selectedLocation, setShowMapModal, mapLayer } = useApp();

  return (
    <div
      className={cn(
        "rounded-2xl border p-5 shadow-sm flex flex-col justify-between min-h-[280px]",
        isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200",
        className,
      )}
    >
        <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-[14px] tracking-tight">{t.liveStreet}</h3>
        <button
          onClick={() => setShowMapModal(true)}
          className="text-[11px] font-bold text-emerald-500 hover:underline font-sans"
        >
          {lang === "bn" ? "পূর্ণ মানচিত্র" : "Full Map"}
        </button>
      </div>

      <div className="flex-1 min-h-[170px] rounded-xl overflow-hidden relative border border-gray-100 dark:border-zinc-800">
        <MapCanvas
          selectedId={selectedLocation.id}
          lang={lang}
          activeLayerId={mapLayer}
          className="h-full w-full"
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 text-[10px] text-gray-400">
        <span className="font-bold truncate">
          {getLocationLabel(selectedLocation, lang)}
        </span>
        <span className="font-mono truncate shrink-0">
          {selectedLocation.lat.toFixed(4)}, {selectedLocation.lon.toFixed(4)}
        </span>
      </div>
    </div>
  );
}