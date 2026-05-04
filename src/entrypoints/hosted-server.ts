import { createHostedComposition } from '../composition/hosted.js';

export async function main(): Promise<void> {
  const { logger, hostedConfig, app } = createHostedComposition(process.env);

  const httpServer = Bun.serve({
    fetch: app.fetch,
    port: hostedConfig.port,
  });

  logger.info('Hosted MCP server start', {
    port: httpServer.port,
  });
}
