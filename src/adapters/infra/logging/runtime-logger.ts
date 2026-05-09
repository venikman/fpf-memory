import { appendFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

import { resolveLogPath } from '../../../logging/file-paths.js';
import type { LoggingConfig } from '../config/types.js';

type LogLevel = LoggingConfig['level'];

const LEVEL_ORDER: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

export interface RuntimeLogger {
  debug(message: string, data?: Record<string, unknown>): void;
  info(message: string, data?: Record<string, unknown>): void;
  warn(message: string, data?: Record<string, unknown>): void;
  error(message: string, data?: Record<string, unknown>): void;
  flush?(): Promise<void>;
}

class JsonFileRuntimeLogger implements RuntimeLogger {
  private directoryReady: Promise<void> | undefined;
  private writeChain = Promise.resolve();
  private fileWriterDisabled = false;

  constructor(
    private readonly filePath: string,
    private readonly config: LoggingConfig,
  ) {}

  debug(message: string, data?: Record<string, unknown>): void {
    this.write('debug', message, data);
  }

  info(message: string, data?: Record<string, unknown>): void {
    this.write('info', message, data);
  }

  warn(message: string, data?: Record<string, unknown>): void {
    this.write('warn', message, data);
  }

  error(message: string, data?: Record<string, unknown>): void {
    this.write('error', message, data);
  }

  private write(level: LogLevel, message: string, data?: Record<string, unknown>): void {
    if (LEVEL_ORDER[level] < LEVEL_ORDER[this.config.level]) {
      return;
    }

    const payload = {
      time: new Date().toISOString(),
      level,
      message,
      service: this.config.serviceName,
      logFile: this.filePath,
      ...(data ? { data } : {}),
    };

    if (isVercelRuntime() || this.fileWriterDisabled) {
      writeConsolePayload(level, payload);
      return;
    }

    const writeOperation = this.writeChain
      .then(() => this.ensureDirectoryReady())
      .then(() => appendFile(this.filePath, `${JSON.stringify(payload)}\n`, 'utf8'))
      .catch((error) => {
        this.fileWriterDisabled = true;
        writeConsolePayload(level, {
          ...payload,
          loggerError: normalizeError(error),
        });
      });
    this.writeChain = writeOperation;
  }

  async flush(): Promise<void> {
    await this.writeChain;
  }

  private ensureDirectoryReady(): Promise<void> {
    this.directoryReady ??= mkdir(dirname(this.filePath), { recursive: true }).then(
      () => undefined,
    );
    return this.directoryReady;
  }
}

let cachedLogger: RuntimeLogger | undefined;
let cachedKey: string | undefined;

export function getRuntimeLogger(config: LoggingConfig): RuntimeLogger {
  const filePath = resolveLogPath(config.filePath, 'fpf-runtime.log');
  const cacheKey = `${filePath}:${config.level}:${config.serviceName}`;

  if (cachedLogger && cachedKey === cacheKey) {
    return cachedLogger;
  }

  cachedLogger = new JsonFileRuntimeLogger(filePath, config);
  cachedKey = cacheKey;
  return cachedLogger;
}

export async function resetRuntimeLoggerForTests(): Promise<void> {
  await cachedLogger?.flush?.().catch(() => undefined);
  cachedLogger = undefined;
  cachedKey = undefined;
}

function isVercelRuntime(): boolean {
  return process.env.VERCEL === '1';
}

function writeConsolePayload(level: LogLevel, payload: Record<string, unknown>): void {
  const line = `${JSON.stringify(payload)}\n`;
  if (level === 'error' || level === 'warn') {
    process.stderr.write(line);
    return;
  }
  process.stdout.write(line);
}

function normalizeError(error: unknown): Record<string, unknown> {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }
  return {
    message: String(error),
  };
}
