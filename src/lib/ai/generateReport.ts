import { getMockReport } from "@/lib/mock/reports";
import { getMockStudent } from "@/lib/mock/students";
import type { StudentReport } from "@/types/report";

export async function generateStudentReport(studentId: string): Promise<StudentReport> {
  const student = getMockStudent(studentId);

  if (!student) {
    throw new Error("Student not found.");
  }

  // TODO: 실제 AI 분석을 켤 때는 여기에서 buildReportPrompt(student)를 만들고
  // requestClaudeCompletion(...) 결과를 StudentReport로 파싱/검증합니다.
  // 현재는 외부 네트워크 요청 없이 mock report만 반환합니다.

  const report = getMockReport(studentId);

  if (!report) {
    throw new Error("Mock report not found.");
  }

  return report;
}
