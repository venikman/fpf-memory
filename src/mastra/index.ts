import { Mastra } from '@mastra/core/mastra';

import {
  createMastraRuntime,
  resolveMastraRuntimeOptions,
} from '../compat/mastra/runtime.js';

export { createMastraRuntime };

// NOTE: The Mastra CLI statically scans this file for the literal pattern
// `export const mastra = new Mastra({ ... })`. Do NOT refactor this expression
// into a helper call — the CLI parses the AST and will not follow indirection.
// Runtime composition still lives in `createMastraRuntime` /
// `resolveMastraRuntimeOptions` in `../compat/mastra/runtime.ts`.
export const mastra = new Mastra({ ...resolveMastraRuntimeOptions() });
