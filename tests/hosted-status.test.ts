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
import {
  createHostedComposition,
  HOSTED_FPF_STATUS_ROUTE,
} from '../src/composition/hosted.js';
import { readHostedFpfStatus } from '../src/adapters/hosted/status-page.js';

describe('hosted FPF status endpoint', () => {
  let tempRoot: string;

  beforeEach(async () => {
    tempRoot = await mkdtemp(resolve(tmpdir(), 'fpf-hosted-status-'));
  });

  afterEach(async () => {
    await rm(tempRoot, { recursive: true, force: true });
  });

  it('serves publication and freshness evidence from the hosted app', async () => {
    const { app } = createHostedComposition({
      ...process.env,
      PORT: '0',
    } as NodeJS.ProcessEnv);

    const response = await app.request(HOSTED_FPF_STATUS_ROUTE);
    const body = await response.json() as {
      status: string;
      statusMeaning: string;
      publication: {
        upstreamRef: string;
        upstreamDate: string;
        sourceHash: string;
        publishedAt: string;
      };
      runtime: {
        snapshotConsistent: boolean;
        artifactBuiltAt: string;
        artifactSourceHash: string;
        currentSourceHash: string;
        compilerMode: string;
        fresh?: boolean;
      };
      freshness: {
        snapshotConsistent: boolean;
        publicationCurrentAgainstConfiguredSource: boolean;
        freshnessBasis: string;
        upstreamCurrentness: string;
      };
    };

    expect(response.status).toBe(200);
    expect(response.headers.get('Cache-Control')).toBe('no-store');
    expect(body.status).toBe('ok');
    expect(body.statusMeaning).toContain('internally consistent');
    expect(body.publication.upstreamRef).toMatch(/^[0-9a-f]{40}$/);
    expect(body.publication.upstreamDate).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(body.publication.sourceHash).toMatch(/^sha256:/);
    expect(body.publication.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(body.runtime.fresh).toBeUndefined();
    expect(body.runtime.snapshotConsistent).toBe(true);
    expect(body.runtime.artifactBuiltAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(body.runtime.artifactSourceHash).toBe(body.publication.sourceHash);
    expect(body.runtime.currentSourceHash).toBe(body.publication.sourceHash);
    expect(body.runtime.compilerMode).toBe('local_vectorless');
    expect(body.freshness.snapshotConsistent).toBe(true);
    expect(body.freshness.publicationCurrentAgainstConfiguredSource).toBe(true);
    expect(body.freshness.freshnessBasis).toBe('source_hash_match');
    expect(body.freshness.upstreamCurrentness).toBe('unknown');
  }, 20_000);

  it('reads hosted staged manifest, source, and snapshot when present', async () => {
    const specText = '# Fake FPF\n\nHosted status fixture.\n';
    const sourceHash = `sha256:${createHash('sha256').update(specText).digest('hex')}`;
    await writeHostedStage({
      root: tempRoot,
      specText,
      sourceHash,
      snapshotSourceHash: sourceHash,
      upstreamRef: '1234567890abcdef1234567890abcdef12345678',
    });

    const status = await readHostedFpfStatus({ cwd: tempRoot });

    expect(status.status).toBe('ok');
    expect(status.publication.upstreamRef).toBe('1234567890abcdef1234567890abcdef12345678');
    expect(status.publication.upstreamDate).toBe('2026-05-08T17:00:40Z');
    expect(status.publication.specBytes).toBe(Buffer.byteLength(specText));
    expect(status.runtime.snapshotConsistent).toBe(true);
    expect(status.runtime.artifactSourceMatchesConfiguredSource).toBe(true);
    expect(status.runtime.artifactBuiltAt).toBe('2026-05-09T00:00:00.000Z');
    expect(status.runtime.sourcePath).toBe(HOSTED_STAGED_SOURCE_PATH);
    expect(status.runtime.manifestPath).toBe(HOSTED_STAGED_MANIFEST_PATH);
    expect(status.freshness.publicationCurrentAgainstConfiguredSource).toBe(true);
    expect(status.freshness.freshnessBasis).toBe('source_hash_match');
    expect(status.freshness.upstreamCurrentness).toBe('unknown');
  });

  it('reports stale internal consistency without implying upstream currentness', async () => {
    const specText = '# Fake FPF\n\nHosted status fixture.\n';
    const sourceHash = `sha256:${createHash('sha256').update(specText).digest('hex')}`;
    await writeHostedStage({
      root: tempRoot,
      specText,
      sourceHash,
      snapshotSourceHash: 'sha256:stale',
      upstreamRef: '1234567890abcdef1234567890abcdef12345678',
    });

    const status = await readHostedFpfStatus({ cwd: tempRoot });

    expect(status.status).toBe('stale');
    expect(status.runtime.snapshotConsistent).toBe(false);
    expect(status.runtime.artifactSourceMatchesConfiguredSource).toBe(false);
    expect(status.runtime.currentSourceHash).toBe(sourceHash);
    expect(status.runtime.snapshotSourceHash).toBe('sha256:stale');
    expect(status.freshness.snapshotConsistent).toBe(false);
    expect(status.freshness.publicationCurrentAgainstConfiguredSource).toBe(false);
    expect(status.freshness.freshnessBasis).toBe('unknown');
    expect(status.freshness.upstreamCurrentness).toBe('unknown');
  });
});

async function writeHostedStage(input: {
  root: string;
  specText: string;
  sourceHash: string;
  snapshotSourceHash: string;
  upstreamRef: string;
}) {
  const compilerFingerprint = 'sha256:compiler';
  await mkdir(resolve(input.root, HOSTED_STAGED_ARTIFACT_DIR), { recursive: true });
  await writeFile(resolve(input.root, HOSTED_STAGED_SOURCE_PATH), input.specText);
  await writeFile(
    resolve(input.root, HOSTED_STAGED_ARTIFACT_DIR, ARTIFACT_FILENAMES.snapshot),
    `${JSON.stringify({
      sourceHash: input.snapshotSourceHash,
      sourcePath: 'published/current/FPF-Spec.md',
      builtAt: '2026-05-09T00:00:00.000Z',
      compilerFingerprint,
    })}\n`,
  );
  await writeFile(
    resolve(input.root, HOSTED_STAGED_MANIFEST_PATH),
    `${JSON.stringify({
      channel: 'latest-published',
      sourceHash: input.sourceHash,
      compilerFingerprint,
      upstreamRef: input.upstreamRef,
      upstreamRepoUrl: 'https://github.com/ailev/FPF',
      upstreamCommittedAt: '2026-05-08T17:00:40Z',
      publishedAt: '2026-05-09T00:00:00.000Z',
      specPath: 'published/current/FPF-Spec.md',
      snapshotPath: 'published/current/fpf-index/snapshot.json',
      specBytes: Buffer.byteLength(input.specText),
    })}\n`,
  );

  // Assert fixture path is real, so failures read as setup mistakes rather
  // than endpoint behavior.
  await readFile(resolve(input.root, HOSTED_STAGED_MANIFEST_PATH));
}
