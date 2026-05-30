import {
  RuntimeSpanType,
  withRuntimeSpan,
} from '../adapters/infra/observability/runtime-observability.js';
import {
  parseLmStudioConfig,
  parseObservabilityConfig,
} from '../adapters/infra/config/env.js';
import type { ObservabilityConfig } from '../adapters/infra/config/types.js';
import {
  DEFAULT_LM_STUDIO_BASE_URL,
  DEFAULT_LM_STUDIO_MODEL,
  DEFAULT_LM_STUDIO_TIMEOUT_MS,
} from '../adapters/infra/config/lm-studio-defaults.js';
import type {
  AnswerSlice,
  AnswerSynthesizerInput,
  AnswerSynthesizerOutput,
  LocalAnswerSynthesizerAvailability,
  LocalAnswerSynthesizer,
  LocalAnswerSynthesizerInfo,
} from './types.js';
import { createAiTraceRecorderFromPath } from './ai-trace-log.js';

export {
  DEFAULT_LM_STUDIO_BASE_URL,
  DEFAULT_LM_STUDIO_MODEL,
  DEFAULT_LM_STUDIO_TIMEOUT_MS,
} from '../adapters/infra/config/lm-studio-defaults.js';

export type FetchLike = (
  input: URL | RequestInfo,
  init?: RequestInit,
) => Promise<Response>;

export interface LmStudioSynthesizerOptions {
  baseUrl: string;
  model: string;
  apiKey?: string;
  timeoutMs?: number;
  fetchImpl?: FetchLike;
  traceLogPath?: string;
  observabilityConfig?: ObservabilityConfig;
}

export interface LmStudioHealthCheckOptions {
  baseUrl?: string;
  model?: string;
  timeoutMs?: number;
  systemPrompt?: string;
  input?: string;
  apiKey?: string;
  fetchImpl?: FetchLike;
}

export interface LmStudioHealthCheckResult {
  baseUrl: string;
  model: string;
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

interface AnthropicMessagesPayload {
  content?: Array<{
    type?: string;
    text?: string;
  }>;
}

export class LmStudioSynthesizer implements LocalAnswerSynthesizer {
  private readonly endpoint: string;
  private readonly fetchImpl: FetchLike;
  private readonly timeoutMs: number;

  constructor(private readonly options: LmStudioSynthesizerOptions) {
    this.endpoint = buildGenerationEndpoint(options.baseUrl);
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
    };
  }

  async checkAvailability(): Promise<LocalAnswerSynthesizerAvailability> {
    const checkedAt = new Date().toISOString();
    if (!this.isAvailable()) {
      return {
        availability: 'unavailable',
        checkedAt,
        failure: {
          message: 'LM Studio synthesis is not configured with both base URL and model.',
          endpoint: this.endpoint,
        },
      };
    }

    const health = await runLmStudioHealthCheck({
      baseUrl: this.options.baseUrl,
      model: this.options.model,
      apiKey: this.options.apiKey,
      timeoutMs: Math.min(this.timeoutMs, 3_000),
      fetchImpl: this.fetchImpl,
      systemPrompt: 'Return one short health-check token.',
      input: 'Return ok.',
    });

    if (health.modelDiscovery.ok && health.generation.ok) {
      return { availability: 'available', checkedAt };
    }

    const generationFailed = !health.generation.ok;
    const failed = generationFailed ? health.generation : health.modelDiscovery;
    return {
      availability: health.modelDiscovery.ok || health.generation.ok ? 'degraded' : 'unavailable',
      checkedAt,
      failure: {
        message: summarizeHealthFailure(generationFailed ? 'generation' : 'model discovery', failed),
        httpStatus: failed.httpStatus,
        endpoint: generationFailed ? health.endpoints.generation : health.endpoints.models,
      },
    };
  }

  async synthesize(input: AnswerSynthesizerInput): Promise<AnswerSynthesizerOutput> {
    const traceRecorder = createAiTraceRecorderFromPath(
      this.options.traceLogPath ?? '.runtime/logs/ai-traces.jsonl',
    );
    const systemPrompt = buildSystemPrompt();
    const userPrompt = buildUserPrompt(input);
    const startedAt = Date.now();
    await traceRecorder.append({
      phase: 'request',
      provider: 'lm_studio',
      endpoint: this.endpoint,
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
      observabilityConfig: this.options.observabilityConfig,
      type: RuntimeSpanType.ModelGeneration,
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
              buildAnthropicMessagesPayload(this.options.model, systemPrompt, userPrompt),
            ),
            signal: AbortSignal.timeout(this.timeoutMs),
          });
        } catch (error) {
          await traceRecorder.append({
            phase: 'error',
            provider: 'lm_studio',
            endpoint: this.endpoint,
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
            model: this.options.model,
            durationMs: Date.now() - startedAt,
            httpStatus: response.status,
            ok: false,
            responseText: body,
          });
          throw new Error(
            `LM Studio synthesis failed with ${response.status}: ${formatRemoteFailurePreview(body)}`,
          );
        }

        const payload = (await response.json()) as AnthropicMessagesPayload;
        const text = extractAnthropicText(payload);
        await traceRecorder.append({
          phase: 'response',
          provider: 'lm_studio',
          endpoint: this.endpoint,
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

function summarizeHealthFailure(
  phase: string,
  result: { error?: string; responsePreview?: string; httpStatus?: number; listed?: boolean },
): string {
  if (result.error) {
    return `LM Studio ${phase} health check failed: ${result.error}`;
  }
  if (result.httpStatus !== undefined) {
    const preview = result.responsePreview
      ? `: ${formatRemoteFailurePreview(result.responsePreview, 160)}`
      : '';
    return `LM Studio ${phase} health check returned HTTP ${result.httpStatus}${preview}`;
  }
  if (result.listed === false) {
    return `LM Studio ${phase} health check did not list the configured model.`;
  }
  return `LM Studio ${phase} health check failed.`;
}

function formatRemoteFailurePreview(body: string, maxLength = 300): string {
  const collapsed = body.slice(0, maxLength * 2).replace(/\s+/g, ' ').trim();
  if (!collapsed) {
    return '<empty response body>';
  }
  if (looksLikeHtml(collapsed)) {
    return 'HTML error response omitted';
  }
  return collapsed.slice(0, maxLength);
}

function looksLikeHtml(value: string): boolean {
  return (
    /^<!doctype html\b/i.test(value) ||
    /^<html\b/i.test(value) ||
    /<\/?[a-z][a-z0-9-]*(?:\s[^>]*)?>/i.test(value)
  );
}

export function createSynthesizerFromConfig(
  options: LmStudioSynthesizerOptions | undefined,
): LocalAnswerSynthesizer | undefined {
  if (!options?.baseUrl || !options.model) {
    return undefined;
  }
  return new LmStudioSynthesizer(options);
}

export function createSynthesizerFromEnv(
  env: NodeJS.ProcessEnv = process.env,
  fetchImpl?: FetchLike,
): LocalAnswerSynthesizer | undefined {
  const lmStudioConfig = parseLmStudioConfig(env);
  if (!lmStudioConfig.enabled) {
    return undefined;
  }

  return createSynthesizerFromConfig({
    baseUrl: lmStudioConfig.baseUrl,
    model: lmStudioConfig.model,
    apiKey: lmStudioConfig.apiKey,
    timeoutMs: lmStudioConfig.timeoutMs,
    fetchImpl,
    traceLogPath: lmStudioConfig.traceLogPath,
    observabilityConfig: parseObservabilityConfig(env),
  });
}

export async function runLmStudioHealthCheck(
  options: LmStudioHealthCheckOptions = {},
): Promise<LmStudioHealthCheckResult> {
  const baseUrl = options.baseUrl?.trim() || DEFAULT_LM_STUDIO_BASE_URL;
  const model = options.model?.trim() || DEFAULT_LM_STUDIO_MODEL;
  const apiKey = options.apiKey?.trim();
  const timeoutMs = Number.isFinite(options.timeoutMs)
    ? Number(options.timeoutMs)
    : DEFAULT_LM_STUDIO_TIMEOUT_MS;
  const fetchImpl = options.fetchImpl ?? fetch;
  const modelsEndpoint = buildModelsEndpoint(baseUrl);
  const generationEndpoint = buildGenerationEndpoint(baseUrl);
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
        buildAnthropicMessagesPayload(model, systemPrompt, input),
      ),
      signal: AbortSignal.timeout(resolvedTimeoutMs),
    });

    const text = response.ok
      ? extractAnthropicText((await response.json()) as AnthropicMessagesPayload)
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

function extractAnthropicText(payload: AnthropicMessagesPayload): string | undefined {
  if (!Array.isArray(payload.content)) {
    return undefined;
  }
  const parts = payload.content
    .filter(
      (part): part is { type?: string; text: string } =>
        Boolean(part) &&
        typeof part === 'object' &&
        'text' in part &&
        typeof (part as { text?: unknown }).text === 'string' &&
        (part as { text: string }).text.trim().length > 0,
    )
    .map((part) => part.text.trim());
  return parts.length > 0 ? parts.join('\n').trim() : undefined;
}

function buildAnthropicMessagesPayload(
  model: string,
  systemPrompt: string,
  userPrompt: string,
): Record<string, unknown> {
  return {
    model,
    max_tokens: 1024,
    temperature: 0.1,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
  };
}

function buildGenerationEndpoint(baseUrl: string): string {
  const trimmed = baseUrl.replace(/\/$/, '');
  if (trimmed.endsWith('/messages')) {
    return trimmed;
  }
  const url = safeUrl(trimmed);
  if (!url) {
    return `${trimmed}/messages`;
  }
  if (url.pathname === '/' || url.pathname === '') {
    return `${url.origin}/v1/messages`;
  }
  return `${trimmed}/messages`;
}

function buildModelsEndpoint(baseUrl: string): string {
  const trimmed = baseUrl.replace(/\/$/, '');
  const url = safeUrl(trimmed);
  if (!url) {
    return `${trimmed}/models`;
  }
  if (url.pathname.endsWith('/messages')) {
    return `${url.origin}${url.pathname.replace(/\/messages$/, '/models')}`;
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
