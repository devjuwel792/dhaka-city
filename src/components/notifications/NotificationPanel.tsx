"use client";

import { AlertCircle, AlertTriangle } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useNotifications } from "@/hooks/useNotifications";
import { cn } from "@/utils/cn";

export function NotificationPanel() {
  const { isDark, t } = useApp();
  const { data: items } = useNotifications();

  return (
    <div
      className={cn(
        "absolute right-0 mt-2 w-80 rounded-xl shadow-lg border overflow-hidden z-30 animate-in fade-in-50 slide-in-from-top-1",
        isDark ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-100",
      )}
    >
      <div
        className={cn(
          "p-4 border-b flex items-center justify-between",
          isDark ? "border-zinc-700" : "border-gray-50",
        )}
      >
        <h3 className="font-bold text-[14px]">{t.notificationsTitle}</h3>
        <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">
          {items.length} Alerts
        </span>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-zinc-700">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-4 transition-colors hover:bg-gray-50 dark:hover:bg-zinc-700/30 flex gap-3"
          >
            <div className="mt-0.5">
              {item.level === "high" ? (
                <AlertCircle className="w-5 h-5 text-red-500" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-orange-400" />
              )}
            </div>
            <div className="flex-1">
              <h4 className="text-[13px] font-bold flex justify-between">
                <span>{item.title}</span>
                <span
                  className={cn(
                    "text-[10px] font-normal",
                    isDark ? "text-zinc-500" : "text-gray-400",
                  )}
                >
                  {item.time}
                </span>
              </h4>
              <p className={cn("text-[12px] mt-0.5 leading-4", isDark ? "text-gray-400" : "text-gray-500")}>
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}