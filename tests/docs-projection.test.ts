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

function routeSlug(routeId: string) {
  return routeId.replace(/^route:/, '');
}

function routeDocRef(routeId: string) {
  const slug = routeSlug(routeId);
  return {
    markdownPath: `docs/generated/routes/route_${slug}.md`,
    staticPath: `/generated/routes/route_${slug}`,
  };
}

function routeGeneratedMarkdownPath(routeId: string) {
  const slug = routeId.replace(/^route:/, '');
  return `generated/routes/route_${slug}.md`;
}

function routeGeneratedHtmlPath(routeId: string) {
  const slug = routeId.replace(/^route:/, '');
  return `generated/routes/route_${slug}.html`;
}

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
    const firstRoute = Object.values(snapshot.routeGraph.nodes)[0];
    if (firstRoute) {
      expect(resolveDocTarget(snapshot, firstRoute.id)?.docRef).toEqual(
        routeDocRef(firstRoute.id),
      );
    } else {
      expect(resolveDocTarget(snapshot, 'route:project-alignment')).toBeUndefined();
    }
    const whatSpecPage = projection.pages.find(
      (page) => page.kind === 'preface'
        && page.title === 'What this specification is (and how to use it)',
    );
    expect(whatSpecPage?.markdownPath).toMatch(
      /^docs\/generated\/preface\/heading_what-this-specification-is-and-how-to-use-it_\d+\.md$/,
    );
    expect(whatSpecPage?.markdown).toContain(
      '# What this specification is (and how to use it)',
    );
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
    const firstRoute = Object.values(snapshot.routeGraph.nodes)[0];
    const routePage = firstRoute
      ? projection.pagesByMarkdownPath[routeDocRef(firstRoute.id).markdownPath]?.markdown ?? ''
      : '';

    expect(glossaryPage).toContain('This is the FPF glossary');
    expect(glossaryPage).toContain('not a glossary of fpf-memory UI');
    expect(changeLogPage).toContain('This is the FPF specification change log');
    expect(changeLogPage).toContain('not the fpf-memory product changelog');
    expect(routeIndex).toContain('They are not website routes');
    expect(routeIndex).toContain(
      `Generated pages: ${Object.keys(snapshot.routeGraph.nodes).length}`,
    );
    if (firstRoute) {
      expect(routePage).toContain('It is not a website route or application navigation route');
    }
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

  it('auto-links pattern IDs in body prose, but never inside code or existing links', () => {
    const projection = buildDocsProjection(snapshot);

    // Pick a pattern page whose body prose references another pattern by its
    // bare ID. A.6.9 references F.9 in its anchor text; the agent's earlier
    // smoke check confirmed this rendered as plain text in production.
    const a69Page = projection.pagesByMarkdownPath['docs/generated/patterns/A.6.9.md']?.markdown;
    expect(a69Page).toBeDefined();
    if (!a69Page) return;

    // The bare ID should now be a link, but only the outermost token —
    // a leading `(` from "(F.9)" or a trailing punctuation like "." must
    // not get folded into the link target.
    expect(a69Page).toMatch(/\[F\.9\]\(\/generated\/patterns\/F\.9\)/);

    // A pattern ID that already lives inside an explicit `inlineCode` span
    // should be passed through unchanged. F.9 itself isn't always inside
    // backticks in the body, so verify the guard with a synthetic round-trip
    // through the same helper via the renderer: any pattern pages that quote
    // an ID inside `…` must not produce a nested link.
    expect(a69Page).not.toMatch(/`\[[A-Z]\.\d/);
    expect(a69Page).not.toMatch(/\[\[[A-Z]\.\d+/); // no double-bracketed links

    // Only patterns get auto-linked. Route IDs (`route:…`) and anchor IDs
    // (`heading:…`) must never end up in a /generated/patterns/ URL.
    expect(a69Page).not.toMatch(/\(\/generated\/patterns\/route:/);
    expect(a69Page).not.toMatch(/\(\/generated\/patterns\/heading:/);
  });

  it('does not autolink pattern IDs inside multi-line single-backtick code spans', () => {
    const synthetic = structuredClone(snapshot);
    const parentId = 'A.6.9';
    const parent = synthetic.indexMap[parentId];
    expect(parent, 'expected A.6.9 to exist in the projection fixture').toBeDefined();
    if (!parent) return;

    const sectionId = 'A.6.9:test-multiline-code';
    parent.childIds = [...parent.childIds, sectionId];
    synthetic.indexMap[sectionId] = {
      id: sectionId,
      title: 'A.6.9:test-multiline-code - Multiline code span fixture',
      description: '',
      level: parent.level + 1,
      lineStart: parent.lineEnd,
      lineEnd: parent.lineEnd,
      path: [...parent.path, 'Multiline code span fixture'],
      parentId,
      childIds: [],
      anchorId: sectionId,
      metadata: {
        patternId: parentId,
        part: parent.metadata.part,
        cluster: parent.metadata.cluster,
        role: 'other',
        routeBearing: false,
      },
    };
    synthetic.anchorMap[sectionId] = {
      id: sectionId,
      nodeId: sectionId,
      heading: synthetic.indexMap[sectionId].title,
      lineStart: parent.lineEnd,
      lineEnd: parent.lineEnd,
      path: [...parent.path, 'Multiline code span fixture'],
      text: 'Keep pattern IDs literal inside `A.6.9 /\n  A.2` code spans.',
      plainText: 'Keep pattern IDs literal inside A.6.9 / A.2 code spans.',
      role: 'other',
    };

    const projection = buildDocsProjection(synthetic);
    const markdown = projection.pagesByMarkdownPath['docs/generated/patterns/A.6.9.md']?.markdown;
    expect(markdown).toContain('`A.6.9 /\n  A.2`');
    const codeSpan = markdown?.match(/`(A\.6\.9[^`]*?\n[^`]*?A\.2)`/)?.[1] ?? '';
    expect(codeSpan).not.toContain('](/generated/');
  });

  it('auto-links code-spanned pattern IDs inside markdown table cells', () => {
    // The J.4 entry-point table renders one inline-code pattern ID per
    // cell. The general autolinker skips `<code>` spans in prose, so
    // those IDs were unclickable before this fix. The table-cell
    // autolinker rewrites them to `[\`A.1.1\`](/generated/patterns/A.1.1)`.
    const projection = buildDocsProjection(snapshot);
    const j4 = Object.entries(projection.pagesByMarkdownPath).find(
      ([path]) => path.includes('part-j-indexes-navigation-aids'),
    );
    expect(j4, 'expected the J.4 preface page to be projected').toBeDefined();
    if (!j4) return;
    const markdown = j4[1].markdown;

    // The J.4 row "Project alignment" lists `A.1.1`, `A.15`, etc. in
    // its candidate-patterns cell; after this fix, those should be
    // wrapped in a markdown link to /generated/patterns/<id>.
    expect(markdown).toMatch(
      /\[`A\.1\.1`\]\(\/generated\/patterns\/A\.1\.1\)/,
    );
    expect(markdown).toMatch(/\[`A\.15`\]\(\/generated\/patterns\/A\.15\)/);
    // Section IDs inside the table (e.g. `A.19:0`) must link to the
    // parent pattern page plus the heading anchor, not to a 404.
    expect(markdown).toMatch(
      /\[`A\.19:0`\]\(\/generated\/patterns\/A\.19#[a-z0-9-]+\)/,
    );
  });

  it('resolves section IDs to parent#anchor URLs in generated pages', () => {
    // Section IDs (e.g. `I.2.1`, `A.19:0`) live in the indexMap under a
    // parent pattern, not as first-class compiled nodes. Body prose AND
    // table cells must surface them as deep links into the parent's
    // generated page so a bare reference is navigable instead of a dead
    // `<code>` chip. The shape of the URL is `/generated/patterns/<parent>#<slug>`
    // regardless of where the wrapping markdown comes from.
    const projection = buildDocsProjection(snapshot);
    let foundDeepLink = false;
    for (const page of projection.pages) {
      if (page.kind !== 'preface') continue;
      if (/\]\(\/generated\/patterns\/I\.2#[a-z0-9-]+\)/.test(page.markdown)) {
        foundDeepLink = true;
        break;
      }
    }
    expect(
      foundDeepLink,
      'expected at least one preface page to link an I.2.* section ID to /generated/patterns/I.2#<anchor>',
    ).toBe(true);
  });

  it('rewrites bracket labels to parens in preface catalog link titles', () => {
    // Some published preface section titles include "[I]" / "[A/I]"
    // labels. Markdown link grammar can't nest unescaped brackets, so
    // the catalog rendered those rows as a malformed anchor with a
    // dangling `]</a>` and the inner `[A/I]` orphaned. Backslash
    // escapes and HTML entities both fail to round-trip Rspress's
    // MDX pipeline; rewriting the brackets to parens keeps the label
    // legible and the link as a single anchor.
    const projection = buildDocsProjection(snapshot);
    const catalog =
      projection.pagesByMarkdownPath[
        'docs/generated/preface/index.md'
      ]?.markdown ?? '';
    // The "(A/I)" / "(I)" label survives inside link text.
    expect(catalog).toMatch(/\([AI](?:\/I)?\)\]\(\/generated/);
    // No bracket labels remain inside link text — those would have
    // produced malformed nested anchors.
    expect(catalog).not.toMatch(/\[[^\]]*\[[AI]\][^\]]*\]\(\/generated/);
  });

  it('auto-links bare canonical phrases like "Start Here" to handwritten docs pages', () => {
    // The Preface Catalog intro hardcodes "return to Start Here, a route, or
    // a work packet" — that bare "Start Here" used to be plain text, leaving
    // the reader without a navigational hint. The canonical-phrase autolinker
    // wraps it in a link to `/start-here`, while leaving lowercase variants
    // ("a route", "a work packet") alone so the writer's intent is preserved.
    const projection = buildDocsProjection(snapshot);
    const catalog =
      projection.pagesByMarkdownPath[
        'docs/generated/preface/index.md'
      ]?.markdown ?? '';

    expect(catalog).toMatch(/\[Start Here\]\(\/start-here\)/);
    // Lowercase singular forms in the same sentence stay as plain text —
    // the writer means "any route" / "any work packet", not a catalog page.
    expect(catalog).not.toMatch(/\[a route\]\(/);
    expect(catalog).not.toMatch(/\[a work packet\]\(/);
  });

  it('canonical-phrase autolinker links each phrase at most once per body', () => {
    // First-occurrence-only on purpose — repeated mentions of the same
    // canonical phrase in one body would otherwise add link noise, so the
    // autolinker stops after the first match. The Preface Catalog intro
    // only mentions "Start Here" once, so we expect exactly one link.
    const projection = buildDocsProjection(snapshot);
    const catalog =
      projection.pagesByMarkdownPath[
        'docs/generated/preface/index.md'
      ]?.markdown ?? '';
    const startHereLinks =
      catalog.match(/\[Start Here\]\(\/start-here\)/g) ?? [];
    expect(startHereLinks).toHaveLength(1);
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
    expect(navigation.routes[0]?.items.length).toBe(
      Object.keys(snapshot.routeGraph.nodes).length,
    );
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
      const firstRoute = Object.values(snapshot.routeGraph.nodes)[0];
      if (firstRoute) {
        expect(
          await readFile(resolve(docsRoot, routeGeneratedMarkdownPath(firstRoute.id)), 'utf8'),
        ).toContain(`# ${firstRoute.name}`);
      }
      const generatedProjection = buildDocsProjection(snapshot);
      const whatSpecPage = generatedProjection.pages.find(
        (page) => page.kind === 'preface'
          && page.title === 'What this specification is (and how to use it)',
      );
      expect(whatSpecPage).toBeDefined();
      expect(
        await readFile(
          resolve(docsRoot, whatSpecPage!.markdownPath.replace(/^docs\//, '')),
          'utf8',
        ),
      ).toContain('# What this specification is (and how to use it)');
      expect(
        await readFile(resolve(docsRoot, 'generated/patterns/index.md'), 'utf8'),
      ).toContain('# Pattern Catalog');
      // The site root `/` is now a plain chapter list: a slim header (title,
      // intro line, three CTAs, provenance line) followed by the same
      // Part-by-Part chapter listing as `/patterns`. Same information, no
      // curation — visitors scan one list and click straight through.
      const rootIndex = await readFile(resolve(docsRoot, 'index.md'), 'utf8');
      expect(rootIndex).toContain('title: "FPF Reference"');
      expect(rootIndex).not.toContain('pageType: home');
      expect(rootIndex).not.toContain('class="fpf-doorway-home"');
      expect(rootIndex).not.toContain('The doorway, then the source.');
      expect(rootIndex).toContain('# FPF Reference');
      // Home introduces FPF, attributes it, and links Anatoly's upstream
      // source so a first-time reader who landed without context knows
      // what they're looking at.
      expect(rootIndex).toContain('First Principles Framework (FPF)');
      expect(rootIndex).toContain('Anatoly Levenchuk');
      expect(rootIndex).toContain('https://github.com/ailev/FPF');
      expect(rootIndex).toContain('Cite this spec');
      expect(rootIndex).toContain('[Start here](/start-here)');
      expect(rootIndex).toContain('[Connect MCP](/connect-mcp)');
      expect(rootIndex).toContain('[Open the catalog](/patterns)');
      expect(rootIndex).toContain('[Routes](/generated/routes/index)');
      // Chapter list — at least Part A through the last canonical Part should
      // be present as ## headings.
      expect(rootIndex).toMatch(/^## Part A\b/m);
      // Every pattern in the snapshot should be reachable as a list item from
      // the home page (same source as the catalog body).
      expect(rootIndex).toContain('](/generated/patterns/A.2)');

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

      // `/` now renders as a plain chapter list. The headline title, the
      // three CTAs, and at least one Part heading should be present in the
      // built HTML.
      const indexHtml = await readFile(resolve(outDir, 'index.html'), 'utf8');
      expect(indexHtml).toContain('FPF Reference');
      expect(indexHtml).toContain('Start here');
      expect(indexHtml).toContain('Connect MCP');
      expect(indexHtml).toContain('Open the catalog');
      expect(indexHtml).toContain('Part A');

      // `/patterns` is the short-URL Pattern Catalog. Verify it lists Part A
      // Role Taxonomy and points back at the orientation page.
      const patternsHtml = await readFile(resolve(outDir, 'patterns.html'), 'utf8');
      expect(patternsHtml).toContain('Pattern Catalog');
      expect(patternsHtml).toContain('Role Taxonomy');
      expect(patternsHtml).toContain('orientation page');

      expect(
        await readFile(resolve(outDir, 'generated/patterns/A.2.html'), 'utf8'),
      ).toContain('Role Taxonomy');
      const firstRoute = Object.values(snapshot.routeGraph.nodes)[0];
      if (firstRoute) {
        expect(
          await readFile(
            resolve(outDir, routeGeneratedHtmlPath(firstRoute.id)),
            'utf8',
          ),
        ).toContain(firstRoute.name);
      }
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
        'This is the agent and tool-use guide for the FPF Reference MCP surface',
      );
      expect(await readFile(resolve(outDir, 'mcp-recipes.html'), 'utf8')).toContain(
        'Dogfood a product role',
      );
      expect(await readFile(resolve(outDir, 'mcp-recipes.html'), 'utf8')).toContain(
        'Review a PR without full-spec paste',
      );
      expect(await readFile(resolve(outDir, 'connect-mcp.html'), 'utf8')).toContain(
        'Connect FPF Reference MCP',
      );
      expect(await readFile(resolve(outDir, 'connect-mcp.html'), 'utf8')).toContain(
        'https://mcp.fpf.sh/api/mcp/fpf_reference/mcp',
      );
      expect(await readFile(resolve(outDir, 'connect-mcp.html'), 'utf8')).toContain(
        'https://mcp.fpf.sh/api/mcp/fpf_memory/mcp',
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

  it('falls back to publishedAt when manifest lacks upstream commit metadata', () => {
    // Older snapshots predate the upstream-commit fields in manifest.
    // The renderer tolerates that: ISO publishedAt goes in frontmatter,
    // a plain "FPF snapshot publish date" footer line surfaces it.
    const projection = buildDocsProjection(snapshot, {
      channel: 'latest-published',
      sourceHash: 'sha256:test',
      upstreamRef: 'fbe6e29',
      publishedAt: '2026-05-10T04:28:39.529Z',
    });
    const samples = [
      'docs/generated/patterns/A.6.md',
      'docs/generated/routes/index.md',
      'docs/generated/preface/index.md',
    ];
    for (const path of samples) {
      const body = projection.pagesByMarkdownPath[path]?.markdown ?? '';
      expect(body, `expected ${path} to be projected`).not.toBe('');
      expect(body).toMatch(/^lastUpdated: "2026-05-10T04:28:39.529Z"$/m);
      expect(body).toMatch(
        /\*Last Updated: 2026-05-10 \(FPF snapshot publish date\)\*/,
      );
    }
  });

  it('links every generated page to the exact ailev/FPF commit it was projected from', () => {
    // When the manifest carries upstream commit metadata, both the
    // frontmatter `lastUpdated` and the visible footer line should
    // come from the upstream commit (not the local publish time), and
    // the footer line should link directly to the commit on GitHub so
    // a reader can read the diff this snapshot is a projection of.
    const projection = buildDocsProjection(snapshot, {
      channel: 'latest-published',
      sourceHash: 'sha256:test',
      upstreamRef: '1f7c9e53ae066346fb89da5e59646fc784592b4e',
      upstreamRepoUrl: 'https://github.com/ailev/FPF',
      upstreamCommittedAt: '2026-05-08T17:00:40Z',
      publishedAt: '2026-05-10T04:28:39.529Z',
    });
    const body =
      projection.pagesByMarkdownPath['docs/generated/patterns/A.6.md']
        ?.markdown ?? '';
    // Frontmatter records the upstream commit date, not the local publish.
    expect(body).toMatch(/^lastUpdated: "2026-05-08T17:00:40Z"$/m);
    // Visible footer links the date to the exact ailev/FPF commit.
    expect(body).toMatch(
      /\*Last Updated: \[2026-05-08\]\(https:\/\/github\.com\/ailev\/FPF\/commit\/1f7c9e53ae066346fb89da5e59646fc784592b4e\)/,
    );
    expect(body).toContain('upstream FPF commit `1f7c9e53`');
    expect(body).toContain('[github.com/ailev/FPF](https://github.com/ailev/FPF)');
  });

  it('home page provenance line links the upstream commit when available', () => {
    const projection = buildDocsProjection(snapshot, {
      channel: 'latest-published',
      sourceHash: 'sha256:c0301013deadbeef',
      upstreamRef: '1f7c9e53ae066346fb89da5e59646fc784592b4e',
      upstreamRepoUrl: 'https://github.com/ailev/FPF',
      upstreamCommittedAt: '2026-05-08T17:00:40Z',
      publishedAt: '2026-05-10T04:28:39.529Z',
    });
    const home = projection.pagesByMarkdownPath['docs/index.md']?.markdown ?? '';
    expect(home).toContain(
      '[2026-05-08](https://github.com/ailev/FPF/commit/1f7c9e53ae066346fb89da5e59646fc784592b4e)',
    );
    expect(home).toContain('[ailev/FPF](https://github.com/ailev/FPF)');
  });

  it('omits the publishedAt stamp when no manifest is provided', () => {
    // Runtime callers (e.g. query-engine) call buildDocsProjection
    // without a manifest. Those rendered bodies are read directly by
    // tools, not by the docs site, so they shouldn't carry the
    // human-targeted footer line.
    const projection = buildDocsProjection(snapshot);
    const body = projection.pagesByMarkdownPath['docs/generated/patterns/A.6.md']?.markdown ?? '';
    expect(body).not.toMatch(/\*Last Updated: /);
    expect(body).not.toMatch(/^lastUpdated:/m);
  });

  it('uses per-section blame stamps in pattern footers when nodes carry them', () => {
    // When the snapshot's indexMap carries `lastCommittedAt` /
    // `lastCommitSha` on a node (attached at publish time by
    // `enrichSnapshotWithLineBlame`), the page footer should read
    // FROM THAT NODE'S commit, not the whole-file upstream commit
    // — so each pattern page tells the truth about when its own
    // section last changed in the upstream FPF.
    const enrichedSnapshot = JSON.parse(JSON.stringify(snapshot)) as Snapshot;
    enrichedSnapshot.indexMap['A.1.1']!.lastCommittedAt = '2025-12-16T10:00:00Z';
    enrichedSnapshot.indexMap['A.1.1']!.lastCommitSha = 'b3f55f36';
    enrichedSnapshot.indexMap['C.27']!.lastCommittedAt = '2026-04-30T08:00:00Z';
    enrichedSnapshot.indexMap['C.27']!.lastCommitSha = '34b4d63c';
    const projection = buildDocsProjection(enrichedSnapshot, {
      channel: 'latest-published',
      sourceHash: 'sha256:test',
      upstreamRef: '136be3bbdf2a0c22e29beaea769851d794fdef39',
      upstreamRepoUrl: 'https://github.com/ailev/FPF',
      upstreamCommittedAt: '2026-05-10T06:26:04Z',
      publishedAt: '2026-05-10T07:00:00Z',
    });
    const a11 =
      projection.pagesByMarkdownPath['docs/generated/patterns/A.1.1.md']
        ?.markdown ?? '';
    const c27 =
      projection.pagesByMarkdownPath['docs/generated/patterns/C.27.md']
        ?.markdown ?? '';
    expect(a11).toContain(
      '[2025-12-16](https://github.com/ailev/FPF/commit/b3f55f36)',
    );
    expect(a11).toContain('upstream FPF commit `b3f55f36`');
    expect(a11).toContain('this section last modified');
    expect(c27).toContain(
      '[2026-04-30](https://github.com/ailev/FPF/commit/34b4d63c)',
    );
    expect(c27).toContain('upstream FPF commit `34b4d63c`');
    // Both pages must NOT show the whole-file upstream commit date,
    // because their per-section data is more specific.
    expect(a11).not.toContain('136be3bb');
    expect(c27).not.toContain('136be3bb');
  });

  it('falls back to whole-file commit date for pages whose nodes lack per-section blame', () => {
    // Route pages, the home page, and other catalog/index pages
    // don't have an indexMap entry with line-range blame. They keep
    // showing the whole-file upstream commit date as a sensible
    // fallback.
    const projection = buildDocsProjection(snapshot, {
      channel: 'latest-published',
      sourceHash: 'sha256:test',
      upstreamRef: '136be3bbdf2a0c22e29beaea769851d794fdef39',
      upstreamRepoUrl: 'https://github.com/ailev/FPF',
      upstreamCommittedAt: '2026-05-10T06:26:04Z',
      publishedAt: '2026-05-10T07:00:00Z',
    });
    const home =
      projection.pagesByMarkdownPath['docs/index.md']?.markdown ?? '';
    expect(home).toContain('[2026-05-10](https://github.com/ailev/FPF/commit/136be3bbdf2a0c22e29beaea769851d794fdef39)');
  });
});
