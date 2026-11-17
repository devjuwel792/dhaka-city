"use client";

import { useApp } from "@/context/AppContext";
import { ridesGauges } from "@/data/weather";
import { Gauge } from "@/components/common/Gauge";
import { cn } from "@/utils/cn";

export function RidesCard({ className }: { className?: string }) {
  const { isDark } = useApp();

  return (
    <div
      className={cn(
        "rounded-2xl border p-5 shadow-sm flex flex-col justify-between min-h-[280px]",
        isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200",
        className,
      )}
    >
      <div>
        <h3 className="font-bold text-[14px] tracking-tight">App-Based Rides</h3>
        <p className="text-[11px] text-gray-400 mt-0.5">Real-time Availability</p>
      </div>

      <div className="grid grid-cols-3 gap-1 py-2">
        {ridesGauges.map((gauge, i) => (
          <Gauge
            key={i}
            pct={gauge.pct}
            label={gauge.label}
            stroke={gauge.stroke}
            isDark={isDark}
            labelClassName="text-[10px]"
          />
        ))}
      </div>

      <div className="pt-2 border-t border-gray-50 dark:border-zinc-800 text-center">
        <span className="text-[11px] text-emerald-500 font-bold block hover:underline cursor-pointer">
          Book Ride Now →
        </span>
      </div>
    </div>
  );
}