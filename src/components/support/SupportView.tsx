"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, ChevronRight, HelpCircle, Search, Upload, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { STORAGE_PREFIX } from "@/services/storage";
import { cn } from "@/utils/cn";

const cardClass = "rounded-2xl border p-6 shadow-sm";
const cardCn = (isDark: boolean) =>
  cn(cardClass, isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200");
const inputCn = (isDark: boolean, ringClass = "focus:ring-indigo-500/40", invalid = false) =>
  cn(
    "w-full px-4 py-2.5 rounded-xl border text-[13px] outline-none transition resize-none focus:ring-2",
    ringClass,
    invalid && "border-red-400 focus:ring-red-400/40",
    isDark
      ? "bg-zinc-800 border-zinc-700 text-gray-200 placeholder-zinc-500"
      : "bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400",
  );

const CONTACT_DRAFT_KEY = `${STORAGE_PREFIX}support-contact-draft`;
const FEEDBACK_DRAFT_KEY = `${STORAGE_PREFIX}support-feedback-draft`;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/webp", "application/pdf"];

interface ContactDraft {
  name: string;
  email: string;
  message: string;
}

interface FeedbackDraft {
  subject: string;
  description: string;
}

function readDraft<T>(key: string): Partial<T> | null {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;
    return parsed as Partial<T>;
  } catch {
    return null;
  }
}

function writeDraft(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Drafts are a convenience; ignore storage failures.
  }
}

export function SupportView() {
  const { isDark, t, lang } = useApp();

  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [faqQuery, setFaqQuery] = useState("");

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [contactSent, setContactSent] = useState(false);

  const [feedbackSubject, setFeedbackSubject] = useState("");
  const [feedbackDesc, setFeedbackDesc] = useState("");
  const [feedbackErrors, setFeedbackErrors] = useState<Record<string, string>>({});
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [draftsReady, setDraftsReady] = useState(false);

  const faqs = useMemo(
    () => [
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
    ],
    [t],
  );

  const filteredFaqs = useMemo(() => {
    const needle = faqQuery.trim().toLowerCase();
    if (!needle) return faqs;
    return faqs.filter(
      (faq) =>
        faq.q.toLowerCase().includes(needle) || faq.a.toLowerCase().includes(needle),
    );
  }, [faqs, faqQuery]);

  useEffect(() => {
    let cancelled = false;
    // Defer to after hydration so restored drafts never cause an SSR mismatch.
    queueMicrotask(() => {
      if (cancelled) return;
      const contact = readDraft<ContactDraft>(CONTACT_DRAFT_KEY);
      if (contact) {
        if (typeof contact.name === "string") setContactName(contact.name);
        if (typeof contact.email === "string") setContactEmail(contact.email);
        if (typeof contact.message === "string") setContactMessage(contact.message);
      }
      const feedback = readDraft<FeedbackDraft>(FEEDBACK_DRAFT_KEY);
      if (feedback) {
        if (typeof feedback.subject === "string") setFeedbackSubject(feedback.subject);
        if (typeof feedback.description === "string") setFeedbackDesc(feedback.description);
      }
      setDraftsReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!draftsReady) return;
    writeDraft(CONTACT_DRAFT_KEY, {
      name: contactName,
      email: contactEmail,
      message: contactMessage,
    });
  }, [draftsReady, contactName, contactEmail, contactMessage]);

  useEffect(() => {
    if (!draftsReady) return;
    writeDraft(FEEDBACK_DRAFT_KEY, { subject: feedbackSubject, description: feedbackDesc });
  }, [draftsReady, feedbackSubject, feedbackDesc]);

  const submitContact = (event: React.FormEvent) => {
    event.preventDefault();
    const errors: Record<string, string> = {};
    if (contactName.trim().length < 2) {
      errors.name = lang === "bn" ? "অন্তত ২ অক্ষরের নাম দিন।" : "Enter at least 2 characters.";
    }
    if (!EMAIL_RE.test(contactEmail.trim())) {
      errors.email = lang === "bn" ? "সঠিক ইমেইল দিন।" : "Enter a valid email address.";
    }
    if (contactMessage.trim().length < 10) {
      errors.message =
        lang === "bn" ? "অন্তত ১০ অক্ষরের বার্তা লিখুন।" : "Write at least 10 characters.";
    }
    setContactErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setContactSent(true);
    setContactName("");
    setContactEmail("");
    setContactMessage("");
    try {
      window.localStorage.removeItem(CONTACT_DRAFT_KEY);
    } catch {
      // ignore
    }
  };

  const onFileChange = (file: File | null) => {
    setFileError(null);
    if (!file) {
      setSelectedFile(null);
      return;
    }
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setFileError(
        lang === "bn"
          ? "শুধু PNG, JPEG, WebP বা PDF ফাইল অনুমোদিত।"
          : "Only PNG, JPEG, WebP or PDF files are allowed.",
      );
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setFileError(lang === "bn" ? "ফাইলের আকার ৫ MB-এর কম হতে হবে।" : "File must be under 5 MB.");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setSelectedFile(file);
  };

  const submitFeedback = (event: React.FormEvent) => {
    event.preventDefault();
    const errors: Record<string, string> = {};
    if (feedbackSubject.trim().length < 3) {
      errors.subject =
        lang === "bn" ? "অন্তত ৩ অক্ষরের বিষয় লিখুন।" : "Enter a subject of 3+ characters.";
    }
    if (feedbackDesc.trim().length < 10) {
      errors.description =
        lang === "bn" ? "অন্তত ১০ অক্ষরের বিবরণ লিখুন।" : "Describe it in at least 10 characters.";
    }
    setFeedbackErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setFeedbackSent(true);
    setFeedbackSubject("");
    setFeedbackDesc("");
    setSelectedFile(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    try {
      window.localStorage.removeItem(FEEDBACK_DRAFT_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <HelpCircle className="w-7 h-7 text-indigo-500" />
        <h2 className="text-2xl font-extrabold tracking-tight">{t.support}</h2>
      </div>

      <div className={cardCn(isDark)}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="font-bold text-[15px]">{t.supportFaqs}</h3>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={faqQuery}
              onChange={(event) => setFaqQuery(event.target.value)}
              placeholder={lang === "bn" ? "FAQ খুঁজুন" : "Search FAQs"}
              aria-label={lang === "bn" ? "সাধারণ জিজ্ঞাসা খুঁজুন" : "Search frequently asked questions"}
              className={cn(
                "w-full pl-9 pr-8 py-2 rounded-xl border text-[12px] outline-none focus:border-indigo-500",
                isDark
                  ? "bg-zinc-800 border-zinc-700 text-gray-200 placeholder-zinc-500"
                  : "bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400",
              )}
            />
            {faqQuery && (
              <button
                type="button"
                onClick={() => setFaqQuery("")}
                aria-label="Clear FAQ search"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {filteredFaqs.length === 0 ? (
          <p className="text-[12px] text-gray-400 text-center py-6">
            {lang === "bn" ? "কোনো FAQ মেলেনি।" : "No FAQs match that search."}
          </p>
        ) : (
          <div className="space-y-2">
            {filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className={cn(
                  "rounded-xl border overflow-hidden",
                  isDark ? "border-zinc-800" : "border-gray-100",
                )}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  aria-expanded={openFaq === faq.id}
                  className={cn(
                    "w-full text-left px-4 py-3 flex justify-between items-center gap-3 font-semibold text-[13px] transition-colors",
                    isDark ? "hover:bg-zinc-800/60" : "hover:bg-gray-50",
                  )}
                >
                  <span>{faq.q}</span>
                  <ChevronRight
                    className={cn(
                      "w-4 h-4 text-gray-400 transition-transform shrink-0",
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
        )}
      </div>

      <div className={cardCn(isDark)}>
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="font-bold text-[15px]">{t.supportMessageUs}</h3>
          <span className="text-[10px] font-bold text-amber-500">
            {lang === "bn" ? "ডেমো — পাঠানো হয় না" : "Demo — not transmitted"}
          </span>
        </div>
        <p className="text-[11px] text-gray-400 mb-4">
          {lang === "bn"
            ? "ড্রাফট আপনার ব্রাউজারে সংরক্ষিত থাকে। কোনো বার্তা সার্ভারে পাঠানো হয় না।"
            : "Your draft is saved in this browser. No message is transmitted to a server."}
        </p>

        {contactSent && (
          <div
            role="status"
            className="mb-3 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 dark:border-emerald-900/40 dark:bg-emerald-950/20 px-3 py-2 text-[12px] text-emerald-700 dark:text-emerald-300"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            {lang === "bn"
              ? "ড্রাফট যাচাই হয়েছে এবং স্থানীয়ভাবে মুছে ফেলা হয়েছে (ডেমো সাবমিশন)।"
              : "Draft validated and cleared locally (demo submission)."}
          </div>
        )}

        <form onSubmit={submitContact} className="space-y-3" noValidate>
          <div>
            <label htmlFor="contact-name" className="sr-only">
              {lang === "bn" ? "আপনার নাম" : "Your name"}
            </label>
            <input
              id="contact-name"
              value={contactName}
              onChange={(e) => {
                setContactName(e.target.value);
                setContactSent(false);
              }}
              placeholder={lang === "bn" ? "আপনার নাম" : "Your Name"}
              aria-invalid={Boolean(contactErrors.name)}
              className={inputCn(isDark, "focus:ring-indigo-500/40", Boolean(contactErrors.name))}
            />
            {contactErrors.name && (
              <p className="text-[10px] text-red-500 mt-1">{contactErrors.name}</p>
            )}
          </div>
          <div>
            <label htmlFor="contact-email" className="sr-only">
              {lang === "bn" ? "ইমেইল" : "Email address"}
            </label>
            <input
              id="contact-email"
              value={contactEmail}
              onChange={(e) => {
                setContactEmail(e.target.value);
                setContactSent(false);
              }}
              placeholder={lang === "bn" ? "ইমেইল ঠিকানা" : "Email Address"}
              type="email"
              aria-invalid={Boolean(contactErrors.email)}
              className={inputCn(isDark, "focus:ring-indigo-500/40", Boolean(contactErrors.email))}
            />
            {contactErrors.email && (
              <p className="text-[10px] text-red-500 mt-1">{contactErrors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="contact-message" className="sr-only">
              {lang === "bn" ? "বার্তা" : "Message"}
            </label>
            <textarea
              id="contact-message"
              value={contactMessage}
              onChange={(e) => {
                setContactMessage(e.target.value);
                setContactSent(false);
              }}
              placeholder={t.supportDescribe}
              rows={4}
              aria-invalid={Boolean(contactErrors.message)}
              className={inputCn(isDark, "focus:ring-indigo-500/40", Boolean(contactErrors.message))}
            />
            {contactErrors.message && (
              <p className="text-[10px] text-red-500 mt-1">{contactErrors.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-colors text-[13px]"
          >
            {t.supportSend}
          </button>
        </form>
      </div>

      <div className={cardCn(isDark)}>
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="font-bold text-[15px]">{t.supportFeedbackTitle}</h3>
          <span className="text-[10px] font-bold text-amber-500">
            {lang === "bn" ? "ডেমো — পাঠানো হয় না" : "Demo — not transmitted"}
          </span>
        </div>
        <p className="text-[12px] mb-4 text-gray-400">{t.supportFeedbackDesc}</p>

        {feedbackSent && (
          <div
            role="status"
            className="mb-3 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 dark:border-emerald-900/40 dark:bg-emerald-950/20 px-3 py-2 text-[12px] text-emerald-700 dark:text-emerald-300"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            {lang === "bn"
              ? "ফিডব্যাক যাচাই হয়েছে এবং স্থানীয় ড্রাফট মুছে ফেলা হয়েছে (ডেমো)।"
              : "Feedback validated and the local draft cleared (demo)."}
          </div>
        )}

        <form onSubmit={submitFeedback} className="space-y-3" noValidate>
          <div>
            <label htmlFor="feedback-subject" className="sr-only">
              {lang === "bn" ? "বিষয়" : "Subject"}
            </label>
            <input
              id="feedback-subject"
              value={feedbackSubject}
              onChange={(e) => {
                setFeedbackSubject(e.target.value);
                setFeedbackSent(false);
              }}
              placeholder={t.supportSubject}
              aria-invalid={Boolean(feedbackErrors.subject)}
              className={inputCn(isDark, "focus:ring-emerald-500/40", Boolean(feedbackErrors.subject))}
            />
            {feedbackErrors.subject && (
              <p className="text-[10px] text-red-500 mt-1">{feedbackErrors.subject}</p>
            )}
          </div>
          <div>
            <label htmlFor="feedback-description" className="sr-only">
              {lang === "bn" ? "বিবরণ" : "Description"}
            </label>
            <textarea
              id="feedback-description"
              value={feedbackDesc}
              onChange={(e) => {
                setFeedbackDesc(e.target.value);
                setFeedbackSent(false);
              }}
              placeholder={t.supportDescribe}
              rows={4}
              aria-invalid={Boolean(feedbackErrors.description)}
              className={inputCn(
                isDark,
                "focus:ring-emerald-500/40",
                Boolean(feedbackErrors.description),
              )}
            />
            {feedbackErrors.description && (
              <p className="text-[10px] text-red-500 mt-1">{feedbackErrors.description}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="feedback-file"
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl border cursor-pointer transition",
                isDark ? "bg-zinc-800 border-zinc-700" : "bg-gray-50 border-gray-200",
              )}
            >
              <Upload className="w-4 h-4 text-gray-400" />
              <span className={cn("text-[12px] truncate", isDark ? "text-zinc-400" : "text-gray-500")}>
                {selectedFile
                  ? `${selectedFile.name} (${Math.ceil(selectedFile.size / 1024)} KB)`
                  : t.supportUpload}
              </span>
              {selectedFile && (
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    setSelectedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  aria-label="Remove attachment"
                  className="ml-auto p-1 rounded text-gray-400 hover:text-red-500"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <input
                id="feedback-file"
                ref={fileInputRef}
                type="file"
                accept=".png,.jpg,.jpeg,.webp,.pdf,image/png,image/jpeg,image/webp,application/pdf"
                className="hidden"
                onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
              />
            </label>
            <p className="text-[10px] text-gray-400 mt-1">
              {lang === "bn"
                ? "PNG, JPEG, WebP বা PDF · সর্বোচ্চ ৫ MB"
                : "PNG, JPEG, WebP or PDF · up to 5 MB"}
            </p>
            {fileError && <p className="text-[10px] text-red-500 mt-1">{fileError}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors text-[13px]"
          >
            {t.supportSubmitFeedback}
          </button>
        </form>
      </div>

      <div className={cardCn(isDark)}>
        <h3 className="font-bold text-[15px] mb-2">{t.supportContactInfo}</h3>
        <p className={cn("text-[13px]", isDark ? "text-gray-400" : "text-gray-600")}>
          {t.contactDetails}
        </p>
      </div>
    </div>
  );
}