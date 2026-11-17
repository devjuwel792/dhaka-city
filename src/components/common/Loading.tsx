import { cn } from "@/utils/cn";

interface LoadingProps {
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-5 h-5",
  md: "w-8 h-8",
  lg: "w-12 h-12",
} as const;

/** Reusable loading spinner. */
export function Loading({ label = "Loading...", className, size = "md" }: LoadingProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 py-10", className)}>
      <div
        className={cn(
          "rounded-full border-2 border-gray-200 border-t-emerald-500 animate-spin dark:border-zinc-700 dark:border-t-emerald-500",
          sizeMap[size],
        )}
      />
      {label && <span className="text-[12px] text-gray-400 font-semibold">{label}</span>}
    </div>
  );
}