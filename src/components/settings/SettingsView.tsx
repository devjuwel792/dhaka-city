"use client";

import { Settings as SettingsIcon } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { APP_CONFIG } from "@/config";
import { ToggleSwitch } from "@/components/common/ToggleSwitch";
import { cn } from "@/utils/cn";

const cardClass = "rounded-2xl border p-6 shadow-sm space-y-5";
const cardCn = (isDark: boolean) =>
  cn(cardClass, isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200");
const sectionTitle = "font-bold text-[15px] tracking-tight border-b pb-3 border-gray-100 dark:border-zinc-800";
const labelText = "font-semibold text-[14px]";
const hintText = "text-[12px] mt-0.5 text-gray-400";
const segmentBase = "flex rounded-lg border overflow-hidden border-gray-200 dark:border-zinc-700";

export function SettingsView() {
  const {
    isDark,
    t,
    tempUnit,
    setTempUnit,
    refreshRate,
    setRefreshRate,
    setIsDark,
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
  } = useApp();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <SettingsIcon
          className="w-7 h-7 text-indigo-500 animate-spin"
          style={{ animationDuration: "8s" }}
        />
        <h2 className="text-2xl font-extrabold tracking-tight">{t.settings}</h2>
      </div>

      {/* General */}
      <div className={cardCn(isDark)}>
        <h3 className={sectionTitle}>{t.settingsGeneral}</h3>

        <div className="flex items-center justify-between">
          <div>
            <p className={labelText}>{t.settingsUnits}</p>
            <p className={hintText}>Currently showing: °{tempUnit}</p>
          </div>
          <div className={segmentBase}>
            {APP_CONFIG.tempUnits.map((unit) => (
              <button
                key={unit}
                onClick={() => setTempUnit(unit)}
                className={cn(
                  "px-4 py-1.5 text-[13px] font-bold transition-colors",
                  tempUnit === unit
                    ? "bg-indigo-500 text-white"
                    : isDark
                      ? "bg-zinc-800 text-gray-400 hover:bg-zinc-700"
                      : "bg-white text-gray-600 hover:bg-gray-50",
                )}
              >
                °{unit}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className={labelText}>{t.settingsRefresh}</p>
            <p className={hintText}>Every {refreshRate}s</p>
          </div>
          <div className={segmentBase}>
            {APP_CONFIG.refreshOptions.map((r) => (
              <button
                key={r}
                onClick={() => setRefreshRate(r)}
                className={cn(
                  "px-3 py-1.5 text-[13px] font-bold transition-colors",
                  refreshRate === r
                    ? "bg-indigo-500 text-white"
                    : isDark
                      ? "bg-zinc-800 text-gray-400 hover:bg-zinc-700"
                      : "bg-white text-gray-600 hover:bg-gray-50",
                )}
              >
                {r}s
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className={labelText}>Theme</p>
            <p className={hintText}>{isDark ? "Dark Mode" : "Light Mode"}</p>
          </div>
          <ToggleSwitch
            checked={isDark}
            onChange={setIsDark}
            onColor="bg-indigo-500"
            ariaLabel="Theme"
          />
        </div>
      </div>

      {/* Weather */}
      <div className={cardCn(isDark)}>
        <h3 className={sectionTitle}>{t.settingsWeather}</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className={labelText}>{t.settingsWeatherAlert}</p>
            <p className={hintText}>AQI, rain, and storm notifications</p>
          </div>
          <ToggleSwitch
            checked={weatherAlerts}
            onChange={setWeatherAlerts}
            ariaLabel={t.settingsWeatherAlert}
          />
        </div>
      </div>

      {/* Transit */}
      <div className={cardCn(isDark)}>
        <h3 className={sectionTitle}>{t.settingsTransit}</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className={labelText}>Preferred Routes</p>
            <p className={hintText}>{t.settingsPrefRoutes}</p>
          </div>
          <ToggleSwitch
            checked={preferredRoutes}
            onChange={setPreferredRoutes}
            ariaLabel="Preferred Routes"
          />
        </div>
      </div>

      {/* Traffic */}
      <div className={cardCn(isDark)}>
        <h3 className={sectionTitle}>{t.settingsTraffic}</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className={labelText}>{t.settingsTrafficAlert}</p>
          </div>
          <ToggleSwitch
            checked={trafficAlerts}
            onChange={setTrafficAlerts}
            ariaLabel={t.settingsTrafficAlert}
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className={labelText}>{t.settingsCongestionAlerts}</p>
          </div>
          <ToggleSwitch
            checked={congestionAlerts}
            onChange={setCongestionAlerts}
            ariaLabel={t.settingsCongestionAlerts}
          />
        </div>
      </div>

      {/* News */}
      <div className={cardCn(isDark)}>
        <h3 className={sectionTitle}>{t.settingsNews}</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className={labelText}>Customized News Sources</p>
            <p className={hintText}>{t.settingsNewsSources}</p>
          </div>
          <ToggleSwitch
            checked={newsSources}
            onChange={setNewsSources}
            ariaLabel="Customized News Sources"
          />
        </div>
      </div>
    </div>
  );
}