export type FitLevel = "high" | "medium" | "needs_preparation";

export type StudentReportSummary = {
  studentId: string;
  studentName: string;
  gradeStatus: string;
  generatedAt: string;
  coreProfile: string;
  strengths: string[];
  improvements: string[];
};

export type SchoolFit = {
  id: string;
  name: string;
  fitLevel: FitLevel;
  mainFeature: string;
  assessmentTrend: string;
  studentStrategy: string;
  recommendationPoint: string;
  counselingMemoPlaceholder: string;
};

export type LearningStrategy = {
  subject: string;
  tone: "emerald" | "sky" | "amber" | "violet";
  priority: number;
  strategyName: string;
  method: string;
  goal: string;
  counselingPoint: string;
};

export type TeacherActionPlan = {
  monthlyPriorities: string[];
  parentComment: string;
  internalMemoGuide: string;
};

export type StudentGuidanceReport = {
  summary: StudentReportSummary;
  schoolFits: SchoolFit[];
  learningStrategies: LearningStrategy[];
  actionPlan: TeacherActionPlan;
};
