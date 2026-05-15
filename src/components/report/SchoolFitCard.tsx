import type { FitLevel, SchoolFit } from "@/types/studentReport";

export function SchoolFitCard({ school }: { school: SchoolFit }) {
  return (
    <article className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black text-slate-400">배정 가능 학교</p>
          <h3 className="mt-1 text-2xl font-black text-slate-950">{school.name}</h3>
        </div>
        <FitBadge level={school.fitLevel} />
      </div>

      <Highlight label="추천 포인트" value={school.recommendationPoint} />

      <InfoBlock label="주요 특징" value={school.mainFeature} />
      <InfoBlock label="출제/평가 경향" value={school.assessmentTrend} />
      <InfoBlock label="수아 학생을 위한 전략" value={school.studentStrategy} strong />
    </article>
  );
}

function FitBadge({ level }: { level: FitLevel }) {
  const label = {
    high: "높음",
    medium: "보통",
    needs_preparation: "대비 필요",
  }[level];

  const className = {
    high: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    medium: "bg-sky-50 text-sky-700 ring-sky-100",
    needs_preparation: "bg-amber-50 text-amber-700 ring-amber-100",
  }[level];

  return (
    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-black ring-1 ${className}`}>
      {label}
    </span>
  );
}

function Highlight({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-950 p-4 text-white">
      <p className="text-xs font-black text-emerald-300">{label}</p>
      <p className="mt-1 text-sm font-black leading-6">{value}</p>
    </div>
  );
}

function InfoBlock({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div>
      <p className="text-xs font-black text-slate-500">{label}</p>
      <p className={`mt-1 text-sm leading-6 ${strong ? "font-bold text-slate-900" : "text-slate-600"}`}>
        {value}
      </p>
    </div>
  );
}
