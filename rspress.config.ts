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

export default defineConfig({
  root: docsRoot,
  outDir,
  base: '/fpf-memory/',
  title: 'FPF Reference',
  description: 'Compiler-backed FPF reference docs generated from the configured spec source.',
  globalStyles: resolve(process.cwd(), 'src/docs/theme.css'),
  // Theme fonts — Inter Tight (display), Source Serif 4 (reading floor),
  // JetBrains Mono (code). Loaded via `@import` in src/docs/theme.css so the
  // CSS bundle owns the dependency; preconnect tags here keep the FOUT short.
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    // Accessibility shim. Rspress wraps every markdown table in a
    // `.rp-table-scroll-container` so wide tables get horizontal overflow,
    // but the wrapper ships without `tabindex` — axe-core flags it as
    // `scrollable-region-focusable` (WCAG 2.1.1) because keyboard users
    // can't scroll the table region. Add `tabindex="0"` after each render
    // (initial + client-side route transitions) so the wrapper enters the
    // focus order. Idempotent; safe to run repeatedly.
    `<script>(function(){function fix(){document.querySelectorAll('.rp-table-scroll-container').forEach(function(el){if(!el.hasAttribute('tabindex'))el.setAttribute('tabindex','0');});}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fix);else fix();var lp=location.pathname;setInterval(function(){if(location.pathname!==lp){lp=location.pathname;setTimeout(fix,150);}else fix();},800);})();</script>`,
  ],
  route: {
    cleanUrls: true,
  },
  markdown: {
    link: {
      checkDeadLinks: {
        // Skip relative links (`./foo.md`, `../README.md`, `../src/foo.ts`) —
        // authored docs use these to stay navigable on GitHub, and rspress
        // can't resolve them. Absolute internal links are still checked.
        excludes: (url: string) => url.startsWith('./') || url.startsWith('../'),
      },
    },
  },
  themeConfig: {
    nav: [
      {
        text: 'Patterns',
        link: '/',
      },
      {
        text: 'Routes',
        link: '/generated/routes/index',
      },
      {
        text: 'Glossary',
        link: '/generated/patterns/H.1',
      },
      {
        text: 'Change log',
        link: '/generated/patterns/I.3',
      },
      {
        text: 'Welcome',
        link: '/welcome',
      },
      {
        text: 'Start Here',
        link: '/start-here',
      },
      {
        text: 'Work Packets',
        link: '/work-packets',
      },
      {
        text: 'MCP Recipes',
        link: '/mcp-recipes',
      },
    ],
    sidebar: {
      // The root URL `/` IS the FPF index — share the same pattern-tree
      // sidebar as the deep-link catalog at `/generated/patterns/` so the
      // catalog reads the same way regardless of which URL the visitor
      // arrived through. The root sidebar omits the "Pattern Catalog"
      // self-link that the deep-link sidebar carries — on `/` the page H1
      // already names the catalog, and a self-link rendered as the loud
      // active state was the brightest pixel on the page (see validation
      // pass).
      '/': [
        {
          text: 'Patterns',
          items: [
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
              link: '/',
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
    },
    search: true,
    lastUpdated: true,
    enableScrollToTop: true,
    footer: {
      message: 'Projection of the latest published FPF.',
    },
  },
});
