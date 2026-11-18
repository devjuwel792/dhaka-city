"use client";

import { X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { newsList } from "@/data/news";
import { ModalShell } from "@/components/common/ModalShell";

/** Demo article detail. Sample content — not live reporting. */
export function NewsModal() {
  const { showNewsModal, setShowNewsModal, isDark, lang } = useApp();

  if (showNewsModal === null) return null;
  const article = newsList.find((n) => n.id === showNewsModal);
  if (!article) return null;

  return (
    <ModalShell onClose={() => setShowNewsModal(null)} maxWidth="max-w-lg" label={article.title}>
      <div
        className="h-44 w-full relative flex items-end p-5"
        style={{ background: article.image }}
      >
        <span className="absolute top-4 left-4 bg-black/60 text-white font-bold text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          {article.tag}
        </span>
        <span className="absolute top-4 left-32 bg-amber-400 text-black font-extrabold text-[9px] px-2 py-0.5 rounded">
          DEMO
        </span>
        <button
          onClick={() => setShowNewsModal(null)}
          aria-label="Close article"
          className="absolute top-4 right-4 p-1.5 rounded-full bg-black/30 hover:bg-black/65 text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <h3 className="text-xl font-black text-white leading-6 drop-shadow">{article.title}</h3>
      </div>

      <div className="p-6 space-y-4">
        <p
          className={
            isDark
              ? "text-[13px] leading-6 font-medium text-gray-300"
              : "text-[13px] leading-6 font-medium text-gray-700"
          }
        >
          {article.full}
        </p>
        <p className="text-[11px] leading-5 text-gray-400">
          {lang === "bn"
            ? "এটি একটি নমুনা সংবাদ, লাইভ রিপোর্ট নয়। কোনো প্রকাশক বা তারিখ যুক্ত করা হয়নি।"
            : "This is sample content, not a live report. No publisher or publication date is claimed."}
        </p>
      </div>

      <div
        className={
          isDark
            ? "p-4 border-t border-zinc-800 bg-zinc-900/30 flex justify-between items-center text-xs"
            : "p-4 border-t border-gray-150 bg-gray-50/50 flex justify-between items-center text-xs"
        }
      >
        <span className="text-amber-500 font-bold">
          {lang === "bn" ? "ডেমো কনটেন্ট" : "Demo content"}
        </span>
        <button
          onClick={() => setShowNewsModal(null)}
          className="px-4 py-1.5 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors"
        >
          {lang === "bn" ? "বন্ধ করুন" : "Close Article"}
        </button>
      </div>
    </ModalShell>
  );
}