"use client";

import { useApp } from "@/context/AppContext";
import { useNews } from "@/hooks/useNews";
import { NewsCard } from "./NewsCard";

export function NewsView() {
  const { t, setShowNewsModal } = useApp();
  const { data: newsList } = useNews();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h3 className="text-xl font-extrabold">{t.newsInfo}</h3>
        <p className="text-[13px] text-gray-400 mt-0.5">
          City alerts, public announcements, and transport news
        </p>
      </div>

      <div className="space-y-6">
        {newsList.map((article) => (
          <NewsCard
            key={article.id}
            article={article}
            onClick={() => setShowNewsModal(article.id)}
          />
        ))}
      </div>
    </div>
  );
}