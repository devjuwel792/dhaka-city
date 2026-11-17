import { STATUS_COLORS } from "@/config";
import { cn } from "@/utils/cn";
import type { StatusColor } from "@/types";

interface DotProps {
  color: StatusColor;
  className?: string;
}

export function StatusDot({ color, className }: DotProps) {
  return <span className={cn("w-2.5 h-2.5 rounded-full", STATUS_COLORS[color].dot, className)} />;
}

interface StatusBadgeProps {
  status: string;
  color: StatusColor;
  className?: string;
  dotClassName?: string;
  textClassName?: string;
}

export function StatusBadge({
  status,
  color,
  className,
  dotClassName,
  textClassName,
}: StatusBadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 font-bold", className)}>
      <span className={cn("w-2.5 h-2.5 rounded-full", STATUS_COLORS[color].dot, dotClassName)} />
      <span className={cn(STATUS_COLORS[color].text, textClassName)}>{status}</span>
    </span>
  );
}

export interface LegendItem {
  label: string;
  color: StatusColor;
}

export function Legend({ items, className }: { items: LegendItem[]; className?: string }) {
  return (
    <div className={cn("flex gap-2.5 text-[10px] font-bold text-gray-400", className)}>
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1">
          <span className={cn("w-2 h-2 rounded-full", STATUS_COLORS[item.color].dot)} />
          {item.label}
        </span>
      ))}
    </div>
  );
}