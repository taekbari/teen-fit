import { mockStudents } from "@/lib/mock/students";
import type { ReportApiResult, StudentReport } from "@/types/report";

const now = "2026-05-14T10:30:00+09:00";

export const mockReports: StudentReport[] = [
  {
    id: "REPORT-STU-2401",
    studentId: "STU-2401",
    generatedAt: now,
    student: pickStudent(mockStudents[0]),
    cumulativeSummary: {
      personalityChange:
        "초6에는 꼼꼼한 분석형과 정답 찾기 선호가 강했고, 중1에는 언어적 호기심이 확장되었습니다. 중2에는 수학·과학 중심의 논리적 탐구와 활동 참여가 뚜렷해졌습니다.",
      diagnosisChange:
        "진로 명료도가 48에서 82로 상승해, 막연한 기술 관심이 AI 로봇 엔지니어라는 구체 목표로 정리되었습니다.",
      subjectGrowth:
        "엑셀 진단평가 기준 수학은 76에서 86으로 상승했고, 국어는 89에서 78로 하락해 읽기·문법 영역 보완이 필요합니다. 영어는 82점 수준을 유지하고 있습니다.",
      careerDirection:
        "게임 개발자에서 AI 개발자, AI 로봇 엔지니어로 이동하며 소프트웨어와 하드웨어를 결합하는 방향으로 좁혀졌습니다.",
      schoolInsight:
        "한빛중학교는 수학 서술형과 과학 수행평가 비중이 높아, 풀이 근거와 탐구 보고서 기록을 함께 준비해야 합니다.",
    },
    aiSummary: {
      strengths: [
        "인지 방식에서 분석형 수치가 24/25로 높아 세부 정보를 기억하고 원리를 파고드는 학습에 강합니다.",
        "동기와 주도 방식이 내재형·자율형으로 이동해 스스로 정한 주제에서 몰입 가능성이 높습니다.",
        "수학 성장세가 뚜렷해 AI·로봇 분야에 필요한 기초 역량을 만들고 있습니다.",
      ],
      improvements: [
        "국어 선호가 낮아진 흐름이 있어 논리적 글쓰기와 보고서 정리 루틴을 함께 잡아야 합니다.",
        "활동 참여가 강해진 만큼 탐구 후 숙고와 글쓰기까지 연결하는 지도가 필요합니다.",
      ],
      careerInterpretation:
        "latestCareerGoal인 AI 로봇 엔지니어는 학생의 분석형 인지, 수학·과학 관심, 자율적 탐구 성향과 자연스럽게 연결됩니다.",
      teacherComment:
        "민준이는 목표가 정해질수록 학습 몰입이 강해지는 학생입니다. 상담에서는 AI 로봇이라는 관심을 수학, 과학, 프로젝트 기록으로 연결해 주는 것이 핵심입니다.",
    },
    roadmap: [
      {
        title: "관련 전공 탐색",
        description: "AI 로봇 엔지니어 목표와 연결되는 전공군을 넓게 탐색합니다.",
        items: ["인공지능학과", "로봇공학과", "컴퓨터공학과", "기계공학과", "전자공학과"],
      },
      {
        title: "추천 고등학교 방향",
        description: "수학·과학 심화와 프로젝트 활동이 가능한 환경을 우선 검토합니다.",
        items: ["과학중점 과정", "SW·AI 선도학교", "로봇/메이커 동아리 운영 학교"],
      },
      {
        title: "고교학점제 선택 과목",
        description: "진로 목표에 맞춰 수학·과학·정보 과목을 단계적으로 선택합니다.",
        items: ["인공지능 기초", "프로그래밍", "수학과제 탐구", "물리학", "공학 일반"],
      },
      {
        title: "중학교 시기별 준비 전략",
        description: "중2에는 기초 역량, 중3에는 산출물과 진학 방향 정리를 우선합니다.",
        items: ["수학 함수·기하 보강", "아두이노 또는 로봇 키트 프로젝트", "탐구 보고서 2편 누적"],
      },
      {
        title: "비교과·독서·활동 추천",
        description: "관심을 증명할 수 있는 읽기와 만들기 기록을 남깁니다.",
        items: ["AI 윤리 독서", "로봇 제어 체험", "교내 과학 발표", "생활 속 자동화 문제 찾기"],
      },
    ],
    learningPlan: {
      summary:
        "수학을 최우선으로 유지하되, 영어 기술 문서 독해와 국어 보고서 작성력을 함께 올리면 진로 활동의 설득력이 커집니다.",
      priorities: [
        {
          subject: "수학",
          priority: 1,
          reason: "AI·로봇 분야의 핵심 기초이며 최근 성장세가 좋습니다.",
          action: "함수, 좌표, 확률 단원을 프로젝트 문제와 연결해 복습합니다.",
        },
        {
          subject: "영어",
          priority: 2,
          reason: "기술 자료와 튜토리얼을 읽는 데 필요합니다.",
          action: "로봇·AI 관련 짧은 영어 글을 주 2회 요약합니다.",
        },
        {
          subject: "국어",
          priority: 3,
          reason: "탐구 보고서와 발표 설득력을 높이는 기반입니다.",
          action: "프로젝트 기록을 문제-과정-결과-느낀점 구조로 정리합니다.",
        },
      ],
      nextActions: [
        {
          term: "다음 학기",
          actions: ["수학 심화 문제 주 3회", "AI 로봇 미니 프로젝트 1개", "과학 발표 활동 참여"],
        },
        {
          term: "방학",
          actions: ["로봇 키트 완성 기록", "관련 전공 3개 비교", "영어 기술 글 6편 요약"],
        },
      ],
    },
    counselingTalk: [
      "민준이는 단순히 코딩을 좋아하는 수준을 넘어, AI와 로봇을 연결해서 생각하는 방향으로 관심이 구체화되고 있습니다.",
      "최근 수학 점수가 꾸준히 올라온 점이 긍정적입니다. 이 흐름을 유지하면서 프로젝트 결과물을 남기면 진로 설득력이 커집니다.",
      "다만 혼자 깊이 파고드는 힘에 비해 협업 산출물을 정리하는 경험은 더 필요합니다. 역할이 분명한 팀 활동을 한두 번 넣어보면 좋겠습니다.",
    ],
  },
];

export function getMockReport(studentId: string) {
  return mockReports.find((report) => report.studentId === studentId);
}

export function getMockReportApiResult(studentId: string): ReportApiResult | undefined {
  const report = getMockReport(studentId);

  if (!report) return undefined;

  return {
    report,
    meta: {
      source: "mock",
      aiEnabled: false,
      promptVersion: "teacher-report-v1",
      generatedBy: "template",
      warnings: [
        "현재 결과는 Claude API 호출 없이 mock/template 데이터로 생성되었습니다.",
        "입시 정보와 모집요강은 실제 상담 전 최신 기준 확인이 필요합니다.",
      ],
    },
  };
}

function pickStudent(student: (typeof mockStudents)[number]): StudentReport["student"] {
  return {
    id: student.id,
    name: student.name,
    schoolLevel: student.schoolLevel,
    grade: student.grade,
    school: student.school,
    latestCareerGoal: student.latestCareerGoal,
    lastAnalyzedAt: student.lastAnalyzedAt,
  };
}
