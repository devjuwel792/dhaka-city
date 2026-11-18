"use client";

import { useEffect } from "react";
import { ArrowUpRight, Info, X } from "lucide-react";
import type { NewsSearchArticle } from "@/services/api";
import { useApp } from "@/context/AppContext";
import { ModalShell } from "@/components/common/ModalShell";
import { formatRelativeTime } from "@/utils/datetime";

interface ArticleModalProps {
  article: NewsSearchArticle;
  onClose: () => void;
}

/**
 * Headline preview for an external article. GDELT returns metadata only, so
 * the body text is never copied; users continue on the publisher's site.
 */
export function ArticleModal({ article, onClose }: ArticleModalProps) {
  const { isDark, lang } = useApp();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <ModalShell onClose={onClose} maxWidth="max-w-lg" label={article.title}>
      <div className="relative p-6 pb-4 bg-emerald-500 text-white">
        <button
          onClick={onClose}
          aria-label={lang === "bn" ? "বন্ধ করুন" : "Close article summary"}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <p className="text-[10px] font-bold uppercase tracking-widest opacity-90">
          {article.domain || "External source"}
        </p>
        <h3 className="text-lg font-black leading-6 mt-1 pr-8">{article.title}</h3>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-start gap-2 text-[12px] text-gray-500">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <p>
            {lang === "bn"
              ? "GDELT শুধু শিরোনাম ও লিংক দেয়। সম্পূর্ণ সংবাদ প্রকাশকের সাইটে পড়ুন।"
              : "GDELT provides headline metadata only. Read the full story on the publisher's site."}
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-3 text-[12px]">
          <div>
            <dt className="text-gray-400 font-bold uppercase text-[9px] tracking-wide">
              {lang === "bn" ? "প্রকাশিত" : "Published"}
            </dt>
            <dd className={isDark ? "text-gray-200" : "text-gray-700"}>
              {formatRelativeTime(article.publishedAt, lang)}
            </dd>
          </div>
          <div>
            <dt className="text-gray-400 font-bold uppercase text-[9px] tracking-wide">
              {lang === "bn" ? "ভাষা" : "Language"}
            </dt>
            <dd className={isDark ? "text-gray-200" : "text-gray-700"}>
              {article.language || "—"}
            </dd>
          </div>
        </dl>
      </div>

      <div
        className={
          isDark
            ? "p-4 border-t border-zinc-800 bg-zinc-900/30 flex justify-between items-center gap-3"
            : "p-4 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center gap-3"
        }
      >
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-white text-xs font-bold rounded-lg hover:bg-emerald-600 transition-colors"
        >
          {lang === "bn" ? "প্রকাশকের সাইটে যান" : "Open at publisher"}
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
        <button
          onClick={onClose}
          className="px-4 py-2 text-xs font-bold rounded-lg text-gray-500 hover:bg-gray-200/60 dark:hover:bg-zinc-800 transition-colors"
        >
          {lang === "bn" ? "বন্ধ করুন" : "Close"}
        </button>
      </div>
    </ModalShell>
  );
}