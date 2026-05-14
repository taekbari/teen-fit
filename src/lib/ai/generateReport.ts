import { requestClaudeCompletion } from "@/lib/ai/claudeClient";
import { getClaudeRuntimeConfig } from "@/lib/ai/env";
import { buildReportPrompt } from "@/lib/ai/reportPrompt";
import { getMockReport, getMockReportApiResult } from "@/lib/mock/reports";
import { getMockStudent } from "@/lib/mock/students";
import type {
  ActionPlan,
  LearningPriority,
  ReportApiResult,
  RoadmapSection,
  StudentReport,
} from "@/types/report";
import type { StudentRecord } from "@/types/student";

export async function generateStudentReport(studentId: string): Promise<ReportApiResult> {
  const student = getMockStudent(studentId);

  if (!student) {
    throw new Error("Student not found.");
  }

  const mockResult = getMockReportApiResult(studentId);
  const fallbackReport = getMockReport(studentId);

  if (!mockResult || !fallbackReport) {
    throw new Error("Mock report not found.");
  }

  const config = getClaudeRuntimeConfig();

  if (!config.aiReportEnabled) {
    return mockResult;
  }

  try {
    const prompt = buildReportPrompt(student);
    const completion = await requestClaudeCompletion({
      prompt,
      maxTokens: config.maxTokens,
      tool: reportToolDefinition,
    });
    const parsed = completion.toolInput ?? parseClaudeReport(completion.text);
    const report = normalizeClaudeReport(parsed, student, fallbackReport);

    return {
      report,
      meta: {
        source: "claude",
        aiEnabled: true,
        promptVersion: "teacher-report-v1",
        generatedBy: "claude-messages",
        warnings: [
          `Claude API 응답으로 생성되었습니다. model: ${completion.model}`,
          "입시 정보와 모집요강은 실제 상담 전 최신 기준 확인이 필요합니다.",
        ],
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Claude API error";

    return {
      report: fallbackReport,
      meta: {
        source: "mock",
        aiEnabled: true,
        promptVersion: "teacher-report-v1",
        generatedBy: "template",
        warnings: [
          `Claude API 생성에 실패해 mock/template 결과를 반환했습니다: ${message}`,
          "입시 정보와 모집요강은 실제 상담 전 최신 기준 확인이 필요합니다.",
        ],
      },
    };
  }
}

const reportToolDefinition = {
  name: "create_student_report",
  description: "Create a teacher-facing student career and admission roadmap report from mock student data.",
  inputSchema: {
    type: "object",
    additionalProperties: false,
    required: [
      "id",
      "studentId",
      "generatedAt",
      "student",
      "cumulativeSummary",
      "aiSummary",
      "roadmap",
      "learningPlan",
      "counselingTalk",
    ],
    properties: {
      id: { type: "string" },
      studentId: { type: "string" },
      generatedAt: { type: "string" },
      student: {
        type: "object",
        additionalProperties: false,
        required: ["id", "name", "schoolLevel", "grade", "school", "latestCareerGoal", "lastAnalyzedAt"],
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          schoolLevel: { enum: ["middle", "high"] },
          grade: { type: "number" },
          school: { type: "string" },
          latestCareerGoal: { type: "string" },
          lastAnalyzedAt: { type: "string" },
        },
      },
      cumulativeSummary: {
        type: "object",
        additionalProperties: false,
        required: ["personalityChange", "diagnosisChange", "subjectGrowth", "careerDirection", "schoolInsight"],
        properties: {
          personalityChange: { type: "string" },
          diagnosisChange: { type: "string" },
          subjectGrowth: { type: "string" },
          careerDirection: { type: "string" },
          schoolInsight: { type: "string" },
        },
      },
      aiSummary: {
        type: "object",
        additionalProperties: false,
        required: ["strengths", "improvements", "careerInterpretation", "teacherComment"],
        properties: {
          strengths: { type: "array", items: { type: "string" } },
          improvements: { type: "array", items: { type: "string" } },
          careerInterpretation: { type: "string" },
          teacherComment: { type: "string" },
        },
      },
      roadmap: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["title", "description", "items"],
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            items: { type: "array", items: { type: "string" } },
          },
        },
      },
      learningPlan: {
        type: "object",
        additionalProperties: false,
        required: ["summary", "priorities", "nextActions"],
        properties: {
          summary: { type: "string" },
          priorities: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["subject", "priority", "reason", "action"],
              properties: {
                subject: { enum: ["국어", "영어", "수학"] },
                priority: { type: "number" },
                reason: { type: "string" },
                action: { type: "string" },
              },
            },
          },
          nextActions: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["term", "actions"],
              properties: {
                term: { type: "string" },
                actions: { type: "array", items: { type: "string" } },
              },
            },
          },
        },
      },
      counselingTalk: { type: "array", items: { type: "string" } },
    },
  },
};

function parseClaudeReport(text: string): unknown {
  const trimmed = text.trim();

  try {
    return JSON.parse(trimmed);
  } catch {
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");

    if (start < 0 || end <= start) {
      throw new Error("Claude response did not contain a JSON object.");
    }

    return JSON.parse(trimmed.slice(start, end + 1));
  }
}

function normalizeClaudeReport(
  value: unknown,
  student: StudentRecord,
  fallback: StudentReport,
): StudentReport {
  if (!isRecord(value)) {
    throw new Error("Claude report JSON must be an object.");
  }

  return {
    id: readString(value.id, `REPORT-${student.id}`),
    studentId: student.id,
    generatedAt: readString(value.generatedAt, new Date().toISOString()),
    student: {
      id: student.id,
      name: student.name,
      schoolLevel: student.schoolLevel,
      grade: student.grade,
      school: student.school,
      latestCareerGoal: student.latestCareerGoal,
      lastAnalyzedAt: student.lastAnalyzedAt,
    },
    cumulativeSummary: {
      personalityChange: readNestedString(
        value,
        ["cumulativeSummary", "personalityChange"],
        fallback.cumulativeSummary.personalityChange,
      ),
      diagnosisChange: readNestedString(
        value,
        ["cumulativeSummary", "diagnosisChange"],
        fallback.cumulativeSummary.diagnosisChange,
      ),
      subjectGrowth: readNestedString(
        value,
        ["cumulativeSummary", "subjectGrowth"],
        fallback.cumulativeSummary.subjectGrowth,
      ),
      careerDirection: readNestedString(
        value,
        ["cumulativeSummary", "careerDirection"],
        fallback.cumulativeSummary.careerDirection,
      ),
      schoolInsight: readNestedString(
        value,
        ["cumulativeSummary", "schoolInsight"],
        fallback.cumulativeSummary.schoolInsight,
      ),
    },
    aiSummary: {
      strengths: readNestedStringArray(value, ["aiSummary", "strengths"], fallback.aiSummary.strengths),
      improvements: readNestedStringArray(value, ["aiSummary", "improvements"], fallback.aiSummary.improvements),
      careerInterpretation: readNestedString(
        value,
        ["aiSummary", "careerInterpretation"],
        fallback.aiSummary.careerInterpretation,
      ),
      teacherComment: readNestedString(value, ["aiSummary", "teacherComment"], fallback.aiSummary.teacherComment),
    },
    roadmap: normalizeRoadmap(readValue(value, ["roadmap"]), fallback.roadmap),
    learningPlan: {
      summary: readNestedString(value, ["learningPlan", "summary"], fallback.learningPlan.summary),
      priorities: normalizePriorities(readValue(value, ["learningPlan", "priorities"]), fallback.learningPlan.priorities),
      nextActions: normalizeActionPlans(readValue(value, ["learningPlan", "nextActions"]), fallback.learningPlan.nextActions),
    },
    counselingTalk: readNestedStringArray(value, ["counselingTalk"], fallback.counselingTalk),
  };
}

function normalizeRoadmap(value: unknown, fallback: RoadmapSection[]): RoadmapSection[] {
  if (!Array.isArray(value)) return fallback;

  const sections = value.flatMap((item): RoadmapSection[] => {
    if (!isRecord(item)) return [];

    return [{
      title: readString(item.title, ""),
      description: readString(item.description, ""),
      items: readStringArray(item.items, []),
    }].filter((section) => section.title && section.description);
  });

  return sections.length ? sections : fallback;
}

function normalizePriorities(value: unknown, fallback: LearningPriority[]): LearningPriority[] {
  if (!Array.isArray(value)) return fallback;

  const priorities = value.flatMap((item): LearningPriority[] => {
    if (!isRecord(item) || !isLearningSubject(item.subject)) return [];

    return [{
      subject: item.subject,
      priority: readNumber(item.priority, 1),
      reason: readString(item.reason, ""),
      action: readString(item.action, ""),
    }].filter((priority) => priority.reason && priority.action);
  });

  return priorities.length ? priorities : fallback;
}

function normalizeActionPlans(value: unknown, fallback: ActionPlan[]): ActionPlan[] {
  if (!Array.isArray(value)) return fallback;

  const plans = value.flatMap((item): ActionPlan[] => {
    if (!isRecord(item)) return [];

    return [{
      term: readString(item.term, ""),
      actions: readStringArray(item.actions, []),
    }].filter((plan) => plan.term && plan.actions.length);
  });

  return plans.length ? plans : fallback;
}

function readValue(value: unknown, path: string[]): unknown {
  return path.reduce<unknown>((current, key) => {
    if (!isRecord(current)) return undefined;
    return current[key];
  }, value);
}

function readNestedString(value: unknown, path: string[], fallback: string): string {
  return readString(readValue(value, path), fallback);
}

function readNestedStringArray(value: unknown, path: string[], fallback: string[]): string[] {
  return readStringArray(readValue(value, path), fallback);
}

function readString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function readNumber(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function readStringArray(value: unknown, fallback: string[]): string[] {
  if (!Array.isArray(value)) return fallback;
  const strings = value.filter((item): item is string => typeof item === "string" && Boolean(item.trim()));
  return strings.length ? strings : fallback;
}

function isLearningSubject(value: unknown): value is LearningPriority["subject"] {
  return value === "국어" || value === "영어" || value === "수학";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
