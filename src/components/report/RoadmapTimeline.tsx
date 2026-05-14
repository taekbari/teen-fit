import type { RoadmapStep } from "@/types/studentReport";

export function RoadmapTimeline({ steps }: { steps: RoadmapStep[] }) {
  return (
    <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {steps.map((step, index) => (
        <article key={step.stage} className="grid gap-4 rounded-2xl bg-slate-50 p-4 md:grid-cols-[150px_1fr]">
          <div>
            <span className="inline-flex size-8 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-white">
              {index + 1}
            </span>
            <p className="mt-3 text-sm font-black text-emerald-700">{step.stage}</p>
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-950">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {step.actions.map((action) => (
                <span key={action} className="rounded-full bg-white px-3 py-2 text-xs font-black text-slate-700 ring-1 ring-slate-200">
                  {action}
                </span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
