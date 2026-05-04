import { access, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

import { afterEach, beforeEach, describe, expect, it } from '@rstest/core';

import {
  runMastraBuild,
  withTemporaryMastraPackageLock,
} from '../src/build/mastra-build.js';

async function pathExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

describe('withTemporaryMastraPackageLock', () => {
  let tempRoot: string;

  beforeEach(async () => {
    tempRoot = await mkdtemp(resolve(tmpdir(), 'fpf-mastra-build-'));
  });

  afterEach(async () => {
    await rm(tempRoot, { recursive: true, force: true });
  });

  it('creates a temporary package-lock.json for the duration of the build callback', async () => {
    const lockPath = resolve(tempRoot, 'package-lock.json');
    let seenDuringWork = false;

    await withTemporaryMastraPackageLock(tempRoot, async (createdLockPath) => {
      expect(createdLockPath).toBe(lockPath);
      const contents = await readFile(lockPath, 'utf8');
      seenDuringWork = contents.includes('"lockfileVersion": 3');
    });

    expect(seenDuringWork).toBe(true);
    expect(await pathExists(lockPath)).toBe(false);
  });

  it('preserves an existing package-lock.json', async () => {
    const lockPath = resolve(tempRoot, 'package-lock.json');
    const original = '{\n  "name": "existing-lock"\n}\n';
    await writeFile(lockPath, original, 'utf8');

    await withTemporaryMastraPackageLock(tempRoot, async () => {
      expect(await readFile(lockPath, 'utf8')).toBe(original);
    });

    expect(await readFile(lockPath, 'utf8')).toBe(original);
  });
});

describe('Mastra CLI wrappers', () => {
  let tempRoot: string;

  beforeEach(async () => {
    tempRoot = await mkdtemp(resolve(tmpdir(), 'fpf-mastra-build-run-'));
  });

  afterEach(async () => {
    await rm(tempRoot, { recursive: true, force: true });
  });

  it('runs mastra build while the temporary package-lock.json exists', async () => {
    let sawTemporaryLock = false;
    let seenArgs: string[] | undefined;

    await runMastraBuild({
      rootDir: tempRoot,
      args: ['--debug'],
      runCommand: async (command, args, options) => {
        seenArgs = [command, ...args];
        sawTemporaryLock = await pathExists(resolve(options.cwd, 'package-lock.json'));
      },
    });

    expect(seenArgs).toEqual(['bunx', 'mastra', 'build', '--debug']);
    expect(sawTemporaryLock).toBe(true);
    expect(await pathExists(resolve(tempRoot, 'package-lock.json'))).toBe(false);
  });

});
