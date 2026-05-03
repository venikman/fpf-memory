import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFile, mkdir, mkdtemp, readdir, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, relative, resolve } from 'node:path';
import { promisify } from 'node:util';

import { beforeAll, describe, expect, it } from '@rstest/core';

import { DEFAULT_SOURCE_PATH } from '../src/core/constants.js';
import { generateDocsSite } from '../src/adapters/docs/generate.js';
import {
  buildDocsNavigation,
  buildDocsProjection,
  resolveDocTarget,
} from '../src/core/documents.js';
import { compileFpfSource } from '../src/runtime/compiler.js';
import type { Snapshot } from '../src/runtime/types.js';

const execFileAsync = promisify(execFile);

async function copyNonGeneratedDocs(srcRoot: string, dstRoot: string) {
  let entries;
  try {
    entries = await readdir(srcRoot, { withFileTypes: true, recursive: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return;
    }
    throw error;
  }

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (!/\.(md|mdx)$/.test(entry.name)) continue;
    const fullPath = resolve(entry.parentPath, entry.name);
    const relPath = relative(srcRoot, fullPath);
    if (relPath.startsWith('generated/') || relPath.startsWith('architecture/html/')) continue;
    // `docs/index.md` is generator output (the adoption landing). The
    // generator writes it into the temp docsRoot directly, so copying the
    // committed source tree's copy here would potentially overwrite freshly
    // generated content with a stale dev-machine copy.
    if (relPath === 'index.md') continue;
    const target = resolve(dstRoot, relPath);
    await mkdir(dirname(target), { recursive: true });
    await copyFile(fullPath, target);
  }
}

describe('docs projection', () => {
  const canonicalSourcePath = resolve(process.cwd(), DEFAULT_SOURCE_PATH);
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

    expect(patternPage).toContain('## What this page is');
    expect(patternPage).toContain('This is a generated FPF pattern page');
    expect(patternPage).toContain('## Methodology');
    expect(patternPage).toContain('## Problem frame');
    expect(patternPage).not.toContain('## A.2:1 - Problem frame');
    expect(patternPage).toContain('> Pattern <span class="fpf-pid fpf-pid--a">A.2</span>');
    expect(patternPage).not.toContain('- **ID:** `A.2`');
  });

  it('explains generated glossary, changelog, and route pages by source and method', () => {
    const projection = buildDocsProjection(snapshot);
    const glossaryPage =
      projection.pagesByMarkdownPath['docs/generated/patterns/H.1.md']?.markdown ?? '';
    const changeLogPage =
      projection.pagesByMarkdownPath['docs/generated/patterns/I.3.md']?.markdown ?? '';
    const routeIndex =
      projection.pagesByMarkdownPath['docs/generated/routes/index.md']?.markdown ?? '';
    const routePage =
      projection.pagesByMarkdownPath['docs/generated/routes/route_project-alignment.md']
        ?.markdown ?? '';

    expect(glossaryPage).toContain('This is the FPF glossary');
    expect(glossaryPage).toContain('not a glossary of fpf-memory UI');
    expect(changeLogPage).toContain('This is the FPF specification change log');
    expect(changeLogPage).toContain('not the fpf-memory product changelog');
    expect(routeIndex).toContain('They are not website routes');
    expect(routePage).toContain('It is not a website route or application navigation route');
  });

  it('keeps hyphenated cluster names intact in breadcrumbs', () => {
    // Regression guard for the breadcrumb split bug flagged on PR #46:
    // `pattern.part` for Part B is "Part B – Trans-disciplinary Reasoning
    // Cluster", and the earlier split on every dash broke "Trans-disciplinary"
    // into two separate breadcrumb segments ("Trans" / "disciplinary ..."). We
    // only want to split on the first dash that has spaces on both sides.
    const projection = buildDocsProjection(snapshot);
    const patternPage =
      projection.pagesByMarkdownPath['docs/generated/patterns/B.1.1.md']?.markdown ?? '';

    expect(patternPage).toMatch(/<nav class="fpf-breadcrumb"[^>]*>[\s\S]*?<\/nav>/);
    expect(patternPage).toContain('<span>Part B</span>');
    // The cluster segment must keep the hyphen that belongs to "Trans-disciplinary".
    expect(patternPage).toMatch(/<span>Trans[-‑]disciplinary Reasoning Cluster<\/span>/);
    expect(patternPage).not.toMatch(/<span>Trans<\/span>/);
    expect(patternPage).not.toMatch(/<span>disciplinary Reasoning Cluster<\/span>/);
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

    // Assert the invariants of a relation row (pid chip + kind label + link
    // target) rather than the exact serialized HTML so additive formatting
    // changes — extra classes, attribute reordering, whitespace — don't break
    // this test while it's still guarding the dedup behaviour.
    const relationRows = patternPage.match(/<div class="fpf-relation">[\s\S]*?<\/div>/g) ?? [];
    const a1ToA2ExplicitRows = relationRows.filter(
      (row) =>
        /class="fpf-pid[^"]*fpf-pid--a[^"]*"[^>]*>A\.1</.test(row) &&
        /<span class="fpf-relation-kind">explicit reference<\/span>/.test(row) &&
        /href="\/generated\/patterns\/A\.2"/.test(row) &&
        row.includes('Role Taxonomy'),
    );

    expect(a1ToA2ExplicitRows).toHaveLength(1);
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

      expect(result.ownerContext).toBe('Ctx.Docs');
      expect(result.lifecycleState).toBe('evidence');
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
      // The home page is an adoption landing, not a second copy of the
      // catalog (the 237-link wall lives at `/generated/patterns/index`).
      // It points readers to work packets before the full reference wall.
      const rootIndex = await readFile(resolve(docsRoot, 'index.md'), 'utf8');
      expect(rootIndex).toContain('title: "FPF Reference"');
      expect(rootIndex).toContain('# FPF Reference');
      expect(rootIndex).toContain('## Start here');
      expect(rootIndex).toContain('[Adoption guide](/start-here)');
      expect(rootIndex).toContain('[Work packets](/work-packets)');
      expect(rootIndex).toContain('product-role feedback');
      expect(rootIndex).toContain('[MCP recipes](/mcp-recipes)');
      expect(rootIndex).toContain('[Connect MCP](/connect-mcp)');
      expect(rootIndex).toContain('## Navigate');
      expect(rootIndex).toContain('[Patterns](/generated/patterns/index)');
      expect(rootIndex).toContain('[Routes](/generated/routes/index)');
      expect(rootIndex).toContain('[Glossary](/generated/patterns/H.1)');
      expect(rootIndex).toContain('[Change log](/generated/patterns/I.3)');
      expect(rootIndex).toContain('FPF specification change log from the published source');
      expect(rootIndex).toContain('## MCP endpoint');
      expect(rootIndex).toContain('fpf-memory.server.mastra.cloud');
      expect(rootIndex).toContain('https://github.com/venikman/fpf-memory#run-and-test-mcp');
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
      await copyNonGeneratedDocs(resolve(process.cwd(), 'docs'), docsRoot);

      await execFileAsync(
        'node',
        ['./node_modules/@rspress/core/bin/rspress.js', 'build'],
        {
          cwd: process.cwd(),
          env: {
            ...process.env,
            FPF_DOCS_ROOT: docsRoot,
            FPF_DOCS_OUT_DIR: outDir,
            RSPRESS_PERSISTENT_CACHE: 'false',
          },
          // Building ~825 generated pages + non-generated docs with the
          // persistent cache disabled consistently takes 1.5-2.5 min on
          // GitHub's ubuntu-latest runners. Give it headroom.
          timeout: 300_000,
        },
      );

      expect(await readFile(resolve(outDir, 'index.html'), 'utf8')).toContain(
        'FPF Reference',
      );
      expect(
        await readFile(resolve(outDir, 'generated/patterns/A.2.html'), 'utf8'),
      ).toContain('Role Taxonomy');
      expect(
        await readFile(resolve(outDir, 'generated/routes/route_project-alignment.html'), 'utf8'),
      ).toContain('project alignment');
      expect(
        await readFile(resolve(outDir, 'generated/patterns/I.3.html'), 'utf8'),
      ).toContain('This is the FPF specification change log');
      expect(
        await readFile(resolve(outDir, 'generated/routes/index.html'), 'utf8'),
      ).toContain('They are not website routes');
      expect(await readFile(resolve(outDir, 'start-here.html'), 'utf8')).toContain(
        'Pick a doorway',
      );
      expect(await readFile(resolve(outDir, 'start-here.html'), 'utf8')).toContain(
        'This is the adoption entry surface',
      );
      expect(await readFile(resolve(outDir, 'work-packets.html'), 'utf8')).toContain(
        'Project review packet',
      );
      expect(await readFile(resolve(outDir, 'work-packets.html'), 'utf8')).toContain(
        'This is the task-sized operating surface',
      );
      expect(await readFile(resolve(outDir, 'work-packets.html'), 'utf8')).toContain(
        'Product-role feedback packet',
      );
      expect(await readFile(resolve(outDir, 'mcp-recipes.html'), 'utf8')).toContain(
        'Use MCP instead of pasted context',
      );
      expect(await readFile(resolve(outDir, 'mcp-recipes.html'), 'utf8')).toContain(
        'This is the agent and tool-use guide for fpf-memory',
      );
      expect(await readFile(resolve(outDir, 'mcp-recipes.html'), 'utf8')).toContain(
        'Dogfood a product role',
      );
      expect(await readFile(resolve(outDir, 'mcp-recipes.html'), 'utf8')).toContain(
        'Review a PR without full-spec paste',
      );
      expect(await readFile(resolve(outDir, 'connect-mcp.html'), 'utf8')).toContain(
        'Connect fpf-memory MCP',
      );
      expect(await readFile(resolve(outDir, 'connect-mcp.html'), 'utf8')).toContain(
        'https://fpf-memory.server.mastra.cloud/api/mcp/fpf_memory/mcp',
      );
      expect(await readFile(resolve(outDir, 'connect-mcp.html'), 'utf8')).toContain(
        'Codex CLI',
      );
      expect(await readFile(resolve(outDir, 'connect-mcp.html'), 'utf8')).toContain(
        'Claude Code',
      );
      expect(await readFile(resolve(outDir, 'connect-mcp.html'), 'utf8')).toContain(
        'Pi MCP extension',
      );
    } finally {
      await rm(tempRoot, { recursive: true, force: true });
    }
  }, 360_000);
});
