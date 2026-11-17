"use client";

import { useRef, useState } from "react";
import { HelpCircle, ChevronRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/utils/cn";

const cardClass = "rounded-2xl border p-6 shadow-sm";
const cardCn = (isDark: boolean) =>
  cn(cardClass, isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200");
const inputCn = (isDark: boolean, ringClass = "focus:ring-indigo-500/40") =>
  cn(
    "w-full px-4 py-2.5 rounded-xl border text-[13px] outline-none transition resize-none focus:ring-2",
    ringClass,
    isDark
      ? "bg-zinc-800 border-zinc-700 text-gray-200 placeholder-zinc-500"
      : "bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400",
  );

export function SupportView() {
  const { isDark, t } = useApp();

  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [feedbackSubject, setFeedbackSubject] = useState("");
  const [feedbackDesc, setFeedbackDesc] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const faqs = [
    { id: "q1", q: t.faqQ1, a: t.faqA1 },
    { id: "q2", q: t.faqQ2, a: t.faqA2 },
    { id: "q3", q: t.faqQ3, a: t.faqA3 },
    { id: "q4", q: t.faqQ4, a: t.faqA4 },
    { id: "q5", q: t.faqQ5, a: t.faqA5 },
    { id: "q6", q: t.faqQ6, a: t.faqA6 },
    { id: "q7", q: t.faqQ7, a: t.faqA7 },
    { id: "q8", q: t.faqQ8, a: t.faqA8 },
    { id: "q9", q: t.faqQ9, a: t.faqA9 },
    { id: "q10", q: t.faqQ10, a: t.faqA10 },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <HelpCircle className="w-7 h-7 text-indigo-500" />
        <h2 className="text-2xl font-extrabold tracking-tight">{t.support}</h2>
      </div>

      {/* FAQs */}
      <div className={cardCn(isDark)}>
        <h3 className="font-bold text-[15px] mb-4">{t.supportFaqs}</h3>
        <div className="space-y-2">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={cn(
                "rounded-xl border overflow-hidden",
                isDark ? "border-zinc-800" : "border-gray-100",
              )}
            >
              <button
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                className={cn(
                  "w-full text-left px-4 py-3 flex justify-between items-center font-semibold text-[13px] transition-colors",
                  isDark ? "hover:bg-zinc-800/60" : "hover:bg-gray-50",
                )}
              >
                <span>{faq.q}</span>
                <ChevronRight
                  className={cn(
                    "w-4 h-4 text-gray-400 transition-transform",
                    openFaq === faq.id && "rotate-90",
                  )}
                />
              </button>
              {openFaq === faq.id && (
                <div
                  className={cn(
                    "px-4 pb-4 text-[13px] leading-6",
                    isDark ? "text-gray-400 bg-zinc-800/20" : "text-gray-600 bg-gray-50/50",
                  )}
                >
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className={cardCn(isDark)}>
        <h3 className="font-bold text-[15px] mb-4">{t.supportMessageUs}</h3>
        <div className="space-y-3">
          <input
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            placeholder="Your Name"
            className={inputCn(isDark)}
          />
          <input
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder="Email Address"
            type="email"
            className={inputCn(isDark)}
          />
          <textarea
            value={contactMessage}
            onChange={(e) => setContactMessage(e.target.value)}
            placeholder={t.supportDescribe}
            rows={4}
            className={inputCn(isDark)}
          />
          <button
            onClick={() => {
              alert(t.messageSent);
              setContactName("");
              setContactEmail("");
              setContactMessage("");
            }}
            className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-colors text-[13px]"
          >
            {t.supportSend}
          </button>
        </div>
      </div>

      {/* Feedback Form */}
      <div className={cardCn(isDark)}>
        <h3 className="font-bold text-[15px] mb-1">{t.supportFeedbackTitle}</h3>
        <p className="text-[12px] mb-4 text-gray-400">{t.supportFeedbackDesc}</p>
        <div className="space-y-3">
          <input
            value={feedbackSubject}
            onChange={(e) => setFeedbackSubject(e.target.value)}
            placeholder={t.supportSubject}
            className={inputCn(isDark, "focus:ring-emerald-500/40")}
          />
          <textarea
            value={feedbackDesc}
            onChange={(e) => setFeedbackDesc(e.target.value)}
            placeholder={t.supportDescribe}
            rows={4}
            className={inputCn(isDark, "focus:ring-emerald-500/40")}
          />
          <div
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-xl border cursor-pointer transition",
              isDark ? "bg-zinc-800 border-zinc-700" : "bg-gray-50 border-gray-200",
            )}
            onClick={() => fileInputRef.current?.click()}
          >
            <span className={cn("text-[13px]", isDark ? "text-zinc-400" : "text-gray-500")}>
              {selectedFile ? selectedFile.name : t.supportUpload}
            </span>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
            />
          </div>
          <button
            onClick={() => {
              alert(t.feedbackSent);
              setFeedbackSubject("");
              setFeedbackDesc("");
              setSelectedFile(null);
            }}
            className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors text-[13px]"
          >
            {t.supportSubmitFeedback}
          </button>
        </div>
      </div>

      {/* Contact Info */}
      <div className={cardCn(isDark)}>
        <h3 className="font-bold text-[15px] mb-2">{t.supportContactInfo}</h3>
        <p className={cn("text-[13px]", isDark ? "text-gray-400" : "text-gray-600")}>
          {t.contactDetails}
        </p>
      </div>
    </div>
  );
}
