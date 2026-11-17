"use client";

import { useApp } from "@/context/AppContext";
import { TransportAlertsList } from "./TransportAlertsList";
import { BusRoutesCard } from "./BusRoutesCard";
import { MetroRailCard } from "./MetroRailCard";
import { AvailabilityCard } from "./AvailabilityCard";

export function TransitView() {
  const { t, snapshot } = useApp();

  return (
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
  );
}