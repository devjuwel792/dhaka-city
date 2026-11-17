import { cn } from "@/utils/cn";

interface GaugeProps {
  pct: number;
  label?: string;
  stroke: string;
  isDark: boolean;
  size?: number;
  radius?: number;
  strokeWidth?: number;
  textClassName?: string;
  labelClassName?: string;
}

/** Reusable circular progress gauge (SVG stroke-dasharray). */
export function Gauge({
  pct,
  label,
  stroke,
  isDark,
  size = 64,
  radius = 24,
  strokeWidth = 5,
  textClassName = "text-[12px]",
  labelClassName = "text-[10px]",
}: GaugeProps) {
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke={isDark ? "#2D2D30" : "#F3F4F6"}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <span className={cn("absolute font-extrabold", textClassName)}>{pct}%</span>
      </div>
      {label && (
        <span className={cn("text-gray-400 font-bold mt-1.5 text-center block", labelClassName)}>
          {label}
        </span>
      )}
    </div>
  );
}