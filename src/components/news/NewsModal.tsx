"use client";

import { X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { newsList } from "@/data/news";
import { ModalShell } from "@/components/common/ModalShell";

export function NewsModal() {
  const { showNewsModal, setShowNewsModal, isDark } = useApp();

  if (showNewsModal === null) return null;
  const article = newsList.find((n) => n.id === showNewsModal);
  if (!article) return null;

  return (
    <ModalShell onClose={() => setShowNewsModal(null)} maxWidth="max-w-lg">
      <div
        className="h-44 w-full relative flex items-end p-5"
        style={{ background: article.image }}
      >
        <span className="absolute top-4 left-4 bg-black/60 text-white font-bold text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          {article.tag}
        </span>
        <button
          onClick={() => setShowNewsModal(null)}
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
        <p className="text-[12px] leading-5 text-gray-400">
          Reported by Dhaka Smart City Information Desk. Updates are logged directly via emergency
          transport frequencies.
        </p>
      </div>

      <div
        className={
          isDark
            ? "p-4 border-t border-zinc-800 bg-zinc-900/30 flex justify-between items-center text-xs"
            : "p-4 border-t border-gray-150 bg-gray-50/50 flex justify-between items-center text-xs"
        }
      >
        <span className="text-gray-400">Published: Dec 13, 2024</span>
        <button
          onClick={() => setShowNewsModal(null)}
          className="px-4 py-1.5 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors"
        >
          Close Article
        </button>
      </div>
    </ModalShell>
  );
}