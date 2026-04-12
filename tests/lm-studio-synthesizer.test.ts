import { copyFile, mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

import { afterEach, beforeEach, describe, expect, it } from '@rstest/core';

import { resetRuntimeObservabilityForTests } from '../src/observability/runtime-observability.js';
import {
  DEFAULT_LM_STUDIO_BASE_URL,
  DEFAULT_LM_STUDIO_API_STYLE,
  DEFAULT_LM_STUDIO_MODEL,
  LmStudioSynthesizer,
  runLmStudioHealthCheck,
} from '../src/runtime/lm-studio-synthesizer.js';
import { FpfRuntime } from '../src/runtime/runtime.js';

describe('LmStudioSynthesizer', () => {
  const canonicalSourcePath = resolve(process.cwd(), 'FPF-spec.md');
  let tempRoot: string;
  let sourcePath: string;
  let artifactDir: string;
  let aiTraceLogPath: string;
  let observabilityLogPath: string;

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

  it('calls the LM Studio responses endpoint with bounded slices only', async () => {
    let requestUrl = '';
    let requestBody = '';

    const runtime = new FpfRuntime({
      sourcePath,
      artifactDir,
      synthesizer: new LmStudioSynthesizer({
        baseUrl: 'http://localhost:1234/v1',
        model: 'google/gemma-4-31b',
        env: {
          FPF_AI_TRACE_LOG_PATH: aiTraceLogPath,
          FPF_MASTRA_OBSERVABILITY_PATH: observabilityLogPath,
        },
        fetchImpl: async (url, init) => {
          requestUrl = String(url);
          requestBody = String(init?.body ?? '');
          return new Response(
            JSON.stringify({
              output_text: JSON.stringify({
                answer: 'Local synthesis answer.',
                constraints: ['Use only provided bounded slices.'],
                confidence: 0.78,
                gaps: [],
                groundingChain: ['Used the bounded slice set only.'],
              }),
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            },
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

    expect(requestUrl).toBe('http://localhost:1234/v1/responses');
    expect(requestBody).toContain('"model":"google/gemma-4-31b"');
    expect(requestBody).toContain('A.1.1');
    expect(requestBody).toContain('Retrieval summary:');
    expect(requestBody).toContain('Frontier:');
    expect(requestBody.length).toBeLessThan(sourceText.length / 5);

    const traceLog = await readFile(aiTraceLogPath, 'utf8');
    expect(traceLog).toContain('"phase":"request"');
    expect(traceLog).toContain('"phase":"response"');
    expect(traceLog).toContain('"question":"What is U.BoundedContext?"');

    const observabilityLog = await readFile(observabilityLogPath, 'utf8');
    expect(observabilityLog).toContain('"type": "model_generation"');
    expect(observabilityLog).toContain('"provider": "lm_studio"');
    expect(observabilityLog).toContain('"model": "google/gemma-4-31b"');
  });

  it('auto-configures the local synthesizer from environment for status visibility', async () => {
    process.env.FPF_LOCAL_LLM_BASE_URL = 'http://localhost:1234/v1';
    process.env.FPF_LOCAL_LLM_MODEL = 'google/gemma-4-31b';
    process.env.FPF_MASTRA_OBSERVABILITY_PATH = observabilityLogPath;

    const runtime = new FpfRuntime({
      sourcePath,
      artifactDir,
    });

    const status = await runtime.status();
    expect(status.synthesizer.configured).toBe(true);
    expect(status.synthesizer.provider).toBe('lm_studio');
    expect(status.synthesizer.model).toBe('google/gemma-4-31b');
    expect(status.synthesizer.baseUrl).toBe('http://localhost:1234/v1');
    expect(status.synthesizer.apiStyle).toBe('responses');
    expect(status.observability.configured).toBe(true);
    expect(status.observability.filePath).toBe(observabilityLogPath);
    expect(status.observability.format).toBe('flat');
    expect(status.sessionCache.enabled).toBe(true);
  });

  it('fills missing LM Studio env fields from repo defaults after opt-in', async () => {
    process.env.FPF_LOCAL_LLM_MODEL = DEFAULT_LM_STUDIO_MODEL;

    const runtime = new FpfRuntime({
      sourcePath,
      artifactDir,
    });

    const status = await runtime.status();
    expect(status.synthesizer.configured).toBe(true);
    expect(status.synthesizer.provider).toBe('lm_studio');
    expect(status.synthesizer.model).toBe(DEFAULT_LM_STUDIO_MODEL);
    expect(status.synthesizer.baseUrl).toBe(DEFAULT_LM_STUDIO_BASE_URL);
    expect(status.synthesizer.apiStyle).toBe(DEFAULT_LM_STUDIO_API_STYLE);
  });

  it('supports the LM Studio native chat endpoint when api style is configured', async () => {
    let requestUrl = '';
    let requestBody = '';

    const runtime = new FpfRuntime({
      sourcePath,
      artifactDir,
      synthesizer: new LmStudioSynthesizer({
        baseUrl: 'http://localhost:1234',
        model: 'google/gemma-4-31b',
        apiStyle: 'lmstudio_chat',
        env: {
          FPF_AI_TRACE_LOG_PATH: aiTraceLogPath,
          FPF_MASTRA_OBSERVABILITY_PATH: observabilityLogPath,
        },
        fetchImpl: async (url, init) => {
          requestUrl = String(url);
          requestBody = String(init?.body ?? '');
          return new Response(
            JSON.stringify({
              output: [
                {
                  type: 'reasoning',
                  content: 'internal',
                },
                {
                  type: 'message',
                  content: JSON.stringify({
                    answer: 'Chat-style synthesis answer.',
                    constraints: ['Use only provided bounded slices.'],
                    confidence: 0.61,
                  }),
                },
              ],
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            },
          );
        },
      }),
    });

    const result = await runtime.query('What is U.BoundedContext?', 'compact');

    expect(result.answer).toBe('Chat-style synthesis answer.');
    expect(result.constraints).toEqual(['Use only provided bounded slices.']);
    expect(result.confidence).toBe(0.61);
    expect(requestUrl).toBe('http://localhost:1234/api/v1/chat');
    expect(requestBody).toContain('"model":"google/gemma-4-31b"');
    expect(requestBody).toContain('"system_prompt"');
    expect(requestBody).toContain('"input"');
  });

  it('reports model-list and generation health for the configured api style', async () => {
    let requestedUrls: string[] = [];

    const result = await runLmStudioHealthCheck({
      baseUrl: 'http://localhost:1234',
      model: 'google/gemma-4-31b',
      apiStyle: 'lmstudio_chat',
      timeoutMs: 1234,
      fetchImpl: async (url, init) => {
        requestedUrls = [...requestedUrls, String(url)];
        if ((init?.method ?? 'GET') === 'GET') {
          return new Response(
            JSON.stringify({
              models: [{ key: 'google/gemma-4-31b' }],
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            },
          );
        }

        return new Response(
          JSON.stringify({
            output: [
              {
                type: 'message',
                content: 'Health check response.',
              },
            ],
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          },
        );
      },
    });

    expect(result.apiStyle).toBe('lmstudio_chat');
    expect(result.timeoutMs).toBe(1234);
    expect(result.endpoints.models).toBe('http://localhost:1234/api/v1/models');
    expect(result.endpoints.generation).toBe('http://localhost:1234/api/v1/chat');
    expect(result.modelDiscovery.ok).toBe(true);
    expect(result.modelDiscovery.listed).toBe(true);
    expect(result.generation.ok).toBe(true);
    expect(result.generation.responsePreview).toContain('Health check response.');
    expect(requestedUrls).toEqual([
      'http://localhost:1234/api/v1/models',
      'http://localhost:1234/api/v1/chat',
    ]);
  });

  it('maps a /v1/responses base URL back to /v1/models for discovery', async () => {
    const requestedUrls: string[] = [];

    const result = await runLmStudioHealthCheck({
      baseUrl: 'http://localhost:1234/v1/responses',
      model: 'google/gemma-4-31b',
      apiStyle: 'responses',
      fetchImpl: async (url, init) => {
        requestedUrls.push(String(url));
        if ((init?.method ?? 'GET') === 'GET') {
          return new Response(
            JSON.stringify({
              data: [{ id: 'google/gemma-4-31b' }],
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            },
          );
        }

        return new Response(
          JSON.stringify({
            output_text: 'Health check response.',
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          },
        );
      },
    });

    expect(result.endpoints.models).toBe('http://localhost:1234/v1/models');
    expect(requestedUrls).toEqual([
      'http://localhost:1234/v1/models',
      'http://localhost:1234/v1/responses',
    ]);
  });

  it('uses env api key and normalizes the chat alias for health checks', async () => {
    const authHeaders: Array<string | null> = [];

    const result = await runLmStudioHealthCheck({
      env: {
        FPF_LOCAL_LLM_BASE_URL: 'http://localhost:1234',
        FPF_LOCAL_LLM_MODEL: 'google/gemma-4-31b',
        FPF_LOCAL_LLM_API_STYLE: 'chat',
        FPF_LOCAL_LLM_API_KEY: 'secret-token',
      },
      fetchImpl: async (_url, init) => {
        authHeaders.push(new Headers(init?.headers).get('Authorization'));
        if ((init?.method ?? 'GET') === 'GET') {
          return new Response(
            JSON.stringify({
              models: [{ key: 'google/gemma-4-31b' }],
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            },
          );
        }

        return new Response(
          JSON.stringify({
            output: [{ type: 'message', content: 'Health check response.' }],
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          },
        );
      },
    });

    expect(result.apiStyle).toBe('lmstudio_chat');
    expect(result.endpoints.models).toBe('http://localhost:1234/api/v1/models');
    expect(result.endpoints.generation).toBe('http://localhost:1234/api/v1/chat');
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
            output_text: 'Health check response.',
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          },
        );
      },
    });

    expect(result.modelDiscovery.ok).toBe(false);
    expect(result.modelDiscovery.listed).toBe(false);
    expect(result.modelDiscovery.modelCount).toBe(0);
    expect(result.modelDiscovery.error).toContain('boom:http://localhost:1234/v1/models');
  });

  it('falls back deterministically when LM Studio returns an error', async () => {
    const runtime = new FpfRuntime({
      sourcePath,
      artifactDir,
      synthesizer: new LmStudioSynthesizer({
        baseUrl: 'http://localhost:1234/v1',
        model: 'google/gemma-4-31b',
        env: {
          FPF_AI_TRACE_LOG_PATH: aiTraceLogPath,
          FPF_MASTRA_OBSERVABILITY_PATH: observabilityLogPath,
        },
        fetchImpl: async () =>
          new Response('server exploded', {
            status: 500,
            headers: { 'Content-Type': 'text/plain' },
          }),
      }),
    });

    const result = await runtime.query('What is U.BoundedContext?', 'compact');
    expect(result.ids).toContain('A.1.1');
    expect(result.gaps.some((gap) => gap.includes('Local synthesis skipped'))).toBe(true);

    const traceLog = await readFile(aiTraceLogPath, 'utf8');
    expect(traceLog).toContain('"phase":"response"');
    expect(traceLog).toContain('"ok":false');

    const observabilityLog = await readFile(observabilityLogPath, 'utf8');
    expect(observabilityLog).toContain('"type": "model_generation"');
    expect(observabilityLog).toContain('"errorInfo"');
  });
});
