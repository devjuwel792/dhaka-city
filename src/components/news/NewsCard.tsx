"use client";

import type { NewsArticle } from "@/types";
import { useApp } from "@/context/AppContext";
import { cn } from "@/utils/cn";

interface NewsCardProps {
  article: NewsArticle;
  variant?: "compact" | "full";
  onClick: () => void;
}

export function NewsCard({ article, variant = "full", onClick }: NewsCardProps) {
  const { isDark } = useApp();

  if (variant === "compact") {
    return (
      <div
        onClick={onClick}
        className={cn(
          "rounded-xl overflow-hidden border hover:border-emerald-500 transition-all cursor-pointer group",
          isDark ? "border-zinc-800 bg-zinc-800/20" : "border-gray-100 bg-gray-50/30",
        )}
      >
        <div
          className="h-28 w-full relative flex items-end p-3"
          style={{ background: article.image }}
        >
          <span className="absolute top-2 left-2 bg-black/60 text-white font-bold text-[8px] px-2 py-0.5 rounded-full uppercase tracking-wider">
            {article.tag}
          </span>
          <h4 className="text-[12px] font-extrabold text-white leading-4 drop-shadow group-hover:underline">
            {article.title}
          </h4>
        </div>
        <div className="p-3">
          <p
            className={cn(
              "text-[11px] line-clamp-2 leading-4",
              isDark ? "text-gray-400" : "text-gray-500",
            )}
          >
            {article.summary}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-2xl border p-6 shadow hover:border-[#78D47E] transition-all cursor-pointer flex flex-col md:flex-row gap-6",
        isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200",
      )}
    >
      <div
        className="w-full md:w-48 h-32 rounded-xl flex-shrink-0 flex items-end p-4 relative"
        style={{ background: article.image }}
      >
        <span className="absolute top-3 left-3 bg-black/60 text-white font-bold text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          {article.tag}
        </span>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-lg font-black hover:underline">{article.title}</h4>
          <p
            className={cn(
              "text-[13px] mt-2 leading-6",
              isDark ? "text-gray-400" : "text-gray-600",
            )}
          >
            {article.summary}
          </p>
        </div>
        <span className="text-[12px] text-emerald-500 font-bold mt-4 md:mt-0">
          View demo article →
        </span>
      </div>
    </div>
  );
}