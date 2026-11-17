"use client";

import { useApp } from "@/context/AppContext";
import { cn } from "@/utils/cn";

export function StreetMapWidget({ className }: { className?: string }) {
  const { isDark, t, location, setShowMapModal } = useApp();

  return (
    <div
      className={cn(
        "rounded-2xl border p-5 shadow-sm flex flex-col justify-between min-h-[280px]",
        isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-[14px] tracking-tight">{t.liveStreet}</h3>
        <button
          onClick={() => setShowMapModal(true)}
          className="text-[11px] font-bold text-emerald-500 hover:underline font-sans"
        >
          Full Map
        </button>
      </div>

      <div className="flex-1 rounded-xl overflow-hidden relative border border-gray-100 dark:border-zinc-800 bg-[#E8ECEF] dark:bg-zinc-800 flex items-center justify-center">
        <svg className="w-full h-full opacity-70" viewBox="0 0 200 120">
          <rect x="0" y="0" width="200" height="120" fill={isDark ? "#2A2A2A" : "#F3F4F6"} />
          <rect x="15" y="15" width="60" height="40" fill={isDark ? "#1A1A1A" : "#FFFFFF"} rx="4" />
          <rect x="90" y="15" width="95" height="40" fill={isDark ? "#1A1A1A" : "#FFFFFF"} rx="4" />
          <rect x="15" y="70" width="85" height="35" fill={isDark ? "#1A1A1A" : "#FFFFFF"} rx="4" />
          <path d="M 0 60 L 200 60" stroke={isDark ? "#3F3F46" : "#E2E8F0"} strokeWidth="16" />
          <path d="M 80 0 L 80 120" stroke={isDark ? "#3F3F46" : "#E2E8F0"} strokeWidth="16" />
          <path d="M 0 60 L 200 60" stroke="#F59E0B" strokeWidth="1" strokeDasharray="4,4" />
          <path d="M 80 0 L 80 120" stroke="#F59E0B" strokeWidth="1" strokeDasharray="4,4" />
          <circle cx="80" cy="60" r="5" fill="#EF4444" />
          <circle
            cx="80"
            cy="60"
            r="10"
            fill="none"
            stroke="#EF4444"
            strokeWidth="2"
            className="animate-ping"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col justify-between p-3 pointer-events-none">
          <span className="text-[10px] bg-emerald-500 text-white font-bold px-2 py-0.5 rounded shadow">
            {location}
          </span>
          <div className="bg-black/60 backdrop-blur-sm p-1.5 rounded text-white flex justify-between items-center w-full">
            <span className="text-[9px] font-bold">Speed: Avg 24 km/h</span>
            <span className="text-[9px] text-amber-400 font-bold">Congested</span>
          </div>
        </div>
      </div>
    </div>
  );
}