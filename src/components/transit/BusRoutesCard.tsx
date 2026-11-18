"use client";

import { useApp } from "@/context/AppContext";
import { useTransitData } from "@/hooks/useTransitData";
import { StatusDot } from "@/components/common/StatusBadge";
import { cn } from "@/utils/cn";

export function BusRoutesCard() {
  const { isDark, t, lang } = useApp();
  const { busRoutes } = useTransitData();

  return (
    <div
      className={cn(
        "rounded-2xl border p-5 shadow-sm",
        isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200",
      )}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <h3 className="font-extrabold text-[15px] tracking-tight">{t.busRoutesStatus}</h3>
        <span className="bg-amber-400 text-black font-extrabold text-[8px] px-1.5 py-0.5 rounded">
          DEMO
        </span>
      </div>
      <div className="flex gap-2.5 mb-4 text-[10px] font-bold text-gray-400">
        <span className="flex items-center gap-1">
          <StatusDot color="green" className="w-2 h-2" /> {t.onTime}
        </span>
        <span className="flex items-center gap-1">
          <StatusDot color="orange" className="w-2 h-2" /> {t.delayed}
        </span>
        <span className="flex items-center gap-1">
          <StatusDot color="red" className="w-2 h-2" /> {t.disrupted}
        </span>
      </div>

      <p className="text-[10px] text-gray-400 mb-3">
        {lang === "bn" ? "নমুনা স্ট্যাটাস — লাইভ নয়" : "Sample status — not live"}
      </p>

      <div
        className={cn(
          "grid grid-cols-3 gap-y-4 gap-x-2 border-t pt-4",
          isDark ? "border-zinc-800" : "border-gray-50",
        )}
      >
        {busRoutes.data.map((route, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center justify-between pr-2 border-r last:border-0",
              isDark ? "border-zinc-800" : "border-gray-100",
            )}
          >
            <span className="text-[12px] font-bold truncate max-w-[80px]">{route.name}</span>
            <StatusDot color={route.color} className="flex-shrink-0 ml-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
