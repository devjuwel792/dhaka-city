"use client";

import { useRef, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  RotateCcw,
  Settings as SettingsIcon,
  Trash2,
  Upload,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { APP_CONFIG } from "@/config";
import { MAP_LAYERS } from "@/config/map";
import type { WidgetVisibility } from "@/services/storage";
import { ToggleSwitch } from "@/components/common/ToggleSwitch";
import { cn } from "@/utils/cn";

const cardClass = "rounded-2xl border p-6 shadow-sm space-y-5";
const cardCn = (isDark: boolean) =>
  cn(cardClass, isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200");
const sectionTitle =
  "font-bold text-[15px] tracking-tight border-b pb-3 border-gray-100 dark:border-zinc-800";
const labelText = "font-semibold text-[14px]";
const hintText = "text-[12px] mt-0.5 text-gray-400";
const segmentBase = "flex rounded-lg border overflow-hidden border-gray-200 dark:border-zinc-700";

interface StatusMessage {
  ok: boolean;
  text: string;
}

export function SettingsView() {
  const {
    isDark,
    lang,
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
    widgets,
    toggleWidget,
    mapLayer,
    setMapLayer,
    cameraAutoplay,
    setCameraAutoplay,
    resetSettings,
    exportSettingsJson,
    importSettingsJson,
    clearLocalData,
  } = useApp();

  const importRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<StatusMessage | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  const widgetItems: Array<{ key: keyof WidgetVisibility; label: string }> = [
    { key: "weather", label: t.weather },
    { key: "airQuality", label: t.airQuality },
    { key: "map", label: lang === "bn" ? "মানচিত্র" : "Map" },
    { key: "traffic", label: t.traffic },
    { key: "transit", label: t.transit },
    { key: "news", label: t.newsInfo },
    { key: "cameras", label: t.liveStreet },
  ];

  const handleExport = () => {
    try {
      const json = exportSettingsJson();
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "dhaka-city-settings.json";
      anchor.click();
      URL.revokeObjectURL(url);
      setStatus({
        ok: true,
        text: lang === "bn" ? "সেটিংস ডাউনলোড হয়েছে।" : "Settings downloaded.",
      });
    } catch {
      setStatus({
        ok: false,
        text: lang === "bn" ? "এক্সপোর্ট ব্যর্থ হয়েছে।" : "Export failed.",
      });
    }
  };

  const handleImport = async (file: File | null) => {
    if (!file) return;
    try {
      const text = await file.text();
      importSettingsJson(text);
      setStatus({
        ok: true,
        text: lang === "bn" ? "সেটিংস আমদানি হয়েছে।" : "Settings imported successfully.",
      });
    } catch (error) {
      setStatus({
        ok: false,
        text:
          error instanceof Error
            ? error.message
            : lang === "bn"
              ? "ফাইলটি পড়া যায়নি।"
              : "Could not read that file.",
      });
    } finally {
      if (importRef.current) importRef.current.value = "";
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <SettingsIcon
          className="w-7 h-7 text-indigo-500 animate-spin"
          style={{ animationDuration: "8s" }}
        />
        <h2 className="text-2xl font-extrabold tracking-tight">{t.settings}</h2>
      </div>

      {status && (
        <div
          role="status"
          aria-live="polite"
          className={cn(
            "flex items-start gap-2 rounded-xl border px-4 py-3 text-[12px]",
            status.ok
              ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-300"
              : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-300",
          )}
        >
          {status.ok ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          )}
          <span className="flex-1">{status.text}</span>
          <button
            type="button"
            onClick={() => setStatus(null)}
            className="font-bold opacity-70 hover:opacity-100"
            aria-label={lang === "bn" ? "বার্তা বন্ধ করুন" : "Dismiss message"}
          >
            ×
          </button>
        </div>
      )}

      <div className={cardCn(isDark)}>
        <h3 className={sectionTitle}>{t.settingsGeneral}</h3>

        <div className="flex items-center justify-between gap-4">
          <div>
            <p className={labelText}>{t.settingsUnits}</p>
            <p className={hintText}>
              {lang === "bn" ? "বর্তমানে" : "Currently showing"}: °{tempUnit}
            </p>
          </div>
          <div className={segmentBase} role="group" aria-label={t.settingsUnits}>
            {APP_CONFIG.tempUnits.map((unit) => (
              <button
                key={unit}
                onClick={() => setTempUnit(unit)}
                aria-pressed={tempUnit === unit}
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

        <div className="flex items-center justify-between gap-4">
          <div>
            <p className={labelText}>{t.settingsRefresh}</p>
            <p className={hintText}>
              {lang === "bn" ? "প্রতি" : "Every"} {refreshRate}s
            </p>
          </div>
          <div className={segmentBase} role="group" aria-label={t.settingsRefresh}>
            {APP_CONFIG.refreshOptions.map((r) => (
              <button
                key={r}
                onClick={() => setRefreshRate(r)}
                aria-pressed={refreshRate === r}
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

        <div className="flex items-center justify-between gap-4">
          <div>
            <p className={labelText}>{lang === "bn" ? "থিম" : "Theme"}</p>
            <p className={hintText}>{isDark ? "Dark Mode" : "Light Mode"}</p>
          </div>
          <ToggleSwitch
            checked={isDark}
            onChange={setIsDark}
            onColor="bg-indigo-500"
            ariaLabel={lang === "bn" ? "থিম" : "Theme"}
          />
        </div>
      </div>

      <div className={cardCn(isDark)}>
        <h3 className={sectionTitle}>{lang === "bn" ? "ড্যাশবোর্ড উইজেট" : "Dashboard widgets"}</h3>
        <p className={hintText}>
          {lang === "bn"
            ? "ড্যাশবোর্ডে কোন উইজেট দেখাবে তা বেছে নিন।"
            : "Choose which widgets appear on the dashboard."}
        </p>
        {widgetItems.map((item) => (
          <div key={item.key} className="flex items-center justify-between gap-4">
            <p className={labelText}>{item.label}</p>
            <ToggleSwitch
              checked={widgets[item.key]}
              onChange={() => toggleWidget(item.key)}
              ariaLabel={item.label}
            />
          </div>
        ))}
      </div>

      <div className={cardCn(isDark)}>
        <h3 className={sectionTitle}>{lang === "bn" ? "মানচিত্র ও ক্যামেরা" : "Map & cameras"}</h3>
        <div className="space-y-2">
          <p className={labelText}>{lang === "bn" ? "মানচিত্র লেয়ার" : "Map layer"}</p>
          <div className="flex flex-wrap gap-2">
            {MAP_LAYERS.map((layer) => (
              <button
                key={layer.id}
                type="button"
                onClick={() => setMapLayer(layer.id)}
                aria-pressed={mapLayer === layer.id}
                className={cn(
                  "px-3 py-1.5 rounded-lg border text-[12px] font-bold transition-colors",
                  mapLayer === layer.id
                    ? "bg-emerald-500 text-white border-emerald-500"
                    : isDark
                      ? "border-zinc-700 text-gray-300 hover:bg-zinc-800"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50",
                )}
              >
                {lang === "bn" ? layer.nameBn : layer.nameEn}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-gray-400">
            {MAP_LAYERS.find((layer) => layer.id === mapLayer)?.attribution}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 pt-2">
          <div>
            <p className={labelText}>{lang === "bn" ? "ক্যামেরা অটোপ্লে" : "Camera autoplay"}</p>
            <p className={hintText}>
              {lang === "bn"
                ? "মোডাল খুললে ডেমো ভিডিও স্বয়ংক্রিয়ভাবে চালু হবে।"
                : "Start the demo video automatically when a camera opens."}
            </p>
          </div>
          <ToggleSwitch
            checked={cameraAutoplay}
            onChange={setCameraAutoplay}
            ariaLabel={lang === "bn" ? "ক্যামেরা অটোপ্লে" : "Camera autoplay"}
          />
        </div>
      </div>

      <div className={cardCn(isDark)}>
        <h3 className={sectionTitle}>{t.settingsWeather}</h3>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className={labelText}>{t.settingsWeatherAlert}</p>
            <p className={hintText}>
              {lang === "bn"
                ? "AQI, বৃষ্টি ও ঝড়ের বিজ্ঞপ্তি (ডেমো নোটিশ)"
                : "AQI, rain and storm notices (demo alerts)"}
            </p>
          </div>
          <ToggleSwitch
            checked={weatherAlerts}
            onChange={setWeatherAlerts}
            ariaLabel={t.settingsWeatherAlert}
          />
        </div>
      </div>

      <div className={cardCn(isDark)}>
        <h3 className={sectionTitle}>{t.settingsTransit}</h3>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className={labelText}>{lang === "bn" ? "পছন্দের রুট" : "Preferred routes"}</p>
            <p className={hintText}>{t.settingsPrefRoutes}</p>
          </div>
          <ToggleSwitch
            checked={preferredRoutes}
            onChange={setPreferredRoutes}
            ariaLabel={lang === "bn" ? "পছন্দের রুট" : "Preferred routes"}
          />
        </div>
      </div>

      <div className={cardCn(isDark)}>
        <h3 className={sectionTitle}>{t.settingsTraffic}</h3>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className={labelText}>{t.settingsTrafficAlert}</p>
          </div>
          <ToggleSwitch
            checked={trafficAlerts}
            onChange={setTrafficAlerts}
            ariaLabel={t.settingsTrafficAlert}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
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

      <div className={cardCn(isDark)}>
        <h3 className={sectionTitle}>{t.settingsNews}</h3>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className={labelText}>
              {lang === "bn" ? "কাস্টম সংবাদ উৎস" : "Customized news sources"}
            </p>
            <p className={hintText}>{t.settingsNewsSources}</p>
          </div>
          <ToggleSwitch
            checked={newsSources}
            onChange={setNewsSources}
            ariaLabel={lang === "bn" ? "কাস্টম সংবাদ উৎস" : "Customized news sources"}
          />
        </div>
      </div>

      <div className={cardCn(isDark)}>
        <h3 className={sectionTitle}>{lang === "bn" ? "ডেটা ও গোপনীয়তা" : "Data & privacy"}</h3>
        <p className={hintText}>
          {lang === "bn"
            ? "সব সেটিংস এই ব্রাউজারে সংরক্ষিত থাকে। কোনো অ্যাকাউন্ট বা সার্ভার ব্যবহার হয় না।"
            : "All settings live in this browser only. There is no account and no server storage."}
        </p>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 text-[12px] font-bold hover:bg-gray-50 dark:hover:bg-zinc-800"
          >
            <Download className="w-3.5 h-3.5" />
            {lang === "bn" ? "সেটিংস এক্সপোর্ট" : "Export settings"}
          </button>

          <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 text-[12px] font-bold hover:bg-gray-50 dark:hover:bg-zinc-800 cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            {lang === "bn" ? "সেটিংস আমদানি" : "Import settings"}
            <input
              ref={importRef}
              type="file"
              accept="application/json,.json"
              className="sr-only"
              onChange={(event) => void handleImport(event.target.files?.[0] ?? null)}
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 dark:border-zinc-800">
          {confirmReset ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  resetSettings();
                  setConfirmReset(false);
                  setStatus({
                    ok: true,
                    text: lang === "bn" ? "সেটিংস রিসেট হয়েছে।" : "Settings reset to defaults.",
                  });
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500 text-white text-[12px] font-bold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {lang === "bn" ? "নিশ্চিত রিসেট" : "Confirm reset"}
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="px-3 py-2 rounded-lg text-[12px] font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                {lang === "bn" ? "বাতিল" : "Cancel"}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                setConfirmClear(false);
                setConfirmReset(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-amber-300 dark:border-amber-900/50 text-amber-700 dark:text-amber-300 text-[12px] font-bold hover:bg-amber-50 dark:hover:bg-amber-950/20"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {lang === "bn" ? "ডিফল্টে রিসেট" : "Reset to defaults"}
            </button>
          )}

          {confirmClear ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  clearLocalData();
                  setConfirmClear(false);
                  setStatus({
                    ok: true,
                    text:
                      lang === "bn"
                        ? "সব স্থানীয় ডেটা মুছে ফেলা হয়েছে।"
                        : "All local data cleared.",
                  });
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500 text-white text-[12px] font-bold"
              >
                <Trash2 className="w-3.5 h-3.5" />
                {lang === "bn" ? "নিশ্চিত মুছুন" : "Confirm clear"}
              </button>
              <button
                type="button"
                onClick={() => setConfirmClear(false)}
                className="px-3 py-2 rounded-lg text-[12px] font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                {lang === "bn" ? "বাতিল" : "Cancel"}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                setConfirmReset(false);
                setConfirmClear(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-red-300 dark:border-red-900/50 text-red-600 dark:text-red-300 text-[12px] font-bold hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              <Trash2 className="w-3.5 h-3.5" />
              {lang === "bn" ? "স্থানীয় ডেটা মুছুন" : "Clear local data"}
            </button>
          )}
        </div>
        <p className="text-[10px] text-gray-400">
          {lang === "bn"
            ? "স্থানীয় ডেটা মুছলে সেটিংস, ক্যাশ, ডেমো সতর্কতা ও খসড়া মুছে যাবে।"
            : "Clearing local data removes saved settings, API cache, demo alerts and drafts."}
        </p>
      </div>
    </div>
  );
}