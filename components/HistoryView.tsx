"use client";

import { getHistory } from "@/lib/storage";
import type { HistoryEntry } from "@/types";
import { useState } from "react";

export function HistoryView() {
  const [items] = useState<HistoryEntry[]>(() => getHistory());

  if (items.length === 0) {
    return (
      <div className="rounded-[2rem] bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
        <h2 className="text-2xl font-black">아직 저장된 진단이 없어요.</h2>
        <p className="mt-2 text-slate-500">진단을 완료하면 날짜별 카드가 여기에 쌓입니다.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-xl font-black">관심 진로 변화 흐름</h2>
        <div className="mt-5 grid gap-3">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="mt-2 size-3 rounded-full bg-[#18c29c]" />
              <div>
                <p className="text-sm font-bold text-slate-400">
                  {new Date(item.createdAt).toLocaleDateString("ko-KR")}
                </p>
                <p className="font-bold text-slate-800">
                  {item.diagnosis.recentInterestChange || item.profile.careerInterest}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.id} className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-slate-400">
                  {new Date(item.createdAt).toLocaleString("ko-KR")}
                </p>
                <h3 className="mt-2 text-2xl font-black">
                  {item.profile.name} · {item.profile.targetSchool}
                </h3>
              </div>
              <span className="rounded-full bg-[#e8fff8] px-3 py-1 text-sm font-black text-[#108469]">
                {item.analysis.targetAchievement}%
              </span>
            </div>
            <dl className="mt-5 grid gap-3 text-sm">
              <Row label="강점" value={item.diagnosis.strongSubject} />
              <Row label="보완" value={item.diagnosis.weakSubject} />
              <Row label="학습 유형" value={item.analysis.learningType} />
              <Row label="추천 진로" value={item.analysis.careerSuggestions.join(", ")} />
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[80px_1fr] gap-3 rounded-2xl bg-slate-50 p-3">
      <dt className="font-black text-slate-500">{label}</dt>
      <dd className="text-slate-700">{value}</dd>
    </div>
  );
}
