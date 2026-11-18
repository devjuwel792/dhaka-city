import type { DataStatus } from "@/services/dataSources";
import { cn } from "@/utils/cn";

const STYLES: Record<DataStatus, string> = {
  LIVE: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300",
  CACHED: "bg-sky-50 text-sky-700 dark:bg-sky-950/30 dark:text-sky-300",
  STALE: "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300",
  DEMO: "bg-violet-50 text-violet-700 dark:bg-violet-950/30 dark:text-violet-300",
  UNAVAILABLE: "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300",
};

const LABELS: Record<DataStatus, string> = {
  LIVE: "Live",
  CACHED: "Cached",
  STALE: "Stale",
  DEMO: "Demo",
  UNAVAILABLE: "Unavailable",
};

/** Compact reliability badge: LIVE / CACHED / STALE / DEMO / UNAVAILABLE. */
export function DataSourceBadge({
  status,
  className,
}: {
  status: DataStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wide",
        STYLES[status],
        className,
      )}
      title={`Data status: ${LABELS[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}