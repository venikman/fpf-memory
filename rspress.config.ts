import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { defineConfig } from '@rspress/core';

import { DEFAULT_SOURCE_PATH } from './src/core/constants.js';
import { buildDocsNavigation } from './src/core/documents.js';
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
    // Favicon: inline SVG (cream paper + accent serif F). No binary asset
    // to commit; the data-URI is ~250 bytes. Fixes DS-P3-009 favicon 404.
    [
      'link',
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23faf4ec'/%3E%3Ctext x='32' y='46' font-family='Georgia,serif' font-size='44' font-weight='700' text-anchor='middle' fill='%23ac3225'%3EF%3C/text%3E%3C/svg%3E",
      },
    ],
    // OG / social metadata. og:image is omitted intentionally — we don't
    // ship a 1200x630 PNG yet, and Twitter/Slack will fall back to a
    // text-only card with the title and description.
    ['meta', { property: 'og:site_name', content: 'FPF Reference' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'theme-color', content: '#faf4ec', media: '(prefers-color-scheme: light)' }],
    ['meta', { name: 'theme-color', content: '#1f1812', media: '(prefers-color-scheme: dark)' }],
    // Accessibility shim — covers four rspress DOM gaps that the framework
    // doesn't expose hooks for. Driven by a single MutationObserver so we
    // don't poll on intervals (per FU validation P3-012). All effects are
    // idempotent and re-apply on client-side route transitions.
    //
    //   1. .rp-table-scroll-container ships without tabindex → keyboard
    //      users can't scroll wide tables (WCAG 2.1.1, axe
    //      scrollable-region-focusable). Add tabindex=0.
    //   2. .rp-search-button--mobile is a clickable <div> with no role,
    //      tabindex, or accessible name (FU-P1-001). Add role=button,
    //      tabindex=0, aria-label, and Enter/Space activation.
    //   3. Sidebar group headers (.rp-sidebar-collapse, "rp-sidebar-group")
    //      are clickable <div>s with no role/tabindex/aria-expanded
    //      (FU-P2-006). Add button semantics + keyboard activation.
    //   4. The closed mobile sidebar drawer keeps focusable links in the
    //      tab order at negative x positions (FU-P1-002). Set inert on the
    //      drawer element when its parent layout is in mobile-closed state.
    //
    //   The script runs at <head> evaluation (synchronous, no defer) so
    //   the initial paint already has correct semantics.
    `<script>(function(){
function fixTables(root){(root||document).querySelectorAll('.rp-table-scroll-container').forEach(function(el){if(!el.hasAttribute('tabindex'))el.setAttribute('tabindex','0');});}
function fixMobileSearch(root){(root||document).querySelectorAll('.rp-search-button--mobile').forEach(function(el){if(el.dataset.fpfA11yPatched==='1')return;el.dataset.fpfA11yPatched='1';el.setAttribute('role','button');el.setAttribute('tabindex','0');el.setAttribute('aria-label','Search');el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();el.click();}});});}
function fixSidebarGroups(root){(root||document).querySelectorAll('.rp-sidebar-group:not(a):not(button)').forEach(function(el){if(el.dataset.fpfA11yPatched==='1')return;if(el.tagName==='A'||el.tagName==='BUTTON')return;el.dataset.fpfA11yPatched='1';el.setAttribute('role','button');if(!el.hasAttribute('tabindex'))el.setAttribute('tabindex','0');function readExpanded(){var panel=el.nextElementSibling;if(!panel)return true;var rows=panel.style.gridTemplateRows||getComputedStyle(panel).gridTemplateRows;return !(rows==='0fr'||rows==='0px');}el.setAttribute('aria-expanded',String(readExpanded()));el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();el.click();}});var panel=el.nextElementSibling;if(panel){var observer=new MutationObserver(function(){el.setAttribute('aria-expanded',String(readExpanded()));});observer.observe(panel,{attributes:true,attributeFilter:['style']});}});}
function fixSidebarInert(){var sidebar=document.querySelector('.rp-doc-layout__sidebar');if(!sidebar)return;var rect=sidebar.getBoundingClientRect();var hidden=rect.right<=0||rect.left>=window.innerWidth;if(hidden){if(!sidebar.hasAttribute('inert'))sidebar.setAttribute('inert','');}else{sidebar.removeAttribute('inert');}}
function applyAll(){fixTables();fixMobileSearch();fixSidebarGroups();fixSidebarInert();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',applyAll);else applyAll();
var observer=new MutationObserver(function(mutations){var needs=false;for(var i=0;i<mutations.length;i++){if(mutations[i].addedNodes.length){needs=true;break;}}if(needs)applyAll();});
observer.observe(document.body||document.documentElement,{childList:true,subtree:true});
window.addEventListener('resize',fixSidebarInert);
window.addEventListener('transitionend',fixSidebarInert);
})();</script>`,
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
      // Adoption-first ordering: the front door is `/`, the working
      // surfaces follow, and the generated reference + integration
      // guides are grouped under collapsible items so the top nav stays
      // task-first and ~5 wide. Per validation FU-P2-001/002/003: root
      // is the orientation page, no top-level item matches every URL,
      // and the nav fits without overflowing the tablet breakpoint.
      {
        text: 'Start Here',
        link: '/start-here',
      },
      {
        text: 'Work Packets',
        link: '/work-packets',
      },
      {
        text: 'MCP',
        items: [
          { text: 'Recipes', link: '/mcp-recipes' },
          { text: 'Connect to clients', link: '/connect-mcp' },
          { text: 'Vercel proxy', link: '/vercel-proxy' },
        ],
      },
      {
        text: 'Reference',
        items: [
          { text: 'Pattern catalog', link: '/patterns' },
          { text: 'Routes', link: '/generated/routes/index' },
          { text: 'Glossary', link: '/generated/patterns/H.1' },
          { text: 'Change log', link: '/generated/patterns/I.3' },
        ],
      },
    ],
    sidebar: {
      // Sidebar scope is now narrow:
      //   - `/patterns` and every `/generated/patterns/...` page get the
      //     full pattern tree.
      //   - `/generated/routes/...` get the routes tree.
      //   - The root `/` and authored pages (start-here, work-packets,
      //     mcp-recipes, connect-mcp, vercel-proxy) get NO sidebar so the
      //     orientation surface stays focused on its own task-first cards.
      '/patterns': [
        {
          text: 'Patterns',
          items: [
            { text: 'Pattern Catalog', link: '/patterns' },
            ...navigation.patterns.map((group) => ({
              text: group.text,
              collapsible: true,
              collapsed: true,
              items: group.items,
            })),
          ],
        },
      ],
      '/generated/patterns/': [
        {
          text: 'Patterns',
          items: [
            { text: 'Pattern Catalog', link: '/patterns' },
            ...navigation.patterns.map((group) => ({
              text: group.text,
              collapsible: true,
              collapsed: true,
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
              collapsed: true,
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
