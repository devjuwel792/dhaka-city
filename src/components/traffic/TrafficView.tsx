"use client";

import { Activity } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { trafficSectors } from "@/data/weather";
import { cn } from "@/utils/cn";

export function TrafficView() {
  const { isDark, t, setShowMapModal } = useApp();

  return (
    <div
      className={cn(
        "rounded-2xl border p-8 shadow-sm text-center max-w-2xl mx-auto space-y-6",
        isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200",
      )}
    >
      <Activity className="w-16 h-16 text-[#78D47E] mx-auto animate-pulse" />
      <h3 className="text-2xl font-black">{t.traffic} - Real-time Analysis</h3>
      <p className={isDark ? "text-gray-400" : "text-gray-600"}>
        Detailed grid and path visualization of key sectors across Dhaka metropolitan area.
        Currently showing active alerts and bypass lane speeds.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
        {trafficSectors.map((item, idx) => (
          <div
            key={idx}
            className={cn(
              "p-4 rounded-xl border",
              isDark ? "border-zinc-800 bg-zinc-900/10" : "border-gray-100 bg-gray-50/20",
            )}
          >
            <h4 className="text-[12px] text-gray-400 font-bold">{item.sector}</h4>
            <p className="text-xl font-extrabold mt-2">{item.speed}</p>
            <span className={`text-[11px] font-black uppercase mt-1 block ${item.color}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>

      <div className="pt-6">
        <button
          onClick={() => setShowMapModal(true)}
          className="px-6 py-2.5 bg-emerald-500 text-white font-bold rounded-full hover:bg-emerald-600 transition-colors shadow"
        >
          Open Interactive Map
        </button>
      </div>
    </div>
  );
}