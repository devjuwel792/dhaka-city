"use client";

import { CloudSun, Wind, Droplets } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/utils/cn";

interface TodayWeatherCardProps {
  variant?: "dashboard" | "weather";
  className?: string;
}

/** Today's weather highlight card (dashboard + weather variants). */
export function TodayWeatherCard({ variant = "dashboard", className }: TodayWeatherCardProps) {
  const { t, snapshot, formatTempFull } = useApp();
  const isWeather = variant === "weather";

  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-zinc-800 relative bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-zinc-950 text-white min-h-[300px] flex flex-col justify-between p-6",
        className,
      )}
    >
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-sky-500/20 rounded-full blur-3xl" />

      <div className="z-10 flex justify-between items-start">
        <div>
          <span className="text-[12px] tracking-wide uppercase font-bold text-gray-400 bg-white/5 px-2.5 py-1 rounded-full">
            {t.today}, 13th of Dec
          </span>
          {isWeather ? (
            <h3 className="text-5xl font-black mt-5 tracking-tight">{snapshot.temp}° Celsius</h3>
          ) : (
            <h3 className="text-4xl font-extrabold mt-4 tracking-tight">
              {formatTempFull(snapshot.temp)}
            </h3>
          )}
          <p className="text-emerald-400 font-bold text-[14px] mt-1 flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            Cloudy
          </p>
        </div>
        {isWeather ? (
          <CloudSun className="w-20 h-20 text-sky-400 animate-pulse" />
        ) : (
          <CloudSun className="w-16 h-16 text-sky-400 animate-bounce" />
        )}
      </div>

      <div className="z-10 pt-8 border-t border-white/10 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Wind className={cn(isWeather ? "w-5 h-5" : "w-4 h-4", "text-sky-400")} />
          <div>
            <p className="text-[9px] text-gray-400 uppercase tracking-wider font-extrabold">
              {isWeather ? "Wind" : "Wind Speed"}
            </p>
            <p className="text-[13px] font-bold">6 km/h{isWeather ? "" : " (NE)"}</p>
            {isWeather && <p className="text-[10px] text-zinc-500">Hum | 32%</p>}
          </div>
        </div>
        {isWeather ? (
          <div className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-sky-400" />
            <div>
              <p className="text-[9px] text-gray-400 uppercase tracking-wider font-extrabold">
                Atmosphere
              </p>
              <p className="text-[13px] font-bold">Mild haze</p>
              <p className="text-[10px] text-zinc-500">PM2.5 | {snapshot.pm25}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-sky-400" />
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Humidity</p>
              <p className="text-[13px] font-bold">32%</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}