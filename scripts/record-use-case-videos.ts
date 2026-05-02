import { spawn } from 'node:child_process';
import { mkdir, rename, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { chromium, type Browser, type Page } from 'playwright';

import { DOCS_BASE_PATH, startStaticServer } from './e2e-report.js';

interface UseCaseVideo {
  slug: string;
  title: string;
  description: string;
  path: string;
  heading: string;
}

interface ParsedArgs {
  skipBuild: boolean;
  artifactRoot: string;
  durationMs: number;
}

interface RecordedUseCase {
  slug: string;
  title: string;
  description: string;
  url: string;
  videoPath: string;
}

const VIEWPORT = { width: 1440, height: 900 };
const DEFAULT_DURATION_MS = 8_000;
const DEFAULT_ARTIFACT_ROOT = '.runtime/use-case-videos';

const USE_CASES: UseCaseVideo[] = [
  {
    slug: 'start-here-doorways',
    title: 'Start with a doorway',
    description: 'Choose a route before asking people or agents to read the full FPF.',
    path: '/start-here',
    heading: 'Pick a doorway',
  },
  {
    slug: 'project-review-packet',
    title: 'Project review packet',
    description: 'Turn a messy project into context, roles, next owner, and acceptance evidence.',
    path: '/work-packets#project-review-packet',
    heading: 'Project review packet',
  },
  {
    slug: 'pr-code-review-packet',
    title: 'PR and code review packet',
    description: 'Review for behavioral risk, missing evidence, and semantic drift.',
    path: '/work-packets#pr-or-code-review-packet',
    heading: 'PR or code review packet',
  },
  {
    slug: 'spec-writing-packet',
    title: 'Specification writing packet',
    description: 'Write specs with scope, norms, checks, and an explicit change record.',
    path: '/work-packets#specification-writing-packet',
    heading: 'Specification writing packet',
  },
  {
    slug: 'role-promise-capability',
    title: 'Role, promise, capability analysis',
    description: 'Separate ability, promise, responsibility, performance, and evidence.',
    path: '/work-packets#role-promise-and-capability-analysis-packet',
    heading: 'Role, promise, and capability analysis packet',
  },
  {
    slug: 'agent-workflow-packet',
    title: 'Agent workflow packet',
    description: 'Let an agent retrieve only the grounded FPF slice needed for the work.',
    path: '/work-packets#agent-workflow-use-packet',
    heading: 'Agent workflow use packet',
  },
  {
    slug: 'mcp-bounded-context',
    title: 'MCP instead of pasted context',
    description: 'Use the MCP server as the context boundary instead of pasting the whole FPF.',
    path: '/mcp-recipes#keep-context-bounded',
    heading: 'Keep context bounded',
  },
];

export function parseRecordUseCaseVideoArgs(args: string[]): ParsedArgs {
  const parsed: ParsedArgs = {
    skipBuild: false,
    artifactRoot: DEFAULT_ARTIFACT_ROOT,
    durationMs: DEFAULT_DURATION_MS,
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index]!;
    switch (arg) {
      case '--skip-build':
        parsed.skipBuild = true;
        break;
      case '--artifact-root':
        parsed.artifactRoot = readOptionValue(args, index, arg);
        index += 1;
        break;
      case '--duration-ms':
        parsed.durationMs = readPositiveInteger(args, index, arg);
        index += 1;
        break;
      default:
        throw new Error(`Unknown record-use-case-videos option: ${arg}`);
    }
  }

  return parsed;
}

export function buildUseCaseVideoArtifactDirName(now: Date): string {
  return `${now.toISOString().replace(/[:.]/gu, '-')}-fpf-use-cases`;
}

export async function recordUseCaseVideos(
  args: ParsedArgs,
  options: { cwd?: string; now?: Date } = {},
): Promise<{
  artifactDir: string;
  manifestPath: string;
  readmePath: string;
  videos: RecordedUseCase[];
}> {
  const cwd = options.cwd ?? process.cwd();
  if (!args.skipBuild) {
    await runCommand('bun', ['run', 'docs:build'], cwd);
  }

  const artifactDir = resolve(
    cwd,
    args.artifactRoot,
    buildUseCaseVideoArtifactDirName(options.now ?? new Date()),
  );
  await mkdir(artifactDir, { recursive: true });

  const staticServer = await startStaticServer(resolve(cwd, 'doc_build'), {
    basePath: DOCS_BASE_PATH,
  });
  const browser = await chromium.launch({ headless: true });
  try {
    const videos: RecordedUseCase[] = [];
    for (const useCase of USE_CASES) {
      videos.push(
        await recordOneUseCase({
          browser,
          artifactDir,
          baseUrl: staticServer.url,
          useCase,
          durationMs: args.durationMs,
        }),
      );
    }

    const manifestPath = resolve(artifactDir, 'manifest.json');
    const readmePath = resolve(artifactDir, 'README.md');
    await writeFile(
      manifestPath,
      `${JSON.stringify(
        {
          generatedAt: new Date().toISOString(),
          basePath: DOCS_BASE_PATH,
          viewport: VIEWPORT,
          videos,
        },
        null,
        2,
      )}\n`,
    );
    await writeFile(readmePath, renderReadme(videos));

    return {
      artifactDir,
      manifestPath,
      readmePath,
      videos,
    };
  } finally {
    await browser.close();
    await staticServer.close();
  }
}

async function recordOneUseCase(input: {
  browser: Browser;
  artifactDir: string;
  baseUrl: string;
  useCase: UseCaseVideo;
  durationMs: number;
}): Promise<RecordedUseCase> {
  const context = await input.browser.newContext({
    viewport: VIEWPORT,
    colorScheme: 'light',
    recordVideo: {
      dir: input.artifactDir,
      size: VIEWPORT,
    },
  });
  const page = await context.newPage();
  const video = page.video();
  const url = new URL(`${DOCS_BASE_PATH}${input.useCase.path}`, input.baseUrl).href;

  await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 });
  await assertCssAssetsLoaded(page);
  await installPromoOverlay(page, input.useCase);
  await focusHeading(page, input.useCase.heading);
  await page.waitForTimeout(700);
  await page.evaluate(() => window.scrollBy({ top: 260, behavior: 'smooth' }));
  await page.waitForTimeout(Math.max(1_000, Math.floor(input.durationMs / 3)));
  await page.evaluate(() => window.scrollBy({ top: 340, behavior: 'smooth' }));
  await page.waitForTimeout(Math.max(1_000, Math.floor(input.durationMs / 3)));
  await focusHeading(page, input.useCase.heading);
  await page.waitForTimeout(Math.max(1_000, input.durationMs - Math.floor((input.durationMs * 2) / 3)));

  await context.close();
  const rawVideoPath = await video?.path();
  if (!rawVideoPath) {
    throw new Error(`Playwright did not produce a video for ${input.useCase.slug}.`);
  }
  const videoPath = resolve(input.artifactDir, `${input.useCase.slug}.webm`);
  await rename(rawVideoPath, videoPath);

  return {
    slug: input.useCase.slug,
    title: input.useCase.title,
    description: input.useCase.description,
    url,
    videoPath,
  };
}

async function assertCssAssetsLoaded(page: Page): Promise<void> {
  const checks = await page.evaluate(async () => {
    const links = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'));
    return Promise.all(
      links.map(async (link) => {
        const response = await fetch(link.href);
        return {
          href: link.href,
          ok: response.ok,
          byteLength: (await response.text()).length,
        };
      }),
    );
  });

  const failed = checks.filter((check) => !check.ok || check.byteLength < 1_000);
  if (checks.length === 0 || failed.length > 0) {
    throw new Error(`CSS assets did not load for video recording: ${JSON.stringify(failed)}`);
  }
}

async function installPromoOverlay(page: Page, useCase: UseCaseVideo): Promise<void> {
  await page.addStyleTag({
    content: `
      .fpf-video-overlay {
        position: fixed;
        right: 24px;
        bottom: 24px;
        z-index: 9999;
        width: 420px;
        max-width: calc(100vw - 48px);
        padding: 18px 20px;
        border: 1px solid rgba(20, 75, 61, 0.22);
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.94);
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.16);
        color: #18241d;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      .fpf-video-overlay__eyebrow {
        margin: 0 0 6px;
        color: #0b6b4f;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0;
        text-transform: uppercase;
      }
      .fpf-video-overlay__title {
        margin: 0;
        font-size: 22px;
        line-height: 1.18;
        font-weight: 750;
      }
      .fpf-video-overlay__description {
        margin: 8px 0 0;
        color: #4d5f53;
        font-size: 14px;
        line-height: 1.45;
      }
      .fpf-video-heading-highlight {
        outline: 3px solid rgba(11, 107, 79, 0.48);
        outline-offset: 8px;
        border-radius: 6px;
      }
    `,
  });
  await page.evaluate((overlay) => {
    document.querySelector('.fpf-video-overlay')?.remove();
    const node = document.createElement('aside');
    node.className = 'fpf-video-overlay';
    node.innerHTML = `
      <p class="fpf-video-overlay__eyebrow">FPF use case</p>
      <h2 class="fpf-video-overlay__title"></h2>
      <p class="fpf-video-overlay__description"></p>
    `;
    node.querySelector('.fpf-video-overlay__title')!.textContent = overlay.title;
    node.querySelector('.fpf-video-overlay__description')!.textContent = overlay.description;
    document.body.append(node);
  }, useCase);
}

async function focusHeading(page: Page, heading: string): Promise<void> {
  const found = await page.evaluate((headingText) => {
    document
      .querySelectorAll('.fpf-video-heading-highlight')
      .forEach((node) => node.classList.remove('fpf-video-heading-highlight'));
    const candidate = Array.from(document.querySelectorAll('h1,h2,h3')).find((node) =>
      node.textContent?.includes(headingText),
    );
    if (!candidate) {
      return false;
    }
    candidate.classList.add('fpf-video-heading-highlight');
    candidate.scrollIntoView({ block: 'center', behavior: 'smooth' });
    return true;
  }, heading);

  if (!found) {
    throw new Error(`Unable to find heading for video recording: ${heading}`);
  }
}

function renderReadme(videos: RecordedUseCase[]): string {
  return [
    '# FPF Use Case Videos',
    '',
    'CSS-rendered Playwright recordings for adoption and work-use demos.',
    '',
    '| Use case | Video |',
    '| --- | --- |',
    ...videos.map((video) => `| ${video.title} | \`${video.videoPath}\` |`),
    '',
  ].join('\n');
}

function runCommand(command: string, args: string[], cwd: string): Promise<void> {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(command, args, {
      cwd,
      env: process.env,
      stdio: 'inherit',
    });
    child.once('error', reject);
    child.once('exit', (code, signal) => {
      if (code === 0) {
        resolvePromise();
        return;
      }
      reject(new Error(`${command} ${args.join(' ')} failed with ${signal ?? `exit code ${code}`}.`));
    });
  });
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

async function main(): Promise<void> {
  const result = await recordUseCaseVideos(parseRecordUseCaseVideoArgs(process.argv.slice(2)));
  process.stdout.write(
    `${JSON.stringify(
      {
        artifactDir: result.artifactDir,
        manifest: result.manifestPath,
        readme: result.readmePath,
        videos: result.videos.map((video) => video.videoPath),
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
