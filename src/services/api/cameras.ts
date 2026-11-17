import type { CameraFeed, CityNotification } from "@/types";
import { cameraFeeds, liveStreetFeeds } from "@/data/cameras";
import { notifications } from "@/data/notifications";
import { mockRequest } from "./client";

export function fetchCameras(): Promise<CameraFeed[]> {
  return mockRequest(cameraFeeds);
}

export function fetchLiveStreetFeeds(): Promise<CameraFeed[]> {
  return mockRequest(liveStreetFeeds);
}

export function fetchNotifications(): Promise<CityNotification[]> {
  return mockRequest(notifications);
}