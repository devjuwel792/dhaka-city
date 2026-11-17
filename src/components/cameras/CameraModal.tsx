"use client";

import { Video, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { cameraFeeds } from "@/data/cameras";
import { CctvCanvas } from "./CctvCanvas";

export function CameraModal() {
  const { showCameraModal, setShowCameraModal, t } = useApp();

  if (!showCameraModal) return null;

  const feed = cameraFeeds.find((f) => f.id === showCameraModal);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 transition-all">
      <div className="w-full max-w-3xl bg-[#0F172A] rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 text-white">
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-[#1E293B]">
          <div className="flex items-center gap-2.5">
            <Video className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm">{feed?.name ?? "Live Stream CCTV"}</h3>
          </div>
          <button
            onClick={() => setShowCameraModal(null)}
            className="p-1.5 rounded-full hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="aspect-video bg-black relative flex items-center justify-center">
          <CctvCanvas
            feedId={showCameraModal}
            width={640}
            height={360}
            className="object-contain"
          />
          <div className="absolute top-4 left-4 bg-red-600 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded flex items-center gap-1 shadow-md">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>{t.liveLabel}</span>
          </div>
        </div>

        <div className="p-4 bg-[#1E293B] flex items-center justify-between text-xs text-gray-400">
          <span>Intersections Traffic Control Hub</span>
          <span>Codec: H.264 • Bitrate: 4.8 Mbps</span>
        </div>
      </div>
    </div>
  );
}