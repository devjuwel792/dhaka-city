"use client";

import { useApp } from "@/context/AppContext";
import { useNews } from "@/hooks/useNews";
import { NewsCard } from "@/components/news/NewsCard";
import { cn } from "@/utils/cn";

export function NewsWidget() {
  const { isDark, t, setShowNewsModal } = useApp();
  const { data: newsList } = useNews();

  return (
    <div
      className={cn(
        "rounded-2xl border p-5 shadow-sm",
        isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200",
      )}
    >
      <div className="flex items-center justify-between gap-2 mb-4">
        <h3 className="font-bold text-[15px] tracking-tight">{t.latestInArea}</h3>
        <span
          className="bg-amber-400 text-black font-extrabold text-[8px] px-1.5 py-0.5 rounded"
          title="Sample headlines, not live reporting"
        >
          DEMO
        </span>
      </div>
      <div className="space-y-4">
        {newsList.map((article) => (
          <NewsCard
            key={article.id}
            article={article}
            variant="compact"
            onClick={() => setShowNewsModal(article.id)}
          />
        ))}
      </div>
    </div>
  );
}