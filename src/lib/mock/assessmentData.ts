import type { SubjectAssessmentRecord, SubjectName, SubjectScore } from "@/types/student";

const koreanRows = [
  ["중1-1", 89, 0.05, 0.95, 0.85, 0.9, 0.85, 0.9, 0.9, 0.78, 0.89, 1.0],
  ["중1-2", 85, 0.1, 0.9, 0.8, 0.85, 0.85, 0.8, 0.9, 0.73, 0.85, 0.97],
  ["중2-1", 82, 0.15, 0.85, 0.75, 0.85, 0.9, 0.75, 0.8, 0.69, 0.82, 0.95],
  ["중2-2", 78, 0.22, 0.8, 0.7, 0.85, 0.8, 0.75, 0.8, 0.64, 0.78, 0.92],
] as const;

const mathRows = [
  ["중1-1", 76, 0.25, 0.85, 0.7, 0.8, null, 0.7, 0.58, 0.76, 0.94],
  ["중1-2", 79, 0.2, 0.8, 0.75, 0.85, 0.7, 0.85, 0.62, 0.79, 0.96],
  ["중2-1", 82, 0.12, 0.75, 0.85, 0.8, 0.85, 0.85, 0.68, 0.82, 0.96],
  ["중2-2", 86, 0.08, 0.8, 0.8, 0.9, 0.9, 0.9, 0.74, 0.86, 0.98],
] as const;

const englishRows = [
  ["중1-1", 82, 0.18, 0.88, 0.78, 0.84, 0.76, 0.84, 0.68, 0.82, 0.96],
  ["중1-2", 80, 0.2, 0.85, 0.75, 0.82, 0.75, 0.83, 0.65, 0.8, 0.95],
  ["중2-1", 84, 0.16, 0.9, 0.8, 0.86, 0.78, 0.86, 0.7, 0.84, 0.98],
  ["중2-2", 82, 0.18, 0.88, 0.78, 0.84, 0.76, 0.84, 0.67, 0.82, 0.97],
] as const;

export const excelAssessmentMock: SubjectAssessmentRecord[] = [
  ...koreanRows.map((row) =>
    createAssessment("국어", row, ["문학", "문법", "읽기", "듣기/말하기", "매체", "쓰기"]),
  ),
  ...mathRows.map((row) =>
    createAssessment("수학", row, ["수와 연산", "문자와 식", "기하", "함수", "확률과 통계"]),
  ),
  ...englishRows.map((row) =>
    createAssessment("영어", row, ["듣기", "말하기", "읽기", "쓰기", "어휘력"]),
  ),
];

export function createSubjectGrowthFromAssessments(
  assessments: SubjectAssessmentRecord[],
): SubjectScore[] {
  const periods = Array.from(new Set(assessments.map((assessment) => assessment.period)));

  return periods.map((period) => ({
    period,
    korean: findScore(assessments, "국어", period),
    english: findScore(assessments, "영어", period),
    math: findScore(assessments, "수학", period),
  }));
}

function findScore(
  assessments: SubjectAssessmentRecord[],
  subject: SubjectName,
  period: string,
) {
  return assessments.find((assessment) => assessment.subject === subject && assessment.period === period)
    ?.totalScore ?? 0;
}

function createAssessment(
  subject: SubjectName,
  row: readonly [string, number, number, ...Array<number | null>],
  domainNames: string[],
): SubjectAssessmentRecord {
  const domainValues = row.slice(3, 3 + domainNames.length);
  const difficultyOffset = 3 + domainNames.length;
  const domains: Record<string, number | null> = {};

  domainNames.forEach((name, index) => {
    const value = domainValues[index];
    domains[name] = typeof value === "number" ? value : null;
  });

  return {
    subject,
    period: row[0],
    totalScore: row[1],
    topPercent: row[2],
    domains,
    difficultyAchievement: {
      high: toNumber(row[difficultyOffset]),
      medium: toNumber(row[difficultyOffset + 1]),
      low: toNumber(row[difficultyOffset + 2]),
    },
  };
}

function toNumber(value: unknown) {
  return typeof value === "number" ? value : 0;
}
