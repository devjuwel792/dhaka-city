"use client";

import { WifiOff } from "lucide-react";
import { cn } from "@/utils/cn";

interface OfflineBannerProps {
  message?: string;
  className?: string;
}

/** Banner shown when the browser goes offline. */
export function OfflineBanner({
  message = "You are offline. Showing last available data.",
  className,
}: OfflineBannerProps) {
  return (
    <div
      role="status"
      className={cn(
        "flex items-center justify-center gap-2 px-4 py-2 text-[12px] font-bold text-amber-700 bg-amber-50 border-b border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900",
        className,
      )}
    >
      <WifiOff className="w-4 h-4" />
      <span>{message}</span>
    </div>
  );
}