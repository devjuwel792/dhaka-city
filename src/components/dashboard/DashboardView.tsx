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
  const { isDark, t, lang, widgets, setActiveTab, setShowCameraModal } = useApp();
  const anyWidget = Object.values(widgets).some(Boolean);

  if (!anyWidget) {
    return (
      <div
        className={cn(
          "max-w-lg mx-auto mt-10 rounded-2xl border p-8 text-center",
          isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200",
        )}
      >
        <h3 className="text-lg font-extrabold">
          {lang === "bn" ? "সব উইজেট লুকানো আছে" : "All widgets are hidden"}
        </h3>
        <p className="text-[12px] text-gray-400 mt-1">
          {lang === "bn"
            ? "সেটিংস থেকে অন্তত একটি উইজেট চালু করুন।"
            : "Enable at least one widget in Settings to see your dashboard."}
        </p>
        <button
          type="button"
          onClick={() => setActiveTab("settings")}
          className="mt-4 px-4 py-2 rounded-xl bg-emerald-500 text-white text-[12px] font-bold hover:bg-emerald-600"
        >
          {t.settings}
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <div className="xl:col-span-9 space-y-8">
        {widgets.weather && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <TodayWeatherCard variant="dashboard" className="md:col-span-5" />
              <ForecastCard className="md:col-span-7" />
            </div>

            <WeatherMeta className="-mt-4" />
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {widgets.map && <StreetMapWidget className="md:col-span-4" />}
          {widgets.airQuality && <AirPollutionCard className="md:col-span-4" />}
          {widgets.transit && <RidesCard className="md:col-span-4" />}
        </div>

        {widgets.transit && <TransportAlertsTable />}
      </div>

      <div className="xl:col-span-3 space-y-8">
        {widgets.news && <NewsWidget />}
        {widgets.traffic && <TrafficNowCard />}

        {widgets.cameras && (
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
        )}
      </div>
    </div>
  );
}