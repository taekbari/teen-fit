import type { Middle3Report } from "@/types/studentReport";

export function TeacherConsultingPanel({ plan }: { plan: Middle3Report["consultingPlan"] }) {
  return (
    <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-black text-slate-500">이번 달 집중 과제</p>
        <ol className="mt-4 grid gap-3">
          {plan.monthlyFocus.map((item, index) => (
            <li key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-4">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-white">{index + 1}</span>
              <span className="text-sm font-bold leading-6 text-slate-700">{item}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="grid gap-5">
        <Panel title="학생부 전략" items={plan.schoolRecordStrategy} />
        <Panel title="동아리 전략" items={plan.clubStrategy} />
        <Comment title="학부모 상담 포인트" value={plan.parentCounselingPoint} dark />
        <Comment title="내부 메모" value={plan.internalMemoPrompt} />
      </div>
    </section>
  );
}

function Panel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-black text-slate-500">{title}</p>
      <ul className="mt-3 grid gap-2 text-sm font-bold leading-6 text-slate-700">
        {items.map((item) => <li key={item}>• {item}</li>)}
      </ul>
    </div>
  );
}

function Comment({ title, value, dark = false }: { title: string; value: string; dark?: boolean }) {
  return (
    <div className={`rounded-2xl p-5 shadow-sm ${dark ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-900"}`}>
      <p className={`text-sm font-black ${dark ? "text-emerald-300" : "text-slate-500"}`}>{title}</p>
      <p className="mt-3 text-sm font-bold leading-7">{value}</p>
    </div>
  );
}
