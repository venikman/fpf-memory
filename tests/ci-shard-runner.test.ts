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
