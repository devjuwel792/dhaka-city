"use client";

import { Phone, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { emergencyContacts } from "@/data/emergency";
import { ModalShell } from "@/components/common/ModalShell";
import { cn } from "@/utils/cn";

export function EmergencyModal() {
  const { isDark, t, showEmergencyModal, setShowEmergencyModal } = useApp();

  if (!showEmergencyModal) return null;

  return (
    <ModalShell onClose={() => setShowEmergencyModal(false)} maxWidth="max-w-xl">
      <div
        className={cn(
          "p-5 border-b flex justify-between items-center",
          isDark ? "border-zinc-800" : "border-gray-100",
        )}
      >
        <div className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-red-500" />
          <div>
            <h3 className="font-extrabold text-[15px]">{t.emergencyTitle}</h3>
            <p className={cn("text-[11px]", isDark ? "text-zinc-500" : "text-gray-400")}>
              {t.emergencySubtitle}
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowEmergencyModal(false)}
          className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-4 max-h-[420px] overflow-y-auto">
        {emergencyContacts.map((contact, idx) => {
          const Icon = contact.icon;
          return (
            <div
              key={idx}
              className={cn("p-4 rounded-xl border flex items-center justify-between gap-4", contact.color)}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-white dark:bg-zinc-950/20 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[14px]">{contact.service}</h4>
                  <p className="text-[11px] leading-4 opacity-80 mt-0.5">{contact.desc}</p>
                </div>
              </div>
              <a
                href={`tel:${contact.number}`}
                className="px-4 py-2 bg-white text-[13px] font-black border border-current rounded-full shadow-sm hover:scale-105 active:scale-95 transition-transform"
              >
                📞 {contact.number}
              </a>
            </div>
          );
        })}
      </div>

      <div
        className={cn(
          "p-4 text-center border-t",
          isDark ? "border-zinc-800 bg-zinc-900/30" : "border-gray-150 bg-gray-50/50",
        )}
      >
        <span className="text-[11px] text-red-500 font-bold">
          Standard operator call rates may apply. Dial 999 for immediate toll-free police.
        </span>
      </div>
    </ModalShell>
  );
}