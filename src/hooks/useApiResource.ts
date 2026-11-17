"use client";

import { useCallback, useEffect, useState, type DependencyList } from "react";
import type { ApiResponse } from "@/types/api";

export interface UseApiResourceResult<T> {
  response: ApiResponse<T> | null;
  loading: boolean;
  reload: () => void;
}

/**
 * Consumes an API `request` factory, wiring AbortController cancellation on
 * unmount / dependency change / reload. Never throws — inspect `response.error`.
 */
export function useApiResource<T>(
  factory: (signal: AbortSignal) => Promise<ApiResponse<T>>,
  deps: DependencyList,
): UseApiResourceResult<T> {
  const [response, setResponse] = useState<ApiResponse<T> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [reloadKey, setReloadKey] = useState<number>(0);

  useEffect(() => {
    const controller = new AbortController();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    factory(controller.signal)
      .then((res) => {
        if (!controller.signal.aborted) setResponse(res);
      })
      .catch(() => {
        /* request() resolves with an error envelope; this guards sync throws */
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, reloadKey]);

  const reload = useCallback(() => setReloadKey((key) => key + 1), []);

  return { response, loading, reload };
}