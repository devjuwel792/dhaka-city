"use client";

import { useApp } from "@/context/AppContext";
import { defraBars } from "@/data/weather";
import { cn } from "@/utils/cn";

export function AirPollutionCard({ className }: { className?: string }) {
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
        <h3 className="font-bold text-[14px] tracking-tight">Air Pollution (DEFRA)</h3>
        <p className="text-[11px] text-gray-400 mt-0.5">Current Index Indicators</p>
      </div>

      <div className="h-32 flex items-end justify-between px-4 my-2 relative">
        <div className="absolute inset-x-0 bottom-0 h-full flex flex-col justify-between pointer-events-none border-b border-gray-100 dark:border-zinc-800">
          {[100, 80, 60, 40, 20].map((gl) => (
            <div
              key={gl}
              className="w-full flex items-center justify-between border-t border-gray-100/55 dark:border-zinc-800/35"
            >
              <span className="text-[8px] text-gray-400 font-semibold">{gl}</span>
              <div className="flex-1 border-t border-dashed border-gray-100 dark:border-zinc-800/10 ml-2" />
            </div>
          ))}
        </div>

        {defraBars.map((bar) => (
          <div key={bar.label} className="flex flex-col items-center gap-1.5 z-10 w-8">
            <div
              className={`w-4 rounded-t-sm transition-all duration-700 ${bar.color}`}
              style={{ height: `${bar.height}px` }}
            />
            <span className="text-[9px] text-gray-400 font-bold">{bar.label}</span>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-gray-50 dark:border-zinc-800">
        <span className="text-[10px] text-red-500 font-extrabold uppercase bg-red-50 dark:bg-red-950/20 px-2 py-0.5 rounded block text-center">
          Unhealthy 241
        </span>
      </div>
    </div>
  );
}