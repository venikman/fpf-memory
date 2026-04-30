import { spawn } from 'node:child_process';
import { createServer, type Server } from 'node:http';
import { existsSync, statSync } from 'node:fs';
import {
  mkdir,
  readFile,
  rename,
  writeFile,
} from 'node:fs/promises';
import { extname, relative, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

import { chromium } from 'playwright';

export type E2ERecordTarget = 'report' | 'docs';

export interface E2EPreset {
  name: string;
  description: string;
  command: string;
  recordTarget: E2ERecordTarget;
  timeoutMs: number;
}

export interface ParsedE2EArgs {
  presetName?: string;
  name?: string;
  command?: string;
  recordTarget?: E2ERecordTarget;
  timeoutMs?: number;
  videoDurationMs?: number;
}

export interface E2EReportConfig {
  name: string;
  description: string;
  command: string;
  recordTarget: E2ERecordTarget;
  timeoutMs: number;
  videoDurationMs: number;
}

export interface CommandRunResult {
  command: string;
  cwd: string;
  startedAt: string;
  finishedAt: string;
  durationMs: number;
  exitCode: number | null;
  signal: NodeJS.Signals | null;
  timedOut: boolean;
  stdout: string;
  stderr: string;
}

export interface E2EReportResult {
  status: 'pass' | 'fail';
  name: string;
  command: string;
  recordTarget: E2ERecordTarget;
  artifactDir: string;
  metadataPath: string;
  commandLogPath: string;
  reportMarkdownPath: string;
  reportHtmlPath: string;
  videoPath: string;
  commandResult: CommandRunResult;
}

const DEFAULT_TIMEOUT_MS = 120_000;
const DEFAULT_VIDEO_DURATION_MS = 5_000;
const VIDEO_VIEWPORT = { width: 1280, height: 720 };

export const E2E_PRESETS = {
  cli: {
    name: 'cli-smoke',
    description: 'Run the FPF work evaluator and record the command report.',
    command: 'bun run evaluate:work',
    recordTarget: 'report',
    timeoutMs: 60_000,
  },
  docs: {
    name: 'docs-preview',
    description: 'Build the docs and record the generated static docs landing page.',
    command: 'bun run docs:build',
    recordTarget: 'docs',
    timeoutMs: 120_000,
  },
  'deploy-dry-run': {
    name: 'deploy-dry-run',
    description: 'Stage hosted assets, build the Mastra bundle, and verify key hosted files.',
    command:
      'bun run stage:from-published && bun run mastra:build && test -f .mastra/output/index.mjs && test -f .mastra/output/hosted/FPF-Spec.md && test -f .mastra/output/hosted/fpf-index/snapshot.json',
    recordTarget: 'report',
    timeoutMs: 180_000,
  },
} as const satisfies Record<string, E2EPreset>;

export function parseE2EReportArgs(args: string[]): ParsedE2EArgs {
  const normalized = args[0] === '--' ? args.slice(1) : args;
  const parsed: ParsedE2EArgs = {};
  const positionals: string[] = [];

  for (let index = 0; index < normalized.length; index += 1) {
    const arg = normalized[index]!;
    switch (arg) {
      case '--name':
        parsed.name = readOptionValue(normalized, index, arg);
        index += 1;
        break;
      case '--command':
        parsed.command = readOptionValue(normalized, index, arg);
        index += 1;
        break;
      case '--record-target': {
        const value = readOptionValue(normalized, index, arg);
        if (value !== 'report' && value !== 'docs') {
          throw new Error(`Unsupported --record-target ${value}; expected report or docs.`);
        }
        parsed.recordTarget = value;
        index += 1;
        break;
      }
      case '--timeout-ms':
        parsed.timeoutMs = readPositiveInteger(normalized, index, arg);
        index += 1;
        break;
      case '--video-duration-ms':
        parsed.videoDurationMs = readPositiveInteger(normalized, index, arg);
        index += 1;
        break;
      default:
        if (arg.startsWith('--')) {
          throw new Error(`Unknown e2e:report option: ${arg}`);
        }
        positionals.push(arg);
    }
  }

  if (positionals.length > 1) {
    throw new Error(`Expected at most one preset name, got: ${positionals.join(', ')}`);
  }
  parsed.presetName = positionals[0];
  return parsed;
}

export function resolveE2EReportConfig(parsed: ParsedE2EArgs): E2EReportConfig {
  const presetName = parsed.presetName ?? (parsed.command ? undefined : 'cli');
  const preset = presetName ? E2E_PRESETS[presetName as keyof typeof E2E_PRESETS] : undefined;
  if (presetName && !preset) {
    throw new Error(
      `Unknown e2e:report preset "${presetName}". Expected one of: ${Object.keys(E2E_PRESETS).join(', ')}`,
    );
  }
  if (!preset && !parsed.command) {
    throw new Error('Custom e2e:report runs require --command.');
  }

  return {
    name: slugify(parsed.name ?? preset?.name ?? 'custom-e2e'),
    description: preset?.description ?? 'Run a custom E2E command and record the command report.',
    command: parsed.command ?? preset!.command,
    recordTarget: parsed.recordTarget ?? preset?.recordTarget ?? 'report',
    timeoutMs: parsed.timeoutMs ?? preset?.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    videoDurationMs: parsed.videoDurationMs ?? DEFAULT_VIDEO_DURATION_MS,
  };
}

export function buildE2EArtifactDirName(now: Date, name: string): string {
  const timestamp = now.toISOString().replace(/[:.]/gu, '-');
  return `${timestamp}-${slugify(name)}`;
}

export function renderE2EReportMarkdown(input: {
  config: E2EReportConfig;
  commandResult: CommandRunResult;
  videoPath?: string;
}): string {
  const status = input.commandResult.exitCode === 0 && !input.commandResult.timedOut ? 'PASS' : 'FAIL';
  const videoLine = input.videoPath ? `- Video: \`${input.videoPath}\`` : '- Video: pending';
  return [
    '# E2E Video Report',
    '',
    `- Status: ${status}`,
    `- Name: \`${input.config.name}\``,
    `- Record target: \`${input.config.recordTarget}\``,
    `- Command: \`${input.config.command}\``,
    `- Started: ${input.commandResult.startedAt}`,
    `- Finished: ${input.commandResult.finishedAt}`,
    `- Duration: ${input.commandResult.durationMs}ms`,
    `- Exit code: ${input.commandResult.exitCode ?? 'null'}`,
    `- Timed out: ${input.commandResult.timedOut ? 'yes' : 'no'}`,
    videoLine,
    '',
    '## Description',
    '',
    input.config.description,
    '',
    '## Stdout',
    '',
    '```text',
    trimForReport(input.commandResult.stdout),
    '```',
    '',
    '## Stderr',
    '',
    '```text',
    trimForReport(input.commandResult.stderr),
    '```',
  ].join('\n');
}

export function renderE2EReportHtml(input: {
  config: E2EReportConfig;
  commandResult: CommandRunResult;
  videoPath?: string;
}): string {
  const status = input.commandResult.exitCode === 0 && !input.commandResult.timedOut ? 'PASS' : 'FAIL';
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>E2E Video Report - ${escapeHtml(input.config.name)}</title>
    <style>
      :root {
        color-scheme: light;
        --ink: #172018;
        --muted: #5f6f63;
        --paper: #fffaf0;
        --panel: #f4ead4;
        --accent: #0b6b4f;
        --fail: #9f2f24;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        background: radial-gradient(circle at top left, #e5f4dc, transparent 28rem), var(--paper);
        color: var(--ink);
        font: 16px/1.5 Georgia, "Times New Roman", serif;
      }
      main {
        max-width: 1120px;
        margin: 0 auto;
        padding: 48px;
      }
      h1 {
        margin: 0 0 12px;
        font-size: 48px;
        letter-spacing: -0.04em;
      }
      .status {
        display: inline-block;
        border-radius: 999px;
        padding: 8px 14px;
        background: ${status === 'PASS' ? 'var(--accent)' : 'var(--fail)'};
        color: white;
        font: 700 14px/1.2 ui-monospace, SFMono-Regular, Menlo, monospace;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;
        margin: 24px 0;
      }
      .card {
        border: 1px solid #dacdad;
        border-radius: 18px;
        background: color-mix(in srgb, var(--panel) 82%, white);
        padding: 18px;
        box-shadow: 0 18px 60px rgb(65 49 19 / 0.08);
      }
      .label {
        color: var(--muted);
        font: 700 12px/1.2 ui-monospace, SFMono-Regular, Menlo, monospace;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      code, pre {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      }
      pre {
        overflow: auto;
        max-height: 320px;
        border-radius: 14px;
        background: #172018;
        color: #e7f3e8;
        padding: 18px;
        white-space: pre-wrap;
      }
      .full { grid-column: 1 / -1; }
    </style>
  </head>
  <body>
    <main>
      <span class="status">${status}</span>
      <h1>E2E Video Report</h1>
      <p>${escapeHtml(input.config.description)}</p>
      <section class="grid">
        ${renderFactCard('Name', input.config.name)}
        ${renderFactCard('Record Target', input.config.recordTarget)}
        ${renderFactCard('Started', input.commandResult.startedAt)}
        ${renderFactCard('Finished', input.commandResult.finishedAt)}
        ${renderFactCard('Duration', `${input.commandResult.durationMs}ms`)}
        ${renderFactCard('Exit Code', String(input.commandResult.exitCode ?? 'null'))}
        ${renderFactCard('Video', input.videoPath ?? 'pending')}
        <article class="card full">
          <div class="label">Command</div>
          <p><code>${escapeHtml(input.config.command)}</code></p>
        </article>
        <article class="card full">
          <div class="label">Stdout</div>
          <pre>${escapeHtml(trimForReport(input.commandResult.stdout))}</pre>
        </article>
        <article class="card full">
          <div class="label">Stderr</div>
          <pre>${escapeHtml(trimForReport(input.commandResult.stderr))}</pre>
        </article>
      </section>
    </main>
  </body>
</html>`;
}

export async function runE2EReport(
  config: E2EReportConfig,
  options: { cwd?: string; now?: Date; artifactRoot?: string } = {},
): Promise<E2EReportResult> {
  const cwd = options.cwd ?? process.cwd();
  const now = options.now ?? new Date();
  const artifactDir = resolve(
    cwd,
    options.artifactRoot ?? '.runtime/e2e-recordings',
    buildE2EArtifactDirName(now, config.name),
  );
  await mkdir(artifactDir, { recursive: true });

  const commandResult = await runShellCommand(config.command, {
    cwd,
    timeoutMs: config.timeoutMs,
  });
  const commandLogPath = resolve(artifactDir, 'commands.log');
  await writeFile(commandLogPath, renderCommandLog(commandResult), 'utf8');

  const reportMarkdownPath = resolve(artifactDir, 'report.md');
  const reportHtmlPath = resolve(artifactDir, 'report.html');
  await writeFile(
    reportMarkdownPath,
    renderE2EReportMarkdown({ config, commandResult }),
    'utf8',
  );
  await writeFile(reportHtmlPath, renderE2EReportHtml({ config, commandResult }), 'utf8');

  let videoPath: string;
  try {
    videoPath = await recordReportVideo({
      cwd,
      artifactDir,
      reportHtmlPath,
      recordTarget: config.recordTarget,
      videoDurationMs: config.videoDurationMs,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const metadataPath = resolve(artifactDir, 'metadata.json');
    await writeFile(
      metadataPath,
      `${JSON.stringify(
        {
          status: 'video_failed',
          name: config.name,
          command: config.command,
          recordTarget: config.recordTarget,
          artifactDir,
          commandLogPath,
          reportMarkdownPath,
          reportHtmlPath,
          videoError: message,
          commandResult,
        },
        null,
        2,
      )}\n`,
      'utf8',
    );
    throw new Error(
      `E2E command artifacts were written to ${artifactDir}, but video recording failed: ${message}\nRun \`bunx playwright install chromium\` if Chromium is missing.`,
    );
  }

  await writeFile(
    reportMarkdownPath,
    renderE2EReportMarkdown({ config, commandResult, videoPath }),
    'utf8',
  );
  await writeFile(
    reportHtmlPath,
    renderE2EReportHtml({ config, commandResult, videoPath }),
    'utf8',
  );

  const metadataPath = resolve(artifactDir, 'metadata.json');
  const result: E2EReportResult = {
    status: commandResult.exitCode === 0 && !commandResult.timedOut ? 'pass' : 'fail',
    name: config.name,
    command: config.command,
    recordTarget: config.recordTarget,
    artifactDir,
    metadataPath,
    commandLogPath,
    reportMarkdownPath,
    reportHtmlPath,
    videoPath,
    commandResult,
  };

  await writeFile(metadataPath, `${JSON.stringify(result, null, 2)}\n`, 'utf8');

  if (result.status !== 'pass') {
    throw new Error(
      `E2E command failed with exit code ${commandResult.exitCode}; report: ${reportMarkdownPath}; video: ${videoPath}`,
    );
  }

  return result;
}

async function runShellCommand(
  command: string,
  options: { cwd: string; timeoutMs: number },
): Promise<CommandRunResult> {
  const startedAtDate = new Date();
  const startedAt = startedAtDate.toISOString();
  let stdout = '';
  let stderr = '';
  let timedOut = false;

  const child = spawn(command, {
    cwd: options.cwd,
    env: process.env,
    shell: process.env.SHELL ?? '/bin/sh',
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  child.stdout.setEncoding('utf8');
  child.stderr.setEncoding('utf8');
  child.stdout.on('data', (chunk: string) => {
    stdout += chunk;
    process.stdout.write(chunk);
  });
  child.stderr.on('data', (chunk: string) => {
    stderr += chunk;
    process.stderr.write(chunk);
  });

  const timeout = setTimeout(() => {
    timedOut = true;
    child.kill('SIGTERM');
  }, options.timeoutMs);

  const { code, signal } = await new Promise<{
    code: number | null;
    signal: NodeJS.Signals | null;
  }>((resolvePromise, reject) => {
    child.on('error', reject);
    child.on('close', (code, signal) => {
      resolvePromise({ code, signal });
    });
  });
  clearTimeout(timeout);

  const finishedAtDate = new Date();
  return {
    command,
    cwd: options.cwd,
    startedAt,
    finishedAt: finishedAtDate.toISOString(),
    durationMs: finishedAtDate.getTime() - startedAtDate.getTime(),
    exitCode: timedOut ? null : code,
    signal,
    timedOut,
    stdout,
    stderr,
  };
}

async function recordReportVideo(input: {
  cwd: string;
  artifactDir: string;
  reportHtmlPath: string;
  recordTarget: E2ERecordTarget;
  videoDurationMs: number;
}): Promise<string> {
  const browser = await chromium.launch({ headless: true });
  let staticServer: StaticServer | undefined;
  try {
    const context = await browser.newContext({
      viewport: VIDEO_VIEWPORT,
      recordVideo: {
        dir: input.artifactDir,
        size: VIDEO_VIEWPORT,
      },
    });
    const page = await context.newPage();
    const video = page.video();

    if (input.recordTarget === 'docs') {
      staticServer = await startStaticServer(resolve(input.cwd, 'doc_build'));
      await page.goto(staticServer.url, { waitUntil: 'networkidle', timeout: 30_000 });
      await page.waitForTimeout(700);
      await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight / 2 }));
      await page.waitForTimeout(700);
      await page.evaluate(() => window.scrollTo({ top: 0 }));
    } else {
      await page.goto(pathToFileURL(input.reportHtmlPath).href, {
        waitUntil: 'domcontentloaded',
        timeout: 30_000,
      });
      await page.waitForTimeout(700);
      await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight }));
      await page.waitForTimeout(700);
      await page.evaluate(() => window.scrollTo({ top: 0 }));
    }

    await page.waitForTimeout(Math.max(1_000, input.videoDurationMs - 2_100));
    await context.close();
    const rawVideoPath = await video?.path();
    if (!rawVideoPath) {
      throw new Error('Playwright did not produce a video path.');
    }
    const finalVideoPath = resolve(input.artifactDir, 'e2e-report.webm');
    await rename(rawVideoPath, finalVideoPath);
    return finalVideoPath;
  } finally {
    await staticServer?.close();
    await browser.close();
  }
}

interface StaticServer {
  url: string;
  close: () => Promise<void>;
}

async function startStaticServer(rootDir: string): Promise<StaticServer> {
  if (!existsSync(resolve(rootDir, 'index.html'))) {
    throw new Error(`docs recording target missing at ${rootDir}; run the docs E2E command first.`);
  }

  const server = createServer(async (request, response) => {
    try {
      const requestUrl = new URL(request.url ?? '/', 'http://127.0.0.1');
      const filePath = resolveStaticPath(rootDir, requestUrl.pathname);
      response.setHeader('Content-Type', contentTypeFor(filePath));
      response.end(await readFile(filePath));
    } catch (error) {
      response.statusCode = 404;
      response.end(error instanceof Error ? error.message : 'Not found');
    }
  });

  await new Promise<void>((resolvePromise) => {
    server.listen(0, '127.0.0.1', () => resolvePromise());
  });
  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('Unable to determine docs preview server address.');
  }

  return {
    url: `http://127.0.0.1:${address.port}/`,
    close: () => closeServer(server),
  };
}

function resolveStaticPath(rootDir: string, pathname: string): string {
  const decoded = decodeURIComponent(pathname);
  const safePath = decoded === '/' ? '/index.html' : decoded;
  let candidate = resolve(rootDir, `.${safePath}`);
  const normalizedRoot = rootDir.endsWith(sep) ? rootDir : `${rootDir}${sep}`;
  if (candidate !== rootDir && !candidate.startsWith(normalizedRoot)) {
    throw new Error('Refusing to serve path outside doc_build.');
  }
  if (existsSync(candidate) && statSync(candidate).isDirectory()) {
    candidate = resolve(candidate, 'index.html');
  }
  if (!existsSync(candidate) && !extname(candidate)) {
    candidate = `${candidate}.html`;
  }
  if (!existsSync(candidate)) {
    throw new Error(`Static file not found: ${relative(rootDir, candidate)}`);
  }
  return candidate;
}

function closeServer(server: Server): Promise<void> {
  return new Promise((resolvePromise, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
      } else {
        resolvePromise();
      }
    });
  });
}

function contentTypeFor(path: string): string {
  switch (extname(path)) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.css':
      return 'text/css; charset=utf-8';
    case '.js':
      return 'text/javascript; charset=utf-8';
    case '.json':
      return 'application/json; charset=utf-8';
    case '.svg':
      return 'image/svg+xml';
    case '.png':
      return 'image/png';
    default:
      return 'application/octet-stream';
  }
}

function renderCommandLog(result: CommandRunResult): string {
  return [
    `command: ${result.command}`,
    `cwd: ${result.cwd}`,
    `startedAt: ${result.startedAt}`,
    `finishedAt: ${result.finishedAt}`,
    `durationMs: ${result.durationMs}`,
    `exitCode: ${result.exitCode ?? 'null'}`,
    `signal: ${result.signal ?? 'null'}`,
    `timedOut: ${result.timedOut ? 'true' : 'false'}`,
    '',
    '--- stdout ---',
    result.stdout,
    '',
    '--- stderr ---',
    result.stderr,
  ].join('\n');
}

function readOptionValue(args: string[], index: number, optionName: string): string {
  const value = args[index + 1];
  if (!value || value.startsWith('--')) {
    throw new Error(`${optionName} requires a value.`);
  }
  return value;
}

function readPositiveInteger(args: string[], index: number, optionName: string): number {
  const value = Number(readOptionValue(args, index, optionName));
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${optionName} must be a positive integer.`);
  }
  return value;
}

function renderFactCard(label: string, value: string): string {
  return `<article class="card"><div class="label">${escapeHtml(label)}</div><p>${escapeHtml(value)}</p></article>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/gu, '&amp;')
    .replace(/</gu, '&lt;')
    .replace(/>/gu, '&gt;')
    .replace(/"/gu, '&quot;')
    .replace(/'/gu, '&#39;');
}

function trimForReport(value: string): string {
  const maxLength = 20_000;
  if (value.length <= maxLength) {
    return value.trimEnd();
  }
  return `${value.slice(0, maxLength)}\n\n[truncated ${value.length - maxLength} characters]`;
}

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, '-')
    .replace(/^-|-$/gu, '') || 'e2e-report';
}

async function main(): Promise<void> {
  const config = resolveE2EReportConfig(parseE2EReportArgs(process.argv.slice(2)));
  const result = await runE2EReport(config);
  process.stdout.write(
    `${JSON.stringify(
      {
        status: result.status,
        artifactDir: result.artifactDir,
        report: result.reportMarkdownPath,
        video: result.videoPath,
      },
      null,
      2,
    )}\n`,
  );
}

if (import.meta.main) {
  main().catch((error) => {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exit(1);
  });
}
