import type { CreditCourseGroup } from "@/types/studentReport";

export function CreditCourseTagSection({ groups }: { groups: CreditCourseGroup[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-3">
        {groups.map((group) => (
          <article key={group.category} className="rounded-2xl bg-slate-50 p-4">
            <h3 className="text-lg font-black text-slate-950">{group.category}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.courses.map((course) => <span key={course} className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700 ring-1 ring-emerald-100">{course}</span>)}
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">{group.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
