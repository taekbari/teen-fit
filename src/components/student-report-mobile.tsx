import type {
  StudentGuidanceReport,
} from "@/types/studentReport";
import Link from "next/link";

type StudentReportMobileProps = {
  report: StudentGuidanceReport;
};

export function StudentReportMobile({ report }: StudentReportMobileProps) {
  const actionItems = getStudentActionItems(report);

  return (
    <MobileShell>
      <div className="bg-gradient-to-b from-blue-50 to-white px-6 pb-4 pt-7">
        <div className="flex items-center justify-between gap-3">
          <Link href="/student" className="text-sm font-black text-blue-500">
            ← 학생 목록
          </Link>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-blue-600 shadow-sm ring-1 ring-blue-100">
            {report.summary.gradeStatus}
          </span>
        </div>
        <div className="mt-7 flex items-center justify-between gap-4">
          <div>
            <h1 className="inline-flex items-center gap-2 text-2xl font-black leading-tight text-slate-800">
              반가워, {formatFriendlyName(report.summary.studentName)}!
              <Icon name="wave" className="h-6 w-6 text-blue-500" />
            </h1>
            <p className="mt-1 text-sm font-black text-blue-500">2026년 5월 성장 대시보드</p>
          </div>
          <div className="grid h-14 w-14 place-items-center rounded-2xl border border-blue-100 bg-white text-blue-600 shadow-sm">
            <Icon name="student" className="h-8 w-8" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 px-6 pb-8 pt-4">
        <GrowthKeywordCard report={report} />
        <SubjectGuideSection report={report} />
        <GrowthEvolutionSection report={report} />
        <RecommendationSnapshot report={report} />
        <TopMissionSection items={actionItems} />
        <section className="rounded-3xl bg-slate-950 p-5 text-center text-white shadow-lg">
          <p className="inline-flex items-center justify-center gap-2 text-sm font-black">
            <Icon name="message" className="h-4 w-4" />
            자세한 내용은 선생님과 상담하세요
          </p>
        </section>
      </div>

    </MobileShell>
  );
}

export function StudentReportListMobile({ reports }: { reports: StudentGuidanceReport[] }) {
  return (
    <MobileShell>
      <div className="px-5 pb-5 pt-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-black text-emerald-600">Future Fit</p>
          <Link href="/" className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600 shadow-sm ring-1 ring-slate-200">
            메인으로
          </Link>
        </div>
        <h1 className="mt-2 text-3xl font-black leading-tight text-slate-950">학생 선택</h1>
        <p className="mt-2 text-sm font-bold leading-6 text-slate-500">
          결과지를 확인할 학생을 선택하세요.
        </p>
      </div>

      <div className="grid gap-4 px-4 pb-8">
        {reports.map((report) => (
          <Link
            key={report.summary.studentId}
            href={`/student/reports/${report.summary.studentId}`}
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
      <div className="px-5 pb-8 pt-6">
        <section className="rounded-[2rem] bg-slate-950 p-6 text-white">
          <p className="text-sm font-black text-emerald-300">Future Fit</p>
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

      <div className="grid gap-4 px-4 pb-8 pt-4">
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
              <p key={strength} className="rounded-2xl bg-blue-50 p-3 text-sm font-black text-blue-700">
                {strength}
              </p>
            ))}
            {report.summary.improvements.slice(0, 2).map((item) => (
              <p key={item} className="rounded-2xl bg-orange-50 p-3 text-sm font-black text-orange-700">
                {item}
              </p>
            ))}
          </div>
        </MobileCard>
      </div>

    </MobileShell>
  );
}

export function StudentActionPlanMobile({ report }: StudentReportMobileProps) {
  const actionItems = getStudentActionItems(report);

  return (
    <MobileShell>
      <div className="px-5 pb-5 pt-5">
        <div className="flex items-center justify-between gap-3">
          <Link href={`/student/reports/${report.summary.studentId}`} className="text-sm font-black text-slate-500">
            ← 결과지
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

      <div className="grid gap-4 px-4 pb-8">
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

    </MobileShell>
  );
}

function GrowthKeywordCard({ report }: { report: StudentGuidanceReport }) {
  const isMiddle3 = report.reportType === "middle_3";
  const title = isMiddle3
    ? `"수학적 사고로 여는 IT 전문가의 꿈,\n${report.summary.studentName}의 도약을 응원해!"`
    : `"문해력과 데이터 감각으로 시작하는 중학교 생활,\n${report.summary.studentName}의 첫걸음을 응원해!"`;
  const keywords = isMiddle3 ? report.careerKeywords.slice(0, 3) : ["언론인", "문해력", "데이터 분석"];
  const status = isMiddle3 ? report.growthStatus : "중학교 평가 방식에 맞춰 강점을 성적으로 연결할 준비 단계입니다.";

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white shadow-[0_18px_35px_-14px_rgba(59,130,246,0.55)]">
      <div className="absolute -right-5 -top-5 text-white/10">
        <Icon name="rocket" className="h-28 w-28" strokeWidth={1.4} />
      </div>
      <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-blue-100">My Growth Keyword</p>
      <p className="whitespace-pre-line text-lg font-black leading-tight">{title}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {keywords.map((keyword) => (
          <span key={keyword} className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-black backdrop-blur">
            #{keyword}
          </span>
        ))}
      </div>
      <div className="mt-4 rounded-2xl bg-white/15 p-3 text-xs font-black leading-5 text-blue-50">
        <span className="mr-2 inline-flex items-center gap-1 rounded-lg bg-blue-400 px-2 py-1">
          <Icon name="spark" className="h-3 w-3" />
          현재 상태
        </span>
        {status}
      </div>
    </section>
  );
}

function SubjectGuideSection({ report }: { report: StudentGuidanceReport }) {
  const cards = getSubjectGuideCards(report);

  return (
    <section>
      <h2 className="px-1 text-lg font-black text-slate-800">과목별 한줄 가이드</h2>
      <div className="mt-4 grid gap-4">
        {cards.map((card) => (
          <div key={card.subject} className={`rounded-[1.8rem] border p-5 shadow-[0_10px_25px_-5px_rgba(59,130,246,0.08)] ${card.className}`}>
            <div className="mb-2 flex items-start justify-between gap-3">
              <div>
                <h3 className={`flex flex-wrap items-center gap-1.5 text-lg font-black leading-tight ${card.labelClassName}`}>
                  <span>{card.subject}</span>
                  {card.subjectLabel ? (
                    <span className="text-sm font-black">{card.subjectLabel}</span>
                  ) : null}
                  <span className="rounded-full bg-white/80 px-2 py-1 text-[10px] font-black text-slate-500 shadow-sm">
                    {card.status}
                  </span>
                </h3>
              </div>
              {card.score ? <span className="text-2xl font-black text-slate-800">{card.score}</span> : null}
            </div>
            <p className={`mb-3 text-xs font-black italic ${card.trendClassName}`}>{card.trend}</p>
            <p className="rounded-xl bg-white/60 p-3 text-[13px] font-black leading-6 text-slate-700">
              &quot;{card.comment}&quot;
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function GrowthEvolutionSection({ report }: { report: StudentGuidanceReport }) {
  const isMiddle3 = report.reportType === "middle_3";

  return (
    <section className="rounded-[2rem] border border-blue-50 bg-white p-6 shadow-[0_10px_25px_-5px_rgba(59,130,246,0.08)]">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="font-black text-slate-800">{report.summary.studentName}의 역량 성장과 변화</h2>
        <span className="rounded-full border border-blue-100 bg-blue-50 px-2 py-1 text-[10px] font-black text-blue-500">
          {isMiddle3 ? "이과형 인재로 도약 중" : "중학교 적응 준비 중"}
        </span>
      </div>

      <div className="relative mb-8 grid gap-6 pl-10 before:absolute before:bottom-0 before:left-5 before:top-0 before:w-px before:bg-gradient-to-b before:from-slate-200 before:to-blue-500">
        <GrowthPoint
          label={isMiddle3 ? "초6" : "현재"}
          title={isMiddle3 ? "분석형" : "문해력 기반 탐구형"}
          description={isMiddle3 ? "주어진 정보를 꼼꼼히 관찰하고 분류하는 기초 체력 단계" : "비판적 읽기와 자료 해석 강점이 드러나는 단계"}
          active={false}
        />
        <GrowthPoint
          label={isMiddle3 ? "중2" : "예비 중1"}
          title={isMiddle3 ? "논리탐구형" : "중학교 수행 적응형"}
          description={isMiddle3 ? "원리적 근거를 바탕으로 문제를 설계하고 해결하는 단계" : "서술형, 수행평가, 동아리 활동으로 강점을 확장할 단계"}
          active
        />
      </div>

      <div className="border-t border-slate-100 pt-4">
        <div className="mb-2 text-[11px]">
          <span className="inline-flex items-center gap-1 font-black text-blue-600">
            <Icon name="brain" className="h-3.5 w-3.5 text-blue-500" />
            {isMiddle3 ? "이과적 사고력" : "문해력 활용도"}
          </span>
        </div>
        <p className="text-xs font-bold leading-6 text-slate-600">
          {isMiddle3
            ? "단순한 학습을 넘어 기술의 작동 원리를 궁금해하는 이과형 인재의 특징이 뚜렷해지고 있습니다."
            : "자료를 읽고 근거를 찾아 설명하는 힘이 중학교 수행평가와 발표 활동의 기반이 될 수 있습니다."}
        </p>
      </div>
    </section>
  );
}

function GrowthPoint({
  label,
  title,
  description,
  active,
}: {
  label: string;
  title: string;
  description: string;
  active: boolean;
}) {
  return (
    <div className="relative">
      <div className={`absolute -left-10 top-1 grid h-10 w-10 place-items-center rounded-full border-4 border-white text-[10px] font-black shadow-sm ${active ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-400"}`}>
        {label}
      </div>
      <p className={`text-sm font-black ${active ? "text-blue-600" : "text-slate-500"}`}>{title}</p>
      <p className={`mt-1 text-[11px] font-bold leading-5 ${active ? "text-blue-500" : "text-slate-400"}`}>{description}</p>
    </div>
  );
}

function RecommendationSnapshot({ report }: { report: StudentGuidanceReport }) {
  const isMiddle3 = report.reportType === "middle_3";
  const schoolTitle = isMiddle3
    ? `${report.highSchools[0]?.schoolType ?? "추천 고교"} (${report.highSchools[0]?.examples.join("·") ?? "학교 확인"})`
    : `${report.schoolFits[0]?.name ?? "추천 중학교"} 중심 준비`;
  const schoolDescription = isMiddle3
    ? report.highSchools[0]?.reason ?? "진로와 연결되는 고교 유형을 검토합니다."
    : report.schoolFits[0]?.recommendationPoint ?? "중학교 적응 전략을 준비합니다.";
  const majorTitle = isMiddle3
    ? report.majors[0]?.majors.slice(0, 2).join(" / ") ?? "추천 전공"
    : "방송부 / 독서토론부";

  return (
    <section className="rounded-[2rem] border-2 border-dashed border-blue-100 bg-white p-6 shadow-[0_10px_25px_-5px_rgba(59,130,246,0.08)]">
      <h2 className="mb-4 flex items-center gap-2 text-sm font-black text-blue-600">
        <Icon name="school" className="h-4 w-4" />
        추천 진로
      </h2>
      <div className="grid gap-4">
        <div className="flex items-start gap-3 rounded-2xl bg-blue-50/60 p-3">
          <div className="mt-1.5 h-2 w-2 rounded-full bg-blue-400 shadow-sm" />
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400">Target School</p>
            <p className="mt-1 text-[13px] font-black leading-5 text-slate-800">{schoolTitle}</p>
            <p className="mt-1 text-[11px] font-bold leading-5 text-slate-500">{schoolDescription}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-2xl bg-indigo-50/70 p-3">
          <div className="mt-1.5 h-2 w-2 rounded-full bg-indigo-400 shadow-sm" />
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400">{isMiddle3 ? "Dream Major" : "Activity Track"}</p>
            <p className="mt-1 text-[13px] font-black text-slate-800">{majorTitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TopMissionSection({ items }: { items: string[] }) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between px-1">
        <h2 className="text-lg font-black text-slate-800">이번 달 Top 3 미션</h2>
        <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-black text-emerald-500">목표 달성 중</span>
      </div>
      <div className="grid gap-3">
        {items.slice(0, 3).map((item, index) => (
          <label key={item} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_10px_25px_-5px_rgba(59,130,246,0.08)]">
            <span className="flex items-center gap-3">
              <span className={`grid h-8 w-8 place-items-center rounded-xl text-xs font-black ${missionTone[index % missionTone.length]}`}>
                <Icon name={missionIcons[index % missionIcons.length]} className="h-4 w-4" />
              </span>
              <span className="text-[13px] font-black leading-5 text-slate-700">{item}</span>
            </span>
            <span className="relative inline-flex h-5 w-10 shrink-0">
              <input type="checkbox" className="peer sr-only" />
              <span className="h-5 w-10 rounded-full bg-slate-200 shadow-inner transition-colors duration-200 after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform after:duration-200 peer-checked:bg-emerald-500 peer-checked:after:translate-x-5" />
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}

function getSubjectGuideCards(report: StudentGuidanceReport) {
  if (report.reportType === "middle_3") {
    return report.subjects.map((subject) => {
      const latestScore = subject.chartValues[subject.chartValues.length - 1] ?? subject.currentScore;
      const previousScore = subject.chartValues[subject.chartValues.length - 2] ?? subject.previousScore;
      const previousLabel = formatStudentSubjectGuidePeriod(
        subject.chartLabels[subject.chartLabels.length - 2] ?? "직전 학기",
      );
      const diff = latestScore - previousScore;
      const tone = subject.subject === "수학" ? "emerald" : subject.subject === "영어" ? "violet" : "orange";
      return {
        subject: subject.subject,
        subjectLabel: subject.subject === "수학" ? "Math" : subject.subject === "영어" ? "English" : "Korean",
        status: subject.status,
        score: `${latestScore}점`,
        trend: `${previousLabel} 대비 ${Math.abs(diff)}점 ${diff >= 0 ? "상승" : "하락"}`,
        comment: subject.recommendedStrategy,
        className: subjectToneClass[tone].card,
        labelClassName: subjectToneClass[tone].text,
        trendClassName: diff >= 0 ? "text-emerald-600" : "text-rose-500",
      };
    });
  }

  return report.learningStrategies.slice(0, 3).map((strategy) => ({
    subject: strategy.subject,
    subjectLabel: "",
    status: `우선 ${strategy.priority}`,
    score: "",
    trend: strategy.goal,
    comment: strategy.method,
    className: subjectToneClass[strategy.tone === "sky" ? "blue" : strategy.tone].card,
    labelClassName: subjectToneClass[strategy.tone === "sky" ? "blue" : strategy.tone].text,
    trendClassName: subjectToneClass[strategy.tone === "sky" ? "blue" : strategy.tone].text,
  }));
}

function formatStudentSubjectGuidePeriod(period: string) {
  return period.replace(/^중3/, "중2");
}

const subjectToneClass = {
  emerald: { card: "border-emerald-100 bg-emerald-50", text: "text-emerald-600" },
  violet: { card: "border-violet-100 bg-violet-50", text: "text-violet-600" },
  orange: { card: "border-orange-100 bg-orange-50", text: "text-orange-600" },
  amber: { card: "border-orange-100 bg-orange-50", text: "text-orange-600" },
  blue: { card: "border-blue-100 bg-blue-50", text: "text-blue-600" },
} as const;

const missionTone = [
  "bg-emerald-100 text-emerald-600",
  "bg-orange-100 text-orange-600",
  "bg-indigo-100 text-indigo-600",
];

const missionIcons = ["calculator", "book", "users"] as const;

function Icon({
  name,
  className,
  strokeWidth = 2,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth,
  };

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {name === "rocket" ? (
        <>
          <path {...common} d="M5 19c2.5-.5 4.5-1.6 6-3.2" />
          <path {...common} d="M9 15 5 11l3-3 4 4" />
          <path {...common} d="M12 12c4.2-1.1 6.8-4 8-9-5 .8-7.9 3.4-9 8" />
          <path {...common} d="M15 6h.01" />
          <path {...common} d="M6 20l-2-2" />
        </>
      ) : name === "student" ? (
        <>
          <circle {...common} cx="12" cy="8" r="4" />
          <path {...common} d="M5 21a7 7 0 0 1 14 0" />
          <path {...common} d="M7 4 12 2l5 2-5 2z" />
        </>
      ) : name === "wave" ? (
        <>
          <path {...common} d="M8.5 11.5V5.8a1.3 1.3 0 0 1 2.6 0v5" />
          <path {...common} d="M11.1 10V4.7a1.3 1.3 0 0 1 2.6 0v6.1" />
          <path {...common} d="M13.7 10V6a1.3 1.3 0 0 1 2.6 0v6" />
          <path {...common} d="M16.3 12V9a1.3 1.3 0 0 1 2.6 0v5.2c0 4-2.7 6.8-6.7 6.8h-.5a6.2 6.2 0 0 1-5.4-3.2l-1.8-3.1a1.35 1.35 0 0 1 2.2-1.5l1.8 2.2" />
          <path {...common} d="M4 5.5 2.5 4M5 3.5 4.4 1.6M19.5 4l1.7-1.2" />
        </>
      ) : name === "spark" ? (
        <>
          <path {...common} d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
          <path {...common} d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z" />
        </>
      ) : name === "calculator" ? (
        <>
          <rect {...common} x="5" y="3" width="14" height="18" rx="2" />
          <path {...common} d="M8 7h8M8 11h2M12 11h2M16 11h.01M8 15h2M12 15h2M16 15h.01" />
        </>
      ) : name === "book" ? (
        <>
          <path {...common} d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z" />
          <path {...common} d="M4 5.5v15M8 7h8M8 11h7" />
        </>
      ) : name === "language" ? (
        <>
          <path {...common} d="M4 5h9M9 3v2M6 9c1.4 3 3.5 4.8 6 6" />
          <path {...common} d="M12 5c-.7 4-2.7 7-6 9" />
          <path {...common} d="M14 21l4-9 4 9M16 17h4" />
        </>
      ) : name === "school" ? (
        <>
          <path {...common} d="m3 10 9-5 9 5-9 5z" />
          <path {...common} d="M7 12v5c3 2 7 2 10 0v-5" />
          <path {...common} d="M21 10v6" />
        </>
      ) : name === "users" ? (
        <>
          <path {...common} d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle {...common} cx="10" cy="7" r="4" />
          <path {...common} d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </>
      ) : name === "brain" ? (
        <>
          <path {...common} d="M9 4a3 3 0 0 0-3 3v.5A3.5 3.5 0 0 0 6.5 14 3 3 0 0 0 9 20" />
          <path {...common} d="M15 4a3 3 0 0 1 3 3v.5a3.5 3.5 0 0 1-.5 6.5A3 3 0 0 1 15 20" />
          <path {...common} d="M9 4v16M15 4v16M9 9h2M13 9h2M9 14h2M13 14h2" />
        </>
      ) : name === "message" ? (
        <>
          <path {...common} d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
          <path {...common} d="M8 9h8M8 13h5" />
        </>
      ) : (
        <>
          <path {...common} d="M12 3l2.4 5 5.6.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.6-.8z" />
        </>
      )}
    </svg>
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

function formatFriendlyName(name: string) {
  const trimmedName = name.trim();
  const givenName = trimmedName.length >= 3 ? trimmedName.slice(1) : trimmedName;

  return `${givenName}${hasKoreanFinalConsonant(givenName) ? "아" : "야"}`;
}

function hasKoreanFinalConsonant(value: string) {
  const lastCharCode = value.charCodeAt(value.length - 1);

  if (lastCharCode < 0xac00 || lastCharCode > 0xd7a3) {
    return false;
  }

  return (lastCharCode - 0xac00) % 28 !== 0;
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
