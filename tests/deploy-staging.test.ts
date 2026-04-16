import { copyFile, mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

import { afterEach, beforeEach, describe, expect, it } from '@rstest/core';

import {
  DEFAULT_SOURCE_PATH,
  HOSTED_STAGED_ARTIFACT_DIR,
  HOSTED_STAGED_SOURCE_PATH,
} from '../src/core/constants.js';
import { stageDeployAssets } from '../src/build/stage-deploy-assets.js';
import { resetRuntimeObservabilityForTests } from '../src/observability/runtime-observability.js';

describe('deploy staging', () => {
  const canonicalSourcePath = resolve(process.cwd(), DEFAULT_SOURCE_PATH);
  let tempRoot: string;
  let sourcePath: string;
  let artifactDir: string;
  let hostedPublicDir: string;

  beforeEach(async () => {
    tempRoot = await mkdtemp(resolve(tmpdir(), 'fpf-deploy-stage-'));
    sourcePath = resolve(tempRoot, 'FPF-spec.md');
    artifactDir = resolve(tempRoot, 'artifacts');
    hostedPublicDir = resolve(tempRoot, 'public');
    await copyFile(canonicalSourcePath, sourcePath);
    await resetRuntimeObservabilityForTests();
  });

  afterEach(async () => {
    await resetRuntimeObservabilityForTests();
    await rm(tempRoot, { recursive: true, force: true });
  });

  it('stages the hosted runtime source and snapshot with a typed manifest', async () => {
    const env = {
      ...process.env,
      FPF_SPEC_SOURCE_PATH: sourcePath,
      FPF_RUNTIME_ARTIFACT_DIR: artifactDir,
      FPF_HOSTED_PUBLIC_DIR: hostedPublicDir,
      FPF_MASTRA_LOG_PATH: resolve(tempRoot, 'logs/mastra.log'),
      FPF_MASTRA_OBSERVABILITY_PATH: resolve(tempRoot, 'logs/observability.json'),
    } as NodeJS.ProcessEnv;

    const manifest = await stageDeployAssets(
      {
        sourcePath,
        runtimeArtifactDir: artifactDir,
        distDir: resolve(tempRoot, 'dist'),
        hostedPublicDir,
        docsRoot: resolve(tempRoot, 'docs'),
      },
      env,
    );

    expect(manifest.ownerContext).toBe('Ctx.Build');
    expect(manifest.lifecycleState).toBe('operation');
    expect(manifest.artifacts).toEqual([
      {
        kind: 'runtime_source',
        sourcePath,
        outputPath: resolve(hostedPublicDir, HOSTED_STAGED_SOURCE_PATH),
        consumer: 'hosted',
      },
      {
        kind: 'runtime_snapshot',
        sourcePath: resolve(artifactDir, 'snapshot.json'),
        outputPath: resolve(hostedPublicDir, HOSTED_STAGED_ARTIFACT_DIR, 'snapshot.json'),
        consumer: 'hosted',
      },
    ]);

    expect(await readFile(resolve(hostedPublicDir, HOSTED_STAGED_SOURCE_PATH), 'utf8')).toBe(
      await readFile(sourcePath, 'utf8'),
    );
    expect(
      await readFile(
        resolve(hostedPublicDir, HOSTED_STAGED_ARTIFACT_DIR, 'snapshot.json'),
        'utf8',
      ),
    ).toContain('"sourceHash"');
    // Fix for #48: staged paths must live outside of any dotfile directory so
    // `bunx mastra server deploy`'s zip step doesn't silently drop them.
    expect(HOSTED_STAGED_SOURCE_PATH.startsWith('.')).toBe(false);
    expect(HOSTED_STAGED_ARTIFACT_DIR.startsWith('.')).toBe(false);
    expect(HOSTED_STAGED_SOURCE_PATH.split('/').every((segment) => !segment.startsWith('.'))).toBe(
      true,
    );
    expect(
      HOSTED_STAGED_ARTIFACT_DIR.split('/').every((segment) => !segment.startsWith('.')),
    ).toBe(true);
  });
});
