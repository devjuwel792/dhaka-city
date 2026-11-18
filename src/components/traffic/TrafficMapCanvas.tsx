"use client";

import dynamic from "next/dynamic";
import { Loading } from "@/components/common/Loading";
import type { Lang } from "@/types";

const TrafficMap = dynamic(
  () => import("./TrafficMap").then((mod) => mod.TrafficMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
        <Loading label="Loading traffic map..." size="md" />
      </div>
    ),
  },
);

export function TrafficMapCanvas({ lang, className }: { lang: Lang; className?: string }) {
  return <TrafficMap lang={lang} className={className} />;
}