import { useAsyncData } from "./useAsyncData";
import { fetchNotifications } from "@/services/api";
import { notifications } from "@/data/notifications";

export function useNotifications() {
  return useAsyncData(fetchNotifications, notifications, []);
}