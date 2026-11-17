"use client";

import { useApp } from "@/context/AppContext";
import { liveStreetFeeds } from "@/data/cameras";
import { CameraCard } from "./CameraCard";

export function LiveStreetView() {
  const { t, setShowCameraModal } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-extrabold">{t.liveStreetCamera}</h3>
        <p className="text-[13px] text-gray-400 mt-0.5">
          Real-time surveillance cameras for major road intersections
        </p>
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