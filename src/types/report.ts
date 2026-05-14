import type { StudentRecord } from "@/types/student";

export type ReportCommentary = {
  strengths: string[];
  improvements: string[];
  careerInterpretation: string;
  teacherComment: string;
};

export type RoadmapSection = {
  title: string;
  description: string;
  items: string[];
};

export type LearningPriority = {
  subject: "국어" | "영어" | "수학";
  priority: number;
  reason: string;
  action: string;
};

export type ActionPlan = {
  term: string;
  actions: string[];
};

export type StudentReport = {
  id: string;
  studentId: string;
  generatedAt: string;
  student: Pick<
    StudentRecord,
    "id" | "name" | "schoolLevel" | "grade" | "school" | "latestCareerGoal" | "lastAnalyzedAt"
  >;
  cumulativeSummary: {
    personalityChange: string;
    diagnosisChange: string;
    subjectGrowth: string;
    careerDirection: string;
    schoolInsight: string;
  };
  aiSummary: ReportCommentary;
  roadmap: RoadmapSection[];
  learningPlan: {
    summary: string;
    priorities: LearningPriority[];
    nextActions: ActionPlan[];
  };
  counselingTalk: string[];
};

export type ReportApiResult = {
  report: StudentReport;
  meta: {
    source: "mock" | "claude";
    aiEnabled: boolean;
    promptVersion: string;
    generatedBy: "template" | "claude-code" | "claude-messages";
    warnings: string[];
  };
};
