import {
  createSubjectGrowthFromAssessments,
  excelAssessmentMock,
} from "@/lib/mock/assessmentData";
import { excelPersonalityHistory } from "@/lib/mock/personalityData";
import { excelSchoolGradeMock } from "@/lib/mock/schoolGradeData";
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
    schoolGrades: excelSchoolGradeMock,
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
    id: "STU-2403",
    name: "이수아",
    schoolLevel: "elementary",
    grade: 6,
    school: "초6 / 중학교 진학 예정",
    latestCareerGoal: "언론인/기자",
    interestedJobs: ["기자", "방송 기자", "콘텐츠 에디터"],
    interestedMajors: ["미디어커뮤니케이션", "언론정보", "국어국문"],
    interestedSchools: ["한산중학교", "둔촌중학교", "성내중학교"],
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
        summary: "언론과 콘텐츠 관심이 학교 활동과 연결되기 시작했습니다.",
      },
      {
        period: "2026 상반기",
        scores: {
          aptitude: 87,
          learningReadiness: 78,
          careerClarity: 82,
          selfManagement: 74,
        },
        summary: "언론인/기자 목표를 기준으로 중학교 적응 전략 설계가 가능해졌습니다.",
      },
    ],
    subjectGrowth: excelSubjectGrowth,
    subjectAssessments: excelAssessmentMock,
    schoolGrades: excelSchoolGradeMock,
    careerTimeline: [
      {
        date: "2025-03-12",
        goal: "작가",
        reason: "읽기와 글쓰기 활동에서 높은 몰입을 보였습니다.",
      },
      {
        date: "2025-11-02",
        goal: "콘텐츠 에디터",
        reason: "자료를 읽고 핵심을 정리하는 활동에 흥미를 보였습니다.",
      },
      {
        date: "2026-05-14",
        goal: "언론인/기자",
        reason: "사회 이슈를 분석하고 전달하는 진로로 구체화되었습니다.",
      },
    ],
    schoolAssessmentInsights: [
      {
        subject: "국어",
        pattern: "외부 지문과 비판적 읽기 문항의 비중이 높을 수 있습니다.",
        recommendation: "사설 요약과 근거 찾기 루틴을 유지합니다.",
      },
      {
        subject: "수학",
        pattern: "고난도 문항에서는 조건 정리와 풀이 과정 서술이 중요합니다.",
        recommendation: "조건-개념-풀이-검토 4단계 노트를 사용합니다.",
      },
    ],
    academicSchedule: [
      { date: "2026-06-20", title: "중학교 배정 상담", type: "counseling" },
      { date: "2026-07-01", title: "예비 중1 학습 점검", type: "exam" },
      { date: "2026-07-15", title: "동아리 탐색 활동", type: "activity" },
    ],
    teacherObservations: [
      {
        date: "2026-03-18",
        memo: "국어 외부 지문을 읽고 핵심 근거를 찾는 속도와 정확도가 좋습니다.",
      },
      {
        date: "2026-04-22",
        memo: "수학 고난도 문항에서는 풀이 시작 전 조건 정리 시간이 필요합니다.",
      },
    ],
  },
  {
    id: "STU-2404",
    name: "김도윤",
    schoolLevel: "middle",
    grade: 3,
    school: "한빛중학교",
    latestCareerGoal: "IT 전문가 / 반도체·AI 분야",
    interestedJobs: ["IT 전문가", "AI 개발자", "반도체 엔지니어"],
    interestedMajors: ["반도체공학과", "전자공학과", "컴퓨터공학과", "인공지능학과"],
    interestedSchools: ["과학중점학교", "자율형 공립고 2.0", "SW 특화 프로그램 운영교"],
    lastAnalyzedAt: "2026-05-15T10:00:00+09:00",
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
        summary: "분석적이고 꼼꼼한 성향이 강했으며 진로 방향은 넓게 열려 있었습니다.",
      },
      {
        period: "2025 하반기",
        scores: {
          aptitude: 80,
          learningReadiness: 71,
          careerClarity: 66,
          selfManagement: 70,
        },
        summary: "IT 탐구 활동과 팀 프로젝트에 대한 관심이 커졌습니다.",
      },
      {
        period: "2026 상반기",
        scores: {
          aptitude: 87,
          learningReadiness: 78,
          careerClarity: 82,
          selfManagement: 74,
        },
        summary: "IT 전문가와 반도체/AI 분야를 기준으로 고교 진학 전략 설계가 가능해졌습니다.",
      },
    ],
    subjectGrowth: excelSubjectGrowth,
    subjectAssessments: excelAssessmentMock,
    schoolGrades: excelSchoolGradeMock,
    careerTimeline: [
      {
        date: "2025-03-12",
        goal: "게임 개발자",
        reason: "코딩과 문제 해결 활동에서 흥미를 보였습니다.",
      },
      {
        date: "2025-11-02",
        goal: "IT 전문가",
        reason: "팀 프로젝트와 알고리즘 문제 풀이 경험이 늘었습니다.",
      },
      {
        date: "2026-05-15",
        goal: "반도체/AI 분야",
        reason: "수학·과학 강점과 IT 탐구 활동이 진로 관심으로 연결되었습니다.",
      },
    ],
    schoolAssessmentInsights: [
      {
        subject: "국어",
        pattern: "국어 성취도 하락으로 기술 독해와 논리적 글쓰기 보완이 필요합니다.",
        recommendation: "IT 기사와 탐구 보고서를 활용해 주장-근거-자료 구조를 훈련합니다.",
      },
      {
        subject: "수학",
        pattern: "수학/과학 내신 최상위 유지가 과학중점학교 준비의 핵심입니다.",
        recommendation: "기하/함수와 물리 개념을 코딩 프로젝트로 연결합니다.",
      },
    ],
    academicSchedule: [
      { date: "2026-06-20", title: "고교 진학 상담", type: "counseling" },
      { date: "2026-07-01", title: "중3 1학기 기말 점검", type: "exam" },
      { date: "2026-07-15", title: "IT 프로젝트 포트폴리오 점검", type: "activity" },
    ],
    teacherObservations: [
      {
        date: "2026-03-18",
        memo: "수학 기하/함수 영역에서 개념 연결력이 좋고 상승세가 뚜렷합니다.",
      },
      {
        date: "2026-04-22",
        memo: "국어는 기술 독해와 논리적 문서 작성 루틴을 다시 세울 필요가 있습니다.",
      },
    ],
  },
];

export function getMockStudent(studentId: string) {
  return mockStudents.find((student) => student.id === studentId);
}
