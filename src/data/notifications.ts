import type { CityNotification } from "@/types";

export const notifications: CityNotification[] = [
  { id: 1, title: "Emergency Broadcast", text: "Water logging hazard reported in Dhanmondi Sector 27. Seek alternative route.", time: "10m ago", level: "high" },
  { id: 2, title: "Transit Alert", text: "Metro line service disrupted towards Motijheel for maintenance.", time: "25m ago", level: "med" },
  { id: 3, title: "Weather Alert", text: "Air Quality Index exceeds 200 (Unhealthy). Wear masks outdoor.", time: "1h ago", level: "med" },
];