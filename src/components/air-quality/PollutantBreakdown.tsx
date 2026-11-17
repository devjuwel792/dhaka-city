"use client";

import { AlertCircle } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/utils/cn";
import {
  POLLUTANTS,
  concentrationFor,
  formatConcentration,
  aqiBarPercent,
  categoryForUsAqi,
} from "@/utils/airQuality";

/** All modeled pollutants with concentration, unit and US AQI sub-index bar. */
export function PollutantBreakdown() {
  const { isDark, t, airQuality } = useApp();

  const shell = cn(
    "rounded-2xl border p-6 shadow-sm",
    isDark ? "border-zinc-800 bg-[#1E1E1E]" : "border-gray-200 bg-white",
  );

  if (!airQuality.data) {
    if (airQuality.loading) {
      return (
        <div className={shell}>
          <div className="h-4 w-32 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mb-4" />
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-8 w-full bg-gray-100 dark:bg-zinc-800/40 rounded animate-pulse" />
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className={cn(shell, "flex items-center justify-center gap-2 py-8")}>
        <AlertCircle className="w-6 h-6 text-red-500" />
        <span className="text-[13px] text-gray-400">{t.airQualityUnavailable}</span>
      </div>
    );
  }

  const cur = airQuality.data.current;

  return (
    <div className={shell}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-[15px] tracking-tight">{t.pollutantBreakdown}</h3>
        <span className="text-[9px] font-bold text-gray-400 text-right">{t.aqiUnitNote}</span>
      </div>

      <div className="space-y-3.5">
        {POLLUTANTS.map((p) => {
          const sub = cur.subIndices[p.subIndex];
          const conc = concentrationFor(cur, p.key);
          const cat = categoryForUsAqi(sub);
          return (
            <div key={p.key}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[12px] font-semibold text-gray-600 dark:text-gray-300">
                  {p.symbol}
                </span>
                <span className="text-[11px] font-bold text-gray-500">
                  {formatConcentration(conc)}{" "}
                  <span className="text-gray-400 font-semibold">{p.unit}</span>
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-zinc-800 overflow-hidden">
                {sub != null && (
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${aqiBarPercent(sub)}%`, background: cat?.color ?? "#9CA3AF" }}
                  />
                )}
              </div>
              <div className="flex justify-between mt-0.5">
                <span className="text-[9px] text-gray-400 truncate pr-2">
                  {t[p.labelKey] ?? p.symbol}
                </span>
                <span
                  className="text-[9px] font-bold whitespace-nowrap"
                  style={{ color: cat?.color }}
                >
                  {sub != null ? `${Math.round(sub)} ${t.usAqi}` : "—"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}