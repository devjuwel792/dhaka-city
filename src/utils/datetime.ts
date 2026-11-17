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

interface LocalIsoParts {
  y: number;
  m: number;
  d: number;
  hh: number;
  mm: number;
}

/** Parses Open-Meteo local ISO strings ("2026-11-17T14:00") without TZ shifting. */
function parseLocalIso(iso: string): LocalIsoParts {
  if (!iso) return { y: 0, m: 0, d: 0, hh: 0, mm: 0 };
  const [datePart, timePart = "00:00"] = iso.split("T");
  const [y, m, d] = datePart.split("-").map(Number);
  const [hh, mm] = timePart.split(":").map(Number);
  return { y, m, d, hh, mm };
}

function to12Hour(hh: number): { h12: number; ampm: string } {
  return { h12: hh % 12 === 0 ? 12 : hh % 12, ampm: hh < 12 ? "AM" : "PM" };
}

/** "14:00" -> "2 PM" (timezone-stable, no Date TZ shifting). */
export function formatHourLabel(iso: string): string {
  if (!iso) return "";
  const { hh } = parseLocalIso(iso);
  const { h12, ampm } = to12Hour(hh);
  return `${h12} ${ampm}`;
}

/** "06:35" -> "6:35 AM". */
export function formatTimeLabel(iso: string): string {
  if (!iso) return "";
  const { hh, mm } = parseLocalIso(iso);
  const { h12, ampm } = to12Hour(hh);
  return `${h12}:${String(mm).padStart(2, "0")} ${ampm}`;
}

const EN_WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const BN_WEEKDAYS = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহঃ", "শুক্র", "শনি"];

/** "2026-11-17" -> "Tue" / "মঙ্গল". */
export function formatWeekday(dateStr: string, lang: Lang): string {
  if (!dateStr) return "";
  const { y, m, d } = parseLocalIso(dateStr);
  if (!y) return "";
  const dayIndex = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return (lang === "en" ? EN_WEEKDAYS : BN_WEEKDAYS)[dayIndex] ?? "";
}