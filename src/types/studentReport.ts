export type ReportType = "pre_middle_1" | "middle_3";
export type FitLevel = "high" | "medium" | "needs_preparation";
export type TrendDirection = "up" | "down" | "stable";

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

export type PreMiddleReport = {
  reportType: "pre_middle_1";
  summary: StudentReportSummary;
  schoolFits: SchoolFit[];
  adaptationGuide: string[];
  lifeStrategies: string[];
  learningStrategies: LearningStrategy[];
  actionPlan: TeacherActionPlan;
};

export type SubjectAnalysis = {
  subject: "수학" | "국어" | "영어";
  status: string;
  trend: TrendDirection;
  currentScore: number;
  previousScore: number;
  strengths: string[];
  improvements: string[];
  recommendedStrategy: string;
  chartValues: number[];
  chartLabels: string[];
};

export type RoadmapStep = {
  stage: string;
  title: string;
  description: string;
  actions: string[];
};

export type HighSchoolRecommendation = {
  priority: number;
  schoolType: string;
  examples: string[];
  fitLevel: FitLevel;
  reason: string;
  preparationPoints: string[];
};

export type MajorRecommendation = {
  track: "four_year" | "two_year";
  title: string;
  majors: string[];
  reason: string;
  careerConnection: string;
};

export type CreditCourseGroup = {
  category: "수학" | "과학" | "정보";
  courses: string[];
  description: string;
};

export type StrategyPlan = {
  subject: "수학" | "과학";
  targetScore: number;
  currentScore: number;
  strategies: string[];
};

export type Middle3Report = {
  reportType: "middle_3";
  summary: StudentReportSummary;
  careerKeywords: string[];
  growthStatus: string;
  riskFactors: string[];
  aiComment: string;
  subjects: SubjectAnalysis[];
  roadmap: RoadmapStep[];
  highSchools: HighSchoolRecommendation[];
  majors: MajorRecommendation[];
  creditCourses: CreditCourseGroup[];
  strategyPlans: StrategyPlan[];
  consultingPlan: {
    monthlyFocus: string[];
    schoolRecordStrategy: string[];
    clubStrategy: string[];
    collaborativeLearningStrategy: string[];
    koreanRecoveryStrategy: string[];
    parentCounselingPoint: string;
    internalMemoPrompt: string;
  };
};

export type StudentGuidanceReport = PreMiddleReport | Middle3Report;
