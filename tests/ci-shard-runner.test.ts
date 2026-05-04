import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, resolve } from 'node:path';

import { afterEach, describe, expect, it } from '@rstest/core';

import {
  discoverTestFiles,
  parseShard,
  runSelectedTestFiles,
  selectShardFiles,
} from '../scripts/run-test-shard.js';

const tempRoots: string[] = [];

describe('CI test shard runner', () => {
  afterEach(async () => {
    await Promise.all(
      tempRoots.splice(0).map((directory) => rm(directory, { recursive: true, force: true })),
    );
  });

  it('discovers nested test files and returns stable relative paths', async () => {
    const root = await createFixtureRoot();
    await writeFixtureFile(root, 'tests/root.test.ts');
    await writeFixtureFile(root, 'tests/integration/nested.test.ts');
    await writeFixtureFile(root, 'tests/not-a-test.ts');

    await expect(discoverTestFiles(root)).resolves.toEqual([
      'tests/integration/nested.test.ts',
      'tests/root.test.ts',
    ]);
  });

  it('selects files by deterministic modulo shard', () => {
    const files = ['a.test.ts', 'b.test.ts', 'c.test.ts', 'd.test.ts', 'e.test.ts'];

    expect(selectShardFiles(files, parseShard('1/2'))).toEqual([
      'a.test.ts',
      'c.test.ts',
      'e.test.ts',
    ]);
    expect(selectShardFiles(files, parseShard('2/2'))).toEqual(['b.test.ts', 'd.test.ts']);
  });

  it('runs every selected file before returning a failing exit code', async () => {
    const calls: string[] = [];
    const logLines: string[] = [];

    const exitCode = await runSelectedTestFiles({
      files: ['first.test.ts', 'second.test.ts', 'third.test.ts'],
      cwd: '/repo',
      maxAttempts: 1,
      log: {
        error: (line) => logLines.push(line),
        log: (line) => logLines.push(line),
      },
      runTestFile: (file) => {
        calls.push(file);
        return file === 'first.test.ts' ? 1 : 0;
      },
    });

    expect(exitCode).toBe(1);
    expect(calls).toEqual(['first.test.ts', 'second.test.ts', 'third.test.ts']);
    expect(logLines.filter((line) => line === '::endgroup::')).toHaveLength(3);
  });

  it('retries a failing file once and treats the second pass as success', async () => {
    const attempts = new Map<string, number>();
    const logLines: string[] = [];

    const exitCode = await runSelectedTestFiles({
      files: ['flaky.test.ts', 'stable.test.ts'],
      cwd: '/repo',
      log: {
        error: (line) => logLines.push(line),
        log: (line) => logLines.push(line),
      },
      runTestFile: (file) => {
        const next = (attempts.get(file) ?? 0) + 1;
        attempts.set(file, next);
        // First attempt of `flaky.test.ts` fails (mimics a bun worker
        // crash). Retry passes. `stable.test.ts` always passes.
        if (file === 'flaky.test.ts' && next === 1) return 1;
        return 0;
      },
    });

    expect(exitCode).toBe(0);
    expect(attempts.get('flaky.test.ts')).toBe(2);
    expect(attempts.get('stable.test.ts')).toBe(1);
    expect(
      logLines.some((line) => line.includes('::warning::') && line.includes('flaky.test.ts')),
    ).toBe(true);
  });

  it('still fails when both attempts of a file fail', async () => {
    const attempts = new Map<string, number>();

    const exitCode = await runSelectedTestFiles({
      files: ['always-broken.test.ts', 'stable.test.ts'],
      cwd: '/repo',
      log: { error: () => {}, log: () => {} },
      runTestFile: (file) => {
        const next = (attempts.get(file) ?? 0) + 1;
        attempts.set(file, next);
        return file === 'always-broken.test.ts' ? 1 : 0;
      },
    });

    expect(exitCode).toBe(1);
    expect(attempts.get('always-broken.test.ts')).toBe(2);
    expect(attempts.get('stable.test.ts')).toBe(1);
  });
});

async function createFixtureRoot(): Promise<string> {
  const root = await mkdtemp(resolve(tmpdir(), 'fpf-ci-shard-runner-'));
  tempRoots.push(root);
  return root;
}

async function writeFixtureFile(root: string, relativePath: string): Promise<void> {
  const filePath = resolve(root, relativePath);
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, 'import { it } from "@rstest/core"; it("works", () => {});\n');
}
