import { mockStudents } from "@/lib/mock/students";
import type { StudentReport } from "@/types/report";

const now = "2026-05-14T10:30:00+09:00";

export const mockReports: StudentReport[] = [
  {
    id: "REPORT-STU-2401",
    studentId: "STU-2401",
    generatedAt: now,
    student: pickStudent(mockStudents[0]),
    cumulativeSummary: {
      personalityChange:
        "탐구형 성향은 유지되면서 실행형 보조 성향이 강화되었습니다. 관심 주제를 실제 프로젝트로 옮기는 힘이 커졌습니다.",
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
        "분석적 사고와 집중력이 높아 복잡한 원리를 파고드는 학습에 강합니다.",
        "수학 성장세가 뚜렷해 AI·로봇 분야에 필요한 기초 역량을 만들고 있습니다.",
        "진로 목표가 구체화되면서 활동 선택 기준이 생겼습니다.",
      ],
      improvements: [
        "팀 프로젝트에서는 역할과 산출물을 명확히 정해야 협업 몰입이 올라갑니다.",
        "탐구 내용을 보고서나 발표 결과물로 마무리하는 루틴이 더 필요합니다.",
      ],
      careerInterpretation:
        "latestCareerGoal인 AI 로봇 엔지니어는 학생의 탐구형 성향, 수학 성장세, 기술 체험 경험과 자연스럽게 연결됩니다.",
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
  {
    id: "REPORT-STU-2402",
    studentId: "STU-2402",
    generatedAt: now,
    student: pickStudent(mockStudents[1]),
    cumulativeSummary: {
      personalityChange:
        "창의형 성향이 유지되면서 실행력이 높아졌습니다. 아이디어를 결과물로 완성하는 경험이 늘었습니다.",
      diagnosisChange:
        "학습 준비도와 진로 명료도가 함께 상승해, 표현 중심 활동이 학습 동기로 연결되는 흐름입니다.",
      subjectGrowth:
        "엑셀 진단평가 기준 수학은 76에서 86으로 상승했고, 영어는 82점 수준을 유지합니다. 국어는 89에서 78로 내려가 쓰기·문법 루틴 점검이 필요합니다.",
      careerDirection:
        "디자인 관심에서 콘텐츠 기획, 콘텐츠 브랜드 기획자로 이동하며 표현력과 전략 사고를 함께 쓰는 방향으로 발전했습니다.",
      schoolInsight:
        "늘봄중학교는 국어 발표 수행평가와 자료 완성도 평가가 중요해, 콘텐츠 결과물과 발표 대본을 함께 관리하는 전략이 필요합니다.",
    },
    aiSummary: {
      strengths: [
        "창의성과 협업 점수가 높아 발표, 기획, 프로젝트형 활동에 강합니다.",
        "국어와 영어 성장이 뚜렷해 콘텐츠 기획에 필요한 표현 기반이 좋아지고 있습니다.",
        "관심 분야가 결과물 중심으로 연결되어 포트폴리오화하기 좋습니다.",
      ],
      improvements: [
        "집중력 기복이 있어 긴 독학보다 짧은 목표와 결과물이 있는 학습이 적합합니다.",
        "수학은 자신감이 낮아지지 않도록 작은 단위의 성공 경험을 설계해야 합니다.",
      ],
      careerInterpretation:
        "latestCareerGoal인 콘텐츠 브랜드 기획자는 학생의 창의성, 협업 성향, 국어·영어 성장 흐름과 잘 맞습니다.",
      teacherComment:
        "지우는 표현 활동을 통해 학습 동기가 살아나는 학생입니다. 상담에서는 포트폴리오와 기본 학업 루틴을 함께 잡아주는 방향이 좋습니다.",
    },
    roadmap: [
      {
        title: "관련 전공 탐색",
        description: "콘텐츠와 브랜드 전략을 함께 다루는 전공군을 비교합니다.",
        items: ["미디어커뮤니케이션", "광고홍보", "문화콘텐츠", "디자인", "경영/마케팅"],
      },
      {
        title: "추천 고등학교 방향",
        description: "프로젝트, 발표, 미디어 제작 경험을 누적할 수 있는 환경을 봅니다.",
        items: ["미디어 동아리 활성 학교", "프로젝트 수업 운영 학교", "예술·디자인 활동 지원 학교"],
      },
      {
        title: "고교학점제 선택 과목",
        description: "표현력과 데이터 기반 기획력을 함께 키우는 과목을 선택합니다.",
        items: ["미디어 콘텐츠 일반", "사회문제 탐구", "심화 국어", "실용 영어", "마케팅과 광고"],
      },
      {
        title: "중학교 시기별 준비 전략",
        description: "중1~중2에는 표현 경험, 중3에는 포트폴리오 정리를 우선합니다.",
        items: ["콘텐츠 제작 기록", "발표 대본 작성", "브랜드 사례 분석", "수학 기본 루틴 유지"],
      },
      {
        title: "비교과·독서·활동 추천",
        description: "기획자의 관점이 드러나는 결과물을 남깁니다.",
        items: ["학교 행사 홍보물 기획", "짧은 영상 제작", "브랜드 분석 독서", "팀 프로젝트 회고 기록"],
      },
    ],
    learningPlan: {
      summary:
        "국어·영어 강점을 콘텐츠 기획 역량으로 연결하고, 수학은 짧은 루틴으로 기초 안정감을 확보하는 전략이 적합합니다.",
      priorities: [
        {
          subject: "국어",
          priority: 1,
          reason: "기획서, 발표, 메시지 설계의 핵심 역량입니다.",
          action: "콘텐츠 분석 글을 주 1회 작성합니다.",
        },
        {
          subject: "영어",
          priority: 2,
          reason: "글로벌 브랜드와 콘텐츠 사례를 읽는 데 필요합니다.",
          action: "광고 문구와 짧은 기사 표현을 정리합니다.",
        },
        {
          subject: "수학",
          priority: 3,
          reason: "기획 결과를 데이터로 설명하는 기반입니다.",
          action: "비율, 그래프, 통계 단원을 짧게 반복합니다.",
        },
      ],
      nextActions: [
        {
          term: "다음 학기",
          actions: ["콘텐츠 포트폴리오 시작", "발표 활동 1회 이상", "수학 오답 10분 루틴"],
        },
        {
          term: "방학",
          actions: ["브랜드 3곳 비교 분석", "영상 또는 카드뉴스 2개 제작", "영어 콘텐츠 표현 노트"],
        },
      ],
    },
    counselingTalk: [
      "지우는 좋아하는 활동이 분명하고, 그 활동을 표현 결과물로 만드는 힘이 커지고 있습니다.",
      "최근 국어와 영어 성장이 좋아서 콘텐츠 기획 쪽으로 확장할 기반이 있습니다. 이 흐름을 포트폴리오로 남기면 상담과 진로 설계에 도움이 됩니다.",
      "수학은 진로와 직접 관련이 없어 보일 수 있지만, 데이터로 기획을 설명하는 데 필요합니다. 짧고 꾸준한 루틴으로 부담을 낮추는 방식이 좋겠습니다.",
    ],
  },
];

export function getMockReport(studentId: string) {
  return mockReports.find((report) => report.studentId === studentId);
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
