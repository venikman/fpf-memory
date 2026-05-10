import { createHash } from 'node:crypto';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

import { afterEach, beforeEach, describe, expect, it } from '@rstest/core';

import {
  ARTIFACT_FILENAMES,
  HOSTED_STAGED_ARTIFACT_DIR,
  HOSTED_STAGED_MANIFEST_PATH,
  HOSTED_STAGED_SOURCE_PATH,
} from '../src/core/constants.js';
import { computeCompilerFingerprint } from '../src/build/compiler-fingerprint.js';
import { stageFromPublished } from '../src/build/stage-from-published.js';

describe('stageFromPublished', () => {
  let tempRoot: string;
  let publishedRoot: string;
  let publishedSpecPath: string;
  let publishedArtifactDir: string;
  let publishedManifestPath: string;
  let hostedPublicDir: string;
  let compilerFingerprint: string;

  const SPEC_TEXT = '# Fake FPF\n\nMinimal spec body for stage tests.\n';
  const SOURCE_HASH = `sha256:${createHash('sha256').update(SPEC_TEXT).digest('hex')}`;

  beforeEach(async () => {
    tempRoot = await mkdtemp(resolve(tmpdir(), 'fpf-stage-from-published-'));
    publishedRoot = resolve(tempRoot, 'published/current');
    publishedSpecPath = resolve(publishedRoot, 'FPF-Spec.md');
    publishedArtifactDir = resolve(publishedRoot, 'fpf-index');
    publishedManifestPath = resolve(publishedRoot, 'manifest.json');
    hostedPublicDir = resolve(tempRoot, 'public');
    compilerFingerprint = await computeCompilerFingerprint();

    await mkdir(publishedArtifactDir, { recursive: true });
    await writeFile(publishedSpecPath, SPEC_TEXT);
    await writeFile(
      resolve(publishedArtifactDir, ARTIFACT_FILENAMES.snapshot),
      `${JSON.stringify({
        sourceHash: SOURCE_HASH,
        sourcePath: 'published/current/FPF-Spec.md',
        builtAt: '2026-04-16T00:00:00.000Z',
        compilerFingerprint,
      })}\n`,
    );
    await writeFile(
      publishedManifestPath,
      `${JSON.stringify({
        channel: 'latest-published',
        sourceHash: SOURCE_HASH,
        compilerFingerprint,
        upstreamRef: 'a'.repeat(40),
        upstreamRepoUrl: 'https://github.com/ailev/FPF',
        upstreamCommittedAt: '2026-04-15T00:00:00.000Z',
        publishedAt: '2026-04-16T00:00:00.000Z',
        specPath: 'published/current/FPF-Spec.md',
        snapshotPath: 'published/current/fpf-index/snapshot.json',
        specBytes: Buffer.byteLength(SPEC_TEXT),
      })}\n`,
    );
  });

  afterEach(async () => {
    await rm(tempRoot, { recursive: true, force: true });
  });

  it('copies published spec + snapshot into the hosted staging tree', async () => {
    await mkdir(resolve(hostedPublicDir, '.runtime/fpf-index'), { recursive: true });
    await writeFile(resolve(hostedPublicDir, 'FPF-spec.md'), '# stale legacy spec\n');
    await writeFile(resolve(hostedPublicDir, '.runtime/fpf-index/snapshot.json'), '{}\n');

    const manifest = await stageFromPublished(
      {
        sourcePath: publishedSpecPath,
        runtimeArtifactDir: publishedArtifactDir,
        distDir: resolve(tempRoot, 'dist'),
        hostedPublicDir,
        docsRoot: resolve(tempRoot, 'docs'),
      },
      {
        publishedSpecPath,
        publishedArtifactDir,
        publishedManifestPath,
      },
    );

    expect(manifest.ownerContext).toBe('Ctx.Build');
    expect(manifest.lifecycleState).toBe('operation');
    expect(manifest.artifacts).toEqual([
      {
        kind: 'runtime_source',
        sourcePath: publishedSpecPath,
        outputPath: resolve(hostedPublicDir, HOSTED_STAGED_SOURCE_PATH),
        consumer: 'hosted',
      },
      {
        kind: 'runtime_snapshot',
        sourcePath: resolve(publishedArtifactDir, ARTIFACT_FILENAMES.snapshot),
        outputPath: resolve(
          hostedPublicDir,
          HOSTED_STAGED_ARTIFACT_DIR,
          ARTIFACT_FILENAMES.snapshot,
        ),
        consumer: 'hosted',
      },
      {
        kind: 'runtime_manifest',
        sourcePath: publishedManifestPath,
        outputPath: resolve(hostedPublicDir, HOSTED_STAGED_MANIFEST_PATH),
        consumer: 'hosted',
      },
    ]);

    expect(await readFile(resolve(hostedPublicDir, HOSTED_STAGED_SOURCE_PATH), 'utf8')).toBe(
      SPEC_TEXT,
    );
    expect(
      await readFile(
        resolve(hostedPublicDir, HOSTED_STAGED_ARTIFACT_DIR, ARTIFACT_FILENAMES.snapshot),
        'utf8',
      ),
    ).toBe(
      `${JSON.stringify({
        sourceHash: SOURCE_HASH,
        sourcePath: 'published/current/FPF-Spec.md',
        builtAt: '2026-04-16T00:00:00.000Z',
        compilerFingerprint,
      })}\n`,
    );
    expect(await readFile(resolve(hostedPublicDir, HOSTED_STAGED_MANIFEST_PATH), 'utf8')).toBe(
      `${JSON.stringify({
        channel: 'latest-published',
        sourceHash: SOURCE_HASH,
        compilerFingerprint,
        upstreamRef: 'a'.repeat(40),
        upstreamRepoUrl: 'https://github.com/ailev/FPF',
        upstreamCommittedAt: '2026-04-15T00:00:00.000Z',
        publishedAt: '2026-04-16T00:00:00.000Z',
        specPath: 'published/current/FPF-Spec.md',
        snapshotPath: 'published/current/fpf-index/snapshot.json',
        specBytes: Buffer.byteLength(SPEC_TEXT),
      })}\n`,
    );
    await expect(readFile(resolve(hostedPublicDir, 'FPF-spec.md'), 'utf8')).rejects.toThrow(
      /ENOENT/,
    );
    await expect(
      readFile(resolve(hostedPublicDir, '.runtime/fpf-index/snapshot.json'), 'utf8'),
    ).rejects.toThrow(/ENOENT/);

    // Fix for #48: staged paths must live outside any dotfile directory so
    // the hosted bundle zip step doesn't silently drop them.
    expect(HOSTED_STAGED_SOURCE_PATH.startsWith('.')).toBe(false);
    expect(HOSTED_STAGED_ARTIFACT_DIR.startsWith('.')).toBe(false);
    expect(HOSTED_STAGED_MANIFEST_PATH.startsWith('.')).toBe(false);
    expect(
      HOSTED_STAGED_SOURCE_PATH.split('/').every((segment) => !segment.startsWith('.')),
    ).toBe(true);
    expect(
      HOSTED_STAGED_ARTIFACT_DIR.split('/').every((segment) => !segment.startsWith('.')),
    ).toBe(true);
    expect(
      HOSTED_STAGED_MANIFEST_PATH.split('/').every((segment) => !segment.startsWith('.')),
    ).toBe(true);
  });

  it('fails fast when the publication surface was never prepared', async () => {
    await rm(publishedManifestPath);
    await expect(
      stageFromPublished(
        {
          sourcePath: publishedSpecPath,
          runtimeArtifactDir: publishedArtifactDir,
          distDir: resolve(tempRoot, 'dist'),
          hostedPublicDir,
          docsRoot: resolve(tempRoot, 'docs'),
        },
        {
          publishedSpecPath,
          publishedArtifactDir,
          publishedManifestPath,
        },
      ),
    ).rejects.toThrow(/Run `bun run publish:current`/);
  });

  it('fails fast when the committed publication spec is missing', async () => {
    await rm(publishedSpecPath);

    await expect(
      stageFromPublished(
        {
          sourcePath: publishedSpecPath,
          runtimeArtifactDir: publishedArtifactDir,
          distDir: resolve(tempRoot, 'dist'),
          hostedPublicDir,
          docsRoot: resolve(tempRoot, 'docs'),
        },
        {
          publishedSpecPath,
          publishedArtifactDir,
          publishedManifestPath,
        },
      ),
    ).rejects.toThrow(/published spec missing/);
  });

  it('fails fast when the committed publication snapshot is missing', async () => {
    await rm(resolve(publishedArtifactDir, ARTIFACT_FILENAMES.snapshot));

    await expect(
      stageFromPublished(
        {
          sourcePath: publishedSpecPath,
          runtimeArtifactDir: publishedArtifactDir,
          distDir: resolve(tempRoot, 'dist'),
          hostedPublicDir,
          docsRoot: resolve(tempRoot, 'docs'),
        },
        {
          publishedSpecPath,
          publishedArtifactDir,
          publishedManifestPath,
        },
      ),
    ).rejects.toThrow(/published snapshot missing/);
  });

  it('fails fast when the committed publication surface is incoherent', async () => {
    await writeFile(
      publishedManifestPath,
      `${JSON.stringify({
        channel: 'latest-published',
        sourceHash: 'sha256:not-the-spec',
        compilerFingerprint,
        upstreamRef: 'a'.repeat(40),
        upstreamRepoUrl: 'https://github.com/ailev/FPF',
        upstreamCommittedAt: '2026-04-15T00:00:00.000Z',
        publishedAt: '2026-04-16T00:00:00.000Z',
        specPath: 'published/current/FPF-Spec.md',
        snapshotPath: 'published/current/fpf-index/snapshot.json',
        specBytes: Buffer.byteLength(SPEC_TEXT),
      })}\n`,
    );

    await expect(
      stageFromPublished(
        {
          sourcePath: publishedSpecPath,
          runtimeArtifactDir: publishedArtifactDir,
          distDir: resolve(tempRoot, 'dist'),
          hostedPublicDir,
          docsRoot: resolve(tempRoot, 'docs'),
        },
        {
          publishedSpecPath,
          publishedArtifactDir,
          publishedManifestPath,
        },
      ),
    ).rejects.toThrow(/sourceHash/);
  });
});
