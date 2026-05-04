import { Mastra } from '@mastra/core/mastra';
import { VercelDeployer } from '@mastra/deployer-vercel';

import {
  createMastraRuntime,
  resolveMastraRuntimeOptions,
} from '../compat/mastra/runtime.js';

export { createMastraRuntime };

const vercelDeployer = new VercelDeployer({
  maxDuration: 300,
  memory: 2048,
  regions: ['iad1'],
});

// NOTE: The Mastra CLI statically scans this file for the literal pattern
// `export const mastra = new Mastra({ ... })`. Do NOT refactor this expression
// into a helper call — the CLI parses the AST and will not follow indirection.
// Runtime composition still lives in `createMastraRuntime` /
// `resolveMastraRuntimeOptions` in `../compat/mastra/runtime.ts`.
export const mastra = new Mastra({
  ...resolveMastraRuntimeOptions(),
  deployer: vercelDeployer,
});
