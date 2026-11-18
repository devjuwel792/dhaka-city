"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";
import { useApp } from "@/context/AppContext";

interface ModalShellProps {
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
  /** Accessible name for the dialog. */
  label?: string;
}

/** Overlay + centered panel wrapper shared by all modals. */
export function ModalShell({
  onClose,
  children,
  maxWidth = "max-w-4xl",
  className,
  label,
}: ModalShellProps) {
  const { isDark } = useApp();
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-all"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
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