"use client";

import { useApp } from "@/context/AppContext";
import { primaryNav, secondaryNav } from "@/constants";
import { cn } from "@/utils/cn";

export function Sidebar() {
  const { isDark, setActiveTab, activeTab, t } = useApp();

  const renderItem = (item: (typeof primaryNav)[number]) => {
    const Icon = item.icon;
    const isActive = activeTab === item.id;
    return (
      <button
        key={item.id}
        onClick={() => setActiveTab(item.id)}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium transition-all duration-150",
          isActive
            ? "bg-[#78D47E] text-white shadow-sm"
            : isDark
              ? "text-gray-400 hover:bg-zinc-800/60 hover:text-white"
              : "text-gray-600 hover:bg-gray-100/80 hover:text-gray-900",
        )}
      >
        <Icon className={cn("w-5 h-5", isActive ? "text-white" : isDark ? "text-gray-400" : "text-gray-500")} />
        <span>{t[item.id]}</span>
      </button>
    );
  };

  return (
    <aside
      className={cn(
        "w-[250px] flex-shrink-0 hidden md:flex flex-col border-r py-6 z-10 relative",
        isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200",
      )}
    >
      <div className="px-6 pb-4">
        <h1 className="text-[28px] font-extrabold tracking-wider text-[#4CAF50] transition-transform duration-300 hover:scale-105 select-none">
          {t.logo}
        </h1>
      </div>

      <div className={cn("mx-6 mb-6 border-b", isDark ? "border-zinc-800" : "border-gray-100")} />

      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
        {primaryNav.map(renderItem)}

        <div className={cn("my-4 border-b", isDark ? "border-zinc-800" : "border-gray-100")} />

        {secondaryNav.map(renderItem)}
      </nav>
    </aside>
  );
}