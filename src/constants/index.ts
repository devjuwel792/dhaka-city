import {
  LayoutDashboard,
  CloudSun,
  Bus,
  Activity,
  Video,
  Newspaper,
  Settings,
  HelpCircle,
  Info,
} from "lucide-react";
import type { NavItem, ViewId } from "@/types";
import { CITY_LOCATIONS } from "@/config/locations";

/** Primary navigation (main city views). Labels are resolved at render-time. */
export const primaryNav: { id: ViewId; icon: NavItem["icon"] }[] = [
  { id: "dashboard", icon: LayoutDashboard },
  { id: "weather", icon: CloudSun },
  { id: "transit", icon: Bus },
  { id: "traffic", icon: Activity },
  { id: "livestreet", icon: Video },
  { id: "news", icon: Newspaper },
];

/** Secondary navigation (settings / support / about). */
export const secondaryNav: { id: ViewId; icon: NavItem["icon"] }[] = [
  { id: "settings", icon: Settings },
  { id: "support", icon: HelpCircle },
  { id: "about", icon: Info },
];

export const allNav = [...primaryNav, ...secondaryNav];

/** English names of all configured locations (see `CITY_LOCATIONS` for metadata). */
export const locationsList = CITY_LOCATIONS.map((loc) => loc.nameEn);