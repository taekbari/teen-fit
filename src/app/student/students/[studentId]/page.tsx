import { StudentReportChoiceMobile } from "@/components/student-report-mobile";
import { getStudentGuidanceReport } from "@/lib/api/studentReport";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    studentId: string;
  }>;
};

export default async function StudentChoicePage({ params }: PageProps) {
  const { studentId } = await params;
  const report = await getStudentGuidanceReport(studentId);

  if (!report) {
    notFound();
  }

  return <StudentReportChoiceMobile report={report} />;
}
