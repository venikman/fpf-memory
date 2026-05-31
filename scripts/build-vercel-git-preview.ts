import { spawnSync } from 'node:child_process';

type VercelSurface = 'website' | 'mcp';

const surface = resolveVercelSurface(process.env);
const script = surface === 'mcp' ? 'vercel:mcp:build' : 'vercel:website:build';

process.stdout.write(`build-vercel-git-preview: surface=${surface} script=${script}\n`);

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
