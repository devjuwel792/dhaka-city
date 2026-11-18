import { Phone, AlertTriangle, Droplets, HeartPulse, Shield } from "lucide-react";
import type { EmergencyContact } from "@/types";

/**
 * Public emergency helplines. Numbers are compiled from official public
 * sources; national short codes (999, 16163, 16263, 16162) are free to dial.
 */
export const emergencyContacts: EmergencyContact[] = [
  {
    id: "national-999",
    category: "national",
    service: "National Emergency Helpline",
    serviceBn: "জাতীয় জরুরি সেবা",
    number: "999",
    desc: "Police, fire and ambulance dispatch nationwide.",
    descBn: "সারা দেশে পুলিশ, ফায়ার সার্ভিস ও অ্যাম্বুলেন্স সেবা।",
    icon: Phone,
    color: "text-red-600 bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900/40",
    source: "National Emergency Service",
  },
  {
    id: "fire-16163",
    category: "fire",
    service: "Fire Service & Civil Defence",
    serviceBn: "ফায়ার সার্ভিস ও সিভিল ডিফেন্স",
    number: "16163",
    desc: "Fire, rescue and disaster response hotline.",
    descBn: "অগ্নিকাণ্ড, উদ্ধার ও দুর্যোগ সহায়তা হটলাইন।",
    icon: AlertTriangle,
    color: "text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-900/40",
    source: "Fire Service and Civil Defence",
  },
  {
    id: "health-16263",
    category: "medical",
    service: "Shastho Batayon (Health Helpline)",
    serviceBn: "স্বাস্থ্য বাতায়ন",
    number: "16263",
    desc: "24/7 doctor consultation and medical guidance.",
    descBn: "২৪/৭ ডাক্তারি পরামর্শ ও চিকিৎসা সহায়তা।",
    icon: HeartPulse,
    color:
      "text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/40",
    source: "Directorate General of Health Services",
  },
  {
    id: "wasa-16162",
    category: "utility",
    service: "Dhaka WASA",
    serviceBn: "ঢাকা ওয়াসা",
    number: "16162",
    desc: "Water supply, waterlogging and pipeline emergencies.",
    descBn: "পানি সরবরাহ, জলাবদ্ধতা ও পাইপলাইন সমস্যা।",
    icon: Droplets,
    color: "text-cyan-600 bg-cyan-50 border-cyan-200 dark:bg-cyan-950/20 dark:border-cyan-900/40",
    source: "Dhaka Water Supply and Sewerage Authority",
  },
  {
    id: "dmp-control",
    category: "police",
    service: "DMP Control Room",
    serviceBn: "ডিএমপি কন্ট্রোল রুম",
    number: "01713-373100",
    desc: "Dhaka Metropolitan Police emergency control room.",
    descBn: "ঢাকা মেট্রোপলিটন পুলিশের জরুরি কন্ট্রোল রুম।",
    icon: Shield,
    color: "text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900/40",
    source: "Dhaka Metropolitan Police",
  },
];

export const EMERGENCY_CATEGORY_LABELS: Record<
  EmergencyContact["category"],
  { en: string; bn: string }
> = {
  national: { en: "National", bn: "জাতীয়" },
  police: { en: "Police", bn: "পুলিশ" },
  fire: { en: "Fire", bn: "ফায়ার" },
  medical: { en: "Medical", bn: "চিকিৎসা" },
  utility: { en: "Utility", bn: "ইউটিলিটি" },
};
