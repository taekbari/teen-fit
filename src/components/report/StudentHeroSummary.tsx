import type { Middle3Report } from "@/types/studentReport";

export function StudentHeroSummary({ report }: { report: Middle3Report }) {
  return (
    <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-sm md:p-8">
      <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-300">Teacher Report</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="text-4xl font-black tracking-normal md:text-5xl">{report.summary.studentName} 결과지</h1>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-950">{report.summary.gradeStatus}</span>
      </div>
      <h2 className="mt-5 text-2xl font-black text-emerald-100">{report.summary.coreProfile}</h2>
      <p className="mt-3 max-w-4xl text-base font-bold leading-8 text-slate-200">{report.aiComment}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {report.careerKeywords.map((keyword) => (
          <span key={keyword} className="rounded-full bg-white/10 px-3 py-2 text-xs font-black text-slate-100 ring-1 ring-white/10">
            {keyword}
          </span>
        ))}
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl bg-white/10 p-5">
          <p className="text-xs font-black uppercase tracking-[0.12em] text-emerald-200">현재 성장 상태</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {report.growthSignals.map((signal) => (
              <span key={signal} className="rounded-full bg-emerald-300 px-3 py-1 text-xs font-black text-emerald-950">
                {signal}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-3xl bg-white/10 p-5">
          <p className="text-xs font-black uppercase tracking-[0.12em] text-amber-200">위험 요소</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {report.riskFactors.map((risk) => (
              <span key={risk} className="rounded-full bg-amber-300 px-3 py-1 text-xs font-black text-amber-950">{risk}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
