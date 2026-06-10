import { execFile } from 'node:child_process';
import { copyFile, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { promisify } from 'node:util';

import { afterEach, beforeEach, describe, expect, it } from '@rstest/core';

import { computeCompilerFingerprint } from '../src/build/compiler-fingerprint.js';
import { DEFAULT_SOURCE_PATH } from '../src/core/constants.js';
import { ARTIFACT_FILENAMES } from '../src/runtime/constants.js';
import { FpfRuntime } from '../src/runtime/runtime.js';

const execFileAsync = promisify(execFile);

/**
 * Regression tests for the artefact cache-freshness logic.
 *
 * These complement `fpf-spec-runtime.test.ts` by exercising the
 * corruption-and-recovery paths that are easy to break when the snapshot
 * shape evolves: stale snapshot migrations, corrupt artefact bytes,
 * missing projections, and status-driven auto-refresh.
 */
describe('FpfRuntime cache-freshness regressions', () => {
  const canonicalSourcePath = resolve(process.cwd(), DEFAULT_SOURCE_PATH);
  let tempRoot: string;
  let artifactDir: string;
  let sourcePath: string;
  let runtime: FpfRuntime;

  beforeEach(async () => {
    tempRoot = await mkdtemp(resolve(tmpdir(), 'fpf-cache-freshness-'));
    artifactDir = resolve(tempRoot, 'artifacts');
    sourcePath = resolve(tempRoot, 'FPF-spec.md');
    await copyFile(canonicalSourcePath, sourcePath);
    runtime = new FpfRuntime({ artifactDir, sourcePath });
  });

  afterEach(async () => {
    await rm(tempRoot, { recursive: true, force: true });
  });

  async function readSnapshot(): Promise<Record<string, unknown>> {
    return JSON.parse(
      await readFile(resolve(artifactDir, ARTIFACT_FILENAMES.snapshot), 'utf8'),
    ) as Record<string, unknown>;
  }

  it('rebuilds when the persisted snapshot is missing required metadata fields', async () => {
    const first = await runtime.refresh();
    expect(first.rebuilt).toBe(true);

    // Simulate an older-format snapshot whose index-map nodes are missing
    // the newer `metadata.role` and `metadata.routeBearing` fields.
    const snapshot = await readSnapshot();
    const indexMap = snapshot.indexMap as Record<string, Record<string, unknown>>;
    for (const node of Object.values(indexMap)) {
      delete (node as { metadata?: unknown }).metadata;
      delete (node as { description?: unknown }).description;
    }
    await writeFile(
      resolve(artifactDir, ARTIFACT_FILENAMES.snapshot),
      JSON.stringify(snapshot, null, 2),
    );

    const second = await runtime.refresh();
    expect(second.rebuilt).toBe(true);
    // The runtime treats a stale-shaped snapshot as if it were missing.
    expect(second.reason).toBe('missing_snapshot');
  });

  it('backfills the indexing view when it is deleted between refreshes', async () => {
    await runtime.refresh();

    const indexingViewPath = resolve(artifactDir, ARTIFACT_FILENAMES.indexingView);
    await rm(indexingViewPath, { force: true });

    const second = await runtime.refresh();
    expect(second.rebuilt).toBe(false);
    expect(second.reason).toBe('snapshot_current');
    const view = JSON.parse(await readFile(indexingViewPath, 'utf8')) as {
      edition: string;
      patterns: Record<string, unknown>;
      routes: Record<string, unknown>;
      anchorIds: string[];
      lexiconCanonicals: string[];
    };
    expect(typeof view.edition).toBe('string');
    expect(Object.keys(view.patterns).length).toBeGreaterThan(0);
    expect(typeof view.routes).toBe('object');
    expect(view.anchorIds.length).toBeGreaterThan(0);
    expect(view.lexiconCanonicals.length).toBeGreaterThan(0);
  });

  it('recovers from corrupt snapshot bytes by rebuilding on next refresh', async () => {
    await runtime.refresh();

    await writeFile(resolve(artifactDir, ARTIFACT_FILENAMES.snapshot), '{ not json');

    const second = await runtime.refresh();
    expect(second.rebuilt).toBe(true);
    expect(second.reason).toBe('missing_snapshot');

    // The rebuilt snapshot must be parseable again.
    const recovered = await readSnapshot();
    expect(typeof recovered.sourceHash).toBe('string');
  });

  it('auto-refreshes inside status() when the cached snapshot is stale', async () => {
    await runtime.refresh();

    // Corrupt the snapshot to force `status()` through its self-heal path.
    await writeFile(resolve(artifactDir, ARTIFACT_FILENAMES.snapshot), '""');

    const status = await runtime.status();
    expect(status.snapshotExists).toBe(true);
    expect(status.fresh).toBe(true);
    expect(status.sourceHash).toBe(status.currentSourceHash);
  });

  it('serves status() from the in-memory snapshot without re-reading artifact bytes', async () => {
    await runtime.refresh();

    // Remove the multi-MB snapshot artifact. A status() implementation that
    // re-reads the artifact set from disk would either fail or trigger a
    // full rebuild (rewriting the file); the in-memory fast path must answer
    // from the snapshot cached by refresh() instead.
    await rm(resolve(artifactDir, ARTIFACT_FILENAMES.snapshot), { force: true });

    const status = await runtime.status();
    expect(status.snapshotExists).toBe(true);
    expect(status.fresh).toBe(true);
    // The presence map still reports the truth about the on-disk artifact
    // set — and proves status() did not rebuild the snapshot to answer.
    expect(status.artifacts.snapshot).toBe(false);
  });

  it('warms the in-memory snapshot cache on the first status() call', async () => {
    // Cold call: no artifacts yet, so status() builds and persists them.
    const first = await runtime.status();
    expect(first.snapshotExists).toBe(true);

    await rm(resolve(artifactDir, ARTIFACT_FILENAMES.snapshot), { force: true });

    // The warm call must be served from the snapshot the first call loaded,
    // not from another disk read or rebuild.
    const second = await runtime.status();
    expect(second.snapshotExists).toBe(true);
    expect(second.fresh).toBe(true);
    expect(second.artifacts.snapshot).toBe(false);
  });

  it('reports source_hash_changed and emits a refreshClassification on spec edits', async () => {
    await runtime.refresh();
    await writeFile(sourcePath, `${await readFile(sourcePath, 'utf8')}\n<!-- drift -->\n`);

    const rebuilt = await runtime.refresh();
    expect(rebuilt.rebuilt).toBe(true);
    expect(rebuilt.reason).toBe('source_hash_changed');
    // `classifyChange` runs whenever a prior indexing view is available —
    // a missing classification on a real edit is a cache-freshness regression.
    expect(rebuilt.refreshClassification).toBeDefined();
    expect(rebuilt.previousSourceHash).toBeDefined();
    expect(rebuilt.previousSourceHash).not.toBe(rebuilt.sourceHash);
  });

  it('rebuilds when the compiler fingerprint changes without spec edits', async () => {
    await runtime.refresh();
    const snapshot = await readSnapshot();
    expect(snapshot.compilerFingerprint).toMatch(/^sha256:/);

    snapshot.compilerFingerprint = 'sha256:previous-compiler';
    await writeFile(
      resolve(artifactDir, ARTIFACT_FILENAMES.snapshot),
      JSON.stringify(snapshot, null, 2),
    );

    const rebuilt = await runtime.refresh();
    expect(rebuilt.rebuilt).toBe(true);
    expect(rebuilt.reason).toBe('compiler_changed');

    const recovered = await readSnapshot();
    expect(recovered.compilerFingerprint).toMatch(/^sha256:/);
    expect(recovered.compilerFingerprint).not.toBe('sha256:previous-compiler');
  });

  it('computes the default compiler fingerprint outside the repo cwd', async () => {
    const expected = await computeCompilerFingerprint({ cwd: process.cwd() });
    const outsideCwd = await mkdtemp(resolve(tmpdir(), 'fpf-fingerprint-cwd-'));
    const moduleUrl = pathToFileURL(
      resolve(process.cwd(), 'src/build/compiler-fingerprint.ts'),
    ).href;

    try {
      const { stdout } = await execFileAsync(
        'bun',
        [
          '--cwd',
          outsideCwd,
          '--eval',
          `import { computeCompilerFingerprint } from ${JSON.stringify(moduleUrl)}; console.log(await computeCompilerFingerprint());`,
        ],
        { maxBuffer: 1024 * 1024 },
      );
      expect(stdout.trim()).toBe(expected);
    } finally {
      await rm(outsideCwd, { recursive: true, force: true });
    }
  });
});
