import { templateAnalysis } from "@/lib/mockData";
import type { AnalysisResult, DiagnosisInput, StudentProfile } from "@/types";

export type AnalyzePayload = {
  profile: StudentProfile;
  diagnosis: DiagnosisInput;
};

export async function analyzeWithMock(
  payload: AnalyzePayload,
): Promise<AnalysisResult> {
  const { profile, diagnosis } = payload;
  const average =
    Object.values(diagnosis.scores).reduce((sum, score) => sum + score, 0) / 5;
  const targetAchievement = Math.min(
    92,
    Math.max(45, Math.round(average * 0.45 + diagnosis.scores.science * 0.25)),
  );

  return {
    ...templateAnalysis,
    targetAchievement:
      profile.name === "민준" && profile.targetSchool === "과학고"
        ? 68
        : targetAchievement,
    positionSummary: `${profile.targetSchool || "목표학교"} 방향과 ${
      diagnosis.strongSubject || "강점 과목"
    } 강점이 연결되어 있어요. 보완 과목인 ${
      diagnosis.weakSubject || "보완 과목"
    }을 작은 단위로 보강하면 목표까지의 거리가 줄어들어요.`,
    generatedAt: new Date().toISOString(),
  };
}

export async function analyzeWithAI(
  payload: AnalyzePayload,
): Promise<AnalysisResult> {
  // OPENAI_API_KEY는 서버 환경에서만 읽습니다. 현재 MVP에서는 실제 호출하지 않습니다.
  void payload;
  throw new Error("OpenAI API 연결은 아직 비활성화되어 있습니다.");
}

export async function analyzeStudent(
  payload: AnalyzePayload,
): Promise<AnalysisResult> {
  if (process.env.OPENAI_API_KEY && process.env.ENABLE_OPENAI_ANALYSIS === "true") {
    return analyzeWithAI(payload);
  }

  return analyzeWithMock(payload);
}
