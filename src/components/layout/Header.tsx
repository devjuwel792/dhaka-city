"use client";

import { useRef } from "react";
import {
  Clock,
  MapPin,
  Map as MapIcon,
  Sun,
  Moon,
  Bell,
  Phone,
  Check,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useClock } from "@/hooks/useClock";
import { useNotifications } from "@/hooks/useNotifications";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { CITY_LOCATIONS, getLocationMeta } from "@/config/locations";
import { cn } from "@/utils/cn";
import { NotificationPanel } from "@/components/notifications/NotificationPanel";

const pillBase =
  "px-4 py-1.5 rounded-full border text-sm font-semibold flex items-center gap-1.5 transition-all";

export function Header() {
  const {
    isDark,
    toggleTheme,
    lang,
    toggleLang,
    setLocation,
    selectedLocation,
    showLocationDropdown,
    setShowLocationDropdown,
    showNotificationPanel,
    setShowNotificationPanel,
    setShowMapModal,
    setShowEmergencyModal,
    t,
  } = useApp();

  const clock = useClock(lang);
  const { unreadCount } = useNotifications();
  const locationRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useOutsideClick(locationRef, showLocationDropdown, () => setShowLocationDropdown(false));
  useOutsideClick(notificationRef, showNotificationPanel, () => setShowNotificationPanel(false));

  return (
    <header
      className={cn(
        "sticky top-0 z-20 flex flex-row items-center justify-between px-8 py-4 border-b transition-colors duration-200",
        isDark
          ? "bg-[#1A1A1A]/95 border-zinc-800 backdrop-blur-md"
          : "bg-white/95 border-gray-200 backdrop-blur-md",
      )}
    >
      {/* Time & Date */}
      <div className="flex items-center gap-3">
        <Clock className={cn("w-8 h-8", isDark ? "text-gray-400" : "text-gray-500")} />
        <div>
          <h2 className="text-xl font-bold tracking-tight">{clock.time}</h2>
          <p className={cn("text-[12px] font-medium", isDark ? "text-gray-500" : "text-gray-400")}>
            {clock.date}
          </p>
        </div>
      </div>

      {/* Quick controls */}
      <div className="flex items-center gap-3">
        {/* Location selector */}
        <div ref={locationRef} className="relative location-selector">
          <button
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            className={cn(
              pillBase,
              isDark
                ? "border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-gray-200"
                : "border-gray-300 bg-white hover:bg-gray-50 text-gray-700 shadow-sm",
            )}
          >
            <MapPin className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span>{lang === "bn" ? selectedLocation.nameBn : selectedLocation.nameEn}</span>
          </button>

          {showLocationDropdown && (
            <div
              className={cn(
                "absolute left-0 mt-2 w-48 rounded-xl shadow-lg border overflow-hidden z-30 animate-in fade-in-50 slide-in-from-top-1",
                isDark ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-100",
              )}
            >
              <p
                className={cn(
                  "px-4 py-2 text-[11px] font-bold uppercase tracking-wider border-b",
                  isDark ? "text-zinc-500 border-zinc-700" : "text-gray-400 border-gray-50",
                )}
              >
                {t.searchLocation}
              </p>
              {CITY_LOCATIONS.map((loc) => {
                const active = selectedLocation.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => {
                      setLocation(loc.id);
                      setShowLocationDropdown(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2.5 text-[13px] font-medium transition-colors flex items-center justify-between gap-2",
                      active
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
                        : isDark
                          ? "text-gray-300 hover:bg-zinc-700/50"
                          : "text-gray-700 hover:bg-gray-50",
                    )}
                  >
                    <span className="min-w-0">
                      <span className="block truncate">
                        {lang === "bn" ? loc.nameBn : loc.nameEn}
                      </span>
                      <span className="block text-[10px] font-medium text-gray-400 truncate">
                        {getLocationMeta(loc, lang)}
                      </span>
                    </span>
                    {active && <Check className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Map */}
        <button
          onClick={() => setShowMapModal(true)}
          className={cn(
            pillBase,
            isDark
              ? "border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-gray-200"
              : "border-gray-300 bg-white hover:bg-gray-50 text-gray-700 shadow-sm",
          )}
        >
          <MapIcon className="w-4 h-4 text-indigo-500" />
          <span>Map</span>
        </button>

        {/* Mode */}
        <button
          onClick={toggleTheme}
          className={cn(
            pillBase,
            isDark
              ? "border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-gray-200"
              : "border-gray-300 bg-white hover:bg-gray-50 text-gray-700 shadow-sm",
          )}
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-500" />}
          <span>{t.mode}</span>
        </button>

        {/* Language */}
        <button
          onClick={toggleLang}
          className={cn(
            pillBase,
            "gap-2",
            isDark
              ? "border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-gray-200"
              : "border-gray-300 bg-white hover:bg-gray-50 text-gray-700 shadow-sm",
          )}
        >
          <span className="text-[13px] font-bold">🌐 {lang === "en" ? "English" : "বাংলা"}</span>
        </button>

        {/* Emergency */}
        <button
          onClick={() => setShowEmergencyModal(true)}
          className="px-4 py-1.5 rounded-full border border-red-500 bg-white text-red-500 hover:bg-red-50 dark:bg-red-950/10 dark:hover:bg-red-950/20 text-sm font-bold flex items-center gap-1.5 transition-all animate-bounce"
        >
          <Phone className="w-4 h-4 text-red-500" />
          <span>{t.emergency}</span>
        </button>

        {/* Notifications */}
        <div ref={notificationRef} className="relative notification-trigger">
          <button
            onClick={() => setShowNotificationPanel(!showNotificationPanel)}
            aria-label={
              unreadCount > 0
                ? `${unreadCount} unread notifications`
                : "Notifications, none unread"
            }
            aria-expanded={showNotificationPanel}
            className={cn(
              "p-2 rounded-full border relative transition-all",
              isDark
                ? "border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-gray-200"
                : "border-gray-300 bg-white hover:bg-gray-50 text-gray-700 shadow-sm",
            )}
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <>
                <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-red-500" />
                <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              </>
            )}
          </button>
          {showNotificationPanel && <NotificationPanel />}
        </div>

        {/* Avatar */}
        <div className="flex items-center ml-2 border-l pl-3 border-gray-200 dark:border-zinc-800">
          <div className="w-9 h-9 rounded-full ring-2 ring-[#4CAF50]/30 overflow-hidden cursor-pointer hover:ring-[#4CAF50]/80 transition-all">
            <svg viewBox="0 0 32 32" className="w-full h-full bg-emerald-100">
              <path fill="#54b868" d="M16 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" />
              <path fill="#388a47" d="M16 18c-7 0-12 4-12 9v1h24v-1c0-5-5-9-12-9z" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}