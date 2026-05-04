import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

import { afterEach, describe, expect, it } from '@rstest/core';

import { DEFAULT_SOURCE_PATH } from '../src/core/constants.js';
import { resolveRuntimePath } from '../src/runtime/path-resolution.js';

const tempRoots: string[] = [];

describe('resolveRuntimePath', () => {
  afterEach(async () => {
    await Promise.all(tempRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
  });

  it('falls back to the bundled module location when cwd does not contain staged assets', async () => {
    const root = await createTempRoot('fpf-runtime-paths-');
    const appRoot = resolve(root, 'app');
    const bundleRoot = resolve(appRoot, '.vercel/output/functions/index.func');
    const sourcePath = resolve(bundleRoot, DEFAULT_SOURCE_PATH);

    await mkdir(dirname(sourcePath), { recursive: true });
    await writeFile(sourcePath, '# staged source\n');

    const resolved = resolveRuntimePath(DEFAULT_SOURCE_PATH, {
      cwd: appRoot,
      kind: 'file',
      moduleUrl: pathToFileURL(resolve(bundleRoot, 'index.mjs')).href,
    });

    expect(resolved.path).toBe(sourcePath);
    expect(resolved.root).toBe(bundleRoot);
    expect(resolved.existed).toBe(true);
  });

  it('uses the discovered source root as the artifact fallback root', async () => {
    const root = await createTempRoot('fpf-runtime-artifacts-');
    const appRoot = resolve(root, 'app');
    const bundleRoot = resolve(appRoot, '.vercel/output/functions/index.func');
    const sourcePath = resolve(bundleRoot, DEFAULT_SOURCE_PATH);

    await mkdir(dirname(sourcePath), { recursive: true });
    await writeFile(sourcePath, '# staged source\n');

    const sourceResolution = resolveRuntimePath(DEFAULT_SOURCE_PATH, {
      cwd: appRoot,
      kind: 'file',
      moduleUrl: pathToFileURL(resolve(bundleRoot, 'index.mjs')).href,
    });

    const artifactResolution = resolveRuntimePath('.runtime/fpf-index', {
      cwd: appRoot,
      kind: 'directory',
      fallbackRoot: sourceResolution.root,
      moduleUrl: pathToFileURL(resolve(bundleRoot, 'index.mjs')).href,
    });

    expect(artifactResolution.path).toBe(resolve(bundleRoot, '.runtime/fpf-index'));
    expect(artifactResolution.root).toBe(bundleRoot);
    expect(artifactResolution.existed).toBe(false);
  });
});

async function createTempRoot(prefix: string): Promise<string> {
  const root = await mkdtemp(resolve(tmpdir(), prefix));
  tempRoots.push(root);
  return root;
}
