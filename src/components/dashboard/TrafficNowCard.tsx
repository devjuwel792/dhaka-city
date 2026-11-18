"use client";

import { Activity } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { TRAFFIC_ZONES, TRAFFIC_LEVELS, type CongestionLevel } from "@/data/traffic";
import { DataSourceBadge } from "@/components/common/DataSourceBadge";
import { cn } from "@/utils/cn";

export function TrafficNowCard() {
  const { isDark, lang, t } = useApp();

  const counts = {
    fluid: TRAFFIC_ZONES.filter((z) => z.level === "fluid").length,
    moderate: TRAFFIC_ZONES.filter((z) => z.level === "moderate").length,
    heavy: TRAFFIC_ZONES.filter((z) => z.level === "heavy").length,
  };
  const worst: CongestionLevel =
    counts.heavy > 0 ? "heavy" : counts.moderate > 0 ? "moderate" : "fluid";
  const level = TRAFFIC_LEVELS[worst];

  return (
    <div
      className={cn(
        "rounded-2xl border p-5 shadow-sm flex flex-col justify-between",
        isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200",
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-bold text-[14px] tracking-tight">{t.trafficNow}</h3>
          <DataSourceBadge status="DEMO" />
        </div>
        <div className="flex gap-2.5 mt-2">
          {(["fluid", "moderate", "heavy"] as CongestionLevel[]).map((key) => (
            <span key={key} className="flex items-center gap-1 text-[10px] text-gray-400 font-bold">
              <span className={cn("w-2 h-2 rounded-full", TRAFFIC_LEVELS[key].dot)} />
              {lang === "bn" ? TRAFFIC_LEVELS[key].labelBn : TRAFFIC_LEVELS[key].labelEn}
            </span>
          ))}
        </div>
      </div>

      <div className="my-6 text-center">
        <div
          className="inline-flex flex-col items-center justify-center p-6 rounded-full border-4 animate-pulse"
          style={{
            backgroundColor: `${level.color}18`,
            borderColor: level.color,
          }}
        >
          <Activity className="w-8 h-8" style={{ color: level.color }} />
          <span className="text-[14px] font-black mt-1 uppercase tracking-wider" style={{ color: level.color }}>
            {lang === "bn" ? level.labelBn : level.labelEn}
          </span>
        </div>
      </div>

      <div className="pt-2 border-t border-gray-50 dark:border-zinc-800 text-center text-[10px] text-gray-400">
        Simulated congestion · {counts.heavy} heavy / {TRAFFIC_ZONES.length} zones
      </div>
    </div>
  );
}