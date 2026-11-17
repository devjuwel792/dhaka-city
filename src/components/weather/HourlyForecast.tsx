"use client";

import { Droplets, Wind } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { hourlyForecast } from "@/data/weather";

export function HourlyForecast() {
  const { isDark, t } = useApp();

  return (
    <div
      className={
        isDark
          ? "rounded-2xl border border-zinc-800 bg-[#1E1E1E] p-6 shadow-sm"
          : "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      }
    >
      <h3 className="font-bold text-[15px] tracking-tight mb-4">{t.hourlyForecast}</h3>
      <div className="grid grid-cols-4 gap-4">
        {hourlyForecast.map((hr, idx) => {
          const Icon = hr.icon;
          return (
            <div
              key={idx}
              className={
                isDark
                  ? "p-4 rounded-xl border border-zinc-850 bg-zinc-900/10 flex flex-col justify-between items-center text-center space-y-2"
                  : "p-4 rounded-xl border border-gray-100 bg-gray-50/20 flex flex-col justify-between items-center text-center space-y-2"
              }
            >
              <span className="text-[12px] font-extrabold text-gray-400">{hr.time}</span>
              <Icon className={`w-8 h-8 ${hr.color} animate-pulse`} />
              <span className="text-xl font-bold">{hr.temp}</span>
              <div className="flex flex-col gap-0.5 text-[11px] text-gray-500 mt-1">
                <span className="flex items-center gap-1 justify-center font-sans">
                  <Droplets className="w-3 h-3 text-sky-400" /> {hr.hum}
                </span>
                <span className="flex items-center gap-1 justify-center font-sans">
                  <Wind className="w-3 h-3 text-sky-400" /> {hr.wind}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}