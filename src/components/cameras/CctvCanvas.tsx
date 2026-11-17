"use client";

import { useRef } from "react";
import { useCctvCanvas } from "@/hooks/useCctvCanvas";
import { cn } from "@/utils/cn";

interface CctvCanvasProps {
  feedId: string;
  width: number;
  height: number;
  className?: string;
}

/** Animated CCTV simulation canvas for a given camera feed. */
export function CctvCanvas({ feedId, width, height, className }: CctvCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  useCctvCanvas(ref, true);

  return (
    <canvas
      ref={ref}
      data-camid={feedId}
      width={width}
      height={height}
      className={cn("w-full h-full block", className)}
    />
  );
}