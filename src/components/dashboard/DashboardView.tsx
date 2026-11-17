"use client";

import { useApp } from "@/context/AppContext";
import { cameraFeeds } from "@/data/cameras";
import { TodayWeatherCard } from "@/components/weather/TodayWeatherCard";
import { ForecastCard } from "@/components/weather/ForecastCard";
import { WeatherMeta } from "@/components/weather/WeatherMeta";
import { StreetMapWidget } from "./StreetMapWidget";
import { AirPollutionCard } from "./AirPollutionCard";
import { RidesCard } from "./RidesCard";
import { TransportAlertsTable } from "./TransportAlertsTable";
import { NewsWidget } from "./NewsWidget";
import { TrafficNowCard } from "./TrafficNowCard";
import { CameraCard } from "@/components/cameras/CameraCard";
import { cn } from "@/utils/cn";

export function DashboardView() {
  const { isDark, t, setActiveTab, setShowCameraModal } = useApp();

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <div className="xl:col-span-9 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <TodayWeatherCard variant="dashboard" className="md:col-span-5" />
          <ForecastCard className="md:col-span-7" />
        </div>

        <WeatherMeta className="-mt-4" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <StreetMapWidget className="md:col-span-4" />
          <AirPollutionCard className="md:col-span-4" />
          <RidesCard className="md:col-span-4" />
        </div>

        <TransportAlertsTable />
      </div>

      <div className="xl:col-span-3 space-y-8">
        <NewsWidget />
        <TrafficNowCard />

        <div
          className={cn(
            "rounded-2xl border p-5 shadow-sm",
            isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200",
          )}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[14px] tracking-tight">{t.liveStreetCamera}</h3>
            <button
              onClick={() => setActiveTab("livestreet")}
              className="text-[11px] font-bold text-emerald-500 hover:underline"
            >
              {t.seeDetails}
            </button>
          </div>

          <div className="space-y-4">
            {cameraFeeds.map((feed) => (
              <CameraCard
                key={feed.id}
                feed={feed}
                onClick={() => setShowCameraModal(feed.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}