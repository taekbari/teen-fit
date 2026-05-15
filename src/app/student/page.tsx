import { StudentReportListMobile } from "@/components/student-report-mobile";
import { mockStudentGuidanceReports } from "@/lib/mock/studentReport.mock";

export default function StudentHomePage() {
  // 예비 중1 리포트는 유지하되, 현재 학생 목록에서는 중3 결과지만 노출합니다.
  const middle3Reports = mockStudentGuidanceReports.filter((report) => report.reportType === "middle_3");

  return <StudentReportListMobile reports={middle3Reports} />;
}
