import { closeSync, openSync } from 'node:fs';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const DEFAULT_LOG_DIR = '.runtime/logs';

export function resolveLogPath(
  envValue: string | undefined,
  fallbackFileName: string,
): string {
  const rawPath = envValue?.trim() || `${DEFAULT_LOG_DIR}/${fallbackFileName}`;
  const absolutePath = resolve(process.cwd(), rawPath);
  mkdirSync(dirname(absolutePath), { recursive: true });
  closeSync(openSync(absolutePath, 'a'));
  return absolutePath;
}
