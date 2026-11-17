import { cn } from "@/utils/cn";

interface CardProps {
  isDark: boolean;
  className?: string;
  children: React.ReactNode;
}

/** Standard dashboard card surface (dark/light aware). Padding is caller-controlled. */
export function Card({ isDark, className, children }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border shadow-sm",
        isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200",
        className,
      )}
    >
      {children}
    </div>
  );
}