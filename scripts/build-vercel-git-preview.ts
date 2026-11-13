import { spawnSync } from 'node:child_process';

type VercelSurface = 'website' | 'mcp';

const surface = resolveVercelSurface(process.env);
const script = surface === 'mcp' ? 'vercel:mcp:build' : 'vercel:website:build';

process.stdout.write(`build-vercel-git-preview: surface=${surface} script=${script}\n`);
reportBuildHost();

const result = spawnSync('bun', ['run', script], {
  cwd: process.cwd(),
  env: process.env,
  stdio: 'inherit',
});

if (result.error) {
  throw result.error;
}
if (result.status !== 0) {
  throw new Error(`bun run ${script} exited with code ${result.status ?? 'unknown'}`);
}

// One line of build-host facts in every preview log. `rspress build` runs
// under Node, and its peak memory follows the heap limit Node derives from
// the host: measured on upstream 1e57ccda, a 1.5 GB limit aborts the build,
// ~2 GB peaks at 5.3-5.8 GiB RSS and 4 GB at 6.7 GiB. On the 8 GB Vercel
// build machine that difference decides whether the container is OOM-killed
// (2026-08, and 18 of 31 sync previews from 2026-10-13 to 2026-11-02), and
// the build log is the only place the limit can be read afterwards.
function reportBuildHost(): void {
  const probe = spawnSync(
    'node',
    [
      '-e',
      [
        "const v8 = require('node:v8');",
        "const os = require('node:os');",
        'const mb = (bytes) => Math.round(bytes / 1048576);',
        "const flag = /--max-old-space-size=(\\d+)/.exec(process.env.NODE_OPTIONS ?? '');",
        'console.log(JSON.stringify({',
        '  node: process.version,',
        '  heapLimitMb: mb(v8.getHeapStatistics().heap_size_limit),',
        '  maxOldSpaceFlagMb: flag ? Number(flag[1]) : null,',
        '  totalMemMb: mb(os.totalmem()),',
        "  constrainedMemMb: typeof process.constrainedMemory === 'function' ? mb(process.constrainedMemory()) : null,",
        "  cpus: typeof os.availableParallelism === 'function' ? os.availableParallelism() : os.cpus().length,",
        '}));',
      ].join('\n'),
    ],
    { cwd: process.cwd(), env: process.env, encoding: 'utf8' },
  );
  const facts =
    probe.status === 0 && probe.stdout.trim()
      ? probe.stdout.trim()
      : `unavailable (${probe.error?.message ?? `exit ${probe.status ?? 'unknown'}`})`;
  process.stdout.write(`build-vercel-git-preview: host=${facts}\n`);
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
