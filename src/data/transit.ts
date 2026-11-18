import type { TransportAlert, BusRoute } from "@/types";

/**
 * Static reference data for MRT Line 6 (Uttara North – Motijheel).
 * Station names/order are factual reference information, not live data.
 */
export interface MetroStation {
  id: string;
  name: string;
  nameBn: string;
  order: number;
}

export const MRT_LINE_6_STATIONS: MetroStation[] = [
  { id: "uttara-north", name: "Uttara North", nameBn: "উত্তরা উত্তর", order: 1 },
  { id: "uttara-center", name: "Uttara Center", nameBn: "উত্তরা সেন্টার", order: 2 },
  { id: "uttara-south", name: "Uttara South", nameBn: "উত্তরা দক্ষিণ", order: 3 },
  { id: "pallabi", name: "Pallabi", nameBn: "পল্লবী", order: 4 },
  { id: "mirpur-11", name: "Mirpur 11", nameBn: "মিরপুর ১১", order: 5 },
  { id: "mirpur-10", name: "Mirpur 10", nameBn: "মিরপুর ১০", order: 6 },
  { id: "kazipara", name: "Kazipara", nameBn: "কাজীপাড়া", order: 7 },
  { id: "shewrapara", name: "Shewrapara", nameBn: "শেওড়াপাড়া", order: 8 },
  { id: "agargaon", name: "Agargaon", nameBn: "আগারগাঁও", order: 9 },
  { id: "bijoy-sarani", name: "Bijoy Sarani", nameBn: "বিজয় সরণি", order: 10 },
  { id: "farmgate", name: "Farmgate", nameBn: "ফার্মগেট", order: 11 },
  { id: "kawran-bazar", name: "Kawran Bazar", nameBn: "কাওরান বাজার", order: 12 },
  { id: "shahbagh", name: "Shahbagh", nameBn: "শাহবাগ", order: 13 },
  { id: "dhaka-university", name: "Dhaka University", nameBn: "ঢাকা বিশ্ববিদ্যালয়", order: 14 },
  { id: "secretariat", name: "Secretariat", nameBn: "সচিবালয়", order: 15 },
  { id: "motijheel", name: "Motijheel", nameBn: "মতিঝিল", order: 16 },
];

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
 * DEMO route status samples. Values are illustrative, not live transit feeds.
 * UI must keep the DEMO label visible anywhere this list is rendered.
 */
export const transportAlertsList: TransportAlert[] = [
  { name: "Mirpur 10", status: "Minor Delays", color: "orange" },
  { name: "Kazipara", status: "Good Service", color: "green" },
  { name: "Shewrapara", status: "Major Delays", color: "red" },
  { name: "Agargaon", status: "Good Service", color: "green" },
  { name: "Farmgate", status: "Minor Delays", color: "orange" },
  { name: "Motijheel", status: "Good Service", color: "green" },
  { name: "Dhanmondi", status: "Major Delays", color: "red" },
  { name: "Gulshan", status: "Minor Delays", color: "orange" },
  { name: "Banani", status: "Good Service", color: "green" },
  { name: "Uttara", status: "Major Delays", color: "red" },
  { name: "Airport Road", status: "Minor Delays", color: "orange" },
  { name: "Mohakhali", status: "Major Delays", color: "red" },
  { name: "Dhanmondi 27", status: "Good Service", color: "green" },
  { name: "Bashundhara R/A", status: "Major Delays", color: "red" },
  { name: "Baridhara", status: "Major Delays", color: "red" },
  { name: "Uttara Sector 7", status: "Minor Delays", color: "orange" },
  { name: "Mirpur DOHS", status: "Good Service", color: "green" },
  { name: "New Market", status: "Major Delays", color: "red" },
  { name: "Khilgaon", status: "Minor Delays", color: "orange" },
  { name: "Tejgaon", status: "Major Delays", color: "red" },
  { name: "Mohammadpur", status: "Minor Delays", color: "orange" },
  { name: "Savar", status: "Good Service", color: "green" },
  { name: "Gazipur", status: "Major Delays", color: "red" },
];

/** DEMO bus-route status samples (illustrative only). */
export const busRoutesStatus: BusRoute[] = [
  { name: "Route 18", status: "Disrupted", color: "red" },
  { name: "Dhanmondi", status: "Delayed", color: "orange" },
  { name: "Baridhara", status: "Delayed", color: "orange" },
  { name: "Mirpur 14", status: "On Time", color: "green" },
  { name: "Gulshan", status: "Delayed", color: "orange" },
  { name: "Gazipur", status: "Disrupted", color: "red" },
  { name: "Uttara", status: "On Time", color: "green" },
  { name: "Mohakhali", status: "On Time", color: "green" },
  { name: "Savar", status: "Disrupted", color: "red" },
];

export const TRANSIT_DISCLAIMER_EN =
  "Route statuses and availability are demo samples. No live transit feed is connected.";
export const TRANSIT_DISCLAIMER_BN =
  "রুট স্ট্যাটাস ও প্রাপ্যতা ডেমো নমুনা। কোনো লাইভ ট্রানজিট ফিড সংযুক্ত নেই।";
