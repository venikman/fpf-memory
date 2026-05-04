import { readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const BYTES_PER_MB = 1_000_000;
const DEFAULT_FUNCTION_PATH = '.vercel/output/functions/index.func';
const DEFAULT_WARN_MB = 235;
const DEFAULT_FAIL_MB = 240;

export type BundleBudgetStatus = 'pass' | 'warn' | 'fail';

export interface BundleBudgetOptions {
  functionPath: string;
  warnBytes: number;
  failBytes: number;
}

export interface BundleBudgetResult {
  functionPath: string;
  sizeBytes: number;
  sizeMb: number;
  warnMb: number;
  failMb: number;
  status: BundleBudgetStatus;
}

export function parseBundleBudgetArgs(
  args: string[],
  env: NodeJS.ProcessEnv = process.env,
): BundleBudgetOptions {
  let functionPath = env.VERCEL_FUNCTION_BUNDLE_PATH ?? DEFAULT_FUNCTION_PATH;
  let warnMb = parsePositiveNumber(
    env.VERCEL_FUNCTION_WARN_MB,
    DEFAULT_WARN_MB,
    'VERCEL_FUNCTION_WARN_MB',
  );
  let failMb = parsePositiveNumber(
    env.VERCEL_FUNCTION_FAIL_MB,
    DEFAULT_FAIL_MB,
    'VERCEL_FUNCTION_FAIL_MB',
  );

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    const [name, inlineValue] = arg.split('=', 2);
    const readValue = (): string => {
      if (inlineValue !== undefined) {
        return inlineValue;
      }
      const next = args[index + 1];
      if (!next || next.startsWith('--')) {
        throw new Error(`${name} requires a value`);
      }
      index += 1;
      return next;
    };

    switch (name) {
      case '--path':
        functionPath = readValue();
        break;
      case '--warn-mb':
        warnMb = parsePositiveNumber(readValue(), warnMb, '--warn-mb');
        break;
      case '--fail-mb':
        failMb = parsePositiveNumber(readValue(), failMb, '--fail-mb');
        break;
      default:
        throw new Error(`Unknown option: ${arg}`);
    }
  }

  if (warnMb >= failMb) {
    throw new Error(`warn threshold (${warnMb} MB) must be below fail threshold (${failMb} MB)`);
  }

  return {
    functionPath,
    warnBytes: mbToBytes(warnMb),
    failBytes: mbToBytes(failMb),
  };
}

export async function measureBundleBudget(
  options: BundleBudgetOptions,
  rootDir = process.cwd(),
): Promise<BundleBudgetResult> {
  const absoluteFunctionPath = resolve(rootDir, options.functionPath);
  const sizeBytes = await directorySizeBytes(absoluteFunctionPath);
  const status: BundleBudgetStatus =
    sizeBytes >= options.failBytes ? 'fail' : sizeBytes >= options.warnBytes ? 'warn' : 'pass';

  return {
    functionPath: options.functionPath,
    sizeBytes,
    sizeMb: bytesToMb(sizeBytes),
    warnMb: bytesToMb(options.warnBytes),
    failMb: bytesToMb(options.failBytes),
    status,
  };
}

export function formatBundleBudgetResult(result: BundleBudgetResult): string {
  const summary = `Vercel function bundle ${result.functionPath}: ${formatMb(
    result.sizeMb,
  )} MB (warn ${formatMb(result.warnMb)} MB, fail ${formatMb(result.failMb)} MB)`;
  const headroom = `${result.sizeMb >= result.failMb ? 'Over fail threshold by' : 'Fail-threshold headroom'} ${formatMb(
    Math.abs(result.failMb - result.sizeMb),
  )} MB.`;

  if (result.status === 'fail') {
    return `${summary}\n${headroom}\nFAIL: bundle exceeds the configured fail threshold.`;
  }
  if (result.status === 'warn') {
    return `${summary}\n${headroom}\nWARN: bundle exceeds the configured warning threshold.`;
  }
  return `${summary}\n${headroom}\nPASS: bundle is within the configured budget.`;
}

async function directorySizeBytes(path: string): Promise<number> {
  const pathStat = await stat(path);
  if (!pathStat.isDirectory()) {
    return pathStat.size;
  }

  const entries = await readdir(path, { withFileTypes: true });
  let total = 0;

  for (const entry of entries) {
    const entryPath = resolve(path, entry.name);
    if (entry.isDirectory()) {
      total += await directorySizeBytes(entryPath);
      continue;
    }
    const entryStat = await stat(entryPath);
    total += entryStat.size;
  }

  return total;
}

function parsePositiveNumber(value: string | undefined, fallback: number, label: string): number {
  if (value === undefined || value === '') {
    return fallback;
  }
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`${label} must be a positive number`);
  }
  return parsed;
}

function mbToBytes(value: number): number {
  return Math.round(value * BYTES_PER_MB);
}

function bytesToMb(value: number): number {
  return value / BYTES_PER_MB;
}

function formatMb(value: number): string {
  return value.toFixed(2).replace(/\.00$/, '');
}

async function main(): Promise<void> {
  const options = parseBundleBudgetArgs(process.argv.slice(2));
  const result = await measureBundleBudget(options);
  const output = formatBundleBudgetResult(result);

  if (result.status === 'fail') {
    console.error(output);
    process.exitCode = 1;
    return;
  }

  if (result.status === 'warn') {
    console.warn(output);
    return;
  }

  console.log(output);
}

if (import.meta.main) {
  await main().catch((error) => {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  });
}
