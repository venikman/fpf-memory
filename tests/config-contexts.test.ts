import { describe, expect, it } from '@rstest/core';

import { DEFAULT_SOURCE_PATH } from '../src/core/constants.js';
import {
  parseBuildConfig,
  parseDocsConfig,
  parseHostedConfig,
  parseLoggingConfig,
  parseMcpConfig,
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
    expect(parseMcpConfig(env)).toEqual({
      surface: 'full',
      defaultQueryMode: 'proof',
    });
    expect(parseHostedConfig(env)).toEqual({
      port: 4112,
      surface: 'full',
      mcpDisabled: false,
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
      docsOutDir: '/tmp/fpf/doc_build',
    });
  });

  it('uses repo defaults when optional edge env is omitted', () => {
    const env = {
      PORT: '70000',
    } as NodeJS.ProcessEnv;

    expect(parseRuntimeCoreConfig({} as NodeJS.ProcessEnv)).toEqual({
      sourcePath: DEFAULT_SOURCE_PATH,
      artifactDir: '.runtime/fpf-index',
      artifactSeedDir: undefined,
      maxSessions: 50,
      persistSessionCache: false,
    });
    expect(parseMcpConfig({} as NodeJS.ProcessEnv)).toEqual({
      surface: 'public',
      defaultQueryMode: 'verbose',
    });
    expect(parseHostedConfig(env)).toEqual({
      port: 65535,
      surface: 'public',
      mcpDisabled: false,
    });
  });

  it('parses the hosted MCP emergency disable flag', () => {
    expect(parseHostedConfig({
      FPF_HOSTED_MCP_DISABLED: 'true',
    } as NodeJS.ProcessEnv)).toMatchObject({
      mcpDisabled: true,
    });
    expect(parseHostedConfig({
      FPF_HOSTED_MCP_DISABLED: 'false',
    } as NodeJS.ProcessEnv)).toMatchObject({
      mcpDisabled: false,
    });
  });

  it('keeps one-release fallbacks for legacy Mastra logging env vars', () => {
    const env = {
      FPF_MASTRA_LOG_PATH: '/tmp/fpf/logs/mastra.log',
      FPF_MASTRA_LOG_LEVEL: 'debug',
    } as NodeJS.ProcessEnv;

    expect(parseLoggingConfig(env)).toEqual({
      filePath: '/tmp/fpf/logs/mastra.log',
      level: 'debug',
      serviceName: 'fpf-spec-runtime',
    });
  });

  it('prefers runtime env vars over legacy Mastra fallbacks', () => {
    const env = {
      FPF_RUNTIME_LOG_PATH: '/tmp/fpf/logs/runtime.log',
      FPF_MASTRA_LOG_PATH: '/tmp/fpf/logs/mastra.log',
    } as NodeJS.ProcessEnv;

    expect(parseLoggingConfig(env).filePath).toBe('/tmp/fpf/logs/runtime.log');
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
