import { useAsyncData } from "./useAsyncData";
import {
  fetchCameras,
  fetchLiveStreetFeeds,
  fetchNotifications,
} from "@/services/api";
import { cameraFeeds, liveStreetFeeds } from "@/data/cameras";
import { notifications } from "@/data/notifications";

export function useCameras() {
  const cameras = useAsyncData(fetchCameras, cameraFeeds, []);
  const liveStreet = useAsyncData(fetchLiveStreetFeeds, liveStreetFeeds, []);
  const alerts = useAsyncData(fetchNotifications, notifications, []);
  return { cameras, liveStreet, alerts };
}