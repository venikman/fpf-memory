import { copyFile, mkdir, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

import { parseBuildConfig } from '../adapters/infra/config/env.js';
import {
  ARTIFACT_FILENAMES,
  HOSTED_STAGED_ARTIFACT_DIR,
  HOSTED_STAGED_SOURCE_PATH,
} from '../core/constants.js';

export interface BuildVercelOriginOptions {
  rootDir?: string;
  env?: NodeJS.ProcessEnv;
}

const OUTPUT_DIR = '.vercel/output';
const FUNCTION_DIR = `${OUTPUT_DIR}/functions/index.func`;

export async function buildVercelOrigin(
  options: BuildVercelOriginOptions = {},
): Promise<void> {
  const rootDir = resolve(options.rootDir ?? process.cwd());
  const env = options.env ?? process.env;
  const buildConfig = parseBuildConfig(env);
  const outputDir = resolve(rootDir, OUTPUT_DIR);
  const functionDir = resolve(rootDir, FUNCTION_DIR);

  await rm(outputDir, { recursive: true, force: true });
  await mkdir(functionDir, { recursive: true });

  await bundleFunction(rootDir, functionDir);
  await writeVercelConfig(outputDir);
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
    throw new Error(`Vercel origin bundle failed:${messages ? `\n${messages}` : ''}`);
  }
}

async function writeVercelConfig(outputDir: string): Promise<void> {
  await mkdir(outputDir, { recursive: true });
  await writeJson(resolve(outputDir, 'config.json'), {
    version: 3,
    routes: [
      { src: '^/$', dest: '/index' },
      { src: '^/connect-mcp$', dest: '/index' },
      { src: '^/api/mcp/fpf_memory/mcp$', dest: '/index' },
    ],
  });
}

async function writeFunctionConfig(functionDir: string): Promise<void> {
  await writeJson(resolve(functionDir, '.vc-config.json'), {
    runtime: 'nodejs22.x',
    handler: 'index.mjs',
    memory: 2048,
    maxDuration: 300,
    regions: ['iad1'],
    supportsResponseStreaming: true,
    launcherType: 'Nodejs',
    shouldAddHelpers: true,
    shouldAddSourcemapSupport: true,
  });
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
  const functionSource = resolve(functionDir, HOSTED_STAGED_SOURCE_PATH);
  const functionSnapshot = resolve(
    functionDir,
    HOSTED_STAGED_ARTIFACT_DIR,
    ARTIFACT_FILENAMES.snapshot,
  );

  await mkdir(dirname(functionSource), { recursive: true });
  await mkdir(dirname(functionSnapshot), { recursive: true });
  await copyStagedFile(stagedSource, functionSource, 'spec');
  await copyStagedFile(stagedSnapshot, functionSnapshot, 'snapshot');
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
