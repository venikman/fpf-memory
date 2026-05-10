import { execFile } from 'node:child_process';
import { mkdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

/**
 * One line in the upstream spec's blame output: which commit last
 * touched it and when that commit was authored. The compiler walks
 * each section's `lineStart..lineEnd` range against this map and
 * picks the most recent date as the section's `lastCommittedAt`.
 */
export interface BlameLineInfo {
  sha: string;
  /** Commit author date in ISO 8601 (UTC). */
  committedAt: string;
}

export type LineBlameMap = Map<number, BlameLineInfo>;

export interface UpstreamBlameOptions {
  /** owner/repo — e.g. `ailev/FPF`. */
  owner: string;
  repo: string;
  /** Branch / tag / SHA to blame against. Default `main`. */
  ref?: string;
  /** Path to the spec file inside the upstream repo. Default `FPF-Spec.md`. */
  specPath?: string;
  /**
   * Local directory used as a persistent clone cache. Future runs
   * `git fetch` here instead of cloning from scratch. Default
   * `.fpf-upstream-clone`.
   */
  clonePath?: string;
  /**
   * If true (default), refuse network operations — useful for tests
   * that pre-seed `clonePath` and only want the blame parse path.
   */
  allowNetwork?: boolean;
}

const DEFAULT_REF = 'main';
const DEFAULT_SPEC_PATH = 'FPF-Spec.md';
const DEFAULT_CLONE_PATH = '.fpf-upstream-clone';

/**
 * Resolve per-line blame metadata for the upstream FPF spec. Clones
 * (or fetches into) `clonePath`, runs `git blame --line-porcelain`,
 * parses the output into a `lineNumber → {sha, committedAt}` map.
 *
 * Returns `undefined` when network is disabled and no cache exists,
 * or when git isn't on PATH — callers must tolerate the missing
 * data and fall back to the whole-file commit date.
 */
export async function loadUpstreamLineBlame(
  options: UpstreamBlameOptions,
): Promise<LineBlameMap | undefined> {
  const ref = options.ref ?? DEFAULT_REF;
  const specPath = options.specPath ?? DEFAULT_SPEC_PATH;
  const clonePath = resolve(process.cwd(), options.clonePath ?? DEFAULT_CLONE_PATH);
  const allowNetwork = options.allowNetwork ?? true;
  const remoteUrl = `https://github.com/${options.owner}/${options.repo}.git`;

  const exists = await directoryExists(clonePath);

  if (!exists) {
    if (!allowNetwork) return undefined;
    await mkdir(resolve(clonePath, '..'), { recursive: true });
    try {
      await execFileAsync('git', ['clone', '--quiet', remoteUrl, clonePath]);
    } catch {
      return undefined;
    }
  } else if (allowNetwork) {
    try {
      await execFileAsync('git', ['-C', clonePath, 'fetch', '--quiet', 'origin']);
    } catch {
      // Fall through and blame against whatever the cache has — better
      // than failing the whole publish on a transient network blip.
    }
  }

  // Resolve the requested ref to a SHA so blame is deterministic
  // regardless of branch movement during the run.
  let sha: string;
  try {
    const { stdout } = await execFileAsync('git', [
      '-C',
      clonePath,
      'rev-parse',
      ref,
    ]);
    sha = stdout.trim();
  } catch {
    try {
      const { stdout } = await execFileAsync('git', [
        '-C',
        clonePath,
        'rev-parse',
        `origin/${ref}`,
      ]);
      sha = stdout.trim();
    } catch {
      return undefined;
    }
  }

  let stdout: string;
  try {
    const result = await execFileAsync(
      'git',
      ['-C', clonePath, 'blame', '--line-porcelain', sha, '--', specPath],
      { maxBuffer: 200 * 1024 * 1024 },
    );
    stdout = result.stdout;
  } catch {
    return undefined;
  }

  return parseLinePorcelainBlame(stdout);
}

async function directoryExists(path: string): Promise<boolean> {
  try {
    const info = await stat(path);
    return info.isDirectory();
  } catch {
    return false;
  }
}

/**
 * Parse `git blame --line-porcelain` output into a per-line map.
 *
 * Porcelain format (one block per line):
 *   <sha> <orig-line> <final-line> <group-size>
 *   author Name
 *   author-mail <email>
 *   author-time <unix-seconds>
 *   author-tz +0000
 *   committer ...
 *   summary ...
 *   filename ...
 *           <line content>
 *
 * The `final-line` field is the line in the blamed file (1-based).
 * Subsequent contiguous lines from the same commit omit the metadata
 * lines (only the SHA + line numbers reappear), so we carry the
 * last-seen author date forward.
 */
export function parseLinePorcelainBlame(stdout: string): LineBlameMap {
  const map: LineBlameMap = new Map();
  const lines = stdout.split('\n');
  let i = 0;
  let lastCommitSha = '';
  let lastCommittedAt = '';
  const commitDates = new Map<string, string>();

  while (i < lines.length) {
    const header = lines[i]!;
    const headerMatch = /^([0-9a-f]{40})\s+\d+\s+(\d+)(?:\s+\d+)?$/.exec(header);
    if (!headerMatch) {
      i += 1;
      continue;
    }
    const sha = headerMatch[1]!;
    const finalLine = Number.parseInt(headerMatch[2]!, 10);
    i += 1;

    let authorTime: string | undefined = commitDates.get(sha);
    while (i < lines.length && !lines[i]!.startsWith('\t')) {
      const metaLine = lines[i]!;
      if (metaLine.startsWith('author-time ')) {
        const seconds = Number.parseInt(metaLine.slice('author-time '.length), 10);
        if (Number.isFinite(seconds)) {
          authorTime = new Date(seconds * 1000).toISOString();
        }
      }
      i += 1;
    }
    // Skip the tab-prefixed content line.
    if (i < lines.length && lines[i]!.startsWith('\t')) {
      i += 1;
    }
    if (!authorTime) {
      authorTime = lastCommittedAt;
    } else {
      commitDates.set(sha, authorTime);
    }

    map.set(finalLine, {
      sha: sha.slice(0, 8),
      committedAt: authorTime,
    });
    lastCommitSha = sha;
    lastCommittedAt = authorTime;
  }

  // Suppress unused-var lint: lastCommitSha is the porcelain
  // continuation hint (committers chain across hunks); keeping the
  // assignment makes the carrying-state pattern explicit even though
  // we don't read it back today.
  void lastCommitSha;

  return map;
}

/**
 * Walk a line range (1-based, inclusive) and return the most recent
 * commit info that touched any line in that range. Returns
 * `undefined` when no line in the range has blame data.
 */
export function newestCommitInRange(
  blame: LineBlameMap,
  lineStart: number,
  lineEnd: number,
): BlameLineInfo | undefined {
  let best: BlameLineInfo | undefined;
  for (let line = lineStart; line <= lineEnd; line += 1) {
    const info = blame.get(line);
    if (!info) continue;
    if (!best || info.committedAt > best.committedAt) {
      best = info;
    }
  }
  return best;
}
