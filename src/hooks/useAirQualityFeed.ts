"use client";

import { useCallback, useEffect, useState } from "react";
import type { ApiErrorInfo, ApiSource } from "@/types/api";
import type { AirQualityBundle } from "@/services/api";
import { getAirQualityBundle, AIR_QUALITY_REFRESH_MS } from "@/services/api";
import { getLocationCoords } from "@/config/locations";

export interface AirQualityState {
  data: AirQualityBundle | null;
  loading: boolean;
  error: ApiErrorInfo | null;
  fetchedAt: string | null;
  source: ApiSource | null;
  isDemo: boolean;
  isCached: boolean;
}

interface RawAirQuality {
  loc: string;
  data: AirQualityBundle;
  fetchedAt: string | null;
  source: ApiSource | null;
  isDemo: boolean;
  isCached: boolean;
}

/**
 * Fetches Open-Meteo/CAMS air quality for a location, refreshing on an interval.
 * - Preserves the previous valid payload when a refresh fails (same location).
 * - Avoids showing another location's data after a location switch.
 * - Aborts in-flight requests on unmount / location change.
 * Never fabricates pollutant values: missing fields are `null` in the payload.
 */
export function useAirQualityFeed(location: string): AirQualityState {
  const [raw, setRaw] = useState<RawAirQuality | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiErrorInfo | null>(null);

  const load = useCallback(
    (signal: AbortSignal) => {
      const { lat, lon } = getLocationCoords(location);
      setLoading(true);
      setError(null);

      getAirQualityBundle(lat, lon, { signal })
        .then((res) => {
          if (signal.aborted) return;
          if (res.data) {
            setRaw({
              loc: location,
              data: res.data,
              fetchedAt: res.fetchedAt,
              source: res.source,
              isDemo: res.isDemo,
              isCached: res.isCached,
            });
          }
          setError(res.error);
        })
        .catch(() => {
          if (!signal.aborted) {
            setError({ type: "network", message: "Unexpected error", retryable: true });
          }
        })
        .finally(() => {
          if (!signal.aborted) setLoading(false);
        });
    },
    [location],
  );

  useEffect(() => {
    const controller = new AbortController();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load(controller.signal);
    const interval = setInterval(() => load(controller.signal), AIR_QUALITY_REFRESH_MS);
    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, [load]);

  const isCurrent = raw !== null && raw.loc === location;

  return {
    data: isCurrent ? raw!.data : null,
    loading,
    error,
    fetchedAt: isCurrent ? raw!.fetchedAt : null,
    source: isCurrent ? raw!.source : null,
    isDemo: isCurrent ? raw!.isDemo : false,
    isCached: isCurrent ? raw!.isCached : false,
  };
}