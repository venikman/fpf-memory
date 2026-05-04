import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import readline from 'node:readline';

import { afterEach, describe, expect, it } from '@rstest/core';

import { DEFAULT_SOURCE_PATH } from '../src/core/constants.js';

interface JsonRpcResponse {
  jsonrpc: '2.0';
  id: string | number | null;
  result?: Record<string, unknown>;
  error?: { code: number; message: string; data?: unknown };
}

/**
 * Compact stdio harness for driving the direct MCP server over JSON-RPC.
 * Mirrors `mcp-server.test.ts`'s harness but scoped to this file so the
 * session-continuity fixtures stay self-contained.
 */
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
    this.rl = readline.createInterface({ input: child.stdout, crlfDelay: Infinity });
    this.rl.on('line', (line) => this.handleLine(line));
    this.child.stderr.on('data', (chunk) => this.stderr.push(chunk.toString()));
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
            `MCP stdio exited before responding (code=${code ?? 'null'}, signal=${signal ?? 'null'})\n${this.stderr.join('')}`,
          ),
        );
      }
      this.pending.clear();
    });
  }

  async request(method: string, params?: Record<string, unknown>): Promise<JsonRpcResponse> {
    const id = this.nextId++;
    const payload = JSON.stringify({ jsonrpc: '2.0', id, method, ...(params ? { params } : {}) });
    const response = new Promise<JsonRpcResponse>((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`Timed out waiting for ${method}\n${this.stderr.join('')}`));
      }, 15_000);
      this.pending.set(id, { resolve, reject, timeout });
    });
    this.child.stdin.write(`${payload}\n`);
    return response;
  }

  notify(method: string, params?: Record<string, unknown>): void {
    this.child.stdin.write(
      `${JSON.stringify({ jsonrpc: '2.0', method, ...(params ? { params } : {}) })}\n`,
    );
  }

  async close(): Promise<void> {
    this.rl.close();
    if (this.child.exitCode !== null) return;
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
    if (!trimmed) return;
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
    if (id === undefined) return;
    const pending = this.pending.get(id);
    if (!pending) return;
    clearTimeout(pending.timeout);
    this.pending.delete(id);
    pending.resolve(message);
  }
}

function asToolPayload(message: JsonRpcResponse): Record<string, unknown> {
  expect(message.error).toBeUndefined();
  const result = message.result ?? {};
  expect(result.isError).not.toBe(true);
  return (result.structuredContent ?? {}) as Record<string, unknown>;
}

describe('MCP session-continuity roundtrip', () => {
  const harnesses: StdioMcpHarness[] = [];
  const tempDirs: string[] = [];

  afterEach(async () => {
    await Promise.all(harnesses.splice(0).map((h) => h.close()));
    await Promise.all(tempDirs.splice(0).map((d) => rm(d, { recursive: true, force: true })));
  });

  async function startHarness(): Promise<StdioMcpHarness> {
    const tempDir = await mkdtemp(resolve(tmpdir(), 'fpf-session-'));
    tempDirs.push(tempDir);
    const child = spawn('bun', ['src/entrypoints/mcp-stdio.ts'], {
      cwd: process.cwd(),
      env: {
        ...process.env,
        // Isolate the child from any ambient host/CI state so the test is
        // hermetic: (1) no live LM Studio call, (2) per-harness artifact
        // dir to avoid sharing `.runtime/fpf-index` with parallel workers
        // (which would bump `builtAt` between our status assertions),
        // (3) pinned spec source so the test doesn't drift with the host's
        // `FPF_SPEC_SOURCE_PATH`, (4) no persistent session cache so
        // `activeSessions` resets per run.
        FPF_LOCAL_LLM_BASE_URL: '',
        FPF_LOCAL_LLM_MODEL: '',
        FPF_LOCAL_LLM_API_KEY: '',
        FPF_SPEC_SOURCE_PATH: resolve(process.cwd(), DEFAULT_SOURCE_PATH),
        FPF_RUNTIME_ARTIFACT_DIR: resolve(tempDir, 'fpf-index'),
        FPF_PERSIST_SESSION_CACHE: 'false',
        FPF_MCP_SURFACE: 'full',
        FPF_RUNTIME_LOG_PATH: resolve(tempDir, 'fpf-runtime.log'),
        FPF_RUNTIME_OBSERVABILITY_PATH: resolve(tempDir, 'runtime-observability.json'),
      },
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    const harness = new StdioMcpHarness(child);
    harnesses.push(harness);

    const initialize = await harness.request('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'rstest', version: '0.9.7' },
    });
    expect(initialize.error).toBeUndefined();
    harness.notify('notifications/initialized');
    return harness;
  }

  it('threads a sessionId through query/trace and exposes it via get_fpf_index_status', async () => {
    const harness = await startHarness();
    const sessionId = 'roundtrip-session-1';

    const initialStatus = asToolPayload(
      await harness.request('tools/call', { name: 'get_fpf_index_status', arguments: {} }),
    );
    const initialSessionCache = initialStatus.sessionCache as { activeSessions: number };
    const initialBuiltAt = initialStatus.builtAt as string;
    expect(typeof initialBuiltAt).toBe('string');

    const query = asToolPayload(
      await harness.request('tools/call', {
        name: 'query_fpf_spec',
        arguments: {
          question: 'What is U.BoundedContext?',
          mode: 'verbose',
          sessionId,
        },
      }),
    );
    expect(query.mode).toBe('verbose');
    expect((query.ids as string[])).toContain('A.1.1');

    const trace = asToolPayload(
      await harness.request('tools/call', {
        name: 'trace_fpf_path',
        arguments: {
          question: 'How does U.BoundedContext relate to U.RoleAssignment?',
          sessionId,
        },
      }),
    );
    // `trace` persists session state on its own — a follow-up retrieval
    // step must observe the session cache activity.
    expect(trace.selectedNodeIds).toBeDefined();

    const followupStatus = asToolPayload(
      await harness.request('tools/call', { name: 'get_fpf_index_status', arguments: {} }),
    );
    const followupSessionCache = followupStatus.sessionCache as { activeSessions: number };
    expect(followupSessionCache.activeSessions).toBeGreaterThanOrEqual(
      initialSessionCache.activeSessions + 1,
    );

    // The snapshot must not get spuriously rebuilt between calls — that
    // would break session caching and inflate latency.
    expect(followupStatus.builtAt).toBe(initialBuiltAt);
    expect(followupStatus.fresh).toBe(true);
  });

  it('forces a rebuild via refresh_fpf_index without corrupting the session cache', async () => {
    const harness = await startHarness();
    const sessionId = 'roundtrip-session-2';

    // Seed a session.
    await harness.request('tools/call', {
      name: 'query_fpf_spec',
      arguments: {
        question: 'What is U.RoleAssignment?',
        sessionId,
      },
    });

    const preRefreshStatus = asToolPayload(
      await harness.request('tools/call', { name: 'get_fpf_index_status', arguments: {} }),
    );
    const preRefreshBuiltAt = preRefreshStatus.builtAt as string;

    const refresh = asToolPayload(
      await harness.request('tools/call', {
        name: 'refresh_fpf_index',
        arguments: { force: true },
      }),
    );
    expect(refresh.rebuilt).toBe(true);
    expect(refresh.reason).toBe('forced');

    // A force-refresh bumps builtAt and keeps the snapshot fresh for follow-ups.
    const postRefreshStatus = asToolPayload(
      await harness.request('tools/call', { name: 'get_fpf_index_status', arguments: {} }),
    );
    expect(typeof postRefreshStatus.builtAt).toBe('string');
    expect(postRefreshStatus.builtAt).not.toBe(preRefreshBuiltAt);
    expect(postRefreshStatus.fresh).toBe(true);

    // Session cache survives a rebuild (sessions are in-memory, not in artefacts).
    const postSessionCache = postRefreshStatus.sessionCache as { activeSessions: number };
    expect(postSessionCache.activeSessions).toBeGreaterThanOrEqual(1);
  });
});
