"use client";

import { useMemo, useSyncExternalStore } from "react";
import {
  clearNotifications,
  getNotificationsServerSnapshot,
  getNotificationsSnapshot,
  markAllNotificationsRead,
  markNotificationRead,
  removeNotification,
  subscribeNotifications,
  type StoredNotification,
} from "@/services/notificationStore";

export interface NotificationsApi {
  items: StoredNotification[];
  unreadCount: number;
  markRead: (id: number) => void;
  markAllRead: () => void;
  remove: (id: number) => void;
  clearAll: () => void;
}

/** Shared notifications store (syncs across components via useSyncExternalStore). */
export function useNotifications(): NotificationsApi {
  const items = useSyncExternalStore(
    subscribeNotifications,
    getNotificationsSnapshot,
    getNotificationsServerSnapshot,
  );

  const unreadCount = useMemo(() => items.filter((item) => !item.read).length, [items]);

  return {
    items,
    unreadCount,
    markRead: markNotificationRead,
    markAllRead: markAllNotificationsRead,
    remove: removeNotification,
    clearAll: clearNotifications,
  };
}