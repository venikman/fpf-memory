import { spawnSync } from 'node:child_process';
import { cp, mkdir, mkdtemp, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

import {
  extractLatestProductionDeploymentUrl,
  extractStagedDeploymentUrl,
} from '../src/build/vercel-deploy-output.js';

interface Surface {
  id: string;
  project: string;
  config: string;
  buildScript: string;
  verifyOutput: (outputDir: string) => Promise<void>;
}

interface PreparedSurface {
  surface: Surface;
  outputDir: string;
  previousProductionUrl: string;
  stagedDeploymentUrl?: string;
  promoted: boolean;
}

const rootDir = process.cwd();
const outputDir = resolve(rootDir, '.vercel/output');
const scope = process.env.FPF_VERCEL_SCOPE ?? process.env.VERCEL_SCOPE ?? '';
const tempRoot = await mkdtemp(resolve(tmpdir(), 'fpf-vercel-prod-'));

const surfaces: Surface[] = [
  {
    id: 'website',
    project: 'fpf-sh',
    config: 'vercel.json',
    buildScript: 'vercel:website:build',
    verifyOutput: assertWebsiteOutput,
  },
  {
    id: 'mcp',
    project: 'fpf-reference-mcp',
    config: 'vercel.mcp.json',
    buildScript: 'vercel:mcp:build',
    verifyOutput: assertMcpOutput,
  },
];

try {
  run('bun', ['run', 'deploy:validate']);

  const prepared: PreparedSurface[] = [];
  for (const surface of surfaces) {
    const previousProductionUrl = latestProductionDeploymentUrl(surface);
    run('bun', ['run', surface.buildScript]);
    await surface.verifyOutput(outputDir);

    const surfaceOutputDir = resolve(tempRoot, `${surface.id}-output`);
    await cp(outputDir, surfaceOutputDir, { recursive: true });
    prepared.push({
      surface,
      outputDir: surfaceOutputDir,
      previousProductionUrl,
      promoted: false,
    });
  }

  for (const state of prepared) {
    state.stagedDeploymentUrl = await deployStagedProduction(state);
  }

  try {
    for (const state of prepared) {
      promoteDeployment(state.surface, requiredUrl(state));
      state.promoted = true;
    }
    run('bun', ['run', 'monitor:sync', '--', '--format', 'markdown', '--fail-on-breach']);
    run('bun', [
      'run',
      'monitor:content',
      '--',
      '--mode',
      'live',
      '--format',
      'markdown',
      '--fail-on-breach',
    ]);
  } catch (error) {
    rollbackPromotions(prepared);
    throw error;
  }
} finally {
  await rm(tempRoot, { recursive: true, force: true });
}

async function deployStagedProduction(state: PreparedSurface): Promise<string> {
  const deployRoot = resolve(tempRoot, `${state.surface.id}-deploy`);
  await mkdir(resolve(deployRoot, '.vercel'), { recursive: true });
  await cp(state.outputDir, resolve(deployRoot, '.vercel/output'), { recursive: true });

  const configPath = resolve(rootDir, state.surface.config);
  runVercel([
    'link',
    '--yes',
    '--project',
    state.surface.project,
    ...vercelScopeArgs(),
    '--cwd',
    deployRoot,
    '--local-config',
    configPath,
  ]);

  const output = runVercelCapture([
    'deploy',
    deployRoot,
    '--prebuilt',
    '--yes',
    '--prod',
    '--skip-domain',
    '--local-config',
    configPath,
    ...vercelScopeArgs(),
  ]);
  const deploymentUrl = extractStagedDeploymentUrl(output, `${state.surface.id} staged deployment`);
  process.stdout.write(`Staged ${state.surface.id} production deployment: ${deploymentUrl}\n`);
  return deploymentUrl;
}

function latestProductionDeploymentUrl(surface: Surface): string {
  const output = runVercelCapture([
    'ls',
    surface.project,
    '--environment',
    'production',
    '--status',
    'READY',
    '--yes',
    ...vercelScopeArgs(),
  ]);
  const deploymentUrl = extractLatestProductionDeploymentUrl(
    output,
    `${surface.id} previous production deployment`,
  );
  process.stdout.write(`Previous ${surface.id} production deployment: ${deploymentUrl}\n`);
  return deploymentUrl;
}

function promoteDeployment(surface: Surface, deploymentUrl: string): void {
  process.stdout.write(`Promoting ${surface.id} deployment: ${deploymentUrl}\n`);
  runVercel([
    'promote',
    deploymentUrl,
    '--yes',
    '--local-config',
    resolve(rootDir, surface.config),
    ...vercelScopeArgs(),
  ]);
}

function rollbackPromotions(states: PreparedSurface[]): void {
  const rollbackFailures: string[] = [];
  for (const state of [...states].reverse()) {
    if (!state.promoted) continue;
    try {
      process.stderr.write(
        `Rolling back ${state.surface.id} to ${state.previousProductionUrl}\n`,
      );
      promoteDeployment(state.surface, state.previousProductionUrl);
    } catch (error) {
      rollbackFailures.push(`${state.surface.id}: ${errorMessage(error)}`);
    }
  }

  if (rollbackFailures.length > 0) {
    throw new Error(`Production rollback failed: ${rollbackFailures.join('; ')}`);
  }
}

async function assertWebsiteOutput(path: string): Promise<void> {
  await assertFile(resolve(path, 'static/index.html'), 'website index');
  await assertFile(
    resolve(path, 'static/fpf-publication-manifest.json'),
    'website publication manifest',
  );
  await assertAbsent(resolve(path, 'functions'), 'website functions directory');
}

async function assertMcpOutput(path: string): Promise<void> {
  await assertFile(resolve(path, 'functions/_mcp.func/index.mjs'), 'MCP function entrypoint');
  await assertFile(
    resolve(path, 'functions/_mcp.func/hosted/manifest.json'),
    'MCP hosted manifest',
  );
  await assertAbsent(resolve(path, 'static'), 'MCP static directory');
}

async function assertFile(path: string, label: string): Promise<void> {
  try {
    const stats = await stat(path);
    if (!stats.isFile()) {
      throw new Error('not a file');
    }
  } catch (error) {
    throw new Error(`Missing ${label} at ${path}.`, { cause: error });
  }
}

async function assertAbsent(path: string, label: string): Promise<void> {
  try {
    await stat(path);
  } catch {
    return;
  }
  throw new Error(`Unexpected ${label} at ${path}.`);
}

function requiredUrl(state: PreparedSurface): string {
  if (!state.stagedDeploymentUrl) {
    throw new Error(`Missing staged deployment URL for ${state.surface.id}.`);
  }
  return state.stagedDeploymentUrl;
}

function runVercel(args: string[]): void {
  run('npx', ['--yes', 'vercel@latest', ...args]);
}

function runVercelCapture(args: string[]): string {
  return run('npx', ['--yes', 'vercel@latest', ...args], { capture: true });
}

function vercelScopeArgs(): string[] {
  return scope ? ['--scope', scope] : [];
}

function run(command: string, args: string[], options?: { capture?: boolean }): string {
  const result = spawnSync(command, args, {
    cwd: rootDir,
    encoding: 'utf8',
    stdio: options?.capture ? 'pipe' : 'inherit',
  });

  const stdout = result.stdout ?? '';
  const stderr = result.stderr ?? '';
  if (options?.capture) {
    process.stdout.write(stdout);
    process.stderr.write(stderr);
  }

  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} exited with code ${result.status ?? 'unknown'}`);
  }
  return `${stdout}\n${stderr}`;
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
