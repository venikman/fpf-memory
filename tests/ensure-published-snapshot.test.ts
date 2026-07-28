import { createHash } from 'node:crypto';
import { copyFile, mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

import { afterEach, beforeEach, describe, expect, it } from '@rstest/core';

import { ensurePublishedSnapshot } from '../src/build/ensure-published-snapshot.js';
import { publishCurrent } from '../src/build/publish-current.js';
import type { LineBlameMap } from '../src/build/upstream-blame.js';
import { DEFAULT_SOURCE_PATH } from '../src/core/constants.js';

// Stub the upstream commit resolver so tests don't hit the real GitHub
// API for fake refs like `test-ref` (same pattern as publish-current.test.ts).
const STUB_UPSTREAM_RESOLVER = async (ref: string) => ({
  sha: ref === 'test-ref' ? 'a'.repeat(40) : ref,
  committedAt: '2026-01-15T00:00:00.000Z',
});

// What a `GIT_LFS_SKIP_SMUDGE=1` (or quota-403) checkout leaves at the
// snapshot path instead of the derived JSON artifact.
const LFS_POINTER_STUB = [
  'version https://git-lfs.github.com/spec/v1',
  'oid sha256:e775e173c99ac82fb3c7e0d6e476c4f3cdf3d321ee59a07fec1ef631bb4cc5f7',
  'size 95004527',
  '',
].join('\n');

describe('ensurePublishedSnapshot', () => {
  let tempRoot: string;
  let publishSourcePath: string;
  let runtimeArtifactDir: string;
  let publishedSpecPath: string;
  let publishedArtifactDir: string;
  let publishedManifestPath: string;
  let publishedSnapshotPath: string;
  let stubBlame: LineBlameMap;
  let env: NodeJS.ProcessEnv;

  beforeEach(async () => {
    tempRoot = await mkdtemp(resolve(tmpdir(), 'fpf-ensure-snapshot-'));
    publishSourcePath = resolve(tempRoot, 'working-copy/FPF-Spec.md');
    runtimeArtifactDir = resolve(tempRoot, '.runtime/fpf-index');
    publishedSpecPath = resolve(tempRoot, 'published/current/FPF-Spec.md');
    publishedArtifactDir = resolve(tempRoot, 'published/current/fpf-index');
    publishedManifestPath = resolve(tempRoot, 'published/current/manifest.json');
    publishedSnapshotPath = resolve(publishedArtifactDir, 'snapshot.json');

    await mkdir(resolve(tempRoot, 'working-copy'), { recursive: true });
    await copyFile(resolve(process.cwd(), DEFAULT_SOURCE_PATH), publishSourcePath);

    // Deterministic per-line blame covering every line of the spec so the
    // enrichment stamps (virtually) every indexMap node.
    const specText = await readFile(publishSourcePath, 'utf8');
    const lineCount = specText.split('\n').length;
    stubBlame = new Map();
    for (let line = 1; line <= lineCount; line += 1) {
      stubBlame.set(line, {
        sha: 'b'.repeat(40),
        committedAt: '2026-01-10T00:00:00.000Z',
      });
    }

    env = {
      ...process.env,
      FPF_RUNTIME_ARTIFACT_DIR: runtimeArtifactDir,
    } as NodeJS.ProcessEnv;
  });

  afterEach(async () => {
    await rm(tempRoot, { recursive: true, force: true });
  });

  async function publishBaseline(): Promise<void> {
    await publishCurrent(
      {
        publishSourcePath,
        upstreamRef: 'test-ref',
        resolveUpstreamCommit: STUB_UPSTREAM_RESOLVER,
        loadLineBlame: async () => stubBlame,
        channel: 'latest-published',
        publishedSpecPath,
        publishedArtifactDir,
        publishedManifestPath,
      },
      env,
    );
  }

  function ensureOptions(overrides: Record<string, unknown> = {}) {
    return {
      cwd: tempRoot,
      publishedSpecPath,
      publishedArtifactDir,
      publishedManifestPath,
      expectedSpecPath: publishedSpecPath,
      expectedSnapshotPath: publishedSnapshotPath,
      loadLineBlame: async () => stubBlame,
      env,
      ...overrides,
    };
  }

  it('returns present without touching a valid published surface', async () => {
    await publishBaseline();
    const before = await stat(publishedSnapshotPath);

    const result = await ensurePublishedSnapshot(ensureOptions());

    expect(result.status).toBe('present');
    expect(result.upstreamRef).toBe('a'.repeat(40));
    const after = await stat(publishedSnapshotPath);
    expect(after.mtimeMs).toBe(before.mtimeMs);
  }, 90_000);

  it('regenerates a pointer-stub snapshot byte-identically from the committed manifest', async () => {
    await publishBaseline();
    const baselineSnapshot = await readFile(publishedSnapshotPath);
    const baselineManifest = await readFile(publishedManifestPath);

    await writeFile(publishedSnapshotPath, LFS_POINTER_STUB, 'utf8');

    const result = await ensurePublishedSnapshot(ensureOptions());

    expect(result.status).toBe('regenerated');
    if (result.status !== 'regenerated') {
      throw new Error('unreachable');
    }
    expect(result.blameNodes).toBeGreaterThan(0);
    const regenerated = await readFile(publishedSnapshotPath);
    expect(regenerated.equals(baselineSnapshot)).toBe(true);
    expect((await readFile(publishedManifestPath)).equals(baselineManifest)).toBe(true);
    expect(result.snapshotSha256).toBe(
      `sha256:${createHash('sha256').update(regenerated).digest('hex')}`,
    );
  }, 90_000);

  it('throws the drift error and restores the pre-call bytes instead of rewriting the manifest', async () => {
    await publishBaseline();

    // Mutate the committed spec: regeneration would produce a new sourceHash,
    // i.e. rewrite the committed manifest — that must hard-fail, preserving
    // the LFS-era rule that fingerprint/spec changes require a republish.
    await writeFile(
      publishedSpecPath,
      `${await readFile(publishedSpecPath, 'utf8')}\ndrifted\n`,
      'utf8',
    );

    // The pre-call surface: committed manifest, mutated spec, baseline
    // snapshot. Rejection must leave all three byte-identical — the
    // regeneration internally rewrites them before the drift check can run,
    // and a rewritten self-consistent manifest with stale provenance would
    // pass validate:published on a shared checkout.
    const manifestBefore = await readFile(publishedManifestPath);
    const specBefore = await readFile(publishedSpecPath);
    const snapshotBefore = await readFile(publishedSnapshotPath);

    await expect(ensurePublishedSnapshot(ensureOptions())).rejects.toThrow(
      /drifted under regeneration/,
    );

    expect((await readFile(publishedManifestPath)).equals(manifestBefore)).toBe(true);
    expect((await readFile(publishedSpecPath)).equals(specBefore)).toBe(true);
    expect((await readFile(publishedSnapshotPath)).equals(snapshotBefore)).toBe(true);
  }, 90_000);

  it('throws when regeneration loses the upstream blame enrichment and restores the stub', async () => {
    await publishBaseline();
    await writeFile(publishedSnapshotPath, LFS_POINTER_STUB, 'utf8');

    await expect(
      ensurePublishedSnapshot(
        ensureOptions({ loadLineBlame: async () => undefined }),
      ),
    ).rejects.toThrow(/blame enrichment missing/);

    // The degraded (blame-less) snapshot must not survive on disk: it would
    // validate as `present` on the next call and launder the blame loss.
    expect(await readFile(publishedSnapshotPath, 'utf8')).toBe(LFS_POINTER_STUB);

    // With a working blame loader the same checkout must still recover.
    const recovered = await ensurePublishedSnapshot(ensureOptions());
    expect(recovered.status).toBe('regenerated');
  }, 90_000);
});
