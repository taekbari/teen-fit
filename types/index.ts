export type Character = "시바쌤" | "냥쌤" | "토끼쌤";

export type StudentProfile = {
  name: string;
  grade: string;
  gender: string;
  school: string;
  targetSchool: string;
  careerInterest: string;
  favoriteActivities: string;
  character: Character;
};

export type DiagnosisInput = {
  scores: {
    korean: number;
    english: number;
    math: number;
    science: number;
    social: number;
  };
  learningAnswers: string[];
  strongSubject: string;
  weakSubject: string;
  recentInterestChange: string;
  goal: string;
};

export type Quest = {
  id: string;
  title: string;
  category: "학습" | "진로" | "입시";
  duration: string;
  description: string;
};

export type AnalysisResult = {
  targetAchievement: number;
  positionSummary: string;
  stats: {
    literacy: number;
    numeracy: number;
    inquiry: number;
    selfManagement: number;
  };
  learningType: string;
  mentorComment: string;
  recommendedMissions: Quest[];
  learningStrategy: string[];
  careerSuggestions: string[];
  generatedAt: string;
};

export type RoadmapStep = {
  id: string;
  stage: string;
  period: string;
  recommendedActivities: string[];
  learningFocus: string[];
  entranceQuests: Quest[];
};

export type HistoryEntry = {
  id: string;
  createdAt: string;
  profile: StudentProfile;
  diagnosis: DiagnosisInput;
  analysis: AnalysisResult;
};
