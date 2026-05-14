import { generateStudentReport } from "@/lib/ai/generateReport";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { studentId?: unknown };

    if (typeof body.studentId !== "string" || !body.studentId.trim()) {
      return Response.json({ error: "studentId is required." }, { status: 400 });
    }

    // generateStudentReport는 mock 학생 데이터를 기준으로 동작합니다.
    // ENABLE_AI_REPORT=true이고 ANTHROPIC_API_KEY가 있으면 Claude API 결과를,
    // 아니면 mock/template 결과를 반환합니다.
    const result = await generateStudentReport(body.studentId);

    return Response.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message.includes("not found") ? 404 : 500;
    return Response.json({ error: message }, { status });
  }
}
