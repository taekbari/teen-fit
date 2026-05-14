export type SchoolLevel = "middle" | "high";

export type StudentSummaryStatus = "ready" | "needs_update" | "in_progress";

export type PersonalityType = {
  primary: string;
  secondary: string;
};

export type TraitScores = {
  analyticalThinking: number;
  creativity: number;
  leadership: number;
  collaboration: number;
  execution: number;
  concentration: number;
  emotionalStability: number;
};

export type PersonalityQualitativeProfile = {
  mainInterestSubjects: string;
  learningAttitude: string;
  coreStrength: string;
  coachingFocus: string;
};

export type PersonalityAxisScore = {
  category: string;
  detail: string;
  leftLabel: string;
  rightLabel: string;
  leftScore: number;
  rightScore: number;
  dominantLabel: string;
};

export type PersonalityPreference = {
  category: string;
  detail: string;
  value: string;
};

export type PersonalitySnapshot = {
  year: number;
  stage?: string;
  type: PersonalityType;
  traits: TraitScores;
  note: string;
  qualitative?: PersonalityQualitativeProfile;
  axisScores?: PersonalityAxisScore[];
  preferences?: PersonalityPreference[];
};

export type DiagnosisSnapshot = {
  period: string;
  scores: {
    aptitude: number;
    learningReadiness: number;
    careerClarity: number;
    selfManagement: number;
  };
  summary: string;
};

export type SubjectScore = {
  period: string;
  korean: number;
  english: number;
  math: number;
};

export type SubjectName = "국어" | "영어" | "수학";

export type SubjectAssessmentRecord = {
  subject: SubjectName;
  period: string;
  totalScore: number;
  topPercent: number;
  domains: Record<string, number | null>;
  difficultyAchievement: {
    high: number;
    medium: number;
    low: number;
  };
};

export type CareerTimelineItem = {
  date: string;
  goal: string;
  reason: string;
};

export type TeacherObservation = {
  date: string;
  memo: string;
};

export type SchoolAssessmentInsight = {
  subject: "국어" | "영어" | "수학" | "과학" | "공통";
  pattern: string;
  recommendation: string;
};

export type AcademicScheduleItem = {
  date: string;
  title: string;
  type: "exam" | "performance" | "counseling" | "activity";
};

export type StudentRecord = {
  id: string;
  name: string;
  schoolLevel: SchoolLevel;
  grade: number;
  school: string;
  latestCareerGoal: string;
  interestedJobs: string[];
  interestedMajors: string[];
  interestedSchools: string[];
  lastAnalyzedAt: string;
  status: StudentSummaryStatus;
  personalityHistory: PersonalitySnapshot[];
  diagnosisHistory: DiagnosisSnapshot[];
  subjectGrowth: SubjectScore[];
  subjectAssessments: SubjectAssessmentRecord[];
  careerTimeline: CareerTimelineItem[];
  schoolAssessmentInsights: SchoolAssessmentInsight[];
  academicSchedule: AcademicScheduleItem[];
  teacherObservations: TeacherObservation[];
};
