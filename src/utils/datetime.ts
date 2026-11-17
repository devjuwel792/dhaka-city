import type { Lang } from "@/types";

export interface ClockValue {
  time: string;
  date: string;
}

export function formatClock(now: Date, lang: Lang): ClockValue {
  const locale = lang === "en" ? "en-US" : "bn-BD";
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return {
    date: now.toLocaleDateString(locale, dateOptions),
    time: now.toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  };
}