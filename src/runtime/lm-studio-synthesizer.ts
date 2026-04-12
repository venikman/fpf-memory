import { SpanType } from '@mastra/core/observability';

import { withRuntimeSpan } from '../observability/runtime-observability.js';
import type {
  AnswerSlice,
  AnswerSynthesizerInput,
  AnswerSynthesizerOutput,
  LocalAnswerSynthesizer,
  LocalAnswerSynthesizerInfo,
} from './types.js';
import { createAiTraceRecorder } from './ai-trace-log.js';

export type LmStudioApiStyle = 'responses' | 'lmstudio_chat';
export type FetchLike = (
  input: URL | RequestInfo,
  init?: RequestInit,
) => Promise<Response>;

export interface LmStudioSynthesizerOptions {
  baseUrl: string;
  model: string;
  apiStyle?: LmStudioApiStyle;
  apiKey?: string;
  timeoutMs?: number;
  fetchImpl?: FetchLike;
  env?: NodeJS.ProcessEnv;
}

export interface LmStudioHealthCheckOptions {
  baseUrl?: string;
  model?: string;
  apiStyle?: LmStudioApiStyle;
  timeoutMs?: number;
  systemPrompt?: string;
  input?: string;
  apiKey?: string;
  fetchImpl?: FetchLike;
  env?: NodeJS.ProcessEnv;
}

export interface LmStudioHealthCheckResult {
  baseUrl: string;
  model: string;
  apiStyle: LmStudioApiStyle;
  timeoutMs: number;
  endpoints: {
    models: string;
    generation: string;
  };
  modelDiscovery: {
    ok: boolean;
    httpStatus?: number;
    durationMs: number;
    listed: boolean;
    modelCount: number;
    error?: string;
  };
  generation: {
    ok: boolean;
    httpStatus?: number;
    durationMs: number;
    responsePreview?: string;
    error?: string;
  };
}

export const DEFAULT_LM_STUDIO_BASE_URL = 'http://localhost:1234/v1';
export const DEFAULT_LM_STUDIO_MODEL = 'google/gemma-4-31b';
export const DEFAULT_LM_STUDIO_API_STYLE: LmStudioApiStyle = 'responses';
export const DEFAULT_LM_STUDIO_TIMEOUT_MS = 20_000;

export function normalizeLmStudioApiStyle(value: string | undefined): LmStudioApiStyle | undefined {
  switch (value?.trim().toLowerCase()) {
    case 'responses':
      return 'responses';
    case 'lmstudio_chat':
    case 'chat':
      return 'lmstudio_chat';
    default:
      return undefined;
  }
}

interface ResponsesApiPayload {
  output_text?: string;
  output?: Array<{
    type?: string;
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
}

interface LmStudioChatPayload {
  output?: Array<{
    type?: string;
    content?: string;
  }>;
}

type ResponsesOutputItem = NonNullable<ResponsesApiPayload['output']>[number];
type LmStudioChatOutputItem = NonNullable<LmStudioChatPayload['output']>[number];

export class LmStudioSynthesizer implements LocalAnswerSynthesizer {
  private readonly apiStyle: LmStudioApiStyle;
  private readonly endpoint: string;
  private readonly fetchImpl: FetchLike;
  private readonly timeoutMs: number;

  constructor(private readonly options: LmStudioSynthesizerOptions) {
    this.apiStyle = options.apiStyle ?? DEFAULT_LM_STUDIO_API_STYLE;
    this.endpoint = buildGenerationEndpoint(options.baseUrl, this.apiStyle);
    this.fetchImpl = options.fetchImpl ?? fetch;
    this.timeoutMs = options.timeoutMs ?? DEFAULT_LM_STUDIO_TIMEOUT_MS;
  }

  isAvailable(): boolean {
    return Boolean(this.options.baseUrl && this.options.model);
  }

  describe(): LocalAnswerSynthesizerInfo {
    return {
      provider: 'lm_studio',
      model: this.options.model,
      baseUrl: this.options.baseUrl,
      apiStyle: this.apiStyle,
    };
  }

  async synthesize(input: AnswerSynthesizerInput): Promise<AnswerSynthesizerOutput> {
    const traceRecorder = createAiTraceRecorder(this.options.env);
    const systemPrompt = buildSystemPrompt();
    const userPrompt = buildUserPrompt(input);
    const startedAt = Date.now();
    await traceRecorder.append({
      phase: 'request',
      provider: 'lm_studio',
      endpoint: this.endpoint,
      apiStyle: this.apiStyle,
      model: this.options.model,
      question: input.question,
      mode: input.mode,
      selectedNodeIds: input.trace.selectedNodeIds,
      selectedAnchorIds: input.trace.selectedAnchorIds,
      sessionApplied: input.trace.sessionApplied,
      sessionReusedNodeIds: input.trace.sessionReusedNodeIds,
      frontierCandidates: input.trace.frontierCandidates.slice(0, 12),
      retrievalHops: input.trace.retrievalHops,
      followedReferences: input.trace.followedReferences,
      request: {
        systemPrompt,
        userPrompt,
      },
    });

    const endpointInfo = describeEndpoint(this.endpoint);
    const spanResult = await withRuntimeSpan({
      env: this.options.env,
      type: SpanType.MODEL_GENERATION,
      name: `local synthesis: ${this.options.model}`,
      input: {
        question: input.question,
        mode: input.mode,
        selectedNodeIds: input.trace.selectedNodeIds,
        selectedAnchorIds: input.trace.selectedAnchorIds,
        sliceIds: input.slices.slice(0, 8).map((slice) => slice.anchorId),
        sessionApplied: input.trace.sessionApplied,
        retrievalHopCount: input.trace.retrievalHops.length,
      },
      attributes: {
        model: this.options.model,
        provider: 'lm_studio',
        streaming: false,
        serverAddress: endpointInfo.serverAddress,
        serverPort: endpointInfo.serverPort,
      },
      metadata: {
        endpoint: this.endpoint,
        apiStyle: this.apiStyle,
        frontierCount: input.trace.frontierCandidates.length,
        followedReferenceCount: input.trace.followedReferences.length,
        traceStatus: input.trace.status,
      },
      mapOutput: ({ output, httpStatus, durationMs }) => ({
        answerPreview: output.answer?.slice(0, 400),
        constraintCount: output.constraints?.length ?? 0,
        confidence: output.confidence,
        gapCount: output.gaps?.length ?? 0,
        httpStatus,
        durationMs,
      }),
      operation: async () => {
        let response: Response;
        try {
          response = await this.fetchImpl(this.endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(this.options.apiKey
                ? { Authorization: `Bearer ${this.options.apiKey}` }
                : {}),
            },
            body: JSON.stringify(
              buildGenerationRequestPayload(this.apiStyle, this.options.model, systemPrompt, userPrompt),
            ),
            signal: AbortSignal.timeout(this.timeoutMs),
          });
        } catch (error) {
          await traceRecorder.append({
            phase: 'error',
            provider: 'lm_studio',
            endpoint: this.endpoint,
            apiStyle: this.apiStyle,
            model: this.options.model,
            durationMs: Date.now() - startedAt,
            error: {
              message:
                error instanceof Error ? error.message : 'Unknown LM Studio transport error',
            },
          });
          throw error;
        }

        if (!response.ok) {
          const body = await response.text();
          await traceRecorder.append({
            phase: 'response',
            provider: 'lm_studio',
            endpoint: this.endpoint,
            apiStyle: this.apiStyle,
            model: this.options.model,
            durationMs: Date.now() - startedAt,
            httpStatus: response.status,
            ok: false,
            responseText: body,
          });
          throw new Error(
            `LM Studio synthesis failed with ${response.status}: ${body.slice(0, 300)}`,
          );
        }

        const payload = (await response.json()) as ResponsesApiPayload | LmStudioChatPayload;
        const text = extractGenerationText(payload);
        await traceRecorder.append({
          phase: 'response',
          provider: 'lm_studio',
          endpoint: this.endpoint,
          apiStyle: this.apiStyle,
          model: this.options.model,
          durationMs: Date.now() - startedAt,
          httpStatus: response.status,
          ok: true,
          responseText: text ?? JSON.stringify(payload),
        });
        if (!text) {
          throw new Error('LM Studio synthesis returned no output text.');
        }

        return {
          output: parseSynthesisOutput(text),
          httpStatus: response.status,
          durationMs: Date.now() - startedAt,
        };
      },
    });

    return spanResult.output;
  }
}

export function createSynthesizerFromEnv(
  env: NodeJS.ProcessEnv = process.env,
  fetchImpl?: typeof fetch,
): LocalAnswerSynthesizer | undefined {
  const configuredBaseUrl = env.FPF_LOCAL_LLM_BASE_URL?.trim();
  const configuredModel = env.FPF_LOCAL_LLM_MODEL?.trim();
  if (!configuredBaseUrl && !configuredModel) {
    return undefined;
  }

  const baseUrl = configuredBaseUrl || DEFAULT_LM_STUDIO_BASE_URL;
  const model = configuredModel || DEFAULT_LM_STUDIO_MODEL;
  const apiStyle = normalizeLmStudioApiStyle(env.FPF_LOCAL_LLM_API_STYLE) ?? DEFAULT_LM_STUDIO_API_STYLE;
  const timeoutMs = Number(env.FPF_LOCAL_LLM_TIMEOUT_MS ?? `${DEFAULT_LM_STUDIO_TIMEOUT_MS}`);
  return new LmStudioSynthesizer({
    baseUrl,
    model,
    apiStyle,
    apiKey: env.FPF_LOCAL_LLM_API_KEY?.trim(),
    timeoutMs: Number.isFinite(timeoutMs) ? timeoutMs : DEFAULT_LM_STUDIO_TIMEOUT_MS,
    fetchImpl,
    env,
  });
}

export async function runLmStudioHealthCheck(
  options: LmStudioHealthCheckOptions = {},
): Promise<LmStudioHealthCheckResult> {
  const env = options.env ?? process.env;
  const apiStyle = options.apiStyle
    ?? normalizeLmStudioApiStyle(env.FPF_LOCAL_LLM_API_STYLE)
    ?? DEFAULT_LM_STUDIO_API_STYLE;
  const baseUrl = options.baseUrl?.trim() || env.FPF_LOCAL_LLM_BASE_URL?.trim() || DEFAULT_LM_STUDIO_BASE_URL;
  const model = options.model?.trim() || env.FPF_LOCAL_LLM_MODEL?.trim() || DEFAULT_LM_STUDIO_MODEL;
  const apiKey = options.apiKey?.trim() || env.FPF_LOCAL_LLM_API_KEY?.trim();
  const timeoutMs = Number.isFinite(options.timeoutMs)
    ? Number(options.timeoutMs)
    : Number(env.FPF_LOCAL_LLM_TIMEOUT_MS ?? `${DEFAULT_LM_STUDIO_TIMEOUT_MS}`);
  const fetchImpl = options.fetchImpl ?? fetch;
  const modelsEndpoint = buildModelsEndpoint(baseUrl, apiStyle);
  const generationEndpoint = buildGenerationEndpoint(baseUrl, apiStyle);
  const resolvedTimeoutMs = Number.isFinite(timeoutMs) ? timeoutMs : DEFAULT_LM_STUDIO_TIMEOUT_MS;
  const systemPrompt = options.systemPrompt ?? 'You answer only in rhymes.';
  const input = options.input ?? 'What is your favorite color?';

  const modelDiscovery = await runHealthRequest(async () => {
    const response = await fetchImpl(modelsEndpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      signal: AbortSignal.timeout(resolvedTimeoutMs),
    });
    const payload = await response.json();
    const listedModels = extractListedModels(payload);
    return {
      httpStatus: response.status,
      ok: response.ok && listedModels.includes(model),
      listed: listedModels.includes(model),
      modelCount: listedModels.length,
    };
  }, { listed: false, modelCount: 0 });

  const generation = await runHealthRequest(async () => {
    const response = await fetchImpl(generationEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify(
        buildGenerationRequestPayload(apiStyle, model, systemPrompt, input),
      ),
      signal: AbortSignal.timeout(resolvedTimeoutMs),
    });

    const text = response.ok
      ? extractGenerationText((await response.json()) as ResponsesApiPayload | LmStudioChatPayload)
      : await response.text();

    return {
      httpStatus: response.status,
      ok: response.ok && Boolean(text?.trim()),
      responsePreview: text?.slice(0, 240),
    };
  });

  return {
    baseUrl,
    model,
    apiStyle,
    timeoutMs: resolvedTimeoutMs,
    endpoints: {
      models: modelsEndpoint,
      generation: generationEndpoint,
    },
    modelDiscovery,
    generation,
  };
}

function buildSystemPrompt(): string {
  return [
    'You are the local synthesis layer for a vectorless FPF retrieval runtime.',
    'Use only the provided nodes, citations, and bounded slices.',
    'Never introduce IDs, relations, constraints, or claims that are not present in the provided material.',
    'If the provided slices are insufficient, keep the deterministic answer and report the gap instead of inventing content.',
    'Return strict JSON only with keys: answer, constraints, confidence, gaps, groundingChain.',
    'confidence must be a number from 0 to 1.',
  ].join(' ');
}

function buildUserPrompt(input: AnswerSynthesizerInput): string {
  const slices = input.slices
    .slice(0, 8)
    .map((slice) => formatSlice(slice))
    .join('\n\n');
  const nodeSummary = input.nodes
    .slice(0, 8)
    .map((node) => `${node.id} | ${node.kind} | ${node.title}`)
    .join('\n');

  return [
    `Question: ${input.question}`,
    `Mode: ${input.mode}`,
    `Deterministic answer:\n${input.deterministicResult.answer}`,
    `Deterministic IDs: ${input.deterministicResult.ids.join(', ') || 'none'}`,
    `Deterministic citations: ${input.deterministicResult.citations.join(', ') || 'none'}`,
    'Retrieval summary:',
    buildTraceSummary(input),
    'Candidate nodes:',
    nodeSummary || 'none',
    'Bounded slices:',
    slices || 'none',
    'Return strict JSON only.',
  ].join('\n\n');
}

function formatSlice(slice: AnswerSlice): string {
  return [
    `[${slice.anchorId}] ${slice.heading} (${slice.role}) lines ${slice.lineStart}-${slice.lineEnd}`,
    slice.text.slice(0, 1_800),
  ].join('\n');
}

function describeEndpoint(endpoint: string): {
  serverAddress?: string;
  serverPort?: number;
} {
  try {
    const url = new URL(endpoint);
    return {
      serverAddress: url.hostname || undefined,
      serverPort: url.port ? Number(url.port) : undefined,
    };
  } catch {
    return {};
  }
}

function buildTraceSummary(input: AnswerSynthesizerInput): string {
  const frontier = input.trace.frontierCandidates
    .slice(0, 10)
    .map(
      (candidate) =>
        `${candidate.origin} -> ${candidate.targetId} (${candidate.score}) ${candidate.reason}`,
    )
    .join('\n');
  const hops = input.trace.retrievalHops
    .slice(0, 6)
    .map(
      (hop) =>
        `hop ${hop.iteration}: ${hop.reason}; nodes=${hop.addedNodeIds.join(', ') || 'none'}; anchors=${hop.addedAnchorIds.join(', ') || 'none'}; sufficientAfter=${String(hop.sufficientAfter)}`,
    )
    .join('\n');
  const followedReferences = input.trace.followedReferences
    .slice(0, 6)
    .map((edge) => `${edge.from} -> ${edge.to} (${edge.source})`)
    .join('\n');

  return [
    `Status: ${input.trace.status}; sufficient=${String(input.trace.sufficient)}`,
    `Session applied: ${String(input.trace.sessionApplied)}; reused=${input.trace.sessionReusedNodeIds.join(', ') || 'none'}; material=${String(input.trace.sessionMateriallyChanged)}`,
    `Frontier:\n${frontier || 'none'}`,
    `Hops:\n${hops || 'none'}`,
    `Followed references:\n${followedReferences || 'none'}`,
  ].join('\n\n');
}

function extractGenerationText(
  payload: ResponsesApiPayload | LmStudioChatPayload,
): string | undefined {
  if ('output_text' in payload && typeof payload.output_text === 'string' && payload.output_text.trim()) {
    return payload.output_text.trim();
  }

  const preferredMessage = findStructuredMessageText(payload.output ?? []);
  if (preferredMessage) {
    return preferredMessage;
  }

  return findAnyGenerationText(payload.output ?? []);
}

function findStructuredMessageText(
  output: Array<ResponsesOutputItem | LmStudioChatOutputItem>,
): string | undefined {
  for (const item of output) {
    if (item?.type === 'message' && 'content' in item && typeof item.content === 'string' && item.content.trim()) {
      return item.content.trim();
    }

    if (item?.type === 'message' && 'content' in item && Array.isArray(item.content)) {
      for (const content of item.content) {
        if (
          content &&
          typeof content === 'object' &&
          'text' in content &&
          typeof content.text === 'string' &&
          content.text.trim()
        ) {
          return content.text.trim();
        }
      }
    }
  }

  return undefined;
}

function findAnyGenerationText(
  output: Array<ResponsesOutputItem | LmStudioChatOutputItem>,
): string | undefined {
  for (const item of output) {
    if ('content' in item && typeof item.content === 'string' && item.content.trim()) {
      return item.content.trim();
    }
    if ('content' in item && Array.isArray(item.content)) {
      for (const content of item.content ?? []) {
        if (
          content &&
          typeof content === 'object' &&
          'text' in content &&
          typeof content.text === 'string' &&
          content.text.trim()
        ) {
          return content.text.trim();
        }
      }
    }
  }

  return undefined;
}

function buildGenerationRequestPayload(
  apiStyle: LmStudioApiStyle,
  model: string,
  systemPrompt: string,
  userPrompt: string,
): Record<string, unknown> {
  if (apiStyle === 'lmstudio_chat') {
    return {
      model,
      system_prompt: systemPrompt,
      input: userPrompt,
    };
  }

  return {
    model,
    temperature: 0.1,
    input: [
      {
        role: 'system',
        content: [
          {
            type: 'input_text',
            text: systemPrompt,
          },
        ],
      },
      {
        role: 'user',
        content: [
          {
            type: 'input_text',
            text: userPrompt,
          },
        ],
      },
    ],
  };
}

function buildGenerationEndpoint(baseUrl: string, apiStyle: LmStudioApiStyle): string {
  const trimmed = baseUrl.replace(/\/$/, '');
  if (apiStyle === 'lmstudio_chat') {
    if (trimmed.endsWith('/chat')) {
      return trimmed;
    }

    const url = safeUrl(trimmed);
    if (!url) {
      return `${trimmed}/chat`;
    }

    if (url.pathname === '/api/v1' || url.pathname === '/api/v1/') {
      return `${url.origin}/api/v1/chat`;
    }
    if (url.pathname === '/v1' || url.pathname === '/v1/' || url.pathname === '/' || url.pathname === '') {
      return `${url.origin}/api/v1/chat`;
    }

    return `${trimmed}/chat`;
  }

  if (trimmed.endsWith('/responses')) {
    return trimmed;
  }

  const url = safeUrl(trimmed);
  if (!url) {
    return `${trimmed}/responses`;
  }

  if (url.pathname === '/' || url.pathname === '') {
    return `${url.origin}/v1/responses`;
  }

  return `${trimmed}/responses`;
}

function buildModelsEndpoint(baseUrl: string, apiStyle: LmStudioApiStyle): string {
  const trimmed = baseUrl.replace(/\/$/, '');
  const url = safeUrl(trimmed);
  if (!url) {
    return apiStyle === 'lmstudio_chat' ? `${trimmed}/models` : `${trimmed}/models`;
  }

  if (apiStyle === 'lmstudio_chat') {
    if (url.pathname === '/api/v1' || url.pathname === '/api/v1/' || url.pathname === '/api/v1/chat') {
      return `${url.origin}/api/v1/models`;
    }
    if (url.pathname === '/v1' || url.pathname === '/v1/' || url.pathname === '/' || url.pathname === '') {
      return `${url.origin}/api/v1/models`;
    }
  }

  if (url.pathname.endsWith('/responses')) {
    return `${url.origin}${url.pathname.replace(/\/responses$/, '/models')}`;
  }
  if (url.pathname === '/' || url.pathname === '') {
    return `${url.origin}/v1/models`;
  }

  return `${trimmed}/models`;
}

function extractListedModels(payload: unknown): string[] {
  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const asRecord = payload as Record<string, unknown>;
  const openAiList = Array.isArray(asRecord.data) ? asRecord.data : undefined;
  if (openAiList) {
    return openAiList
      .map((item) => (item && typeof item === 'object' ? (item as Record<string, unknown>).id : undefined))
      .filter((item): item is string => typeof item === 'string');
  }

  const lmStudioList = Array.isArray(asRecord.models) ? asRecord.models : undefined;
  if (lmStudioList) {
    return lmStudioList
      .map((item) => (item && typeof item === 'object' ? (item as Record<string, unknown>).key : undefined))
      .filter((item): item is string => typeof item === 'string');
  }

  return [];
}

async function runHealthRequest<T extends { httpStatus?: number; ok: boolean }>(
  operation: () => Promise<T>,
  fallback: Partial<Omit<T, 'ok' | 'httpStatus'>> = {},
): Promise<T & { durationMs: number; error?: string }> {
  const startedAt = Date.now();
  try {
    const result = await operation();
    return {
      ...result,
      durationMs: Date.now() - startedAt,
    };
  } catch (error) {
    return {
      ...fallback,
      ok: false,
      durationMs: Date.now() - startedAt,
      error: error instanceof Error ? error.message : 'Unknown LM Studio health-check error',
    } as T & { durationMs: number; error?: string };
  }
}

function safeUrl(value: string): URL | undefined {
  try {
    return new URL(value);
  } catch {
    return undefined;
  }
}

function parseSynthesisOutput(text: string): AnswerSynthesizerOutput {
  const cleaned = text
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/, '')
    .trim();

  const jsonCandidate = extractJsonObject(cleaned);
  if (!jsonCandidate) {
    return { answer: cleaned };
  }

  try {
    const parsed = JSON.parse(jsonCandidate) as {
      answer?: unknown;
      constraints?: unknown;
      confidence?: unknown;
      gaps?: unknown;
      groundingChain?: unknown;
    };

    return {
      answer: typeof parsed.answer === 'string' ? parsed.answer : undefined,
      constraints: Array.isArray(parsed.constraints)
        ? parsed.constraints.filter((item): item is string => typeof item === 'string')
        : undefined,
      confidence:
        typeof parsed.confidence === 'number' && parsed.confidence >= 0 && parsed.confidence <= 1
          ? parsed.confidence
          : undefined,
      gaps: Array.isArray(parsed.gaps)
        ? parsed.gaps.filter((item): item is string => typeof item === 'string')
        : undefined,
      groundingChain: Array.isArray(parsed.groundingChain)
        ? parsed.groundingChain.filter((item): item is string => typeof item === 'string')
        : undefined,
    };
  } catch {
    return { answer: cleaned };
  }
}

function extractJsonObject(text: string): string | undefined {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start < 0 || end <= start) {
    return undefined;
  }
  return text.slice(start, end + 1);
}
