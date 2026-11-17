"use client";

import { AlertCircle } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/utils/cn";
import {
  primaryReading,
  categoryForEuropeanAqi,
  scalePositionPercent,
  primaryPollutantKey,
  pollutantMeta,
  concentrationFor,
  formatConcentration,
  categoriesForScale,
  US_AQI_GRADIENT,
  EUROPEAN_AQI_GRADIENT,
} from "@/utils/airQuality";

/** Live AQI summary with scale, primary pollutant and published health guidance. */
export function AirQualityCard({ className }: { className?: string }) {
  const { isDark, t, location, airQuality } = useApp();

  const shell = cn(
    "rounded-2xl border p-6 shadow-sm space-y-4",
    isDark ? "border-zinc-800 bg-[#1E1E1E]" : "border-gray-200 bg-white",
    className,
  );

  if (!airQuality.data) {
    if (airQuality.loading) {
      return (
        <div className={shell}>
          <div className="h-4 w-40 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
          <div className="h-10 w-28 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
          <div className="h-2 w-full bg-gray-100 dark:bg-zinc-800 rounded animate-pulse" />
          <div className="h-16 w-full bg-gray-100 dark:bg-zinc-800 rounded animate-pulse" />
        </div>
      );
    }
    return (
      <div className={cn(shell, "flex flex-col items-center justify-center text-center gap-1 py-8")}>
        <AlertCircle className="w-7 h-7 text-red-500" />
        <p className="text-[13px] font-bold text-gray-500">{t.airQualityUnavailable}</p>
        <p className="text-[11px] text-gray-400">{t.airQualityError}</p>
      </div>
    );
  }

  const cur = airQuality.data.current;
  const reading = primaryReading(cur);
  const category = reading.category;
  const eurCategory = categoryForEuropeanAqi(cur.europeanAqi);
  const primary = primaryPollutantKey(cur);
  const primaryMeta = primary ? pollutantMeta(primary) : null;
  const primaryConc = primary ? concentrationFor(cur, primary) : null;
  const marker = scalePositionPercent(reading.value, reading.scale);
  const categories = categoriesForScale(reading.scale);
  const gradient = reading.scale === "us" ? US_AQI_GRADIENT : EUROPEAN_AQI_GRADIENT;
  const scaleName = reading.scale === "us" ? t.usAqi : t.europeanAqi;

  return (
    <div className={shell}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-extrabold text-[15px] tracking-tight">
            {t.airQualityToday} {location}
          </h3>
          <p className="text-[11px] text-gray-400 mt-0.5">{scaleName}</p>
        </div>
        <span className="shrink-0 px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-sky-50 text-sky-600 dark:bg-sky-950/30 dark:text-sky-300">
          {t.aqiModelBadge}
        </span>
      </div>

      <div className="flex items-end gap-3">
        <span className={cn("text-4xl font-black leading-none", category?.textClass ?? "text-gray-500")}>
          {reading.value ?? "—"}
        </span>
        {category && (
          <span className={cn("text-[13px] font-extrabold pb-1", category.textClass)}>
            {t[category.labelKey] ?? category.id}
          </span>
        )}
        {reading.scale === "us" && cur.europeanAqi != null && (
          <span className="ml-auto text-[11px] font-bold text-gray-400 pb-1 whitespace-nowrap">
            {t.europeanAqi}:{" "}
            <span className={cn("font-extrabold", eurCategory?.textClass ?? "text-gray-500")}>
              {cur.europeanAqi}
            </span>
          </span>
        )}
        {reading.scale === "european" && cur.usAqi != null && (
          <span className="ml-auto text-[11px] font-bold text-gray-400 pb-1 whitespace-nowrap">
            {t.usAqi}:{" "}
            <span className={cn("font-extrabold", category?.textClass ?? "text-gray-500")}>
              {cur.usAqi}
            </span>
          </span>
        )}
      </div>

      <div>
        <div className="relative pt-1.5">
          <div className="h-2 w-full rounded-full" style={{ background: gradient }} />
          {reading.value != null && (
            <div className="absolute -top-1 -translate-x-1/2" style={{ left: `${marker}%` }}>
              <div
                className="w-4 h-4 rounded-full bg-white border-2 shadow"
                style={{ borderColor: category?.color ?? "#9CA3AF" }}
              />
            </div>
          )}
        </div>
        <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1">
          {categories.map((c) => (
            <div key={c.id} className="flex items-center gap-1 min-w-0">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: c.color }} />
              <span className="text-[9px] font-semibold text-gray-400 truncate">
                {t[c.labelKey] ?? c.id}
              </span>
            </div>
          ))}
        </div>
      </div>

      {primaryMeta && (
        <div className={cn("rounded-xl border p-3", category?.bgClass, category?.borderClass)}>
          <p className="text-[9px] uppercase font-bold tracking-wider text-gray-400">
            {t.primaryPollutant}
          </p>
          <p className="text-[13px] font-bold mt-0.5">
            {primaryMeta.symbol} — {t[primaryMeta.labelKey] ?? primaryMeta.symbol}
          </p>
          <p className="text-[11px] text-gray-500 mt-0.5">
            {formatConcentration(primaryConc)} {primaryMeta.unit}
          </p>
        </div>
      )}

      {category && (
        <div className={cn("rounded-xl border p-3", category.bgClass, category.borderClass)}>
          <p className="text-[9px] uppercase font-bold tracking-wider text-gray-400">
            {t.aqiHealthTitle}
          </p>
          <p className={cn("text-[12px] font-semibold mt-1 leading-5", category.textClass)}>
            {t[category.guidanceKey] ?? ""}
          </p>
        </div>
      )}

      <p className="text-[10px] text-gray-400 leading-4">{t.aqiModelNote}</p>
    </div>
  );
}