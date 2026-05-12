import type {
  AnalysisResult,
  DiagnosisInput,
  Quest,
  RoadmapStep,
  StudentProfile,
} from "@/types";

export const templateProfile: StudentProfile = {
  name: "민준",
  grade: "중2",
  gender: "남학생",
  school: "틴핏중학교",
  targetSchool: "과학고",
  careerInterest: "생명공학 연구원",
  favoriteActivities: "과학 실험, 생명과학 영상 보기, 탐구 보고서 쓰기",
  character: "시바쌤",
};

export const templateDiagnosis: DiagnosisInput = {
  scores: {
    korean: 85,
    english: 88,
    math: 72,
    science: 94,
    social: 80,
  },
  learningAnswers: [
    "궁금한 주제를 깊게 파고드는 편이에요.",
    "혼자 계획을 세우면 시작은 빠르지만 마무리는 점검이 필요해요.",
    "문제 풀이보다 개념이 어디에 쓰이는지 알 때 집중이 잘돼요.",
    "친구에게 설명하며 공부하면 기억이 오래가요.",
    "틀린 문제는 이유를 알면 다시 도전하고 싶어져요.",
  ],
  strongSubject: "과학",
  weakSubject: "수학",
  recentInterestChange: "의사에서 생명공학 연구원으로 관심 이동",
  goal: "과학고 준비를 위한 수학 자신감 회복과 탐구 포트폴리오 만들기",
};

export const mockQuests: Quest[] = [
  {
    id: "quest-math-functions",
    title: "수학 함수 개념 3일 복습",
    category: "학습",
    duration: "3일",
    description: "함수 대입, 그래프 읽기, 식 세우기를 하루 25분씩 점검해요.",
  },
  {
    id: "quest-bio-book",
    title: "생명과학 관련 독서 1권 기록",
    category: "진로",
    duration: "2주",
    description: "읽은 내용을 관심 진로와 연결해 한 페이지로 정리해요.",
  },
  {
    id: "quest-science-report",
    title: "과학 탐구 보고서 주제 1개 선정",
    category: "입시",
    duration: "1주",
    description: "관찰 가능한 질문, 가설, 측정 방법까지 초안을 잡아요.",
  },
];

export const templateAnalysis: AnalysisResult = {
  targetAchievement: 68,
  positionSummary:
    "과학 탐구 역량은 목표학교 방향과 잘 맞고, 수학 기초 체력을 보강하면 준비 균형이 좋아져요.",
  stats: {
    literacy: 82,
    numeracy: 65,
    inquiry: 92,
    selfManagement: 74,
  },
  learningType: "탐구 몰입형",
  mentorComment:
    "탐구력은 이미 반짝이고 있어! 이제 수리력만 조금 더 키우면 과학고 로드가 훨씬 가까워질 거야 🐶",
  recommendedMissions: mockQuests,
  learningStrategy: [
    "수학은 함수와 방정식처럼 과학 데이터 해석에 자주 쓰이는 단원부터 복습해요.",
    "과학 강점은 탐구 보고서와 독서 기록으로 남겨 포트폴리오 재료를 만들어요.",
    "주 1회 오답 원인을 개념, 계산, 조건 해석으로 나눠 기록해요.",
  ],
  careerSuggestions: [
    "생명공학 연구원",
    "의생명 데이터 분석가",
    "과학 교사/교육 콘텐츠 개발자",
  ],
  generatedAt: new Date().toISOString(),
};

export const roadmapSteps: RoadmapStep[] = [
  {
    id: "middle",
    stage: "중학교",
    period: "지금부터 중3",
    recommendedActivities: [
      "생명과학 독서 기록 누적",
      "교내 과학 탐구 발표 참여",
      "수학 함수, 확률 단원 오답 노트 운영",
    ],
    learningFocus: ["수학 기초 체력", "과학 탐구 질문 만들기", "읽고 요약하는 문해력"],
    entranceQuests: [mockQuests[0], mockQuests[2]],
  },
  {
    id: "high",
    stage: "고등학교",
    period: "고1부터 고3",
    recommendedActivities: [
      "생명과학 심화 탐구 프로젝트",
      "연구 윤리와 데이터 분석 기초 학습",
      "전공 관련 동아리 활동 기록",
    ],
    learningFocus: ["수학 I/II 연결", "실험 설계", "탐구 보고서 고도화"],
    entranceQuests: [
      {
        ...mockQuests[1],
        id: "quest-high-portfolio",
        title: "전공 키워드 포트폴리오 5개 만들기",
        duration: "한 학기",
      },
    ],
  },
  {
    id: "college",
    stage: "대학교",
    period: "전공 진입 이후",
    recommendedActivities: [
      "생명공학, 바이오데이터, 의생명 분야 비교",
      "기초 연구실 체험 및 논문 읽기",
      "진로별 필요 역량 업데이트",
    ],
    learningFocus: ["통계와 데이터 해석", "영어 논문 독해", "연구 주제 구체화"],
    entranceQuests: [
      {
        id: "quest-college-field",
        title: "생명공학 세부 분야 3개 비교",
        category: "진로",
        duration: "1개월",
        description: "유전공학, 합성생물학, 바이오데이터의 차이를 정리해요.",
      },
    ],
  },
];

export const learningQuestions = [
  "새로운 개념을 배울 때 가장 먼저 하는 행동은?",
  "어려운 문제가 나오면 보통 어떻게 해결하나요?",
  "시험 전 계획을 세우는 방식은?",
  "좋아하는 주제가 생겼을 때의 행동은?",
  "오답을 다시 볼 때 가장 필요한 도움은?",
];
