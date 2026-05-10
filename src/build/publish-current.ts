import { createHash } from 'node:crypto';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

import { z } from 'zod';

import { parseRuntimeCoreConfig } from '../adapters/infra/config/env.js';
import { createConfiguredRuntime } from '../composition/runtime.js';
import {
  ARTIFACT_FILENAMES,
  PUBLISHED_ARTIFACT_DIR,
  PUBLISHED_MANIFEST_PATH,
  PUBLISHED_SPEC_PATH,
} from '../core/constants.js';
import { resolveRuntimePath } from '../runtime/path-resolution.js';
import {
  publicationSnapshotSchema,
  publishCurrentManifestSchema,
  type PublishCurrentManifest,
} from './published-surface.js';
import { computeCompilerFingerprint } from './compiler-fingerprint.js';

const publicationSnapshotInputSchema = publicationSnapshotSchema.extend({
  compilerFingerprint: z.string().optional(),
});

export interface PublishCurrentConfig {
  /** The working-copy spec path that feeds the publish run. Gitignored. */
  publishSourcePath: string;
  /** Tag committed into manifest.json so consumers know the upstream pin. */
  upstreamRef: string;
  /** GitHub repository the upstream ref lives in. Default: ailev/FPF. */
  upstreamOwner?: string;
  upstreamRepo?: string;
  /** Label shown on the wiki; defaults to `latest-published`. */
  channel: string;
  /** Overridable to make the module testable against a temp tree. */
  publishedSpecPath?: string;
  publishedArtifactDir?: string;
  publishedManifestPath?: string;
  /**
   * Resolver for the upstream commit metadata (resolved SHA + author
   * date). Defaults to the GitHub commits API; overridable in tests
   * to avoid hitting the network for fake refs.
   */
  resolveUpstreamCommit?: (
    ref: string,
    owner: string,
    repo: string,
  ) => Promise<{ sha: string; committedAt: string }>;
}

const FALLBACK_UPSTREAM_OWNER = 'ailev';
const FALLBACK_UPSTREAM_REPO = 'FPF';

async function defaultResolveUpstreamCommit(
  ref: string,
  owner: string,
  repo: string,
): Promise<{ sha: string; committedAt: string }> {
  const url = `https://api.github.com/repos/${owner}/${repo}/commits/${encodeURIComponent(ref)}`;
  const response = await fetch(url, {
    headers: { Accept: 'application/vnd.github+json' },
  });
  if (!response.ok) {
    throw new Error(
      `publish-current: GitHub API ${response.status} for ${url}`,
    );
  }
  const body = (await response.json()) as {
    sha: string;
    commit: { author: { date: string }; committer: { date: string } };
  };
  // Prefer author date — committer date can drift if the commit was
  // rebased or amended downstream.
  return {
    sha: body.sha,
    committedAt: body.commit.author?.date ?? body.commit.committer.date,
  };
}

/**
 * Compile the runtime snapshot for the given working-copy spec and write
 * the `published/current/**` publication surface that CI + docs consume.
 *
 * Owned by local pre-push — see `scripts/publish-current.ts`.
 */
export async function publishCurrent(
  config: PublishCurrentConfig,
  env: NodeJS.ProcessEnv,
): Promise<PublishCurrentManifest> {
  const cwd = process.cwd();
  const publishSourcePath = resolve(cwd, config.publishSourcePath);
  const sourceBytes = await readFile(publishSourcePath);
  const publishedSpecPath = resolve(cwd, config.publishedSpecPath ?? PUBLISHED_SPEC_PATH);
  const publishedArtifactDir = resolve(
    cwd,
    config.publishedArtifactDir ?? PUBLISHED_ARTIFACT_DIR,
  );
  const publishedSnapshotPath = resolve(publishedArtifactDir, ARTIFACT_FILENAMES.snapshot);
  const publishedManifestPath = resolve(
    cwd,
    config.publishedManifestPath ?? PUBLISHED_MANIFEST_PATH,
  );
  const specBytes = sourceBytes.byteLength;
  const sourceHash = `sha256:${createHash('sha256').update(sourceBytes).digest('hex')}`;
  const compilerFingerprint = await computeCompilerFingerprint();
  const existingManifest = await readExistingManifest(publishedManifestPath);

  // Compile against the publish source (the user's upstream working copy),
  // not whatever FPF_SPEC_SOURCE_PATH points at — that typically resolves to
  // the committed publication surface, i.e. the file we're about to rewrite.
  const runtimeEnv: NodeJS.ProcessEnv = {
    ...env,
    FPF_SPEC_SOURCE_PATH: publishSourcePath,
  };
  const runtimeConfig = parseRuntimeCoreConfig(runtimeEnv);
  const { runtime } = createConfiguredRuntime(runtimeEnv);
  await runtime.refresh(
    shouldRebuildForCompilerFingerprint(existingManifest, compilerFingerprint),
  );

  const sourceResolution = resolveRuntimePath(publishSourcePath, { kind: 'file' });
  const runtimeArtifactDir = resolveRuntimePath(
    resolve(sourceResolution.root, runtimeConfig.artifactDir),
    { kind: 'directory' },
  ).path;
  const snapshotSourcePath = resolve(runtimeArtifactDir, ARTIFACT_FILENAMES.snapshot);
  const snapshotBytes = await readFile(snapshotSourcePath);
  const normalizedSnapshotBytes = await normalizeSnapshotForPublication(
    snapshotBytes,
    config.publishedSpecPath ?? PUBLISHED_SPEC_PATH,
    publishedSnapshotPath,
    compilerFingerprint,
  );
  // Resolve the upstream ref to an immutable SHA + commit date so the
  // manifest records exactly which `ailev/FPF` revision this snapshot
  // is a projection of. The "Last Updated" footer on every doc page
  // and the home-page provenance line both read this date.
  const upstreamOwner = config.upstreamOwner ?? FALLBACK_UPSTREAM_OWNER;
  const upstreamRepo = config.upstreamRepo ?? FALLBACK_UPSTREAM_REPO;
  const resolveCommit = config.resolveUpstreamCommit ?? defaultResolveUpstreamCommit;
  const upstreamCommit = await resolveCommit(
    config.upstreamRef,
    upstreamOwner,
    upstreamRepo,
  );
  const upstreamRepoUrl = `https://github.com/${upstreamOwner}/${upstreamRepo}`;

  const manifestWithoutTimestamp = {
    channel: config.channel,
    sourceHash,
    compilerFingerprint,
    upstreamRef: upstreamCommit.sha,
    upstreamRepoUrl,
    upstreamCommittedAt: upstreamCommit.committedAt,
    specPath: config.publishedSpecPath ?? PUBLISHED_SPEC_PATH,
    snapshotPath: `${config.publishedArtifactDir ?? PUBLISHED_ARTIFACT_DIR}/${ARTIFACT_FILENAMES.snapshot}`,
    specBytes,
  };

  if (
    existingManifest
    && isSamePublicationManifest(existingManifest, manifestWithoutTimestamp)
    && await filesMatch(publishedSpecPath, sourceBytes)
    && await filesMatch(publishedSnapshotPath, normalizedSnapshotBytes)
  ) {
    return existingManifest;
  }

  await rm(publishedArtifactDir, { recursive: true, force: true });
  await mkdir(publishedArtifactDir, { recursive: true });
  await mkdir(dirname(publishedSpecPath), { recursive: true });

  await writeFile(publishedSpecPath, sourceBytes);
  await writeFile(publishedSnapshotPath, normalizedSnapshotBytes);

  const manifest: PublishCurrentManifest = {
    ...manifestWithoutTimestamp,
    publishedAt: new Date().toISOString(),
  };

  await writeFile(publishedManifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  return manifest;
}

function shouldRebuildForCompilerFingerprint(
  existingManifest: PublishCurrentManifest | undefined,
  compilerFingerprint: string,
): boolean {
  return existingManifest?.compilerFingerprint !== compilerFingerprint;
}

async function readExistingManifest(
  manifestPath: string,
): Promise<PublishCurrentManifest | undefined> {
  try {
    const text = await readFile(manifestPath, 'utf8');
    const parsed = JSON.parse(text);
    const result = publishCurrentManifestSchema.safeParse(parsed);
    return result.success ? result.data : undefined;
  } catch {
    return undefined;
  }
}

function isSamePublicationManifest(
  existingManifest: PublishCurrentManifest,
  manifestWithoutTimestamp: Omit<PublishCurrentManifest, 'publishedAt'>,
): boolean {
  return existingManifest.channel === manifestWithoutTimestamp.channel
    && existingManifest.sourceHash === manifestWithoutTimestamp.sourceHash
    && existingManifest.compilerFingerprint === manifestWithoutTimestamp.compilerFingerprint
    && existingManifest.upstreamRef === manifestWithoutTimestamp.upstreamRef
    && existingManifest.upstreamRepoUrl === manifestWithoutTimestamp.upstreamRepoUrl
    && existingManifest.upstreamCommittedAt === manifestWithoutTimestamp.upstreamCommittedAt
    && existingManifest.specPath === manifestWithoutTimestamp.specPath
    && existingManifest.snapshotPath === manifestWithoutTimestamp.snapshotPath
    && existingManifest.specBytes === manifestWithoutTimestamp.specBytes;
}

async function filesMatch(filePath: string, expectedBytes: Buffer): Promise<boolean> {
  try {
    const actualBytes = await readFile(filePath);
    return actualBytes.equals(expectedBytes);
  } catch {
    return false;
  }
}

async function normalizeSnapshotForPublication(
  snapshotBytes: Buffer,
  publishedSpecPath: string,
  publishedSnapshotPath: string,
  compilerFingerprint: string,
): Promise<Buffer> {
  const currentSnapshot = parsePublicationSnapshot(snapshotBytes);
  if (!currentSnapshot) {
    return snapshotBytes;
  }

  const existingSnapshotBytes = await readFileIfExists(publishedSnapshotPath);
  const existingSnapshot = existingSnapshotBytes
    ? parsePublicationSnapshot(existingSnapshotBytes)
    : undefined;
  const normalizedCurrent = {
    ...currentSnapshot,
    sourcePath: publishedSpecPath,
    compilerFingerprint,
  };
  const canPreserveBuiltAt =
    existingSnapshot
    && comparableSnapshotShape(existingSnapshot, publishedSpecPath)
      === comparableSnapshotShape(normalizedCurrent, publishedSpecPath);
  const normalizedSnapshot = {
    ...normalizedCurrent,
    builtAt: canPreserveBuiltAt ? existingSnapshot.builtAt : currentSnapshot.builtAt,
  };

  return Buffer.from(`${JSON.stringify(normalizedSnapshot, null, 2)}\n`);
}

function parsePublicationSnapshot(bytes: Buffer) {
  try {
    const parsed = JSON.parse(bytes.toString('utf8'));
    const result = publicationSnapshotInputSchema.safeParse(parsed);
    return result.success ? result.data : undefined;
  } catch {
    return undefined;
  }
}

function comparableSnapshotShape(
  snapshot: z.infer<typeof publicationSnapshotInputSchema>,
  publishedSpecPath: string,
): string {
  const comparable = {
    ...snapshot,
    sourcePath: publishedSpecPath,
  };
  const { builtAt: _builtAt, ...withoutBuiltAt } = comparable;
  return JSON.stringify(sortJsonValue(withoutBuiltAt));
}

function sortJsonValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortJsonValue);
  }
  if (!value || typeof value !== 'object') {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, entryValue]) => [key, sortJsonValue(entryValue)]),
  );
}

async function readFileIfExists(filePath: string): Promise<Buffer | undefined> {
  try {
    return await readFile(filePath);
  } catch {
    return undefined;
  }
}
