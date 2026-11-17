"use client";

import { Info } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { APP_CONFIG } from "@/config";
import { cn } from "@/utils/cn";

const cardCn = (isDark: boolean) =>
  cn(
    "rounded-2xl border p-6 shadow-sm",
    isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200",
  );

export function AboutView() {
  const { isDark, t } = useApp();

  const team = [
    { bio: t.farhanaBio, initials: "FK", color: "bg-emerald-500" },
    { bio: t.mushfiqurBio, initials: "MS", color: "bg-indigo-500" },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <Info className="w-7 h-7 text-[#78D47E]" />
        <h2 className="text-2xl font-extrabold tracking-tight">{t.aboutTitle}</h2>
      </div>

      {/* Hero */}
      <div className="rounded-2xl overflow-hidden relative min-h-[140px] flex items-center p-8 bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-zinc-950 text-white shadow-md">
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="z-10">
          <p className="text-emerald-400 font-bold text-xs uppercase tracking-widest mb-2">
            {APP_CONFIG.org} · Version {APP_CONFIG.version} · 2026
          </p>
          <h3 className="text-3xl font-black tracking-tight leading-tight">
            Dhaka City
            <br />
            <span className="text-[#78D47E]">Smart Dashboard</span>
          </h3>
        </div>
      </div>

      {/* Mission */}
      <div className={cardCn(isDark)}>
        <h3 className="font-bold text-[15px] mb-3 text-emerald-500">{t.ourMission}</h3>
        <p className={cn("text-[13px] leading-7", isDark ? "text-gray-300" : "text-gray-600")}>
          {t.missionContent}
        </p>
      </div>

      {/* Data Sources */}
      <div className={cardCn(isDark)}>
        <h3 className="font-bold text-[15px] mb-1 text-indigo-500">{t.dataSources}</h3>
        <p className={cn("text-[13px] mb-3", isDark ? "text-gray-400" : "text-gray-500")}>
          {t.dataSourcesContent}
        </p>
        <ul className="space-y-2">
          {[t.ds1, t.ds2, t.ds3, t.ds4, t.ds5, t.ds6].map((src, i) => (
            <li
              key={i}
              className={cn(
                "flex items-start gap-2 text-[13px]",
                isDark ? "text-gray-300" : "text-gray-700",
              )}
            >
              <span className="mt-1.5 w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />
              {src}
            </li>
          ))}
        </ul>
      </div>

      {/* Team */}
      <div className={cardCn(isDark)}>
        <h3 className="font-bold text-[15px] mb-3 text-amber-500">{t.theTeam}</h3>
        <p className={cn("text-[13px] mb-4", isDark ? "text-gray-400" : "text-gray-500")}>
          {t.theTeamContent}
        </p>
        <div className="space-y-4">
          {team.map((member, i) => (
            <div
              key={i}
              className={cn(
                "flex items-start gap-4 p-4 rounded-xl border",
                isDark ? "border-zinc-800 bg-zinc-800/20" : "border-gray-100 bg-gray-50/50",
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0",
                  member.color,
                )}
              >
                {member.initials}
              </div>
              <p className={cn("text-[13px] leading-6", isDark ? "text-gray-300" : "text-gray-600")}>
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className={cardCn(isDark)}>
        <h3 className="font-bold text-[15px] mb-2 text-sky-500">{t.contactUs}</h3>
        <p className={cn("text-[13px]", isDark ? "text-gray-400" : "text-gray-600")}>
          {t.contactDetails}
        </p>
      </div>
    </div>
  );
}