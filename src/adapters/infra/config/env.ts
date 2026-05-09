import { z } from 'zod';

import type { AnswerMode } from '../../../core/types.js';
import {
  DEFAULT_ARTIFACT_DIR,
  DEFAULT_SOURCE_PATH,
} from '../../../core/constants.js';
import type {
  BuildConfig,
  DocsConfig,
  HostedConfig,
  LmStudioConfig,
  LoggingConfig,
  McpConfig,
  McpSurface,
  ObservabilityConfig,
  RuntimeCoreConfig,
} from './types.js';

const DEFAULT_DOCS_ROOT = 'docs';
const DEFAULT_DOCS_OUT_DIR = 'doc_build';
const DEFAULT_HOSTED_PUBLIC_DIR = '.vercel-staged';
const DEFAULT_DIST_DIR = 'dist';
const DEFAULT_SERVER_PORT = 4111;
const MAX_TCP_PORT = 65_535;
const DEFAULT_MAX_SESSIONS = 50;
const DEFAULT_LM_STUDIO_BASE_URL = 'http://localhost:1234/v1';
const DEFAULT_LM_STUDIO_MODEL = 'google/gemma-4-31b';
const DEFAULT_LM_STUDIO_TIMEOUT_MS = 20_000;

const answerModeSchema = z.enum(['compact', 'verbose', 'proof']);
const mcpSurfaceSchema = z.enum(['public', 'full']);
const loggingLevelSchema = z.enum(['debug', 'info', 'warn', 'error']);
const observabilityFormatSchema = z.enum(['flat', 'tree', 'normalized']);
const observabilityLogLevelSchema = z.enum(['debug', 'info', 'warn', 'error', 'fatal']);

export function parseRuntimeCoreConfig(
  env: NodeJS.ProcessEnv,
): RuntimeCoreConfig {
  return {
    sourcePath: parseString(env.FPF_SPEC_SOURCE_PATH, DEFAULT_SOURCE_PATH),
    artifactDir: parseString(env.FPF_RUNTIME_ARTIFACT_DIR, DEFAULT_ARTIFACT_DIR),
    artifactSeedDir: normalizeOptionalString(env.FPF_RUNTIME_ARTIFACT_SEED_DIR),
    maxSessions: parsePositiveInteger(env.FPF_RUNTIME_MAX_SESSIONS, DEFAULT_MAX_SESSIONS),
    persistSessionCache: parseBoolean(env.FPF_PERSIST_SESSION_CACHE, false),
  };
}

export function parseLoggingConfig(env: NodeJS.ProcessEnv): LoggingConfig {
  return {
    filePath: parseStringWithLegacy(
      env,
      'FPF_RUNTIME_LOG_PATH',
      'FPF_MASTRA_LOG_PATH',
      '.runtime/logs/fpf-runtime.log',
    ),
    level: parseEnumWithLegacy(
      env,
      'FPF_RUNTIME_LOG_LEVEL',
      'FPF_MASTRA_LOG_LEVEL',
      loggingLevelSchema,
      'info',
    ),
    serviceName: 'fpf-spec-runtime',
  };
}

export function parseObservabilityConfig(
  env: NodeJS.ProcessEnv,
): ObservabilityConfig {
  return {
    filePath: parseStringWithLegacy(
      env,
      'FPF_RUNTIME_OBSERVABILITY_PATH',
      'FPF_MASTRA_OBSERVABILITY_PATH',
      '.runtime/logs/runtime-observability.json',
    ),
    format: parseEnumWithLegacy(
      env,
      'FPF_RUNTIME_OBSERVABILITY_FORMAT',
      'FPF_MASTRA_OBSERVABILITY_FORMAT',
      observabilityFormatSchema,
      'flat',
    ),
    includeInternalSpans: parseBooleanWithLegacy(
      env,
      'FPF_RUNTIME_OBSERVABILITY_INCLUDE_INTERNAL_SPANS',
      'FPF_MASTRA_OBSERVABILITY_INCLUDE_INTERNAL_SPANS',
      true,
    ),
    logLevel: parseEnumWithLegacy(
      env,
      'FPF_RUNTIME_OBSERVABILITY_LOG_LEVEL',
      'FPF_MASTRA_OBSERVABILITY_LOG_LEVEL',
      observabilityLogLevelSchema,
      'info',
    ),
    excludeModelChunks: !parseBooleanWithLegacy(
      env,
      'FPF_RUNTIME_OBSERVABILITY_INCLUDE_MODEL_CHUNKS',
      'FPF_MASTRA_OBSERVABILITY_INCLUDE_MODEL_CHUNKS',
      false,
    ),
    serviceName: 'fpf-spec-runtime',
  };
}

export function parseLmStudioConfig(env: NodeJS.ProcessEnv): LmStudioConfig {
  const configuredBaseUrl = normalizeOptionalString(env.FPF_LOCAL_LLM_BASE_URL);
  const configuredModel = normalizeOptionalString(env.FPF_LOCAL_LLM_MODEL);
  const enabled = Boolean(configuredBaseUrl || configuredModel);
  const baseUrl = configuredBaseUrl ?? DEFAULT_LM_STUDIO_BASE_URL;
  const model = configuredModel ?? DEFAULT_LM_STUDIO_MODEL;

  return {
    enabled,
    baseUrl,
    model,
    apiKey: normalizeOptionalString(env.FPF_LOCAL_LLM_API_KEY),
    timeoutMs: parsePositiveInteger(
      env.FPF_LOCAL_LLM_TIMEOUT_MS,
      DEFAULT_LM_STUDIO_TIMEOUT_MS,
    ),
    traceLogPath: parseString(env.FPF_AI_TRACE_LOG_PATH, '.runtime/logs/ai-traces.jsonl'),
  };
}

export function parseMcpConfig(env: NodeJS.ProcessEnv): McpConfig {
  return {
    surface: parseMcpSurface(env.FPF_MCP_SURFACE),
    defaultQueryMode: parseAnswerMode(env.FPF_QUERY_DEFAULT_MODE),
  };
}

export function parseHostedConfig(env: NodeJS.ProcessEnv): HostedConfig {
  return {
    port: parsePort(env.PORT),
    surface: parseMcpSurface(env.FPF_MCP_SURFACE),
  };
}

export function parseDocsConfig(env: NodeJS.ProcessEnv): DocsConfig {
  return {
    sourcePath: parseString(env.FPF_SPEC_SOURCE_PATH, DEFAULT_SOURCE_PATH),
    docsRoot: parseString(env.FPF_DOCS_ROOT, DEFAULT_DOCS_ROOT),
    outDir: parseString(env.FPF_DOCS_OUT_DIR, DEFAULT_DOCS_OUT_DIR),
  };
}

export function parseBuildConfig(env: NodeJS.ProcessEnv): BuildConfig {
  return {
    sourcePath: parseString(env.FPF_SPEC_SOURCE_PATH, DEFAULT_SOURCE_PATH),
    runtimeArtifactDir: parseString(env.FPF_RUNTIME_ARTIFACT_DIR, DEFAULT_ARTIFACT_DIR),
    distDir: parseString(env.FPF_DIST_DIR, DEFAULT_DIST_DIR),
    hostedPublicDir: parseString(env.FPF_HOSTED_PUBLIC_DIR, DEFAULT_HOSTED_PUBLIC_DIR),
    docsRoot: parseString(env.FPF_DOCS_ROOT, DEFAULT_DOCS_ROOT),
  };
}

export function parseAnswerMode(value: string | undefined): AnswerMode {
  return parseEnum(value, answerModeSchema, 'verbose');
}

export function parseMcpSurface(value: string | undefined): McpSurface {
  return parseEnum(value, mcpSurfaceSchema, 'public');
}

function parseString(value: string | undefined, fallback: string): string {
  return normalizeOptionalString(value) ?? fallback;
}

function parseStringWithLegacy(
  env: NodeJS.ProcessEnv,
  currentName: string,
  legacyName: string,
  fallback: string,
): string {
  return normalizeOptionalString(env[currentName])
    ?? readLegacyEnv(env, currentName, legacyName)
    ?? fallback;
}

function normalizeOptionalString(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function parseBoolean(value: string | undefined, fallback: boolean): boolean {
  switch (normalizeOptionalString(value)?.toLowerCase()) {
    case '1':
    case 'true':
    case 'yes':
    case 'on':
      return true;
    case '0':
    case 'false':
    case 'no':
    case 'off':
      return false;
    default:
      return fallback;
  }
}

function parseBooleanWithLegacy(
  env: NodeJS.ProcessEnv,
  currentName: string,
  legacyName: string,
  fallback: boolean,
): boolean {
  return parseBoolean(
    normalizeOptionalString(env[currentName])
      ?? readLegacyEnv(env, currentName, legacyName),
    fallback,
  );
}

function parsePositiveInteger(value: string | undefined, fallback: number): number {
  const parsed = Number(normalizeOptionalString(value) ?? `${fallback}`);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function parsePort(value: string | undefined): number {
  const parsed = Number(normalizeOptionalString(value));
  if (!Number.isInteger(parsed) || parsed < 0) {
    return DEFAULT_SERVER_PORT;
  }
  return Math.min(MAX_TCP_PORT, parsed);
}

function parseEnum<TValue extends string>(
  value: string | undefined,
  schema: z.ZodType<TValue>,
  fallback: TValue,
): TValue {
  const normalized = normalizeOptionalString(value);
  const parsed = normalized ? schema.safeParse(normalized.toLowerCase()) : undefined;
  return parsed?.success ? parsed.data : fallback;
}

function parseEnumWithLegacy<TValue extends string>(
  env: NodeJS.ProcessEnv,
  currentName: string,
  legacyName: string,
  schema: z.ZodType<TValue>,
  fallback: TValue,
): TValue {
  return parseEnum(
    normalizeOptionalString(env[currentName])
      ?? readLegacyEnv(env, currentName, legacyName),
    schema,
    fallback,
  );
}

const warnedLegacyEnvNames = new Set<string>();

function readLegacyEnv(
  env: NodeJS.ProcessEnv,
  currentName: string,
  legacyName: string,
): string | undefined {
  const legacyValue = normalizeOptionalString(env[legacyName]);
  if (!legacyValue) {
    return undefined;
  }
  if (!warnedLegacyEnvNames.has(legacyName)) {
    warnedLegacyEnvNames.add(legacyName);
    process.stderr.write(
      `${legacyName} is deprecated; use ${currentName} instead.\n`,
    );
  }
  return legacyValue;
}
