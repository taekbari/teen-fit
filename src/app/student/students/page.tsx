import { StudentReportListMobile } from "@/components/student-report-mobile";
import { mockStudentGuidanceReports } from "@/lib/mock/studentReport.mock";

export default function StudentListPage() {
  return <StudentReportListMobile reports={mockStudentGuidanceReports} />;
}
