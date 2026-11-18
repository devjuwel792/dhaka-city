"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Copy, Phone, PhoneCall, ShieldAlert, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { EMERGENCY_CATEGORY_LABELS, emergencyContacts } from "@/data/emergency";
import type { EmergencyCategory } from "@/types";
import { ModalShell } from "@/components/common/ModalShell";
import { cn } from "@/utils/cn";

type CategoryFilter = EmergencyCategory | "all";

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall through to the legacy path.
  }
  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}

export function EmergencyModal() {
  const { isDark, t, lang, showEmergencyModal, setShowEmergencyModal } = useApp();
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!showEmergencyModal) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowEmergencyModal(false);
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [showEmergencyModal, setShowEmergencyModal]);

  const categories = useMemo(() => {
    const seen: EmergencyCategory[] = [];
    for (const contact of emergencyContacts) {
      if (!seen.includes(contact.category)) seen.push(contact.category);
    }
    return seen;
  }, []);

  const visible = useMemo(
    () =>
      filter === "all"
        ? emergencyContacts
        : emergencyContacts.filter((contact) => contact.category === filter),
    [filter],
  );

  if (!showEmergencyModal) return null;

  const handleCopy = async (id: string, number: string) => {
    const ok = await copyText(number);
    if (!ok) return;
    setCopiedId(id);
    window.setTimeout(() => setCopiedId((current) => (current === id ? null : current)), 1800);
  };

  return (
    <ModalShell
      onClose={() => setShowEmergencyModal(false)}
      maxWidth="max-w-xl"
      label={t.emergencyTitle}
    >
      <div
        className={cn(
          "p-5 border-b flex justify-between items-center gap-3",
          isDark ? "border-zinc-800" : "border-gray-100",
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          <Phone className="w-5 h-5 text-red-500 shrink-0" />
          <div className="min-w-0">
            <h3 id="emergency-modal-title" className="font-extrabold text-[15px] truncate">
              {t.emergencyTitle}
            </h3>
            <p className={cn("text-[11px]", isDark ? "text-zinc-500" : "text-gray-400")}>
              {t.emergencySubtitle}
            </p>
          </div>
        </div>
        <button
          ref={closeRef}
          onClick={() => setShowEmergencyModal(false)}
          aria-label={lang === "bn" ? "জরুরি নম্বর প্যানেল বন্ধ করুন" : "Close emergency numbers"}
          className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="px-6 pt-4 flex flex-wrap gap-1.5">
        {(["all", ...categories] as CategoryFilter[]).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            aria-pressed={filter === value}
            className={cn(
              "px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors",
              filter === value
                ? "bg-red-500 text-white border-red-500"
                : isDark
                  ? "border-zinc-700 text-gray-300 hover:bg-zinc-800"
                  : "border-gray-200 text-gray-600 hover:bg-gray-100",
            )}
          >
            {value === "all"
              ? lang === "bn"
                ? "সব"
                : "All"
              : lang === "bn"
                ? EMERGENCY_CATEGORY_LABELS[value].bn
                : EMERGENCY_CATEGORY_LABELS[value].en}
          </button>
        ))}
      </div>

      <div className="p-6 space-y-4 max-h-[380px] overflow-y-auto">
        {visible.map((contact) => {
          const Icon = contact.icon;
          const copied = copiedId === contact.id;
          return (
            <div
              key={contact.id}
              className={cn("p-4 rounded-xl border", contact.color)}
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-full bg-white/80 dark:bg-zinc-950/30 shadow-sm shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-extrabold text-[14px] leading-4">
                    {lang === "bn" ? contact.serviceBn : contact.service}
                  </h4>
                  <p className="text-[11px] leading-4 opacity-80 mt-0.5">
                    {lang === "bn" ? contact.descBn : contact.desc}
                  </p>
                  <p className="text-[9px] opacity-60 mt-1">
                    {lang === "bn" ? "সূত্র" : "Source"}: {contact.source}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-2.5">
                    <a
                      href={`tel:${contact.number.replace(/[^\d+]/g, "")}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-white text-[12px] font-black border border-current rounded-full shadow-sm hover:scale-105 active:scale-95 transition-transform"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      {contact.number}
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy(contact.id, contact.number)}
                      aria-label={
                        lang === "bn"
                          ? `${contact.number} কপি করুন`
                          : `Copy number ${contact.number}`
                      }
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/70 dark:bg-zinc-900/40 text-[11px] font-bold border border-current/30 rounded-full hover:bg-white transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3" />
                          {lang === "bn" ? "কপি হয়েছে" : "Copied"}
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          {lang === "bn" ? "কপি" : "Copy"}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className={cn(
          "p-4 border-t space-y-1",
          isDark ? "border-zinc-800 bg-zinc-900/30" : "border-gray-200 bg-gray-50/50",
        )}
      >
        <p className="flex items-start gap-1.5 text-[10px] text-gray-500 leading-4">
          <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          {lang === "bn"
            ? "শর্ট কোডগুলো (৯৯৯, ১৬১৬৩, ১৬২৬৩, ১৬১৬২) সাধারণত টোল-ফ্রি। সরাসরি নম্বরের ক্ষেত্রে অপারেটর চার্জ প্রযোজ্য হতে পারে।"
            : "Short codes (999, 16163, 16263, 16162) are generally toll-free. Operator charges may apply to direct numbers."}
        </p>
        <p className="text-[10px] text-gray-400">
          {lang === "bn"
            ? "সরকারি উৎস থেকে সংকলিত তালিকা। জরুরি প্রয়োজনে প্রথমে ৯৯৯ ডায়াল করুন।"
            : "Compiled from official public helplines. In an emergency, dial 999 first."}
        </p>
      </div>
    </ModalShell>
  );
}