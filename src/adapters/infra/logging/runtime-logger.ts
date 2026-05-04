import { appendFileSync } from 'node:fs';

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
}

class JsonFileRuntimeLogger implements RuntimeLogger {
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

    appendFileSync(
      this.filePath,
      `${JSON.stringify({
        time: new Date().toISOString(),
        level,
        message,
        service: this.config.serviceName,
        logFile: this.filePath,
        ...(data ?? {}),
      })}\n`,
      'utf8',
    );
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
