"use client";

import { Activity } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/utils/cn";

export function TrafficNowCard() {
  const { isDark, t } = useApp();

  return (
    <div
      className={cn(
        "rounded-2xl border p-5 shadow-sm flex flex-col justify-between",
        isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200",
      )}
    >
      <div>
        <h3 className="font-bold text-[14px] tracking-tight">{t.trafficNow}</h3>
        <div className="flex gap-2.5 mt-2">
          <span className="flex items-center gap-1 text-[10px] text-gray-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Light
          </span>
          <span className="flex items-center gap-1 text-[10px] text-gray-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Moderate
          </span>
          <span className="flex items-center gap-1 text-[10px] text-gray-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-red-500" /> Heavy
          </span>
        </div>
      </div>

      <div className="my-6 text-center">
        <div className="inline-flex flex-col items-center justify-center p-6 rounded-full bg-amber-50 dark:bg-amber-950/20 border-4 border-amber-400 animate-pulse">
          <Activity className="w-8 h-8 text-amber-500" />
          <span className="text-[14px] font-black text-amber-600 dark:text-amber-400 mt-1 uppercase tracking-wider">
            Moderate
          </span>
        </div>
      </div>

      <div className="pt-2 border-t border-gray-50 dark:border-zinc-800 text-center text-[10px] text-gray-400">
        Calculated for central bypass zones.
      </div>
    </div>
  );
}