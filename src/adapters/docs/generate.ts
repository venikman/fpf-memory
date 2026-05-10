import { createHash } from 'node:crypto';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

import { z } from 'zod';

import {
  DEFAULT_SOURCE_PATH,
  PUBLISHED_ARTIFACT_DIR,
  PUBLISHED_MANIFEST_PATH,
} from '../../core/constants.js';
import { ARTIFACT_FILENAMES } from '../../runtime/constants.js';
import { compileFpfSource } from '../../runtime/compiler.js';
import type { Snapshot } from '../../runtime/types.js';
import type { ContextId, LifecycleState } from '../../core/governance.js';
import {
  buildDocsProjection,
  buildSearchIdRegistry,
  docsRelativePath,
  renderSearchIdRegistryModule,
  type PublicationManifestSummary,
} from '../../core/documents.js';

export interface GenerateDocsOptions {
  sourcePath?: string;
  docsRoot?: string;
  builtAt?: string;
  manifestPath?: string;
  /**
   * Path to the published snapshot.json. When present, per-section
   * blame stamps (lastCommittedAt / lastCommitSha) are lifted from
   * its `indexMap` and merged into the freshly compiled snapshot
   * by node ID. Defaults to `published/current/fpf-index/snapshot.json`.
   */
  publishedSnapshotPath?: string;
}

export interface GenerateDocsResult {
  sourcePath: string;
  sourceHash: string;
  builtAt: string;
  docsRoot: string;
  lifecycleState: LifecycleState;
  ownerContext: ContextId;
  generatedFiles: number;
  snapshot: Snapshot;
}

const publicationManifestSummarySchema = z.object({
  channel: z.string(),
  sourceHash: z.string(),
  upstreamRef: z.string(),
  publishedAt: z.string(),
  // Optional for backward compat: older snapshots predate these fields.
  // Builders that find them missing fall back to publishedAt + a generic
  // "FPF spec" link.
  upstreamRepoUrl: z.string().optional(),
  upstreamCommittedAt: z.string().optional(),
});

export async function generateDocsSite(
  options: GenerateDocsOptions = {},
): Promise<GenerateDocsResult> {
  const sourcePath = resolve(process.cwd(), options.sourcePath ?? DEFAULT_SOURCE_PATH);
  const docsRoot = resolve(process.cwd(), options.docsRoot ?? 'docs');
  const sourceText = await readFile(sourcePath, 'utf8');
  const sourceHash = `sha256:${createHash('sha256').update(sourceText).digest('hex')}`;
  const builtAt = options.builtAt ?? new Date().toISOString();
  const { snapshot } = compileFpfSource({
    sourcePath,
    sourceHash,
    builtAt,
    sourceText,
  });
  const manifest = await readPublicationManifest(
    resolve(process.cwd(), options.manifestPath ?? PUBLISHED_MANIFEST_PATH),
  );
  // Per-section blame stamps (lastCommittedAt / lastCommitSha) live
  // on each indexMap node in the PUBLISHED snapshot, attached at
  // publish time by `enrichSnapshotWithLineBlame`. compileFpfSource
  // here builds a fresh snapshot from source text and doesn't have
  // the blame data, so we lift it from the published snapshot when
  // available — same source = same node IDs, so the merge is safe.
  await mergeBlameFromPublishedSnapshot(snapshot, options.publishedSnapshotPath);
  const projection = buildDocsProjection(snapshot, manifest);
  const generatedRoot = resolve(docsRoot, 'generated');

  await rm(generatedRoot, { recursive: true, force: true });
  await mkdir(generatedRoot, { recursive: true });

  await Promise.all(
    projection.pages.map(async (page) => {
      const outputPath = resolve(docsRoot, docsRelativePath(page.markdownPath));
      await mkdir(dirname(outputPath), { recursive: true });
      await writeFile(outputPath, page.markdown);
    }),
  );

  // Write the search-hook registry alongside the generated docs so a
  // single `bun run docs:generate` is sufficient to refresh both the
  // markdown projection and the bundled search lookup table. Idempotent
  // — only writes when the content actually differs, so reruns on a
  // clean tree leave the working directory clean.
  const registryPath = resolve(process.cwd(), 'src/docs/generated-search-id-registry.ts');
  const registrySource = renderSearchIdRegistryModule(buildSearchIdRegistry(snapshot));
  let currentSource = '';
  try {
    currentSource = await readFile(registryPath, 'utf8');
  } catch {
    // registry not yet checked in — first generation
  }
  if (currentSource !== registrySource) {
    await writeFile(registryPath, registrySource);
  }

  return {
    sourcePath,
    sourceHash,
    builtAt,
    docsRoot,
    lifecycleState: 'evidence',
    ownerContext: 'Ctx.Docs',
    generatedFiles: projection.pages.length,
    snapshot,
  };
}

async function readPublicationManifest(
  manifestPath: string,
): Promise<PublicationManifestSummary | undefined> {
  try {
    const text = await readFile(manifestPath, 'utf8');
    const parsed = JSON.parse(text);
    const result = publicationManifestSummarySchema.safeParse(parsed);
    return result.success ? result.data : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Lift per-section blame stamps (`lastCommittedAt` / `lastCommitSha`)
 * from the published snapshot's indexMap onto the freshly compiled
 * snapshot. The two snapshots share the same source-text-derived
 * node IDs, so a node-id-keyed merge is safe. Silently no-ops when
 * the published snapshot is absent or malformed.
 */
async function mergeBlameFromPublishedSnapshot(
  snapshot: Snapshot,
  publishedSnapshotPath: string | undefined,
): Promise<void> {
  const path = resolve(
    process.cwd(),
    publishedSnapshotPath
      ?? `${PUBLISHED_ARTIFACT_DIR}/${ARTIFACT_FILENAMES.snapshot}`,
  );
  let parsed: unknown;
  try {
    const text = await readFile(path, 'utf8');
    parsed = JSON.parse(text);
  } catch {
    return;
  }
  const publishedIndexMap =
    parsed && typeof parsed === 'object'
      ? (parsed as { indexMap?: unknown }).indexMap
      : undefined;
  if (!publishedIndexMap || typeof publishedIndexMap !== 'object') return;
  const publishedNodes = publishedIndexMap as Record<
    string,
    { lastCommittedAt?: unknown; lastCommitSha?: unknown }
  >;
  for (const [nodeId, ourNode] of Object.entries(snapshot.indexMap)) {
    const published = publishedNodes[nodeId];
    if (!published) continue;
    if (typeof published.lastCommittedAt === 'string') {
      ourNode.lastCommittedAt = published.lastCommittedAt;
    }
    if (typeof published.lastCommitSha === 'string') {
      ourNode.lastCommitSha = published.lastCommitSha;
    }
  }
}
