"use client";

import { ArrowRight, ArrowLeft } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/utils/cn";

export function MetroRailCard() {
  const { isDark, t } = useApp();

  return (
    <div
      className={cn(
        "rounded-2xl border p-5 shadow-sm",
        isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200",
      )}
    >
      <h3 className="font-extrabold text-[15px] tracking-tight mb-2">{t.metroRailStatus}</h3>
      <div className="flex gap-2.5 mb-5 text-[10px] font-bold text-gray-400">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500" /> {t.inStation}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-500" /> {t.onWay}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500" /> {t.farAway}
        </span>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-gray-400">
            <span>{t.towardsUttara}</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div
            className={cn(
              "h-2 w-full rounded-full relative flex items-center",
              isDark ? "bg-zinc-800" : "bg-gray-100",
            )}
          >
            <div className="absolute left-0 w-1/4 h-full bg-red-500 rounded-l-full" />
            <div className="absolute left-[35%] w-1/5 h-full bg-amber-500" />
            <div className="absolute left-[70%] w-1/6 h-full bg-emerald-500" />
            <div className="absolute left-[20%] w-2 h-2 rounded-full bg-white border-2 border-red-500 shadow transform -translate-y-1/2 top-1/2" />
            <div className="absolute left-[45%] w-2 h-2 rounded-full bg-white border-2 border-amber-500 shadow transform -translate-y-1/2 top-1/2" />
            <div className="absolute left-[78%] w-2 h-2 rounded-full bg-white border-2 border-emerald-500 shadow transform -translate-y-1/2 top-1/2" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-gray-400">
            <span>{t.towardsMotijheel}</span>
            <ArrowLeft className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div
            className={cn(
              "h-2 w-full rounded-full relative flex items-center",
              isDark ? "bg-zinc-800" : "bg-gray-100",
            )}
          >
            <div className="absolute left-[5%] w-1/6 h-full bg-red-500" />
            <div className="absolute left-[30%] w-1/4 h-full bg-emerald-500" />
            <div className="absolute left-[65%] w-1/5 h-full bg-amber-500" />
            <div className="absolute left-[90%] w-[10%] h-full bg-red-500 rounded-r-full" />
            <div className="absolute left-[12%] w-2 h-2 rounded-full bg-white border-2 border-red-500 shadow transform -translate-y-1/2 top-1/2" />
            <div className="absolute left-[40%] w-2 h-2 rounded-full bg-white border-2 border-emerald-500 shadow transform -translate-y-1/2 top-1/2" />
            <div className="absolute left-[75%] w-2 h-2 rounded-full bg-white border-2 border-amber-500 shadow transform -translate-y-1/2 top-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}