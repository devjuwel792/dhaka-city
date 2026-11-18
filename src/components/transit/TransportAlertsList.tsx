"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useTransitData } from "@/hooks/useTransitData";
import { StatusBadge, StatusDot, EmptyState } from "@/components/common";
import { cn } from "@/utils/cn";

export function TransportAlertsList() {
  const { isDark, t, lang } = useApp();
  const { alerts } = useTransitData();
  const list = alerts.data;

  const [alertsSearch, setAlertsSearch] = useState("");
  const [alertsFilter, setAlertsFilter] = useState("all");

  const filtered = useMemo(() => {
    return list.filter((alert) => {
      const matchesSearch = alert.name.toLowerCase().includes(alertsSearch.toLowerCase());
      if (alertsFilter === "all") return matchesSearch;
      if (alertsFilter === "good") return matchesSearch && alert.status === "Good Service";
      if (alertsFilter === "minor") return matchesSearch && alert.status === "Minor Delays";
      if (alertsFilter === "major") return matchesSearch && alert.status === "Major Delays";
      return matchesSearch;
    });
  }, [list, alertsSearch, alertsFilter]);

  return (
    <div
      className={cn(
        "xl:col-span-7 rounded-2xl border p-6 shadow-sm flex flex-col justify-between",
        isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200",
      )}
    >
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-lg tracking-tight">{t.transportAlerts}</h3>
              <span className="bg-amber-400 text-black font-extrabold text-[8px] px-1.5 py-0.5 rounded">
                DEMO
              </span>
            </div>
            <p className="text-[12px] text-gray-400 mt-0.5">
              {lang === "bn"
                ? "রুট স্ট্যাটাসের নমুনা — লাইভ ফিড নয়"
                : "Sample route status — not a live feed"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={alertsSearch}
                onChange={(e) => setAlertsSearch(e.target.value)}
                className={cn(
                  "pl-9 pr-4 py-1.5 rounded-full border text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500",
                  isDark
                    ? "bg-zinc-800 border-zinc-700 text-gray-200"
                    : "bg-white border-gray-300 text-gray-700",
                )}
              />
            </div>
            <select
              value={alertsFilter}
              onChange={(e) => setAlertsFilter(e.target.value)}
              className={cn(
                "px-3 py-1.5 rounded-full border text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500",
                isDark
                  ? "bg-zinc-800 border-zinc-700 text-gray-200"
                  : "bg-white border-gray-300 text-gray-700",
              )}
            >
              <option value="all">All</option>
              <option value="good">{t.goodService}</option>
              <option value="minor">{t.minorDelays}</option>
              <option value="major">{t.majorDelays}</option>
            </select>
          </div>
        </div>

        <div
          className={cn(
            "flex gap-4 mb-4 text-xs font-bold border-b pb-3",
            isDark ? "border-zinc-800" : "border-gray-50",
          )}
        >
          <span className="flex items-center gap-1.5">
            <StatusDot color="green" /> {t.goodService}
          </span>
          <span className="flex items-center gap-1.5">
            <StatusDot color="orange" /> {t.minorDelays}
          </span>
          <span className="flex items-center gap-1.5">
            <StatusDot color="red" /> {t.majorDelays}
          </span>
        </div>

        <div className="max-h-[600px] overflow-y-auto pr-2 divide-y divide-gray-50 dark:divide-zinc-800">
          {filtered.length > 0 ? (
            filtered.map((alert, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center py-3.5 hover:bg-gray-50/50 dark:hover:bg-zinc-800/10 transition-colors"
              >
                <span className="text-[13px] font-bold">{alert.name}</span>
                <StatusBadge status={alert.status} color={alert.color} className="text-[13px]" />
              </div>
            ))
          ) : (
            <EmptyState
              title="No routes match"
              message="Try a different search or filter."
              className="py-8"
            />
          )}
        </div>
      </div>

      <div
        className={cn(
          "mt-6 pt-4 border-t text-center",
          isDark ? "border-zinc-800" : "border-gray-50",
        )}
      >
        <p className="text-[11px] text-gray-400">
          {lang === "bn"
            ? "সব স্ট্যাটাস ডেমো নমুনা — কোনো লাইভ ট্রানজিট ফিড সংযুক্ত নেই।"
            : "All statuses are demo samples — no live transit feed is connected."}
        </p>
      </div>
    </div>
  );
}