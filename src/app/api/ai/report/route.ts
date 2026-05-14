import { generateStudentReport } from "@/lib/ai/generateReport";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { studentId?: unknown };

    if (typeof body.studentId !== "string" || !body.studentId.trim()) {
      return Response.json({ error: "studentId is required." }, { status: 400 });
    }

    // 현재는 Claude API를 호출하지 않고 mock/template report만 반환합니다.
    const result = await generateStudentReport(body.studentId);

    return Response.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message.includes("not found") ? 404 : 500;
    return Response.json({ error: message }, { status });
  }
}
