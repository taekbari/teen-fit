import {
  Card,
  AssessmentDetailPanel,
  DiagnosisTrend,
  PersonalityAssessmentPanel,
  ScoreBars,
  SubjectGrowthChart,
  Timeline,
  formatDate,
  formatSchool,
} from "@/components/report-ui";
import { LocalStudentReport, ReportInputDataSection } from "@/components/report-input-data-section";
import { generateStudentReport } from "@/lib/ai/generateReport";
import { getMockStudent } from "@/lib/mock/students";
import Link from "next/link";

type PageProps = {
  params: Promise<{
    studentId: string;
  }>;
};

export default async function TeacherReportPage({ params }: PageProps) {
  const { studentId } = await params;
  const student = getMockStudent(studentId);

  if (!student) {
    return <LocalStudentReport studentId={studentId} />;
  }

  const result = await generateStudentReport(studentId);
  const { report, meta } = result;
  const latestPersonality = student.personalityHistory.at(-1);
  const latestDiagnosis = student.diagnosisHistory.at(-1);

  return (
    <main className="min-h-screen px-8 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/teacher" className="text-sm font-black text-slate-500">
            ← 학생 목록
          </Link>
          <p className="text-sm font-bold text-slate-400">
            Report generated {formatDate(report.generatedAt)}
          </p>
        </div>

        <section className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-300">
                Teacher Report
              </p>
              <h1 className="mt-4 text-5xl font-black tracking-normal">{student.name} 결과지</h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
                {student.latestCareerGoal} 방향을 기준으로 누적 검사와 학습 성장 데이터를
                상담용 리포트로 정리했습니다.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-950">
                  source: {meta.source}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-slate-200">
                  {meta.aiEnabled ? "AI enabled" : "AI disabled"}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-slate-200">
                  {meta.promptVersion}
                </span>
              </div>
            </div>
            <div className="rounded-3xl bg-white/10 p-5">
              <InfoRow label="학교/학년" value={formatSchool(student.schoolLevel, student.grade)} />
              <InfoRow label="학교" value={student.school} />
              <InfoRow label="현재 희망 진로" value={student.latestCareerGoal} />
              <InfoRow label="최근 분석 기준일" value={formatDate(student.lastAnalyzedAt)} />
            </div>
          </div>
        </section>

        {meta.warnings.length ? (
          <section className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-black text-amber-900">API 응답 안내</p>
            <ul className="mt-2 grid gap-1 text-sm leading-6 text-amber-800">
              {meta.warnings.map((warning) => (
                <li key={warning}>• {warning}</li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-8 grid gap-5 lg:grid-cols-4">
          <Card title="성향 변화">
            <p className="text-sm leading-7 text-slate-600">
              {report.cumulativeSummary.personalityChange}
            </p>
          </Card>
          <Card title="진단 변화">
            <p className="text-sm leading-7 text-slate-600">
              {report.cumulativeSummary.diagnosisChange}
            </p>
          </Card>
          <Card title="과목 성장">
            <p className="text-sm leading-7 text-slate-600">
              {report.cumulativeSummary.subjectGrowth}
            </p>
          </Card>
          <Card title="진로 변화">
            <p className="text-sm leading-7 text-slate-600">
              {report.cumulativeSummary.careerDirection}
            </p>
          </Card>
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
          </Card>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Card
            title="AI 분석 요약"
            description="현재는 mock/template 기반 요약입니다. Claude API 호출은 사용하지 않습니다."
          >
            <div className="grid gap-5">
              <SummaryList title="강점" items={report.aiSummary.strengths} />
              <SummaryList title="보완 필요" items={report.aiSummary.improvements} />
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-black text-slate-500">진로 해석</p>
                <p className="mt-2 leading-7 text-slate-700">
                  {report.aiSummary.careerInterpretation}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-950 p-4 text-white">
                <p className="text-sm font-black text-emerald-300">상담 핵심 코멘트</p>
                <p className="mt-2 leading-7 text-slate-100">{report.aiSummary.teacherComment}</p>
              </div>
            </div>
          </Card>

          <Card title="최신 검사 스냅샷">
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

        <ReportInputDataSection studentId={student.id} />

        <section className="mt-5">
          <Card
            title="성향검사 누적 변화"
            description="업로드된 성향 엑셀의 정성 기록과 축별 수치 데이터를 함께 보여줍니다."
          >
            <PersonalityAssessmentPanel items={student.personalityHistory} />
          </Card>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-2">
          <Card title="6개월 단위 진단검사 변화">
            <DiagnosisTrend items={student.diagnosisHistory} />
          </Card>
          <Card
            title="국어·영어·수학 성장 변화"
            description="업로드된 엑셀의 평가 시기별 총점 데이터를 기준으로 표시합니다."
          >
            <SubjectGrowthChart items={student.subjectGrowth} />
          </Card>
        </section>

        <section className="mt-5">
          <Card
            title="진단평가 상세"
            description="엑셀에 포함된 상위 비율, 영역별 성취도, 난이도별 성취도를 최근 평가 기준으로 보여줍니다."
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
          <Card title="진로·진학 로드맵" description={`${student.latestCareerGoal} 기준 추천 경로입니다.`}>
            <div className="grid gap-4">
              {report.roadmap.map((section) => (
                <div key={section.title} className="rounded-2xl bg-slate-50 p-4">
                  <h3 className="font-black text-slate-950">{section.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{section.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {section.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-white px-3 py-2 text-xs font-black text-slate-700 ring-1 ring-slate-200"
                      >
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
                  <div className="flex items-center justify-between">
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
                  <p className="mt-2 leading-7 text-slate-100">{talk}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-white/10 py-3 last:border-0">
      <p className="text-xs font-black uppercase text-slate-400">{label}</p>
      <p className="mt-1 font-bold text-white">{value || "-"}</p>
    </div>
  );
}

function SummaryList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-black text-slate-950">{title}</h3>
      <ul className="mt-3 grid gap-2">
        {items.length ? (
          items.map((item) => (
            <li key={item} className="rounded-2xl bg-slate-50 p-3 text-sm leading-6 text-slate-700">
              {item}
            </li>
          ))
        ) : (
          <li className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-500">데이터 없음</li>
        )}
      </ul>
    </div>
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
