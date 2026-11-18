import { useEffect, useState } from "react";
import type { Lang } from "@/types";
import { formatClock, type ClockValue } from "@/utils/datetime";

/** Live ticking clock, locale-aware, updates every second. */
export function useClock(lang: Lang): ClockValue {
  // Empty on the server/first render so SSR and hydration cannot disagree.
  const [value, setValue] = useState<ClockValue>({ time: "", date: "" });

  useEffect(() => {
    const update = () => setValue(formatClock(new Date(), lang));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [lang]);

  return value;
}