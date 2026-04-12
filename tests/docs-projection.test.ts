import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFile, mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { promisify } from 'node:util';

import { beforeAll, describe, expect, it } from '@rstest/core';

import { generateDocsSite } from '../src/docs/generate.js';
import {
  buildDocsNavigation,
  buildDocsProjection,
  resolveDocTarget,
} from '../src/docs/projection.js';
import { compileFpfSource } from '../src/runtime/compiler.js';
import type { Snapshot } from '../src/runtime/types.js';

const execFileAsync = promisify(execFile);

describe('docs projection', () => {
  const canonicalSourcePath = resolve(process.cwd(), 'FPF-spec.md');
  let snapshot: Snapshot;

  beforeAll(async () => {
    const sourceText = await readFile(canonicalSourcePath, 'utf8');
    const sourceHash = `sha256:${createHash('sha256').update(sourceText).digest('hex')}`;
    snapshot = compileFpfSource({
      sourcePath: canonicalSourcePath,
      sourceHash,
      builtAt: '2026-04-11T19:34:21.498Z',
      sourceText,
    }).snapshot;
  });

  it('preserves stable doc paths for representative nodes', () => {
    const projection = buildDocsProjection(snapshot);

    expect(resolveDocTarget(snapshot, 'A.2')?.docRef).toEqual({
      markdownPath: 'docs/generated/patterns/A.2.md',
      staticPath: '/generated/patterns/A.2',
    });
    expect(resolveDocTarget(snapshot, 'C.11')?.docRef).toEqual({
      markdownPath: 'docs/generated/patterns/C.11.md',
      staticPath: '/generated/patterns/C.11',
    });
    expect(resolveDocTarget(snapshot, 'route:project-alignment')?.docRef).toEqual({
      markdownPath: 'docs/generated/routes/route_project-alignment.md',
      staticPath: '/generated/routes/route_project-alignment',
    });
    expect(
      projection.pagesByMarkdownPath[
        'docs/generated/preface/heading_what-this-specification-is-and-how-to-use-it_342.md'
      ]?.markdown,
    ).toContain('# What this specification is (and how to use it)');
  });

  it('renders readable section headings in generated markdown', () => {
    const projection = buildDocsProjection(snapshot);
    const patternPage =
      projection.pagesByMarkdownPath['docs/generated/patterns/A.2.md']?.markdown ?? '';

    expect(patternPage).toContain('## Problem frame');
    expect(patternPage).not.toContain('## A.2:1 - Problem frame');
    expect(patternPage).toContain('> Pattern `A.2`');
    expect(patternPage).not.toContain('- **ID:** `A.2`');
  });

  it('renders catalog reminders for stub pages with no body content', () => {
    const projection = buildDocsProjection(snapshot);
    const stubPage =
      projection.pagesByMarkdownPath['docs/generated/patterns/I.4.md']?.markdown ?? '';

    expect(stubPage).toMatch(
      /Trace tables to ISO 15926, BORO, CCO, Constructor.?Theory terms\./,
    );
  });

  it('preserves keyword cells that contain pipes inside code spans', () => {
    const projection = buildDocsProjection(snapshot);
    const comparisonPage =
      projection.pagesByMarkdownPath['docs/generated/patterns/A.19.CPM.md']?.markdown ?? '';

    expect(comparisonPage).toContain('- tri-state admissibility (pass|degrade|abstain)');
    expect(comparisonPage).not.toContain('- tri-state admissibility (`pass');
  });

  it('deduplicates repeated relation lines and exposes grouped navigation', () => {
    const projection = buildDocsProjection(snapshot);
    const navigation = buildDocsNavigation(snapshot);
    const patternPage =
      projection.pagesByMarkdownPath['docs/generated/patterns/A.1.md']?.markdown ?? '';

    const a2Mentions = patternPage.match(
      /`A\.1` --explicit_reference--> \[Role Taxonomy\]\(\/generated\/patterns\/A\.2\)/g,
    );

    expect(a2Mentions).toHaveLength(1);
    expect(navigation.patterns.some((group) => group.text.startsWith('Part A'))).toBe(true);
    expect(navigation.routes[0]?.items.length).toBeGreaterThan(0);
  });

  it('writes generated docs to a requested docs root', async () => {
    const tempRoot = await mkdtemp(resolve(tmpdir(), 'fpf-docs-generate-'));

    try {
      const docsRoot = resolve(tempRoot, 'docs');
      const result = await generateDocsSite({
        sourcePath: canonicalSourcePath,
        docsRoot,
        builtAt: '2026-04-11T19:34:21.498Z',
      });

      expect(result.generatedFiles).toBeGreaterThan(100);
      expect(
        await readFile(resolve(docsRoot, 'generated/patterns/A.2.md'), 'utf8'),
      ).toContain('# Role Taxonomy');
      expect(
        await readFile(
          resolve(docsRoot, 'generated/routes/route_project-alignment.md'),
          'utf8',
        ),
      ).toContain('# project alignment');
      expect(
        await readFile(
          resolve(
            docsRoot,
            'generated/preface/heading_what-this-specification-is-and-how-to-use-it_342.md',
          ),
          'utf8',
        ),
      ).toContain('# What this specification is (and how to use it)');
      expect(
        await readFile(resolve(docsRoot, 'generated/patterns/index.md'), 'utf8'),
      ).toContain('# Pattern Catalog');
    } finally {
      await rm(tempRoot, { recursive: true, force: true });
    }
  }, 20_000);

  it('builds rspress output into a disposable outDir', async () => {
    const tempRoot = await mkdtemp(resolve(tmpdir(), 'fpf-docs-build-'));

    try {
      const docsRoot = resolve(tempRoot, 'docs');
      const outDir = resolve(tempRoot, 'doc_build');

      await generateDocsSite({
        sourcePath: canonicalSourcePath,
        docsRoot,
        builtAt: '2026-04-11T19:34:21.498Z',
      });
      await copyFile(resolve(process.cwd(), 'docs/index.mdx'), resolve(docsRoot, 'index.mdx'));
      await copyFile(
        resolve(process.cwd(), 'docs/mcp-interface.md'),
        resolve(docsRoot, 'mcp-interface.md'),
      );

      await execFileAsync(
        'node',
        ['./node_modules/rspress/bin/rspress.js', 'build'],
        {
          cwd: process.cwd(),
          env: {
            ...process.env,
            FPF_DOCS_ROOT: docsRoot,
            FPF_DOCS_OUT_DIR: outDir,
          },
          timeout: 120_000,
        },
      );

      expect(await readFile(resolve(outDir, 'index.html'), 'utf8')).toContain(
        'Redirecting to',
      );
      expect(await readFile(resolve(outDir, 'mcp-interface.html'), 'utf8')).toContain(
        'read_fpf_doc',
      );
      expect(
        await readFile(resolve(outDir, 'generated/patterns/A.2.html'), 'utf8'),
      ).toContain('Role Taxonomy');
      expect(
        await readFile(resolve(outDir, 'generated/routes/route_project-alignment.html'), 'utf8'),
      ).toContain('project alignment');
    } finally {
      await rm(tempRoot, { recursive: true, force: true });
    }
  }, 120_000);
});
