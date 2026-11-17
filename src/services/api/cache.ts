import type { CacheEntry } from "@/types/api";
import { API_CONFIG } from "@/config/api";

interface MemoryStore {
  entries: Map<string, CacheEntry<unknown>>;
}

const memory: MemoryStore = { entries: new Map() };

function safeLocalStorage(): Storage | null {
  try {
    if (typeof window === "undefined" || !window.localStorage) return null;
    return window.localStorage;
  } catch {
    return null;
  }
}

export function getCached<T>(key: string): CacheEntry<T> | null {
  const now = Date.now();

  const mem = memory.entries.get(key);
  if (mem) {
    if (mem.expiresAt > now) return mem as CacheEntry<T>;
    memory.entries.delete(key);
  }

  if (API_CONFIG.localStorage.enabled) {
    const store = safeLocalStorage();
    if (!store) return null;
    try {
      const raw = store.getItem(API_CONFIG.localStorage.keyPrefix + key);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as CacheEntry<T>;
      if (typeof parsed?.expiresAt !== "number" || parsed.expiresAt <= now) {
        store.removeItem(API_CONFIG.localStorage.keyPrefix + key);
        return null;
      }
      // Promote to memory for faster subsequent reads.
      memory.entries.set(key, parsed as CacheEntry<unknown>);
      return parsed;
    } catch {
      return null;
    }
  }

  return null;
}

export function setCached<T>(key: string, value: T, ttlMs: number): CacheEntry<T> {
  const now = Date.now();
  const entry: CacheEntry<T> = {
    value,
    storedAt: new Date(now).toISOString(),
    expiresAt: now + ttlMs,
  };
  memory.entries.set(key, entry as CacheEntry<unknown>);

  if (API_CONFIG.localStorage.enabled) {
    const store = safeLocalStorage();
    if (store) {
      try {
        store.setItem(API_CONFIG.localStorage.keyPrefix + key, JSON.stringify(entry));
        pruneLocalStorage();
      } catch {
        // Quota or serialization failure — memory cache still holds the value.
      }
    }
  }

  return entry;
}

export function clearCache(): void {
  memory.entries.clear();
  const store = safeLocalStorage();
  if (!store) return;
  try {
    const prefix = API_CONFIG.localStorage.keyPrefix;
    const keys: string[] = [];
    for (let i = 0; i < store.length; i++) {
      const k = store.key(i);
      if (k && k.startsWith(prefix)) keys.push(k);
    }
    keys.forEach((k) => store.removeItem(k));
  } catch {
    // ignore
  }
}

/** Keeps only the newest N entries in localStorage to avoid unbounded growth. */
function pruneLocalStorage(): void {
  const store = safeLocalStorage();
  if (!store) return;
  const max = API_CONFIG.localStorage.maxEntries;
  try {
    const prefix = API_CONFIG.localStorage.keyPrefix;
    const items: { key: string; storedAt: number }[] = [];
    for (let i = 0; i < store.length; i++) {
      const k = store.key(i);
      if (!k || !k.startsWith(prefix)) continue;
      const raw = store.getItem(k);
      if (!raw) continue;
      try {
        const parsed = JSON.parse(raw) as CacheEntry<unknown>;
        items.push({ key: k, storedAt: new Date(parsed.storedAt).getTime() || 0 });
      } catch {
        store.removeItem(k);
      }
    }
    if (items.length <= max) return;
    items
      .sort((a, b) => a.storedAt - b.storedAt)
      .slice(0, items.length - max)
      .forEach((it) => store.removeItem(it.key));
  } catch {
    // ignore
  }
}