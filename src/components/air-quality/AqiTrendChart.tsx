"use client";

import { AlertCircle } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { formatHourLabel } from "@/utils/datetime";
import { cn } from "@/utils/cn";
import { categoryForUsAqi, AQI_CHART_MAX } from "@/utils/airQuality";

const W = 600;
const H = 170;
const PAD_X = 12;
const PAD_TOP = 14;
const PAD_BOTTOM = 24;

/** Hourly US AQI pollution trend (real CAMS model forecast, nulls skipped). */
export function AqiTrendChart() {
  const { isDark, t, airQuality } = useApp();

  const shell = cn(
    "rounded-2xl border p-6 shadow-sm",
    isDark ? "border-zinc-800 bg-[#1E1E1E]" : "border-gray-200 bg-white",
  );

  if (!airQuality.data) {
    if (airQuality.loading) {
      return (
        <div className={shell}>
          <div className="h-4 w-32 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mb-4" />
          <div className="h-40 w-full bg-gray-100 dark:bg-zinc-800/40 rounded animate-pulse" />
        </div>
      );
    }
    return (
      <div className={cn(shell, "flex items-center justify-center gap-2 py-8")}>
        <AlertCircle className="w-6 h-6 text-red-500" />
        <span className="text-[13px] text-gray-400">{t.airQualityUnavailable}</span>
      </div>
    );
  }

  const { hourly, current } = airQuality.data;
  const startIndex = Math.max(
    0,
    hourly.findIndex((h) => h.time >= current.time),
  );
  const slice = hourly.slice(startIndex, startIndex + 24);
  const count = slice.length;

  const values = slice.map((h) => h.usAqi);
  const highest = values.reduce<number>((max, v) => (v != null && v > max ? v : max), AQI_CHART_MAX);
  const innerW = W - PAD_X * 2;
  const innerH = H - PAD_TOP - PAD_BOTTOM;
  const xFor = (i: number) => PAD_X + (count <= 1 ? 0 : (i / (count - 1)) * innerW);
  const yFor = (v: number) => PAD_TOP + innerH - (Math.min(v, highest) / highest) * innerH;

  const points = slice
    .map((h, i) =>
      h.usAqi != null ? { x: xFor(i), y: yFor(h.usAqi), v: h.usAqi } : null,
    )
    .filter((p): p is { x: number; y: number; v: number } => p !== null);

  const line = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const lineColor = categoryForUsAqi(current.usAqi)?.color ?? "#0EA5E9";

  const gridValues = [0, highest / 2, highest];
  const labelIndices = [0, 6, 12, 18, 23].filter((i) => i < count);

  return (
    <div className={shell}>
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-bold text-[15px] tracking-tight">{t.aqiTrend}</h3>
        <span className="text-[9px] font-bold text-gray-400">{t.usAqi}</span>
      </div>
      <p className="text-[10px] text-gray-400 mb-3">{t.aqiTrendSubtitle}</p>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={t.aqiTrend}>
        {gridValues.map((v) => {
          const y = yFor(v);
          return (
            <g key={v}>
              <line
                x1={PAD_X}
                x2={W - PAD_X}
                y1={y}
                y2={y}
                stroke={isDark ? "#3F3F46" : "#E5E7EB"}
                strokeWidth="1"
              />
              <text x={PAD_X} y={y - 3} fontSize="9" fill="#9CA3AF" fontWeight="700">
                {Math.round(v)}
              </text>
            </g>
          );
        })}

        {line && (
          <polyline
            points={line}
            fill="none"
            stroke={lineColor}
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        )}

        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2" fill={lineColor} />
        ))}

        {labelIndices.map((i) => (
          <text
            key={i}
            x={xFor(i)}
            y={H - 6}
            fontSize="9"
            fill="#9CA3AF"
            fontWeight="700"
            textAnchor={i === 0 ? "start" : i === count - 1 ? "end" : "middle"}
          >
            {formatHourLabel(slice[i].time)}
          </text>
        ))}
      </svg>
    </div>
  );
}