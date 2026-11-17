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
      <h3 className="font-bold text-[15px] tracking-tight mb-4">{t.latestInArea}</h3>
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