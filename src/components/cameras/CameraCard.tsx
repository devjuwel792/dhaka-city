"use client";

import { Maximize2, Video } from "lucide-react";
import type { CameraFeed } from "@/types";
import { useApp } from "@/context/AppContext";
import { CctvCanvas } from "./CctvCanvas";
import { cn } from "@/utils/cn";

interface CameraCardProps {
  feed: CameraFeed;
  variant?: "small" | "large";
  onClick: () => void;
}

/** Clickable CCTV feed card (dashboard thumbnail or full live-street tile). */
export function CameraCard({ feed, variant = "small", onClick }: CameraCardProps) {
  const { isDark, t } = useApp();
  const large = variant === "large";

  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-2xl overflow-hidden border hover:border-emerald-500 transition-all cursor-pointer group",
        isDark ? "border-zinc-800 bg-[#1E1E1E]" : "border-gray-200 bg-white",
        !large && (isDark ? "border-zinc-800 bg-zinc-800/20" : "border-gray-100 bg-gray-50/20"),
      )}
    >
      <div className={cn("w-full bg-slate-900 overflow-hidden relative", large ? "h-48" : "h-32")}>
        <CctvCanvas
          feedId={feed.id}
          width={large ? 400 : 300}
          height={large ? 192 : 128}
          className="object-cover"
        />

        <div
          className={cn(
            "absolute bg-red-600 text-white font-extrabold rounded flex items-center gap-1 shadow select-none",
            large ? "top-3 left-3 text-[9px] px-2 py-0.5" : "top-2 left-2 text-[8px] px-1.5 py-0.5",
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          <span>{t.liveLabel}</span>
        </div>

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/50 text-white transform scale-90 group-hover:scale-100 transition-transform">
            <Maximize2 className={large ? "w-8 h-8" : "w-6 h-6"} />
          </div>
        </div>
      </div>

      <div
        className={cn(
          "bg-white dark:bg-[#1E1E1E] flex items-center justify-between",
          large ? "p-4" : "p-3",
        )}
      >
        <span className={cn("font-bold", large ? "text-[14px]" : "text-[12px]")}>{feed.name}</span>
        <Video className={cn("text-emerald-500", large ? "w-5 h-5" : "w-4 h-4")} />
      </div>
    </div>
  );
}