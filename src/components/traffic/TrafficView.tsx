"use client";

import { useMemo, useState } from "react";
import { Activity, AlertTriangle, Clock, MapPin } from "lucide-react";
import { useApp } from "@/context/AppContext";
import {
  TRAFFIC_ZONES,
  TRAFFIC_LEVELS,
  DEMO_TRAFFIC_INCIDENTS,
  TRAFFIC_META,
  type CongestionLevel,
} from "@/data/traffic";
import { DataSourceBadge } from "@/components/common/DataSourceBadge";
import { TrafficMapCanvas } from "./TrafficMapCanvas";
import { cn } from "@/utils/cn";

type Filter = "all" | CongestionLevel;

export function TrafficView() {
  const { isDark, lang, t } = useApp();
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(
    () => ({
      fluid: TRAFFIC_ZONES.filter((z) => z.level === "fluid").length,
      moderate: TRAFFIC_ZONES.filter((z) => z.level === "moderate").length,
      heavy: TRAFFIC_ZONES.filter((z) => z.level === "heavy").length,
    }),
    [],
  );

  const zones = useMemo(
    () => (filter === "all" ? TRAFFIC_ZONES : TRAFFIC_ZONES.filter((z) => z.level === filter)),
    [filter],
  );

  const card = cn(
    "rounded-2xl border p-5 shadow-sm",
    isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200",
  );

  return (
    <div className="space-y-6">
      <div className={card}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Activity className="w-6 h-6 text-[#78D47E]" />
              <h2 className="text-xl font-extrabold tracking-tight">{t.traffic}</h2>
              <DataSourceBadge status="DEMO" />
            </div>
            <p className={cn("text-[12px] mt-1 max-w-2xl", isDark ? "text-gray-400" : "text-gray-500")}>
              {lang === "bn" ? TRAFFIC_META.noteBn : TRAFFIC_META.noteEn}
            </p>
          </div>
          <span className="flex items-center gap-1.5 text-[10px] text-gray-400 font-semibold">
            <Clock className="w-3.5 h-3.5" />
            {TRAFFIC_META.provider}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {(["all", "fluid", "moderate", "heavy"] as Filter[]).map((option) => {
            const active = filter === option;
            const label =
              option === "all"
                ? lang === "bn"
                  ? "সব এলাকা"
                  : "All zones"
                : lang === "bn"
                  ? TRAFFIC_LEVELS[option].labelBn
                  : TRAFFIC_LEVELS[option].labelEn;
            const suffix = option === "all" ? TRAFFIC_ZONES.length : counts[option];
            return (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={cn(
                  "px-3 py-1.5 rounded-full border text-[11px] font-bold transition-colors",
                  active
                    ? "bg-indigo-500 text-white border-indigo-500"
                    : isDark
                      ? "bg-zinc-800 text-gray-300 border-zinc-700 hover:bg-zinc-700"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50",
                )}
              >
                {label} ({suffix})
              </button>
            );
          })}
        </div>
      </div>

      <div className={cn("rounded-2xl border overflow-hidden shadow-sm", isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200")}>
        <div className={cn("p-4 border-b flex flex-wrap items-center justify-between gap-2", isDark ? "border-zinc-800" : "border-gray-100")}>
          <div>
            <h3 className="font-bold text-[14px] tracking-tight">
              {lang === "bn" ? "ভৌগোলিক প্রেক্ষাপট" : "Geographic context"}
            </h3>
            <p className="text-[10px] text-gray-400">
              {lang === "bn"
                ? "মানচিত্র OpenStreetMap থেকে; যানজটের তথ্য অনুকরণীয়।"
                : "Map geography from OpenStreetMap; congestion values are simulated."}
            </p>
          </div>
          <span className="text-[10px] text-gray-400">© OpenStreetMap contributors</span>
        </div>
        <div className="h-[360px]">
          <TrafficMapCanvas lang={lang} />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {zones.map((zone) => {
              const level = TRAFFIC_LEVELS[zone.level];
              return (
                <div key={zone.id} className={card}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-[13px] font-extrabold">
                        {lang === "bn" ? zone.nameBn : zone.nameEn}
                      </h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">{zone.road}</p>
                    </div>
                    <span className={cn("text-[10px] font-black uppercase", level.text)}>
                      {lang === "bn" ? level.labelBn : level.labelEn}
                    </span>
                  </div>
                  <div className="flex items-end justify-between mt-4">
                    <div>
                      <p className="text-2xl font-black leading-none">{zone.speedKph}</p>
                      <p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">km/h (simulated)</p>
                    </div>
                    <span className={cn("w-2.5 h-2.5 rounded-full", level.dot)} />
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-gray-100 dark:bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min(100, (zone.speedKph / 50) * 100)}%`,
                        background: level.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="xl:col-span-4 space-y-6">
          <div className={card}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-[14px] tracking-tight">{t.trafficNow}</h3>
              <DataSourceBadge status="DEMO" />
            </div>
            <div className="space-y-2 text-[12px]">
              {(["fluid", "moderate", "heavy"] as CongestionLevel[]).map((level) => (
                <div key={level} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-500">
                    <span className={cn("w-2 h-2 rounded-full", TRAFFIC_LEVELS[level].dot)} />
                    {lang === "bn" ? TRAFFIC_LEVELS[level].labelBn : TRAFFIC_LEVELS[level].labelEn}
                  </span>
                  <span className="font-extrabold">{counts[level]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={card}>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-[14px] tracking-tight">
                {lang === "bn" ? "ট্রাফিক ঘটনা" : "Traffic incidents"}
              </h3>
            </div>
            <p className="text-[11px] text-gray-400 leading-5">
              {lang === "bn"
                ? "কোনো যাচাইকৃত লাইভ ট্রাফিক ঘটনা ফিড পাওয়া যায়নি। নিচের দৃশ্যগুলো কেবল ডেমো।"
                : "No verified live traffic incident feed is available. The scenarios below are demo-only."}
            </p>
            <div className="mt-3 space-y-2">
              {DEMO_TRAFFIC_INCIDENTS.map((incident) => (
                <div
                  key={incident.id}
                  className={cn(
                    "rounded-xl border p-3",
                    isDark ? "border-zinc-700 bg-zinc-800/30" : "border-amber-100 bg-amber-50/40",
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="text-[11px] font-bold truncate">{incident.zone}</span>
                    <DataSourceBadge status="DEMO" className="ml-auto" />
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">
                    {lang === "bn" ? incident.titleBn : incident.titleEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}