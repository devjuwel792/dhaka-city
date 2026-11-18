"use client";

import { useApp } from "@/context/AppContext";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { OfflineBanner } from "@/components/common/OfflineBanner";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { WeatherView } from "@/components/weather/WeatherView";
import { TransitView } from "@/components/transit/TransitView";
import { TrafficView } from "@/components/traffic/TrafficView";
import { LiveStreetView } from "@/components/cameras/LiveStreetView";
import { NewsView } from "@/components/news/NewsView";
import { SettingsView } from "@/components/settings/SettingsView";
import { SupportView } from "@/components/support/SupportView";
import { AboutView } from "@/components/about/AboutView";
import { MapModal } from "@/components/map/MapModal";
import { EmergencyModal } from "@/components/emergency/EmergencyModal";
import { CameraModal } from "@/components/cameras/CameraModal";
import { NewsModal } from "@/components/news/NewsModal";
import { cn } from "@/utils/cn";
import type { ViewId } from "@/types";

function renderView(activeTab: ViewId) {
  switch (activeTab) {
    case "dashboard":
      return <DashboardView />;
    case "weather":
      return <WeatherView />;
    case "transit":
      return <TransitView />;
    case "traffic":
      return <TrafficView />;
    case "livestreet":
      return <LiveStreetView />;
    case "news":
      return <NewsView />;
    case "settings":
      return <SettingsView />;
    case "support":
      return <SupportView />;
    case "about":
      return <AboutView />;
    default:
      return <DashboardView />;
  }
}

export function AppShell() {
  const { isDark, activeTab } = useApp();
  const online = useOnlineStatus();

  return (
    <div
      className={cn(
        "flex flex-col min-h-screen font-sans transition-colors duration-200",
        isDark ? "bg-[#121212] text-gray-100" : "bg-[#F4F6F8] text-gray-800",
      )}
    >
      {!online && <OfflineBanner />}

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:rounded-lg focus:bg-emerald-500 focus:px-4 focus:py-2 focus:text-white focus:font-bold"
      >
        Skip to main content
      </a>

      <div className="flex flex-row flex-1 min-h-0">
        <Sidebar />

        <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <Header />
          <div className="p-8 flex-1">{renderView(activeTab)}</div>
        </main>
      </div>

      {/* Modals (fixed overlays) */}
      <MapModal />
      <EmergencyModal />
      <CameraModal />
      <NewsModal />
    </div>
  );
}