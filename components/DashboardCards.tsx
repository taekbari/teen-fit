import type { AnalysisResult, Quest, StudentProfile } from "@/types";

export function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-slate-500">{label}</p>
        <span className="text-lg font-black">{value}</span>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${accent}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export function MentorBubble({
  profile,
  comment,
}: {
  profile: StudentProfile;
  comment: string;
}) {
  const face =
    profile.character === "냥쌤" ? "🐱" : profile.character === "토끼쌤" ? "🐰" : "🐶";

  return (
    <div className="flex gap-3 rounded-3xl bg-slate-950 p-5 text-white shadow-sm">
      <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white text-2xl">
        {face}
      </div>
      <div>
        <p className="text-sm font-bold text-emerald-200">{profile.character} 코멘트</p>
        <p className="mt-2 leading-7 text-slate-100">{comment}</p>
      </div>
    </div>
  );
}

export function QuestCard({ quest }: { quest: Quest }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
          {quest.category}
        </span>
        <span className="text-xs font-bold text-slate-400">{quest.duration}</span>
      </div>
      <h3 className="mt-4 text-lg font-black">{quest.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{quest.description}</p>
    </article>
  );
}

export function AchievementPanel({ analysis }: { analysis: AnalysisResult }) {
  return (
    <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500">목표학교 달성도</p>
          <p className="mt-2 text-5xl font-black text-slate-950">
            {analysis.targetAchievement}%
          </p>
        </div>
        <span className="rounded-full bg-[#e8fff8] px-4 py-2 text-sm font-bold text-[#108469]">
          {analysis.learningType}
        </span>
      </div>
      <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-[#18c29c]"
          style={{ width: `${analysis.targetAchievement}%` }}
        />
      </div>
      <p className="mt-5 leading-7 text-slate-600">{analysis.positionSummary}</p>
    </div>
  );
}
