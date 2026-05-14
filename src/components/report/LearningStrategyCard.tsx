import type { LearningStrategy } from "@/types/studentReport";

export function LearningStrategyCard({ strategy }: { strategy: LearningStrategy }) {
  const tone = toneMap[strategy.tone];

  return (
    <article className={`rounded-2xl border p-5 shadow-sm ${tone.frame}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={`text-xs font-black ${tone.label}`}>{strategy.subject}</p>
          <h3 className="mt-2 text-xl font-black text-slate-950">{strategy.strategyName}</h3>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-black ${tone.badge}`}>
          우선순위 {strategy.priority}
        </span>
      </div>

      <div className="mt-5 grid gap-3">
        <StrategyField label="실행 방법" value={strategy.method} />
        <StrategyField label="목표" value={strategy.goal} />
      </div>

      <div className={`mt-5 rounded-2xl p-4 ${tone.highlight}`}>
        <p className="text-xs font-black">상담 포인트</p>
        <p className="mt-2 text-sm font-bold leading-6">{strategy.counselingPoint}</p>
      </div>
    </article>
  );
}

function StrategyField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-black text-slate-500">{label}</p>
      <p className="mt-1 text-sm leading-6 text-slate-700">{value}</p>
    </div>
  );
}

const toneMap = {
  emerald: {
    frame: "border-emerald-100 bg-emerald-50/50",
    label: "text-emerald-700",
    badge: "bg-emerald-600 text-white",
    highlight: "bg-white text-emerald-900",
  },
  sky: {
    frame: "border-sky-100 bg-sky-50/50",
    label: "text-sky-700",
    badge: "bg-sky-600 text-white",
    highlight: "bg-white text-sky-900",
  },
  amber: {
    frame: "border-amber-100 bg-amber-50/60",
    label: "text-amber-700",
    badge: "bg-amber-500 text-white",
    highlight: "bg-white text-amber-900",
  },
  violet: {
    frame: "border-violet-100 bg-violet-50/50",
    label: "text-violet-700",
    badge: "bg-violet-600 text-white",
    highlight: "bg-white text-violet-900",
  },
} as const;
