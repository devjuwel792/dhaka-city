import { useEffect, useState } from "react";
import type { Lang } from "@/types";
import { formatClock, type ClockValue } from "@/utils/datetime";

/** Live ticking clock, locale-aware, updates every second. */
export function useClock(lang: Lang): ClockValue {
  const [value, setValue] = useState<ClockValue>(() => formatClock(new Date(), lang));

  useEffect(() => {
    const update = () => setValue(formatClock(new Date(), lang));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [lang]);

  return value;
}