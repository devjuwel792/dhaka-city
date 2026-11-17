import { useEffect, useState } from "react";

/** Increments a counter on the given interval (seconds). Resets on rate change. */
export function useRefreshTrigger(refreshRate: number): number {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((v) => v + 1), refreshRate * 1000);
    return () => clearInterval(id);
  }, [refreshRate]);

  return tick;
}