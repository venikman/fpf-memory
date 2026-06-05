import { copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

import { afterEach, beforeEach, describe, expect, it } from '@rstest/core';

import { publishCurrent } from '../src/build/publish-current.js';
import { validatePublishedSurface } from '../src/build/published-surface.js';
import { DEFAULT_SOURCE_PATH } from '../src/core/constants.js';

// Stub the upstream commit resolver so tests don't hit the real GitHub
// API for fake refs like `test-ref`. The returned values are stable
// byte-strings so manifest equality checks stay deterministic.
const STUB_UPSTREAM_RESOLVER = async (ref: string) => ({
  sha: ref === 'test-ref' ? 'a'.repeat(40) : ref,
  committedAt: '2026-01-15T00:00:00.000Z',
});

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
      resolveUpstreamCommit: STUB_UPSTREAM_RESOLVER,
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

  it('republishes the same ref byte-identically from a clean tree', async () => {
    // Reproduces the CI sync worker: it republishes from a fresh `main`
    // checkout every hour, so it never has this ref's prior published surface
    // to fall back on. Before the determinism fix, wall-clock publishedAt
    // (manifest) and builtAt (snapshot) made each run emit a new commit SHA,
    // which permanently wedged the sync PR's auto-merge gate. Two clean-tree
    // publishes of the same ref must now be byte-for-byte identical.
    const config = {
      publishSourcePath,
      upstreamRef: 'test-ref',
      resolveUpstreamCommit: STUB_UPSTREAM_RESOLVER,
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
    const firstSnapshot = await readFile(resolve(publishedArtifactDir, 'snapshot.json'), 'utf8');

    // Wipe everything a fresh checkout would lack: the published surface (so
    // the idempotency guard cannot short-circuit) and the runtime artifact dir
    // (so the compiler genuinely rebuilds with a new wall-clock builtAt). The
    // sleep guarantees a wall-clock value would differ on the unfixed path.
    await rm(resolve(tempRoot, 'published'), { recursive: true, force: true });
    await rm(runtimeArtifactDir, { recursive: true, force: true });
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 25));

    await publishCurrent(config, env);

    expect(await readFile(publishedManifestPath, 'utf8')).toBe(firstManifest);
    expect(await readFile(resolve(publishedArtifactDir, 'snapshot.json'), 'utf8')).toBe(
      firstSnapshot,
    );
  }, 30_000);

  it('resolves the default runtime artifact dir relative to the publish source root', async () => {
    await publishCurrent(
      {
        publishSourcePath,
        upstreamRef: 'test-ref',
        resolveUpstreamCommit: STUB_UPSTREAM_RESOLVER,
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
      resolveUpstreamCommit: STUB_UPSTREAM_RESOLVER,
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

  it('writes a compiler fingerprint into the published manifest and snapshot', async () => {
    await publishCurrent(
      {
        publishSourcePath,
        upstreamRef: 'test-ref',
        resolveUpstreamCommit: STUB_UPSTREAM_RESOLVER,
        channel: 'latest-published',
        publishedSpecPath,
        publishedArtifactDir,
        publishedManifestPath,
      },
      {
        ...process.env,
        FPF_RUNTIME_ARTIFACT_DIR: runtimeArtifactDir,
      } as NodeJS.ProcessEnv,
    );

    const manifest = JSON.parse(await readFile(publishedManifestPath, 'utf8')) as {
      compilerFingerprint?: string;
    };
    const snapshot = JSON.parse(
      await readFile(resolve(publishedArtifactDir, 'snapshot.json'), 'utf8'),
    ) as {
      compilerFingerprint?: string;
    };

    expect(manifest.compilerFingerprint).toMatch(/^sha256:/);
    expect(snapshot.compilerFingerprint).toBe(manifest.compilerFingerprint);
  }, 30_000);

  it('rebuilds the runtime snapshot when the published compiler fingerprint is stale', async () => {
    await publishCurrent(
      {
        publishSourcePath,
        upstreamRef: 'test-ref',
        resolveUpstreamCommit: STUB_UPSTREAM_RESOLVER,
        channel: 'latest-published',
        publishedSpecPath,
        publishedArtifactDir,
        publishedManifestPath,
      },
      {
        ...process.env,
        FPF_RUNTIME_ARTIFACT_DIR: runtimeArtifactDir,
      } as NodeJS.ProcessEnv,
    );

    const publishedManifest = JSON.parse(await readFile(publishedManifestPath, 'utf8')) as Record<
      string,
      unknown
    >;
    publishedManifest.compilerFingerprint = 'sha256:previous-compiler';
    await writeFile(publishedManifestPath, `${JSON.stringify(publishedManifest, null, 2)}\n`);

    const runtimeSnapshotPath = resolve(runtimeArtifactDir, 'snapshot.json');
    const staleRuntimeSnapshot = JSON.parse(await readFile(runtimeSnapshotPath, 'utf8')) as Record<
      string,
      unknown
    >;
    staleRuntimeSnapshot.staleCompilerOnlyMarker = true;
    await writeFile(runtimeSnapshotPath, `${JSON.stringify(staleRuntimeSnapshot, null, 2)}\n`);

    await publishCurrent(
      {
        publishSourcePath,
        upstreamRef: 'test-ref',
        resolveUpstreamCommit: STUB_UPSTREAM_RESOLVER,
        channel: 'latest-published',
        publishedSpecPath,
        publishedArtifactDir,
        publishedManifestPath,
      },
      {
        ...process.env,
        FPF_RUNTIME_ARTIFACT_DIR: runtimeArtifactDir,
      } as NodeJS.ProcessEnv,
    );

    const republishedSnapshot = JSON.parse(
      await readFile(resolve(publishedArtifactDir, 'snapshot.json'), 'utf8'),
    ) as Record<string, unknown>;

    expect(republishedSnapshot.staleCompilerOnlyMarker).toBeUndefined();
  }, 30_000);

  it('rejects a published surface whose compiler fingerprint drifted', async () => {
    await publishCurrent(
      {
        publishSourcePath,
        upstreamRef: 'test-ref',
        resolveUpstreamCommit: STUB_UPSTREAM_RESOLVER,
        channel: 'latest-published',
        publishedSpecPath,
        publishedArtifactDir,
        publishedManifestPath,
      },
      {
        ...process.env,
        FPF_RUNTIME_ARTIFACT_DIR: runtimeArtifactDir,
      } as NodeJS.ProcessEnv,
    );

    const publishedSnapshotPath = resolve(publishedArtifactDir, 'snapshot.json');
    const snapshot = JSON.parse(await readFile(publishedSnapshotPath, 'utf8')) as Record<string, unknown>;
    snapshot.compilerFingerprint = 'sha256:stale-compiler-fingerprint';
    await writeFile(publishedSnapshotPath, `${JSON.stringify(snapshot, null, 2)}\n`);

    await expect(
      validatePublishedSurface({
        cwd: tempRoot,
        publishedSpecPath: 'published/current/FPF-Spec.md',
        publishedArtifactDir: 'published/current/fpf-index',
        publishedManifestPath: 'published/current/manifest.json',
      }),
    ).rejects.toThrow(/compilerFingerprint/);
  }, 30_000);
});
