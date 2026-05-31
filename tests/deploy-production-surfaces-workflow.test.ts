import { spawnSync } from 'node:child_process';
import { chmod, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

import { afterEach, describe, expect, it } from '@rstest/core';

const oldWebsiteDeployment = 'https://fpf-oldsite-venikmans-projects.vercel.app';
const newWebsiteDeployment = 'https://fpf-newsite-venikmans-projects.vercel.app';
const oldMcpDeployment = 'https://fpf-memory-old-venikmans-projects.vercel.app';
const newMcpDeployment = 'https://fpf-reference-new-venikmans-projects.vercel.app';

let tempRoot: string | undefined;

describe('production deployment workflow', () => {
  afterEach(async () => {
    if (tempRoot) {
      await rm(tempRoot, { recursive: true, force: true });
      tempRoot = undefined;
    }
  });

  it('aliases mcp.fpf.sh from the old fpf-memory deployment to the new fpf-reference deployment', async () => {
    const { logPath, env } = await createStubbedDeploymentWorkspace();

    const result = runProductionDeploy(env);

    expect(result.status).toBe(0);
    const commands = await readCommands(logPath);
    const mcpInspect = indexOfCommand(commands, 'inspect mcp.fpf.sh --scope team_test');
    const mcpDeploy = indexOfCommand(commands, 'deploy ', 'mcp-deploy', '--skip-domain');
    const mcpPromote = indexOfCommand(commands, `promote ${newMcpDeployment}`);
    const mcpAlias = indexOfCommand(
      commands,
      `alias set ${newMcpDeployment} mcp.fpf.sh --scope team_test`,
    );
    const mcpVerify = lastIndexOfCommand(commands, 'inspect mcp.fpf.sh --scope team_test');

    expect(mcpInspect).toBeGreaterThan(-1);
    expect(mcpDeploy).toBeGreaterThan(mcpInspect);
    expect(mcpPromote).toBeGreaterThan(mcpDeploy);
    expect(mcpAlias).toBeGreaterThan(mcpPromote);
    expect(mcpVerify).toBeGreaterThan(mcpAlias);
    expect(commands).toContain(
      'bun run monitor:sync -- --format markdown --fail-on-breach --status-url https://mcp.fpf.sh/api/fpf/status',
    );
    expect(commands).toContain(
      'bun run monitor:content -- --mode live --format markdown --fail-on-breach --base-url https://fpf.sh --status-url https://mcp.fpf.sh/api/fpf/status',
    );
    expect(commands).toContain(
      'bun run smoke:production -- --format markdown --fail-on-breach',
    );
    expect(
      commands.some((command) =>
        command.includes(`alias set ${oldMcpDeployment} mcp.fpf.sh`),
      ),
    ).toBe(false);
  });

  it('restores the canonical MCP domain when aliasing fails after project promotion', async () => {
    const { logPath, env } = await createStubbedDeploymentWorkspace({
      failAliasDeployment: newMcpDeployment,
    });

    const result = runProductionDeploy(env);

    expect(result.status).not.toBe(0);
    const commands = await readCommands(logPath);
    const failedAlias = indexOfCommand(
      commands,
      `alias set ${newMcpDeployment} mcp.fpf.sh --scope team_test`,
    );
    const rollbackAlias = indexOfCommand(
      commands,
      `alias set ${oldMcpDeployment} mcp.fpf.sh --scope team_test`,
    );

    expect(failedAlias).toBeGreaterThan(-1);
    expect(rollbackAlias).toBeGreaterThan(failedAlias);
  });
});

async function createStubbedDeploymentWorkspace(options?: {
  failAliasDeployment?: string;
}): Promise<{ env: NodeJS.ProcessEnv; logPath: string }> {
  tempRoot = await mkdtemp(resolve(tmpdir(), 'fpf-prod-deploy-test-'));
  const binDir = resolve(tempRoot, 'bin');
  await mkdir(binDir, { recursive: true });
  const logPath = resolve(tempRoot, 'commands.log');

  await writeExecutable(
    resolve(binDir, 'bun'),
    `#!/bin/sh
set -eu
printf 'bun %s\\n' "$*" >> "$FPF_DEPLOY_COMMAND_LOG"
if [ "$1" = "run" ]; then
  case "$2" in
    deploy:validate|monitor:sync|monitor:content|smoke:production)
      exit 0
      ;;
    vercel:website:build)
      rm -rf .vercel/output
      mkdir -p .vercel/output/static
      printf '<html></html>\\n' > .vercel/output/static/index.html
      printf '{}\\n' > .vercel/output/static/fpf-publication-manifest.json
      exit 0
      ;;
    vercel:mcp:build)
      rm -rf .vercel/output
      mkdir -p .vercel/output/functions/_mcp.func/hosted
      printf 'export default {}\\n' > .vercel/output/functions/_mcp.func/index.mjs
      printf '{}\\n' > .vercel/output/functions/_mcp.func/hosted/manifest.json
      exit 0
      ;;
  esac
fi
echo "unexpected bun command: $*" >&2
exit 64
`,
  );

  await writeExecutable(
    resolve(binDir, 'npx'),
    `#!/bin/sh
set -eu
printf 'npx %s\\n' "$*" >> "$FPF_DEPLOY_COMMAND_LOG"
if [ "$1" = "--yes" ] && [ "$2" = "vercel@latest" ]; then
  shift 2
fi
command="$1"
shift
case "$command" in
  ls)
    project="$1"
    if [ "$project" = "fpf-sh" ]; then
      printf 'Production deployments for fpf-sh\\n1m  ${oldWebsiteDeployment}  Ready\\n${oldWebsiteDeployment}\\n'
      exit 0
    fi
    if [ "$project" = "fpf-reference-mcp" ]; then
      printf 'Production deployments for fpf-reference-mcp\\n1m  ${oldMcpDeployment}  Ready\\n${oldMcpDeployment}\\n'
      exit 0
    fi
    ;;
  inspect)
    domain="$1"
    if [ "$domain" = "fpf.sh" ]; then
      deployment="$(cat "$FPF_FAKE_WEBSITE_DOMAIN_FILE")"
      printf 'General\\n  name  fpf-sh\\n  target  production\\n  status  ● Ready\\n  url  %s\\nAliases\\n  https://fpf.sh\\n' "$deployment"
      exit 0
    fi
    if [ "$domain" = "mcp.fpf.sh" ]; then
      deployment="$(cat "$FPF_FAKE_MCP_DOMAIN_FILE")"
      name="fpf-memory-mcp"
      case "$deployment" in
        *fpf-reference*) name="fpf-reference-mcp" ;;
      esac
      printf 'General\\n  name  %s\\n  target  production\\n  status  ● Ready\\n  url  %s\\nAliases\\n  https://mcp.fpf.sh\\n' "$name" "$deployment"
      exit 0
    fi
    ;;
  link)
    exit 0
    ;;
  deploy)
    deploy_root="$1"
    case "$deploy_root" in
      *website-deploy*)
        printf '{"deployment":{"url":"${newWebsiteDeployment}"}}\\n'
        exit 0
        ;;
      *mcp-deploy*)
        printf '{"deployment":{"url":"${newMcpDeployment}"}}\\n'
        exit 0
        ;;
    esac
    ;;
  promote)
    exit 0
    ;;
  alias)
    subcommand="$1"
    deployment="$2"
    domain="$3"
    if [ "$subcommand" = "set" ] && [ "$deployment" = "$FPF_FAKE_FAIL_ALIAS_DEPLOYMENT" ]; then
      echo "fake alias failure for $deployment" >&2
      exit 70
    fi
    if [ "$subcommand" = "set" ] && [ "$domain" = "fpf.sh" ]; then
      printf '%s\\n' "$deployment" > "$FPF_FAKE_WEBSITE_DOMAIN_FILE"
      exit 0
    fi
    if [ "$subcommand" = "set" ] && [ "$domain" = "mcp.fpf.sh" ]; then
      printf '%s\\n' "$deployment" > "$FPF_FAKE_MCP_DOMAIN_FILE"
      exit 0
    fi
    exit 0
    ;;
esac
echo "unexpected npx command: $command $*" >&2
exit 65
`,
  );
  const websiteDomainFile = resolve(tempRoot, 'website-domain.txt');
  const mcpDomainFile = resolve(tempRoot, 'mcp-domain.txt');
  await writeFile(websiteDomainFile, `${oldWebsiteDeployment}\n`);
  await writeFile(mcpDomainFile, `${oldMcpDeployment}\n`);

  return {
    logPath,
    env: {
      ...process.env,
      PATH: `${binDir}:${process.env.PATH ?? ''}`,
      FPF_DEPLOY_COMMAND_LOG: logPath,
      FPF_FAKE_FAIL_ALIAS_DEPLOYMENT: options?.failAliasDeployment ?? '',
      FPF_FAKE_MCP_DOMAIN_FILE: mcpDomainFile,
      FPF_FAKE_WEBSITE_DOMAIN_FILE: websiteDomainFile,
      FPF_VERCEL_SCOPE: 'team_test',
    },
  };
}

function runProductionDeploy(env: NodeJS.ProcessEnv): ReturnType<typeof spawnSync> {
  if (!tempRoot) {
    throw new Error('Missing deployment test workspace.');
  }
  const bunPath = resolveBunExecutable();
  const scriptPath = resolve(process.cwd(), 'scripts/deploy-production-surfaces.ts');
  return spawnSync(bunPath, [scriptPath], {
    cwd: tempRoot,
    encoding: 'utf8',
    env,
  });
}

function resolveBunExecutable(): string {
  const result = spawnSync('which', ['bun'], { encoding: 'utf8' });
  const path = result.stdout.trim();
  if (result.status !== 0 || !path) {
    throw new Error('Could not resolve bun executable for deployment workflow test.');
  }
  return path;
}

async function writeExecutable(path: string, content: string): Promise<void> {
  await writeFile(path, content);
  await chmod(path, 0o755);
}

async function readCommands(logPath: string): Promise<string[]> {
  return (await readFile(logPath, 'utf8')).trim().split('\n');
}

function indexOfCommand(commands: string[], ...needles: string[]): number {
  return commands.findIndex((command) =>
    needles.every((needle) => command.includes(needle)),
  );
}

function lastIndexOfCommand(commands: string[], ...needles: string[]): number {
  for (let index = commands.length - 1; index >= 0; index -= 1) {
    if (needles.every((needle) => commands[index]?.includes(needle))) {
      return index;
    }
  }
  return -1;
}
