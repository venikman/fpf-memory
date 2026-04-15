import type { AnswerMode } from '../../../core/types.js';

export type McpSurface = 'public' | 'full';
export type LoggingLevel = 'debug' | 'info' | 'warn' | 'error';
export type ObservabilityFormat = 'flat' | 'tree' | 'normalized';
export type ObservabilityLogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export interface RuntimeCoreConfig {
  sourcePath: string;
  artifactDir: string;
  maxSessions: number;
  persistSessionCache: boolean;
}

export interface LoggingConfig {
  filePath: string;
  level: LoggingLevel;
  serviceName: string;
}

export interface ObservabilityConfig {
  filePath: string;
  format: ObservabilityFormat;
  includeInternalSpans: boolean;
  logLevel: ObservabilityLogLevel;
  excludeModelChunks: boolean;
  serviceName: string;
}

export interface LmStudioConfig {
  enabled: boolean;
  baseUrl: string;
  model: string;
  apiKey?: string;
  timeoutMs: number;
  traceLogPath: string;
}

export interface McpConfig {
  surface: McpSurface;
  defaultQueryMode: AnswerMode;
}

export interface HostedConfig {
  port: number;
  surface: McpSurface;
}

export interface DocsConfig {
  sourcePath: string;
  docsRoot: string;
  outDir: string;
}

export interface BuildConfig {
  sourcePath: string;
  runtimeArtifactDir: string;
  distDir: string;
  hostedPublicDir: string;
  docsRoot: string;
}
