import { useEffect, useRef, useState, type DependencyList } from "react";

export interface AsyncState<T> {
  data: T;
  loading: boolean;
  error: Error | null;
}

/**
 * Runs an async fetcher, keeping the previous data while re-fetching so the UI
 * never flashes empty. `initialData` seeds the first render.
 */
export function useAsyncData<T>(
  fetcher: () => Promise<T>,
  initialData: T,
  deps: DependencyList,
): AsyncState<T> {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    fetcherRef
      .current()
      .then((result) => {
        if (active) setData(result);
      })
      .catch((err: unknown) => {
        if (active) setError(err instanceof Error ? err : new Error(String(err)));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}