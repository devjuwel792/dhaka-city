"use client";

import { Plus, Minus, AlertCircle } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { degreesToCompass } from "@/utils/weather";

export function WeatherDetails() {
  const { isDark, t, lang, location, weather, formatTemp, formatTempNum } = useApp();

  const card = isDark
    ? "rounded-2xl border border-zinc-800 bg-[#1E1E1E] p-5 shadow-sm"
    : "rounded-2xl border border-gray-200 bg-white p-5 shadow-sm";

  const cur = weather.data?.current;
  const dash = "—";
  const visibilityKm =
    cur && cur.visibility > 0 ? `${(cur.visibility / 1000).toFixed(1)} km` : dash;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      {/* Temperature map (illustrative) */}
      <div className="md:col-span-6 rounded-2xl border border-zinc-800 dark:border-zinc-800 bg-white dark:bg-[#1E1E1E] border-gray-200 p-5 shadow-sm flex flex-col justify-between min-h-[350px]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-[14px] tracking-tight">{t.temperatureMap}</h3>
          <div className="flex gap-1">
            <button className={isDark ? "p-1 rounded bg-zinc-800 text-gray-200" : "p-1 rounded bg-gray-100 text-gray-700"}>
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button className={isDark ? "p-1 rounded bg-zinc-800 text-gray-200" : "p-1 rounded bg-gray-100 text-gray-700"}>
              <Minus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex-1 rounded-xl overflow-hidden relative border border-[#E9D558]/30 bg-[#F4DF77]/25 flex items-center justify-center">
          <svg className="w-full h-full opacity-65" viewBox="0 0 200 150">
            <rect x="0" y="0" width="200" height="150" fill="#EAB308" opacity="0.15" />
            <path
              d="M10,20 Q50,40 100,20 T190,50 L180,120 Q110,140 70,110 Z"
              fill="#EAB308"
              opacity="0.3"
              stroke="#CA8A04"
              strokeWidth="1.5"
            />
            <path d="M60,60 Q100,70 120,110 T160,130" fill="none" stroke="#A16207" strokeWidth="1" strokeDasharray="3,3" />
            <text x="35" y="38" fill="#854D0E" fontSize="9" fontWeight="bold">Savar</text>
            <text x="100" y="75" fill="#854D0E" fontSize="10" fontWeight="extrabold">Dhaka</text>
            <text x="100" y="86" fill="#A16207" fontSize="9" fontWeight="bold">
              {cur ? formatTempNum(cur.temperature) : dash}
            </text>
            <text x="145" y="115" fill="#854D0E" fontSize="9" fontWeight="bold">Narayanganj</text>
          </svg>

          <div className="absolute bottom-3 inset-x-3 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg text-white flex flex-col gap-1 pointer-events-none">
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-green-400 via-yellow-400 to-red-500 rounded-full" />
            <div className="flex justify-between text-[9px] font-bold text-gray-300">
              <span>-20°C</span>
              <span>-10°</span>
              <span>0°</span>
              <span>10°</span>
              <span>20°</span>
              <span>30°</span>
              <span>40°</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right column: details grid + satellite */}
      <div className="md:col-span-6 space-y-6">
        <div className={card}>
          <h4 className="font-bold text-[13px] uppercase tracking-wide text-gray-400 mb-3">
            {t.weatherToday} {location}
          </h4>

          {!cur && weather.loading && (
            <p className="text-[13px] text-gray-400 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full border-2 border-gray-300 border-t-emerald-500 animate-spin" />
              {t.weatherLoading}
            </p>
          )}
          {!cur && !weather.loading && (
            <p className="text-[13px] text-red-500 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> {t.weatherUnavailable}
            </p>
          )}

          {cur && (
            <div className="grid grid-cols-2 gap-y-3.5 gap-x-6 text-[13px] font-medium">
              <div className="flex justify-between py-1 border-b border-gray-50 dark:border-zinc-800">
                <span className="text-gray-400">{t.feelsLike}</span>
                <span className="font-bold">{formatTemp(cur.apparentTemperature)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50 dark:border-zinc-800">
                <span className="text-gray-400">{t.uvIndex}</span>
                <span className="font-bold">{Math.round(cur.uvIndex)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50 dark:border-zinc-800">
                <span className="text-gray-400">{t.wind}</span>
                <span className="font-bold">
                  {Math.round(cur.windSpeed)} km/h {degreesToCompass(cur.windDirection)}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50 dark:border-zinc-800">
                <span className="text-gray-400">{t.visibility}</span>
                <span className="font-bold">{visibilityKm}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50 dark:border-zinc-800">
                <span className="text-gray-400">{t.humidity}</span>
                <span className="font-bold">{Math.round(cur.humidity)}%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50 dark:border-zinc-800">
                <span className="text-gray-400">{t.precipitation}</span>
                <span className="font-bold">{cur.precipitation} mm</span>
              </div>
            </div>
          )}
        </div>

        <div className={isDark ? "rounded-2xl border border-zinc-800 bg-[#1E1E1E] p-4 shadow-sm flex flex-col justify-between" : "rounded-2xl border border-gray-200 bg-white p-4 shadow-sm flex flex-col justify-between"}>
          <div className="flex items-center justify-between gap-2 mb-2">
            <h4 className="font-bold text-[13px] tracking-tight">{t.satellite}</h4>
            <span className="bg-amber-400 text-black font-extrabold text-[8px] px-1.5 py-0.5 rounded">
              DEMO
            </span>
          </div>
          <div
            className={
              isDark
                ? "h-32 rounded-xl border border-zinc-800 bg-zinc-900/40 flex flex-col items-center justify-center text-center px-3"
                : "h-32 rounded-xl border border-gray-100 bg-gray-50 flex flex-col items-center justify-center text-center px-3"
            }
          >
            <AlertCircle className="w-5 h-5 text-gray-400" />
            <p className="text-[11px] font-bold mt-1">
              {lang === "bn" ? "কোনো স্যাটেলাইট ফিড নেই" : "No satellite feed integrated"}
            </p>
            <p className="text-[9px] text-gray-400 mt-0.5">
              {lang === "bn"
                ? "কোনো কাল্পনিক স্যাটেলাইট চিত্র দেখানো হয় না।"
                : "No illustrative imagery is presented as live."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}