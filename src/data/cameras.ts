import type { CameraFeed } from "@/types";
import demoData from "./demo-data.json";

export interface CameraFeedConfig extends CameraFeed {
  location: string;
  videoSrc: string;
  poster: string;
  isDemo: true;
}

/**
 * Local demo footage configuration, stored in `src/data/demo-data.json`.
 * Replace the MP4/poster files under `public/videos/` to change the footage
 * without touching UI components. These are NOT live CCTV feeds.
 */
export const CAMERA_FEEDS: CameraFeedConfig[] =
  demoData.cameras as CameraFeedConfig[];

/** Dashboard thumbnails (first three feeds). */
export const cameraFeeds: CameraFeedConfig[] = CAMERA_FEEDS.slice(0, 3);

/** Full Live Street grid. */
export const liveStreetFeeds: CameraFeedConfig[] = CAMERA_FEEDS;
