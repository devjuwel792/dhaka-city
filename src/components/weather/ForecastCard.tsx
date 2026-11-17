"use client";

import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { conditionFromCode, iconForCondition } from "@/utils/weather";
import { formatWeekday } from "@/utils/datetime";
import { cn } from "@/utils/cn";

/** Seven-day forecast grid, driven by the live Open-Meteo feed. */
export function ForecastCard({ className }: { className?: string }) {
  const { isDark, lang, t, weather, formatTempNum } = useApp();

  const navBtn = cn(
    "p-1.5 rounded-full border text-gray-400 hover:text-gray-900 transition-colors",
    isDark ? "border-zinc-700 bg-zinc-800" : "border-gray-200 bg-white",
  );

  const shell = cn(
    "rounded-2xl border p-6 flex flex-col justify-between shadow-sm",
    isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200",
    className,
  );

  if (!weather.data) {
    if (weather.loading) {
      return (
        <div className={shell}>
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 w-28 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
            <div className="flex gap-1.5">
              <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-zinc-800 animate-pulse" />
              <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-zinc-800 animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="p-3 rounded-xl border border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/20 min-h-[120px] animate-pulse"
              />
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className={cn(shell, "items-center justify-center text-center gap-2")}>
        <AlertCircle className="w-7 h-7 text-red-500" />
        <p className="text-[13px] font-bold text-gray-500">{t.weatherUnavailable}</p>
      </div>
    );
  }

  const days = weather.data.daily.slice(0, 7);

  return (
    <div className={shell}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-[15px] tracking-tight">{t.forecast}</h3>
        <div className="flex gap-1.5">
          <button className={navBtn}>
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className={navBtn}>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
        {days.map((day, i) => {
          const Icon = iconForCondition(conditionFromCode(day.weatherCode), true);
          return (
            <div
              key={i}
              className={cn(
                "p-3 rounded-xl border flex flex-col items-center justify-between text-center min-h-[120px]",
                isDark ? "border-zinc-800/80 bg-zinc-800/20" : "border-gray-50 bg-gray-50/50",
              )}
            >
              <span className="text-[11px] font-bold text-gray-400 block">
                {i === 0 ? t.today : formatWeekday(day.date, lang)}
              </span>
              <Icon className="w-6 h-6 text-sky-400 my-1.5" />
              <span className="text-[14px] font-bold">{formatTempNum(day.tempMax)}</span>
              <span className="text-[11px] font-semibold text-gray-400">
                {t.min} {formatTempNum(day.tempMin)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}