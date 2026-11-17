"use client";

import { Droplets, AlertCircle } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { conditionFromCode, iconForCondition } from "@/utils/weather";
import { formatHourLabel } from "@/utils/datetime";
import { cn } from "@/utils/cn";

export function HourlyForecast() {
  const { isDark, t, weather, formatTempNum } = useApp();

  const card = cn(
    "rounded-2xl border p-6 shadow-sm",
    isDark ? "border-zinc-800 bg-[#1E1E1E]" : "border-gray-200 bg-white",
  );

  if (!weather.data) {
    if (weather.loading) {
      return (
        <div className={card}>
          <div className="h-4 w-32 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mb-4" />
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-28 rounded-xl bg-gray-100 dark:bg-zinc-800/30 animate-pulse" />
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className={cn(card, "flex items-center justify-center gap-2 py-8")}>
        <AlertCircle className="w-6 h-6 text-red-500" />
        <span className="text-[13px] text-gray-400">{t.weatherUnavailable}</span>
      </div>
    );
  }

  const { hourly, current } = weather.data;
  const startIdx = Math.max(
    0,
    hourly.findIndex((h) => h.time >= current.time),
  );
  const upcoming = hourly.slice(startIdx, startIdx + 8);

  return (
    <div className={card}>
      <h3 className="font-bold text-[15px] tracking-tight mb-4">{t.hourlyForecast}</h3>
      <div className="grid grid-cols-4 gap-4">
        {upcoming.map((hr, i) => {
          const Icon = iconForCondition(conditionFromCode(hr.weatherCode), true);
          return (
            <div
              key={i}
              className={cn(
                "p-4 rounded-xl border flex flex-col justify-between items-center text-center space-y-2",
                isDark ? "border-zinc-850 bg-zinc-900/10" : "border-gray-100 bg-gray-50/20",
              )}
            >
              <span className="text-[12px] font-extrabold text-gray-400">{formatHourLabel(hr.time)}</span>
              <Icon className="w-8 h-8 text-sky-400" />
              <span className="text-xl font-bold">{formatTempNum(hr.temperature)}</span>
              <span className="flex items-center gap-1 justify-center text-[11px] text-gray-500 font-sans">
                <Droplets className="w-3 h-3 text-sky-400" /> {hr.precipitationProbability}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}