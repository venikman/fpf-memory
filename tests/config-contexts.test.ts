import { describe, expect, it } from '@rstest/core';

import { DEFAULT_SOURCE_PATH } from '../src/core/constants.js';
import {
  parseBuildConfig,
  parseDocsConfig,
  parseHostedConfig,
  parseLmStudioConfig,
  parseLoggingConfig,
  parseMcpConfig,
  parseObservabilityConfig,
  parseRuntimeCoreConfig,
} from '../src/adapters/infra/config/env.js';

describe('context config parsing', () => {
  it('parses explicit edge config by context', () => {
    const env = {
      FPF_SPEC_SOURCE_PATH: '/tmp/fpf/FPF-spec.md',
      FPF_RUNTIME_ARTIFACT_DIR: '/tmp/fpf/.runtime/fpf-index',
      FPF_RUNTIME_ARTIFACT_SEED_DIR: '/tmp/fpf/hosted/fpf-index',
      FPF_RUNTIME_MAX_SESSIONS: '12',
      FPF_PERSIST_SESSION_CACHE: 'true',
      FPF_RUNTIME_LOG_PATH: '/tmp/fpf/logs/fpf-runtime.log',
      FPF_RUNTIME_LOG_LEVEL: 'warn',
      FPF_RUNTIME_OBSERVABILITY_PATH: '/tmp/fpf/logs/observability.json',
      FPF_RUNTIME_OBSERVABILITY_FORMAT: 'tree',
      FPF_RUNTIME_OBSERVABILITY_INCLUDE_INTERNAL_SPANS: 'false',
      FPF_RUNTIME_OBSERVABILITY_INCLUDE_MODEL_CHUNKS: 'true',
      FPF_RUNTIME_OBSERVABILITY_LOG_LEVEL: 'error',
      FPF_LOCAL_LLM_BASE_URL: 'http://localhost:1234',
      FPF_LOCAL_LLM_MODEL: 'google/gemma-4-31b',
      FPF_LOCAL_LLM_API_KEY: 'secret-token',
      FPF_LOCAL_LLM_TIMEOUT_MS: '45000',
      FPF_AI_TRACE_LOG_PATH: '/tmp/fpf/logs/ai-traces.jsonl',
      FPF_QUERY_DEFAULT_MODE: 'proof',
      FPF_MCP_SURFACE: 'full',
      PORT: '4112',
      FPF_DOCS_ROOT: '/tmp/fpf/docs',
      FPF_DOCS_OUT_DIR: '/tmp/fpf/doc_build',
      FPF_DIST_DIR: '/tmp/fpf/dist',
      FPF_HOSTED_PUBLIC_DIR: '/tmp/fpf/public',
    } as NodeJS.ProcessEnv;

    expect(parseRuntimeCoreConfig(env)).toEqual({
      sourcePath: '/tmp/fpf/FPF-spec.md',
      artifactDir: '/tmp/fpf/.runtime/fpf-index',
      artifactSeedDir: '/tmp/fpf/hosted/fpf-index',
      maxSessions: 12,
      persistSessionCache: true,
    });
    expect(parseLoggingConfig(env)).toEqual({
      filePath: '/tmp/fpf/logs/fpf-runtime.log',
      level: 'warn',
      serviceName: 'fpf-spec-runtime',
    });
    expect(parseObservabilityConfig(env)).toEqual({
      filePath: '/tmp/fpf/logs/observability.json',
      format: 'tree',
      includeInternalSpans: false,
      logLevel: 'error',
      excludeModelChunks: false,
      serviceName: 'fpf-spec-runtime',
    });
    expect(parseLmStudioConfig(env)).toEqual({
      enabled: true,
      baseUrl: 'http://localhost:1234',
      model: 'google/gemma-4-31b',
      apiKey: 'secret-token',
      timeoutMs: 45000,
      traceLogPath: '/tmp/fpf/logs/ai-traces.jsonl',
    });
    expect(parseMcpConfig(env)).toEqual({
      surface: 'full',
      defaultQueryMode: 'proof',
    });
    expect(parseHostedConfig(env)).toEqual({
      port: 4112,
      surface: 'full',
    });
    expect(parseDocsConfig(env)).toEqual({
      sourcePath: '/tmp/fpf/FPF-spec.md',
      docsRoot: '/tmp/fpf/docs',
      outDir: '/tmp/fpf/doc_build',
    });
    expect(parseBuildConfig(env)).toEqual({
      sourcePath: '/tmp/fpf/FPF-spec.md',
      runtimeArtifactDir: '/tmp/fpf/.runtime/fpf-index',
      distDir: '/tmp/fpf/dist',
      hostedPublicDir: '/tmp/fpf/public',
      docsRoot: '/tmp/fpf/docs',
    });
  });

  it('uses repo defaults when LM Studio env is partial at the edge', () => {
    const env = {
      FPF_LOCAL_LLM_MODEL: 'google/gemma-4-31b',
      PORT: '70000',
    } as NodeJS.ProcessEnv;

    expect(parseRuntimeCoreConfig({} as NodeJS.ProcessEnv)).toEqual({
      sourcePath: DEFAULT_SOURCE_PATH,
      artifactDir: '.runtime/fpf-index',
      artifactSeedDir: undefined,
      maxSessions: 50,
      persistSessionCache: false,
    });
    expect(parseLmStudioConfig(env)).toEqual({
      enabled: true,
      baseUrl: 'http://localhost:1234/v1',
      model: 'google/gemma-4-31b',
      apiKey: undefined,
      timeoutMs: 20000,
      traceLogPath: '.runtime/logs/ai-traces.jsonl',
    });
    expect(parseMcpConfig({} as NodeJS.ProcessEnv)).toEqual({
      surface: 'public',
      defaultQueryMode: 'verbose',
    });
    expect(parseHostedConfig(env)).toEqual({
      port: 65535,
      surface: 'public',
    });
  });

  it('keeps one-release fallbacks for legacy Mastra observability env vars', () => {
    const env = {
      FPF_MASTRA_LOG_PATH: '/tmp/fpf/logs/mastra.log',
      FPF_MASTRA_LOG_LEVEL: 'debug',
      FPF_MASTRA_OBSERVABILITY_PATH: '/tmp/fpf/logs/mastra-observability.json',
      FPF_MASTRA_OBSERVABILITY_FORMAT: 'normalized',
      FPF_MASTRA_OBSERVABILITY_INCLUDE_INTERNAL_SPANS: 'false',
      FPF_MASTRA_OBSERVABILITY_INCLUDE_MODEL_CHUNKS: 'true',
      FPF_MASTRA_OBSERVABILITY_LOG_LEVEL: 'error',
    } as NodeJS.ProcessEnv;

    expect(parseLoggingConfig(env)).toEqual({
      filePath: '/tmp/fpf/logs/mastra.log',
      level: 'debug',
      serviceName: 'fpf-spec-runtime',
    });
    expect(parseObservabilityConfig(env)).toEqual({
      filePath: '/tmp/fpf/logs/mastra-observability.json',
      format: 'normalized',
      includeInternalSpans: false,
      logLevel: 'error',
      excludeModelChunks: false,
      serviceName: 'fpf-spec-runtime',
    });
  });

  it('prefers runtime env vars over legacy Mastra fallbacks', () => {
    const env = {
      FPF_RUNTIME_LOG_PATH: '/tmp/fpf/logs/runtime.log',
      FPF_MASTRA_LOG_PATH: '/tmp/fpf/logs/mastra.log',
      FPF_RUNTIME_OBSERVABILITY_PATH: '/tmp/fpf/logs/runtime-observability.json',
      FPF_MASTRA_OBSERVABILITY_PATH: '/tmp/fpf/logs/mastra-observability.json',
    } as NodeJS.ProcessEnv;

    expect(parseLoggingConfig(env).filePath).toBe('/tmp/fpf/logs/runtime.log');
    expect(parseObservabilityConfig(env).filePath).toBe(
      '/tmp/fpf/logs/runtime-observability.json',
    );
  });

  it('ignores GEMINI_AI_API_KEY — runtime only speaks Anthropic Messages', () => {
    const env = {
      FPF_LOCAL_LLM_BASE_URL: 'https://generativelanguage.googleapis.com/v1beta',
      FPF_LOCAL_LLM_MODEL: 'gemini-pro',
      GEMINI_AI_API_KEY: 'gemini-secret',
    } as NodeJS.ProcessEnv;
    expect(parseLmStudioConfig(env).apiKey).toBeUndefined();
  });
});

describe('parseHostedConfig PORT handling', () => {
  const portFor = (value: string | undefined): number =>
    parseHostedConfig({ PORT: value } as NodeJS.ProcessEnv).port;

  it('defaults to 4111 when PORT is missing, blank, or invalid', () => {
    expect(parseHostedConfig({} as NodeJS.ProcessEnv).port).toBe(4111);
    expect(portFor('')).toBe(4111);
    expect(portFor('   ')).toBe(4111);
    expect(portFor('nope')).toBe(4111);
    expect(portFor('-1')).toBe(4111);
    expect(portFor('3.5')).toBe(4111);
  });

  it('preserves port zero, accepts in-range ports, and clamps oversized ports', () => {
    expect(portFor('0')).toBe(0);
    expect(portFor('4111')).toBe(4111);
    expect(portFor('8080')).toBe(8080);
    expect(portFor('70000')).toBe(65535);
  });
});
