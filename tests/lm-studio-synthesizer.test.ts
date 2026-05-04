import { copyFile, mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

import { afterEach, beforeEach, describe, expect, it } from '@rstest/core';

import { DEFAULT_SOURCE_PATH } from '../src/core/constants.js';
import { resetRuntimeObservabilityForTests } from '../src/adapters/infra/observability/runtime-observability.js';
import {
  DEFAULT_LM_STUDIO_BASE_URL,
  DEFAULT_LM_STUDIO_MODEL,
  createSynthesizerFromEnv,
  LmStudioSynthesizer,
  runLmStudioHealthCheck,
} from '../src/runtime/lm-studio-synthesizer.js';
import { createConfiguredRuntime } from '../src/composition/runtime.js';
import { FpfRuntime } from '../src/runtime/runtime.js';

describe('LmStudioSynthesizer', () => {
  const canonicalSourcePath = resolve(process.cwd(), DEFAULT_SOURCE_PATH);
  let tempRoot: string;
  let sourcePath: string;
  let artifactDir: string;
  let aiTraceLogPath: string;
  let observabilityLogPath: string;

  function createObservabilityConfig() {
    return {
      filePath: observabilityLogPath,
      format: 'flat' as const,
      includeInternalSpans: true,
      logLevel: 'info' as const,
      excludeModelChunks: true,
      serviceName: 'fpf-spec-runtime',
    };
  }

  beforeEach(async () => {
    tempRoot = await mkdtemp(resolve(tmpdir(), 'fpf-runtime-lmstudio-'));
    sourcePath = resolve(tempRoot, 'FPF-spec.md');
    artifactDir = resolve(tempRoot, 'artifacts');
    aiTraceLogPath = resolve(tempRoot, 'ai-traces.jsonl');
    observabilityLogPath = resolve(tempRoot, 'mastra-observability.json');
    await copyFile(canonicalSourcePath, sourcePath);
    await resetRuntimeObservabilityForTests();
  });

  afterEach(async () => {
    delete process.env.FPF_LOCAL_LLM_BASE_URL;
    delete process.env.FPF_LOCAL_LLM_MODEL;
    delete process.env.FPF_LOCAL_LLM_API_KEY;
    delete process.env.FPF_LOCAL_LLM_TIMEOUT_MS;
    delete process.env.FPF_MASTRA_OBSERVABILITY_PATH;
    delete process.env.FPF_MASTRA_OBSERVABILITY_FORMAT;
    delete process.env.FPF_MASTRA_OBSERVABILITY_INCLUDE_INTERNAL_SPANS;
    delete process.env.FPF_MASTRA_OBSERVABILITY_INCLUDE_MODEL_CHUNKS;
    delete process.env.FPF_MASTRA_OBSERVABILITY_LOG_LEVEL;
    await resetRuntimeObservabilityForTests();
    await rm(tempRoot, { recursive: true, force: true });
  });

  it('posts to /v1/messages with the Anthropic Messages shape and parses content[].text', async () => {
    let requestUrl = '';
    let requestBody: Record<string, unknown> | undefined;

    const runtime = new FpfRuntime({
      sourcePath,
      artifactDir,
      synthesizer: new LmStudioSynthesizer({
        baseUrl: 'http://localhost:1234/v1',
        model: 'google/gemma-4-31b',
        traceLogPath: aiTraceLogPath,
        observabilityConfig: createObservabilityConfig(),
        fetchImpl: async (url, init) => {
          requestUrl = String(url);
          requestBody = JSON.parse(String(init?.body ?? '{}')) as Record<string, unknown>;
          return new Response(
            JSON.stringify({
              content: [
                {
                  type: 'text',
                  text: JSON.stringify({
                    answer: 'Local synthesis answer.',
                    constraints: ['Use only provided bounded slices.'],
                    confidence: 0.78,
                    gaps: [],
                    groundingChain: ['Used the bounded slice set only.'],
                  }),
                },
              ],
              stop_reason: 'end_turn',
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
          );
        },
      }),
    });

    const result = await runtime.query('What is U.BoundedContext?', 'compact');
    const sourceText = await readFile(sourcePath, 'utf8');

    expect(result.answer).toBe('Local synthesis answer.');
    expect(result.constraints).toEqual(['Use only provided bounded slices.']);
    expect(result.confidence).toBe(0.78);
    expect(result.groundingChain).toEqual(['Used the bounded slice set only.']);

    expect(requestUrl).toBe('http://localhost:1234/v1/messages');
    expect(requestBody?.model).toBe('google/gemma-4-31b');
    expect(typeof requestBody?.system).toBe('string');
    expect(typeof requestBody?.max_tokens).toBe('number');
    const messages = requestBody?.messages as Array<{ role: string; content: string }>;
    expect(messages[0].role).toBe('user');
    expect(messages[0].content).toContain('A.1.1');
    expect(messages[0].content).toContain('Retrieval summary:');
    expect(JSON.stringify(requestBody).length).toBeLessThan(sourceText.length / 5);

    const traceLog = await readFile(aiTraceLogPath, 'utf8');
    expect(traceLog).toContain('"phase":"request"');
    expect(traceLog).toContain('"phase":"response"');
    expect(traceLog).toContain('"question":"What is U.BoundedContext?"');

    const observabilityLog = await readFile(observabilityLogPath, 'utf8');
    expect(observabilityLog).toContain('"type": "model_generation"');
    expect(observabilityLog).toContain('"provider": "lm_studio"');
    expect(observabilityLog).toContain('"model": "google/gemma-4-31b"');
  });

  it('configures the local synthesizer from environment at the composition edge', async () => {
    process.env.FPF_LOCAL_LLM_BASE_URL = 'http://localhost:1234/v1';
    process.env.FPF_LOCAL_LLM_MODEL = 'google/gemma-4-31b';
    process.env.FPF_MASTRA_OBSERVABILITY_PATH = observabilityLogPath;

    const { runtime } = createConfiguredRuntime({
      ...process.env,
      FPF_SPEC_SOURCE_PATH: sourcePath,
      FPF_RUNTIME_ARTIFACT_DIR: artifactDir,
    });

    const status = await runtime.status();
    expect(status.synthesizer.configured).toBe(true);
    expect(status.synthesizer.provider).toBe('lm_studio');
    expect(status.synthesizer.model).toBe('google/gemma-4-31b');
    expect(status.synthesizer.baseUrl).toBe('http://localhost:1234/v1');
    expect(status.observability.configured).toBe(true);
    expect(status.observability.filePath).toBe(observabilityLogPath);
    expect(status.observability.format).toBe('flat');
    expect(status.sessionCache.enabled).toBe(true);
  });

  it('supports the env-shaped synthesizer helper', () => {
    const synthesizer = createSynthesizerFromEnv({
      FPF_LOCAL_LLM_BASE_URL: 'http://localhost:1234/v1',
      FPF_LOCAL_LLM_MODEL: 'google/gemma-4-31b',
      FPF_AI_TRACE_LOG_PATH: aiTraceLogPath,
      FPF_MASTRA_OBSERVABILITY_PATH: observabilityLogPath,
    } as NodeJS.ProcessEnv);

    expect(synthesizer).toBeDefined();
    expect(synthesizer?.describe?.()).toEqual({
      provider: 'lm_studio',
      model: 'google/gemma-4-31b',
      baseUrl: 'http://localhost:1234/v1',
    });
  });

  it('fills missing LM Studio env fields from repo defaults after edge opt-in', async () => {
    process.env.FPF_LOCAL_LLM_MODEL = DEFAULT_LM_STUDIO_MODEL;

    const { runtime } = createConfiguredRuntime({
      ...process.env,
      FPF_SPEC_SOURCE_PATH: sourcePath,
      FPF_RUNTIME_ARTIFACT_DIR: artifactDir,
    });

    const status = await runtime.status();
    expect(status.synthesizer.configured).toBe(true);
    expect(status.synthesizer.provider).toBe('lm_studio');
    expect(status.synthesizer.model).toBe(DEFAULT_LM_STUDIO_MODEL);
    expect(status.synthesizer.baseUrl).toBe(DEFAULT_LM_STUDIO_BASE_URL);
  });

  it('reports model-list and generation health for /v1/messages', async () => {
    const requestedUrls: string[] = [];

    const result = await runLmStudioHealthCheck({
      baseUrl: 'http://localhost:1234/v1',
      model: 'google/gemma-4-31b',
      timeoutMs: 1234,
      fetchImpl: async (url, init) => {
        requestedUrls.push(String(url));
        if ((init?.method ?? 'GET') === 'GET') {
          return new Response(
            JSON.stringify({ data: [{ id: 'google/gemma-4-31b' }] }),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
          );
        }
        return new Response(
          JSON.stringify({
            content: [{ type: 'text', text: 'Health check response.' }],
            stop_reason: 'end_turn',
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        );
      },
    });

    expect(result.timeoutMs).toBe(1234);
    expect(result.endpoints.models).toBe('http://localhost:1234/v1/models');
    expect(result.endpoints.generation).toBe('http://localhost:1234/v1/messages');
    expect(result.modelDiscovery.ok).toBe(true);
    expect(result.modelDiscovery.listed).toBe(true);
    expect(result.generation.ok).toBe(true);
    expect(result.generation.responsePreview).toContain('Health check response.');
    expect(requestedUrls).toEqual([
      'http://localhost:1234/v1/models',
      'http://localhost:1234/v1/messages',
    ]);
  });

  it('maps a /v1/messages base URL back to /v1/models for discovery', async () => {
    const requestedUrls: string[] = [];

    const result = await runLmStudioHealthCheck({
      baseUrl: 'http://localhost:1234/v1/messages',
      model: 'google/gemma-4-31b',
      fetchImpl: async (url, init) => {
        requestedUrls.push(String(url));
        if ((init?.method ?? 'GET') === 'GET') {
          return new Response(
            JSON.stringify({ data: [{ id: 'google/gemma-4-31b' }] }),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
          );
        }
        return new Response(
          JSON.stringify({
            content: [{ type: 'text', text: 'Health check response.' }],
            stop_reason: 'end_turn',
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        );
      },
    });

    expect(result.endpoints.models).toBe('http://localhost:1234/v1/models');
    expect(result.endpoints.generation).toBe('http://localhost:1234/v1/messages');
    expect(requestedUrls).toEqual([
      'http://localhost:1234/v1/models',
      'http://localhost:1234/v1/messages',
    ]);
  });

  it('forwards the api key as a Bearer token on both health-check requests', async () => {
    const authHeaders: Array<string | null> = [];

    const result = await runLmStudioHealthCheck({
      baseUrl: 'http://localhost:1234/v1',
      model: 'google/gemma-4-31b',
      apiKey: 'secret-token',
      fetchImpl: async (_url, init) => {
        authHeaders.push(new Headers(init?.headers).get('Authorization'));
        if ((init?.method ?? 'GET') === 'GET') {
          return new Response(
            JSON.stringify({ data: [{ id: 'google/gemma-4-31b' }] }),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
          );
        }
        return new Response(
          JSON.stringify({
            content: [{ type: 'text', text: 'Health check response.' }],
            stop_reason: 'end_turn',
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        );
      },
    });

    expect(result.endpoints.models).toBe('http://localhost:1234/v1/models');
    expect(result.endpoints.generation).toBe('http://localhost:1234/v1/messages');
    expect(authHeaders).toEqual(['Bearer secret-token', 'Bearer secret-token']);
  });

  it('preserves model discovery shape when discovery requests fail', async () => {
    const result = await runLmStudioHealthCheck({
      baseUrl: 'http://localhost:1234/v1',
      model: 'google/gemma-4-31b',
      fetchImpl: async (url, init) => {
        if ((init?.method ?? 'GET') === 'GET') {
          throw new Error(`boom:${String(url)}`);
        }
        return new Response(
          JSON.stringify({
            content: [{ type: 'text', text: 'Health check response.' }],
            stop_reason: 'end_turn',
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        );
      },
    });

    expect(result.modelDiscovery.ok).toBe(false);
    expect(result.modelDiscovery.listed).toBe(false);
    expect(result.modelDiscovery.modelCount).toBe(0);
    expect(result.modelDiscovery.error).toContain('boom:http://localhost:1234/v1/models');
  });

  it('reports synthesizer availability separately from index freshness', async () => {
    const runtime = new FpfRuntime({
      sourcePath,
      artifactDir,
      synthesizer: new LmStudioSynthesizer({
        baseUrl: 'http://localhost:1234/v1',
        model: 'google/gemma-4-31b',
        fetchImpl: async () =>
          new Response('ngrok 404', {
            status: 404,
            headers: { 'Content-Type': 'text/plain' },
          }),
      }),
    });

    const status = await runtime.status();

    expect(status.fresh).toBe(true);
    expect(status.synthesizer.configured).toBe(true);
    expect(status.synthesizer.availability).toBe('unavailable');
    expect(status.synthesizer.checkedAt).toBeDefined();
    expect(status.synthesizer.failure?.httpStatus).toBe(404);
    expect(status.synthesizer.failure?.endpoint).toBe('http://localhost:1234/v1/messages');
  });

  it('falls back deterministically when LM Studio returns an error', async () => {
    const runtime = new FpfRuntime({
      sourcePath,
      artifactDir,
      synthesizer: new LmStudioSynthesizer({
        baseUrl: 'http://localhost:1234/v1',
        model: 'google/gemma-4-31b',
        traceLogPath: aiTraceLogPath,
        observabilityConfig: createObservabilityConfig(),
        fetchImpl: async () =>
          new Response('server exploded', {
            status: 500,
            headers: { 'Content-Type': 'text/plain' },
          }),
      }),
    });

    const result = await runtime.query('What is U.BoundedContext?', 'compact');
    expect(result.status).toBe('degraded');
    expect(result.ids).toEqual([]);
    expect(result.candidateIds).toContain('A.1.1');
    expect(result.confidence).toBeLessThanOrEqual(0.45);
    expect(result.gaps.some((gap) => gap.includes('Local synthesis skipped'))).toBe(true);

    const traceLog = await readFile(aiTraceLogPath, 'utf8');
    expect(traceLog).toContain('"phase":"response"');
    expect(traceLog).toContain('"ok":false');

    const observabilityLog = await readFile(observabilityLogPath, 'utf8');
    expect(observabilityLog).toContain('"type": "model_generation"');
    expect(observabilityLog).toContain('"errorInfo"');
  });
});
