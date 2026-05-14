import type { StudentReportSummary } from "@/types/studentReport";

export function StudentSummaryCard({ summary }: { summary: StudentReportSummary }) {
  return (
    <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-sm md:p-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-300">
            Teacher Report
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-black tracking-normal md:text-5xl">
              {summary.studentName} 결과지
            </h1>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-950">
              {summary.gradeStatus}
            </span>
          </div>
          <p className="mt-5 max-w-3xl text-lg font-bold leading-8 text-slate-200">
            {summary.coreProfile}
          </p>
        </div>

        <div className="rounded-3xl bg-white/10 p-5">
          <SummaryList title="강점" items={summary.strengths} tone="emerald" />
          <div className="mt-5">
            <SummaryList title="보완점" items={summary.improvements} tone="amber" />
          </div>
        </div>
      </div>
    </section>
  );
}

function SummaryList({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "emerald" | "amber";
}) {
  const badgeClassName =
    tone === "emerald"
      ? "bg-emerald-300 text-emerald-950"
      : "bg-amber-300 text-amber-950";

  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-300">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className={`rounded-full px-3 py-1 text-xs font-black ${badgeClassName}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
