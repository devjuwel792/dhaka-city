"use client";

import { useApp } from "@/context/AppContext";
import { useTransitData } from "@/hooks/useTransitData";
import { StatusDot } from "@/components/common/StatusBadge";
import { cn } from "@/utils/cn";

export function BusRoutesCard() {
  const { isDark, t } = useApp();
  const { busRoutes } = useTransitData();

  return (
    <div
      className={cn(
        "rounded-2xl border p-5 shadow-sm",
        isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200",
      )}
    >
      <h3 className="font-extrabold text-[15px] tracking-tight mb-2">{t.busRoutesStatus}</h3>
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