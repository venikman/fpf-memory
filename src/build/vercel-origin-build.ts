import { copyFile, cp, mkdir, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

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
  HOSTED_FPF_STATUS_ROUTE,
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
export const VERCEL_FUNCTION_RUNTIME = 'nodejs24.x';
export const VERCEL_FUNCTION_MEMORY_MB = 1024;
export const VERCEL_FUNCTION_MAX_DURATION_SECONDS = 20;
const STATIC_DIR = `${OUTPUT_DIR}/static`;

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
  await writeFunctionConfig(functionDir);
  await copyHostedStage(rootDir, buildConfig.hostedPublicDir, functionDir);
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
  //
  // The website deployment deliberately has no function routes; MCP and
  // status APIs are packaged by the separate MCP deployment.
  return {
    version: 3,
    routes: [
      { handle: 'filesystem' },
      { handle: 'miss' },
      { src: '^/(.*)$', dest: '/$1.html', check: true },
    ],
  };
}

export function createVercelMcpOutputConfig(): VercelDeploymentOutputConfig {
  const dest = MCP_FUNCTION_DEST;
  return {
    version: 3,
    routes: [
      { src: `^${HOSTED_FPF_STATUS_ROUTE}$`, dest },
      ...HOSTED_MCP_ROUTES.map((route) => ({ src: `^${route}$`, dest })),
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
