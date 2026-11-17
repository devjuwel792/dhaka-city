"use client";

import { cn } from "@/utils/cn";
import { useApp } from "@/context/AppContext";

interface ModalShellProps {
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
}

/** Overlay + centered panel wrapper shared by all modals. */
export function ModalShell({ onClose, children, maxWidth = "max-w-4xl", className }: ModalShellProps) {
  const { isDark } = useApp();
  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-all"
      onClick={onClose}
    >
      <div
        className={cn(
          "w-full rounded-2xl overflow-hidden shadow-2xl border",
          isDark
            ? "bg-[#1E1E1E] border-zinc-800 text-white"
            : "bg-white border-gray-200 text-gray-800",
          maxWidth,
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}