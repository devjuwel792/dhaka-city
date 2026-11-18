"use client";

import { useMemo, useState } from "react";
import { AlertCircle, AlertTriangle, BellOff, CheckCheck, Trash2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useNotifications } from "@/hooks/useNotifications";
import { formatRelativeTime } from "@/utils/datetime";
import { cn } from "@/utils/cn";

type Filter = "all" | "unread";

export function NotificationPanel() {
  const { isDark, t, lang } = useApp();
  const { items, unreadCount, markRead, markAllRead, remove } = useNotifications();
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () => (filter === "unread" ? items.filter((item) => !item.read) : items),
    [items, filter],
  );

  return (
    <div
      className={cn(
        "absolute right-0 mt-2 w-80 rounded-xl shadow-lg border overflow-hidden z-30 animate-in fade-in-50 slide-in-from-top-1",
        isDark ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-100",
      )}
      role="region"
      aria-label={t.notificationsTitle}
    >
      <div
        className={cn(
          "p-4 border-b",
          isDark ? "border-zinc-700" : "border-gray-50",
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-bold text-[14px]">{t.notificationsTitle}</h3>
          <span
            className={cn(
              "text-[10px] font-bold px-2 py-0.5 rounded-full",
              unreadCount > 0
                ? "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300"
                : "bg-gray-100 text-gray-500 dark:bg-zinc-700 dark:text-gray-300",
            )}
          >
            {unreadCount > 0
              ? `${unreadCount} ${lang === "bn" ? "অপঠিত" : "unread"}`
              : lang === "bn"
                ? "সব পড়া হয়েছে"
                : "All read"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 mt-2.5">
          <div className="flex gap-1" role="tablist" aria-label="Notification filters">
            {(["all", "unread"] as const).map((value) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={filter === value}
                onClick={() => setFilter(value)}
                className={cn(
                  "px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors",
                  filter === value
                    ? "bg-emerald-500 text-white"
                    : isDark
                      ? "text-gray-300 hover:bg-zinc-700"
                      : "text-gray-600 hover:bg-gray-100",
                )}
              >
                {value === "all"
                  ? lang === "bn"
                    ? "সব"
                    : "All"
                  : lang === "bn"
                    ? "অপঠিত"
                    : "Unread"}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={markAllRead}
            disabled={unreadCount === 0}
            className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            {lang === "bn" ? "সব পড়া" : "Mark all read"}
          </button>
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 dark:divide-zinc-700">
        {visible.length === 0 ? (
          <div className="p-6 text-center">
            <BellOff className="w-6 h-6 mx-auto text-gray-300" />
            <p className="text-[12px] font-bold mt-2">{t.noNotifications}</p>
            <p className="text-[10px] text-gray-400 mt-1">
              {lang === "bn"
                ? "সব বিজ্ঞপ্তি পড়া হয়েছে বা মুছে ফেলা হয়েছে।"
                : "No alerts to show. Read or deleted items are gone."}
            </p>
          </div>
        ) : (
          visible.map((item) => (
            <div
              key={item.id}
              className={cn(
                "p-4 flex gap-3 transition-colors",
                !item.read && (isDark ? "bg-zinc-700/20" : "bg-emerald-50/40"),
              )}
            >
              <div className="mt-0.5 shrink-0">
                {item.level === "high" ? (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-[13px] font-bold flex items-center gap-1.5">
                    {!item.read && (
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"
                        aria-label={lang === "bn" ? "অপঠিত" : "Unread"}
                      />
                    )}
                    <span>{item.title}</span>
                  </h4>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className={cn("text-[10px]", isDark ? "text-zinc-500" : "text-gray-400")}>
                      {formatRelativeTime(item.createdAt, lang)}
                    </span>
                    <button
                      type="button"
                      onClick={() => remove(item.id)}
                      aria-label={
                        lang === "bn" ? `${item.title} মুছুন` : `Delete notification: ${item.title}`
                      }
                      className="p-1 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p
                  className={cn(
                    "text-[12px] mt-0.5 leading-4",
                    isDark ? "text-gray-400" : "text-gray-500",
                  )}
                >
                  {item.text}
                </p>
                {!item.read && (
                  <button
                    type="button"
                    onClick={() => markRead(item.id)}
                    className="mt-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400"
                  >
                    {lang === "bn" ? "পড়া হয়েছে হিসেবে চিহ্নিত করুন" : "Mark as read"}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div
        className={cn(
          "px-4 py-2.5 border-t text-[10px] text-gray-400",
          isDark ? "border-zinc-700" : "border-gray-50",
        )}
      >
        {lang === "bn"
          ? "ডেমো বিজ্ঞপ্তি — লাইভ জরুরি সতর্কতা নয়"
          : "Demo alerts — not live emergency notifications"}
      </div>
    </div>
  );
}