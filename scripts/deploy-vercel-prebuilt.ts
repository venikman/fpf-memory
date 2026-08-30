import { spawnSync } from 'node:child_process';
import { appendFileSync } from 'node:fs';
import { cp, mkdtemp, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

import { extractStagedDeploymentUrl } from '../src/build/vercel-deploy-output.js';

interface DeployArgs {
  project: string;
  config: string;
  prod: boolean;
  scope: string;
}

const args = parseArgs(process.argv.slice(2), process.env);
const rootDir = process.cwd();
const outputDir = resolve(rootDir, '.vercel/output');
const configPath = resolve(rootDir, args.config);
const tempRoot = await mkdtemp(resolve(tmpdir(), 'fpf-vercel-deploy-'));

try {
  await assertDirectory(outputDir, 'prebuilt Vercel output');
  await assertFile(configPath, 'Vercel config');

  runVercel([
    'link',
    '--yes',
    '--project',
    args.project,
    ...vercelScopeArgs(args.scope),
    '--cwd',
    tempRoot,
    '--local-config',
    configPath,
  ]);

  await cp(outputDir, resolve(tempRoot, '.vercel/output'), { recursive: true });

  const deployOutput = runVercelCapture([
    'deploy',
    tempRoot,
    '--prebuilt',
    '--yes',
    '--local-config',
    configPath,
    ...vercelScopeArgs(args.scope),
    ...(args.prod ? ['--prod'] : []),
  ]);
  const deploymentUrl = extractStagedDeploymentUrl(
    deployOutput,
    args.prod ? 'production deployment' : 'preview deployment',
  );
  process.stdout.write(`Staged ${args.prod ? 'production' : 'preview'} deployment: ${deploymentUrl}\n`);
  writeGitHubOutput('deployment_url', deploymentUrl);
} finally {
  await rm(tempRoot, { recursive: true, force: true });
}

function runVercel(args: string[]): void {
  run('npx', ['--yes', 'vercel@54.7.1', ...args]);
}

function runVercelCapture(args: string[]): string {
  return run('npx', ['--yes', 'vercel@54.7.1', ...args], { capture: true });
}

function parseArgs(rawArgs: string[], env: NodeJS.ProcessEnv): DeployArgs {
  let project = '';
  let config = '';
  let prod = false;
  let scope = env.FPF_VERCEL_SCOPE ?? env.VERCEL_SCOPE ?? '';

  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];
    if (arg === '--project') {
      project = readValue(rawArgs, index, arg);
      index += 1;
      continue;
    }
    if (arg === '--config') {
      config = readValue(rawArgs, index, arg);
      index += 1;
      continue;
    }
    if (arg === '--scope') {
      scope = readValue(rawArgs, index, arg);
      index += 1;
      continue;
    }
    if (arg === '--prod') {
      prod = true;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  if (!project) {
    throw new Error('Missing required --project <name> argument.');
  }
  if (!config) {
    throw new Error('Missing required --config <path> argument.');
  }

  return { project, config, prod, scope };
}

function vercelScopeArgs(scope: string): string[] {
  return scope ? ['--scope', scope] : [];
}

function readValue(args: string[], index: number, flag: string): string {
  const value = args[index + 1];
  if (!value || value.startsWith('--')) {
    throw new Error(`Missing value for ${flag}.`);
  }
  return value;
}

async function assertDirectory(path: string, label: string): Promise<void> {
  try {
    const stats = await stat(path);
    if (!stats.isDirectory()) {
      throw new Error('not a directory');
    }
  } catch (error) {
    throw new Error(`Missing ${label} at ${path}. Run the matching build first.`, {
      cause: error,
    });
  }
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

function writeGitHubOutput(key: string, value: string): void {
  const outputFile = process.env.GITHUB_OUTPUT;
  if (!outputFile) {
    return;
  }
  appendFileSync(outputFile, `${key}=${value}\n`);
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
  return `${stdout}${stderr}`;
}
