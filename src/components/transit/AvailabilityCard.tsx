"use client";

import { useApp } from "@/context/AppContext";
import type { Availability } from "@/types";
import { Gauge } from "@/components/common/Gauge";
import { cn } from "@/utils/cn";

interface AvailabilityCardProps {
  title: string;
  availability: Availability;
}

export function AvailabilityCard({ title, availability }: AvailabilityCardProps) {
  const { isDark, t } = useApp();

  return (
    <div
      className={cn(
        "rounded-2xl border p-5 shadow-sm",
        isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200",
      )}
    >
      <h3 className="font-extrabold text-[15px] tracking-tight mb-2">{title}</h3>
      <div className="flex gap-2.5 mb-5 text-[10px] font-bold text-gray-400">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500" /> {t.high}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-500" /> {t.moderate}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500" /> {t.low}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Gauge pct={availability.high} label="High" stroke="#10B981" isDark={isDark} labelClassName="text-[11px]" />
        <Gauge pct={availability.mod} label="Moderate" stroke="#F59E0B" isDark={isDark} labelClassName="text-[11px]" />
        <Gauge pct={availability.low} label="Low" stroke="#EF4444" isDark={isDark} labelClassName="text-[11px]" />
      </div>
    </div>
  );
}