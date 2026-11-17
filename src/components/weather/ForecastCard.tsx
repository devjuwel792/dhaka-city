"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { forecastDays } from "@/data/weather";
import { cn } from "@/utils/cn";

/** 5-day forecast grid (shared by Dashboard and Weather). */
export function ForecastCard({ className }: { className?: string }) {
  const { isDark, t, formatTemp } = useApp();

  return (
    <div
      className={cn(
        "rounded-2xl border p-6 flex flex-col justify-between shadow-sm",
        isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-[15px] tracking-tight">{t.forecast}</h3>
        <div className="flex gap-1.5">
          <button
            className={cn(
              "p-1.5 rounded-full border text-gray-400 hover:text-gray-900 transition-colors",
              isDark ? "border-zinc-700 bg-zinc-800" : "border-gray-200 bg-white",
            )}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            className={cn(
              "p-1.5 rounded-full border text-gray-400 hover:text-gray-900 transition-colors",
              isDark ? "border-zinc-700 bg-zinc-800" : "border-gray-200 bg-white",
            )}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {forecastDays.map((fc, i) => {
          const Icon = fc.icon;
          return (
            <div
              key={i}
              className={cn(
                "p-3 rounded-xl border flex flex-col items-center justify-between text-center min-h-[140px]",
                isDark ? "border-zinc-800/80 bg-zinc-800/20" : "border-gray-50 bg-gray-50/50",
              )}
            >
              <span className="text-[11px] font-bold text-gray-400 block">{fc.day}</span>
              <div className={cn("p-2 rounded-full my-1.5", fc.bg)}>
                <Icon className={cn("w-6 h-6", fc.color)} />
              </div>
              <span className="text-[14px] font-bold">{formatTemp(Number(fc.temp))}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}