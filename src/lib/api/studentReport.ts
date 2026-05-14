import { getMockStudentGuidanceReport } from "@/lib/mock/studentReport.mock";
import type { StudentGuidanceReport } from "@/types/studentReport";

export async function getStudentGuidanceReport(studentId: string): Promise<StudentGuidanceReport | null> {
  // TODO: Replace this mock lookup with AI API and school information API results.
  // The UI should continue to consume StudentGuidanceReport after integration.
  return getMockStudentGuidanceReport(studentId) ?? null;
}
