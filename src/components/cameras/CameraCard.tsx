"use client";

import { Maximize2, Video } from "lucide-react";
import type { CameraFeedConfig } from "@/data/cameras";
import { useApp } from "@/context/AppContext";
import { CameraPlayer } from "./CameraPlayer";
import { cn } from "@/utils/cn";

interface CameraCardProps {
  feed: CameraFeedConfig;
  variant?: "small" | "large";
  onClick: () => void;
}

/** Clickable demo-footage card (dashboard thumbnail or full Live Street tile). */
export function CameraCard({ feed, variant = "small", onClick }: CameraCardProps) {
  const { isDark, lang } = useApp();
  const large = variant === "large";

  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open ${feed.name} demo video`}
      className={cn(
        "rounded-2xl overflow-hidden border hover:border-emerald-500 transition-all cursor-pointer group focus-visible:outline-2 focus-visible:outline-emerald-500",
        isDark ? "border-zinc-800 bg-[#1E1E1E]" : "border-gray-200 bg-white",
        !large && (isDark ? "border-zinc-800 bg-zinc-800/20" : "border-gray-100 bg-gray-50/20"),
      )}
    >
      <div className={cn("w-full bg-slate-900 overflow-hidden relative", large ? "h-48" : "h-32")}>
        <CameraPlayer
          src={feed.videoSrc}
          poster={feed.poster}
          label={`${feed.name} demo footage`}
          autoPlay={false}
          controls={false}
          preload="none"
        />

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/50 text-white transform scale-90 group-hover:scale-100 transition-transform">
            <Maximize2 className={large ? "w-8 h-8" : "w-6 h-6"} />
          </div>
        </div>
      </div>

      <div
        className={cn(
          "bg-white dark:bg-[#1E1E1E] flex items-center justify-between gap-2",
          large ? "p-4" : "p-3",
        )}
      >
        <div className="min-w-0">
          <span className={cn("font-bold block truncate", large ? "text-[14px]" : "text-[12px]")}>
            {feed.name}
          </span>
          <span className="text-[9px] text-gray-400 block truncate">
            {lang === "bn" ? "ডেমো ফুটেজ" : "Demo footage"} · {feed.location}
          </span>
        </div>
        <Video className={cn("text-emerald-500 shrink-0", large ? "w-5 h-5" : "w-4 h-4")} />
      </div>
    </div>
  );
}