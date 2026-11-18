"use client";

import { AlertTriangle } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { liveStreetFeeds } from "@/data/cameras";
import { CameraCard } from "./CameraCard";
import { cn } from "@/utils/cn";

export function LiveStreetView() {
  const { isDark, lang, t, setShowCameraModal } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-extrabold">{t.liveStreetCamera}</h3>
        <p className="text-[13px] text-gray-400 mt-0.5">
          {lang === "bn"
            ? "লাইসেন্সকৃত ডেমো স্ট্রিট ফুটেজ — লাইভ সিসিটিভি নয়"
            : "Licensed demo street footage — not live CCTV"}
        </p>
      </div>

      <div
        className={cn(
          "flex items-start gap-2 rounded-xl border px-4 py-3 text-[12px]",
          isDark
            ? "border-amber-900/40 bg-amber-950/20 text-amber-300"
            : "border-amber-200 bg-amber-50 text-amber-700",
        )}
      >
        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
        <span>
          {lang === "bn"
            ? "সব ভিডিও ডেমো ফুটেজ। এগুলো কোনো বাস্তব ক্যামেরা বা লাইভ ফিড নয়।"
            : "Every video below is demo footage. It is not a real camera or a live feed."}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {liveStreetFeeds.map((feed) => (
          <CameraCard
            key={feed.id}
            feed={feed}
            variant="large"
            onClick={() => setShowCameraModal(feed.id)}
          />
        ))}
      </div>
    </div>
  );
}