export const LIFECYCLE_STATES = [
  'exploration',
  'shaping',
  'evidence',
  'operation',
] as const;

export type LifecycleState = (typeof LIFECYCLE_STATES)[number];

export const CONTEXT_IDS = [
  'Ctx.Core',
  'Ctx.App',
  'Ctx.Run.MCP',
  'Ctx.Run.Hosted',
  'Ctx.Docs',
  'Ctx.Build',
  'Ctx.Infra',
] as const;

export type ContextId = (typeof CONTEXT_IDS)[number];
