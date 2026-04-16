import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

import { parseRuntimeCoreConfig } from '../adapters/infra/config/env.js';
import { createConfiguredRuntime } from '../composition/runtime.js';
import {
  ARTIFACT_FILENAMES,
  PUBLISHED_ARTIFACT_DIR,
  PUBLISHED_MANIFEST_PATH,
  PUBLISHED_SPEC_PATH,
} from '../core/constants.js';

export interface PublishCurrentConfig {
  /** The working-copy spec path that feeds the publish run. Gitignored. */
  publishSourcePath: string;
  /** Tag committed into manifest.json so consumers know the upstream pin. */
  upstreamRef: string;
  /** Label shown on the wiki; defaults to `latest-published`. */
  channel: string;
  /** Overridable to make the module testable against a temp tree. */
  publishedSpecPath?: string;
  publishedArtifactDir?: string;
  publishedManifestPath?: string;
}

export interface PublishCurrentManifest {
  channel: string;
  sourceHash: string;
  upstreamRef: string;
  publishedAt: string;
  specPath: string;
  snapshotPath: string;
  specBytes: number;
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

  // Compile against the publish source (the user's upstream working copy),
  // not whatever FPF_SPEC_SOURCE_PATH points at — that typically resolves to
  // the committed publication surface, i.e. the file we're about to rewrite.
  const runtimeEnv: NodeJS.ProcessEnv = {
    ...env,
    FPF_SPEC_SOURCE_PATH: publishSourcePath,
  };
  const runtimeConfig = parseRuntimeCoreConfig(runtimeEnv);
  const { runtime } = createConfiguredRuntime(runtimeEnv);
  await runtime.refresh(false);

  const runtimeArtifactDir = resolve(cwd, runtimeConfig.artifactDir);
  const snapshotSourcePath = resolve(runtimeArtifactDir, ARTIFACT_FILENAMES.snapshot);

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

  await rm(publishedArtifactDir, { recursive: true, force: true });
  await mkdir(publishedArtifactDir, { recursive: true });
  await mkdir(dirname(publishedSpecPath), { recursive: true });

  await copyFile(publishSourcePath, publishedSpecPath);
  await copyFile(snapshotSourcePath, publishedSnapshotPath);

  const specBytes = await readFile(publishedSpecPath);
  const sourceHash = `sha256:${createHash('sha256').update(specBytes).digest('hex')}`;

  const manifest: PublishCurrentManifest = {
    channel: config.channel,
    sourceHash,
    upstreamRef: config.upstreamRef,
    publishedAt: new Date().toISOString(),
    specPath: config.publishedSpecPath ?? PUBLISHED_SPEC_PATH,
    snapshotPath: `${config.publishedArtifactDir ?? PUBLISHED_ARTIFACT_DIR}/${ARTIFACT_FILENAMES.snapshot}`,
    specBytes: specBytes.byteLength,
  };

  await writeFile(publishedManifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  return manifest;
}
