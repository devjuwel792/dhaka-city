import { Inbox } from "lucide-react";
import { cn } from "@/utils/cn";

interface EmptyStateProps {
  title?: string;
  message?: string;
  className?: string;
}

/** Reusable empty state. */
export function EmptyState({
  title = "Nothing here yet",
  message = "No items match the current view.",
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-10 text-center text-gray-400",
        className,
      )}
    >
      <Inbox className="w-8 h-8" />
      <div>
        <p className="text-[14px] font-bold">{title}</p>
        {message && <p className="text-[12px] mt-0.5">{message}</p>}
      </div>
    </div>
  );
}