import type {
  PersonalityAxisScore,
  PersonalityPreference,
  PersonalitySnapshot,
} from "@/types/student";

type RawAxis = {
  category: string;
  detail: string;
  leftLabel: string;
  rightLabel: string;
  scores: Array<[number, number]>;
};

const stages = [
  { year: 2024, label: "초등 6학년" },
  { year: 2025, label: "중학교 1학년" },
  { year: 2026, label: "중학교 2학년" },
];

const qualitativeRows = [
  {
    key: "mainInterestSubjects",
    values: ["전 과목 고른 선호", "영어, 국어, 과학", "수학, 과학"],
  },
  {
    key: "learningAttitude",
    values: ["꼼꼼한 분석형, 정답 찾기 선호", "언어적 호기심 및 탐구 확장", "논리적 탐구 중시, 활동적 참여"],
  },
  {
    key: "coreStrength",
    values: ["세부 정보 기억 및 분석", "언어적 감각 및 원리 파악", "논리적 사고 및 심화 학습 역량"],
  },
  {
    key: "coachingFocus",
    values: ["전체 흐름 파악하기", "구조적 사고 및 거시적 안목 배양", "활동과 숙고의 균형, 논리적 글쓰기 연계"],
  },
] as const;

const rawAxes: RawAxis[] = [
  {
    category: "인지 방식",
    detail: "분석형(25) vs 통합형(0)",
    leftLabel: "분석형",
    rightLabel: "통합형",
    scores: [[20, 5], [22, 3], [24, 1]],
  },
  {
    category: "사고 방식",
    detail: "숙고형(25) vs 행동형(0)",
    leftLabel: "숙고형",
    rightLabel: "행동형",
    scores: [[12, 13], [10, 15], [8, 17]],
  },
  {
    category: "도출 방식",
    detail: "확산형(25) vs 수렴형(0)",
    leftLabel: "확산형",
    rightLabel: "수렴형",
    scores: [[10, 15], [12, 13], [18, 7]],
  },
  {
    category: "동기 방식",
    detail: "외재형(25) vs 내재형(0)",
    leftLabel: "외재형",
    rightLabel: "내재형",
    scores: [[12, 13], [8, 17], [5, 20]],
  },
  {
    category: "주도 방식",
    detail: "타율형(25) vs 자율형(0)",
    leftLabel: "타율형",
    rightLabel: "자율형",
    scores: [[15, 10], [10, 15], [5, 20]],
  },
  {
    category: "환경 방식",
    detail: "홀로형(25) vs 함께형(0)",
    leftLabel: "홀로형",
    rightLabel: "함께형",
    scores: [[20, 5], [15, 10], [10, 15]],
  },
  {
    category: "참여 방식",
    detail: "적극형(25) vs 소극형(0)",
    leftLabel: "적극형",
    rightLabel: "소극형",
    scores: [[10, 15], [15, 10], [22, 3]],
  },
  {
    category: "지향 방식",
    detail: "경쟁지향(25) vs 협동형(0)",
    leftLabel: "경쟁지향",
    rightLabel: "협동형",
    scores: [[12, 13], [10, 15], [18, 7]],
  },
];

const preferenceRows = [
  { category: "시간 선호", detail: "(선택 1)", values: ["무관형", "무관형", "저녁형"] },
  { category: "매체 유형", detail: "(선택 1)", values: ["교과서", "모바일 매체", "컴퓨터 매체"] },
  { category: "공부 장소", detail: "(선택 1)", values: ["늘 하던 장소", "크게 상관없다", "가끔 옮김"] },
  { category: "좋아하는 과목", detail: "(선택 1)", values: ["과학", "영어", "수학"] },
  { category: "싫어하는 과목", detail: "(선택 1)", values: ["없음(고른 선호)", "없음", "국어"] },
];

function getAxisScores(stageIndex: number): PersonalityAxisScore[] {
  return rawAxes.map((axis) => {
    const [leftScore, rightScore] = axis.scores[stageIndex];
    const dominantLabel = leftScore >= rightScore ? axis.leftLabel : axis.rightLabel;

    return {
      category: axis.category,
      detail: axis.detail,
      leftLabel: axis.leftLabel,
      rightLabel: axis.rightLabel,
      leftScore,
      rightScore,
      dominantLabel,
    };
  });
}

function getPreferences(stageIndex: number): PersonalityPreference[] {
  return preferenceRows.map((preference) => ({
    category: preference.category,
    detail: preference.detail,
    value: preference.values[stageIndex],
  }));
}

export const excelPersonalityHistory: PersonalitySnapshot[] = stages.map((stage, index) => {
  const qualitative = {
    mainInterestSubjects: qualitativeRows[0].values[index],
    learningAttitude: qualitativeRows[1].values[index],
    coreStrength: qualitativeRows[2].values[index],
    coachingFocus: qualitativeRows[3].values[index],
  };
  const axisScores = getAxisScores(index);
  const preferences = getPreferences(index);

  return {
    year: stage.year,
    stage: stage.label,
    type: index === 0
      ? { primary: "분석형", secondary: "균형 탐색형" }
      : index === 1
        ? { primary: "분석형", secondary: "탐구 확장형" }
        : { primary: "논리 탐구형", secondary: "자율 실행형" },
    traits: {
      analyticalThinking: axisScores[0].leftScore * 4,
      creativity: axisScores[2].leftScore * 4,
      leadership: Math.round((axisScores[6].leftScore + axisScores[7].leftScore) * 2),
      collaboration: axisScores[5].rightScore * 4,
      execution: Math.round((axisScores[1].rightScore + axisScores[6].leftScore) * 2),
      concentration: Math.round((axisScores[3].rightScore + axisScores[4].rightScore) * 2),
      emotionalStability: index === 0 ? 66 : index === 1 ? 70 : 74,
    },
    note: qualitative.learningAttitude,
    qualitative,
    axisScores,
    preferences,
  };
});
