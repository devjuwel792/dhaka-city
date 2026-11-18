import type { CityNotification } from "@/types";
import { STORAGE_PREFIX } from "./storage";

export const NOTIFICATIONS_KEY = `${STORAGE_PREFIX}notifications`;

export interface StoredNotification extends CityNotification {
  /** ISO timestamp used for the "time ago" label. */
  createdAt: string;
  read: boolean;
}

const listeners = new Set<() => void>();
const EMPTY: StoredNotification[] = [];
let snapshot: StoredNotification[] | null = null;

function seedNotifications(): StoredNotification[] {
  const now = Date.now();
  const minute = 60 * 1000;
  const base: Array<Omit<StoredNotification, "createdAt"> & { minutesAgo: number }> = [
    {
      id: 1,
      title: "Demo emergency broadcast",
      text: "Sample waterlogging hazard near Dhanmondi 27. Demo alert — no live emergency feed.",
      time: "10m ago",
      level: "high",
      read: false,
      minutesAgo: 10,
    },
    {
      id: 2,
      title: "Demo transit notice",
      text: "Sample metro service notice towards Motijheel. Demo status only.",
      time: "25m ago",
      level: "med",
      read: false,
      minutesAgo: 25,
    },
    {
      id: 3,
      title: "Demo air-quality reminder",
      text: "Sample reminder based on typical winter AQI. Not a live health advisory.",
      time: "1h ago",
      level: "med",
      read: false,
      minutesAgo: 60,
    },
  ];

  return base.map(({ minutesAgo, ...item }) => ({
    ...item,
    createdAt: new Date(now - minutesAgo * minute).toISOString(),
  }));
}

function isStoredNotification(value: unknown): value is StoredNotification {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "number" &&
    typeof item.title === "string" &&
    typeof item.text === "string" &&
    typeof item.time === "string" &&
    typeof item.createdAt === "string" &&
    typeof item.read === "boolean" &&
    (item.level === "high" || item.level === "med")
  );
}

function load(): StoredNotification[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(NOTIFICATIONS_KEY);
    if (!raw) return seedNotifications();
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return seedNotifications();
    const valid = parsed.filter(isStoredNotification);
    return valid;
  } catch {
    return seedNotifications();
  }
}

function emit(): void {
  for (const listener of listeners) listener();
}

function persist(items: StoredNotification[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(items));
  } catch {
    // Storage may be blocked/full; the in-memory store still works.
  }
}

function setSnapshot(next: StoredNotification[]): void {
  snapshot = next;
  persist(next);
  emit();
}

/** Seeds the store on first client read and caches the reference for useSyncExternalStore. */
function ensureSnapshot(): StoredNotification[] {
  if (snapshot === null) {
    snapshot = load();
    persist(snapshot);
  }
  return snapshot;
}

export function subscribeNotifications(listener: () => void): () => void {
  listeners.add(listener);

  const onStorage = (event: StorageEvent) => {
    if (event.key !== NOTIFICATIONS_KEY) return;
    snapshot = load();
    emit();
  };
  if (typeof window !== "undefined") {
    window.addEventListener("storage", onStorage);
  }

  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", onStorage);
    }
  };
}

export function getNotificationsSnapshot(): StoredNotification[] {
  return ensureSnapshot();
}

export function getNotificationsServerSnapshot(): StoredNotification[] {
  return EMPTY;
}

export function markNotificationRead(id: number): void {
  const current = ensureSnapshot();
  if (!current.some((item) => item.id === id && !item.read)) return;
  setSnapshot(current.map((item) => (item.id === id ? { ...item, read: true } : item)));
}

export function markAllNotificationsRead(): void {
  const current = ensureSnapshot();
  if (!current.some((item) => !item.read)) return;
  setSnapshot(current.map((item) => (item.read ? item : { ...item, read: true })));
}

export function removeNotification(id: number): void {
  const current = ensureSnapshot();
  if (!current.some((item) => item.id === id)) return;
  setSnapshot(current.filter((item) => item.id !== id));
}

export function clearNotifications(): void {
  if (ensureSnapshot().length === 0) return;
  setSnapshot([]);
}

export function resetNotifications(): void {
  setSnapshot(seedNotifications());
}