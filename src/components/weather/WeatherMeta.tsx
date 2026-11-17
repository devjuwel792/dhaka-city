"use client";

import { useApp } from "@/context/AppContext";
import { DataFreshness } from "@/components/common/DataFreshness";
import { cn } from "@/utils/cn";

/** Shows the weather source attribution, last-updated time, and stale-data warning. */
export function WeatherMeta({ className }: { className?: string }) {
  const { t, weather } = useApp();

  if (!weather.data) return null;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[10px] text-gray-400",
        className,
      )}
    >
      <DataFreshness updatedAt={weather.fetchedAt} />
      <span className="flex items-center gap-3">
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