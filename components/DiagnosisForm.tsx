"use client";

import { learningQuestions } from "@/lib/mockData";
import { addHistory, getProfile, saveAnalysis, saveDiagnosis } from "@/lib/storage";
import type { AnalysisResult, DiagnosisInput } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { templateDiagnosis } from "@/lib/mockData";

const scoreFields = [
  ["korean", "국어"],
  ["english", "영어"],
  ["math", "수학"],
  ["science", "과학"],
  ["social", "사회"],
] as const;

export function DiagnosisForm() {
  const router = useRouter();
  const [diagnosis, setDiagnosis] = useState<DiagnosisInput>(templateDiagnosis);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateScore(field: keyof DiagnosisInput["scores"], value: string) {
    const score = Math.max(0, Math.min(100, Number(value)));
    setDiagnosis((current) => ({
      ...current,
      scores: { ...current.scores, [field]: Number.isNaN(score) ? 0 : score },
    }));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!diagnosis.strongSubject.trim() || !diagnosis.weakSubject.trim()) {
      setError("잘하는 과목과 약한 과목을 입력해 주세요.");
      return;
    }

    setLoading(true);
    setError("");
    const profile = getProfile();

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, diagnosis }),
      });

      if (!response.ok) throw new Error("analysis failed");

      const analysis = (await response.json()) as AnalysisResult;
      saveDiagnosis(diagnosis);
      saveAnalysis(analysis);
      addHistory({
        id: `${Date.now()}`,
        createdAt: new Date().toISOString(),
        profile,
        diagnosis,
        analysis,
      });
      router.push("/dashboard");
    } catch {
      setError("mock 분석을 완료하지 못했어요. 잠시 후 다시 시도해 주세요.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-5">
      <div className="grid grid-cols-2 gap-4 rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
        {scoreFields.map(([field, label]) => (
          <label key={field}>
            <span className="text-sm font-bold text-slate-600">{label}</span>
            <input
              type="number"
              min="0"
              max="100"
              value={diagnosis.scores[field]}
              onChange={(event) => updateScore(field, event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#18c29c] focus:bg-white"
            />
          </label>
        ))}
      </div>

      <div className="grid gap-4 rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-xl font-black">학습 성향 문항</h2>
        {learningQuestions.map((question, index) => (
          <label key={question}>
            <span className="text-sm font-bold text-slate-600">{index + 1}. {question}</span>
            <input
              value={diagnosis.learningAnswers[index] ?? ""}
              onChange={(event) => {
                const next = [...diagnosis.learningAnswers];
                next[index] = event.target.value;
                setDiagnosis((current) => ({ ...current, learningAnswers: next }));
              }}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#18c29c] focus:bg-white"
            />
          </label>
        ))}
      </div>

      <div className="grid gap-4 rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
        {[
          ["strongSubject", "잘하는 과목"],
          ["weakSubject", "약한 과목"],
          ["recentInterestChange", "최근 관심 변화"],
          ["goal", "목표"],
        ].map(([field, label]) => (
          <label key={field}>
            <span className="text-sm font-bold text-slate-600">{label}</span>
            <input
              value={diagnosis[field as keyof DiagnosisInput] as string}
              onChange={(event) =>
                setDiagnosis((current) => ({ ...current, [field]: event.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#18c29c] focus:bg-white"
            />
          </label>
        ))}
      </div>

      {error ? <p className="text-sm font-bold text-red-500">{error}</p> : null}
      <button
        disabled={loading}
        className="rounded-2xl bg-slate-950 px-5 py-4 font-black text-white transition hover:bg-slate-800 disabled:opacity-60"
      >
        {loading ? "분석 중..." : "mock 분석 시작하기"}
      </button>
    </form>
  );
}
