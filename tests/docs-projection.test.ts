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
    // `docs/index.md` (orientation page at `/`) and `docs/patterns.md`
    // (the short-URL Pattern Catalog at `/patterns`) are both generator
    // output. Skip them in the copy pass so the freshly generated copies
    // win over any stale dev-machine copies.
    if (relPath === 'index.md' || relPath === 'patterns.md') continue;
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

    // Pattern pages now use "About this pattern" instead of the
    // boilerplate "What this page is" (PR #72 design review).
    expect(patternPage).toContain('## About this pattern');
    expect(patternPage).toContain('This is a generated FPF pattern page');
    // "Methodology" was renamed to "How to use this pattern" alongside
    // "About this pattern" so the pattern page heading set says what
    // it actually means (PR #72 design review).
    expect(patternPage).toContain('## How to use this pattern');
    expect(patternPage).toContain('## Problem frame');
    expect(patternPage).not.toContain('## A.2:1 - Problem frame');
    // The ID + status/type/normativity/cluster/part render as ONE
    // inline mono byline directly under the H1 (was a boxed blockquote
    // before PR #72 design review, then briefly an eyebrow above + a
    // separate byline below — collapsed into one line per the design
    // review screenshots).
    expect(patternPage).toMatch(
      /<p class="fpf-pattern-byline"><span class="fpf-pid fpf-pid--a">A\.2<\/span>/,
    );
    expect(patternPage).not.toContain('> Pattern <span class="fpf-pid');
    expect(patternPage).not.toContain('class="fpf-pattern-eyebrow"');
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
      // The site root `/` is the orientation/welcome page (Rspress
      // pageType: home with hero + 4-up feature grid). The Pattern
      // Catalog moved to `/patterns` per FU-P2-001 so first-time
      // visitors get an adoption surface, not a 237-link reference wall.
      const rootIndex = await readFile(resolve(docsRoot, 'index.md'), 'utf8');
      expect(rootIndex).toContain('pageType: home');
      expect(rootIndex).toContain('title: FPF Reference');
      // Kicker now carries brand + role per PR #72 design review.
      expect(rootIndex).toContain('FPF Reference');
      expect(rootIndex).toContain('Projection of the latest published spec');
      expect(rootIndex).toContain('Small, grounded entry points to the framework');
      // Primary CTA verb-prefixed; secondary actions stay as plain text.
      expect(rootIndex).toContain('Open the adoption guide');
      expect(rootIndex).toContain('link: /start-here');
      expect(rootIndex).toContain('text: Work packets');
      expect(rootIndex).toContain('link: /work-packets');
      expect(rootIndex).toContain('text: MCP recipes');
      expect(rootIndex).toContain('link: /mcp-recipes');
      expect(rootIndex).toContain('  - title: Patterns');
      // Patterns feature card now points at the short Pattern Catalog
      // URL `/patterns`, not the deep-link `/generated/patterns/index`.
      expect(rootIndex).toMatch(/- title: Patterns[\s\S]*?link: \/patterns/);
      expect(rootIndex).toContain('  - title: Routes');
      expect(rootIndex).toContain('link: /generated/routes/index');
      // Card titles dropped the "anchor" suffix per PR #72 design
      // review (the chip already telegraphs that the title is an FPF
      // identifier — repeating "anchor" in the label was redundant).
      expect(rootIndex).toContain('  - title: Glossary');
      expect(rootIndex).toContain('link: /generated/patterns/H.1');
      expect(rootIndex).toContain('  - title: Change log');
      expect(rootIndex).toContain('link: /generated/patterns/I.3');
      expect(rootIndex).toContain('## Methodology');
      expect(rootIndex).toContain('## MCP endpoint');
      expect(rootIndex).toContain('fpf-memory-mcp-vercel-origin.vercel.app');
      expect(rootIndex).toContain('https://github.com/venikman/fpf-memory#run-and-test-mcp');
      expect(rootIndex).toContain('[Connect MCP](/connect-mcp)');
      expect(rootIndex).toContain('[MCP recipes](/mcp-recipes)');

      // Pattern Catalog short-URL alias at /patterns — same content as
      // /generated/patterns/index. Carries the orientation-page back-pointer
      // and the FPF-index headline.
      const patternsAlias = await readFile(resolve(docsRoot, 'patterns.md'), 'utf8');
      expect(patternsAlias).toContain('title: "Pattern Catalog"');
      expect(patternsAlias).toContain('# Pattern Catalog');
      expect(patternsAlias).toContain('[orientation page](/)');
      expect(patternsAlias).toContain('full generated catalog of FPF pattern IDs');

      // Demo videos surface was removed — verify neither page references it.
      expect(rootIndex).not.toContain('use-case-videos');
      expect(rootIndex).not.toContain('Demo videos');
      expect(patternsAlias).not.toContain('use-case-videos');
      expect(patternsAlias).not.toContain('Demo videos');
    } finally {
      await rm(tempRoot, { recursive: true, force: true });
    }
  }, 20_000);

  it('builds rspress output into a disposable outDir', async () => {
    // Rspress's `pageType: home` layout detection requires the docsRoot to
    // sit inside `process.cwd()`. A `/tmp/...` mkdtemp would silently cause
    // the welcome page to fall back to the doc layout, so the temp root is
    // pinned under the project's `.runtime/` (gitignored).
    const runtimeRoot = resolve(process.cwd(), '.runtime');
    await mkdir(runtimeRoot, { recursive: true });
    const tempRoot = await mkdtemp(resolve(runtimeRoot, 'fpf-docs-build-'));

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

      // `/` is the orientation/welcome page (pageType: home with hero +
      // feature grid). Hero copy + adoption-guide CTA should be present.
      const indexHtml = await readFile(resolve(outDir, 'index.html'), 'utf8');
      expect(indexHtml).toContain('FPF Reference');
      // Primary CTA copy now reads "Open the adoption guide" with a
      // leading arrow per PR #72 design review.
      expect(indexHtml).toContain('Open the adoption guide');

      // `/patterns` is the short-URL Pattern Catalog. Verify it lists Part A
      // Role Taxonomy and points back at the orientation page.
      const patternsHtml = await readFile(resolve(outDir, 'patterns.html'), 'utf8');
      expect(patternsHtml).toContain('Pattern Catalog');
      expect(patternsHtml).toContain('Role Taxonomy');
      expect(patternsHtml).toContain('orientation page');

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
        'https://fpf-memory-mcp-vercel-origin.vercel.app/api/mcp/fpf_memory/mcp',
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
