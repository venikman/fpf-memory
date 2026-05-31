import type { AnswerMode } from '../../../core/types.js';

export type McpSurface = 'public' | 'full';
export type LoggingLevel = 'debug' | 'info' | 'warn' | 'error';

export interface RuntimeCoreConfig {
  sourcePath: string;
  artifactDir: string;
  artifactSeedDir?: string;
  maxSessions: number;
  persistSessionCache: boolean;
}

export interface LoggingConfig {
  filePath: string;
  level: LoggingLevel;
  serviceName: string;
}

export interface McpConfig {
  surface: McpSurface;
  defaultQueryMode: AnswerMode;
}

export interface HostedConfig {
  port: number;
  surface: McpSurface;
  mcpDisabled: boolean;
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
  docsOutDir: string;
}
