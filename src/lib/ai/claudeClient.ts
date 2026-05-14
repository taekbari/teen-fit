import { assertClaudeReady, getClaudeRuntimeConfig } from "@/lib/ai/env";

export type ClaudeCompletionInput = {
  prompt: string;
  maxTokens?: number;
};

export type ClaudeCompletionResult = {
  text: string;
  model: string;
};

type ClaudeTextBlock = {
  type: "text";
  text: string;
};

type ClaudeMessageResponse = {
  model: string;
  content?: Array<ClaudeTextBlock | { type: string }>;
};

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
        messages: [{ role: "user", content: input.prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Claude API request failed: ${await response.text()}`);
    }

    const data = (await response.json()) as ClaudeMessageResponse;
    const text = data.content?.find((item): item is ClaudeTextBlock => item.type === "text")?.text ?? "";

    return {
      text,
      model: data.model,
    };
  } finally {
    clearTimeout(timeout);
  }
}
