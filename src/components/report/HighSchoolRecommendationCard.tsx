import type { FitLevel, HighSchoolRecommendation } from "@/types/studentReport";

export function HighSchoolRecommendationCard({ school }: { school: HighSchoolRecommendation }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black text-slate-500">{school.priority}순위</p>
          <h3 className="mt-1 text-2xl font-black text-slate-950">{school.schoolType}</h3>
        </div>
        <FitBadge level={school.fitLevel} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {school.examples.map((example) => <span key={example} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">{example}</span>)}
      </div>
      <p className="mt-4 text-sm font-bold leading-7 text-slate-700">{school.reason}</p>
      <div className="mt-4 rounded-2xl bg-slate-50 p-4">
        <p className="text-xs font-black text-slate-500">준비 포인트</p>
        <ul className="mt-2 grid gap-1 text-sm font-bold leading-6 text-slate-700">
          {school.preparationPoints.map((point) => <li key={point}>• {point}</li>)}
        </ul>
      </div>
    </article>
  );
}

function FitBadge({ level }: { level: FitLevel }) {
  const label = { high: "높음", medium: "보통", needs_preparation: "대비 필요" }[level];
  const className = {
    high: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    medium: "bg-sky-50 text-sky-700 ring-sky-100",
    needs_preparation: "bg-amber-50 text-amber-700 ring-amber-100",
  }[level];

  return <span className={`rounded-full px-3 py-1 text-xs font-black ring-1 ${className}`}>{label}</span>;
}
