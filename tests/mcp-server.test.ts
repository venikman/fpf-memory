import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import readline from 'node:readline';

import { afterEach, describe, expect, it } from '@rstest/core';

import {
  createHostedComposition,
  HOSTED_MCP_ROUTES,
  LEGACY_HOSTED_MCP_ROUTE,
} from '../src/composition/hosted.js';
import { DEFAULT_SOURCE_PATH } from '../src/core/constants.js';
import vercelHandler from '../src/entrypoints/vercel-function.js';

const MCP_REQUEST_TIMEOUT_MS = 30_000;
const FULL_SURFACE_TEST_TIMEOUT_MS = 70_000;

interface JsonRpcResponse {
  jsonrpc: '2.0';
  id: string | number | null;
  result?: Record<string, unknown>;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}

class StdioMcpHarness {
  private readonly pending = new Map<
    number,
    {
      resolve: (value: JsonRpcResponse) => void;
      reject: (error: Error) => void;
      timeout: NodeJS.Timeout;
    }
  >();
  private readonly rl: readline.Interface;
  private nextId = 1;
  readonly stderr: string[] = [];

  constructor(private readonly child: ChildProcessWithoutNullStreams) {
    this.rl = readline.createInterface({
      input: child.stdout,
      crlfDelay: Infinity,
    });
    this.rl.on('line', (line) => this.handleLine(line));
    this.child.stderr.on('data', (chunk) => {
      this.stderr.push(chunk.toString());
    });
    // Spawn failures (e.g. binary not on PATH) emit 'error' without ever
    // firing 'exit' — reject pending requests so the test fails fast
    // instead of blocking on the 15s request timeout.
    this.child.on('error', (err) => {
      for (const { reject, timeout } of this.pending.values()) {
        clearTimeout(timeout);
        reject(new Error(`MCP stdio spawn failed: ${err.message}\n${this.stderr.join('')}`));
      }
      this.pending.clear();
    });
    this.child.once('exit', (code, signal) => {
      for (const { reject, timeout } of this.pending.values()) {
        clearTimeout(timeout);
        reject(
          new Error(
            `MCP stdio process exited before responding (code=${code ?? 'null'}, signal=${signal ?? 'null'})\n${this.stderr.join('')}`,
          ),
        );
      }
      this.pending.clear();
    });
  }

  async request(method: string, params?: Record<string, unknown>): Promise<JsonRpcResponse> {
    const id = this.nextId++;
    const payload = JSON.stringify({
      jsonrpc: '2.0',
      id,
      method,
      ...(params ? { params } : {}),
    });

    const response = new Promise<JsonRpcResponse>((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pending.delete(id);
        reject(
          new Error(`Timed out waiting for MCP response to ${method}\n${this.stderr.join('')}`),
        );
      }, MCP_REQUEST_TIMEOUT_MS);
      this.pending.set(id, { resolve, reject, timeout });
    });

    this.child.stdin.write(`${payload}\n`);
    return response;
  }

  notify(method: string, params?: Record<string, unknown>): void {
    const payload = JSON.stringify({
      jsonrpc: '2.0',
      method,
      ...(params ? { params } : {}),
    });
    this.child.stdin.write(`${payload}\n`);
  }

  async close(): Promise<void> {
    this.rl.close();
    if (this.child.exitCode !== null) {
      return;
    }

    // Escalate to SIGKILL if the child ignores SIGTERM so afterEach never
    // blocks the whole test process on an unresponsive MCP server.
    await new Promise<void>((resolve) => {
      const killTimer = setTimeout(() => {
        this.child.kill('SIGKILL');
        resolve();
      }, 3_000);
      this.child.once('exit', () => {
        clearTimeout(killTimer);
        resolve();
      });
      this.child.kill();
    });
  }

  private handleLine(line: string): void {
    const trimmed = line.trim();
    if (!trimmed) {
      return;
    }

    // The MCP server occasionally emits non-JSON banner lines. A JSON.parse
    // throw here would crash the harness without ever rejecting the pending
    // request — swallow, log, and keep listening.
    let message: JsonRpcResponse;
    try {
      message = JSON.parse(trimmed) as JsonRpcResponse;
    } catch {
      this.stderr.push(`[non-JSON stdout] ${line}\n`);
      return;
    }
    const id = typeof message.id === 'number' ? message.id : undefined;
    if (id === undefined) {
      return;
    }

    const pending = this.pending.get(id);
    if (!pending) {
      return;
    }

    clearTimeout(pending.timeout);
    this.pending.delete(id);
    pending.resolve(message);
  }
}

describe('direct MCP server', () => {
  const harnesses: StdioMcpHarness[] = [];
  const tempDirs: string[] = [];

  afterEach(async () => {
    await Promise.all(harnesses.splice(0).map((harness) => harness.close()));
    await Promise.all(tempDirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })));
  });

  async function startHarness(surface: 'public' | 'full' = 'full'): Promise<StdioMcpHarness> {
    const tempDir = await mkdtemp(resolve(tmpdir(), 'fpf-mcp-stdio-'));
    tempDirs.push(tempDir);

    const child = spawn('bun', ['src/entrypoints/mcp-stdio.ts'], {
      cwd: process.cwd(),
      env: {
        ...process.env,
        // Isolate the child from any ambient host/CI state so the test is
        // hermetic: a per-harness artifact dir avoids sharing
        // `.runtime/fpf-index` with parallel workers, plus a pinned spec
        // source and no persistent session cache.
        FPF_SPEC_SOURCE_PATH: resolve(process.cwd(), DEFAULT_SOURCE_PATH),
        FPF_RUNTIME_ARTIFACT_DIR: resolve(tempDir, 'fpf-index'),
        FPF_PERSIST_SESSION_CACHE: 'false',
        ...(surface === 'full' ? { FPF_MCP_SURFACE: 'full' } : {}),
        FPF_RUNTIME_LOG_PATH: resolve(tempDir, 'fpf-runtime.log'),
      },
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    const harness = new StdioMcpHarness(child);
    harnesses.push(harness);
    return harness;
  }

  async function initializeHarness(harness: StdioMcpHarness): Promise<void> {
    const initialize = await harness.request('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: {
        name: 'rstest',
        version: '0.9.7',
      },
    });

    expect(initialize.error).toBeUndefined();
    expect(initialize.result?.protocolVersion).toBe('2024-11-05');
    expect(initialize.result?.serverInfo).toEqual({
      name: 'fpf_reference',
      version: '1.0.0',
    });
    harness.notify('notifications/initialized');
  }

  it('starts stdio and answers initialize plus ping', async () => {
    const harness = await startHarness();
    await initializeHarness(harness);

    const ping = await harness.request('ping');
    expect(ping.error).toBeUndefined();
    expect(ping.result).toEqual({});
  });

  it('lists the canonical snake_case tools with plain JSON Schemas', async () => {
    const harness = await startHarness();
    await initializeHarness(harness);

    const toolsList = await harness.request('tools/list');
    expect(toolsList.error).toBeUndefined();

    const tools = (toolsList.result?.tools ?? []) as Array<{
      name: string;
      inputSchema: Record<string, unknown>;
    }>;

    expect(tools.map((tool) => tool.name)).toEqual([
      'browse_fpf_catalog',
      'search_fpf',
      'ask_fpf',
      'query_fpf_spec',
      'read_fpf_doc',
      'get_fpf_index_status',
      'inspect_fpf_node',
      'inspect_fpf_anchor',
      'expand_fpf_citations',
      'trace_fpf_path',
      'refresh_fpf_index',
    ]);

    for (const tool of tools) {
      expect(tool.name).toMatch(/^[a-z0-9_]+$/);
      expect(typeof tool.inputSchema).toBe('object');
      expect(tool.inputSchema).not.toBe(null);
      expect(tool.inputSchema['~standard']).toBeUndefined();
    }

    const statusSchema = tools.find((tool) => tool.name === 'get_fpf_index_status')?.inputSchema;
    expect(statusSchema?.type).toBe('object');
    expect(statusSchema?.properties).toEqual({});
    expect(statusSchema?.additionalProperties).toBe(false);
  });

  // This chains multiple full-surface MCP calls through the stdio transport.
  // Large upstream spec refreshes can push the query/ask phase past Rstest's
  // default 20s test timeout on GitHub runners, even when each individual MCP
  // request is healthy.
  it('serves status, query, and ask surfaces without schema failures', async () => {
    const harness = await startHarness();
    await initializeHarness(harness);

    const status = await harness.request('tools/call', {
      name: 'get_fpf_index_status',
      arguments: {},
    });
    const statusPayload = asToolPayload(status);
    expect(typeof statusPayload.snapshotExists).toBe('boolean');
    expect(statusPayload.compilerMode).toBe('local_vectorless');

    const query = await harness.request('tools/call', {
      name: 'query_fpf_spec',
      arguments: {
        question: 'What is U.BoundedContext?',
      },
    });
    const queryPayload = asToolPayload(query);
    expect(queryPayload.mode).toBe('verbose');
    expect((queryPayload.ids as string[])).toContain('A.1.1');
    expect(
      (queryPayload.citations as string[]).some((citation) => citation.startsWith('A.1.1')),
    ).toBe(true);

    const trace = await harness.request('tools/call', {
      name: 'trace_fpf_path',
      arguments: {
        question: 'What is U.BoundedContext?',
      },
    });
    const tracePayload = asToolPayload(trace);
    expect(tracePayload.mode).toBe('compact');

    const readDoc = await harness.request('tools/call', {
      name: 'read_fpf_doc',
      arguments: {
        selector: 'A.1.1',
      },
    });
    const readDocPayload = asToolPayload(readDoc);
    expect(readDocPayload.nodeId).toBe('A.1.1');
    expect(readDocPayload.markdown).toContain('# U.BoundedContext: The Semantic Frame');
    expect(typeof readDocPayload.markdownChars).toBe('number');
    expect(Array.isArray(readDocPayload.headings)).toBe(true);

    // Text-content fallback (audit item #5): readers on the text
    // channel should see title + node ID + paths + size + outline
    // headings, not the old single-line "markdown is in
    // structuredContent" placeholder.
    const readDocResult = (readDoc.result ?? {}) as {
      content?: Array<{ type?: string; text?: string }>;
    };
    const textContent = readDocResult.content?.find(
      (item) => item.type === 'text',
    )?.text;
    expect(typeof textContent).toBe('string');
    expect(textContent).toContain('A.1.1');
    expect(textContent).toContain('chars');
    expect(textContent).toContain('Outline:');

    // Preview mode (audit item #4): omit the full markdown body but
    // still surface headings + a short preview snippet.
    const readDocPreview = await harness.request('tools/call', {
      name: 'read_fpf_doc',
      arguments: {
        selector: 'A.1.1',
        mode: 'preview',
      },
    });
    const previewPayload = asToolPayload(readDocPreview);
    expect(previewPayload.markdown).toBeUndefined();
    expect(typeof previewPayload.preview).toBe('string');
    expect((previewPayload.preview as string).length).toBeGreaterThan(0);
    expect(previewPayload.markdownChars).toBe(readDocPayload.markdownChars);

    const routeCatalog = await harness.request('tools/call', {
      name: 'browse_fpf_catalog',
      arguments: {
        kind: 'route',
      },
    });
    const routeCatalogPayload = asToolPayload(routeCatalog);
    const routeIds = new Set(
      ((routeCatalogPayload.entries ?? []) as Array<{ id?: string }>)
        .map((entry) => entry.id)
        .filter((id): id is string => Boolean(id)),
    );

    const readRouteDoc = await harness.request('tools/call', {
      name: 'read_fpf_doc',
      arguments: {
        selector: 'route:project-alignment',
        kind: 'route',
      },
    });
    const readRouteDocPayload = asToolPayload(readRouteDoc);
    if (routeIds.has('route:project-alignment')) {
      expect(readRouteDocPayload.resolvedAs).toBe('route');
      expect(readRouteDocPayload.nodeId).toBe('route:project-alignment');
      expect(readRouteDocPayload.markdown).toContain('# project alignment');
    } else {
      expect(readRouteDocPayload.status).toBe('not_found');
      expect(readRouteDocPayload.resolvedAs).toBe('not_found');
    }

    const readBoundaryRouteDoc = await harness.request('tools/call', {
      name: 'read_fpf_doc',
      arguments: {
        selector: 'route:boundary-unpacking-claim-routing',
        kind: 'route',
      },
    });
    const readBoundaryRouteDocPayload = asToolPayload(readBoundaryRouteDoc);
    if (routeIds.has('route:boundary-unpacking-claim-routing')) {
      expect(readBoundaryRouteDocPayload.resolvedAs).toBe('route');
      expect(readBoundaryRouteDocPayload.nodeId).toBe('route:boundary-unpacking-claim-routing');
      expect(readBoundaryRouteDocPayload.markdown).toContain(
        '# Boundary unpacking / claim routing',
      );
    } else {
      expect(readBoundaryRouteDocPayload.status).toBe('not_found');
      expect(readBoundaryRouteDocPayload.resolvedAs).toBe('not_found');
    }

    const reviewerQuery = await harness.request('tools/call', {
      name: 'query_fpf_spec',
      arguments: {
        mode: 'compact',
        question:
          'For a PR/code reviewer checking an API contract change, return exact route or pattern IDs and acceptance checks without pasting the full FPF.',
      },
    });
    const reviewerQueryPayload = asToolPayload(reviewerQuery);
    expect(['ok', 'ambiguous']).toContain(reviewerQueryPayload.status);
    expect(typeof reviewerQueryPayload.answer).toBe('string');
    expect((reviewerQueryPayload.answer as string).length).toBeGreaterThan(0);
    expect(Array.isArray(reviewerQueryPayload.ids)).toBe(true);
    expect((reviewerQueryPayload.ids as string[]).length).toBeGreaterThan(0);
    if (
      reviewerQueryPayload.status === 'ok' &&
      routeIds.has('route:boundary-unpacking-claim-routing')
    ) {
      expect((reviewerQueryPayload.ids as string[]).slice(0, 4)).toEqual([
        'route:boundary-unpacking-claim-routing',
        'A.6',
        'A.6.B',
        'A.6.C',
      ]);
      expect(reviewerQueryPayload.answer).toContain('route:boundary-unpacking-claim-routing');
    } else if (reviewerQueryPayload.status === 'ambiguous') {
      expect(Array.isArray(reviewerQueryPayload.candidateIds)).toBe(true);
      expect((reviewerQueryPayload.candidateIds as string[]).length).toBeGreaterThan(0);
    } else {
      expect((reviewerQueryPayload.ids as string[]).every((id) => !id.startsWith('route:'))).toBe(
        true,
      );
    }

    const ask = await harness.request('tools/call', {
      name: 'ask_fpf',
      arguments: {
        question: 'Give me a checklist for how to model my project information system.',
      },
    });
    const askPayload = asToolPayload(ask);
    expect(askPayload.mode).toBe('verbose');
    if (routeIds.has('route:project-alignment')) {
      expect(askPayload.ids).toContain('route:project-alignment');
    } else {
      expect((askPayload.ids as string[]).every((id) => !id.startsWith('route:'))).toBe(true);
    }
    expect(askPayload.markdown).toContain('## Result');
    expect(askPayload.markdown).toContain('## Grounding');

    const reviewerAsk = await harness.request('tools/call', {
      name: 'ask_fpf',
      arguments: {
        mode: 'compact',
        question:
          'For a PR/code reviewer checking an API contract change, what bounded FPF route or IDs should they use, and what should they not load yet?',
      },
    });
    const reviewerAskPayload = asToolPayload(reviewerAsk);
    if (routeIds.has('route:boundary-unpacking-claim-routing')) {
      expect((reviewerAskPayload.ids as string[]).slice(0, 4)).toEqual([
        'route:boundary-unpacking-claim-routing',
        'A.6',
        'A.6.B',
        'A.6.C',
      ]);
      expect(reviewerAskPayload.markdown).toContain('route:boundary-unpacking-claim-routing');
    } else {
      expect((reviewerAskPayload.ids as string[]).every((id) => !id.startsWith('route:'))).toBe(
        true,
      );
    }

    const agentQuery = await harness.request('tools/call', {
      name: 'query_fpf_spec',
      arguments: {
        mode: 'compact',
        question:
          'Use fpf_reference MCP to build an agent work packet without pasting the full FPF. Return route/doc selector, IDs, what not to load, acceptance check, and next move.',
      },
    });
    const agentQueryPayload = asToolPayload(agentQuery);
    expect(agentQueryPayload.status).toBe('ok');
    if (routeIds.has('route:project-alignment')) {
      expect((agentQueryPayload.ids as string[]).slice(0, 3)).toEqual([
        'route:project-alignment',
        'A.1.1',
        'A.15',
      ]);
      expect(agentQueryPayload.answer).toContain('route:project-alignment');
    } else {
      expect((agentQueryPayload.ids as string[]).every((id) => !id.startsWith('route:'))).toBe(
        true,
      );
    }
  }, FULL_SURFACE_TEST_TIMEOUT_MS);

  it('defaults to public tools when FPF_MCP_SURFACE is unset', async () => {
    const harness = await startHarness('public');
    await initializeHarness(harness);

    const toolsList = await harness.request('tools/list');
    const tools = (toolsList.result?.tools ?? []) as Array<{ name: string }>;
    expect(tools.map((tool) => tool.name)).toEqual([
      'browse_fpf_catalog',
      'search_fpf',
      'ask_fpf',
      'query_fpf_spec',
      'read_fpf_doc',
      'get_fpf_index_status',
    ]);
  });

  it('initializes the direct hosted runtime', async () => {
    const { app } = createHostedComposition({
      ...process.env,
      PORT: '0',
    } as NodeJS.ProcessEnv);
    const response = await app.request('/');
    expect(response.status).toBe(200);
  });

  it('initializes hosted MCP through the Vercel Node adapter', async () => {
    const server = createServer((request, response) => {
      vercelHandler(request, response).catch((error: unknown) => {
        response.statusCode = 500;
        response.end(error instanceof Error ? error.message : String(error));
      });
    });

    await new Promise<void>((resolveListen) => {
      server.listen(0, '127.0.0.1', resolveListen);
    });

    try {
      const address = server.address();
      expect(typeof address).toBe('object');
      expect(address).not.toBeNull();
      const port = (address as { port: number }).port;
      for (const route of HOSTED_MCP_ROUTES) {
        const response = await fetch(`http://127.0.0.1:${port}${route}`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/json, text/event-stream',
            'MCP-Protocol-Version': '2025-06-18',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'initialize',
            params: {
              protocolVersion: '2025-06-18',
              capabilities: {},
              clientInfo: {
                name: 'rstest-vercel-node-adapter',
                version: '1.0.0',
              },
            },
          }),
          signal: AbortSignal.timeout(5_000),
        });

        if (route === LEGACY_HOSTED_MCP_ROUTE) {
          expect(response.status).toBe(403);
          expect(response.headers.get('x-vercel-mitigated')).toBe('deny');
          const payload = await response.json() as JsonRpcResponse;
          expect(payload.error?.message).toContain('Legacy FPF MCP endpoint is disabled');
          continue;
        }

        expect(response.status).toBe(200);
        expect(response.headers.get('content-type')).toContain('application/json');
        const payload = await response.json() as JsonRpcResponse;
        expect(payload.error).toBeUndefined();
        expect(payload.result?.serverInfo).toEqual({
          name: 'fpf_reference',
          version: '1.0.0',
        });
      }
    } finally {
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
  });

  it('rejects standalone hosted MCP GET streams through the Vercel Node adapter', async () => {
    const server = createServer((request, response) => {
      vercelHandler(request, response).catch((error: unknown) => {
        response.statusCode = 500;
        response.end(error instanceof Error ? error.message : String(error));
      });
    });

    await new Promise<void>((resolveListen) => {
      server.listen(0, '127.0.0.1', resolveListen);
    });

    try {
      const address = server.address();
      expect(typeof address).toBe('object');
      expect(address).not.toBeNull();
      const port = (address as { port: number }).port;
      for (const route of HOSTED_MCP_ROUTES) {
        const response = await fetch(`http://127.0.0.1:${port}${route}`, {
          method: 'GET',
          headers: {
            accept: 'text/event-stream',
            'MCP-Protocol-Version': '2025-06-18',
          },
          signal: AbortSignal.timeout(5_000),
        });
        await response.body?.cancel().catch(() => undefined);

        if (route === LEGACY_HOSTED_MCP_ROUTE) {
          expect(response.status).toBe(403);
          expect(response.headers.get('x-vercel-mitigated')).toBe('deny');
          continue;
        }

        expect(response.status).toBe(405);
        expect(response.headers.get('allow')).toBe('POST, DELETE');
      }
    } finally {
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
  });

  it('short-circuits all hosted MCP routes when the production disable flag is set', async () => {
    const previous = process.env.FPF_HOSTED_MCP_DISABLED;
    process.env.FPF_HOSTED_MCP_DISABLED = 'true';
    const server = createServer((request, response) => {
      vercelHandler(request, response).catch((error: unknown) => {
        response.statusCode = 500;
        response.end(error instanceof Error ? error.message : String(error));
      });
    });

    await new Promise<void>((resolveListen) => {
      server.listen(0, '127.0.0.1', resolveListen);
    });

    try {
      const address = server.address();
      expect(typeof address).toBe('object');
      expect(address).not.toBeNull();
      const port = (address as { port: number }).port;
      for (const route of HOSTED_MCP_ROUTES) {
        const response = await fetch(`http://127.0.0.1:${port}${route}`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/json, text/event-stream',
            'MCP-Protocol-Version': '2025-06-18',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'initialize',
            params: {
              protocolVersion: '2025-06-18',
              capabilities: {},
              clientInfo: {
                name: 'rstest-disabled-hosted-mcp',
                version: '1.0.0',
              },
            },
          }),
          signal: AbortSignal.timeout(5_000),
        });

        expect(response.status).toBe(503);
        expect(response.headers.get('cache-control')).toBe('no-store');
        expect(response.headers.get('retry-after')).toBe('3600');
        const payload = await response.json() as JsonRpcResponse;
        expect(payload.error?.message).toContain('temporarily disabled');
      }
    } finally {
      if (previous === undefined) {
        delete process.env.FPF_HOSTED_MCP_DISABLED;
      } else {
        process.env.FPF_HOSTED_MCP_DISABLED = previous;
      }
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
  });
});

function asToolPayload(message: JsonRpcResponse): Record<string, unknown> {
  expect(message.error).toBeUndefined();
  const result = message.result ?? {};
  expect(result.isError).not.toBe(true);
  return (result.structuredContent ?? {}) as Record<string, unknown>;
}
