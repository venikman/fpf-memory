import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { defineConfig } from '@rspress/core';

import { DEFAULT_SOURCE_PATH } from './src/core/constants.js';
import {
  buildDocsNavigation,
  buildSearchIdRegistry,
  renderSearchIdRegistryModule,
} from './src/core/documents.js';
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

// Search-hook registry — a small TS module the hook imports so the
// bundled client search code has the canonical ID/title/path table at
// runtime. Generated from the spec snapshot, written to
// `src/docs/generated-search-id-registry.ts` so the bundler resolves
// it through the normal TS module graph.
//
// The committed registry is the source of truth at build time. We only
// rewrite it when the content actually differs (idempotent) so config
// loads with the current spec leave the working tree clean. A drift
// test (`tests/search-id-registry-drift.test.ts`) re-derives the
// registry from `published/current/FPF-Spec.md` and fails if the
// committed file is stale, so a forgotten regeneration after a spec
// update is caught in CI.
const searchIdRegistry = buildSearchIdRegistry(snapshot);
const searchIdRegistryPath = resolve(
  process.cwd(),
  'src/docs/generated-search-id-registry.ts',
);
const nextRegistrySource = renderSearchIdRegistryModule(searchIdRegistry);
const currentRegistrySource = existsSync(searchIdRegistryPath)
  ? readFileSync(searchIdRegistryPath, 'utf8')
  : '';
if (currentRegistrySource !== nextRegistrySource) {
  writeFileSync(searchIdRegistryPath, nextRegistrySource);
}

// Read the publication manifest so we can surface a "Published from"
// byline on the home page (PR #72 design review). rspress's `pageType:
// home` layout drops body markdown, so we inject the byline via the
// inline a11y shim, sourcing the values from <meta> tags emitted in
// the `head` config below. Falls back to empty strings if the manifest
// isn't present (local dev without a published snapshot).
let manifestSourceHash = '';
let manifestUpstreamRef = '';
let manifestPublishedAt = '';
try {
  const manifest = JSON.parse(
    readFileSync(resolve(process.cwd(), 'published/current/manifest.json'), 'utf8'),
  ) as { sourceHash?: string; upstreamRef?: string; publishedAt?: string };
  manifestSourceHash = manifest.sourceHash ?? '';
  manifestUpstreamRef = manifest.upstreamRef ?? '';
  manifestPublishedAt = manifest.publishedAt ?? '';
} catch {
  // No manifest available — byline injection will be skipped.
}

export default defineConfig({
  root: docsRoot,
  outDir,
  // Apex custom domain (fpf.sh) means the site is served at root.
  // The CNAME file is written into the deploy artifact by the
  // `Deploy Docs to GitHub Pages` workflow so GH Pages picks up the
  // custom domain on every build.
  base: '/',
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
    // Publication manifest as <meta> tags so the inline a11y shim can
    // surface a "Published from <hash> · upstream <ref> · <date>"
    // byline on the home page (PR #72 design review). rspress's home
    // layout drops body markdown, so the byline can't live in the
    // home .md file — it has to be injected client-side.
    ['meta', { name: 'fpf-source-hash', content: manifestSourceHash }],
    ['meta', { name: 'fpf-upstream-ref', content: manifestUpstreamRef }],
    ['meta', { name: 'fpf-published-at', content: manifestPublishedAt }],
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
    //   5. Home feature cards are `<article>` with onClick but no role,
    //      tabindex, or accessible name (R3-P2-001). Add role=link,
    //      tabindex=0, aria-label from the card title, and Enter/Space
    //      activation so they behave as first-class keyboard navigation.
    //   6. Top-nav dropdown triggers (`MCP`, `Reference`) ship as plain
    //      `<div>` elements that only respond to mouse hover; keyboard
    //      users skip them entirely (R5-P1-003). Add role=button,
    //      tabindex=0, aria-haspopup, aria-expanded, and Enter/Space/
    //      Escape handlers so the dropdowns are operable by keyboard.
    //   7. No skip-to-content link (R5-P1-003). Inject one as the first
    //      focusable element in the body so keyboard users can bypass
    //      the long reference sidebar / nav and jump straight to the
    //      article body.
    //   8. Collapsed sidebar groups still keep their descendants in the
    //      tab order (R5-P1-003). Set `inert` on the panel element
    //      whenever its rendered height is 0fr / 0px.
    //
    //   The script runs at <head> evaluation (synchronous, no defer) so
    //   the initial paint already has correct semantics.
    `<script>(function(){
function fixTables(root){(root||document).querySelectorAll('.rp-table-scroll-container').forEach(function(el){if(!el.hasAttribute('tabindex'))el.setAttribute('tabindex','0');});}
function fixMobileSearch(root){(root||document).querySelectorAll('.rp-search-button--mobile').forEach(function(el){if(el.dataset.fpfA11yPatched==='1')return;el.dataset.fpfA11yPatched='1';el.setAttribute('role','button');el.setAttribute('tabindex','0');el.setAttribute('aria-label','Search');el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();el.click();}});});}
function isCollapsedPanel(panel){if(!panel)return false;var rows=panel.style.gridTemplateRows||getComputedStyle(panel).gridTemplateRows;return rows==='0fr'||rows==='0px';}
function fixSidebarGroups(root){(root||document).querySelectorAll('.rp-sidebar-group:not(a):not(button)').forEach(function(el){if(el.dataset.fpfA11yPatched==='1')return;if(el.tagName==='A'||el.tagName==='BUTTON')return;el.dataset.fpfA11yPatched='1';el.setAttribute('role','button');if(!el.hasAttribute('tabindex'))el.setAttribute('tabindex','0');var panel=el.nextElementSibling;function syncState(){var collapsed=isCollapsedPanel(panel);el.setAttribute('aria-expanded',String(!collapsed));if(panel){if(collapsed){if(!panel.hasAttribute('inert'))panel.setAttribute('inert','');}else{panel.removeAttribute('inert');}}}syncState();el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();el.click();}});if(panel){var observer=new MutationObserver(syncState);observer.observe(panel,{attributes:true,attributeFilter:['style']});}});}
function fixSidebarInert(){var sidebar=document.querySelector('.rp-doc-layout__sidebar');if(!sidebar)return;var rect=sidebar.getBoundingClientRect();var hidden=rect.right<=0||rect.left>=window.innerWidth;if(hidden){if(!sidebar.hasAttribute('inert'))sidebar.setAttribute('inert','');}else{sidebar.removeAttribute('inert');}}
function fixHomeFeatureCards(root){(root||document).querySelectorAll('.rp-home-feature__card--clickable').forEach(function(el){if(el.dataset.fpfA11yPatched==='1')return;el.dataset.fpfA11yPatched='1';el.setAttribute('role','link');el.setAttribute('tabindex','0');var title=el.querySelector('.rp-home-feature__title');var detail=el.querySelector('.rp-home-feature__detail');var label=[title&&title.textContent.trim(),detail&&detail.textContent.trim()].filter(Boolean).join(' — ');if(label)el.setAttribute('aria-label',label);el.style.cursor='pointer';el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();el.click();}});});}
function fixNavDropdowns(root){(root||document).querySelectorAll('li.rp-nav-menu__item > .rp-nav-menu__item__container').forEach(function(trigger){if(trigger.dataset.fpfA11yPatched==='1')return;if(trigger.tagName==='A'||trigger.tagName==='BUTTON')return;var panel=trigger.nextElementSibling;if(!panel||!panel.classList||!panel.classList.contains('rp-hover-group'))return;trigger.dataset.fpfA11yPatched='1';trigger.setAttribute('role','button');trigger.setAttribute('tabindex','0');trigger.setAttribute('aria-haspopup','true');function isOpen(){return !panel.classList.contains('rp-hover-group--hidden');}function syncExpanded(){trigger.setAttribute('aria-expanded',String(isOpen()));}syncExpanded();function open(){panel.classList.remove('rp-hover-group--hidden');syncExpanded();}function close(){panel.classList.add('rp-hover-group--hidden');syncExpanded();}trigger.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '||e.key==='ArrowDown'){e.preventDefault();if(isOpen()){close();}else{open();var firstLink=panel.querySelector('a');if(firstLink)firstLink.focus();}}else if(e.key==='Escape'){close();}});panel.addEventListener('keydown',function(e){if(e.key==='Escape'){e.preventDefault();close();trigger.focus();}});var observer=new MutationObserver(syncExpanded);observer.observe(panel,{attributes:true,attributeFilter:['class']});});}
function injectSkipLink(){if(document.getElementById('fpf-skip-link'))return;var link=document.createElement('a');link.id='fpf-skip-link';link.className='fpf-skip-link';link.href='#fpf-main-content';link.textContent='Skip to main content';if(document.body){document.body.insertBefore(link,document.body.firstChild);}var main=document.querySelector('main, .rspress-doc, .rp-doc-content');if(main){if(!main.id)main.id='fpf-main-content';if(!main.hasAttribute('tabindex'))main.setAttribute('tabindex','-1');}else{var doc=document.querySelector('article, .rspress-doc, #__rspress_root');if(doc&&!document.getElementById('fpf-main-content')){doc.id='fpf-main-content';doc.setAttribute('tabindex','-1');}}}
function fixSidebarTitles(root){(root||document).querySelectorAll('.rp-doc-layout__sidebar a.rp-link').forEach(function(a){if(a.dataset.fpfA11yPatched==='1')return;a.dataset.fpfA11yPatched='1';var label=a.textContent.replace(/\s+/g,' ').trim();if(label&&!a.hasAttribute('title'))a.setAttribute('title',label);});}
function injectHeaderProvenance(){if(document.getElementById('fpf-header-provenance'))return;var navLeft=document.querySelector('.rp-nav__left');if(!navLeft)return;function metaContent(name){var sel='meta[name='+JSON.stringify(name)+']';var el=document.querySelector(sel);return el?el.getAttribute('content')||'':'';}var ref=metaContent('fpf-upstream-ref');var rawDate=metaContent('fpf-published-at');if(!ref&&!rawDate)return;var date=rawDate;try{var parsed=new Date(rawDate);if(!isNaN(parsed.getTime())){var y=parsed.getUTCFullYear();var m=String(parsed.getUTCMonth()+1).padStart(2,'0');var d=String(parsed.getUTCDate()).padStart(2,'0');date=y+'-'+m+'-'+d;}}catch(e){}var shortRef=ref?ref.slice(0,8):'';var label=document.createElement('span');label.className='fpf-header-provenance__label';label.textContent='as of';var hashCode=document.createElement('code');hashCode.textContent=shortRef;var dateNode=document.createTextNode(' · '+date);var span=document.createElement('span');span.id='fpf-header-provenance';span.className='fpf-header-provenance';span.title='Spec source — upstream '+ref+' · published '+rawDate;span.appendChild(label);span.appendChild(document.createTextNode(' '));span.appendChild(hashCode);span.appendChild(dateNode);navLeft.appendChild(span);}
function applyAll(){fixTables();fixMobileSearch();fixSidebarGroups();fixSidebarInert();fixSidebarTitles();fixHomeFeatureCards();fixNavDropdowns();injectSkipLink();injectHeaderProvenance();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',applyAll);else applyAll();
var observer=new MutationObserver(function(mutations){var needs=false;for(var i=0;i<mutations.length;i++){if(mutations[i].addedNodes.length){needs=true;break;}}if(needs)applyAll();});
observer.observe(document.body||document.documentElement,{childList:true,subtree:true});
window.addEventListener('resize',fixSidebarInert);
window.addEventListener('transitionend',fixSidebarInert);
})();</script>`,
    // Vim-style keyboard navigation. Bare keys, never with Cmd/Ctrl/Alt,
    // and ignored while focus is in any input. Emitted as a raw-string
    // <script> entry like the existing accessibility shim — rspress's
    // 3-tuple `['script', attrs, body]` shape isn't supported by the
    // head config type, so a string is the only path for inline scripts.
    //
    // PR #105's earlier attempt got its opening <script> tag stripped
    // somewhere in the head emit pipeline. The smoking gun was almost
    // certainly an `el.innerHTML = '<...>'` literal HTML inside the JS
    // string body, which an over-eager HTML pre-processor parsed as real
    // tags. This rewrite uses createElement / setAttribute / textContent
    // exclusively — no embedded HTML markup inside the JS source — so
    // there's nothing for the pre-processor to misread, and the new
    // `tests/e2e/keybindings.spec.ts` would fail loud if it regresses.
    //
    // Bindings:
    //   h / l        previous / next page (clicks .rp-prev-next-page__prev/next)
    //   j / k        scroll down / up (80px steps)
    //   g g          jump to top of page (smooth scroll)
    //   G            jump to bottom (smooth scroll)
    //   /            focus search (clicks the .rp-search-button trigger)
    //   ?            toggle help overlay
    //   Esc          close help overlay (always works, even when toggle is off)
    //
    // The Enabled/Disabled toggle lives inside the help overlay and persists
    // in localStorage under "fpf:vim-keys" (default "1" = on). When the
    // toggle is off, only ? and Esc fire — every navigation key is dormant.
    `<script>(function(){
var STORE_KEY='fpf:vim-keys';
function readEnabled(){try{var v=localStorage.getItem(STORE_KEY);return v===null?true:v==='1';}catch(e){return true;}}
function writeEnabled(on){try{localStorage.setItem(STORE_KEY,on?'1':'0');}catch(e){}}
var enabled=readEnabled();
function isEditable(el){if(!el)return false;var t=el.tagName;if(t==='INPUT'||t==='TEXTAREA'||t==='SELECT')return true;if(el.isContentEditable)return true;return false;}
function focusSearch(){var btn=document.querySelector('.rp-search-button');if(btn){btn.click();requestAnimationFrame(function(){var input=document.querySelector('[role="dialog"] input, .rp-search-input, input[placeholder*="earch"]');if(input)input.focus();});}}
function clickNav(direction){var sel=direction==='prev'?'.rp-prev-next-page__prev':'.rp-prev-next-page__next';var link=document.querySelector(sel);if(link){link.click();return true;}return false;}
var HELP_ID='fpf-keyhelp';
function hideHelp(){var el=document.getElementById(HELP_ID);if(el)el.remove();}
function renderToggleButton(){var btn=document.createElement('button');btn.id='fpf-keyhelp-toggle';btn.type='button';btn.setAttribute('aria-pressed',enabled?'true':'false');btn.textContent=enabled?'Enabled':'Disabled';btn.style.cssText='appearance:none;cursor:pointer;font:inherit;padding:6px 12px;border-radius:6px;border:1px solid var(--rp-c-divider,#ccc);background:'+(enabled?'var(--rp-c-brand,#2466ff)':'var(--rp-c-bg-soft,#f4f4f4)')+';color:'+(enabled?'#fff':'var(--rp-c-text-1,#111)');btn.addEventListener('click',function(){enabled=!enabled;writeEnabled(enabled);btn.setAttribute('aria-pressed',enabled?'true':'false');btn.textContent=enabled?'Enabled':'Disabled';btn.style.background=enabled?'var(--rp-c-brand,#2466ff)':'var(--rp-c-bg-soft,#f4f4f4)';btn.style.color=enabled?'#fff':'var(--rp-c-text-1,#111)';});return btn;}
function showHelp(){if(document.getElementById(HELP_ID)){hideHelp();return;}var rows=[['h','previous page'],['l','next page'],['j','scroll down'],['k','scroll up'],['g g','jump to top'],['G','jump to bottom'],['/','focus search'],['?','toggle this help'],['Esc','close']];var overlay=document.createElement('div');overlay.id=HELP_ID;overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','Keyboard shortcuts');overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:99999;display:grid;place-items:center;font:14px/1.45 system-ui,-apple-system,sans-serif;';var panel=document.createElement('div');panel.style.cssText='background:var(--rp-c-bg,#fff);color:var(--rp-c-text-1,#111);padding:24px 28px;border-radius:10px;max-width:440px;box-shadow:0 8px 32px rgba(0,0,0,0.25);';var head=document.createElement('div');head.style.cssText='display:flex;align-items:center;justify-content:space-between;gap:16px;margin:0 0 16px;';var title=document.createElement('h2');title.textContent='Keyboard shortcuts';title.style.cssText='margin:0;font-size:16px;font-weight:600;';head.appendChild(title);head.appendChild(renderToggleButton());panel.appendChild(head);var table=document.createElement('table');table.style.cssText='width:100%;border-collapse:collapse;';for(var i=0;i<rows.length;i++){var r=rows[i];var tr=document.createElement('tr');var k=document.createElement('td');k.style.cssText='padding:5px 0;width:96px;';var kbd=document.createElement('kbd');kbd.textContent=r[0];kbd.style.cssText='font-family:ui-monospace,monospace;background:var(--rp-c-bg-soft,#f4f4f4);padding:2px 8px;border-radius:4px;border:1px solid var(--rp-c-divider,#ddd);';k.appendChild(kbd);var d=document.createElement('td');d.textContent=r[1];d.style.cssText='padding:5px 0;color:var(--rp-c-text-2,#555);';tr.appendChild(k);tr.appendChild(d);table.appendChild(tr);}panel.appendChild(table);var hint=document.createElement('p');hint.textContent='Bindings ignore typing in inputs. Press ? again or Esc to close. The toggle persists across sessions.';hint.style.cssText='margin:18px 0 0;font-size:12px;color:var(--rp-c-text-3,#888);';panel.appendChild(hint);overlay.appendChild(panel);overlay.addEventListener('click',function(e){if(e.target===overlay)hideHelp();});document.body.appendChild(overlay);}
var lastG=0;
document.addEventListener('keydown',function(e){
  if(e.metaKey||e.ctrlKey||e.altKey)return;
  if(e.key==='Escape'){hideHelp();return;}
  if(isEditable(document.activeElement))return;
  var k=e.key;
  if(k==='?'){e.preventDefault();showHelp();return;}
  if(!enabled)return;
  if(k==='g'&&!e.shiftKey){var now=Date.now();if(now-lastG<500){lastG=0;e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});}else{lastG=now;}return;}
  lastG=0;
  if(k==='G'){e.preventDefault();window.scrollTo({top:document.documentElement.scrollHeight,behavior:'smooth'});return;}
  if(k==='h'){if(clickNav('prev'))e.preventDefault();return;}
  if(k==='l'){if(clickNav('next'))e.preventDefault();return;}
  if(k==='j'){e.preventDefault();window.scrollBy({top:80,behavior:'auto'});return;}
  if(k==='k'){e.preventDefault();window.scrollBy({top:-80,behavior:'auto'});return;}
  if(k==='/'){e.preventDefault();focusSearch();return;}
});
})();</script>`,
  ],
  route: {
    cleanUrls: true,
  },
  // Preview / dev server — route unknown URLs to 404.html instead of
  // falling back to the home page so missing pages don't masquerade as
  // successful navigation (R4-P1-001). Production GitHub Pages already
  // serves 404.html with a real 404 status; this aligns the local
  // preview behavior so validation sees the same rendered content.
  // Static file serving (clean URLs) handles known routes before this
  // fallback fires.
  //
  // `htmlFallback: false` is required because rsbuild's default
  // (`'index'`) tells sirv to serve `index.html` for every unknown
  // path *before* the historyApiFallback middleware ever runs.
  // Disabling it lets the historyApiFallback take over and route to
  // `/404.html` instead.
  builderConfig: {
    server: {
      htmlFallback: false,
      historyApiFallback: {
        index: '/404.html',
      },
    },
  },
  // Custom search hooks — afterSearch reorders FlexSearch results so
  // exact FPF-ID queries (`A.1`, `E.10.D2`, `route:project-alignment`)
  // land on the canonical page first, instead of every descendant whose
  // body mentions the parent ID (R3-P2-002, R4-P1-002, R4-P1-003).
  // For compound IDs that FlexSearch's substring index misses, the hook
  // also synthesizes a TitleMatch from a build-time registry so the
  // canonical page lands at position [0] regardless.
  search: {
    mode: 'local',
    searchHooks: resolve(process.cwd(), 'src/docs/search-hooks.ts'),
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
        text: 'Pattern Index',
        link: '/patterns',
        activeMatch: '/patterns/?($|\\?|#)',
      },
      {
        text: 'MCP',
        items: [
          { text: 'Recipes', link: '/mcp-recipes' },
          { text: 'Connect to clients', link: '/connect-mcp' },
          { text: 'Automation Playbook', link: '/automation-playbook' },
          { text: 'Vercel hosting', link: '/vercel-hosting' },
        ],
      },
      {
        text: 'Reference',
        items: [
          // Direct route links — the four routes named on Start Here so
          // a reader who already knows the work-shape skips the Route
          // Catalog. Order matches Start Here's table.
          {
            text: 'Project alignment',
            link: '/generated/routes/route_project-alignment',
          },
          {
            text: 'Writing / reviewing patterns',
            link: '/generated/routes/route_writing-or-reviewing-patterns',
          },
          {
            text: 'Boundary unpacking',
            link: '/generated/routes/route_boundary-unpacking-claim-routing',
          },
          {
            text: 'Lawful comparison',
            link: '/generated/routes/route_lawful-comparison-pool-selection-selected-set-publication',
          },
          { text: 'All routes', link: '/generated/routes/index' },
          { text: 'Preface', link: '/generated/preface/index' },
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
      //     mcp-recipes, connect-mcp, automation-playbook, vercel-hosting)
      //     get NO sidebar so the orientation surface stays focused on its
      //     own task-first cards.
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
    // Disable rspress's git-based lastUpdated. Generated docs aren't
    // tracked in git (PR #1f8c744d), so the plugin would either show
    // nothing or — worse — show the timestamp of the commit that
    // *removed* them from tracking. The build pipeline appends a
    // "Last Updated: <publishedAt>" line to each generated page from
    // `published/current/manifest.json`, which is the truthful
    // per-snapshot signal.
    lastUpdated: false,
    enableScrollToTop: true,
    footer: {
      message: 'Projection of the latest published FPF.',
    },
  },
});
