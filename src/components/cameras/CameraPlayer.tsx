"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, Loader2, Maximize2, Pause, Play } from "lucide-react";
import { cn } from "@/utils/cn";

interface CameraPlayerProps {
  src: string;
  poster: string;
  label: string;
  autoPlay?: boolean;
  controls?: boolean;
  preload?: "none" | "metadata" | "auto";
  className?: string;
}

type PlayerStatus = "loading" | "ready" | "error";

/**
 * Reusable local-demo video player. It never represents footage as live CCTV;
 * a permanent DEMO banner is always rendered over the video.
 */
export function CameraPlayer({
  src,
  poster,
  label,
  autoPlay = false,
  controls = true,
  preload = "none",
  className,
}: CameraPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<PlayerStatus>("loading");
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus("loading");
    setPlaying(false);
  }, [src]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().catch(() => setStatus("error"));
    } else {
      video.pause();
    }
  };

  const fullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void el.requestFullscreen?.();
    }
  };

  return (
    <div ref={containerRef} className={cn("relative w-full h-full bg-slate-900 overflow-hidden", className)}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload={preload}
        autoPlay={autoPlay}
        onLoadedData={() => setStatus("ready")}
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setStatus("error")}
        className="w-full h-full object-cover"
        aria-label={label}
      />

      <div className="absolute top-2 left-2 bg-amber-400 text-black font-extrabold text-[8px] sm:text-[9px] px-2 py-0.5 rounded shadow select-none">
        DEMO FOOTAGE — NOT LIVE CCTV
      </div>

      {status === "loading" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-950/50 text-white/80">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-[10px] font-bold">Loading demo video…</span>
        </div>
      )}

      {status === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-slate-950/90 p-4 text-center text-white">
          <AlertCircle className="w-6 h-6 text-amber-400" />
          <p className="text-[11px] font-extrabold">Demo video unavailable</p>
          <p className="text-[9px] text-white/60">
            Add licensed footage to <span className="font-mono">public/videos/</span>.
          </p>
        </div>
      )}

      {controls && (
        <div className="absolute bottom-2 right-2 flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause demo video" : "Play demo video"}
            className="p-1.5 rounded-lg bg-black/60 text-white hover:bg-black/80"
          >
            {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={fullscreen}
            aria-label="Toggle fullscreen video"
            className="p-1.5 rounded-lg bg-black/60 text-white hover:bg-black/80"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}