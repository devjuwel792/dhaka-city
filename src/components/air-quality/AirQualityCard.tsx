"use client";

import { useApp } from "@/context/AppContext";
import { pollutants } from "@/data/weather";

export function AirQualityCard() {
  const { isDark, t, location, snapshot } = useApp();

  return (
    <div
      className={
        isDark
          ? "rounded-2xl border border-zinc-800 bg-[#1E1E1E] p-6 shadow-sm space-y-5"
          : "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-5"
      }
    >
      <div>
        <h3 className="font-extrabold text-[15px] tracking-tight">
          Today&apos;s Air Quality in {location}
        </h3>
        <h4 className="text-lg font-black text-red-500 mt-2">
          {t.unhealthy} {snapshot.aqi}
        </h4>
        <p className="text-[12px] leading-5 text-gray-400 mt-1">{t.maskWarning}</p>
      </div>

      <div className="relative py-2">
        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-yellow-400 via-orange-400 to-red-600 rounded-full" />
        <div className="absolute top-0.5 left-[75%] w-3 h-3 bg-red-500 rounded-full border border-white shadow" />
      </div>

      <div className="border-t border-gray-50 dark:border-zinc-800 pt-4">
        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
          {t.primaryPollutant}
        </p>
        <p className="text-[13px] font-bold mt-1 text-slate-700 dark:text-gray-200">
          PM2.5 (Particulate matter less than 2.5 microns)
        </p>
      </div>

      <div className="border-t border-gray-50 dark:border-zinc-800 pt-4">
        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-3">
          {t.allPollutants}
        </p>
        <div className="space-y-3">
          {pollutants.map((pol, i) => {
            const radius = 14;
            const circ = 2 * Math.PI * radius;
            const offset = circ - (pol.val / pol.max) * circ;
            return (
              <div key={i} className="flex items-center justify-between">
                <span className="text-[12px] font-medium text-gray-600 dark:text-gray-300">
                  {pol.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-extrabold ${pol.col}`}>{pol.val} AQI</span>
                  <div className="w-8 h-8 relative flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="16"
                        cy="16"
                        r={radius}
                        fill="transparent"
                        stroke={isDark ? "#2D2D30" : "#F3F4F6"}
                        strokeWidth="3"
                      />
                      <circle
                        cx="16"
                        cy="16"
                        r={radius}
                        fill="transparent"
                        stroke={pol.stroke}
                        strokeWidth="3"
                        strokeDasharray={circ}
                        strokeDashoffset={offset}
                      />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}