import {
  Phone,
  AlertTriangle,
  Droplets,
  CheckCircle2,
} from "lucide-react";
import type { EmergencyContact } from "@/types";

export const emergencyContacts: EmergencyContact[] = [
  { service: "National Emergency Helpline", number: "999", desc: "For Police, Fire, and Ambulance services nationwide.", icon: Phone, color: "text-red-600 bg-red-50 border-red-200" },
  { service: "Dhaka Fire Service Headquarters", number: "02-9555555", desc: "Direct response line for firefighting in Dhaka metropolitan area.", icon: AlertTriangle, color: "text-orange-600 bg-orange-50 border-orange-200" },
  { service: "Dhaka Metropolitan Police (DMP)", number: "01713-373100", desc: "Direct control room desk for emergency police assistance.", icon: AlertTriangle, color: "text-blue-600 bg-blue-50 border-blue-200" },
  { service: "Dhaka WASA Water Supply Emergency", number: "16162", desc: "For complaints regarding water logging, pipe bursts, or water shortage.", icon: Droplets, color: "text-cyan-600 bg-cyan-50 border-cyan-200" },
  { service: "Government Health Call Center (Shastho Batayon)", number: "16263", desc: "24/7 direct doctor consultation and medical help desk.", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
];