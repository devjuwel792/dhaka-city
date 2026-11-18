"use client";

import { useCallback, useEffect, useState } from "react";
import type { ApiErrorInfo, ApiSource } from "@/types/api";
import type { NewsSearchBundle } from "@/services/api";
import { getNewsSearch, NEWS_REFRESH_MS } from "@/services/api";

export interface NewsFeedState {
  data: NewsSearchBundle | null;
  loading: boolean;
  error: ApiErrorInfo | null;
  fetchedAt: string | null;
  source: ApiSource | null;
  isCached: boolean;
  reload: () => void;
}

interface RawNews {
  query: string;
  data: NewsSearchBundle;
  fetchedAt: string | null;
  source: ApiSource | null;
  isCached: boolean;
}

/**
 * Fetches Dhaka news through GDELT for the given query.
 * - Keeps previous results for the same query on a failed refresh.
 * - Discards results from a different query so stale topics never render.
 * - Aborts in-flight requests on query change / unmount.
 */
export function useNewsFeed(query: string): NewsFeedState {
  const [raw, setRaw] = useState<RawNews | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiErrorInfo | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  const load = useCallback(
    (signal: AbortSignal) => {
      if (!query.trim()) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);

      getNewsSearch(query, { signal })
        .then((res) => {
          if (signal.aborted) return;
          if (res.data) {
            setRaw({
              query,
              data: res.data,
              fetchedAt: res.fetchedAt,
              source: res.source,
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
    [query],
  );

  useEffect(() => {
    const controller = new AbortController();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load(controller.signal);
    const interval = setInterval(() => load(controller.signal), NEWS_REFRESH_MS);
    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, [load, reloadToken]);

  const isCurrent = raw !== null && raw.query === query;

  return {
    data: isCurrent ? raw!.data : null,
    loading,
    error,
    fetchedAt: isCurrent ? raw!.fetchedAt : null,
    source: isCurrent ? raw!.source : null,
    isCached: isCurrent ? raw!.isCached : false,
    reload: () => setReloadToken((n) => n + 1),
  };
}