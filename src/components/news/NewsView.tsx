"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Loader2, RefreshCw, Search, WifiOff } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useNewsFeed } from "@/hooks/useNewsFeed";
import { DEFAULT_NEWS_TOPIC, NEWS_TOPICS, newsList } from "@/data/news";
import type { NewsSearchArticle } from "@/services/api";
import { DataFreshness } from "@/components/common/DataFreshness";
import { ExternalNewsCard } from "./ExternalNewsCard";
import { ArticleModal } from "./ArticleModal";
import { NewsCard } from "./NewsCard";
import { cn } from "@/utils/cn";

export function NewsView() {
  const { t, lang, isDark, setShowNewsModal } = useApp();
  const [topicId, setTopicId] = useState(DEFAULT_NEWS_TOPIC.id);
  const [searchInput, setSearchInput] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [selected, setSelected] = useState<NewsSearchArticle | null>(null);

  const topic = useMemo(
    () => NEWS_TOPICS.find((item) => item.id === topicId) ?? DEFAULT_NEWS_TOPIC,
    [topicId],
  );
  const effectiveQuery = submittedSearch.trim() || topic.query;
  const { data, loading, error, fetchedAt, source, isCached, reload } = useNewsFeed(effectiveQuery);
  const articles = data?.articles ?? [];

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmittedSearch(searchInput);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="text-xl font-extrabold">{t.newsInfo}</h3>
          <p className="text-[13px] text-gray-400 mt-0.5">
            {lang === "bn"
              ? "ঢাকার সাম্প্রতিক সংবাদ — GDELT অনুসন্ধান"
              : "Recent Dhaka coverage — search powered by GDELT"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {source && (
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-bold text-gray-400 hover:text-emerald-500"
            >
              {source.name}
            </a>
          )}
          {fetchedAt && <DataFreshness updatedAt={fetchedAt} />}
          <button
            type="button"
            onClick={reload}
            disabled={loading}
            aria-label="Refresh news"
            className={cn(
              "p-2 rounded-lg border transition-colors disabled:opacity-50",
              isDark
                ? "border-zinc-800 hover:bg-zinc-800 text-gray-300"
                : "border-gray-200 hover:bg-gray-100 text-gray-600",
            )}
          >
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
          </button>
        </div>
      </div>

      <form onSubmit={submitSearch} className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder={
              lang === "bn" ? "সংবাদ খুঁজুন (যেমন: মেট্রো)" : "Search news (e.g. metro)"
            }
            aria-label={lang === "bn" ? "সংবাদ খুঁজুন" : "Search news"}
            className={cn(
              "w-full rounded-xl border pl-9 pr-3 py-2 text-[13px] outline-none focus:border-emerald-500",
              isDark
                ? "bg-[#1E1E1E] border-zinc-800 text-white"
                : "bg-white border-gray-200 text-gray-800",
            )}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-[12px] font-bold hover:bg-emerald-600"
        >
          {lang === "bn" ? "খুঁজুন" : "Search"}
        </button>
        {submittedSearch && (
          <button
            type="button"
            onClick={() => {
              setSearchInput("");
              setSubmittedSearch("");
            }}
            className="px-4 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 text-[12px] font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            {lang === "bn" ? "সার্চ মুছুন" : "Clear search"}
          </button>
        )}
      </form>

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="News topics">
        {NEWS_TOPICS.map((item) => {
          const active = !submittedSearch && item.id === topicId;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => {
                setSubmittedSearch("");
                setSearchInput("");
                setTopicId(item.id);
              }}
              className={cn(
                "px-3 py-1.5 rounded-full text-[11px] font-bold border transition-colors",
                active
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : isDark
                    ? "border-zinc-800 text-gray-300 hover:bg-zinc-800"
                    : "border-gray-200 text-gray-600 hover:bg-gray-100",
              )}
            >
              {lang === "bn" ? item.labelBn : item.label}
            </button>
          );
        })}
      </div>

      {submittedSearch && (
        <p className="text-[11px] text-gray-400">
          {lang === "bn" ? "অনুসন্ধান:" : "Search:"} <span className="font-bold">{submittedSearch}</span>
          {isCached && <span className="ml-2 text-amber-500">({lang === "bn" ? "ক্যাশ" : "cached"})</span>}
        </p>
      )}

      {loading && articles.length === 0 && (
        <div className="space-y-4" aria-busy="true">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={cn(
                "rounded-2xl border p-4 flex gap-4 animate-pulse",
                isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200",
              )}
            >
              <div className="w-24 h-20 rounded-xl bg-gray-200 dark:bg-zinc-800" />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-2.5 w-28 rounded bg-gray-200 dark:bg-zinc-800" />
                <div className="h-3 w-3/4 rounded bg-gray-200 dark:bg-zinc-800" />
                <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-zinc-800" />
              </div>
            </div>
          ))}
          <p className="text-center text-[11px] text-gray-400">
            {lang === "bn" ? "সংবাদ লোড হচ্ছে…" : "Loading news…"}
          </p>
        </div>
      )}

      {!loading && articles.length > 0 && (
        <div className="space-y-4">
          {articles.map((article, index) => (
            <ExternalNewsCard
              key={article.id}
              article={article}
              index={index}
              onClick={() => setSelected(article)}
            />
          ))}
        </div>
      )}

      {!loading && !error && articles.length === 0 && (
        <div
          className={cn(
            "rounded-2xl border p-8 text-center",
            isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200",
          )}
        >
          <Search className="w-6 h-6 mx-auto text-gray-300" />
          <p className="text-[13px] font-bold mt-2">
            {lang === "bn" ? "কোনো সাম্প্রতিক সংবাদ পাওয়া যায়নি" : "No recent articles found"}
          </p>
          <p className="text-[11px] text-gray-400 mt-1">
            {lang === "bn"
              ? "অন্য কীওয়ার্ড বা বিষয় বেছে নিন।"
              : "Try another keyword or topic."}
          </p>
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-amber-300 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-950/20 p-4 space-y-2">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 text-[12px] font-bold">
            {error.type === "network" ? (
              <WifiOff className="w-4 h-4" />
            ) : (
              <AlertTriangle className="w-4 h-4" />
            )}
            {lang === "bn" ? "লাইভ সংবাদ পাওয়া যায়নি" : "Live news unavailable"}
          </div>
          <p className="text-[11px] text-amber-700/80 dark:text-amber-300/80">
            {lang === "bn"
              ? "GDELT অনুরোধ ব্যর্থ হয়েছে (রেট লিমিট বা নেটওয়ার্ক)। নিচে ডেমো শিরোনাম দেখানো হচ্ছে — এগুলো লাইভ নয়।"
              : "The GDELT request failed (rate limit or network). The demo headlines below are not live."}
            {error.status ? ` HTTP ${error.status}.` : ""}
          </p>
          <button
            type="button"
            onClick={reload}
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-800 dark:text-amber-200 underline"
          >
            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
            {lang === "bn" ? "আবার চেষ্টা করুন" : "Try again"}
          </button>
        </div>
      )}

      {error && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-black font-extrabold text-[9px] px-2 py-0.5 rounded">
              DEMO
            </span>
            <h4 className="text-[12px] font-bold text-gray-500">
              {lang === "bn"
                ? "ডেমো শিরোনাম — লাইভ রিপোর্ট নয়"
                : "Demo headlines — not live reporting"}
            </h4>
          </div>
          {newsList.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              onClick={() => setShowNewsModal(article.id)}
            />
          ))}
        </div>
      )}

      {selected && <ArticleModal article={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}