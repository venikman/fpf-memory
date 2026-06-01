import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

import { ZodError } from 'zod';

import { asSessionId } from '../core/types.js';
import { parseCliCommand } from '../adapters/cli/command-contracts.js';
import {
  evaluateFpfWork,
  formatFpfWorkEvaluationReport,
} from '../evaluation/fpf-work-evaluator.js';
import { createCliComposition } from './cli.js';

export async function runCli(argv = process.argv.slice(2)): Promise<void> {
  const command = parseCliCommand(argv);

  if (command.kind === 'help') {
    printHelp();
    process.exitCode = 0;
    return;
  }

  if (command.kind === 'unknown_command') {
    printHelp();
    process.exitCode = 1;
    return;
  }

  if (command.kind === 'evaluate-work') {
    const report = await evaluateFpfWork({
      target: command.target,
      baseRef: command.baseRef,
      specPath: command.specPath,
      cwd: process.cwd(),
      env: process.env,
    });
    const output = formatFpfWorkEvaluationReport(report, command.format);
    if (command.out) {
      const outputPath = resolve(process.cwd(), command.out);
      await mkdir(dirname(outputPath), { recursive: true });
      await writeFile(outputPath, output, 'utf8');
    } else {
      process.stdout.write(output);
    }
    process.exitCode = 0;
    return;
  }

  const { logger, runtime } = createCliComposition(process.env);
  const commandName = command.kind;

  try {
    logger.info('CLI command start', {
      command: commandName,
      args: argv.slice(1),
    });

    switch (command.kind) {
      case 'status':
        await print(await runtime.status());
        break;
      case 'refresh':
        await print(await runtime.refresh(command.force ?? false));
        break;
      case 'query':
        await print(
          await runtime.query(
            command.question.trim(),
            command.mode,
            command.forceRefresh,
            command.sessionId ? asSessionId(command.sessionId) : undefined,
          ),
        );
        break;
      case 'inspect':
        await print(
          await runtime.inspect(
            command.selector.trim(),
            command.selectorKind ?? 'auto',
            command.forceRefresh,
          ),
        );
        break;
      case 'read-doc':
        await print(
          await runtime.readDoc(command.selector.trim(), command.selectorKind ?? 'auto', {
            forceRefresh: command.forceRefresh,
          }),
        );
        break;
      case 'trace':
        await print(
          await runtime.trace(
            command.question.trim(),
            command.mode,
            command.forceRefresh,
            command.sessionId ? asSessionId(command.sessionId) : undefined,
          ),
        );
        break;
    }

    logger.info('CLI command finished', {
      command: commandName,
      exitCode: process.exitCode ?? 0,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      process.exitCode = 1;
      logger.error('CLI command failed', {
        command: commandName,
        error: error.issues.map((issue) => issue.message).join('; '),
      });
      throw new Error(error.issues.map((issue) => issue.message).join('; '));
    }

    logger.error('CLI command failed', {
      command: commandName,
      error: error instanceof Error ? error.message : 'Unknown CLI error',
    });
    throw error;
  }
}

async function print(valueToPrint: Promise<unknown> | unknown): Promise<void> {
  const resolved = await valueToPrint;
  process.stdout.write(`${JSON.stringify(resolved, null, 2)}\n`);
}

function printHelp(): void {
  process.stdout.write(`Usage:
  bun run cli -- status
  bun run cli -- refresh [--force]
  bun run cli -- query --question "What is U.BoundedContext?" [--mode compact|verbose|proof] [--session s1] [--force]
  bun run cli -- inspect --selector "A.1.1" [--kind auto|id|route|lexeme] [--force]
  bun run cli -- read-doc --selector "A.1.1" [--kind auto|id|route|lexeme] [--force]
  bun run cli -- trace --question "How do routes work?" [--mode compact|verbose|proof] [--session s1] [--force]
  bun run cli -- evaluate-work [--target current-pr|working-tree] [--base origin/main] [--format markdown|json] [--spec path/to/FPF-Spec.md] [--out reports/fpf-work.md]
`);
}
