import { copyFile, mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

import { afterEach, beforeEach, describe, expect, it } from '@rstest/core';

import { DEFAULT_SOURCE_PATH } from '../src/core/constants.js';
import { resetRuntimeObservabilityForTests } from '../src/observability/runtime-observability.js';
import {
  DEFAULT_LM_STUDIO_BASE_URL,
  DEFAULT_LM_STUDIO_API_STYLE,
  DEFAULT_LM_STUDIO_MODEL,
  createSynthesizerFromEnv,
  LmStudioSynthesizer,
  normalizeLmStudioApiStyle,
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

  it('calls the LM Studio responses endpoint with bounded slices only', async () => {
    let requestUrl = '';
    let requestBody = '';

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
    expect(status.synthesizer.apiStyle).toBe('responses');
    expect(status.observability.configured).toBe(true);
    expect(status.observability.filePath).toBe(observabilityLogPath);
    expect(status.observability.format).toBe('flat');
    expect(status.sessionCache.enabled).toBe(true);
  });

  it('supports the legacy env-shaped synthesizer helper', () => {
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
      apiStyle: 'responses',
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
        traceLogPath: aiTraceLogPath,
        observabilityConfig: createObservabilityConfig(),
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

  it('supports the OpenAI chat_completions endpoint when api style is configured', async () => {
    let requestUrl = '';
    let requestBody: Record<string, unknown> | undefined;

    const runtime = new FpfRuntime({
      sourcePath,
      artifactDir,
      synthesizer: new LmStudioSynthesizer({
        baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai',
        model: 'gemini-3.1-flash-lite',
        apiStyle: 'chat_completions',
        fetchImpl: async (url, init) => {
          requestUrl = String(url);
          requestBody = JSON.parse(String(init?.body ?? '{}')) as Record<string, unknown>;
          return new Response(
            JSON.stringify({
              choices: [
                {
                  message: {
                    content: JSON.stringify({
                      answer: 'Gemini chat completion answer.',
                      constraints: ['Use only provided bounded slices.'],
                      confidence: 0.77,
                    }),
                  },
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

    expect(result.answer).toBe('Gemini chat completion answer.');
    expect(result.constraints).toEqual(['Use only provided bounded slices.']);
    expect(result.confidence).toBe(0.77);
    expect(requestUrl).toBe('https://generativelanguage.googleapis.com/v1beta/openai/chat/completions');
    expect(requestBody?.model).toBe('gemini-3.1-flash-lite');
    expect(requestBody?.messages).toEqual([
      expect.objectContaining({ role: 'system', content: expect.any(String) }),
      expect.objectContaining({ role: 'user', content: expect.any(String) }),
    ]);
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

  it('maps a chat_completions generation endpoint back to a models endpoint', async () => {
    const requestedUrls: string[] = [];

    const result = await runLmStudioHealthCheck({
      baseUrl: 'https://api.openai.com/v1/chat/completions',
      model: 'gpt-4o-mini',
      apiStyle: 'chat_completions',
      fetchImpl: async (url, init) => {
        requestedUrls.push(String(url));
        if ((init?.method ?? 'GET') === 'GET') {
          return new Response(
            JSON.stringify({
              data: [{ id: 'gpt-4o-mini' }],
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            },
          );
        }

        return new Response(
          JSON.stringify({
            choices: [{ message: { content: 'Health check response.' } }],
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          },
        );
      },
    });

    expect(result.endpoints.models).toBe('https://api.openai.com/v1/models');
    expect(result.endpoints.generation).toBe('https://api.openai.com/v1/chat/completions');
    expect(requestedUrls).toEqual([
      'https://api.openai.com/v1/models',
      'https://api.openai.com/v1/chat/completions',
    ]);
  });

  it('uses an explicit api key and normalizes the chat alias for health checks', async () => {
    const authHeaders: Array<string | null> = [];

    const result = await runLmStudioHealthCheck({
      baseUrl: 'http://localhost:1234',
      model: 'google/gemma-4-31b',
      apiStyle: normalizeLmStudioApiStyle('chat'),
      apiKey: 'secret-token',
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
    expect(result.ids).toContain('A.1.1');
    expect(result.gaps.some((gap) => gap.includes('Local synthesis skipped'))).toBe(true);

    const traceLog = await readFile(aiTraceLogPath, 'utf8');
    expect(traceLog).toContain('"phase":"response"');
    expect(traceLog).toContain('"ok":false');

    const observabilityLog = await readFile(observabilityLogPath, 'utf8');
    expect(observabilityLog).toContain('"type": "model_generation"');
    expect(observabilityLog).toContain('"errorInfo"');
  });

  it('posts to /v1/messages with the Anthropic Messages shape when api style is anthropic_messages', async () => {
    let requestUrl = '';
    let requestBody: Record<string, unknown> | undefined;

    const runtime = new FpfRuntime({
      sourcePath,
      artifactDir,
      synthesizer: new LmStudioSynthesizer({
        baseUrl: 'http://localhost:1234/v1',
        model: 'google/gemma-4-31b',
        apiStyle: 'anthropic_messages',
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
                    answer: 'Anthropic synthesis answer.',
                    constraints: ['Use only provided bounded slices.'],
                    confidence: 0.83,
                  }),
                },
              ],
              stop_reason: 'end_turn',
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

    expect(result.answer).toBe('Anthropic synthesis answer.');
    expect(result.constraints).toEqual(['Use only provided bounded slices.']);
    expect(result.confidence).toBe(0.83);
    expect(requestUrl).toBe('http://localhost:1234/v1/messages');
    expect(requestBody?.model).toBe('google/gemma-4-31b');
    expect(typeof requestBody?.system).toBe('string');
    expect(Array.isArray(requestBody?.messages)).toBe(true);
    const messages = requestBody?.messages as Array<{ role: string; content: string }>;
    expect(messages[0].role).toBe('user');
    expect(typeof messages[0].content).toBe('string');
    // Anthropic Messages requires max_tokens.
    expect(typeof requestBody?.max_tokens).toBe('number');
  });

  it('reports health for the anthropic_messages api style against /v1/messages + /v1/models', async () => {
    const requestedUrls: string[] = [];

    const result = await runLmStudioHealthCheck({
      baseUrl: 'http://localhost:1234/v1',
      model: 'google/gemma-4-31b',
      apiStyle: 'anthropic_messages',
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

    expect(result.apiStyle).toBe('anthropic_messages');
    expect(result.endpoints.models).toBe('http://localhost:1234/v1/models');
    expect(result.endpoints.generation).toBe('http://localhost:1234/v1/messages');
    expect(result.modelDiscovery.ok).toBe(true);
    expect(result.generation.ok).toBe(true);
    expect(result.generation.responsePreview).toContain('Health check response.');
    expect(requestedUrls).toEqual([
      'http://localhost:1234/v1/models',
      'http://localhost:1234/v1/messages',
    ]);
  });

  it('normalizes anthropic / messages aliases to anthropic_messages', () => {
    expect(normalizeLmStudioApiStyle('anthropic')).toBe('anthropic_messages');
    expect(normalizeLmStudioApiStyle('messages')).toBe('anthropic_messages');
    expect(normalizeLmStudioApiStyle('anthropic_messages')).toBe('anthropic_messages');
  });
});
