import { Phone, AlertTriangle, Droplets, HeartPulse, Shield } from "lucide-react";
import type { EmergencyContact } from "@/types";
import demoData from "./demo-data.json";

type EmergencyIcon = "phone" | "fire" | "medical" | "utility" | "police";
type ContactRecord = Omit<EmergencyContact, "icon"> & { icon: EmergencyIcon };

const ICONS: Record<EmergencyIcon, EmergencyContact["icon"]> = {
  phone: Phone,
  fire: AlertTriangle,
  medical: HeartPulse,
  utility: Droplets,
  police: Shield,
};

/**
 * Public emergency helplines from `demo-data.json`. Numbers are compiled from
 * official public sources; national short codes are free to dial.
 */
export const emergencyContacts: EmergencyContact[] = (
  demoData.emergency.contacts as ContactRecord[]
).map(({ icon, ...contact }) => ({ ...contact, icon: ICONS[icon] }));

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
