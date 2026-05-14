import { generateStudentReport } from "@/lib/ai/generateReport";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { studentId?: unknown };

    if (typeof body.studentId !== "string" || !body.studentId.trim()) {
      return Response.json({ error: "studentId is required." }, { status: 400 });
    }

    // TODO: 실제 AI 호출이 필요한 시점에는 generateStudentReport 내부에서
    // Claude API 연결로 교체합니다. 현재 route는 mock report만 반환합니다.
    const report = await generateStudentReport(body.studentId);

    return Response.json({ report });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message.includes("not found") ? 404 : 500;
    return Response.json({ error: message }, { status });
  }
}
