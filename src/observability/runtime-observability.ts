import {
  SpanType,
  type FeedbackEvent,
  type LogEvent,
  type MetricEvent,
  type ScoreEvent,
  type SpanTypeMap,
  type TracingEvent,
} from '@mastra/core/observability';
import { Observability, TestExporter } from '@mastra/observability';

import { resolveLogPath } from '../logging/file-paths.js';

type ObservabilityFileFormat = 'flat' | 'tree' | 'normalized';
type ObservabilityLogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

const DEFAULT_LOG_FILE = 'mastra-observability.json';

interface PersistedExporterOptions {
  filePath: string;
  format: ObservabilityFileFormat;
}

export interface RuntimeObservabilitySummary {
  configured: boolean;
  filePath: string;
  format: ObservabilityFileFormat;
  includeInternalSpans: boolean;
  logLevel: ObservabilityLogLevel;
  excludeModelChunks: boolean;
}

interface RuntimeObservabilityHandle extends RuntimeObservabilitySummary {
  observability: Observability;
}

class PersistedTestExporter extends TestExporter {
  readonly name = 'persisted-test-exporter';
  private writeChain = Promise.resolve();

  constructor(private readonly options: PersistedExporterOptions) {
    super({
      jsonIndent: 2,
      logLevel: 'error',
      logMetricsOnFlush: false,
      storeLogs: true,
      validateLifecycle: true,
    });
  }

  protected override async _exportTracingEvent(event: TracingEvent): Promise<void> {
    await super._exportTracingEvent(event);
    await this.persist();
  }

  override async onLogEvent(event: LogEvent): Promise<void> {
    await super.onLogEvent(event);
    await this.persist();
  }

  override async onMetricEvent(event: MetricEvent): Promise<void> {
    await super.onMetricEvent(event);
    await this.persist();
  }

  override async onScoreEvent(event: ScoreEvent): Promise<void> {
    await super.onScoreEvent(event);
    await this.persist();
  }

  override async onFeedbackEvent(event: FeedbackEvent): Promise<void> {
    await super.onFeedbackEvent(event);
    await this.persist();
  }

  override async flush(): Promise<void> {
    await super.flush();
    await this.persist();
  }

  override async shutdown(): Promise<void> {
    await this.flush();
    await super.shutdown();
  }

  private async persist(): Promise<void> {
    const writeOperation = this.writeChain.then(() =>
      this.writeToFile(this.options.filePath, {
        indent: 2,
        includeEvents: true,
        includeStats: true,
        format: this.options.format,
      }),
    );
    this.writeChain = writeOperation.catch(() => undefined);
    await writeOperation;
  }
}

let cachedHandle: RuntimeObservabilityHandle | undefined;
let cachedKey: string | undefined;

export function getRuntimeObservability(
  env: NodeJS.ProcessEnv = process.env,
): RuntimeObservabilityHandle {
  const summary = resolveRuntimeObservabilitySummary(env);
  const cacheKey = JSON.stringify(summary);

  if (cachedHandle && cachedKey === cacheKey) {
    return cachedHandle;
  }

  if (cachedHandle) {
    void cachedHandle.observability.shutdown().catch(() => undefined);
  }

  const exporter = new PersistedTestExporter({
    filePath: summary.filePath,
    format: summary.format,
  });
  const observability = new Observability({
    configs: {
      default: {
        serviceName: 'fpf-spec-runtime',
        exporters: [exporter],
        includeInternalSpans: summary.includeInternalSpans,
        excludeSpanTypes: summary.excludeModelChunks ? [SpanType.MODEL_CHUNK] : [],
        logging: {
          enabled: true,
          level: summary.logLevel,
        },
        serializationOptions: {
          maxStringLength: 8_000,
          maxDepth: 8,
          maxArrayLength: 24,
          maxObjectKeys: 40,
        },
      },
    },
  });

  cachedHandle = {
    ...summary,
    observability,
  };
  cachedKey = cacheKey;
  return cachedHandle;
}

export function getRuntimeObservabilitySummary(
  env: NodeJS.ProcessEnv = process.env,
): RuntimeObservabilitySummary {
  return resolveRuntimeObservabilitySummary(env);
}

export async function withRuntimeSpan<TType extends SpanType, TResult>(options: {
  env?: NodeJS.ProcessEnv;
  type: TType;
  name: string;
  input?: unknown;
  attributes?: SpanTypeMap[TType];
  metadata?: Record<string, unknown>;
  mapOutput?: (result: TResult) => unknown;
  operation: () => Promise<TResult>;
}): Promise<TResult> {
  const handle = getRuntimeObservability(options.env);
  const instance = handle.observability.getDefaultInstance();
  if (!instance) {
    return options.operation();
  }

  const span = instance.startSpan({
    type: options.type,
    name: options.name,
    input: options.input,
    attributes: options.attributes,
    metadata: options.metadata,
  });

  try {
    const result = await options.operation();
    span.end({
      output: options.mapOutput ? options.mapOutput(result) : result,
    });
    return result;
  } catch (error) {
    span.error({
      error: toError(error),
      endSpan: true,
      metadata: options.metadata,
    });
    throw error;
  } finally {
    await instance.flush();
  }
}

export async function resetRuntimeObservabilityForTests(): Promise<void> {
  await cachedHandle?.observability.shutdown().catch(() => undefined);
  cachedHandle = undefined;
  cachedKey = undefined;
}

function resolveRuntimeObservabilitySummary(
  env: NodeJS.ProcessEnv,
): RuntimeObservabilitySummary {
  return {
    configured: true,
    filePath: resolveLogPath(env.FPF_MASTRA_OBSERVABILITY_PATH, DEFAULT_LOG_FILE),
    format: normalizeFormat(env.FPF_MASTRA_OBSERVABILITY_FORMAT),
    includeInternalSpans: parseBoolean(env.FPF_MASTRA_OBSERVABILITY_INCLUDE_INTERNAL_SPANS, true),
    logLevel: normalizeLogLevel(env.FPF_MASTRA_OBSERVABILITY_LOG_LEVEL),
    excludeModelChunks: !parseBoolean(
      env.FPF_MASTRA_OBSERVABILITY_INCLUDE_MODEL_CHUNKS,
      false,
    ),
  };
}

function normalizeFormat(value: string | undefined): ObservabilityFileFormat {
  switch (value?.trim().toLowerCase()) {
    case 'tree':
    case 'normalized':
      return value.trim().toLowerCase() as ObservabilityFileFormat;
    default:
      return 'flat';
  }
}

function normalizeLogLevel(value: string | undefined): ObservabilityLogLevel {
  switch (value?.trim().toLowerCase()) {
    case 'debug':
    case 'warn':
    case 'error':
    case 'fatal':
      return value.trim().toLowerCase() as ObservabilityLogLevel;
    default:
      return 'info';
  }
}

function parseBoolean(value: string | undefined, fallback: boolean): boolean {
  if (!value) {
    return fallback;
  }

  switch (value.trim().toLowerCase()) {
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

function toError(value: unknown): Error {
  if (value instanceof Error) {
    return value;
  }
  return new Error(typeof value === 'string' ? value : 'Unknown observability error');
}
