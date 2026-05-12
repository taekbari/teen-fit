import { QuestCard } from "@/components/DashboardCards";
import { roadmapSteps } from "@/lib/mockData";

export function RoadmapView() {
  return (
    <div className="grid gap-5">
      {roadmapSteps.map((step, index) => (
        <section
          key={step.id}
          className="grid gap-5 rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200"
        >
          <div>
            <div className="grid size-12 place-items-center rounded-2xl bg-slate-950 text-lg font-black text-white">
              {index + 1}
            </div>
            <h2 className="mt-4 text-2xl font-black">{step.stage}</h2>
            <p className="mt-1 text-sm font-bold text-[#18a985]">{step.period}</p>
          </div>
          <div className="grid gap-5">
            <div className="grid gap-3">
              <InfoList title="추천 활동" items={step.recommendedActivities} />
              <InfoList title="학습 중점" items={step.learningFocus} />
            </div>
            <div>
              <h3 className="text-lg font-black">입시 퀘스트</h3>
              <div className="mt-3 grid gap-3">
                {step.entranceQuests.map((quest) => (
                  <QuestCard key={quest.id} quest={quest} />
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl bg-slate-50 p-4">
      <h3 className="font-black">{title}</h3>
      <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-600">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
