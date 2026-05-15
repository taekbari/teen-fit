import { CreditCourseTagSection } from "@/components/report/CreditCourseTagSection";
import { HighSchoolRecommendationCard } from "@/components/report/HighSchoolRecommendationCard";
import { LearningStrategyCard } from "@/components/report/LearningStrategyCard";
import { MajorRecommendationSection } from "@/components/report/MajorRecommendationSection";
import { RoadmapTimeline } from "@/components/report/RoadmapTimeline";
import { SchoolFitCard } from "@/components/report/SchoolFitCard";
import { StrategyPlanCard } from "@/components/report/StrategyPlanCard";
import { StudentHeroSummary } from "@/components/report/StudentHeroSummary";
import { StudentSummaryCard } from "@/components/report/StudentSummaryCard";
import { SubjectAnalysisCard } from "@/components/report/SubjectAnalysisCard";
import { TeacherActionPlan } from "@/components/report/TeacherActionPlan";
import { TeacherConsultingPanel } from "@/components/report/TeacherConsultingPanel";
import { StoredStudentReport } from "@/components/report-input-data-section";
import {
  AssessmentDetailPanel,
  Card,
  PersonalityAssessmentPanel,
  SchoolGradeDetailPanel,
  formatDate,
} from "@/components/report-ui";
import { getStudentGuidanceReport } from "@/lib/api/studentReport";
import { getMockStudent } from "@/lib/mock/students";
import type { StudentRecord, SubjectAssessmentRecord } from "@/types/student";
import type { Middle3Report, PreMiddleReport, SubjectAnalysis, TrendDirection } from "@/types/studentReport";
import Link from "next/link";

type PageProps = {
  params: Promise<{
    studentId: string;
  }>;
};

export default async function TeacherReportPage({ params }: PageProps) {
  const { studentId } = await params;
  const report = await getStudentGuidanceReport(studentId);
  const mockStudent = getMockStudent(studentId);

  // Legacy 김민준 결과 화면은 현재 화면에서 노출하지 않습니다.
  // if (!report && mockStudent) {
  //   const legacyResult = await generateStudentReport(studentId);
  //   return <LegacyTeacherReport report={legacyResult.report} student={mockStudent} />;
  // }

  if (!report) {
    return <StoredStudentReport studentId={studentId} />;
  }

  if (report.reportType === "middle_3") {
    return <Middle3ReportView report={report} student={mockStudent} />;
  }

  return <PreMiddleReportView report={report} />;
}

function PreMiddleReportView({ report }: { report: PreMiddleReport }) {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link href="/teacher" className="text-sm font-black text-slate-500">
            ← 학생 목록
          </Link>
          <p className="text-sm font-bold text-slate-400">
            결과 기준 {formatDate(report.summary.generatedAt)}
          </p>
        </div>

        <StudentSummaryCard summary={report.summary} />

        <section className="mt-6 rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
          <p className="text-sm font-black text-emerald-800">상담 핵심</p>
          <p className="mt-2 text-lg font-black leading-8 text-emerald-950">
            배정 가능성이 높은 학교의 평가 방식에 맞춰 수아의 문해력 강점을 성적으로 연결하고,
            수학 고난도 부담은 풀이 과정 구조화로 낮추는 전략이 필요합니다.
          </p>
        </section>

        <SectionHeader
          eyebrow="School Fit"
          title="배정 가능성 높은 학교 정보"
          description="주변 중학교 3곳을 수아 학생의 강점, 보완점, 진로 방향과 연결해 상담용으로 정리했습니다."
        />
        <section className="grid gap-5 lg:grid-cols-3">
          {report.schoolFits.map((school) => (
            <SchoolFitCard key={school.id} school={school} />
          ))}
        </section>

        <SectionHeader
          eyebrow="Adaptation"
          title="중학교 적응 안내"
          description="예비 중1 전환기에 학생과 학부모가 먼저 알고 준비해야 할 변화입니다."
        />
        <section className="grid gap-5 lg:grid-cols-2">
          <InfoListCard title="학교생활 변화" items={report.adaptationGuide} />
          <InfoListCard title="맞춤 생활 적응 전략" items={report.lifeStrategies} tone="emerald" />
        </section>

        <SectionHeader
          eyebrow="Learning Strategy"
          title="맞춤 학습 전략"
          description="예비 중1 전환기에 바로 실행할 수 있는 과목별 전략입니다."
        />
        <section className="grid gap-5 md:grid-cols-2">
          {report.learningStrategies.map((strategy) => (
            <LearningStrategyCard key={strategy.subject} strategy={strategy} />
          ))}
        </section>

        <SectionHeader
          eyebrow="Action Plan"
          title="선생님 상담용 액션 플랜"
          description="이번 달 우선 과제와 학부모 상담 코멘트를 바로 사용할 수 있게 구성했습니다."
        />
        <TeacherActionPlan actionPlan={report.actionPlan} />
      </div>
    </main>
  );
}

function Middle3ReportView({ report, student }: { report: Middle3Report; student?: StudentRecord }) {
  const subjectAnalyses = student
    ? buildSubjectAnalysesFromAssessments(report, student.subjectAssessments)
    : report.subjects;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link href="/teacher" className="text-sm font-black text-slate-500">
            ← 학생 목록
          </Link>
          <p className="text-sm font-bold text-slate-400">
            결과 기준 {formatDate(report.summary.generatedAt)}
          </p>
        </div>

        <StudentHeroSummary report={report} />

        <SectionHeader eyebrow="Subject Dashboard" title="과목 분석 대시보드" />
        <section className="grid gap-5 lg:grid-cols-3">
          {subjectAnalyses.map((subject) => <SubjectAnalysisCard key={subject.subject} subject={subject} />)}
        </section>

        {student ? (
          <section className="mt-5">
            <Card title="진단평가 상세">
              <AssessmentDetailPanel assessments={student.subjectAssessments} />
            </Card>
          </section>
        ) : null}

        {student ? (
          <>
            <SectionHeader
              eyebrow="Assessment Data"
              title="성향검사 근거 데이터"
            />
            <section>
              <Card
                title="성향검사 누적 변화"
                description={"분석적이고 꼼꼼했던 초등기를 지나, 중2로 오면서 ‘행동/확산/함께/자율’형으로 급격히 변화했습니다.\n이는 고등학교 진학 후 팀 프로젝트 기반의 IT 탐구 활동에 매우 적합한 성향입니다."}
              >
                <PersonalityAssessmentPanel items={student.personalityHistory} />
              </Card>
            </section>

            <section className="mt-5">
              <Card title="과목별 내신점수 상세">
                <SchoolGradeDetailPanel data={student.schoolGrades} />
              </Card>
            </section>
          </>
        ) : null}

        <SectionHeader eyebrow="Roadmap" title="진학 로드맵 타임라인" />
        <RoadmapTimeline steps={report.roadmap} />

        <SectionHeader eyebrow="High School" title="추천 고등학교" description="IT/반도체 진로와 연결되는 고교 유형을 우선순위로 제안합니다." />
        <section className="grid gap-5 lg:grid-cols-2">
          {report.highSchools.map((school) => <HighSchoolRecommendationCard key={school.schoolType} school={school} />)}
        </section>

        <SectionHeader eyebrow="Major Track" title="추천 학과" />
        <MajorRecommendationSection majors={report.majors} />

        <SectionHeader eyebrow="Credit System" title="고교학점제 추천 과목" />
        <CreditCourseTagSection groups={report.creditCourses} />

        <SectionHeader eyebrow="Strategy" title="학습 전략 플랜" description="수학과 과학 목표 점수, 진행률, 체크리스트를 함께 보여줍니다." />
        <section className="grid gap-5 lg:grid-cols-2">
          {report.strategyPlans.map((plan) => <StrategyPlanCard key={plan.subject} plan={plan} />)}
        </section>

        <SectionHeader eyebrow="Teacher Consulting" title="선생님 상담 액션 플랜" />
        <TeacherConsultingPanel plan={report.consultingPlan} />
      </div>
    </main>
  );
}

function InfoListCard({
  title,
  items,
  tone = "slate",
}: {
  title: string;
  items: string[];
  tone?: "slate" | "emerald";
}) {
  const itemClassName =
    tone === "emerald"
      ? "bg-emerald-50 text-emerald-900"
      : "bg-slate-50 text-slate-700";

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-black text-slate-500">{title}</p>
      <ul className="mt-4 grid gap-3">
        {items.map((item) => (
          <li key={item} className={`rounded-2xl p-3 text-sm font-bold leading-6 ${itemClassName}`}>
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

function buildSubjectAnalysesFromAssessments(
  report: Middle3Report,
  assessments: SubjectAssessmentRecord[],
): SubjectAnalysis[] {
  return report.subjects.map((subject) => {
    const subjectAssessments = assessments.filter((assessment) => assessment.subject === subject.subject);

    if (!subjectAssessments.length) {
      return subject;
    }

    const chartValues = subjectAssessments.map((assessment) => assessment.totalScore);
    const chartLabels = subjectAssessments.map((assessment) => formatAssessmentPeriod(assessment.period));
    const currentScore = chartValues.at(-1) ?? subject.currentScore;
    const previousScore = chartValues.at(-2) ?? subject.previousScore;
    const diff = currentScore - previousScore;

    return {
      ...subject,
      currentScore,
      previousScore,
      trend: toTrendDirection(diff),
      chartValues,
      chartLabels,
    };
  });
}

function formatAssessmentPeriod(period: string) {
  const match = period.match(/^중(\d)-(\d)$/);

  if (!match) {
    return period;
  }

  return `중${match[1]} ${match[2]}학기`;
}

function toTrendDirection(diff: number): TrendDirection {
  if (diff > 0) {
    return "up";
  }

  if (diff < 0) {
    return "down";
  }

  return "stable";
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mt-10 mb-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-600">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-black text-slate-950 md:text-3xl">{title}</h2>
      {description ? (
        <p className="mt-2 max-w-3xl text-sm font-bold leading-6 text-slate-500">{description}</p>
      ) : null}
    </div>
  );
}
