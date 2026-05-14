import {
  createSubjectGrowthFromAssessments,
  excelAssessmentMock,
} from "@/lib/mock/assessmentData";
import { excelPersonalityHistory } from "@/lib/mock/personalityData";
import type { StudentRecord } from "@/types/student";

const excelSubjectGrowth = createSubjectGrowthFromAssessments(excelAssessmentMock);

export const mockStudents: StudentRecord[] = [
  {
    id: "STU-2401",
    name: "김민준",
    schoolLevel: "middle",
    grade: 2,
    school: "한빛중학교",
    latestCareerGoal: "AI 로봇 엔지니어",
    interestedJobs: ["AI 로봇 엔지니어", "로봇 제어 개발자", "AI 개발자"],
    interestedMajors: ["인공지능학과", "로봇공학과", "컴퓨터공학과"],
    interestedSchools: ["과학중점 고등학교", "SW·AI 선도학교"],
    lastAnalyzedAt: "2026-05-14T09:30:00+09:00",
    status: "ready",
    personalityHistory: excelPersonalityHistory,
    diagnosisHistory: [
      {
        period: "2025 상반기",
        scores: {
          aptitude: 72,
          learningReadiness: 64,
          careerClarity: 48,
          selfManagement: 58,
        },
        summary: "관심 분야는 넓었지만 진로 선택 기준이 아직 흐렸습니다.",
      },
      {
        period: "2025 하반기",
        scores: {
          aptitude: 80,
          learningReadiness: 71,
          careerClarity: 66,
          selfManagement: 70,
        },
        summary: "코딩 체험 이후 기술 기반 진로로 방향이 좁혀졌습니다.",
      },
      {
        period: "2026 상반기",
        scores: {
          aptitude: 87,
          learningReadiness: 78,
          careerClarity: 82,
          selfManagement: 74,
        },
        summary: "AI 로봇 엔지니어를 기준으로 과목 선택과 활동 설계가 가능해졌습니다.",
      },
    ],
    subjectGrowth: excelSubjectGrowth,
    subjectAssessments: excelAssessmentMock,
    careerTimeline: [
      {
        date: "2024-09-10",
        goal: "게임 개발자",
        reason: "게임 제작 경험을 통해 코딩에 흥미를 느꼈습니다.",
      },
      {
        date: "2025-06-20",
        goal: "AI 개발자",
        reason: "이미지 분류 체험 활동 이후 AI 모델 원리에 관심이 생겼습니다.",
      },
      {
        date: "2026-05-14",
        goal: "AI 로봇 엔지니어",
        reason: "AI와 하드웨어를 함께 다루는 진로로 구체화되었습니다.",
      },
    ],
    schoolAssessmentInsights: [
      {
        subject: "수학",
        pattern: "서술형에서 풀이 과정 설명 비중이 높고, 함수·도형 융합 문항이 자주 출제됩니다.",
        recommendation: "정답보다 풀이 근거를 문장으로 정리하는 연습을 병행합니다.",
      },
      {
        subject: "과학",
        pattern: "수행평가는 실험 보고서와 발표 평가가 함께 반영됩니다.",
        recommendation: "탐구 주제 선정, 실험 과정 기록, 결과 해석을 별도 노트로 누적합니다.",
      },
    ],
    academicSchedule: [
      { date: "2026-06-25", title: "1학기 기말고사", type: "exam" },
      { date: "2026-07-08", title: "과학 탐구 발표 수행평가", type: "performance" },
      { date: "2026-07-18", title: "진로 상담 주간", type: "counseling" },
    ],
    teacherObservations: [
      {
        date: "2026-03-18",
        memo: "수학 문제를 해결할 때 식을 일반화하는 능력이 좋습니다.",
      },
      {
        date: "2026-04-22",
        memo: "팀 활동에서는 역할을 분명히 주면 참여도가 안정적으로 올라갑니다.",
      },
    ],
  },
];

export function getMockStudent(studentId: string) {
  return mockStudents.find((student) => student.id === studentId);
}
