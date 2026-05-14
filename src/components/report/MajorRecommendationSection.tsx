import type { MajorRecommendation } from "@/types/studentReport";

export function MajorRecommendationSection({ majors }: { majors: MajorRecommendation[] }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {majors.map((major) => (
        <article key={major.track} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-black text-slate-950">{major.title}</h3>
            <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black text-white">
              {major.track === "four_year" ? "4년제" : "2년제"}
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {major.majors.map((item) => (
              <span key={item} className="rounded-full bg-white px-3 py-2 text-xs font-black text-slate-700 ring-1 ring-slate-200">
                {item}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm font-bold leading-7 text-slate-700">{major.reason}</p>
          <p className="mt-3 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">{major.careerConnection}</p>
        </article>
      ))}
    </div>
  );
}
