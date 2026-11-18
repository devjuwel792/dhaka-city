"use client";

import { useEffect } from "react";
import { Video, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { CAMERA_FEEDS } from "@/data/cameras";
import { CameraPlayer } from "./CameraPlayer";

export function CameraModal() {
  const { showCameraModal, setShowCameraModal, lang, cameraAutoplay } = useApp();

  useEffect(() => {
    if (!showCameraModal) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowCameraModal(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showCameraModal, setShowCameraModal]);

  if (!showCameraModal) return null;

  const feed = CAMERA_FEEDS.find((f) => f.id === showCameraModal);
  if (!feed) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 transition-all"
      onClick={() => setShowCameraModal(null)}
      role="dialog"
      aria-modal="true"
      aria-label={`${feed.name} demo video`}
    >
      <div
        className="w-full max-w-3xl bg-[#0F172A] rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-[#1E293B]">
          <div className="flex items-center gap-2.5 min-w-0">
            <Video className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="min-w-0">
              <h3 className="font-bold text-sm truncate">{feed.name}</h3>
              <p className="text-[10px] text-gray-400 truncate">{feed.location}</p>
            </div>
          </div>
          <button
            onClick={() => setShowCameraModal(null)}
            aria-label="Close video"
            className="p-1.5 rounded-full hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="aspect-video bg-black relative">
          <CameraPlayer
            src={feed.videoSrc}
            poster={feed.poster}
            label={`${feed.name} demo footage`}
            autoPlay={cameraAutoplay}
            controls
            preload="metadata"
          />
        </div>

        <div className="p-4 bg-[#1E293B] flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-400">
          <span className="font-bold text-amber-400">
            {lang === "bn" ? "ডেমো ফুটেজ — লাইভ সিসিটিভি নয়" : "Demo footage — not live CCTV"}
          </span>
          <span>Local licensed demo video</span>
        </div>
      </div>
    </div>
  );
}