import type { StudentGuidanceReport } from "@/types/studentReport";

export const mockStudentGuidanceReports: StudentGuidanceReport[] = [
  {
    summary: {
      studentId: "STU-2403",
      studentName: "이수아",
      gradeStatus: "예비 중1",
      generatedAt: "2026-05-14T09:30:00+09:00",
      coreProfile: "비판적 문해력과 데이터 분석 능력이 강한 지성형 인재",
      strengths: ["국어 최상위권", "영어 어휘 우수", "자료와 가능성 영역 강점"],
      improvements: ["수학 고난도 문제 부담", "완벽주의 성향"],
    },
    schoolFits: [
      {
        id: "hansan",
        name: "한산중학교",
        fitLevel: "high",
        mainFeature: "외부 지문 비중이 높고 문해력을 요구하는 평가 흐름",
        assessmentTrend: "처음 보는 글의 핵심 주장, 근거, 자료 해석을 연결해 묻는 문항 비중이 높은 편으로 가정합니다.",
        studentStrategy: "수아의 비판적 읽기 능력을 국어 성적으로 연결하도록 사설, 기사, 통계 자료를 함께 읽는 훈련을 유지합니다.",
        recommendationPoint: "문해력 강점 활용",
        counselingMemoPlaceholder: "한산중 상담 메모를 입력하세요.",
      },
      {
        id: "dunchon",
        name: "둔촌중학교",
        fitLevel: "needs_preparation",
        mainFeature: "심화 문항 변별력이 있고 고난도 문제 대응이 중요한 학교",
        assessmentTrend: "수학 상 난이도 문항에서 조건 해석, 풀이 과정 서술, 검토 습관이 점수 차이를 만들 수 있습니다.",
        studentStrategy: "수학 상 난이도 성취도 85% 이상을 목표로 조건-개념-풀이-검토 4단계 노트를 고정 루틴으로 만듭니다.",
        recommendationPoint: "수학 심화 대비 필요",
        counselingMemoPlaceholder: "둔촌중 상담 메모를 입력하세요.",
      },
      {
        id: "seongnae",
        name: "성내중학교",
        fitLevel: "medium",
        mainFeature: "수행평가와 활동 중심 흐름, 발표 및 자치 활동 기회",
        assessmentTrend: "보고서 작성, 발표, 활동 참여 기록이 과목 태도와 진로 설득력에 함께 반영될 수 있습니다.",
        studentStrategy: "언론인 진로와 연결해 학교 이슈 조사 보고서, 발표, 독서토론 활동을 포트폴리오로 누적합니다.",
        recommendationPoint: "진로 포트폴리오 강화",
        counselingMemoPlaceholder: "성내중 상담 메모를 입력하세요.",
      },
    ],
    learningStrategies: [
      {
        subject: "국어",
        tone: "emerald",
        priority: 1,
        strategyName: "사설 요약 및 팩트 체크 훈련",
        method: "일간지 사설을 매일 1편 읽고 주제-근거-통계를 찾아 3문장으로 요약합니다.",
        goal: "외부 지문 분석력 강화",
        counselingPoint: "강점 과목을 유지하는 수준이 아니라 중학교 외부 지문형 평가의 무기로 연결합니다.",
      },
      {
        subject: "영어",
        tone: "sky",
        priority: 2,
        strategyName: "조건부 서술형 Summary 연습",
        method: "본문 내용을 10단어 내외로 요약하고 핵심 어휘를 바꿔 쓰는 훈련을 반복합니다.",
        goal: "중등 영어 내신 서술형 대비",
        counselingPoint: "어휘 강점을 서술형 답안 구성력으로 확장하는 것이 핵심입니다.",
      },
      {
        subject: "수학",
        tone: "amber",
        priority: 3,
        strategyName: "풀이 과정의 구조화",
        method: "모든 문제를 조건-개념-풀이-검토 4단계로 노트에 작성합니다.",
        goal: "고난도 문제 실수 감소 및 논리 서술력 강화",
        counselingPoint: "정답 여부보다 풀이 과정을 안정화해 고난도 부담을 낮춥니다.",
      },
      {
        subject: "심화 수학",
        tone: "violet",
        priority: 4,
        strategyName: "자료와 가능성 기반 심화 문제 훈련",
        method: "통계 자료 해석형 심화 문제를 풀고 표, 그래프, 조건을 문장으로 설명합니다.",
        goal: "수학 자신감 회복",
        counselingPoint: "수아가 강한 데이터 해석 감각을 수학 심화 학습의 출발점으로 사용합니다.",
      },
    ],
    actionPlan: {
      monthlyPriorities: [
        "수학 풀이 과정 4단계 노트 작성 습관화",
        "국어 사설 3문장 요약 루틴 시작",
        "방송부, 독서토론부 등 진로 연계 동아리 탐색",
      ],
      parentComment:
        "수아는 읽고 해석하는 힘이 강한 학생입니다. 예비 중1 시기에는 이 강점을 중학교 평가 방식에 맞춰 성적으로 연결하고, 수학 고난도 문제는 풀이 과정을 구조화해 부담을 낮추는 방향이 필요합니다.",
      internalMemoGuide:
        "학교 배정 결과가 확정되면 해당 학교의 최근 평가 방식, 수행평가 일정, 동아리 운영 정보를 확인해 국어·영어 강점과 언론인 진로 활동을 연결합니다.",
    },
  },
];

export function getMockStudentGuidanceReport(studentId: string) {
  return mockStudentGuidanceReports.find((report) => report.summary.studentId === studentId);
}
