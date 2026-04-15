import { ZodError } from 'zod';

import { asSessionId } from '../core/types.js';
import { parseCliCommand } from '../adapters/cli/command-contracts.js';
import { unwrapOutcome } from '../app/commands/index.js';
import { runLmStudioHealthCheck } from '../runtime/lm-studio-synthesizer.js';
import { createCliComposition } from './cli.js';

/**
 * When `lm-check` overrides `--base-url`, do not forward env-derived API keys unless the caller
 * passes `--api-key` (avoids sending e.g. GEMINI tokens to an arbitrary CLI destination).
 */
export function resolveLmCheckApiKey(input: {
  commandBaseUrl: string | undefined;
  envBaseUrl: string | undefined;
  commandApiKey: string | undefined;
  envApiKey: string | undefined;
}): string | undefined {
  const fromCli = input.commandApiKey?.trim();
  if (fromCli) {
    return fromCli;
  }
  const cliBase = input.commandBaseUrl?.trim();
  const envBase = input.envBaseUrl?.trim() ?? '';
  if (cliBase && cliBase !== envBase) {
    return undefined;
  }
  const fromEnv = input.envApiKey?.trim();
  return fromEnv ? fromEnv : undefined;
}

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

  const {
    logger,
    queryAppService,
    traceAppService,
    inspectAppService,
    refreshAppService,
    lmStudioHealthCheckOptions,
  } = createCliComposition(process.env);
  const commandName = command.kind;

  try {
    logger.info('CLI command start', {
      command: commandName,
      args: argv.slice(1),
    });

    switch (command.kind) {
      case 'status':
        await print(unwrapOutcome(await refreshAppService.status()));
        break;
      case 'refresh':
        await print(
          unwrapOutcome(
            await refreshAppService.refresh({
              force: command.force,
            }),
          ),
        );
        break;
      case 'query':
        await print(
          unwrapOutcome(
            await queryAppService.execute({
              question: command.question,
              mode: command.mode,
              forceRefresh: command.forceRefresh,
              sessionId: command.sessionId ? asSessionId(command.sessionId) : undefined,
            }),
          ),
        );
        break;
      case 'inspect':
        await print(
          unwrapOutcome(
            await inspectAppService.inspect({
              selector: command.selector,
              kind: command.selectorKind,
              forceRefresh: command.forceRefresh,
            }),
          ),
        );
        break;
      case 'read-doc':
        await print(
          unwrapOutcome(
            await inspectAppService.readDoc({
              selector: command.selector,
              kind: command.selectorKind,
              forceRefresh: command.forceRefresh,
            }),
          ),
        );
        break;
      case 'trace':
        await print(
          unwrapOutcome(
            await traceAppService.execute({
              question: command.question,
              mode: command.mode,
              forceRefresh: command.forceRefresh,
              sessionId: command.sessionId ? asSessionId(command.sessionId) : undefined,
            }),
          ),
        );
        break;
      case 'lm-check': {
        const envLm = lmStudioHealthCheckOptions;
        const effectiveBaseUrl = command.baseUrl ?? envLm.baseUrl;
        const apiKey = resolveLmCheckApiKey({
          commandBaseUrl: command.baseUrl,
          envBaseUrl: envLm.baseUrl,
          commandApiKey: command.apiKey,
          envApiKey: envLm.apiKey,
        });
        await print(
          runLmStudioHealthCheck({
            ...envLm,
            baseUrl: effectiveBaseUrl,
            model: command.model ?? envLm.model,
            apiKey,
            timeoutMs: command.timeoutMs ?? envLm.timeoutMs,
            systemPrompt: command.systemPrompt,
            input: command.input,
          }),
        );
        break;
      }
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
  bun run cli -- lm-check [--base-url http://localhost:1234/v1] [--model google/gemma-4-31b] [--api-key <token>] [--timeout-ms 60000]
`);
}
