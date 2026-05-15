import { TeacherStudentManager } from "@/components/teacher-student-manager";
import { mockStudents } from "@/lib/mock/students";

export default function TeacherHomePage() {
  return (
    <main className="min-h-screen px-8 py-8">
      <div className="mx-auto max-w-7xl">
        <header>
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
        </header>

        <TeacherStudentManager students={mockStudents} />
      </div>
    </main>
  );
}
