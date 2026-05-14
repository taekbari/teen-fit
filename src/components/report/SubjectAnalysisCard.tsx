import type { SubjectAnalysis } from "@/types/studentReport";

export function SubjectAnalysisCard({ subject }: { subject: SubjectAnalysis }) {
  const diff = subject.currentScore - subject.previousScore;
  const tone = subject.trend === "up" ? "emerald" : subject.trend === "down" ? "amber" : "sky";

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black text-slate-500">과목 분석</p>
          <h3 className="mt-1 text-2xl font-black text-slate-950">{subject.subject}</h3>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-black ${badgeClass[tone]}`}>{subject.status}</span>
      </div>
      <div className="mt-5 flex items-end gap-3">
        <p className="text-4xl font-black text-slate-950">{subject.currentScore}</p>
        <p className={`pb-1 text-sm font-black ${diff >= 0 ? "text-emerald-600" : "text-amber-600"}`}>
          {diff >= 0 ? "+" : ""}{diff}p
        </p>
      </div>
      <div className="mt-5 flex h-24 items-end gap-2 rounded-2xl bg-slate-50 p-3">
        {subject.chartValues.map((value, index) => (
          <div key={`${subject.subject}-${index}`} className="flex flex-1 flex-col items-center gap-2">
            <div className={`w-full rounded-t-lg ${barClass[tone]}`} style={{ height: `${Math.max(12, value * 0.72)}px` }} />
            <span className="text-[10px] font-black text-slate-400">{value}</span>
          </div>
        ))}
      </div>
      <List title="강점" items={subject.strengths} />
      <List title="보완점" items={subject.improvements} />
      <div className="mt-4 rounded-2xl bg-slate-950 p-4 text-white">
        <p className="text-xs font-black text-emerald-300">추천 전략</p>
        <p className="mt-2 text-sm font-bold leading-6">{subject.recommendedStrategy}</p>
      </div>
    </article>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-4">
      <p className="text-xs font-black text-slate-500">{title}</p>
      <ul className="mt-2 grid gap-1 text-sm font-bold leading-6 text-slate-700">
        {items.map((item) => <li key={item}>• {item}</li>)}
      </ul>
    </div>
  );
}

const badgeClass = {
  emerald: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
  amber: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
  sky: "bg-sky-50 text-sky-700 ring-1 ring-sky-100",
};

const barClass = {
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
  sky: "bg-sky-500",
};
