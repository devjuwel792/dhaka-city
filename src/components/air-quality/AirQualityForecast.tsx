"use client";

import { AlertCircle } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { formatWeekday } from "@/utils/datetime";
import { cn } from "@/utils/cn";
import { categoryForUsAqi, AQI_CHART_MAX } from "@/utils/airQuality";

const MAX_BAR_PX = 120;

/** Five-day outlook derived from the hourly model forecast (no native daily AQI). */
export function AirQualityForecast() {
  const { isDark, lang, t, airQuality } = useApp();

  const shell = cn(
    "rounded-2xl border p-6 shadow-sm",
    isDark ? "border-zinc-800 bg-[#1E1E1E]" : "border-gray-200 bg-white",
  );

  if (!airQuality.data) {
    if (airQuality.loading) {
      return (
        <div className={shell}>
          <div className="h-4 w-40 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mb-4" />
          <div className="h-32 w-full bg-gray-100 dark:bg-zinc-800/40 rounded animate-pulse" />
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

  const days = airQuality.data.daily.slice(0, 5);

  return (
    <div className={shell}>
      <h3 className="font-bold text-[15px] tracking-tight">{t.aqiForecast}</h3>
      <p className="text-[10px] text-gray-400 mt-0.5">{t.aqiForecastSubtitle}</p>

      <div className="mt-4 h-40 flex items-end justify-between gap-2">
        {days.map((d, i) => {
          const cat = categoryForUsAqi(d.usAqiMax);
          const height =
            d.usAqiMax != null
              ? Math.max(4, Math.min(1, d.usAqiMax / AQI_CHART_MAX) * MAX_BAR_PX)
              : 4;
          return (
            <div key={d.date} className="flex flex-1 flex-col items-center gap-1.5">
              <span className="text-[10px] font-bold text-gray-500">
                {d.usAqiMax != null ? Math.round(d.usAqiMax) : "—"}
              </span>
              <div
                className="w-5 rounded-t-sm"
                style={{ height: `${height}px`, background: cat?.color ?? "#9CA3AF" }}
              />
              <span className="text-[10px] font-bold text-gray-400">
                {i === 0 ? t.today : formatWeekday(d.date, lang)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}