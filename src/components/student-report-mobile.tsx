import type {
  LearningStrategy,
  Middle3Report,
  PreMiddleReport,
  StudentGuidanceReport,
} from "@/types/studentReport";
import Link from "next/link";

type StudentReportMobileProps = {
  report: StudentGuidanceReport;
};

export function StudentReportMobile({ report }: StudentReportMobileProps) {
  return (
    <MobileShell>
      <div className="rounded-b-[2rem] bg-slate-950 px-5 pb-7 pt-5 text-white">
        <div className="flex items-center justify-between gap-3">
          <Link href={`/student/students/${report.summary.studentId}`} className="text-sm font-black text-slate-300">
            ← 선택 화면
          </Link>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-emerald-300">
            {report.summary.gradeStatus}
          </span>
        </div>
        <p className="mt-7 text-sm font-black text-emerald-300">나의 진로 리포트</p>
        <h1 className="mt-2 text-3xl font-black leading-tight">{report.summary.studentName}</h1>
        <p className="mt-3 text-lg font-black leading-7 text-slate-100">
          {report.summary.coreProfile}
        </p>
        <div className="mt-5 rounded-3xl bg-white/10 p-4">
          <p className="text-xs font-black text-slate-300">이번 결과의 핵심</p>
          <p className="mt-2 text-sm font-bold leading-6">
            {report.reportType === "middle_3"
              ? report.aiComment
              : "중학교 평가 방식에 맞춰 문해력 강점을 살리고, 수학 고난도 부담은 풀이 과정 정리로 낮추는 것이 좋습니다."}
          </p>
        </div>
      </div>

      <div className="grid gap-4 px-4 pb-24 pt-4">
        <StrengthSection report={report} />
        {report.reportType === "pre_middle_1" ? (
          <PreMiddleStudentSections report={report} />
        ) : (
          <Middle3StudentSections report={report} />
        )}
      </div>

      <BottomNav active="report" studentId={report.summary.studentId} />
    </MobileShell>
  );
}

export function StudentReportListMobile({ reports }: { reports: StudentGuidanceReport[] }) {
  return (
    <MobileShell>
      <div className="px-5 pb-5 pt-5">
        <Link href="/student" className="text-sm font-black text-slate-500">
          ← 학생 홈
        </Link>
        <p className="text-sm font-black text-emerald-600">Teen Fit</p>
        <h1 className="mt-2 text-3xl font-black leading-tight text-slate-950">학생 선택</h1>
        <p className="mt-2 text-sm font-bold leading-6 text-slate-500">
          결과지나 이번 달 할 일을 확인할 학생을 먼저 선택하세요.
        </p>
      </div>

      <div className="grid gap-4 px-4 pb-24">
        {reports.map((report) => (
          <Link
            key={report.summary.studentId}
            href={`/student/students/${report.summary.studentId}`}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black text-emerald-600">{report.summary.gradeStatus}</p>
                <h2 className="mt-1 text-2xl font-black text-slate-950">{report.summary.studentName}</h2>
              </div>
              <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black text-white">
                선택
              </span>
            </div>
            <p className="mt-4 text-sm font-bold leading-6 text-slate-600">
              {report.summary.coreProfile}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {report.summary.strengths.slice(0, 3).map((strength) => (
                <span key={strength} className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700">
                  {strength}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </MobileShell>
  );
}

export function StudentLandingMobile() {
  return (
    <MobileShell>
      <div className="px-5 pb-24 pt-6">
        <section className="rounded-[2rem] bg-slate-950 p-6 text-white">
          <p className="text-sm font-black text-emerald-300">Teen Fit</p>
          <h1 className="mt-3 text-3xl font-black leading-tight">학생 화면</h1>
          <p className="mt-4 text-sm font-bold leading-6 text-slate-300">
            내 결과지와 이번 달 할 일을 확인하려면 먼저 학생을 선택하세요.
          </p>
          <Link
            href="/student/students"
            className="mt-6 inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950"
          >
            학생 선택하기
          </Link>
        </section>

        <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-600">
            Guide
          </p>
          <h2 className="mt-1 text-xl font-black text-slate-950">먼저 학생을 선택하세요</h2>
          <p className="mt-3 text-sm font-bold leading-6 text-slate-500">
            학생을 선택하면 해당 학생의 결과지와 이번 달 실행 플랜을 확인할 수 있습니다.
          </p>
        </section>
      </div>
    </MobileShell>
  );
}

export function StudentReportChoiceMobile({ report }: StudentReportMobileProps) {
  return (
    <MobileShell>
      <div className="rounded-b-[2rem] bg-slate-950 px-5 pb-7 pt-5 text-white">
        <div className="flex items-center justify-between gap-3">
          <Link href="/student" className="text-sm font-black text-slate-300">
            ← 학생 목록
          </Link>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-emerald-300">
            {report.summary.gradeStatus}
          </span>
        </div>
        <p className="mt-7 text-sm font-black text-emerald-300">선택한 학생</p>
        <h1 className="mt-2 text-3xl font-black leading-tight">{report.summary.studentName}</h1>
        <p className="mt-3 text-sm font-bold leading-6 text-slate-300">
          {report.summary.coreProfile}
        </p>
      </div>

      <div className="grid gap-4 px-4 pb-24 pt-4">
        <Link
          href={`/student/reports/${report.summary.studentId}`}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-600">Report</p>
              <h2 className="mt-1 text-xl font-black text-slate-950">결과지 보기</h2>
            </div>
            <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black text-white">
              이동
            </span>
          </div>
          <p className="mt-3 text-sm font-bold leading-6 text-slate-500">
            강점, 보완점, 진로 로드맵, 과목별 전략을 한 번에 확인합니다.
          </p>
        </Link>

        <Link
          href={`/student/reports/${report.summary.studentId}/plan`}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-600">Plan</p>
              <h2 className="mt-1 text-xl font-black text-slate-950">이번 달 할 일</h2>
            </div>
            <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-black text-white">
              이동
            </span>
          </div>
          <p className="mt-3 text-sm font-bold leading-6 text-slate-500">
            지금 바로 실행할 과제와 학습 루틴만 따로 확인합니다.
          </p>
        </Link>

        <MobileCard title="핵심 요약" eyebrow="Summary">
          <div className="grid gap-2">
            {report.summary.strengths.slice(0, 3).map((strength) => (
              <p key={strength} className="rounded-2xl bg-emerald-50 p-3 text-sm font-black text-emerald-800">
                {strength}
              </p>
            ))}
          </div>
        </MobileCard>
      </div>

      <BottomNav active="home" studentId={report.summary.studentId} />
    </MobileShell>
  );
}

export function StudentActionPlanMobile({ report }: StudentReportMobileProps) {
  const actionItems = getStudentActionItems(report);

  return (
    <MobileShell>
      <div className="px-5 pb-5 pt-5">
        <div className="flex items-center justify-between gap-3">
          <Link href={`/student/students/${report.summary.studentId}`} className="text-sm font-black text-slate-500">
            ← 선택 화면
          </Link>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
            이번 달
          </span>
        </div>
        <h1 className="mt-6 text-3xl font-black leading-tight text-slate-950">
          {report.summary.studentName} 할 일
        </h1>
        <p className="mt-2 text-sm font-bold leading-6 text-slate-500">
          결과지에서 가장 먼저 실행할 과제만 모았습니다. 완료한 항목은 체크하며 관리하세요.
        </p>
      </div>

      <div className="grid gap-4 px-4 pb-24">
        <section className="rounded-3xl bg-slate-950 p-5 text-white">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-300">Focus</p>
          <h2 className="mt-2 text-xl font-black">오늘 시작할 1순위</h2>
          <p className="mt-3 text-sm font-bold leading-6 text-slate-200">
            {actionItems[0] ?? "현재 등록된 실행 과제가 없습니다."}
          </p>
        </section>

        <MobileCard title="실행 체크리스트" eyebrow="Checklist">
          <div className="grid gap-3">
            {actionItems.map((item, index) => (
              <label key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                <input type="checkbox" className="mt-1 h-4 w-4 accent-emerald-500" />
                <span className="grid flex-1 gap-1">
                  <span className="text-xs font-black text-emerald-600">Task {index + 1}</span>
                  <span className="text-sm font-bold leading-6 text-slate-700">{item}</span>
                </span>
              </label>
            ))}
          </div>
        </MobileCard>

        <MobileCard title="학습 루틴" eyebrow="Routine">
          <div className="grid gap-3">
            {getRoutineItems(report).map((item) => (
              <div key={item.title} className="rounded-2xl bg-slate-50 p-4">
                <p className="font-black text-slate-950">{item.title}</p>
                <p className="mt-2 text-sm font-bold leading-6 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </MobileCard>
      </div>

      <BottomNav active="plan" studentId={report.summary.studentId} />
    </MobileShell>
  );
}

function PreMiddleStudentSections({ report }: { report: PreMiddleReport }) {
  return (
    <>
      <MobileCard title="중학교 준비 로드맵" eyebrow="School">
        <div className="grid gap-3">
          {report.schoolFits.map((school, index) => (
            <div key={school.id} className="rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-black text-slate-950">{school.name}</p>
                <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-black text-slate-600 ring-1 ring-slate-200">
                  {index + 1}순위
                </span>
              </div>
              <p className="mt-2 text-sm font-bold leading-6 text-slate-600">{school.mainFeature}</p>
              <p className="mt-3 rounded-xl bg-white p-3 text-sm font-black leading-6 text-emerald-700">
                {school.recommendationPoint}
              </p>
            </div>
          ))}
        </div>
      </MobileCard>

      <MobileCard title="과목별 실행 전략" eyebrow="Study">
        <div className="grid gap-3">
          {report.learningStrategies.map((strategy) => (
            <LearningAction key={strategy.subject} strategy={strategy} />
          ))}
        </div>
      </MobileCard>

      <ChecklistCard title="이번 달 할 일" items={report.actionPlan.monthlyPriorities} />
    </>
  );
}

function Middle3StudentSections({ report }: { report: Middle3Report }) {
  return (
    <>
      <MobileCard title="진로 키워드" eyebrow="Career">
        <div className="flex flex-wrap gap-2">
          {report.careerKeywords.map((keyword) => (
            <span key={keyword} className="rounded-full bg-slate-950 px-3 py-2 text-xs font-black text-white">
              {keyword}
            </span>
          ))}
        </div>
        <p className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm font-bold leading-6 text-emerald-900">
          {report.growthStatus}
        </p>
      </MobileCard>

      <MobileCard title="과목 상태" eyebrow="Subject">
        <div className="grid gap-3">
          {report.subjects.map((subject) => (
            <div key={subject.subject} className="rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-black text-slate-950">{subject.subject}</p>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600 ring-1 ring-slate-200">
                  {subject.status}
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${Math.min(subject.currentScore, 100)}%` }}
                />
              </div>
              <p className="mt-3 text-sm font-bold leading-6 text-slate-600">
                {subject.recommendedStrategy}
              </p>
            </div>
          ))}
        </div>
      </MobileCard>

      <MobileCard title="진학 로드맵" eyebrow="Roadmap">
        <div className="grid gap-3">
          {report.roadmap.map((step, index) => (
            <div key={step.stage} className="grid grid-cols-[32px_1fr] gap-3">
              <div className="flex flex-col items-center">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-950 text-xs font-black text-white">
                  {index + 1}
                </span>
                {index < report.roadmap.length - 1 ? <span className="mt-2 h-full w-px bg-slate-200" /> : null}
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-black text-emerald-600">{step.stage}</p>
                <h3 className="mt-1 font-black text-slate-950">{step.title}</h3>
                <p className="mt-2 text-sm font-bold leading-6 text-slate-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </MobileCard>

      <MobileCard title="고교학점제 추천 과목" eyebrow="Course">
        <div className="grid gap-3">
          {report.creditCourses.map((group) => (
            <div key={group.category} className="rounded-2xl bg-slate-50 p-4">
              <p className="font-black text-slate-950">{group.category}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.courses.map((course) => (
                  <span key={course} className="rounded-full bg-white px-3 py-2 text-xs font-black text-slate-700 ring-1 ring-slate-200">
                    {course}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm font-bold leading-6 text-slate-600">{group.description}</p>
            </div>
          ))}
        </div>
      </MobileCard>

      <ChecklistCard title="이번 달 집중 과제" items={report.consultingPlan.monthlyFocus} />
    </>
  );
}

function StrengthSection({ report }: { report: StudentGuidanceReport }) {
  return (
    <div className="grid gap-4">
      <MobileCard title="나의 강점" eyebrow="Strength">
        <div className="grid gap-2">
          {report.summary.strengths.map((strength) => (
            <p key={strength} className="rounded-2xl bg-emerald-50 p-3 text-sm font-black text-emerald-800">
              {strength}
            </p>
          ))}
        </div>
      </MobileCard>
      <MobileCard title="다음에 키울 부분" eyebrow="Next">
        <div className="grid gap-2">
          {report.summary.improvements.map((item) => (
            <p key={item} className="rounded-2xl bg-amber-50 p-3 text-sm font-black text-amber-800">
              {item}
            </p>
          ))}
        </div>
      </MobileCard>
    </div>
  );
}

function LearningAction({ strategy }: { strategy: LearningStrategy }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="font-black text-slate-950">{strategy.subject}</p>
        <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-black text-slate-600 ring-1 ring-slate-200">
          우선 {strategy.priority}
        </span>
      </div>
      <h3 className="mt-2 text-sm font-black text-emerald-700">{strategy.strategyName}</h3>
      <p className="mt-2 text-sm font-bold leading-6 text-slate-600">{strategy.method}</p>
      <p className="mt-3 rounded-xl bg-white p-3 text-xs font-black text-slate-600">
        목표: {strategy.goal}
      </p>
    </div>
  );
}

function ChecklistCard({ title, items }: { title: string; items: string[] }) {
  return (
    <MobileCard title={title} eyebrow="Action">
      <div className="grid gap-3">
        {items.map((item) => (
          <label key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
            <input type="checkbox" className="mt-1 h-4 w-4 accent-emerald-500" />
            <span className="text-sm font-bold leading-6 text-slate-700">{item}</span>
          </label>
        ))}
      </div>
    </MobileCard>
  );
}

function MobileCard({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-600">{eyebrow}</p>
      <h2 className="mt-1 text-xl font-black text-slate-950">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-100 md:grid md:place-items-center md:px-6 md:py-8">
      <div className="relative min-h-screen w-full bg-slate-50 md:min-h-[860px] md:max-w-[430px] md:overflow-hidden md:rounded-[2rem] md:border md:border-slate-200 md:shadow-2xl">
        {children}
      </div>
    </main>
  );
}

function BottomNav({
  active,
  studentId,
}: {
  active: "home" | "report" | "plan";
  studentId?: string;
}) {
  const itemClassName = (key: "home" | "report" | "plan") =>
    key === active
      ? "rounded-2xl bg-slate-950 px-3 py-2 text-white"
      : "rounded-2xl px-3 py-2";

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-[430px] border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur md:absolute">
      <div className="grid grid-cols-3 gap-2 text-center text-xs font-black text-slate-500">
        <Link href={studentId ? `/student/students/${studentId}` : "/student"} className={itemClassName("home")}>
          홈
        </Link>
        <Link href={studentId ? `/student/reports/${studentId}` : "/student/reports"} className={itemClassName("report")}>
          결과지
        </Link>
        <Link href={studentId ? `/student/reports/${studentId}/plan` : "/student/reports"} className={itemClassName("plan")}>
          플랜
        </Link>
      </div>
    </nav>
  );
}

function getStudentActionItems(report: StudentGuidanceReport) {
  if (report.reportType === "pre_middle_1") {
    return report.actionPlan.monthlyPriorities;
  }

  return report.consultingPlan.monthlyFocus;
}

function getRoutineItems(report: StudentGuidanceReport) {
  if (report.reportType === "pre_middle_1") {
    return report.learningStrategies.slice(0, 3).map((strategy) => ({
      title: strategy.subject,
      description: strategy.method,
    }));
  }

  return report.strategyPlans.map((plan) => ({
    title: `${plan.subject} ${plan.targetScore}점 목표`,
    description: plan.strategies.join(", "),
  }));
}
