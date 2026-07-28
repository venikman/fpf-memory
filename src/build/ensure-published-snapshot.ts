import { createHash } from 'node:crypto';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

import {
  publishCurrent,
  type PublishCurrentConfig,
} from './publish-current.js';
import {
  publishCurrentManifestSchema,
  resolvePublishedSurfacePaths,
  validatePublishedSurface,
  type PublishCurrentManifest,
  type PublishedSurfaceOptions,
} from './published-surface.js';

export interface EnsurePublishedSnapshotOptions extends PublishedSurfaceOptions {
  /**
   * Overridable in tests to avoid the GitHub commits API. The default
   * resolver is exact and offline: `manifest.upstreamRef` is already an
   * immutable SHA (publish-current resolved it before committing), so the
   * committed manifest is the authority for both the SHA and its date.
   */
  resolveUpstreamCommit?: PublishCurrentConfig['resolveUpstreamCommit'];
  /** Overridable in tests to skip the upstream clone + `git blame` pipeline. */
  loadLineBlame?: PublishCurrentConfig['loadLineBlame'];
  env?: NodeJS.ProcessEnv;
}

export type EnsurePublishedSnapshotResult =
  | {
      status: 'present';
      upstreamRef: string;
    }
  | {
      status: 'regenerated';
      upstreamRef: string;
      snapshotSha256: string;
      blameNodes: number;
    };

/**
 * Make sure `published/current/fpf-index/snapshot.json` is the real derived
 * artifact, regenerating it deterministically from the committed
 * `published/current/FPF-Spec.md` + `manifest.json` when it is absent or
 * invalid (e.g. a fresh checkout after CR-1 removed the ~95MB snapshot from
 * git). The committed manifest is the provenance authority: regeneration must
 * leave the manifest and spec byte-identical, otherwise this checkout's
 * compiler no longer matches the committed publication and the caller must
 * republish instead of silently rewriting history.
 *
 * Rejection restores the pre-call bytes: `publishCurrent` rewrites the
 * tracked manifest/spec (and the snapshot) on disk before the drift check can
 * run, so every failure path below puts all three files back exactly as they
 * were found. A failed ensure therefore never mutates the publication surface
 * — in this repo's shared-checkout multi-agent workflow a freshly rewritten,
 * self-consistent manifest with stale upstream provenance would otherwise
 * pass `validate:published` and get folded into someone else's commit.
 */
export async function ensurePublishedSnapshot(
  options: EnsurePublishedSnapshotOptions = {},
): Promise<EnsurePublishedSnapshotResult> {
  const surfaceOptions: PublishedSurfaceOptions = {
    cwd: options.cwd,
    compilerRoot: options.compilerRoot,
    publishedSpecPath: options.publishedSpecPath,
    publishedArtifactDir: options.publishedArtifactDir,
    publishedManifestPath: options.publishedManifestPath,
    expectedSpecPath: options.expectedSpecPath,
    expectedSnapshotPath: options.expectedSnapshotPath,
  };
  const paths = resolvePublishedSurfacePaths(surfaceOptions);

  try {
    const surface = await validatePublishedSurface(surfaceOptions);
    return { status: 'present', upstreamRef: surface.manifest.upstreamRef };
  } catch {
    // Snapshot missing, an un-smudged LFS pointer, or otherwise incoherent —
    // fall through to deterministic regeneration from the committed manifest.
  }

  const manifest = await readCommittedManifest(paths.publishedManifestPath);
  const manifestBytesBefore = await readFile(paths.publishedManifestPath);
  const specBytesBefore = await readRequiredSpec(paths.publishedSpecPath);
  const snapshotBytesBefore = await readOptionalFile(paths.publishedSnapshotPath);

  // Undo publishCurrent's on-disk writes so a rejected ensure leaves the
  // checkout byte-identical to how it was found (see module docstring).
  const restorePreCallSurface = async (): Promise<void> => {
    await mkdir(dirname(paths.publishedManifestPath), { recursive: true });
    await writeFile(paths.publishedManifestPath, manifestBytesBefore);
    await mkdir(dirname(paths.publishedSpecPath), { recursive: true });
    await writeFile(paths.publishedSpecPath, specBytesBefore);
    if (snapshotBytesBefore === undefined) {
      await rm(paths.publishedSnapshotPath, { force: true });
    } else {
      await mkdir(dirname(paths.publishedSnapshotPath), { recursive: true });
      await writeFile(paths.publishedSnapshotPath, snapshotBytesBefore);
    }
  };

  const upstream = parseUpstreamRepo(manifest.upstreamRepoUrl);
  const resolveUpstreamCommit =
    options.resolveUpstreamCommit
    ?? (async () => ({
      sha: manifest.upstreamRef,
      committedAt: manifest.upstreamCommittedAt,
    }));

  await publishCurrent(
    {
      // The committed published spec is the publish source: regeneration is a
      // republish of exactly what is already committed.
      publishSourcePath: paths.publishedSpecPath,
      upstreamRef: manifest.upstreamRef,
      upstreamOwner: upstream?.owner,
      upstreamRepo: upstream?.repo,
      channel: manifest.channel,
      publishedSpecPath: options.publishedSpecPath,
      publishedArtifactDir: options.publishedArtifactDir,
      publishedManifestPath: options.publishedManifestPath,
      resolveUpstreamCommit,
      loadLineBlame: options.loadLineBlame,
    },
    options.env ?? process.env,
  );

  const manifestBytesAfter = await readFile(paths.publishedManifestPath);
  const specBytesAfter = await readRequiredSpec(paths.publishedSpecPath);
  if (
    !manifestBytesAfter.equals(manifestBytesBefore)
    || !specBytesAfter.equals(specBytesBefore)
  ) {
    await restorePreCallSurface();
    throw new Error(
      'published/current drifted under regeneration: this checkout\'s compiler '
      + 'fingerprint or spec no longer matches the committed manifest. Run '
      + '`bun run publish:current` and commit the result.',
    );
  }

  try {
    await validatePublishedSurface(surfaceOptions);
  } catch (error) {
    await restorePreCallSurface();
    throw error;
  }

  const snapshotBytes = await readFile(paths.publishedSnapshotPath);
  const blameNodes = countBlameEnrichedNodes(snapshotBytes);
  if (blameNodes < 1) {
    // Restore too: leaving the degraded-but-schema-valid snapshot on disk
    // would make the next ensure call return `present` and silently launder
    // the very blame loss this guard exists to catch.
    await restorePreCallSurface();
    throw new Error(
      'ensure-published-snapshot: upstream blame enrichment missing — the '
      + 'ailev/FPF clone (or injected blame loader) produced no per-line data; '
      + 'refusing to publish a degraded snapshot that would silently lose '
      + 'per-section lastCommittedAt dates.',
    );
  }

  return {
    status: 'regenerated',
    upstreamRef: manifest.upstreamRef,
    snapshotSha256: `sha256:${createHash('sha256').update(snapshotBytes).digest('hex')}`,
    blameNodes,
  };
}

async function readCommittedManifest(
  manifestPath: string,
): Promise<PublishCurrentManifest> {
  let text: string;
  try {
    text = await readFile(manifestPath, 'utf8');
  } catch {
    throw new Error(
      `ensure-published-snapshot: published manifest missing at ${manifestPath}; `
      + 'without committed provenance the snapshot cannot be regenerated. Run '
      + '`bun run publish:current` and commit the result.',
    );
  }

  try {
    return publishCurrentManifestSchema.parse(JSON.parse(text));
  } catch {
    throw new Error(
      `ensure-published-snapshot: published manifest is invalid JSON or schema-invalid at ${manifestPath}; `
      + 'without committed provenance the snapshot cannot be regenerated.',
    );
  }
}

async function readOptionalFile(path: string): Promise<Buffer | undefined> {
  try {
    return await readFile(path);
  } catch {
    return undefined;
  }
}

async function readRequiredSpec(specPath: string): Promise<Buffer> {
  try {
    return await readFile(specPath);
  } catch {
    throw new Error(
      `ensure-published-snapshot: published spec missing at ${specPath}; `
      + 'the committed spec is the regeneration source and cannot be absent.',
    );
  }
}

function parseUpstreamRepo(
  upstreamRepoUrl: string,
): { owner: string; repo: string } | undefined {
  const match = /^https:\/\/github\.com\/([^/]+)\/([^/]+?)\/?$/.exec(upstreamRepoUrl);
  if (!match || match[1] === undefined || match[2] === undefined) {
    return undefined;
  }
  return { owner: match[1], repo: match[2] };
}

function countBlameEnrichedNodes(snapshotBytes: Buffer): number {
  let parsed: unknown;
  try {
    parsed = JSON.parse(snapshotBytes.toString('utf8'));
  } catch {
    return 0;
  }
  if (!parsed || typeof parsed !== 'object') {
    return 0;
  }
  const indexMap = (parsed as { indexMap?: unknown }).indexMap;
  if (!indexMap || typeof indexMap !== 'object') {
    return 0;
  }
  let count = 0;
  for (const node of Object.values(indexMap as Record<string, unknown>)) {
    if (
      node
      && typeof node === 'object'
      && typeof (node as { lastCommittedAt?: unknown }).lastCommittedAt === 'string'
    ) {
      count += 1;
    }
  }
  return count;
}
