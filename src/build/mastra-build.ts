import { spawn } from 'node:child_process';
import { access, rm, writeFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';

export interface RunMastraBuildOptions {
  rootDir?: string;
  args?: string[];
  runCommand?: (
    command: string,
    args: string[],
    options: { cwd: string; env: NodeJS.ProcessEnv },
  ) => Promise<void>;
}

const TEMPORARY_PACKAGE_LOCK = {
  lockfileVersion: 3,
  requires: true,
  packages: {},
} as const;

/**
 * Mastra's deploy bundler chooses the package manager from the nearest lockfile
 * under the project root. This repo is Bun-first, but the generated
 * `.mastra/output` package hangs on `bun install` while `npm install` completes
 * quickly and deterministically. Create a temporary root `package-lock.json`
 * during `mastra build` and `mastra server deploy` so the nested install uses
 * npm without changing the repo's primary package manager.
 */
export async function withTemporaryMastraPackageLock<T>(
  rootDir: string,
  work: (lockPath: string) => Promise<T>,
): Promise<T> {
  const lockPath = resolve(rootDir, 'package-lock.json');
  const created = !(await pathExists(lockPath));

  if (created) {
    const contents = {
      name: basename(rootDir) || 'fpf-memory',
      ...TEMPORARY_PACKAGE_LOCK,
    };
    await writeFile(lockPath, `${JSON.stringify(contents, null, 2)}\n`, 'utf8');
  }

  try {
    return await work(lockPath);
  } finally {
    if (created) {
      await rm(lockPath, { force: true });
    }
  }
}

export async function runMastraBuild(
  options: RunMastraBuildOptions = {},
): Promise<void> {
  const rootDir = resolve(options.rootDir ?? process.cwd());
  const args = options.args ?? [];
  const runCommand = options.runCommand ?? runSpawnedCommand;

  await withTemporaryMastraPackageLock(rootDir, async () => {
    await runCommand('bunx', ['mastra', 'build', ...args], {
      cwd: rootDir,
      env: process.env,
    });
  });
}

export async function runMastraServerDeploy(
  options: RunMastraBuildOptions = {},
): Promise<void> {
  const rootDir = resolve(options.rootDir ?? process.cwd());
  const args = options.args ?? [];
  const runCommand = options.runCommand ?? runSpawnedCommand;

  await withTemporaryMastraPackageLock(rootDir, async () => {
    await runCommand('bunx', ['mastra', 'server', 'deploy', ...args], {
      cwd: rootDir,
      env: process.env,
    });
  });
}

async function pathExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function runSpawnedCommand(
  command: string,
  args: string[],
  options: { cwd: string; env: NodeJS.ProcessEnv },
): Promise<void> {
  await new Promise<void>((resolvePromise, rejectPromise) => {
    const child = spawn(command, args, {
      cwd: options.cwd,
      env: options.env,
      stdio: 'inherit',
    });

    child.on('error', rejectPromise);
    child.on('exit', (code, signal) => {
      if (code === 0) {
        resolvePromise();
        return;
      }
      rejectPromise(
        new Error(
          signal
            ? `${command} exited from signal ${signal}`
            : `${command} exited with status ${code ?? 'unknown'}`,
        ),
      );
    });
  });
}
