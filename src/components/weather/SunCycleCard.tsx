"use client";

import { Sun } from "lucide-react";
import { useApp } from "@/context/AppContext";

export function SunCycleCard() {
  const { t } = useApp();

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm border border-zinc-800 relative bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-zinc-950 text-white p-6 flex flex-col justify-between min-h-[160px]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-transparent to-transparent pointer-events-none" />
      <div className="z-10 flex justify-between items-center">
        <h3 className="font-bold text-[14px] text-gray-400">Sun Cycle</h3>
        <Sun className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: "20s" }} />
      </div>

      <div className="z-10 grid grid-cols-2 gap-4 mt-6">
        <div className="border-r border-white/10 pr-2">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{t.sunset}</p>
          <p className="text-lg font-black text-amber-300">5:15 p.m.</p>
        </div>
        <div className="pl-2">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{t.sunrise}</p>
          <p className="text-lg font-black text-sky-300">6:35 a.m.</p>
        </div>
      </div>
    </div>
  );
}