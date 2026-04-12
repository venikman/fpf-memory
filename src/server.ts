import { getRuntimeLogger } from './logging/runtime-logger.js';
import { createHonoMastraRuntime } from './mastra.js';
import { parsePort } from './server-config.js';

const logger = getRuntimeLogger();
const port = parsePort(process.env.PORT);

const { app } = await createHonoMastraRuntime();

const server = Bun.serve({
  fetch: app.fetch,
  port,
});

logger.info('Mastra Hono server start', {
  port: server.port,
});
