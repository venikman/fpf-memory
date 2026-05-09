import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

import { resolveLogPath } from '../../../logging/file-paths.js';
import type { ObservabilityConfig } from '../config/types.js';

const DEFAULT_LOG_FILE = 'runtime-observability.json';
const MAX_RECORDED_SPANS = 1_000;

export const RuntimeSpanType = {
  ModelGeneration: 'model_generation',
  ModelChunk: 'model_chunk',
} as const;

export type RuntimeSpanTypeValue = (typeof RuntimeSpanType)[keyof typeof RuntimeSpanType];

export interface RuntimeObservabilitySummary {
  configured: boolean;
  filePath: string;
  format: ObservabilityConfig['format'];
  includeInternalSpans: boolean;
  logLevel: ObservabilityConfig['logLevel'];
  excludeModelChunks: boolean;
}

export interface RuntimeSpanRecord {
  id: string;
  type: RuntimeSpanTypeValue;
  name: string;
  startedAt: string;
  endedAt?: string;
  durationMs?: number;
  input?: unknown;
  output?: unknown;
  attributes?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  errorInfo?: {
    message: string;
    name?: string;
    stack?: string;
  };
}

interface RuntimeObservabilityHandle extends RuntimeObservabilitySummary {
  recorder: RuntimeObservabilityRecorder;
}

class RuntimeObservabilityRecorder {
  private readonly spans: RuntimeSpanRecord[] = [];
  private writeChain = Promise.resolve();

  constructor(private readonly summary: RuntimeObservabilitySummary) {}

  startSpan(options: {
    type: RuntimeSpanTypeValue;
    name: string;
    input?: unknown;
    attributes?: Record<string, unknown>;
    metadata?: Record<string, unknown>;
  }): RuntimeSpanRecord {
    const span: RuntimeSpanRecord = {
      id: crypto.randomUUID(),
      type: options.type,
      name: options.name,
      startedAt: new Date().toISOString(),
      input: sanitizePayload(options.input),
      attributes: sanitizeRecord(options.attributes),
      metadata: sanitizeRecord(options.metadata),
    };
    this.spans.push(span);
    this.pruneSpans();
    return span;
  }

  endSpan(span: RuntimeSpanRecord, output?: unknown): void {
    const endedAt = new Date();
    span.endedAt = endedAt.toISOString();
    span.durationMs = Math.max(0, endedAt.getTime() - Date.parse(span.startedAt));
    span.output = sanitizePayload(output);
  }

  failSpan(
    span: RuntimeSpanRecord,
    error: Error,
    metadata?: Record<string, unknown>,
  ): void {
    const endedAt = new Date();
    span.endedAt = endedAt.toISOString();
    span.durationMs = Math.max(0, endedAt.getTime() - Date.parse(span.startedAt));
    span.metadata = sanitizeRecord({
      ...(span.metadata ?? {}),
      ...(metadata ?? {}),
    });
    span.errorInfo = {
      message: error.message,
      name: error.name,
      stack: error.stack,
    };
  }

  async flush(): Promise<void> {
    const writeOperation = this.writeChain.then(() =>
      mkdir(dirname(this.summary.filePath), { recursive: true })
        .then(() =>
          writeFile(
            this.summary.filePath,
            `${JSON.stringify(this.snapshot(), null, 2)}\n`,
            'utf8',
          ),
        ),
    );
    this.writeChain = writeOperation.catch(() => undefined);
    await writeOperation;
  }

  async shutdown(): Promise<void> {
    await this.flush();
  }

  private snapshot(): Record<string, unknown> {
    return {
      service: 'fpf-spec-runtime',
      format: this.summary.format,
      includeInternalSpans: this.summary.includeInternalSpans,
      logLevel: this.summary.logLevel,
      excludeModelChunks: this.summary.excludeModelChunks,
      stats: {
        spans: this.spans.length,
        errors: this.spans.filter((span) => span.errorInfo).length,
      },
      events: this.visibleSpans(),
    };
  }

  private visibleSpans(): RuntimeSpanRecord[] {
    return this.spans.filter(
      (span) =>
        !(this.summary.excludeModelChunks && span.type === RuntimeSpanType.ModelChunk),
    );
  }

  private pruneSpans(): void {
    if (this.spans.length <= MAX_RECORDED_SPANS) {
      return;
    }
    this.spans.splice(0, this.spans.length - MAX_RECORDED_SPANS);
  }
}

let cachedHandle: RuntimeObservabilityHandle | undefined;
let cachedKey: string | undefined;

export function getRuntimeObservability(
  config: ObservabilityConfig,
): RuntimeObservabilityHandle {
  const summary = resolveRuntimeObservabilitySummary(config);
  const cacheKey = JSON.stringify(summary);

  if (cachedHandle && cachedKey === cacheKey) {
    return cachedHandle;
  }

  if (cachedHandle) {
    void cachedHandle.recorder.shutdown().catch(() => undefined);
  }

  cachedHandle = {
    ...summary,
    recorder: new RuntimeObservabilityRecorder(summary),
  };
  cachedKey = cacheKey;
  return cachedHandle;
}

export function getRuntimeObservabilitySummary(
  config: ObservabilityConfig,
): RuntimeObservabilitySummary {
  return resolveRuntimeObservabilitySummary(config);
}

export async function withRuntimeSpan<TResult>(options: {
  observabilityConfig?: ObservabilityConfig;
  type: RuntimeSpanTypeValue;
  name: string;
  input?: unknown;
  attributes?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  mapOutput?: (result: TResult) => unknown;
  operation: () => Promise<TResult>;
}): Promise<TResult> {
  if (!options.observabilityConfig) {
    return options.operation();
  }

  const handle = getRuntimeObservability(options.observabilityConfig);
  const span = handle.recorder.startSpan({
    type: options.type,
    name: options.name,
    input: options.input,
    attributes: options.attributes,
    metadata: options.metadata,
  });

  try {
    const result = await options.operation();
    handle.recorder.endSpan(
      span,
      options.mapOutput ? options.mapOutput(result) : result,
    );
    return result;
  } catch (error) {
    handle.recorder.failSpan(span, toError(error), options.metadata);
    throw error;
  } finally {
    await handle.recorder.flush();
  }
}

export async function resetRuntimeObservabilityForTests(): Promise<void> {
  await cachedHandle?.recorder.shutdown().catch(() => undefined);
  cachedHandle = undefined;
  cachedKey = undefined;
}

function resolveRuntimeObservabilitySummary(
  config: ObservabilityConfig,
): RuntimeObservabilitySummary {
  return {
    configured: true,
    filePath: resolveLogPath(config.filePath, DEFAULT_LOG_FILE),
    format: config.format,
    includeInternalSpans: config.includeInternalSpans,
    logLevel: config.logLevel,
    excludeModelChunks: config.excludeModelChunks,
  };
}

function sanitizeRecord(value: Record<string, unknown> | undefined): Record<string, unknown> | undefined {
  const sanitized = sanitizePayload(value);
  return isRecord(sanitized) ? sanitized : undefined;
}

function sanitizePayload(value: unknown, depth = 0): unknown {
  if (value === undefined) {
    return undefined;
  }
  if (value === null || typeof value === 'boolean' || typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
    return value.length > 8_000 ? `${value.slice(0, 8_000)}...` : value;
  }
  if (depth >= 8) {
    return '[MaxDepth]';
  }
  if (Array.isArray(value)) {
    return value.slice(0, 24).map((item) => sanitizePayload(item, depth + 1));
  }
  if (isRecord(value)) {
    return Object.fromEntries(
      Object.entries(value)
        .slice(0, 40)
        .map(([key, entry]) => [key, sanitizePayload(entry, depth + 1)]),
    );
  }
  return String(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function toError(value: unknown): Error {
  if (value instanceof Error) {
    return value;
  }
  return new Error(typeof value === 'string' ? value : 'Unknown observability error');
}
