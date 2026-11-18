"use client";

import { AlertTriangle } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { TransportAlertsList } from "./TransportAlertsList";
import { BusRoutesCard } from "./BusRoutesCard";
import { MetroRailCard } from "./MetroRailCard";
import { AvailabilityCard } from "./AvailabilityCard";

export function TransitView() {
  const { t, snapshot, lang, isDark } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-extrabold">{t.transit}</h3>
        <p className="text-[13px] text-gray-400 mt-0.5">
          {lang === "bn"
            ? "মেট্রো স্টেশন রেফারেন্স, রুট স্ট্যাটাস নমুনা ও যানবাহন প্রাপ্যতা"
            : "Metro station reference, sample route status and vehicle availability"}
        </p>
      </div>

      <div
        className={
          isDark
            ? "flex items-start gap-2 rounded-xl border border-amber-900/40 bg-amber-950/20 px-4 py-3 text-[12px] text-amber-300"
            : "flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[12px] text-amber-700"
        }
      >
        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
        <span>
          {lang === "bn"
            ? "স্টেশন তালিকা ছাড়া বাকি সব স্ট্যাটাস ডেমো নমুনা। কোনো লাইভ ট্রানজিট ফিড সংযুক্ত নেই।"
            : "Apart from the station reference list, all statuses are demo samples. No live transit feed is connected."}
        </span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <TransportAlertsList />

        <div className="xl:col-span-5 space-y-8">
          <BusRoutesCard />
          <MetroRailCard />
          <AvailabilityCard title={t.cngAvailability} availability={snapshot.cngAvailability} />
          <AvailabilityCard
            title={t.rickshawAvailability}
            availability={snapshot.rickshawAvailability}
          />
        </div>
      </div>
    </div>
  );
}