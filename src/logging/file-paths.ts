import { closeSync, openSync } from 'node:fs';
import { mkdirSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';

const DEFAULT_LOG_DIR = '.runtime/logs';
const SERVERLESS_LOG_DIR = '/tmp/fpf-memory/logs';

export function resolveLogPath(
  envValue: string | undefined,
  fallbackFileName: string,
): string {
  const rawPath = envValue?.trim() || `${DEFAULT_LOG_DIR}/${fallbackFileName}`;
  const absolutePath = resolve(process.cwd(), rawPath);
  try {
    return prepareLogPath(absolutePath);
  } catch (error) {
    if (!shouldUseServerlessLogFallback(absolutePath, error)) {
      throw error;
    }

    return prepareLogPath(resolve(SERVERLESS_LOG_DIR, basename(rawPath) || fallbackFileName));
  }
}

function prepareLogPath(absolutePath: string): string {
  mkdirSync(dirname(absolutePath), { recursive: true });
  closeSync(openSync(absolutePath, 'a'));
  return absolutePath;
}

function shouldUseServerlessLogFallback(absolutePath: string, error: unknown): boolean {
  return process.env.VERCEL === '1'
    && !absolutePath.startsWith(`${SERVERLESS_LOG_DIR}/`)
    && isFileSystemWriteFailure(error);
}

function isFileSystemWriteFailure(error: unknown): boolean {
  if (!(error instanceof Error) || !('code' in error)) {
    return false;
  }
  return error.code === 'ENOENT' || error.code === 'EROFS' || error.code === 'EACCES';
}
