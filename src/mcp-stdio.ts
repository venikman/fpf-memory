import { getRuntimeLogger } from './logging/runtime-logger.js';
import { startStdioMcpServer } from './mcp/server.js';

const logger = getRuntimeLogger();

logger.info('MCP stdio server start');

try {
  await startStdioMcpServer();
} catch (error) {
  logger.error('MCP stdio server failed', {
    error: error instanceof Error ? error.message : 'Unknown MCP stdio error',
  });
  throw error;
}
