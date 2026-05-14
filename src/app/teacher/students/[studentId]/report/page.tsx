import { LearningStrategyCard } from "@/components/report/LearningStrategyCard";
import { SchoolFitCard } from "@/components/report/SchoolFitCard";
import { StudentSummaryCard } from "@/components/report/StudentSummaryCard";
import { TeacherActionPlan } from "@/components/report/TeacherActionPlan";
import { StoredStudentReport } from "@/components/report-input-data-section";
import {
  AssessmentDetailPanel,
  Card,
  DiagnosisTrend,
  PersonalityAssessmentPanel,
  ScoreBars,
  SubjectGrowthChart,
  Timeline,
  formatDate,
  formatSchool,
} from "@/components/report-ui";
import { generateStudentReport } from "@/lib/ai/generateReport";
import { getStudentGuidanceReport } from "@/lib/api/studentReport";
import { getMockStudent } from "@/lib/mock/students";
import type { StudentReport } from "@/types/report";
import type { StudentRecord } from "@/types/student";
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

  if (!report && mockStudent) {
    const legacyResult = await generateStudentReport(studentId);
    return <LegacyTeacherReport report={legacyResult.report} student={mockStudent} />;
  }

  if (!report) {
    return <StoredStudentReport studentId={studentId} />;
  }

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

function LegacyTeacherReport({ report, student }: { report: StudentReport; student: StudentRecord }) {
  const latestPersonality = student.personalityHistory.at(-1);
  const latestDiagnosis = student.diagnosisHistory.at(-1);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link href="/teacher" className="text-sm font-black text-slate-500">
            ← 학생 목록
          </Link>
          <p className="text-sm font-bold text-slate-400">
            결과 기준 {formatDate(report.generatedAt)}
          </p>
        </div>

        <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-300">
            Teacher Report
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-normal md:text-5xl">
            {report.student.name} 결과지
          </h1>
          <p className="mt-4 max-w-3xl text-lg font-bold leading-8 text-slate-200">
            {report.student.latestCareerGoal} 방향을 기준으로 누적 검사와 학습 성장 데이터를 상담용 리포트로 정리했습니다.
          </p>
          <div className="mt-6 grid gap-3 rounded-3xl bg-white/10 p-5 text-sm font-bold md:grid-cols-4">
            <p>학교/학년: {formatSchool(report.student.schoolLevel, report.student.grade)}</p>
            <p>학교: {report.student.school}</p>
            <p>희망 진로: {report.student.latestCareerGoal}</p>
            <p>최근 분석: {formatDate(report.student.lastAnalyzedAt)}</p>
          </div>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-4">
          <SummaryCard title="성향 변화" value={report.cumulativeSummary.personalityChange} />
          <SummaryCard title="진단 변화" value={report.cumulativeSummary.diagnosisChange} />
          <SummaryCard title="과목 성장" value={report.cumulativeSummary.subjectGrowth} />
          <SummaryCard title="진로 변화" value={report.cumulativeSummary.careerDirection} />
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <Card title="관심 직업·전공·학교">
            <div className="grid gap-4">
              <TagGroup title="관심 직업" items={student.interestedJobs} />
              <TagGroup title="관심 전공" items={student.interestedMajors} />
              <TagGroup title="관심 학교 방향" items={student.interestedSchools} />
            </div>
          </Card>
          <Card title="학교 시험·수행평가 인사이트" description={report.cumulativeSummary.schoolInsight}>
            <SchoolInsightList student={student} />
          </Card>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Card title="AI 분석 요약" description="현재는 mock/template 기반 요약입니다.">
            <div className="grid gap-5">
              <BulletGroup title="강점" items={report.aiSummary.strengths} />
              <BulletGroup title="보완 필요" items={report.aiSummary.improvements} />
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-black text-slate-500">진로 해석</p>
                <p className="mt-2 text-sm font-bold leading-7 text-slate-700">
                  {report.aiSummary.careerInterpretation}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-950 p-4 text-white">
                <p className="text-sm font-black text-emerald-300">상담 핵심 코멘트</p>
                <p className="mt-2 text-sm font-bold leading-7">{report.aiSummary.teacherComment}</p>
              </div>
            </div>
          </Card>

          <Card title="상담용 세일즈 톡">
            <div className="grid gap-5">
              <div>
                <p className="text-sm font-black text-slate-500">성향검사</p>
                <h3 className="mt-1 text-2xl font-black">
                  {latestPersonality?.type.primary ?? "-"} / {latestPersonality?.type.secondary ?? "-"}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {latestPersonality?.note ?? "최근 성향검사 데이터가 없습니다."}
                </p>
              </div>
              {latestPersonality ? (
                <ScoreBars
                  scores={[
                    { label: "분석적 사고", value: latestPersonality.traits.analyticalThinking },
                    { label: "창의성", value: latestPersonality.traits.creativity },
                    { label: "실행력", value: latestPersonality.traits.execution },
                    { label: "집중력", value: latestPersonality.traits.concentration },
                  ]}
                />
              ) : null}
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-black text-slate-500">최근 진단</p>
                <p className="mt-2 leading-7 text-slate-700">
                  {latestDiagnosis?.summary ?? "최근 진단검사 데이터가 없습니다."}
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section className="mt-5">
          <Card
            title="성향검사 결과"
            description="연도별 성향 변화와 축별 수치, 정성 기록을 함께 확인합니다."
          >
            <PersonalityAssessmentPanel items={student.personalityHistory} />
          </Card>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-2">
          <Card title="진단검사 결과">
            <DiagnosisTrend items={student.diagnosisHistory} />
          </Card>
          <Card
            title="국어·영어·수학 성장 변화"
            description="평가 시기별 주요 과목 총점 흐름입니다."
          >
            <SubjectGrowthChart items={student.subjectGrowth} />
          </Card>
        </section>

        <section className="mt-5">
          <Card
            title="진단평가 상세"
            description="상위 비율, 영역별 성취도, 난이도별 성취도를 과목별로 확인합니다."
          >
            <AssessmentDetailPanel assessments={student.subjectAssessments} />
          </Card>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Card title="진로 방향 변화 타임라인">
            <Timeline
              items={student.careerTimeline.map((item) => ({
                date: item.date,
                title: item.goal,
                description: item.reason,
              }))}
            />
          </Card>
          <Card title="진로·진학 로드맵" description={`${report.student.latestCareerGoal} 기준 추천 경로입니다.`}>
            <div className="grid gap-3">
              {report.roadmap.map((section) => (
                <div key={section.title} className="rounded-2xl bg-slate-50 p-4">
                  <h3 className="font-black text-slate-950">{section.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{section.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {section.items.map((item) => (
                      <span key={item} className="rounded-full bg-white px-3 py-2 text-xs font-black text-slate-700 ring-1 ring-slate-200">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <Card title="학습 전략 플랜" description={report.learningPlan.summary}>
            <div className="grid gap-4">
              {report.learningPlan.priorities.map((priority) => (
                <div key={priority.subject} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-black">{priority.subject}</h3>
                    <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black text-white">
                      우선순위 {priority.priority}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{priority.reason}</p>
                  <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm font-bold text-slate-700">
                    {priority.action}
                  </p>
                </div>
              ))}
              <div className="grid gap-3 md:grid-cols-2">
                {report.learningPlan.nextActions.map((plan) => (
                  <div key={plan.term} className="rounded-2xl bg-slate-50 p-4">
                    <h3 className="font-black">{plan.term}</h3>
                    <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-600">
                      {plan.actions.map((action) => (
                        <li key={action}>• {action}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card title="상담용 세일즈 톡">
            <div className="grid gap-3">
              {report.counselingTalk.map((talk, index) => (
                <div key={talk} className="rounded-2xl bg-slate-950 p-4 text-white">
                  <p className="text-xs font-black text-emerald-300">Talk {index + 1}</p>
                  <p className="mt-2 text-sm font-bold leading-7 text-slate-100">{talk}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}

function SchoolInsightList({ student }: { student: StudentRecord }) {
  return (
    <div className="grid gap-3">
      {student.schoolAssessmentInsights.map((insight) => (
        <div key={`${insight.subject}-${insight.pattern}`} className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm font-black text-slate-950">{insight.subject}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{insight.pattern}</p>
          <p className="mt-2 text-sm font-bold leading-6 text-slate-800">
            {insight.recommendation}
          </p>
        </div>
      ))}
      <div className="grid gap-2 rounded-2xl border border-slate-200 p-4">
        <p className="text-sm font-black text-slate-500">다가오는 학사 일정</p>
        {student.academicSchedule.map((schedule) => (
          <div key={`${schedule.date}-${schedule.title}`} className="flex items-center justify-between gap-3 text-sm">
            <span className="font-bold text-slate-700">{schedule.title}</span>
            <span className="text-slate-400">{formatDate(schedule.date)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SummaryCard({ title, value }: { title: string; value: string }) {
  return (
    <Card title={title}>
      <p className="text-sm font-bold leading-7 text-slate-600">{value}</p>
    </Card>
  );
}

function TagGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-sm font-black text-slate-500">{title}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.length ? (
          items.map((item) => (
            <span
              key={item}
              className="rounded-full bg-slate-100 px-3 py-2 text-xs font-black text-slate-700"
            >
              {item}
            </span>
          ))
        ) : (
          <span className="text-sm text-slate-400">데이터 없음</span>
        )}
      </div>
    </div>
  );
}

function BulletGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-black text-slate-950">{title}</h3>
      <ul className="mt-3 grid gap-2">
        {items.map((item) => (
          <li key={item} className="rounded-2xl bg-slate-50 p-3 text-sm font-bold leading-6 text-slate-700">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mt-10 mb-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-600">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-black text-slate-950 md:text-3xl">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm font-bold leading-6 text-slate-500">{description}</p>
    </div>
  );
}
