import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { z } from 'zod';

import {
  ARTIFACT_FILENAMES,
  PUBLISHED_ARTIFACT_DIR,
  PUBLISHED_MANIFEST_PATH,
  PUBLISHED_SPEC_PATH,
} from '../core/constants.js';

export interface PublishCurrentManifest {
  channel: string;
  sourceHash: string;
  upstreamRef: string;
  publishedAt: string;
  specPath: string;
  snapshotPath: string;
  specBytes: number;
}

export const publishCurrentManifestSchema = z.object({
  channel: z.string(),
  sourceHash: z.string(),
  upstreamRef: z.string(),
  publishedAt: z.string(),
  specPath: z.string(),
  snapshotPath: z.string(),
  specBytes: z.number(),
});

export const publicationSnapshotSchema = z.object({
  sourceHash: z.string(),
  sourcePath: z.string(),
  builtAt: z.string(),
}).passthrough();

export type PublicationSnapshot = z.infer<typeof publicationSnapshotSchema>;

export interface PublishedSurfaceOptions {
  cwd?: string;
  publishedSpecPath?: string;
  publishedArtifactDir?: string;
  publishedManifestPath?: string;
  expectedSpecPath?: string;
  expectedSnapshotPath?: string;
}

export interface ResolvedPublishedSurfacePaths {
  publishedSpecPath: string;
  publishedSnapshotPath: string;
  publishedManifestPath: string;
  expectedSpecPath: string;
  expectedSnapshotPath: string;
}

export interface ValidatedPublishedSurface {
  paths: ResolvedPublishedSurfacePaths;
  manifest: PublishCurrentManifest;
  snapshot: PublicationSnapshot;
  sourceHash: string;
  specBytes: number;
}

export function resolvePublishedSurfacePaths(
  options: PublishedSurfaceOptions = {},
): ResolvedPublishedSurfacePaths {
  const cwd = resolve(options.cwd ?? process.cwd());
  const publishedSpecPath = resolve(cwd, options.publishedSpecPath ?? PUBLISHED_SPEC_PATH);
  const publishedArtifactDir = resolve(
    cwd,
    options.publishedArtifactDir ?? PUBLISHED_ARTIFACT_DIR,
  );

  return {
    publishedSpecPath,
    publishedSnapshotPath: resolve(publishedArtifactDir, ARTIFACT_FILENAMES.snapshot),
    publishedManifestPath: resolve(
      cwd,
      options.publishedManifestPath ?? PUBLISHED_MANIFEST_PATH,
    ),
    expectedSpecPath: options.expectedSpecPath ?? PUBLISHED_SPEC_PATH,
    expectedSnapshotPath:
      options.expectedSnapshotPath
      ?? `${PUBLISHED_ARTIFACT_DIR}/${ARTIFACT_FILENAMES.snapshot}`,
  };
}

export async function validatePublishedSurface(
  options: PublishedSurfaceOptions = {},
): Promise<ValidatedPublishedSurface> {
  const paths = resolvePublishedSurfacePaths(options);
  const specBytes = await readRequiredFile(paths.publishedSpecPath, 'published spec');
  const snapshotBytes = await readRequiredFile(paths.publishedSnapshotPath, 'published snapshot');
  const manifestBytes = await readRequiredFile(paths.publishedManifestPath, 'published manifest');
  const manifest = parseManifest(manifestBytes, paths.publishedManifestPath);
  const snapshot = parseSnapshot(snapshotBytes, paths.publishedSnapshotPath);
  const sourceHash = `sha256:${createHash('sha256').update(specBytes).digest('hex')}`;

  if (manifest.sourceHash !== sourceHash) {
    throw new Error(
      `published surface manifest sourceHash ${manifest.sourceHash} does not match ${sourceHash} for ${paths.expectedSpecPath}.`,
    );
  }
  if (snapshot.sourceHash !== sourceHash) {
    throw new Error(
      `published surface snapshot sourceHash ${snapshot.sourceHash} does not match ${sourceHash} for ${paths.expectedSpecPath}.`,
    );
  }
  if (manifest.specBytes !== specBytes.byteLength) {
    throw new Error(
      `published surface manifest specBytes ${manifest.specBytes} does not match ${specBytes.byteLength} bytes for ${paths.expectedSpecPath}.`,
    );
  }
  if (manifest.specPath !== paths.expectedSpecPath) {
    throw new Error(
      `published surface manifest specPath ${manifest.specPath} does not match ${paths.expectedSpecPath}.`,
    );
  }
  if (manifest.snapshotPath !== paths.expectedSnapshotPath) {
    throw new Error(
      `published surface manifest snapshotPath ${manifest.snapshotPath} does not match ${paths.expectedSnapshotPath}.`,
    );
  }
  if (snapshot.sourcePath !== paths.expectedSpecPath) {
    throw new Error(
      `published surface snapshot sourcePath ${snapshot.sourcePath} does not match ${paths.expectedSpecPath}.`,
    );
  }

  return {
    paths,
    manifest,
    snapshot,
    sourceHash,
    specBytes: specBytes.byteLength,
  };
}

async function readRequiredFile(filePath: string, label: string): Promise<Buffer> {
  try {
    return await readFile(filePath);
  } catch {
    throw new Error(
      `published surface ${label} missing at ${filePath}. Run \`bun run publish:current\` locally before pushing.`,
    );
  }
}

function parseManifest(bytes: Buffer, filePath: string): PublishCurrentManifest {
  try {
    const parsed = JSON.parse(bytes.toString('utf8'));
    return publishCurrentManifestSchema.parse(parsed);
  } catch {
    throw new Error(`published surface manifest is invalid JSON or schema-invalid at ${filePath}.`);
  }
}

function parseSnapshot(bytes: Buffer, filePath: string): PublicationSnapshot {
  try {
    const parsed = JSON.parse(bytes.toString('utf8'));
    return publicationSnapshotSchema.parse(parsed);
  } catch {
    throw new Error(`published surface snapshot is invalid JSON or schema-invalid at ${filePath}.`);
  }
}
