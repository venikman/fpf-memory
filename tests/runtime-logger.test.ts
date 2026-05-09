import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

import { afterEach, beforeEach, describe, expect, it } from '@rstest/core';

import {
  getRuntimeLogger,
  resetRuntimeLoggerForTests,
} from '../src/adapters/infra/logging/runtime-logger.js';

describe('runtime logger', () => {
  let tempRoot: string;

  beforeEach(async () => {
    tempRoot = await mkdtemp(resolve(tmpdir(), 'fpf-runtime-logger-'));
    await resetRuntimeLoggerForTests();
  });

  afterEach(async () => {
    delete process.env.VERCEL;
    await resetRuntimeLoggerForTests();
    await rm(tempRoot, { recursive: true, force: true });
  });

  it('creates the parent log directory and preserves core log fields', async () => {
    const logPath = resolve(tempRoot, 'missing/logs/fpf-runtime.log');
    const logger = getRuntimeLogger({
      filePath: logPath,
      level: 'debug',
      serviceName: 'fpf-spec-runtime',
    });

    logger.info('runtime started', {
      level: 'caller-level',
      message: 'caller-message',
      detail: true,
    });
    await logger.flush?.();

    const [line] = (await readFile(logPath, 'utf8')).trim().split('\n');
    const payload = JSON.parse(line) as Record<string, unknown>;

    expect(payload.level).toBe('info');
    expect(payload.message).toBe('runtime started');
    expect(payload.service).toBe('fpf-spec-runtime');
    expect(payload.data).toEqual({
      level: 'caller-level',
      message: 'caller-message',
      detail: true,
    });
  });
});
