import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

import { getSharedMcpComposition } from '../composition/mcp.js';

export async function main(): Promise<void> {
  const {
    logger,
    mcpConfig,
    fpfReference,
    fpfReferencePublic,
  } = getSharedMcpComposition(process.env);
  const server = mcpConfig.surface === 'full' ? fpfReference : fpfReferencePublic;

  logger.info('MCP stdio server start');

  try {
    await server.startStdio();
  } catch (error) {
    logger.error('MCP stdio server failed', {
      error: normalizeErrorMessage(error),
      cause: error instanceof Error ? error.stack ?? error : error,
    });
    await new Promise<void>((resolve) => setImmediate(resolve));
    process.exit(1);
  }
}

function normalizeErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}

function isMainModule(metaUrl: string): boolean {
  const entrypoint = process.argv[1];
  return Boolean(entrypoint && metaUrl === pathToFileURL(resolve(entrypoint)).href);
}

if (isMainModule(import.meta.url)) {
  void main();
}
