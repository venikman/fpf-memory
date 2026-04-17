import { copyFile, mkdir, mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

import { afterEach, beforeEach, describe, expect, it } from '@rstest/core';

import { publishCurrent } from '../src/build/publish-current.js';
import { DEFAULT_SOURCE_PATH } from '../src/core/constants.js';

describe('publishCurrent', () => {
  let tempRoot: string;
  let publishSourcePath: string;
  let alternatePublishSourcePath: string;
  let runtimeArtifactDir: string;
  let alternateRuntimeArtifactDir: string;
  let publishedSpecPath: string;
  let publishedArtifactDir: string;
  let publishedManifestPath: string;

  beforeEach(async () => {
    tempRoot = await mkdtemp(resolve(tmpdir(), 'fpf-publish-current-'));
    publishSourcePath = resolve(tempRoot, 'working-copy/FPF-Spec.md');
    alternatePublishSourcePath = resolve(tempRoot, 'working-copy-alt/FPF-Spec.md');
    runtimeArtifactDir = resolve(tempRoot, '.runtime/fpf-index');
    alternateRuntimeArtifactDir = resolve(tempRoot, '.runtime-alt/fpf-index');
    publishedSpecPath = resolve(tempRoot, 'published/current/FPF-Spec.md');
    publishedArtifactDir = resolve(tempRoot, 'published/current/fpf-index');
    publishedManifestPath = resolve(tempRoot, 'published/current/manifest.json');

    await mkdir(resolve(tempRoot, 'working-copy'), { recursive: true });
    await mkdir(resolve(tempRoot, 'working-copy-alt'), { recursive: true });
    await copyFile(resolve(process.cwd(), DEFAULT_SOURCE_PATH), publishSourcePath);
    await copyFile(resolve(process.cwd(), DEFAULT_SOURCE_PATH), alternatePublishSourcePath);
  });

  afterEach(async () => {
    await rm(tempRoot, { recursive: true, force: true });
  });

  it('keeps manifest.json byte-stable when the published surface is unchanged', async () => {
    const config = {
      publishSourcePath,
      upstreamRef: 'test-ref',
      channel: 'latest-published',
      publishedSpecPath,
      publishedArtifactDir,
      publishedManifestPath,
    };
    const env = {
      ...process.env,
      FPF_RUNTIME_ARTIFACT_DIR: runtimeArtifactDir,
    } as NodeJS.ProcessEnv;

    await publishCurrent(config, env);
    const firstManifest = await readFile(publishedManifestPath, 'utf8');

    await new Promise((resolvePromise) => setTimeout(resolvePromise, 25));

    await publishCurrent(config, env);
    const secondManifest = await readFile(publishedManifestPath, 'utf8');

    expect(secondManifest).toBe(firstManifest);
  }, 30_000);

  it('resolves the default runtime artifact dir relative to the publish source root', async () => {
    await publishCurrent(
      {
        publishSourcePath,
        upstreamRef: 'test-ref',
        channel: 'latest-published',
        publishedSpecPath,
        publishedArtifactDir,
        publishedManifestPath,
      },
      {} as NodeJS.ProcessEnv,
    );

    expect(await readFile(publishedManifestPath, 'utf8')).toContain('"channel": "latest-published"');
  }, 30_000);

  it('keeps the published surface stable across equivalent publish roots', async () => {
    const config = {
      upstreamRef: 'test-ref',
      channel: 'latest-published',
      publishedSpecPath,
      publishedArtifactDir,
      publishedManifestPath,
    };

    await publishCurrent(
      {
        ...config,
        publishSourcePath,
      },
      {
        ...process.env,
        FPF_RUNTIME_ARTIFACT_DIR: runtimeArtifactDir,
      } as NodeJS.ProcessEnv,
    );
    const firstManifest = await readFile(publishedManifestPath, 'utf8');
    const firstSnapshot = await readFile(resolve(publishedArtifactDir, 'snapshot.json'), 'utf8');

    await publishCurrent(
      {
        ...config,
        publishSourcePath: alternatePublishSourcePath,
      },
      {
        ...process.env,
        FPF_RUNTIME_ARTIFACT_DIR: alternateRuntimeArtifactDir,
      } as NodeJS.ProcessEnv,
    );

    expect(await readFile(publishedManifestPath, 'utf8')).toBe(firstManifest);
    expect(await readFile(resolve(publishedArtifactDir, 'snapshot.json'), 'utf8')).toBe(
      firstSnapshot,
    );
  }, 30_000);
});
