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
  // Google Fonts — Playfair Display (Belle-Époque editorial display, with
  // Cyrillic), Cormorant Garamond (italic flourishes for taglines), Lora
  // (serif body), JetBrains Mono (code). All four ship Cyrillic glyphs so
  // the FPF source language renders natively.
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=JetBrains+Mono:wght@400;500&display=swap',
      },
    ],
    // Temporary design-variant picker. Reads/writes `localStorage.fpfDesign`,
    // mirrors it onto `<html data-design>`, and mounts a small fixed-position
    // switcher widget on the home route only. Will be removed once the
    // design direction is chosen. Injected as a raw <script> string because
    // rspress's head config only takes strings or `[tag, attrs]` tuples.
    `<script>(function(){var KEY='fpfDesign',VARIANTS=['a','b','c','d'],LABELS={a:'Maximal',b:'Restraint',c:'Letterpress',d:'Mucha'};function g(){try{return localStorage.getItem(KEY)||'a';}catch(e){return'a';}}function s(v){try{localStorage.setItem(KEY,v);}catch(e){}document.documentElement.dataset.design=v;}s(g());function isWelcome(){return /\\/fpf-memory\\/welcome\\/?$/.test(location.pathname);}function mount(){if(!isWelcome())return;if(document.getElementById('fpf-design-switcher'))return;var bar=document.createElement('div');bar.id='fpf-design-switcher';var label=document.createElement('span');label.textContent='design:';label.style.cssText='padding:2px 4px;opacity:0.7;font-size:11px';bar.appendChild(label);VARIANTS.forEach(function(v){var b=document.createElement('button');b.textContent=v.toUpperCase();b.title=LABELS[v];b.dataset.variant=v;b.dataset.active=String(v===g());b.onclick=function(){s(v);Array.prototype.forEach.call(bar.querySelectorAll('button'),function(x){x.dataset.active=String(x.dataset.variant===v);});};bar.appendChild(b);});document.body.appendChild(bar);}function unmount(){var b=document.getElementById('fpf-design-switcher');if(b)b.remove();}function tick(){if(isWelcome())mount();else unmount();}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',tick);else tick();var lp=location.pathname;setInterval(function(){if(location.pathname!==lp){lp=location.pathname;tick();}},400);})();</script>`,
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
      // arrived through.
      '/': [
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
