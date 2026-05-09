import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

import {
  publishCurrentManifestSchema,
  publicationSnapshotSchema,
} from '../../build/published-surface.js';
import {
  ARTIFACT_FILENAMES,
  HOSTED_STAGED_ARTIFACT_DIR,
  HOSTED_STAGED_MANIFEST_PATH,
  HOSTED_STAGED_SOURCE_PATH,
  PUBLISHED_ARTIFACT_DIR,
  PUBLISHED_MANIFEST_PATH,
  PUBLISHED_SPEC_PATH,
} from '../../core/constants.js';
import { resolveRuntimePath } from '../../runtime/path-resolution.js';

export const HOSTED_FPF_STATUS_ROUTE = '/api/fpf/status';

export interface HostedFpfStatusOptions {
  cwd?: string;
  moduleUrl?: string;
}

export interface HostedFpfStatus {
  status: 'ok' | 'stale';
  servedAt: string;
  publication: {
    channel: string;
    upstreamRef: string;
    publishedAt: string;
    sourceHash: string;
    compilerFingerprint: string;
    specPath: string;
    snapshotPath: string;
    specBytes: number;
  };
  runtime: {
    sourcePath: string;
    snapshotPath: string;
    manifestPath: string;
    sourceHash: string;
    snapshotSourceHash: string;
    currentSourceHash: string;
    builtAt: string;
    snapshotExists: boolean;
    fresh: boolean;
    compilerMode: 'local_vectorless';
  };
}

export async function readHostedFpfStatus(
  options: HostedFpfStatusOptions = {},
): Promise<HostedFpfStatus> {
  const sourcePath = resolveHostedOrPublishedPath(
    HOSTED_STAGED_SOURCE_PATH,
    PUBLISHED_SPEC_PATH,
    {
      ...options,
      kind: 'file',
    },
  );
  const snapshotPath = resolveHostedOrPublishedPath(
    `${HOSTED_STAGED_ARTIFACT_DIR}/${ARTIFACT_FILENAMES.snapshot}`,
    `${PUBLISHED_ARTIFACT_DIR}/${ARTIFACT_FILENAMES.snapshot}`,
    {
      ...options,
      kind: 'file',
    },
  );
  const manifestPath = resolveHostedOrPublishedPath(
    HOSTED_STAGED_MANIFEST_PATH,
    PUBLISHED_MANIFEST_PATH,
    {
      ...options,
      kind: 'file',
    },
  );

  const [sourceBytes, snapshotBytes, manifestBytes] = await Promise.all([
    readFile(sourcePath.absolutePath),
    readFile(snapshotPath.absolutePath),
    readFile(manifestPath.absolutePath),
  ]);
  const manifest = publishCurrentManifestSchema.parse(
    JSON.parse(manifestBytes.toString('utf8')),
  );
  const snapshot = publicationSnapshotSchema.parse(JSON.parse(snapshotBytes.toString('utf8')));
  const currentSourceHash = `sha256:${createHash('sha256').update(sourceBytes).digest('hex')}`;
  const fresh =
    manifest.sourceHash === currentSourceHash
    && snapshot.sourceHash === currentSourceHash
    && manifest.compilerFingerprint === snapshot.compilerFingerprint
    && manifest.specBytes === sourceBytes.byteLength;

  return {
    status: fresh ? 'ok' : 'stale',
    servedAt: new Date().toISOString(),
    publication: {
      channel: manifest.channel,
      upstreamRef: manifest.upstreamRef,
      publishedAt: manifest.publishedAt,
      sourceHash: manifest.sourceHash,
      compilerFingerprint: manifest.compilerFingerprint,
      specPath: manifest.specPath,
      snapshotPath: manifest.snapshotPath,
      specBytes: manifest.specBytes,
    },
    runtime: {
      sourcePath: sourcePath.publicPath,
      snapshotPath: snapshotPath.publicPath,
      manifestPath: manifestPath.publicPath,
      sourceHash: snapshot.sourceHash,
      snapshotSourceHash: snapshot.sourceHash,
      currentSourceHash,
      builtAt: snapshot.builtAt,
      snapshotExists: true,
      fresh,
      compilerMode: 'local_vectorless',
    },
  };
}

function resolveHostedOrPublishedPath(
  hostedPath: string,
  publishedPath: string,
  options: HostedFpfStatusOptions & { kind: 'file' },
): { absolutePath: string; publicPath: string } {
  const hosted = resolveRuntimePath(hostedPath, options);
  if (hosted.existed) {
    return { absolutePath: hosted.path, publicPath: hostedPath };
  }

  return {
    absolutePath: resolveRuntimePath(publishedPath, options).path,
    publicPath: publishedPath,
  };
}
