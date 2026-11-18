"use client";

import { useMemo, useState } from "react";
import { ArrowDownUp, Search, TrainFront } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { METRO_LINE_6_META, MRT_LINE_6_STATIONS } from "@/data/transit";
import { cn } from "@/utils/cn";

type Direction = "north" | "south";

export function MetroRailCard() {
  const { isDark, lang } = useApp();
  const [query, setQuery] = useState("");
  const [direction, setDirection] = useState<Direction>("north");

  const stations = useMemo(() => {
    const ordered =
      direction === "north" ? MRT_LINE_6_STATIONS : [...MRT_LINE_6_STATIONS].reverse();
    const needle = query.trim().toLowerCase();
    if (!needle) return ordered;
    return ordered.filter(
      (station) =>
        station.name.toLowerCase().includes(needle) ||
        station.nameBn.includes(query.trim()) ||
        String(station.order) === needle,
    );
  }, [direction, query]);

  const from = direction === "north" ? METRO_LINE_6_META.terminusA : METRO_LINE_6_META.terminusB;
  const to = direction === "north" ? METRO_LINE_6_META.terminusB : METRO_LINE_6_META.terminusA;

  return (
    <div
      className={cn(
        "rounded-2xl border p-5 shadow-sm",
        isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200",
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <div>
          <h3 className="font-extrabold text-[15px] tracking-tight flex items-center gap-2">
            <TrainFront className="w-4 h-4 text-emerald-500" />
            {lang === "bn" ? METRO_LINE_6_META.nameBn : METRO_LINE_6_META.name}
          </h3>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {lang === "bn"
              ? `${METRO_LINE_6_META.stationCount}টি স্টেশন · ${METRO_LINE_6_META.terminusABn} ↔ ${METRO_LINE_6_META.terminusBBn}`
              : `${METRO_LINE_6_META.stationCount} stations · ${METRO_LINE_6_META.terminusA} ↔ ${METRO_LINE_6_META.terminusB}`}
          </p>
        </div>
        <span className="bg-amber-400 text-black font-extrabold text-[8px] px-1.5 py-0.5 rounded shrink-0">
          DEMO
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={
              lang === "bn" ? "স্টেশন খুঁজুন" : "Find a station"
            }
            aria-label={lang === "bn" ? "স্টেশন খুঁজুন" : "Find a metro station"}
            className={cn(
              "w-full rounded-lg border pl-8 pr-3 py-1.5 text-[11px] font-semibold outline-none focus:border-emerald-500",
              isDark
                ? "bg-zinc-800 border-zinc-700 text-gray-200"
                : "bg-white border-gray-300 text-gray-700",
            )}
          />
        </div>
        <button
          type="button"
          onClick={() => setDirection((d) => (d === "north" ? "south" : "north"))}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-zinc-700 text-[11px] font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
        >
          <ArrowDownUp className="w-3.5 h-3.5" />
          {lang === "bn" ? "দিক বদলান" : "Reverse"}
        </button>
      </div>

      <p className="text-[10px] font-bold text-gray-400 mt-3">
        {lang === "bn" ? `${to} অভিমুখে` : `Towards ${to}`}
        <span className="font-normal text-gray-400"> · from {from}</span>
      </p>

      <div
        className={cn(
          "mt-2 max-h-[300px] overflow-y-auto pr-1",
          stations.length === 0 && "py-6",
        )}
      >
        {stations.length === 0 ? (
          <p className="text-center text-[11px] text-gray-400 py-6">
            {lang === "bn" ? "কোনো স্টেশন পাওয়া যায়নি" : "No station matches that search"}
          </p>
        ) : (
          <ol className="relative">
            {stations.map((station) => (
              <li key={station.id} className="flex items-center gap-3 py-1.5">
                <span
                  className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center text-[8px] font-extrabold shrink-0",
                    isDark
                      ? "border-emerald-600 text-emerald-400"
                      : "border-emerald-500 text-emerald-600",
                  )}
                  aria-hidden="true"
                >
                  {station.order}
                </span>
                <span className="text-[12px] font-bold">
                  {lang === "bn" ? station.nameBn : station.name}
                </span>
                <span className="text-[10px] text-gray-400 truncate">
                  {lang === "bn" ? station.name : station.nameBn}
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>

      <p className="mt-3 pt-3 border-t border-gray-100 dark:border-zinc-800 text-[10px] leading-4 text-gray-400">
        {lang === "bn"
          ? "স্টেশনের তালিকা ও ক্রম স্থির তথ্য। লাইভ ট্রেনের অবস্থান বা আগমন সময় পাওয়া যায় না — DEMO ব্যাজ নমুনা অবস্থা বোঝায়।"
          : "Station names and order are static reference data. Live train positions and arrival times are unavailable — the DEMO badge marks sample status."}
      </p>
    </div>
  );
}