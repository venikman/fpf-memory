import { chmod, copyFile, mkdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const cwd = process.cwd();
const hookSource = resolve(cwd, 'scripts/hooks/pre-push.sh');
const hookTargetDir = resolve(cwd, '.git/hooks');
const hookTarget = resolve(hookTargetDir, 'pre-push');

try {
  await stat(hookSource);
} catch {
  process.stderr.write(
    `install-hooks: source hook missing at ${hookSource}\n`,
  );
  process.exit(1);
}

await mkdir(hookTargetDir, { recursive: true });
await copyFile(hookSource, hookTarget);
await chmod(hookTarget, 0o755);

process.stdout.write(
  `${JSON.stringify({ installed: hookTarget, from: hookSource }, null, 2)}\n`,
);
