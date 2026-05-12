import { analyzeStudent } from "@/lib/analyze";
import type { AnalyzePayload } from "@/lib/analyze";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as AnalyzePayload;

    if (!payload.profile?.name || !payload.diagnosis?.scores) {
      return NextResponse.json(
        { error: "프로필과 진단 점수가 필요합니다." },
        { status: 400 },
      );
    }

    const result = await analyzeStudent(payload);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "분석 요청을 처리하지 못했습니다." },
      { status: 500 },
    );
  }
}
