"use client";

import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

interface DataFreshnessProps {
  /** When the data was last refreshed. */
  updatedAt?: Date | number | string | null;
  /** Auto-refresh cadence in seconds (used when no updatedAt is given). */
  refreshRate?: number;
  className?: string;
}

function relativeLabel(seconds: number): string {
  if (seconds < 5) return "Just updated";
  if (seconds < 60) return `Updated ${seconds}s ago`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `Updated ${minutes}m ago`;
  return `Updated ${Math.round(minutes / 60)}h ago`;
}

/** Reusable data-freshness / last-updated indicator with a pulsing live dot. */
export function DataFreshness({ updatedAt, refreshRate, className }: DataFreshnessProps) {
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  let text: string;
  if (updatedAt != null) {
    const ts =
      updatedAt instanceof Date
        ? updatedAt.getTime()
        : typeof updatedAt === "string"
          ? new Date(updatedAt).getTime()
          : updatedAt;
    const seconds = Number.isFinite(ts) ? Math.max(0, Math.round((now - ts) / 1000)) : 0;
    text = relativeLabel(seconds);
  } else if (refreshRate != null) {
    text = `Auto-refresh: every ${refreshRate}s`;
  } else {
    text = "Live";
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-[10px] font-bold text-gray-400",
        className,
      )}
    >
      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      {text}
    </span>
  );
}