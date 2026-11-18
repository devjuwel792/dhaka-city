"use client";

import { useApp } from "@/context/AppContext";
import { ridesGauges } from "@/data/weather";
import { Gauge } from "@/components/common/Gauge";
import { cn } from "@/utils/cn";

export function RidesCard({ className }: { className?: string }) {
  const { isDark, lang } = useApp();

  return (
    <div
      className={cn(
        "rounded-2xl border p-5 shadow-sm flex flex-col justify-between min-h-[280px]",
        isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200",
        className,
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-bold text-[14px] tracking-tight">
            {lang === "bn" ? "অ্যাপ-ভিত্তিক রাইড" : "App-Based Rides"}
          </h3>
          <span className="bg-amber-400 text-black font-extrabold text-[8px] px-1.5 py-0.5 rounded">
            DEMO
          </span>
        </div>
        <p className="text-[11px] text-gray-400 mt-0.5">
          {lang === "bn"
            ? "নমুনা প্রাপ্যতা — লাইভ নয়"
            : "Illustrative availability — not live"}
        </p>
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
        <span className="text-[10px] text-gray-400 font-bold block">
          {lang === "bn"
            ? "রাইড বুকিং সংযুক্ত নেই"
            : "Ride booking is not connected"}
        </span>
      </div>
    </div>
  );
}