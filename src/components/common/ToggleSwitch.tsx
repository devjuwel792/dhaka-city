"use client";

import { cn } from "@/utils/cn";
import { useApp } from "@/context/AppContext";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  /** Tailwind bg class for the "on" state (default emerald). */
  onColor?: string;
  ariaLabel?: string;
}

/** Reusable on/off switch used throughout Settings. */
export function ToggleSwitch({
  checked,
  onChange,
  onColor = "bg-emerald-500",
  ariaLabel,
}: ToggleSwitchProps) {
  const { isDark } = useApp();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex w-12 h-6 rounded-full transition-colors duration-300",
        checked ? onColor : isDark ? "bg-zinc-700" : "bg-gray-200",
      )}
    >
      <span
        className={cn(
          "inline-block w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-300 mt-0.5",
          checked ? "translate-x-6" : "translate-x-0.5",
        )}
      />
    </button>
  );
}