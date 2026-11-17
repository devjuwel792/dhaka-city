import type { CameraFeed } from "@/types";

export const cameraFeeds: CameraFeed[] = [
  { id: "mirpur10", name: "Mirpur 10 Circle", live: true },
  { id: "avenue5", name: "Avenue 5", live: true },
  { id: "rokeya", name: "Begum Rokeya Avenue", live: true },
];

/** Full-view variants used by the Live Street screen. */
export const liveStreetFeeds: CameraFeed[] = [
  { id: "mirpur10", name: "Mirpur 10 Circle Intersection", live: true },
  { id: "avenue5", name: "Avenue 5 Bypass Intersection", live: true },
  { id: "rokeya", name: "Begum Rokeya Avenue Southbound", live: true },
];