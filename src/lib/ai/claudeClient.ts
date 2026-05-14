import { assertClaudeReady, getClaudeRuntimeConfig } from "@/lib/ai/env";

export type ClaudeCompletionInput = {
  prompt: string;
  maxTokens?: number;
  tool?: ClaudeToolDefinition;
};

export type ClaudeCompletionResult = {
  text: string;
  model: string;
  toolInput?: unknown;
};

export type ClaudeToolDefinition = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
};

type ClaudeTextBlock = {
  type: "text";
  text: string;
};

type ClaudeToolUseBlock = {
  type: "tool_use";
  name: string;
  input: unknown;
};

type ClaudeMessageResponse = {
  model: string;
  content?: ClaudeContentBlock[];
};

type ClaudeContentBlock = ClaudeTextBlock | ClaudeToolUseBlock | { type: string };

export async function requestClaudeCompletion(
  input: ClaudeCompletionInput,
): Promise<ClaudeCompletionResult> {
  const config = getClaudeRuntimeConfig();
  assertClaudeReady(config);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), config.timeoutMs);

  try {
    const response = await fetch(config.baseUrl, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "x-api-key": config.apiKey,
        "anthropic-version": config.apiVersion,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: config.model,
        max_tokens: input.maxTokens ?? config.maxTokens,
        temperature: 0,
        ...(input.tool
          ? {
              tools: [
                {
                  name: input.tool.name,
                  description: input.tool.description,
                  input_schema: input.tool.inputSchema,
                },
              ],
              tool_choice: { type: "tool", name: input.tool.name },
            }
          : {}),
        messages: [{ role: "user", content: input.prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Claude API request failed: ${await response.text()}`);
    }

    const data = (await response.json()) as ClaudeMessageResponse;
    const text = data.content?.find((item): item is ClaudeTextBlock => item.type === "text")?.text ?? "";
    const toolUse = data.content?.find(
      (item): item is ClaudeToolUseBlock =>
        isClaudeToolUseBlock(item) && (!input.tool || item.name === input.tool.name),
    );

    return {
      text,
      model: data.model,
      toolInput: toolUse?.input,
    };
  } finally {
    clearTimeout(timeout);
  }
}

function isClaudeToolUseBlock(item: ClaudeContentBlock): item is ClaudeToolUseBlock {
  return item.type === "tool_use" && "name" in item && "input" in item;
}
