"use client";

import { useApp } from "@/context/AppContext";

export function WaterloggingRiskCard() {
  const { isDark, t, snapshot } = useApp();

  return (
    <div
      className={
        isDark
          ? "rounded-2xl border border-zinc-800 bg-[#1E1E1E] p-5 shadow-sm space-y-4"
          : "rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4"
      }
    >
      <div>
        <h3 className="font-bold text-[14px] tracking-tight">{t.waterloggingRisk}</h3>
        <div className="flex gap-2.5 mt-2">
          <span className="flex items-center gap-1 text-[10px] text-gray-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Low
          </span>
          <span className="flex items-center gap-1 text-[10px] text-gray-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Moderate
          </span>
          <span className="flex items-center gap-1 text-[10px] text-gray-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-red-500" /> Heavy
          </span>
        </div>
      </div>

      <div className="relative pt-4">
        <div className="h-6 w-full bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500 rounded-lg" />
        <div
          className="absolute top-1/2 transform -translate-x-1/2 flex flex-col items-center"
          style={{ left: `${snapshot.waterloggingRisk}%` }}
        >
          <div className="w-3 h-3 bg-white border border-red-500 rounded-full shadow" />
          <span className="bg-red-500 text-white font-extrabold text-[10px] px-1.5 py-0.5 rounded shadow mt-1 whitespace-nowrap">
            💧 {snapshot.waterloggingRisk}%
          </span>
        </div>
      </div>
    </div>
  );
}