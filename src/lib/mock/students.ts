import {
  createSubjectGrowthFromAssessments,
  excelAssessmentMock,
} from "@/lib/mock/assessmentData";
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
    personalityHistory: [
      {
        year: 2024,
        type: { primary: "탐구형", secondary: "독립형" },
        traits: {
          analyticalThinking: 78,
          creativity: 68,
          leadership: 42,
          collaboration: 48,
          execution: 61,
          concentration: 76,
          emotionalStability: 62,
        },
        note: "흥미 있는 주제는 오래 파고들지만 산출물 마무리가 약했습니다.",
      },
      {
        year: 2025,
        type: { primary: "탐구형", secondary: "실행형" },
        traits: {
          analyticalThinking: 86,
          creativity: 73,
          leadership: 55,
          collaboration: 58,
          execution: 76,
          concentration: 88,
          emotionalStability: 69,
        },
        note: "탐구 주제를 프로젝트로 정리하는 힘이 커졌습니다.",
      },
      {
        year: 2026,
        type: { primary: "탐구형", secondary: "실행형" },
        traits: {
          analyticalThinking: 91,
          creativity: 78,
          leadership: 61,
          collaboration: 63,
          execution: 82,
          concentration: 92,
          emotionalStability: 71,
        },
        note: "AI·로봇 분야 관심이 학습 행동으로 연결되고 있습니다.",
      },
    ],
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
  {
    id: "STU-2402",
    name: "이지우",
    schoolLevel: "middle",
    grade: 1,
    school: "늘봄중학교",
    latestCareerGoal: "콘텐츠 브랜드 기획자",
    interestedJobs: ["콘텐츠 브랜드 기획자", "콘텐츠 기획자", "마케팅 기획자"],
    interestedMajors: ["미디어커뮤니케이션", "광고홍보", "문화콘텐츠"],
    interestedSchools: ["미디어 동아리 활성 학교", "프로젝트 수업 운영 학교"],
    lastAnalyzedAt: "2026-05-13T15:10:00+09:00",
    status: "needs_update",
    personalityHistory: [
      {
        year: 2024,
        type: { primary: "창의형", secondary: "관계형" },
        traits: {
          analyticalThinking: 52,
          creativity: 88,
          leadership: 68,
          collaboration: 84,
          execution: 55,
          concentration: 49,
          emotionalStability: 76,
        },
        note: "아이디어 표현은 강하지만 계획 지속성이 약했습니다.",
      },
      {
        year: 2025,
        type: { primary: "창의형", secondary: "실행형" },
        traits: {
          analyticalThinking: 59,
          creativity: 93,
          leadership: 74,
          collaboration: 88,
          execution: 67,
          concentration: 61,
          emotionalStability: 80,
        },
        note: "프로젝트 결과물을 끝까지 완성하는 경험이 늘었습니다.",
      },
      {
        year: 2026,
        type: { primary: "창의형", secondary: "관계형" },
        traits: {
          analyticalThinking: 63,
          creativity: 95,
          leadership: 78,
          collaboration: 91,
          execution: 73,
          concentration: 66,
          emotionalStability: 82,
        },
        note: "콘텐츠 기획과 발표 활동에서 강점이 뚜렷합니다.",
      },
    ],
    diagnosisHistory: [
      {
        period: "2025 상반기",
        scores: {
          aptitude: 68,
          learningReadiness: 55,
          careerClarity: 52,
          selfManagement: 50,
        },
        summary: "관심은 많지만 학습 루틴이 안정적이지 않았습니다.",
      },
      {
        period: "2025 하반기",
        scores: {
          aptitude: 76,
          learningReadiness: 66,
          careerClarity: 70,
          selfManagement: 62,
        },
        summary: "발표형 학습과 프로젝트 경험 이후 참여도가 상승했습니다.",
      },
      {
        period: "2026 상반기",
        scores: {
          aptitude: 84,
          learningReadiness: 74,
          careerClarity: 79,
          selfManagement: 70,
        },
        summary: "콘텐츠와 브랜드 기획 방향으로 관심 분야가 구체화되었습니다.",
      },
    ],
    subjectGrowth: excelSubjectGrowth,
    subjectAssessments: excelAssessmentMock,
    careerTimeline: [
      {
        date: "2025-03-12",
        goal: "디자이너",
        reason: "시각 표현 활동에서 높은 몰입을 보였습니다.",
      },
      {
        date: "2025-11-02",
        goal: "콘텐츠 기획자",
        reason: "학교 홍보 영상 제작에서 기획 역할을 맡았습니다.",
      },
      {
        date: "2026-05-13",
        goal: "콘텐츠 브랜드 기획자",
        reason: "콘텐츠 제작과 마케팅 전략을 함께 다루고 싶어 합니다.",
      },
    ],
    schoolAssessmentInsights: [
      {
        subject: "국어",
        pattern: "비문학 요약과 주장 근거 찾기 문항의 배점이 큽니다.",
        recommendation: "콘텐츠 분석 글을 주장-근거-예시 구조로 정리합니다.",
      },
      {
        subject: "공통",
        pattern: "수행평가에서 발표 태도와 자료 완성도가 함께 평가됩니다.",
        recommendation: "발표 전 체크리스트와 결과물 회고를 포트폴리오에 누적합니다.",
      },
    ],
    academicSchedule: [
      { date: "2026-06-20", title: "국어 발표 수행평가", type: "performance" },
      { date: "2026-06-27", title: "1학기 기말고사", type: "exam" },
      { date: "2026-07-15", title: "동아리 결과 발표회", type: "activity" },
    ],
    teacherObservations: [
      {
        date: "2026-03-25",
        memo: "발표 준비 과정에서 자료 구성과 메시지 정리가 좋아졌습니다.",
      },
      {
        date: "2026-04-30",
        memo: "수학은 문제를 짧은 단위로 쪼개면 포기하지 않고 따라옵니다.",
      },
    ],
  },
];

export function getMockStudent(studentId: string) {
  return mockStudents.find((student) => student.id === studentId);
}
