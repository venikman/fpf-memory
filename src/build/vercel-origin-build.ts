import { copyFile, cp, mkdir, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

import { parseBuildConfig } from '../adapters/infra/config/env.js';
import {
  ARTIFACT_FILENAMES,
  HOSTED_STAGED_ARTIFACT_DIR,
  HOSTED_STAGED_MANIFEST_PATH,
  HOSTED_STAGED_SOURCE_PATH,
} from '../core/constants.js';
import {
  HOSTED_FPF_STATUS_ROUTE,
  HOSTED_MCP_ROUTES,
} from '../composition/hosted.js';

export interface BuildVercelOriginOptions {
  rootDir?: string;
  env?: NodeJS.ProcessEnv;
}

const OUTPUT_DIR = '.vercel/output';
// Mount the MCP origin function at `/_origin` rather than `/index` so it
// can't shadow the static `index.html` that Rspress emits at the project
// root. Vercel's filesystem-resolution for bare `/` was matching the
// `functions/index.func/` directory before falling through to
// `static/index.html`, sending docs visitors to the function's hosted
// landing instead of the chapter list. The leading underscore signals an
// internal route — direct visits to `/_origin` aren't advertised, and the
// Hono app inside the function 404s anything outside its registered
// `/api/...` handlers.
const FUNCTION_NAME = '_origin';
const FUNCTION_DIR = `${OUTPUT_DIR}/functions/${FUNCTION_NAME}.func`;
const FUNCTION_DEST = `/${FUNCTION_NAME}`;
export const VERCEL_FUNCTION_RUNTIME = 'nodejs24.x';
export const VERCEL_FUNCTION_MEMORY_MB = 2048;
export const VERCEL_FUNCTION_MAX_DURATION_SECONDS = 300;
const STATIC_DIR = `${OUTPUT_DIR}/static`;

export type VercelOriginRoute =
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
    };

export interface VercelOriginOutputConfig {
  version: 3;
  routes: VercelOriginRoute[];
}

export async function buildVercelOrigin(
  options: BuildVercelOriginOptions = {},
): Promise<void> {
  const rootDir = resolve(options.rootDir ?? process.cwd());
  const env = options.env ?? process.env;
  const buildConfig = parseBuildConfig(env);
  const outputDir = resolve(rootDir, OUTPUT_DIR);
  const functionDir = resolve(rootDir, FUNCTION_DIR);
  const staticDir = resolve(rootDir, STATIC_DIR);
  const docsBuildDir = resolve(rootDir, buildConfig.docsOutDir);

  await rm(outputDir, { recursive: true, force: true });
  await mkdir(functionDir, { recursive: true });

  await bundleFunction(rootDir, functionDir);
  await writeVercelConfig(outputDir);
  await writeFunctionConfig(functionDir);
  await copyHostedStage(rootDir, buildConfig.hostedPublicDir, functionDir);
  await copyDocsToStatic(docsBuildDir, staticDir);
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
    throw new Error(`Vercel origin bundle failed:${messages ? `\n${messages}` : ''}`);
  }
}

async function writeVercelConfig(outputDir: string): Promise<void> {
  await mkdir(outputDir, { recursive: true });
  await writeJson(resolve(outputDir, 'config.json'), createVercelOriginOutputConfig());
}

export function createVercelOriginOutputConfig(): VercelOriginOutputConfig {
  const dest = FUNCTION_DEST;
  // Phase order in `routes` is significant. Flow for every request:
  //
  //   1. `handle: "filesystem"` — try static exact match
  //      (`/index.html`, `/start-here.html`, `/generated/patterns/A.6.9.html`).
  //      Vercel resolves bare `/` to `index.html` for free in this phase.
  //   2. Function routes — only `/api/*` surfaces.
  //   3. `handle: "miss"` — only enters this phase if filesystem missed
  //      AND none of the function routes matched. Inside, rewrite
  //      `/foo` → `/foo.html` with `check: true` so Vercel re-runs from
  //      the top of the routes table; the second filesystem pass picks
  //      up the rewritten `.html` file.
  //
  // PR #106 review history: the rewrite originally lived in the main
  // routes phase, where its greedy `^/(.*)$` matched the `/index`
  // function destination on its way through the table and rewrote
  // `/api/...` traffic to `.html`. Confining the rewrite to the `miss`
  // phase scopes it to "filesystem missed and no function matched",
  // which is exactly when clean-URL fallback should fire.
  return {
    version: 3,
    routes: [
      { handle: 'filesystem' },
      { src: `^${HOSTED_FPF_STATUS_ROUTE}$`, dest },
      ...HOSTED_MCP_ROUTES.map((route) => ({ src: `^${route}$`, dest })),
      { handle: 'miss' },
      { src: '^/(.*)$', dest: '/$1.html', check: true },
    ],
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
      `Vercel origin bundle: missing built docs at ${docsBuildDir}. Did \`bun run docs:build\` run first?`,
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
      `Vercel origin bundle: missing staged ${label} at ${source}. Did \`bun run stage:from-published\` run first?`,
      { cause: error },
    );
  }
  await copyFile(source, target);
}

async function writeJson(path: string, value: unknown): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}
