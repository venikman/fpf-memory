import { spawnSync } from 'node:child_process';
import { readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

export interface ParsedShard {
  index: number;
  count: number;
}

export interface RunTestShardOptions {
  cwd?: string;
  shard: ParsedShard;
}

export interface RunSelectedTestFilesOptions {
  files: string[];
  cwd?: string;
  log?: Pick<Console, 'error' | 'log'>;
  runTestFile?: (file: string, cwd: string) => number | Promise<number>;
  /**
   * Maximum number of attempts per file. Defaults to 2 so transient bun
   * worker crashes on CI ("Worker exited unexpectedly") get one retry
   * before the shard fails. Real test failures fail both attempts, so
   * the overall pass/fail signal is preserved while flakes self-heal.
   */
  maxAttempts?: number;
}

export async function discoverTestFiles(cwd = process.cwd()): Promise<string[]> {
  const testsRoot = join(cwd, 'tests');
  const discovered = await walkTestFiles(testsRoot, cwd);
  return discovered.sort();
}

export function parseShard(value: string): ParsedShard {
  const match = /^([1-9]\d*)\/([1-9]\d*)$/u.exec(value);
  if (!match) {
    throw new Error(`Expected --shard <index/count>, got: ${value}`);
  }

  const index = Number(match[1]);
  const count = Number(match[2]);
  if (index > count) {
    throw new Error(`Shard index ${index} cannot exceed shard count ${count}.`);
  }

  return { index, count };
}

export function selectShardFiles(files: string[], shard: ParsedShard): string[] {
  return files.filter((_, index) => index % shard.count === shard.index - 1);
}

export async function runTestShard(options: RunTestShardOptions): Promise<number> {
  const cwd = options.cwd ?? process.cwd();
  const files = selectShardFiles(await discoverTestFiles(cwd), options.shard);

  if (files.length === 0) {
    console.error(`::error::No tests found for shard ${options.shard.index}/${options.shard.count}.`);
    return 1;
  }

  return runSelectedTestFiles({ files, cwd });
}

export async function runSelectedTestFiles(
  options: RunSelectedTestFilesOptions,
): Promise<number> {
  const cwd = options.cwd ?? process.cwd();
  const log = options.log ?? console;
  const runTestFile = options.runTestFile ?? runRstestFile;
  const maxAttempts = Math.max(1, options.maxAttempts ?? 2);
  let exitCode = 0;

  for (const file of options.files) {
    log.log(`::group::${file}`);
    try {
      let fileExitCode = 0;
      for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
        fileExitCode = await runTestFile(file, cwd);
        if (fileExitCode === 0) break;
        if (attempt < maxAttempts) {
          // Bun's rstest worker occasionally exits non-zero on CI without
          // an actual test failure ("Worker exited unexpectedly"). One
          // retry absorbs the flake; real failures still fail both runs.
          log.error(`::warning::Test file ${file} failed on attempt ${attempt}; retrying.`);
        }
      }
      if (fileExitCode !== 0 && exitCode === 0) {
        exitCode = fileExitCode;
      }
    } catch (error) {
      exitCode = exitCode || 1;
      log.error(error instanceof Error ? error.message : String(error));
    } finally {
      log.log('::endgroup::');
    }
  }

  return exitCode;
}

function runRstestFile(file: string, cwd: string): number {
  // `--pool=forks` switches rstest from worker_threads to child_process
  // forks. Bun's worker_threads implementation occasionally exits a
  // worker mid-load on Linux x64 GH runners ("Worker exited
  // unexpectedly") with no test failure — affects different files on
  // different runs. Forks are heavier per file but immune to the bug.
  const result = spawnSync('bunx', ['rstest', 'run', '--pool=forks', file], {
    cwd,
    stdio: 'inherit',
  });

  if (result.error) {
    console.error(result.error.message);
    return 1;
  }

  return result.status ?? 1;
}

async function walkTestFiles(directory: string, cwd: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = join(directory, entry.name);
      if (entry.isDirectory()) {
        return walkTestFiles(absolutePath, cwd);
      }
      if (entry.isFile() && entry.name.endsWith('.test.ts')) {
        return [toPosixPath(relative(cwd, absolutePath))];
      }
      return [];
    }),
  );

  return files.flat();
}

function toPosixPath(path: string): string {
  return path.split(sep).join('/');
}

function readShardArg(argv: string[]): string {
  const shardWithValue = argv.find((arg) => arg.startsWith('--shard='));
  if (shardWithValue) {
    return shardWithValue.slice('--shard='.length);
  }

  const shardFlagIndex = argv.indexOf('--shard');
  if (shardFlagIndex >= 0 && argv[shardFlagIndex + 1]) {
    return argv[shardFlagIndex + 1];
  }

  throw new Error('Missing required --shard <index/count> argument.');
}

if (import.meta.main) {
  try {
    const shard = parseShard(readShardArg(process.argv.slice(2)));
    process.exitCode = await runTestShard({ shard });
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
