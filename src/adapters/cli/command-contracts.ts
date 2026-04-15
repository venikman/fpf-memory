import { z } from 'zod';

import { answerModeSchema } from '../../mcp/tool-contracts.js';

const selectorKindSchema = z.enum(['auto', 'id', 'route', 'lexeme']);

const statusCommandSchema = z.object({
  kind: z.literal('status'),
});

const refreshCommandSchema = z.object({
  kind: z.literal('refresh'),
  force: z.boolean(),
});

const queryCommandSchema = z.object({
  kind: z.literal('query'),
  question: z.string().min(1),
  mode: answerModeSchema.optional(),
  forceRefresh: z.boolean(),
  sessionId: z.string().min(1).optional(),
});

const inspectCommandSchema = z.object({
  kind: z.literal('inspect'),
  selector: z.string().min(1),
  selectorKind: selectorKindSchema.optional(),
  forceRefresh: z.boolean(),
});

const readDocCommandSchema = z.object({
  kind: z.literal('read-doc'),
  selector: z.string().min(1),
  selectorKind: selectorKindSchema.optional(),
  forceRefresh: z.boolean(),
});

const traceCommandSchema = z.object({
  kind: z.literal('trace'),
  question: z.string().min(1),
  mode: answerModeSchema.optional(),
  forceRefresh: z.boolean(),
  sessionId: z.string().min(1).optional(),
});

const lmCheckCommandSchema = z.object({
  kind: z.literal('lm-check'),
  baseUrl: z.string().url().optional(),
  model: z.string().min(1).optional(),
  apiKey: z.string().min(1).optional(),
  timeoutMs: z.number().int().positive().optional(),
  systemPrompt: z.string().min(1).optional(),
  input: z.string().min(1).optional(),
});

export const cliCommandSchema = z.discriminatedUnion('kind', [
  statusCommandSchema,
  refreshCommandSchema,
  queryCommandSchema,
  inspectCommandSchema,
  readDocCommandSchema,
  traceCommandSchema,
  lmCheckCommandSchema,
]);

export type CliCommand = z.infer<typeof cliCommandSchema>;
export interface CliHelpCommand {
  kind: 'help';
}

export interface CliUnknownCommand {
  kind: 'unknown_command';
  command: string;
}

export type ParsedCliCommand = CliCommand | CliHelpCommand | CliUnknownCommand;

export function parseCliCommand(args: string[]): ParsedCliCommand {
  const command = args[0] ?? 'help';
  const commandArgs = args.slice(1);

  switch (command) {
    case 'help':
      return { kind: 'help' };
    case 'status':
      return cliCommandSchema.parse({ kind: 'status' });
    case 'refresh': {
      const parsed = scanArgs(commandArgs, []);
      return cliCommandSchema.parse({
        kind: 'refresh',
        force: flag(parsed, '--force'),
      });
    }
    case 'query': {
      const parsed = scanArgs(commandArgs, ['--question', '--mode', '--session']);
      return cliCommandSchema.parse({
        kind: 'query',
        question: readTrailingValue(parsed, '--question'),
        mode: value(parsed, '--mode'),
        forceRefresh: flag(parsed, '--force'),
        sessionId: value(parsed, '--session'),
      });
    }
    case 'inspect': {
      const parsed = scanArgs(commandArgs, ['--selector', '--kind']);
      return cliCommandSchema.parse({
        kind: 'inspect',
        selector: readTrailingValue(parsed, '--selector'),
        selectorKind: value(parsed, '--kind'),
        forceRefresh: flag(parsed, '--force'),
      });
    }
    case 'read-doc': {
      const parsed = scanArgs(commandArgs, ['--selector', '--kind']);
      return cliCommandSchema.parse({
        kind: 'read-doc',
        selector: readTrailingValue(parsed, '--selector'),
        selectorKind: value(parsed, '--kind'),
        forceRefresh: flag(parsed, '--force'),
      });
    }
    case 'trace': {
      const parsed = scanArgs(commandArgs, ['--question', '--mode', '--session']);
      return cliCommandSchema.parse({
        kind: 'trace',
        question: readTrailingValue(parsed, '--question'),
        mode: value(parsed, '--mode'),
        forceRefresh: flag(parsed, '--force'),
        sessionId: value(parsed, '--session'),
      });
    }
    case 'lm-check': {
      const parsed = scanArgs(commandArgs, [
        '--base-url',
        '--model',
        '--api-key',
        '--timeout-ms',
        '--system-prompt',
        '--input',
      ]);
      const timeoutRaw = value(parsed, '--timeout-ms');
      return cliCommandSchema.parse({
        kind: 'lm-check',
        baseUrl: value(parsed, '--base-url'),
        model: value(parsed, '--model'),
        apiKey: value(parsed, '--api-key'),
        timeoutMs: timeoutRaw ? Number(timeoutRaw) : undefined,
        systemPrompt: value(parsed, '--system-prompt'),
        input: value(parsed, '--input'),
      });
    }
    default:
      return {
        kind: 'unknown_command',
        command,
      };
  }
}

interface ScannedArgs {
  positionals: string[];
  flags: Set<string>;
  values: Map<string, string | undefined>;
}

function scanArgs(argsList: string[], valueFlags: string[]): ScannedArgs {
  const valueFlagSet = new Set(valueFlags);
  const parsed: ScannedArgs = {
    positionals: [],
    flags: new Set<string>(),
    values: new Map<string, string | undefined>(),
  };

  for (let index = 0; index < argsList.length; index += 1) {
    const argument = argsList[index]!;
    if (valueFlagSet.has(argument)) {
      const next = argsList[index + 1];
      if (next !== undefined && !next.startsWith('--')) {
        parsed.values.set(argument, next);
        index += 1;
      } else {
        parsed.values.set(argument, undefined);
      }
      continue;
    }

    if (argument.startsWith('--')) {
      parsed.flags.add(argument);
      continue;
    }

    parsed.positionals.push(argument);
  }

  return parsed;
}

function flag(argsList: ScannedArgs, flagName: string): boolean {
  return argsList.flags.has(flagName);
}

function value(argsList: ScannedArgs, flagName: string): string | undefined {
  return argsList.values.get(flagName);
}

function readTrailingValue(argsList: ScannedArgs, flagName: string): string {
  return value(argsList, flagName) ?? argsList.positionals.join(' ').trim();
}
