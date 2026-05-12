"use client";

import {
  AchievementPanel,
  MentorBubble,
  QuestCard,
  StatCard,
} from "@/components/DashboardCards";
import { Notice } from "@/components/AppShell";
import { getAnalysis, getProfile } from "@/lib/storage";
import { useState } from "react";

export function DashboardView() {
  const [profile] = useState(() => getProfile());
  const [analysis] = useState(() => getAnalysis());

  return (
    <div className="grid gap-5">
      <Notice />
      <div className="grid gap-4">
        <AchievementPanel analysis={analysis} />
        <MentorBubble profile={profile} comment={analysis.mentorComment} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatCard label="문해력" value={analysis.stats.literacy} accent="bg-[#35a7ff]" />
        <StatCard label="수리력" value={analysis.stats.numeracy} accent="bg-[#ffb020]" />
        <StatCard label="탐구력" value={analysis.stats.inquiry} accent="bg-[#18c29c]" />
        <StatCard label="자기관리력" value={analysis.stats.selfManagement} accent="bg-[#ff6b8a]" />
      </div>

      <section>
        <h2 className="text-xl font-black">이번 달 추천 미션</h2>
        <div className="mt-4 grid gap-3">
          {analysis.recommendedMissions.map((quest) => (
            <QuestCard key={quest.id} quest={quest} />
          ))}
        </div>
      </section>

      <div className="grid gap-4">
        <section className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-xl font-black">추천 학습 전략</h2>
          <ul className="mt-4 grid gap-3">
            {analysis.learningStrategy.map((item) => (
              <li key={item} className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-xl font-black">진로 방향 제안</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {analysis.careerSuggestions.map((item) => (
              <span key={item} className="rounded-full bg-[#e8fff8] px-4 py-2 text-sm font-bold text-[#108469]">
                {item}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
