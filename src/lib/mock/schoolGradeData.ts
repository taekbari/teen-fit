import type { SchoolGradeData } from "@/types/student";

export const excelSchoolGradeMock: SchoolGradeData = {
  records: [
    { period: "중1-2", math: 85, korean: 90, english: 92 },
    { period: "중2-1", math: 92, korean: 86, english: 88 },
    { period: "중2-2", math: 94, korean: 79, english: 90 },
  ],
  analysisComments: [
    {
      title: "수학의 강세",
      description:
        "현재 가장 자신 있는 과목으로 판단됩니다. 문제 풀이 양이나 개념 이해도가 학기별로 탄탄하게 쌓이고 있는 모습입니다.",
    },
    {
      title: "국어의 위기",
      description:
        "국어 성적의 하락 원인을 분석할 필요가 있습니다. 중학교 3학년 1학기 국어는 문법이나 문학 비중이 커지면서 난이도가 급격히 상승하는 구간이기도 하므로, 학습 방법의 점검이 시급합니다.",
    },
    {
      title: "균형 잡힌 평균",
      description:
        "국어 점수가 하락했음에도 수학과 영어에서 90점 이상을 유지해주고 있어 전체적인 내신 평균은 급격히 무너지지 않고 방어되고 있습니다.",
    },
  ],
  studyStrategies: [
    {
      category: "1. 원인 분석",
      coreTask: "문법 복구",
      action: "중2 품사(체언, 용언 등) 개념 완벽 재정리 (중3 문장 성분의 기초)",
    },
    {
      category: "1. 원인 분석",
      coreTask: "독해력 강화",
      action: "지문 구조(서론-본론-결론) 파악 및 문단별 핵심 키워드 추출 연습",
    },
    {
      category: "2. 기초 체력",
      coreTask: "어휘력 강화",
      action: "한자어·추상어 '나만의 단어장' 정리 (모르는 단어 매일 5개 기록)",
    },
    {
      category: "2. 기초 체력",
      coreTask: "비문학 훈련",
      action: "하루 비문학 2지문 분석 (중심 문장 밑줄 긋기 및 요약)",
    },
    {
      category: "3. 실전 전략",
      coreTask: "문학의 객관화",
      action: "주관적 해석 배제, 문학 이론(화자, 시점, 갈등) 근거 분석 훈련",
    },
    {
      category: "3. 실전 전략",
      coreTask: "선행 학습",
      action: "중3 교과서 수록 주요 시·소설 미리 읽어두기",
    },
  ],
};
