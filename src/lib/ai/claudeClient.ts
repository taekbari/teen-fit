export type ClaudeCompletionInput = {
  prompt: string;
  maxTokens?: number;
};

export type ClaudeCompletionResult = {
  text: string;
  model: string;
};

export async function requestClaudeCompletion(
  input: ClaudeCompletionInput,
): Promise<ClaudeCompletionResult> {
  void input;

  // TODO: 실제 데이터 정의와 프롬프트 검증이 끝나면 Claude API를 연결합니다.
  // const apiKey = process.env.ANTHROPIC_API_KEY;
  // if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not configured.");
  //
  // const response = await fetch("https://api.anthropic.com/v1/messages", {
  //   method: "POST",
  //   headers: {
  //     "x-api-key": apiKey,
  //     "anthropic-version": "2023-06-01",
  //     "content-type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     model: process.env.CLAUDE_MODEL ?? "claude-sonnet-4-5-20250929",
  //     max_tokens: input.maxTokens ?? 2000,
  //     messages: [{ role: "user", content: input.prompt }],
  //   }),
  // });
  //
  // if (!response.ok) throw new Error(await response.text());
  // const data = await response.json();
  // return {
  //   text: data.content?.find((item: { type: string }) => item.type === "text")?.text ?? "",
  //   model: data.model,
  // };

  throw new Error("Claude API is intentionally disabled in mock mode.");
}
