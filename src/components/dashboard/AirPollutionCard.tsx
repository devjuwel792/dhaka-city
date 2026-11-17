"use client";

import { AlertCircle } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/utils/cn";
import {
  primaryReading,
  primaryPollutantKey,
  pollutantMeta,
  POLLUTANTS,
  concentrationFor,
  formatConcentration,
  aqiBarPercent,
  categoryForUsAqi,
} from "@/utils/airQuality";

/** Compact live air-quality widget for the dashboard (real CAMS model data). */
export function AirPollutionCard({ className }: { className?: string }) {
  const { isDark, t, airQuality } = useApp();

  const shell = cn(
    "rounded-2xl border p-5 shadow-sm flex flex-col justify-between min-h-[280px]",
    isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200",
    className,
  );

  if (!airQuality.data) {
    if (airQuality.loading) {
      return (
        <div className={shell}>
          <div className="h-4 w-28 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
          <div className="h-10 w-24 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mt-3" />
          <div className="space-y-3 mt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-2 w-full bg-gray-100 dark:bg-zinc-800/50 rounded animate-pulse" />
            ))}
          </div>
          <div className="h-8 w-full bg-gray-100 dark:bg-zinc-800/50 rounded animate-pulse mt-3" />
        </div>
      );
    }
    return (
      <div className={cn(shell, "items-center justify-center text-center gap-1")}>
        <AlertCircle className="w-7 h-7 text-red-500" />
        <p className="text-[12px] font-semibold text-gray-400">{t.airQualityUnavailable}</p>
        <p className="text-[10px] text-gray-400">{t.airQualityError}</p>
      </div>
    );
  }

  const cur = airQuality.data.current;
  const reading = primaryReading(cur);
  const cat = reading.category;
  const primary = primaryPollutantKey(cur);
  const primaryMeta = primary ? pollutantMeta(primary) : null;
  const topPollutants = POLLUTANTS.slice(0, 4);

  return (
    <div className={shell}>
      <div>
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-bold text-[14px] tracking-tight">{t.airQuality}</h3>
          <span className="shrink-0 px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-sky-50 text-sky-600 dark:bg-sky-950/30 dark:text-sky-300">
            {t.aqiModelBadge}
          </span>
        </div>
        <div className="flex items-end gap-2 mt-1">
          <span className={cn("text-3xl font-black leading-none", cat?.textClass ?? "text-gray-500")}>
            {reading.value ?? "—"}
          </span>
          <span className={cn("text-[12px] font-extrabold pb-1", cat?.textClass ?? "text-gray-400")}>
            {cat ? t[cat.labelKey] ?? cat.id : ""}
          </span>
          <span className="ml-auto text-[10px] font-bold text-gray-400 pb-1 whitespace-nowrap">
            {reading.scale === "us" ? t.usAqi : t.europeanAqi}
          </span>
        </div>
      </div>

      <div className="space-y-2 my-2">
        {topPollutants.map((p) => {
          const sub = cur.subIndices[p.subIndex];
          const conc = concentrationFor(cur, p.key);
          const pcat = categoryForUsAqi(sub);
          return (
            <div key={p.key} className="flex items-center gap-2">
              <span className="w-12 text-[10px] font-bold text-gray-400">{p.symbol}</span>
              <div className="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-zinc-800 overflow-hidden">
                {sub != null && (
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${aqiBarPercent(sub)}%`, background: pcat?.color ?? "#9CA3AF" }}
                  />
                )}
              </div>
              <span className="w-14 text-right text-[10px] font-bold text-gray-500">
                {formatConcentration(conc)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="pt-2 border-t border-gray-50 dark:border-zinc-800">
        <p className="text-[10px] font-semibold text-gray-400 truncate">
          {primaryMeta
            ? `${t.primaryPollutant}: ${primaryMeta.symbol}`
            : t.aqiModelNote}
        </p>
        <p className="text-[9px] text-gray-400 truncate mt-0.5">
          {t.source}: {airQuality.source?.attribution ?? "Open-Meteo"}
          {airQuality.error ? ` · ${t.aqiStale}` : ""}
        </p>
      </div>
    </div>
  );
}