"use client";

import { useApp } from "@/context/AppContext";
import { DataFreshness } from "@/components/common/DataFreshness";
import { DataSourceBadge } from "@/components/common/DataSourceBadge";
import { computeDataStatus } from "@/services/dataSources";
import { cn } from "@/utils/cn";

/** Shows the weather source attribution, last-updated time, and stale-data warning. */
export function WeatherMeta({ className }: { className?: string }) {
  const { t, weather } = useApp();

  if (!weather.data) return null;

  const status = computeDataStatus({
    sourceId: "open-meteo-weather",
    fetchedAt: weather.fetchedAt,
    isCached: weather.isCached,
    isDemo: weather.isDemo,
    hasError: Boolean(weather.error),
  });

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[10px] text-gray-400",
        className,
      )}
    >
      <DataFreshness updatedAt={weather.fetchedAt} />
      <span className="flex items-center gap-2">
        <DataSourceBadge status={status} />
        {weather.error && <span className="text-amber-500 font-semibold">{t.weatherError}</span>}
        {weather.source?.attribution && (
          <span className="truncate">
            {t.source}: {weather.source.attribution}
          </span>
        )}
      </span>
    </div>
  );
}