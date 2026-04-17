import { createHash } from 'node:crypto';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

import { z } from 'zod';

import {
  DEFAULT_SOURCE_PATH,
  PUBLISHED_MANIFEST_PATH,
} from '../../core/constants.js';
import { compileFpfSource } from '../../runtime/compiler.js';
import type { Snapshot } from '../../runtime/types.js';
import type { ContextId, LifecycleState } from '../../core/governance.js';
import {
  buildDocsProjection,
  docsRelativePath,
  type PublicationManifestSummary,
} from '../../core/documents.js';

export interface GenerateDocsOptions {
  sourcePath?: string;
  docsRoot?: string;
  builtAt?: string;
  manifestPath?: string;
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
