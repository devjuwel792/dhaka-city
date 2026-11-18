"use client";

import { ArrowRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { transportAlertsList } from "@/data/transit";
import { StatusBadge } from "@/components/common/StatusBadge";
import { cn } from "@/utils/cn";

export function TransportAlertsTable() {
  const { isDark, t, setActiveTab } = useApp();

  return (
    <div
      className={cn(
        "rounded-2xl border p-6 shadow-sm",
        isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200",
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-[15px] tracking-tight">{t.transportAlerts}</h3>
          <span className="bg-amber-400 text-black font-extrabold text-[8px] px-1.5 py-0.5 rounded">
            DEMO
          </span>
        </div>
        <button
          onClick={() => setActiveTab("transit")}
          className="text-[12px] text-emerald-500 font-bold hover:underline flex items-center gap-1"
        >
          <span>{t.seeDetails}</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr
              className={cn(
                "border-b font-bold",
                isDark ? "border-zinc-800 text-zinc-500" : "border-gray-100 text-gray-400",
              )}
            >
              <th className="pb-3 pr-4">Name</th>
              <th className="pb-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-zinc-800">
            {transportAlertsList.slice(0, 5).map((alert, i) => (
              <tr
                key={i}
                className="hover:bg-gray-50/50 dark:hover:bg-zinc-800/20 transition-colors"
              >
                <td className="py-3 font-semibold pr-4">{alert.name}</td>
                <td className="py-3 text-right">
                  <StatusBadge status={alert.status} color={alert.color} className="text-[13px]" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}