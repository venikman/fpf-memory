import { createHash } from 'node:crypto';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

import { compileFpfSource } from '../runtime/compiler.js';
import type { Snapshot } from '../runtime/types.js';
import { buildDocsProjection, docsRelativePath } from './projection.js';

export interface GenerateDocsOptions {
  sourcePath?: string;
  docsRoot?: string;
  builtAt?: string;
}

export interface GenerateDocsResult {
  sourcePath: string;
  sourceHash: string;
  builtAt: string;
  docsRoot: string;
  generatedFiles: number;
  snapshot: Snapshot;
}

export async function generateDocsSite(
  options: GenerateDocsOptions = {},
): Promise<GenerateDocsResult> {
  const sourcePath = resolve(
    process.cwd(),
    options.sourcePath ?? process.env.FPF_SPEC_SOURCE_PATH ?? 'FPF-spec.md',
  );
  const docsRoot = resolve(
    process.cwd(),
    options.docsRoot ?? process.env.FPF_DOCS_ROOT ?? 'docs',
  );
  const sourceText = await readFile(sourcePath, 'utf8');
  const sourceHash = `sha256:${createHash('sha256').update(sourceText).digest('hex')}`;
  const builtAt = options.builtAt ?? new Date().toISOString();
  const { snapshot } = compileFpfSource({
    sourcePath,
    sourceHash,
    builtAt,
    sourceText,
  });
  const projection = buildDocsProjection(snapshot);
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
    generatedFiles: projection.pages.length,
    snapshot,
  };
}
