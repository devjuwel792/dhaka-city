"use client";

import { Wind, Droplets, AlertCircle } from "lucide-react";
import { useApp } from "@/context/AppContext";
import {
  conditionFromCode,
  iconForCondition,
  conditionLabelKey,
  degreesToCompass,
} from "@/utils/weather";
import { cn } from "@/utils/cn";

interface TodayWeatherCardProps {
  variant?: "dashboard" | "weather";
  className?: string;
}

const shell =
  "rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-zinc-800 relative bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-zinc-950 text-white min-h-[300px] flex flex-col justify-between p-6";

/** Today's weather highlight card, driven by the live Open-Meteo feed. */
export function TodayWeatherCard({ variant = "dashboard", className }: TodayWeatherCardProps) {
  const { t, weather, formatTempFull, formatTemp } = useApp();
  const isWeather = variant === "weather";

  if (!weather.data) {
    if (weather.loading) {
      return (
        <div className={cn(shell, "justify-center animate-pulse", className)}>
          <div className="h-4 w-40 bg-white/10 rounded mb-5" />
          <div className="h-12 w-36 bg-white/10 rounded mb-4" />
          <div className="h-4 w-28 bg-white/10 rounded" />
        </div>
      );
    }
    return (
      <div className={cn(shell, "items-center justify-center text-center gap-2", className)}>
        <AlertCircle className="w-8 h-8 text-red-400" />
        <p className="text-[13px] font-bold text-gray-300">{t.weatherUnavailable}</p>
        <p className="text-[11px] text-gray-500">{t.weatherError}</p>
      </div>
    );
  }

  const cur = weather.data.current;
  const condition = conditionFromCode(cur.weatherCode);
  const Icon = iconForCondition(condition, cur.isDay);
  const label = t[conditionLabelKey(condition)] ?? t.weatherCloudy;
  const windDir = degreesToCompass(cur.windDirection);

  return (
    <div className={cn(shell, className)}>
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-sky-500/20 rounded-full blur-3xl" />

      <div className="z-10 flex justify-between items-start">
        <div>
          <span className="text-[12px] tracking-wide uppercase font-bold text-gray-400 bg-white/5 px-2.5 py-1 rounded-full">
            {t.today}
          </span>
          {isWeather ? (
            <h3 className="text-5xl font-black mt-5 tracking-tight">{formatTempFull(cur.temperature)}</h3>
          ) : (
            <h3 className="text-4xl font-extrabold mt-4 tracking-tight">{formatTempFull(cur.temperature)}</h3>
          )}
          <p className="text-emerald-400 font-bold text-[14px] mt-1 flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            {label}
          </p>
          <p className="text-[11px] text-gray-400 mt-1">
            {t.feelsLikeShort} {formatTemp(cur.apparentTemperature)}
          </p>
        </div>
        <Icon className={cn(isWeather ? "w-20 h-20" : "w-16 h-16", "text-sky-400")} />
      </div>

      <div className="z-10 pt-8 border-t border-white/10 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Wind className={cn(isWeather ? "w-5 h-5" : "w-4 h-4", "text-sky-400")} />
          <div>
            <p className="text-[9px] text-gray-400 uppercase tracking-wider font-extrabold">
              {isWeather ? t.wind : t.windSpeed}
            </p>
            <p className="text-[13px] font-bold">
              {Math.round(cur.windSpeed)} km/h {windDir}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Droplets className={cn(isWeather ? "w-5 h-5" : "w-4 h-4", "text-sky-400")} />
          <div>
            <p className="text-[9px] text-gray-400 uppercase tracking-wider font-extrabold">{t.humidity}</p>
            <p className="text-[13px] font-bold">{Math.round(cur.humidity)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}