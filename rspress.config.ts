import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { defineConfig } from '@rspress/core';

import { DEFAULT_SOURCE_PATH } from './src/core/constants.js';
import { buildDocsNavigation } from './src/docs/projection.js';
import { compileFpfSource } from './src/runtime/compiler.js';

const docsRoot = process.env.FPF_DOCS_ROOT ?? 'docs';
const outDir = process.env.FPF_DOCS_OUT_DIR ?? 'doc_build';

const sourcePath = resolve(
  process.cwd(),
  process.env.FPF_SPEC_SOURCE_PATH ?? DEFAULT_SOURCE_PATH,
);
const sourceText = readFileSync(sourcePath, 'utf8');
const sourceHash = `sha256:${createHash('sha256').update(sourceText).digest('hex')}`;
const snapshot = compileFpfSource({
  sourcePath,
  sourceHash,
  builtAt: 'docs-nav',
  sourceText,
}).snapshot;
const navigation = buildDocsNavigation(snapshot);

// Shared catalog of auxiliary doc pages that show up in "Additional"
// sections across sidebars. Each sidebar picks the subset relevant to
// its context; the order in the subset controls visual ordering.
const ADDITIONAL_LINK = {
  mcpInterface: { text: 'MCP Interface', link: '/mcp-interface/' },
  drr: { text: 'DRR-0001', link: '/drr/DRR-0001-mcp-first-class-interface/' },
  scripts: { text: 'Automation scripts', link: '/scripts/' },
  deploy: { text: 'Deploy to Mastra Cloud', link: '/deploy/' },
} as const;

type AdditionalLink = (typeof ADDITIONAL_LINK)[keyof typeof ADDITIONAL_LINK];

// "Additional" sections are always collapsible. Callers choose the
// initial state:
//   - collapsed: true (default) when "Additional" sits next to a primary
//     section (e.g. /drr/, /generated/preface/) so it doesn't crowd the
//     main nav.
//   - collapsed: false when "Additional" is the sidebar's only section
//     (e.g. /mcp-interface/, /scripts/, /deploy/) so users don't land on
//     an empty-looking sidebar and have to click to see any links.
function additionalSection(
  items: readonly AdditionalLink[],
  options: { collapsed?: boolean } = {},
) {
  return {
    text: 'Additional',
    collapsible: true,
    collapsed: options.collapsed ?? true,
    items: [...items],
  };
}

export default defineConfig({
  root: docsRoot,
  outDir,
  base: '/fpf-memory/',
  title: 'FPF Reference',
  description: 'Compiler-backed FPF reference docs generated from the configured spec source.',
  globalStyles: resolve(process.cwd(), 'src/docs/density.css'),
  route: {
    cleanUrls: true,
  },
  markdown: {
    link: {
      checkDeadLinks: {
        // Skip relative links (`./foo.md`, `../README.md`, `../src/foo.ts`).
        // The new architecture/scripts docs intentionally link back to source
        // files and sibling .md pages with relative paths so they remain
        // navigable on GitHub; rspress can't resolve those routes. Absolute
        // internal links (sidebar entries, cross-page `/foo/bar`) are still
        // dead-link checked.
        excludes: (url: string) =>
          url === '/drr/DRR-0001-mcp-first-class-interface/' ||
          url.startsWith('./') ||
          url.startsWith('../'),
      },
    },
  },
  themeConfig: {
    nav: [
      {
        text: 'Patterns',
        link: '/generated/patterns/index',
      },
      {
        text: 'Routes',
        link: '/generated/routes/index',
      },
      {
        text: 'Preface',
        link: '/generated/preface/index',
      },
      {
        text: 'Decision Records',
        link: '/drr/DRR-0001-mcp-first-class-interface/',
      },
    ],
    sidebar: {
      '/': [
        {
          text: 'Patterns',
          items: [
            {
              text: 'Pattern Catalog',
              link: '/generated/patterns/index',
            },
            ...navigation.patterns.map((group) => ({
              text: group.text,
              collapsible: true,
              collapsed: false,
              items: group.items,
            })),
          ],
        },
      ],
      '/generated/patterns/': [
        {
          text: 'Patterns',
          items: [
            {
              text: 'Pattern Catalog',
              link: '/generated/patterns/index',
            },
            ...navigation.patterns.map((group) => ({
              text: group.text,
              collapsible: true,
              collapsed: false,
              items: group.items,
            })),
          ],
        },
      ],
      '/generated/routes/': [
        {
          text: 'Routes',
          items: [
            {
              text: 'Route Catalog',
              link: '/generated/routes/index',
            },
            ...navigation.routes.map((group) => ({
              text: group.text,
              collapsible: true,
              collapsed: false,
              items: group.items,
            })),
          ],
        },
      ],
      '/generated/preface/': [
        {
          text: 'Preface',
          items: [
            {
              text: 'Preface Catalog',
              link: '/generated/preface/index',
            },
            ...navigation.preface.map((group) => ({
              text: group.text,
              collapsible: true,
              collapsed: false,
              items: group.items,
            })),
          ],
        },
        additionalSection([
          ADDITIONAL_LINK.mcpInterface,
          ADDITIONAL_LINK.scripts,
          ADDITIONAL_LINK.deploy,
        ]),
      ],
      '/mcp-interface/': [
        additionalSection(
          [
            ADDITIONAL_LINK.mcpInterface,
            ADDITIONAL_LINK.drr,
            ADDITIONAL_LINK.scripts,
            ADDITIONAL_LINK.deploy,
          ],
          { collapsed: false },
        ),
      ],
      '/drr/': [
        {
          text: 'Decision Records',
          items: [
            {
              text: 'DRR-0001',
              link: '/drr/DRR-0001-mcp-first-class-interface/',
            },
          ],
        },
        additionalSection([
          ADDITIONAL_LINK.mcpInterface,
          ADDITIONAL_LINK.scripts,
          ADDITIONAL_LINK.deploy,
        ]),
      ],
      '/scripts/': [
        additionalSection(
          [
            ADDITIONAL_LINK.scripts,
            ADDITIONAL_LINK.mcpInterface,
            ADDITIONAL_LINK.drr,
            ADDITIONAL_LINK.deploy,
          ],
          { collapsed: false },
        ),
      ],
      '/deploy/': [
        additionalSection(
          [
            ADDITIONAL_LINK.deploy,
            ADDITIONAL_LINK.scripts,
            ADDITIONAL_LINK.mcpInterface,
            ADDITIONAL_LINK.drr,
          ],
          { collapsed: false },
        ),
      ],
    },
    search: true,
    lastUpdated: true,
    enableScrollToTop: true,
    footer: {
      message: 'Built from the local FPF compiler snapshot.',
    },
  },
});
