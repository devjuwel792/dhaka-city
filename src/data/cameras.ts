import type { CameraFeed } from "@/types";

export interface CameraFeedConfig extends CameraFeed {
  location: string;
  videoSrc: string;
  poster: string;
  isDemo: true;
}

/**
 * Local demo footage configuration. Replace the MP4/poster files under
 * `public/videos/` to change the footage without touching UI components.
 * These are NOT live CCTV feeds.
 */
export const CAMERA_FEEDS: CameraFeedConfig[] = [
  {
    id: "mirpur10",
    name: "Mirpur 10 Circle",
    live: false,
    location: "Mirpur 10, Dhaka",
    videoSrc: "/videos/intersection-01.mp4",
    poster: "/videos/poster-intersection-01.jpg",
    isDemo: true,
  },
  {
    id: "avenue5",
    name: "Avenue 5",
    live: false,
    location: "Mirpur DOHS, Dhaka",
    videoSrc: "/videos/street-01.mp4",
    poster: "/videos/poster-street-01.jpg",
    isDemo: true,
  },
  {
    id: "rokeya",
    name: "Begum Rokeya Avenue",
    live: false,
    location: "Dhanmondi, Dhaka",
    videoSrc: "/videos/street-02.mp4",
    poster: "/videos/poster-street-02.jpg",
    isDemo: true,
  },
  {
    id: "highway",
    name: "Dhaka–Aricha Highway",
    live: false,
    location: "Savar, Dhaka",
    videoSrc: "/videos/highway-01.mp4",
    poster: "/videos/poster-highway-01.jpg",
    isDemo: true,
  },
  {
    id: "gulshan",
    name: "Gulshan Avenue",
    live: false,
    location: "Gulshan 2, Dhaka",
    videoSrc: "/videos/street-03.mp4",
    poster: "/videos/poster-street-03.jpg",
    isDemo: true,
  },
];

/** Dashboard thumbnails (first three feeds). */
export const cameraFeeds: CameraFeedConfig[] = CAMERA_FEEDS.slice(0, 3);

/** Full Live Street grid. */
export const liveStreetFeeds: CameraFeedConfig[] = CAMERA_FEEDS;