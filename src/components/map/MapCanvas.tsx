"use client";

import dynamic from "next/dynamic";
import { Loading } from "@/components/common/Loading";
import type { DhakaMapProps } from "./DhakaMap";

/**
 * Leaflet touches `window`, so the map is loaded client-side only. This keeps
 * Next.js SSR/static generation safe while the map still works after hydration.
 */
const DhakaMap = dynamic(() => import("./DhakaMap").then((mod) => mod.DhakaMap), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
      <Loading label="Loading map..." size="md" />
    </div>
  ),
});

export function MapCanvas(props: DhakaMapProps) {
  return <DhakaMap {...props} />;
}