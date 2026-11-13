import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

import {
  parseMaxOldSpaceFlagMb,
  resolveDocsBuildHeapCapMb,
  withDocsBuildHeapCap,
  type BuildHostFacts,
} from '../src/build/docs-build-memory.js';

type VercelSurface = 'website' | 'mcp';

const surface = resolveVercelSurface(process.env);
const script = surface === 'mcp' ? 'vercel:mcp:build' : 'vercel:website:build';

process.stdout.write(`build-vercel-git-preview: surface=${surface} script=${script}\n`);

const host = probeBuildHost(process.env);
process.stdout.write(
  `build-vercel-git-preview: host=${typeof host === 'string' ? host : JSON.stringify(host)}\n`,
);

// Only the website surface runs `rspress build`; see docs-build-memory.ts for
// why its heap is capped from the container size.
const buildEnv: NodeJS.ProcessEnv = { ...process.env };
const heapCapMb =
  surface === 'website' && typeof host !== 'string' ? resolveDocsBuildHeapCapMb(host) : undefined;
if (heapCapMb !== undefined) {
  buildEnv.NODE_OPTIONS = withDocsBuildHeapCap(buildEnv.NODE_OPTIONS, heapCapMb);
  // Probe again with the build's environment: the cap is appended after any
  // flag already there, and the log should show the limit that results
  // rather than the one that was asked for.
  const capped = probeBuildHost(buildEnv);
  const effective = typeof capped === 'string' ? capped : `${capped.heapLimitMb} MB`;
  process.stdout.write(
    `build-vercel-git-preview: docs build heap capped at ${heapCapMb} MB via NODE_OPTIONS (effective limit ${effective})\n`,
  );
}

const result = spawnSync('bun', ['run', script], {
  cwd: process.cwd(),
  env: buildEnv,
  stdio: 'inherit',
});

reportContainerMemoryPeak();

if (result.error) {
  throw result.error;
}
if (result.status !== 0) {
  throw new Error(`bun run ${script} exited with code ${result.status ?? 'unknown'}`);
}

// One line of build-host facts in every preview log. `rspress build` runs
// under Node, and its peak memory follows the heap limit Node derives from
// the host, so the limit has to be readable from the log after the fact.
function probeBuildHost(env: NodeJS.ProcessEnv): BuildHostFacts | string {
  const probe = spawnSync(
    'node',
    [
      '-e',
      [
        "const v8 = require('node:v8');",
        "const os = require('node:os');",
        'const mb = (bytes) => Math.round(bytes / 1048576);',
        'console.log(JSON.stringify({',
        '  node: process.version,',
        '  heapLimitMb: mb(v8.getHeapStatistics().heap_size_limit),',
        '  totalMemMb: mb(os.totalmem()),',
        "  constrainedMemMb: typeof process.constrainedMemory === 'function' ? mb(process.constrainedMemory()) : null,",
        "  cpus: typeof os.availableParallelism === 'function' ? os.availableParallelism() : os.cpus().length,",
        '}));',
      ].join('\n'),
    ],
    { cwd: process.cwd(), env, encoding: 'utf8' },
  );

  if (probe.status === 0 && probe.stdout.trim()) {
    try {
      return {
        ...(JSON.parse(probe.stdout.trim()) as BuildHostFacts),
        maxOldSpaceFlagMb: parseMaxOldSpaceFlagMb(env.NODE_OPTIONS),
      };
    } catch {
      // Fall through to the unavailable report.
    }
  }
  return `unavailable (${probe.error?.message ?? `exit ${probe.status ?? 'unknown'}`})`;
}

// The kernel's own high-water mark for this container: the number the OOM
// killer compares against the limit. Best effort across cgroup v2 and v1;
// absent files (local runs, other hosts) print nothing.
function reportContainerMemoryPeak(): void {
  const candidates: Array<[peak: string, limit: string]> = [
    ['/sys/fs/cgroup/memory.peak', '/sys/fs/cgroup/memory.max'],
    [
      '/sys/fs/cgroup/memory/memory.max_usage_in_bytes',
      '/sys/fs/cgroup/memory/memory.limit_in_bytes',
    ],
  ];
  for (const [peakPath, limitPath] of candidates) {
    const peak = readByteCount(peakPath);
    if (peak === undefined) {
      continue;
    }
    const limit = readByteCount(limitPath);
    const mb = (bytes: number): number => Math.round(bytes / 1048576);
    // An unlimited cgroup reports a sentinel near 2^63 (v1) or "max" (v2).
    const limitText =
      limit === undefined || limit > 2 ** 40 ? 'none' : `${mb(limit)} MB`;
    process.stdout.write(
      `build-vercel-git-preview: container memory peak=${mb(peak)} MB limit=${limitText}\n`,
    );
    return;
  }
}

function readByteCount(path: string): number | undefined {
  try {
    const value = Number(readFileSync(path, 'utf8').trim());
    return Number.isFinite(value) && value > 0 ? value : undefined;
  } catch {
    return undefined;
  }
}

function resolveVercelSurface(env: NodeJS.ProcessEnv): VercelSurface {
  const explicit = env.FPF_VERCEL_SURFACE?.trim().toLowerCase();
  if (explicit === 'mcp' || explicit === 'website') {
    return explicit;
  }

  const indicators = [
    env.VERCEL_PROJECT_PRODUCTION_URL,
    env.VERCEL_URL,
  ]
    .filter((value): value is string => Boolean(value))
    .map((value) => value.toLowerCase());

  if (
    indicators.some((value) =>
      value === 'mcp.fpf.sh'
      || value.startsWith('fpf-reference-mcp')
      || value.includes('.mcp.fpf.sh')
    )
  ) {
    return 'mcp';
  }

  return 'website';
}
