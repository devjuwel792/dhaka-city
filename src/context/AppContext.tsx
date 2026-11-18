"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Lang, TempUnit, ViewId, Translations, CitySnapshot } from "@/types";
import { translations } from "@/constants/translations";
import { APP_CONFIG } from "@/config";
import {
  resolveLocation,
  loadStoredLocationId,
  saveStoredLocationId,
  type CityLocation,
} from "@/config/locations";
import { useRefreshTrigger } from "@/hooks/useRefreshTrigger";
import { useCitySnapshot } from "@/hooks/useCitySnapshot";
import { useWeatherFeed, type WeatherState } from "@/hooks/useWeatherFeed";
import { useAirQualityFeed, type AirQualityState } from "@/hooks/useAirQualityFeed";
import {
  loadSettings,
  saveSettings,
  exportSettings as exportSettingsUtil,
  parseImportedSettings,
  clearAppStorage,
  validateSettings,
  DEFAULT_SETTINGS,
  DEFAULT_WIDGETS,
  type AppSettings,
  type WidgetVisibility,
} from "@/services/storage";
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
  /** Fully resolved metadata for the current selection (id, names, coords, area). */
  selectedLocation: CityLocation;
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

  // persisted advanced settings
  widgets: WidgetVisibility;
  setWidgets: (value: WidgetVisibility) => void;
  toggleWidget: (key: keyof WidgetVisibility) => void;
  mapLayer: string;
  setMapLayer: (id: string) => void;
  cameraAutoplay: boolean;
  setCameraAutoplay: (value: boolean) => void;
  resetSettings: () => void;
  applySettings: (settings: AppSettings) => void;
  exportSettingsJson: () => string;
  importSettingsJson: (json: string) => void;
  clearLocalData: () => void;

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
  airQuality: AirQualityState;

  // temperature helpers (unit-aware)
  formatTemp: (celsius: number) => string;
  formatTempFull: (celsius: number) => string;
  formatTempNum: (celsius: number) => string;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [isDark, setIsDark] = useState<boolean>(false);
  const [location, setLocationState] = useState<string>(APP_CONFIG.defaultLocation);
  const [tempUnit, setTempUnit] = useState<TempUnit>("C");
  const [refreshRate, setRefreshRate] = useState<number>(10);
  const [activeTab, setActiveTab] = useState<ViewId>(APP_CONFIG.defaultView);

  const [weatherAlerts, setWeatherAlerts] = useState<boolean>(true);
  const [preferredRoutes, setPreferredRoutes] = useState<boolean>(true);
  const [trafficAlerts, setTrafficAlerts] = useState<boolean>(true);
  const [congestionAlerts, setCongestionAlerts] = useState<boolean>(true);
  const [newsSources, setNewsSources] = useState<boolean>(true);
  const [widgets, setWidgets] = useState<WidgetVisibility>(DEFAULT_WIDGETS);
  const [mapLayer, setMapLayer] = useState<string>(DEFAULT_SETTINGS.mapLayer);
  const [cameraAutoplay, setCameraAutoplay] = useState<boolean>(true);
  const [hydrated, setHydrated] = useState<boolean>(false);

  const [showLocationDropdown, setShowLocationDropdown] = useState<boolean>(false);
  const [showMapModal, setShowMapModal] = useState<boolean>(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState<boolean>(false);
  const [showNotificationPanel, setShowNotificationPanel] = useState<boolean>(false);
  const [showCameraModal, setShowCameraModal] = useState<string | null>(null);
  const [showNewsModal, setShowNewsModal] = useState<number | null>(null);

  const refreshTrigger = useRefreshTrigger(refreshRate);
  const { data: snapshot } = useCitySnapshot(location, refreshTrigger);
  const weather = useWeatherFeed(location);
  const airQuality = useAirQualityFeed(location);

  const selectedLocation = useMemo(() => resolveLocation(location), [location]);

  // Hydrate every persisted setting after mount (avoids SSR hydration mismatch).
  useEffect(() => {
    const storedLocation = loadStoredLocationId();
    const saved = loadSettings();
    const locationId = storedLocation
      ? resolveLocation(storedLocation).id
      : resolveLocation(saved.location).id;

    /* eslint-disable react-hooks/set-state-in-effect */
    setLang(saved.lang);
    setIsDark(saved.theme === "dark");
    setTempUnit(saved.tempUnit);
    setRefreshRate(saved.refreshRate);
    setWeatherAlerts(saved.weatherAlerts);
    setTrafficAlerts(saved.trafficAlerts);
    setCongestionAlerts(saved.congestionAlerts);
    setPreferredRoutes(saved.preferredRoutes);
    setNewsSources(saved.newsSources);
    setWidgets(saved.widgets);
    setMapLayer(saved.mapLayer);
    setCameraAutoplay(saved.cameraAutoplay);
    setLocationState(locationId);
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Keep document language and color-scheme metadata in sync with the UI.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  }, [lang, isDark]);

  const setLocation = useCallback((next: string) => {
    const resolved = resolveLocation(next);
    setLocationState(resolved.id);
    saveStoredLocationId(resolved.id);
  }, []);

  const settings = useMemo<AppSettings>(
    () => ({
      theme: isDark ? "dark" : "light",
      lang,
      location,
      tempUnit,
      refreshRate,
      weatherAlerts,
      trafficAlerts,
      congestionAlerts,
      preferredRoutes,
      newsSources,
      widgets,
      mapLayer,
      cameraAutoplay,
    }),
    [
      isDark,
      lang,
      location,
      tempUnit,
      refreshRate,
      weatherAlerts,
      trafficAlerts,
      congestionAlerts,
      preferredRoutes,
      newsSources,
      widgets,
      mapLayer,
      cameraAutoplay,
    ],
  );

  useEffect(() => {
    if (hydrated) saveSettings(settings);
  }, [hydrated, settings]);

  const toggleWidget = useCallback((key: keyof WidgetVisibility) => {
    setWidgets((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const applySettings = useCallback((next: AppSettings) => {
    const safe = validateSettings(next);
    setLang(safe.lang);
    setIsDark(safe.theme === "dark");
    setTempUnit(safe.tempUnit);
    setRefreshRate(safe.refreshRate);
    setWeatherAlerts(safe.weatherAlerts);
    setTrafficAlerts(safe.trafficAlerts);
    setCongestionAlerts(safe.congestionAlerts);
    setPreferredRoutes(safe.preferredRoutes);
    setNewsSources(safe.newsSources);
    setWidgets(safe.widgets);
    setMapLayer(safe.mapLayer);
    setCameraAutoplay(safe.cameraAutoplay);
    const loc = resolveLocation(safe.location);
    setLocationState(loc.id);
    saveStoredLocationId(loc.id);
  }, []);

  const resetSettings = useCallback(() => applySettings(DEFAULT_SETTINGS), [applySettings]);

  const exportSettingsJson = useCallback(() => exportSettingsUtil(settings), [settings]);

  const importSettingsJson = useCallback(
    (json: string) => applySettings(parseImportedSettings(json)),
    [applySettings],
  );

  const clearLocalData = useCallback(() => {
    clearAppStorage();
    applySettings(DEFAULT_SETTINGS);
  }, [applySettings]);

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
      selectedLocation,
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
      widgets,
      setWidgets,
      toggleWidget,
      mapLayer,
      setMapLayer,
      cameraAutoplay,
      setCameraAutoplay,
      resetSettings,
      applySettings,
      exportSettingsJson,
      importSettingsJson,
      clearLocalData,
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
      airQuality,
      formatTemp: (celsius: number) => formatTempUtil(celsius, tempUnit),
      formatTempFull: (celsius: number) => formatTempFullUtil(celsius, tempUnit),
      formatTempNum: (celsius: number) => formatTempNumUtil(celsius, tempUnit),
    }),
    [
      lang,
      isDark,
      location,
      setLocation,
      selectedLocation,
      tempUnit,
      refreshRate,
      activeTab,
      weatherAlerts,
      preferredRoutes,
      trafficAlerts,
      congestionAlerts,
      newsSources,
      widgets,
      toggleWidget,
      mapLayer,
      cameraAutoplay,
      resetSettings,
      applySettings,
      exportSettingsJson,
      importSettingsJson,
      clearLocalData,
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
      airQuality,
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