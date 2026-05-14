import { getMockReportApiResult } from "@/lib/mock/reports";
import { getMockStudent } from "@/lib/mock/students";
import type { ReportApiResult } from "@/types/report";

export async function generateStudentReport(studentId: string): Promise<ReportApiResult> {
  const student = getMockStudent(studentId);

  if (!student) {
    throw new Error("Student not found.");
  }

  const result = getMockReportApiResult(studentId);

  if (!result) {
    throw new Error("Mock report not found.");
  }

  return result;
}
