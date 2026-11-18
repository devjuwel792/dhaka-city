import type { TransportAlert, BusRoute } from "@/types";
import demoData from "./demo-data.json";

/**
 * Static reference data for MRT Line 6 (Uttara North – Motijheel), stored in
 * `src/data/demo-data.json`. Station names/order are factual reference
 * information, not live data.
 */
export interface MetroStation {
  id: string;
  name: string;
  nameBn: string;
  order: number;
}

export const MRT_LINE_6_STATIONS: MetroStation[] =
  demoData.transit.metroStations as MetroStation[];

export const METRO_LINE_6_META = {
  name: "MRT Line 6",
  nameBn: "এমআরটি লাইন ৬",
  terminusA: "Uttara North",
  terminusABn: "উত্তরা উত্তর",
  terminusB: "Motijheel",
  terminusBBn: "মতিঝিল",
  stationCount: MRT_LINE_6_STATIONS.length,
} as const;

/**
 * DEMO route status samples from `demo-data.json`. Values are illustrative,
 * not live transit feeds. UI must keep the DEMO label visible.
 */
export const transportAlertsList: TransportAlert[] =
  demoData.transit.alerts as TransportAlert[];

/** DEMO bus-route status samples (illustrative only). */
export const busRoutesStatus: BusRoute[] = demoData.transit.busRoutes as BusRoute[];

export const TRANSIT_DISCLAIMER_EN =
  "Route statuses and availability are demo samples. No live transit feed is connected.";
export const TRANSIT_DISCLAIMER_BN =
  "রুট স্ট্যাটাস ও প্রাপ্যতা ডেমো নমুনা। কোনো লাইভ ট্রানজিট ফিড সংযুক্ত নেই।";
