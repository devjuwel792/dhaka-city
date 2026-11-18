"use client";

import { useApp } from "@/context/AppContext";
import { DataFreshness } from "@/components/common/DataFreshness";
import { DataSourceBadge } from "@/components/common/DataSourceBadge";
import { computeDataStatus } from "@/services/dataSources";
import { cn } from "@/utils/cn";

/** Air-quality source attribution, last-updated time and stale-data warning. */
export function AirQualityMeta({ className }: { className?: string }) {
  const { t, airQuality } = useApp();

  if (!airQuality.data) return null;

  const status = computeDataStatus({
    sourceId: "open-meteo-air-quality",
    fetchedAt: airQuality.fetchedAt,
    isCached: airQuality.isCached,
    isDemo: airQuality.isDemo,
    hasError: Boolean(airQuality.error),
  });

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[10px] text-gray-400",
        className,
      )}
    >
      <DataFreshness updatedAt={airQuality.fetchedAt} />
      <span className="flex items-center gap-2">
        <DataSourceBadge status={status} />
        {airQuality.error && (
          <span className="text-amber-500 font-semibold">{t.aqiStale}</span>
        )}
        <span className="shrink-0 px-1.5 py-0.5 rounded bg-sky-50 text-sky-600 dark:bg-sky-950/30 dark:text-sky-300 font-bold">
          {t.aqiModelBadge}
        </span>
        {airQuality.source?.attribution && (
          <span className="truncate">
            {t.source}: {airQuality.source.attribution}
          </span>
        )}
      </span>
    </div>
  );
}