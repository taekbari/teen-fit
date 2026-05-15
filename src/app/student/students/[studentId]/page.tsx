import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{
    studentId: string;
  }>;
};

export default async function StudentChoicePage({ params }: PageProps) {
  const { studentId } = await params;
  redirect(`/student/reports/${studentId}`);
}
