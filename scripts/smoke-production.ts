import { appendFile, readFile } from 'node:fs/promises';
import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http';
import { extname, normalize, resolve, sep } from 'node:path';

import {
  DEFAULT_PRODUCTION_SMOKE_MCP_BASE_URL,
  DEFAULT_PRODUCTION_SMOKE_WEBSITE_BASE_URL,
  formatProductionSmokeMarkdown,
  runProductionSmoke,
  type ProductionSmokeReport,
} from '../src/build/production-smoke.js';
import vercelHandler from '../src/entrypoints/vercel-function.js';
import {
  parseFlagMap,
  readPositiveInteger,
  readString,
} from './_args.js';

const flags = parseFlagMap(process.argv.slice(2));
const format = readString(flags, 'format', process.env.FPF_PRODUCTION_SMOKE_FORMAT ?? 'json');
const failOnBreach = flags.has('fail-on-breach');
const local = flags.has('local');
const timeoutMs = readPositiveInteger(
  flags,
  'timeout-ms',
  process.env.FPF_PRODUCTION_SMOKE_TIMEOUT_MS,
  30_000,
);

const report = local
  ? await runAgainstLocalServers()
  : await runProductionSmoke({
    websiteBaseUrl: readString(
      flags,
      'website-base-url',
      process.env.FPF_PRODUCTION_SMOKE_WEBSITE_BASE_URL
        ?? DEFAULT_PRODUCTION_SMOKE_WEBSITE_BASE_URL,
    ),
    mcpBaseUrl: readString(
      flags,
      'mcp-base-url',
      process.env.FPF_PRODUCTION_SMOKE_MCP_BASE_URL
        ?? DEFAULT_PRODUCTION_SMOKE_MCP_BASE_URL,
    ),
    timeoutMs,
  });

const markdown = formatProductionSmokeMarkdown(report);

if (process.env.GITHUB_OUTPUT) {
  await appendFile(process.env.GITHUB_OUTPUT, renderGithubOutput(report), 'utf8');
}
if (process.env.GITHUB_STEP_SUMMARY) {
  await appendFile(process.env.GITHUB_STEP_SUMMARY, markdown, 'utf8');
}

if (format === 'markdown') {
  process.stdout.write(markdown);
} else if (format === 'json') {
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} else {
  throw new Error('--format must be json or markdown.');
}

if (failOnBreach && report.breached) {
  process.exitCode = 1;
}

async function runAgainstLocalServers(): Promise<ProductionSmokeReport> {
  const docsOutDir = resolve(
    readString(flags, 'docs-out-dir', process.env.FPF_DOCS_OUT_DIR ?? 'doc_build'),
  );
  const website = await listen(createStaticWebsiteServer(docsOutDir));
  const mcp = await listen(createMcpServer());
  try {
    return await runProductionSmoke({
      websiteBaseUrl: website.baseUrl,
      mcpBaseUrl: mcp.baseUrl,
      timeoutMs,
    });
  } finally {
    await Promise.all([
      closeServer(website.server),
      closeServer(mcp.server),
    ]);
  }
}

function createStaticWebsiteServer(rootDir: string): Server {
  return createServer((request, response) => {
    serveStaticWebsite(rootDir, request, response).catch((error: unknown) => {
      response.statusCode = 500;
      response.setHeader('content-type', 'text/plain; charset=utf-8');
      response.end(error instanceof Error ? error.message : String(error));
    });
  });
}

function createMcpServer(): Server {
  return createServer((request, response) => {
    vercelHandler(request, response).catch((error: unknown) => {
      response.statusCode = 500;
      response.setHeader('content-type', 'text/plain; charset=utf-8');
      response.end(error instanceof Error ? error.message : String(error));
    });
  });
}

async function serveStaticWebsite(
  rootDir: string,
  request: IncomingMessage,
  response: ServerResponse,
): Promise<void> {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.statusCode = 405;
    response.setHeader('allow', 'GET, HEAD');
    response.end();
    return;
  }

  const url = new URL(request.url ?? '/', 'http://127.0.0.1');
  const filePath = resolveStaticPath(rootDir, url.pathname);
  const bytes = await readFile(filePath);
  response.statusCode = 200;
  response.setHeader('content-type', contentType(filePath));
  response.setHeader('cache-control', 'no-store');
  if (request.method === 'HEAD') {
    response.end();
    return;
  }
  response.end(bytes);
}

function resolveStaticPath(rootDir: string, pathname: string): string {
  const decoded = decodeURIComponent(pathname);
  const normalized = normalize(decoded).replace(/^(\.\.(\/|\\|$))+/u, '');
  const relative =
    normalized === sep || normalized === '/'
      ? 'index.html'
      : normalized.replace(/^[/\\]+/u, '').replace(/\/$/u, '/index.html');
  const withHtml = extname(relative) ? relative : `${relative}.html`;
  const filePath = resolve(rootDir, withHtml);
  const rootWithSep = rootDir.endsWith(sep) ? rootDir : `${rootDir}${sep}`;
  if (!filePath.startsWith(rootWithSep)) {
    throw new Error(`Static path escapes docs output: ${pathname}`);
  }
  return filePath;
}

function contentType(filePath: string): string {
  switch (extname(filePath)) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.json':
      return 'application/json; charset=utf-8';
    case '.css':
      return 'text/css; charset=utf-8';
    case '.js':
      return 'text/javascript; charset=utf-8';
    default:
      return 'application/octet-stream';
  }
}

async function listen(server: Server): Promise<{ server: Server; baseUrl: string }> {
  await new Promise<void>((resolveListen) => {
    server.listen(0, '127.0.0.1', resolveListen);
  });
  const address = server.address();
  if (typeof address !== 'object' || address === null) {
    throw new Error('Local smoke server did not expose a TCP port.');
  }
  return {
    server,
    baseUrl: `http://127.0.0.1:${address.port}`,
  };
}

async function closeServer(server: Server): Promise<void> {
  await new Promise<void>((resolveClose, rejectClose) => {
    server.close((error) => {
      if (error) {
        rejectClose(error);
        return;
      }
      resolveClose();
    });
  });
}

function renderGithubOutput(report: ProductionSmokeReport): string {
  return [
    ['state', report.state],
    ['ok', String(report.ok)],
    ['breached', String(report.breached)],
    ['website_base_url', report.websiteBaseUrl],
    ['mcp_base_url', report.mcpBaseUrl],
    ['expected_upstream_ref', report.expected.upstreamRef],
    ['expected_source_hash', report.expected.sourceHash],
    ['summary', report.summary],
  ].map(([key, value]) => `${key}=${sanitizeOutputValue(value)}\n`).join('');
}

function sanitizeOutputValue(value: string): string {
  return value.replace(/\r?\n/gu, ' ').trim();
}
