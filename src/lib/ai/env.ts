export type ClaudeRuntimeConfig = {
  apiKey?: string;
  model: string;
  apiVersion: string;
  baseUrl: string;
  maxTokens: number;
  timeoutMs: number;
  aiReportEnabled: boolean;
};

export type ClaudeConfigStatus = {
  aiReportEnabled: boolean;
  hasApiKey: boolean;
  model: string;
  apiVersion: string;
  baseUrl: string;
};

function readBoolean(value: string | undefined): boolean {
  return value === "true" || value === "1";
}

function readNumber(value: string | undefined, fallback: number): number {
  if (!value) return fallback;

  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function getClaudeRuntimeConfig(): ClaudeRuntimeConfig {
  return {
    apiKey: process.env.ANTHROPIC_API_KEY,
    model: process.env.CLAUDE_MODEL ?? "claude-sonnet-4-5-20250929",
    apiVersion: process.env.CLAUDE_API_VERSION ?? "2023-06-01",
    baseUrl: process.env.CLAUDE_API_BASE_URL ?? "https://api.anthropic.com/v1/messages",
    maxTokens: readNumber(process.env.CLAUDE_MAX_TOKENS, 4000),
    timeoutMs: readNumber(process.env.CLAUDE_TIMEOUT_MS, 30000),
    aiReportEnabled: readBoolean(process.env.ENABLE_AI_REPORT),
  };
}

export function getClaudeConfigStatus(): ClaudeConfigStatus {
  const config = getClaudeRuntimeConfig();

  return {
    aiReportEnabled: config.aiReportEnabled,
    hasApiKey: Boolean(config.apiKey),
    model: config.model,
    apiVersion: config.apiVersion,
    baseUrl: config.baseUrl,
  };
}

export function assertClaudeReady(config = getClaudeRuntimeConfig()): asserts config is ClaudeRuntimeConfig & {
  apiKey: string;
} {
  if (!config.aiReportEnabled) {
    throw new Error("Claude report generation is disabled. Set ENABLE_AI_REPORT=true to enable it.");
  }

  if (!config.apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not configured.");
  }
}
