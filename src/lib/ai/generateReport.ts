import { getMockReportApiResult } from "@/lib/mock/reports";
import { getMockStudent } from "@/lib/mock/students";
import type { ReportApiResult } from "@/types/report";

export async function generateStudentReport(studentId: string): Promise<ReportApiResult> {
  const student = getMockStudent(studentId);

  if (!student) {
    throw new Error("Student not found.");
  }

  // TODO: 실제 AI 분석을 켤 때는 여기에서 getClaudeRuntimeConfig().aiReportEnabled를 확인한 뒤
  // buildReportPrompt(student) -> requestClaudeCompletion(...) -> StudentReport 파싱/검증 순서로 교체합니다.
  // 현재 화면은 외부 네트워크 요청 없이 mock report만 반환합니다.

  const result = getMockReportApiResult(studentId);

  if (!result) {
    throw new Error("Mock report not found.");
  }

  return result;
}
