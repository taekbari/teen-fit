import type { StrategyPlan } from "@/types/studentReport";

export function StrategyPlanCard({ plan }: { plan: StrategyPlan }) {
  const progress = Math.min(100, Math.round((plan.currentScore / plan.targetScore) * 100));

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black text-slate-500">학습 전략 플랜</p>
          <h3 className="mt-1 text-2xl font-black text-slate-950">{plan.subject}</h3>
        </div>
        <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black text-white">목표 {plan.targetScore}점 이상 유지</span>
      </div>
      <div className="mt-5">
        <div className="flex items-center justify-between text-sm font-black">
          <span className="text-slate-500">현재 대비 목표 달성률</span>
          <span className="text-slate-950">{progress}%</span>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-emerald-500" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <ul className="mt-5 grid gap-2">
        {plan.strategies.map((strategy) => <li key={strategy} className="rounded-2xl bg-slate-50 p-3 text-sm font-bold leading-6 text-slate-700">✓ {strategy}</li>)}
      </ul>
    </article>
  );
}
