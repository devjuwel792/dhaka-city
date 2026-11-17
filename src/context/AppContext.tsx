"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Lang, TempUnit, ViewId, Translations, CitySnapshot } from "@/types";
import { translations } from "@/constants/translations";
import { APP_CONFIG } from "@/config";
import { useRefreshTrigger } from "@/hooks/useRefreshTrigger";
import { useCitySnapshot } from "@/hooks/useCitySnapshot";
import { useWeatherFeed, type WeatherState } from "@/hooks/useWeatherFeed";
import {
  formatTemp as formatTempUtil,
  formatTempFull as formatTempFullUtil,
  formatTempNum as formatTempNumUtil,
} from "@/utils/temperature";

interface AppContextValue {
  // preferences
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  toggleTheme: () => void;
  location: string;
  setLocation: (location: string) => void;
  tempUnit: TempUnit;
  setTempUnit: (unit: TempUnit) => void;
  refreshRate: number;
  setRefreshRate: (rate: number) => void;
  activeTab: ViewId;
  setActiveTab: (tab: ViewId) => void;

  // alert settings
  weatherAlerts: boolean;
  setWeatherAlerts: (value: boolean) => void;
  preferredRoutes: boolean;
  setPreferredRoutes: (value: boolean) => void;
  trafficAlerts: boolean;
  setTrafficAlerts: (value: boolean) => void;
  congestionAlerts: boolean;
  setCongestionAlerts: (value: boolean) => void;
  newsSources: boolean;
  setNewsSources: (value: boolean) => void;

  // UI overlays
  showLocationDropdown: boolean;
  setShowLocationDropdown: (value: boolean) => void;
  showMapModal: boolean;
  setShowMapModal: (value: boolean) => void;
  showEmergencyModal: boolean;
  setShowEmergencyModal: (value: boolean) => void;
  showNotificationPanel: boolean;
  setShowNotificationPanel: (value: boolean) => void;
  showCameraModal: string | null;
  setShowCameraModal: (value: string | null) => void;
  showNewsModal: number | null;
  setShowNewsModal: (value: number | null) => void;

  // derived
  t: Translations;
  snapshot: CitySnapshot;
  refreshTrigger: number;
  weather: WeatherState;

  // temperature helpers (unit-aware)
  formatTemp: (celsius: number) => string;
  formatTempFull: (celsius: number) => string;
  formatTempNum: (celsius: number) => string;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [isDark, setIsDark] = useState<boolean>(false);
  const [location, setLocation] = useState<string>(APP_CONFIG.defaultLocation);
  const [tempUnit, setTempUnit] = useState<TempUnit>("C");
  const [refreshRate, setRefreshRate] = useState<number>(10);
  const [activeTab, setActiveTab] = useState<ViewId>(APP_CONFIG.defaultView);

  const [weatherAlerts, setWeatherAlerts] = useState<boolean>(true);
  const [preferredRoutes, setPreferredRoutes] = useState<boolean>(true);
  const [trafficAlerts, setTrafficAlerts] = useState<boolean>(true);
  const [congestionAlerts, setCongestionAlerts] = useState<boolean>(true);
  const [newsSources, setNewsSources] = useState<boolean>(true);

  const [showLocationDropdown, setShowLocationDropdown] = useState<boolean>(false);
  const [showMapModal, setShowMapModal] = useState<boolean>(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState<boolean>(false);
  const [showNotificationPanel, setShowNotificationPanel] = useState<boolean>(false);
  const [showCameraModal, setShowCameraModal] = useState<string | null>(null);
  const [showNewsModal, setShowNewsModal] = useState<number | null>(null);

  const refreshTrigger = useRefreshTrigger(refreshRate);
  const { data: snapshot } = useCitySnapshot(location, refreshTrigger);
  const weather = useWeatherFeed(location);

  const t = translations[lang];

  const value = useMemo<AppContextValue>(
    () => ({
      lang,
      setLang,
      toggleLang: () => setLang((prev) => (prev === "en" ? "bn" : "en")),
      isDark,
      setIsDark,
      toggleTheme: () => setIsDark((prev) => !prev),
      location,
      setLocation,
      tempUnit,
      setTempUnit,
      refreshRate,
      setRefreshRate,
      activeTab,
      setActiveTab,
      weatherAlerts,
      setWeatherAlerts,
      preferredRoutes,
      setPreferredRoutes,
      trafficAlerts,
      setTrafficAlerts,
      congestionAlerts,
      setCongestionAlerts,
      newsSources,
      setNewsSources,
      showLocationDropdown,
      setShowLocationDropdown,
      showMapModal,
      setShowMapModal,
      showEmergencyModal,
      setShowEmergencyModal,
      showNotificationPanel,
      setShowNotificationPanel,
      showCameraModal,
      setShowCameraModal,
      showNewsModal,
      setShowNewsModal,
      t,
      snapshot,
      refreshTrigger,
      weather,
      formatTemp: (celsius: number) => formatTempUtil(celsius, tempUnit),
      formatTempFull: (celsius: number) => formatTempFullUtil(celsius, tempUnit),
      formatTempNum: (celsius: number) => formatTempNumUtil(celsius, tempUnit),
    }),
    [
      lang,
      isDark,
      location,
      tempUnit,
      refreshRate,
      activeTab,
      weatherAlerts,
      preferredRoutes,
      trafficAlerts,
      congestionAlerts,
      newsSources,
      showLocationDropdown,
      showMapModal,
      showEmergencyModal,
      showNotificationPanel,
      showCameraModal,
      showNewsModal,
      t,
      snapshot,
      refreshTrigger,
      weather,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return ctx;
}