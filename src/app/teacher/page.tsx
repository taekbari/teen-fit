import { Card, StatusBadge, formatDate, formatSchool } from "@/components/report-ui";
import { mockStudents } from "@/lib/mock/students";
import Link from "next/link";

export default function TeacherHomePage() {
  return (
    <main className="min-h-screen px-8 py-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-slate-500">
              Teacher Dashboard
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-normal text-slate-950">
              학생 분석 결과 관리
            </h1>
            <p className="mt-3 text-slate-600">
              누적 성향검사, 진단평가, 진로 변화, 학교 평가 인사이트를 상담용 결과지로
              확인합니다. 현재는 mock/template 데이터 기반입니다.
            </p>
          </div>
          <Link
            href="/student"
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm"
          >
            학생 화면 placeholder
          </Link>
        </header>

        <div className="mt-8 grid gap-4">
          {mockStudents.map((student) => (
            <Card key={student.id}>
              <div className="grid gap-5 lg:grid-cols-[1fr_180px] lg:items-center">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-black text-slate-950">{student.name}</h2>
                    <StatusBadge status={student.status} />
                  </div>
                  <div className="mt-3 grid gap-2 text-sm text-slate-600 md:grid-cols-4">
                    <p>{formatSchool(student.schoolLevel, student.grade)}</p>
                    <p>{student.school}</p>
                    <p>희망 진로: {student.latestCareerGoal}</p>
                    <p>최근 분석: {formatDate(student.lastAnalyzedAt)}</p>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-500">
                    최근 관찰 메모: {student.teacherObservations.at(-1)?.memo ?? "기록 없음"}
                  </p>
                </div>
                <Link
                  href={`/teacher/students/${student.id}/report`}
                  className="rounded-2xl bg-slate-950 px-5 py-3 text-center text-sm font-black text-white"
                >
                  결과지 보기
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
