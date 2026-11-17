export const APP_CONFIG = {
  name: "Dhaka City Smart Dashboard",
  version: "1.2.0",
  org: "UIUXpert Lab",
  contactEmail: "dhk@citydb.bd",
  defaultView: "transit" as const,
  defaultLocation: "Mirpur 10",
  refreshOptions: [5, 10, 15, 30] as const,
  tempUnits: ["C", "F"] as const,
  /** Simulated network latency for the mock API layer (ms). */
  apiLatencyMs: 120,
} as const;

export const STATUS_COLORS = {
  green: {
    dot: "bg-emerald-500",
    text: "text-emerald-600",
  },
  orange: {
    dot: "bg-amber-500",
    text: "text-amber-500",
  },
  red: {
    dot: "bg-red-500",
    text: "text-red-500",
  },
} as const;