import type { TeacherActionPlan as TeacherActionPlanData } from "@/types/studentReport";

export function TeacherActionPlan({ actionPlan }: { actionPlan: TeacherActionPlanData }) {
  return (
    <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-black text-slate-500">이번 달 우선 과제</p>
        <ol className="mt-4 grid gap-3">
          {actionPlan.monthlyPriorities.map((item, index) => (
            <li key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-4">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-white">
                {index + 1}
              </span>
              <span className="text-sm font-bold leading-6 text-slate-700">{item}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid gap-5">
        <CommentBox
          title="학부모에게 전달할 요약 코멘트"
          value={actionPlan.parentComment}
          tone="dark"
        />
        <CommentBox
          title="선생님 내부 메모"
          value={actionPlan.internalMemoGuide}
          tone="light"
        />
      </div>
    </section>
  );
}

function CommentBox({
  title,
  value,
  tone,
}: {
  title: string;
  value: string;
  tone: "dark" | "light";
}) {
  const className =
    tone === "dark"
      ? "bg-slate-950 text-white"
      : "border border-slate-200 bg-white text-slate-900";

  const titleClassName = tone === "dark" ? "text-emerald-300" : "text-slate-500";

  return (
    <div className={`rounded-2xl p-5 shadow-sm ${className}`}>
      <p className={`text-sm font-black ${titleClassName}`}>{title}</p>
      <p className="mt-3 text-sm font-bold leading-7">{value}</p>
    </div>
  );
}
