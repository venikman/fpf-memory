import { copyFile, cp, mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, resolve, sep } from 'node:path';

import { parseBuildConfig } from '../adapters/infra/config/env.js';
import {
  ARTIFACT_FILENAMES,
  HOSTED_STAGED_ARTIFACT_DIR,
  HOSTED_STAGED_MANIFEST_PATH,
  HOSTED_STAGED_SOURCE_PATH,
  PUBLISHED_MANIFEST_PATH,
  WEBSITE_PUBLICATION_MANIFEST_PATH,
} from '../core/constants.js';
import {
  createLegacyHostedMcpGoneBody,
  HOSTED_FPF_STATUS_ROUTE,
  HOSTED_HOME_ROUTES,
  LEGACY_HOSTED_MCP_GONE_STATUS,
  LEGACY_HOSTED_MCP_ROUTE,
  HOSTED_MCP_ROUTES,
} from '../composition/hosted.js';

export interface BuildVercelDeploymentOptions {
  rootDir?: string;
  env?: NodeJS.ProcessEnv;
}

const OUTPUT_DIR = '.vercel/output';
const MCP_FUNCTION_NAME = '_mcp';
export const VERCEL_MCP_FUNCTION_BUNDLE_PATH =
  `${OUTPUT_DIR}/functions/${MCP_FUNCTION_NAME}.func`;
const MCP_FUNCTION_DEST = `/${MCP_FUNCTION_NAME}`;
const LEGACY_HOSTED_MCP_SUCCESSOR_URL = 'https://mcp.fpf.sh/api/mcp/fpf_reference/mcp';
const VERCEL_LEGACY_MCP_GONE_STATIC_FILE = 'legacy-mcp-gone.json';
export const VERCEL_FUNCTION_RUNTIME = 'nodejs24.x';
export const VERCEL_FUNCTION_MEMORY_MB = 1024;
export const VERCEL_FUNCTION_MAX_DURATION_SECONDS = 20;
const STATIC_DIR = `${OUTPUT_DIR}/static`;
export const WEBSITE_CANONICAL_ORIGIN = 'https://fpf.sh';
const WEBSITE_SITEMAP_FILENAME = 'sitemap.xml';
const WEBSITE_ROBOTS_FILENAME = 'robots.txt';
const WEBSITE_404_FILE = '/404.html';

export type VercelDeploymentRoute =
  | {
      // Phase marker — `handle: "filesystem"` tells Vercel to try the
      // .vercel/output/static/ tree before evaluating the routes that follow.
      // Without this, function routes that don't match still fall through to
      // an implicit "send to /index" instead of the static fallback we want.
      handle: 'filesystem' | 'miss' | 'rewrite' | 'hit' | 'error' | 'resource';
    }
  | {
      src: string;
      dest?: string;
      headers?: Record<string, string>;
      methods?: string[];
      status?: number;
      continue?: boolean;
      check?: boolean;
      caseSensitive?: boolean;
      // Marks the header as authoritative so the platform's default
      // static-file cache policy (max-age=0, must-revalidate) can't
      // override it. Same flag Vercel's own framework builders emit.
      important?: boolean;
    };

export interface VercelDeploymentOutputConfig {
  version: 3;
  routes: VercelDeploymentRoute[];
}

export async function buildVercelWebsite(
  options: BuildVercelDeploymentOptions = {},
): Promise<void> {
  const rootDir = resolve(options.rootDir ?? process.cwd());
  const env = options.env ?? process.env;
  const buildConfig = parseBuildConfig(env);
  const outputDir = resolve(rootDir, OUTPUT_DIR);
  const staticDir = resolve(rootDir, STATIC_DIR);
  const docsBuildDir = resolve(rootDir, buildConfig.docsOutDir);

  await rm(outputDir, { recursive: true, force: true });

  await writeVercelConfig(outputDir, createVercelWebsiteOutputConfig());
  await copyDocsToStatic(docsBuildDir, staticDir);
  await copyFile(
    resolve(rootDir, PUBLISHED_MANIFEST_PATH),
    resolve(staticDir, WEBSITE_PUBLICATION_MANIFEST_PATH),
  );
  await writeWebsiteSeoFiles(staticDir);
}

export async function buildVercelMcp(
  options: BuildVercelDeploymentOptions = {},
): Promise<void> {
  const rootDir = resolve(options.rootDir ?? process.cwd());
  const env = options.env ?? process.env;
  const buildConfig = parseBuildConfig(env);
  const outputDir = resolve(rootDir, OUTPUT_DIR);
  const functionDir = resolve(rootDir, VERCEL_MCP_FUNCTION_BUNDLE_PATH);

  await rm(outputDir, { recursive: true, force: true });
  await mkdir(functionDir, { recursive: true });

  await bundleFunction(rootDir, functionDir);
  await writeVercelConfig(outputDir, createVercelMcpOutputConfig());
  await writeLegacyMcpGoneStatic(resolve(rootDir, STATIC_DIR));
  await writeFunctionConfig(functionDir);
  await copyHostedStage(rootDir, buildConfig.hostedPublicDir, functionDir);
}

async function writeLegacyMcpGoneStatic(staticDir: string): Promise<void> {
  await mkdir(staticDir, { recursive: true });
  await writeFile(
    resolve(staticDir, VERCEL_LEGACY_MCP_GONE_STATIC_FILE),
    createLegacyHostedMcpGoneBody(),
  );
}

async function bundleFunction(rootDir: string, functionDir: string): Promise<void> {
  const result = await Bun.build({
    entrypoints: [resolve(rootDir, 'src/entrypoints/vercel-function.ts')],
    outdir: functionDir,
    naming: {
      entry: 'index.mjs',
    },
    target: 'node',
    format: 'esm',
    sourcemap: 'external',
  });

  if (!result.success) {
    const messages = result.logs.map((log) => log.message).join('\n');
    throw new Error(`Vercel MCP bundle failed:${messages ? `\n${messages}` : ''}`);
  }
}

async function writeVercelConfig(
  outputDir: string,
  config: VercelDeploymentOutputConfig,
): Promise<void> {
  await mkdir(outputDir, { recursive: true });
  await writeJson(resolve(outputDir, 'config.json'), config);
}

export function createVercelWebsiteOutputConfig(): VercelDeploymentOutputConfig {
  // Phase order in `routes` is significant. Flow for every request:
  //
  //   1. `handle: "filesystem"` — try static exact match
  //      (`/index.html`, `/start-here.html`, `/generated/patterns/A.6.9.html`).
  //      Vercel resolves bare `/` to `index.html` for free in this phase.
  //   2. `handle: "miss"` — only enters this phase if filesystem missed.
  //      Inside, rewrite
  //      `/foo` → `/foo.html` with `check: true` so Vercel re-runs from
  //      the top of the routes table; the second filesystem pass picks
  //      up the rewritten `.html` file.
  //   3. `handle: "hit"` — runs when a filesystem match is found. Every
  //      file under /static/ is content-hashed by rspress (js, css, async
  //      chunks, the search index json), so serve them with a one-year
  //      immutable cache-control instead of Vercel's static default
  //      (max-age=0, must-revalidate), which forced a revalidation
  //      round-trip per asset on every visit. HTML files live outside
  //      /static/ and keep the revalidate default — they must pick up new
  //      hashed asset references on deploy.
  //   4. `handle: "error"` — when both filesystem passes miss, serve the
  //      rspress-built branded `/404.html` with a real 404 status instead
  //      of Vercel's unbranded platform default page.
  //
  // The website deployment deliberately has no function routes; MCP and
  // status APIs are packaged by the separate MCP deployment.
  return {
    version: 3,
    routes: [
      { handle: 'filesystem' },
      { handle: 'miss' },
      { src: '^/(.*)$', dest: '/$1.html', check: true },
      { handle: 'hit' },
      {
        src: '^/static/(.*)$',
        headers: { 'cache-control': 'public, max-age=31536000, immutable' },
        continue: true,
        important: true,
      },
      { handle: 'error' },
      { src: '^/.*$', dest: WEBSITE_404_FILE, status: 404 },
    ],
  };
}

// rspress v2 has no built-in sitemap support, so the website bundle
// derives sitemap.xml from the built static tree — the URL set always
// mirrors exactly what the deploy serves. robots.txt points crawlers at
// it. Paths drop the `.html` suffix to match the site's clean URLs;
// the root `index.html` maps to `/` and the 404 page is excluded.
export async function collectWebsiteSitemapPaths(staticDir: string): Promise<string[]> {
  const entries = await readdir(staticDir, { recursive: true });
  const paths: string[] = [];
  for (const entry of entries) {
    const relativePath = entry.split(sep).join('/');
    if (!relativePath.endsWith('.html') || relativePath === '404.html') {
      continue;
    }
    paths.push(
      relativePath === 'index.html'
        ? '/'
        : `/${relativePath.slice(0, -'.html'.length)}`,
    );
  }
  return paths.sort();
}

export function createWebsiteSitemapXml(paths: readonly string[]): string {
  const urls = paths
    .map((path) => `  <url><loc>${escapeXml(`${WEBSITE_CANONICAL_ORIGIN}${path}`)}</loc></url>`)
    .join('\n');
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    '',
  ].join('\n');
}

export function createWebsiteRobotsTxt(): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${WEBSITE_CANONICAL_ORIGIN}/${WEBSITE_SITEMAP_FILENAME}\n`;
}

async function writeWebsiteSeoFiles(staticDir: string): Promise<void> {
  const paths = await collectWebsiteSitemapPaths(staticDir);
  await writeFile(
    resolve(staticDir, WEBSITE_SITEMAP_FILENAME),
    createWebsiteSitemapXml(paths),
    'utf8',
  );
  await writeFile(
    resolve(staticDir, WEBSITE_ROBOTS_FILENAME),
    createWebsiteRobotsTxt(),
    'utf8',
  );
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll("'", '&apos;')
    .replaceAll('"', '&quot;');
}

export function createVercelMcpOutputConfig(): VercelDeploymentOutputConfig {
  const dest = MCP_FUNCTION_DEST;
  const mcpFunctionRoutes = HOSTED_MCP_ROUTES.filter(
    (route) => route !== LEGACY_HOSTED_MCP_ROUTE,
  );
  return {
    version: 3,
    routes: [
      createVercelLegacyMcpBlockedRoute(),
      ...HOSTED_HOME_ROUTES.map((route) => ({ src: `^${route}$`, dest })),
      { src: `^${HOSTED_FPF_STATUS_ROUTE}$`, dest },
      ...mcpFunctionRoutes.map((route) => ({ src: `^${route}$`, dest })),
    ],
  };
}

export function createVercelLegacyMcpBlockedRoute(): VercelDeploymentRoute {
  // Static 410 body; see LEGACY_HOSTED_MCP_GONE_STATUS in hosted.ts.
  return {
    src: `^${LEGACY_HOSTED_MCP_ROUTE}$`,
    dest: `/${VERCEL_LEGACY_MCP_GONE_STATIC_FILE}`,
    status: LEGACY_HOSTED_MCP_GONE_STATUS,
    headers: {
      'Cache-Control': 'no-store',
      Link: `<${LEGACY_HOSTED_MCP_SUCCESSOR_URL}>; rel="successor-version"`,
    },
  };
}

async function writeFunctionConfig(functionDir: string): Promise<void> {
  await writeJson(resolve(functionDir, '.vc-config.json'), createVercelFunctionConfig());
}

export function createVercelFunctionConfig() {
  return {
    runtime: VERCEL_FUNCTION_RUNTIME,
    handler: 'index.mjs',
    memory: VERCEL_FUNCTION_MEMORY_MB,
    maxDuration: VERCEL_FUNCTION_MAX_DURATION_SECONDS,
    regions: ['iad1'],
    supportsResponseStreaming: true,
    launcherType: 'Nodejs',
    // Vercel's launcher consumes the request body to populate `req.body`
    // when helpers are enabled. The MCP Streamable HTTP transport reads the
    // raw IncomingMessage stream itself, so a pre-consumed body leaves it
    // waiting forever and the function hits maxDuration (504). Keep helpers
    // off so the request stream stays readable for the transport.
    shouldAddHelpers: false,
    shouldAddSourcemapSupport: true,
  };
}

async function copyHostedStage(
  rootDir: string,
  hostedPublicDir: string,
  functionDir: string,
): Promise<void> {
  const stagedRoot = resolve(rootDir, hostedPublicDir);
  const stagedSource = resolve(stagedRoot, HOSTED_STAGED_SOURCE_PATH);
  const stagedSnapshot = resolve(
    stagedRoot,
    HOSTED_STAGED_ARTIFACT_DIR,
    ARTIFACT_FILENAMES.snapshot,
  );
  const stagedManifest = resolve(stagedRoot, HOSTED_STAGED_MANIFEST_PATH);
  const functionSource = resolve(functionDir, HOSTED_STAGED_SOURCE_PATH);
  const functionSnapshot = resolve(
    functionDir,
    HOSTED_STAGED_ARTIFACT_DIR,
    ARTIFACT_FILENAMES.snapshot,
  );
  const functionManifest = resolve(functionDir, HOSTED_STAGED_MANIFEST_PATH);

  await mkdir(dirname(functionSource), { recursive: true });
  await mkdir(dirname(functionSnapshot), { recursive: true });
  await mkdir(dirname(functionManifest), { recursive: true });
  await copyStagedFile(stagedSource, functionSource, 'spec');
  await copyStagedFile(stagedSnapshot, functionSnapshot, 'snapshot');
  await copyStagedFile(stagedManifest, functionManifest, 'manifest');
}

async function copyDocsToStatic(docsBuildDir: string, staticDir: string): Promise<void> {
  // Rspress emits the built site to `doc_build/` (configurable via
  // FPF_DOCS_OUT_DIR). Copy that whole tree into Vercel's static-files
  // directory so the deploy serves the docs at the project root.
  try {
    const stats = await stat(docsBuildDir);
    if (!stats.isDirectory()) {
      throw new Error('not a directory');
    }
  } catch (error) {
    throw new Error(
      `Vercel website bundle: missing built docs at ${docsBuildDir}. Did \`bun run docs:build\` run first?`,
      { cause: error },
    );
  }
  await mkdir(staticDir, { recursive: true });
  await cp(docsBuildDir, staticDir, { recursive: true });
}

async function copyStagedFile(source: string, target: string, label: string): Promise<void> {
  try {
    const sourceStats = await stat(source);
    if (!sourceStats.isFile()) {
      throw new Error('not a file');
    }
  } catch (error) {
    throw new Error(
      `Vercel MCP bundle: missing staged ${label} at ${source}. Did \`bun run stage:from-published\` run first?`,
      { cause: error },
    );
  }
  await copyFile(source, target);
}

async function writeJson(path: string, value: unknown): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}
