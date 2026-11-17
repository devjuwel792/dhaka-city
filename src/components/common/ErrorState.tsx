import { AlertCircle } from "lucide-react";
import { cn } from "@/utils/cn";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

/** Reusable error state with optional retry. */
export function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this data. Please try again.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-10 text-center",
        className,
      )}
    >
      <AlertCircle className="w-8 h-8 text-red-500" />
      <div>
        <p className="text-[14px] font-bold text-gray-700 dark:text-gray-200">{title}</p>
        <p className="text-[12px] text-gray-400 mt-0.5">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-1.5 rounded-full bg-red-500 text-white text-[12px] font-bold hover:bg-red-600 transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  );
}