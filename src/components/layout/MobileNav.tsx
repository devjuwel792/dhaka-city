"use client";

import { useApp } from "@/context/AppContext";
import { primaryNav, secondaryNav } from "@/constants";
import { cn } from "@/utils/cn";

/** Horizontal navigation for small screens, where the sidebar is hidden. */
export function MobileNav() {
  const { isDark, setActiveTab, activeTab, t } = useApp();
  const items = [...primaryNav, ...secondaryNav];

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "md:hidden flex gap-1.5 overflow-x-auto px-3 py-2 border-b",
        isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200",
      )}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const active = activeTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveTab(item.id)}
            aria-current={active ? "page" : undefined}
            className={cn(
              "shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-colors",
              active
                ? "bg-[#78D47E] text-white"
                : isDark
                  ? "text-gray-300 hover:bg-zinc-800"
                  : "text-gray-600 hover:bg-gray-100",
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            {t[item.id]}
          </button>
        );
      })}
    </nav>
  );
}