import { getRuntimeLogger } from './logging/runtime-logger.js';
import {
  normalizeLmStudioApiStyle,
  runLmStudioHealthCheck,
} from './runtime/lm-studio-synthesizer.js';
import { FpfRuntime } from './runtime/runtime.js';
import type { AnswerMode } from './runtime/types.js';

const logger = getRuntimeLogger();
const runtime = new FpfRuntime();

const args = process.argv.slice(2);
const command = args[0] ?? 'help';

try {
  logger.info('CLI command start', { command, args: args.slice(1) });

  switch (command) {
    case 'refresh':
      await print(runtime.refresh(flag(args, '--force')));
      break;
    case 'status':
      await print(runtime.status());
      break;
    case 'query':
      await runQuery(args.slice(1));
      break;
    case 'inspect':
      await runInspect(args.slice(1));
      break;
    case 'read-doc':
      await runReadDoc(args.slice(1));
      break;
    case 'trace':
      await runTrace(args.slice(1));
      break;
    case 'lm-check':
      await runLmCheck(args.slice(1));
      break;
    default:
      printHelp();
      process.exitCode = command === 'help' ? 0 : 1;
  }

  logger.info('CLI command finished', { command, exitCode: process.exitCode ?? 0 });
} catch (error) {
  logger.error('CLI command failed', {
    command,
    error: error instanceof Error ? error.message : 'Unknown CLI error',
  });
  throw error;
}

async function runQuery(queryArgs: string[]): Promise<void> {
  const mode = (value(queryArgs, '--mode') ?? 'compact') as AnswerMode;
  const forceRefresh = flag(queryArgs, '--force');
  const sessionId = value(queryArgs, '--session');
  const question =
    value(queryArgs, '--question') ??
    queryArgs.filter((argument) => !argument.startsWith('--')).join(' ').trim();

  if (!question) {
    throw new Error('query requires --question "<text>" or trailing question text.');
  }

  await print(runtime.query(question, mode, forceRefresh, sessionId));
}

async function runInspect(commandArgs: string[]): Promise<void> {
  const selector =
    value(commandArgs, '--selector') ??
    commandArgs.filter((argument) => !argument.startsWith('--')).join(' ').trim();
  const kind = (value(commandArgs, '--kind') ?? 'auto') as 'auto' | 'id' | 'route' | 'lexeme';
  const forceRefresh = flag(commandArgs, '--force');

  if (!selector) {
    throw new Error('inspect requires --selector "<id|route|lexeme>" or trailing selector text.');
  }

  await print(runtime.inspect(selector, kind, forceRefresh));
}

async function runReadDoc(commandArgs: string[]): Promise<void> {
  const selector =
    value(commandArgs, '--selector') ??
    commandArgs.filter((argument) => !argument.startsWith('--')).join(' ').trim();
  const kind = (value(commandArgs, '--kind') ?? 'auto') as 'auto' | 'id' | 'route' | 'lexeme';
  const forceRefresh = flag(commandArgs, '--force');

  if (!selector) {
    throw new Error('read-doc requires --selector "<id|route|lexeme>" or trailing selector text.');
  }

  await print(runtime.readDoc(selector, kind, forceRefresh));
}

async function runTrace(commandArgs: string[]): Promise<void> {
  const mode = (value(commandArgs, '--mode') ?? 'compact') as AnswerMode;
  const forceRefresh = flag(commandArgs, '--force');
  const sessionId = value(commandArgs, '--session');
  const question =
    value(commandArgs, '--question') ??
    commandArgs.filter((argument) => !argument.startsWith('--')).join(' ').trim();

  if (!question) {
    throw new Error('trace requires --question "<text>" or trailing question text.');
  }

  await print(runtime.trace(question, mode, forceRefresh, sessionId));
}

async function runLmCheck(commandArgs: string[]): Promise<void> {
  const timeoutMsRaw = value(commandArgs, '--timeout-ms');
  const timeoutMs = timeoutMsRaw ? Number(timeoutMsRaw) : undefined;
  const apiStyle = normalizeLmStudioApiStyle(value(commandArgs, '--api-style'));

  await print(
    runLmStudioHealthCheck({
      baseUrl: value(commandArgs, '--base-url'),
      model: value(commandArgs, '--model'),
      apiStyle,
      apiKey: value(commandArgs, '--api-key') ?? process.env.FPF_LOCAL_LLM_API_KEY,
      timeoutMs: Number.isFinite(timeoutMs) ? timeoutMs : undefined,
      systemPrompt: value(commandArgs, '--system-prompt'),
      input: value(commandArgs, '--input'),
    }),
  );
}

function flag(argsList: string[], flagName: string): boolean {
  return argsList.includes(flagName);
}

function value(argsList: string[], flagName: string): string | undefined {
  const index = argsList.indexOf(flagName);
  if (index < 0) {
    return undefined;
  }
  return argsList[index + 1];
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
  bun run cli -- lm-check [--base-url http://localhost:1234/v1] [--model google/gemma-4-31b] [--api-style responses|chat|lmstudio_chat] [--api-key <token>] [--timeout-ms 60000]
`);
}
