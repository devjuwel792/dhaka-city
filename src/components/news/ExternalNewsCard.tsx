"use client";

import { ArrowUpRight, Globe2 } from "lucide-react";
import type { NewsSearchArticle } from "@/services/api";
import { useApp } from "@/context/AppContext";
import { formatRelativeTime } from "@/utils/datetime";
import { cn } from "@/utils/cn";

const ACCENTS = [
  "linear-gradient(135deg, #0ea5e9, #0284c7)",
  "linear-gradient(135deg, #10b981, #047857)",
  "linear-gradient(135deg, #8b5cf6, #6d28d9)",
  "linear-gradient(135deg, #f59e0b, #d97706)",
  "linear-gradient(135deg, #ec4899, #be185d)",
  "linear-gradient(135deg, #64748b, #334155)",
];

interface ExternalNewsCardProps {
  article: NewsSearchArticle;
  index: number;
  onClick: () => void;
}

/** Summarizes a GDELT headline; the full story lives on the publisher's site. */
export function ExternalNewsCard({ article, index, onClick }: ExternalNewsCardProps) {
  const { isDark, lang } = useApp();
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open summary for ${article.title}`}
      className={cn(
        "group w-full text-left rounded-2xl border p-4 shadow-sm transition-all hover:border-emerald-500 focus-visible:outline-2 focus-visible:outline-emerald-500",
        isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200",
      )}
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <div
          className="w-full sm:w-28 h-20 sm:h-auto rounded-xl shrink-0 flex items-center justify-center"
          style={{ background: accent }}
        >
          <Globe2 className="w-7 h-7 text-white/90" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-bold uppercase tracking-wide text-gray-400">
            <span className="text-emerald-500 truncate max-w-[180px]">
              {article.domain || "Unknown source"}
            </span>
            <span aria-hidden="true">·</span>
            <span>{formatRelativeTime(article.publishedAt, lang)}</span>
            {article.country && (
              <>
                <span aria-hidden="true">·</span>
                <span>{article.country}</span>
              </>
            )}
          </div>
          <h4 className="text-[14px] font-extrabold leading-5 mt-1.5 group-hover:underline">
            {article.title}
          </h4>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-500 mt-2">
            {lang === "bn" ? "প্রকাশকের সাইটে পড়ুন" : "Read at publisher"}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </button>
  );
}