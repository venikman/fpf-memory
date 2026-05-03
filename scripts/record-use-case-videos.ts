import {
  spawn,
  type ChildProcessWithoutNullStreams,
  type SpawnOptionsWithoutStdio,
} from 'node:child_process';
import { mkdir, rename, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import readline from 'node:readline';

import { chromium, type Browser, type Page } from 'playwright';

import { DOCS_BASE_PATH, startStaticServer } from './e2e-report.js';

export const PRODUCT_SURFACES = [
  'Docs/wiki',
  'MCP runtime',
  'CLI runtime',
  'Work evaluator',
] as const;

export type ProductSurface = (typeof PRODUCT_SURFACES)[number];
type ScenarioKind = 'docs' | 'commands' | 'mcp';
type TranscriptOutputFormat = 'raw' | 'query-json' | 'trace-json' | 'evaluation-json';

interface UseCaseVideoScenarioBase {
  slug: string;
  product: ProductSurface;
  title: string;
  initialState: string;
  problem: string;
  tools: string[];
  outcome: string;
  recordingSteps: string[];
}

interface DocsRecordingStep {
  path: string;
  heading: string;
  stage: string;
  message: string;
}

interface DocsUseCaseVideoScenario extends UseCaseVideoScenarioBase {
  kind: 'docs';
  docsSteps: DocsRecordingStep[];
}

interface DemoCommand {
  label: string;
  displayCommand: string;
  command: string;
  args: string[];
  outputFormat: TranscriptOutputFormat;
}

interface CommandUseCaseVideoScenario extends UseCaseVideoScenarioBase {
  kind: 'commands';
  commands: DemoCommand[];
}

interface McpToolCall {
  label: string;
  name: string;
  arguments: Record<string, unknown>;
  outputFormat: TranscriptOutputFormat;
}

interface McpUseCaseVideoScenario extends UseCaseVideoScenarioBase {
  kind: 'mcp';
  mcpCalls: McpToolCall[];
}

export type UseCaseVideoScenario =
  | DocsUseCaseVideoScenario
  | CommandUseCaseVideoScenario
  | McpUseCaseVideoScenario;

export interface ParsedRecordUseCaseVideoArgs {
  skipBuild: boolean;
  artifactRoot: string;
  durationMs: number;
  scenarioSlugs: string[];
}

export interface RecordedUseCase {
  slug: string;
  product: ProductSurface;
  title: string;
  initialState: string;
  problem: string;
  tools: string[];
  outcome: string;
  recordingSteps: string[];
  kind: ScenarioKind;
  url?: string;
  transcriptPath?: string;
  videoPath: string;
}

interface CommandRunResult {
  label: string;
  displayCommand: string;
  exitCode: number | null;
  signal: NodeJS.Signals | null;
  timedOut: boolean;
  durationMs: number;
  stdout: string;
  stderr: string;
  renderedOutput: string;
}

interface TranscriptBlock {
  label: string;
  command: string;
  status: string;
  output: string;
}

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

const VIEWPORT = { width: 1440, height: 900 };
const DEFAULT_DURATION_MS = 8_000;
const DEFAULT_ARTIFACT_ROOT = '.runtime/use-case-videos';
const COMMAND_TIMEOUT_MS = 120_000;
const MCP_TIMEOUT_MS = 30_000;
const SPEC_SOURCE_PATH = 'published/current/FPF-Spec.md';

export const USE_CASE_SCENARIOS: UseCaseVideoScenario[] = [
  {
    kind: 'docs',
    slug: 'docs-pick-the-right-doorway',
    product: 'Docs/wiki',
    title: 'Pick the right doorway',
    initialState: 'A team has a messy project and no shared starting point.',
    problem: 'Reading the whole FPF first would bury the decision they need to make.',
    tools: ['/start-here', 'route:project-alignment', '/work-packets'],
    outcome: 'The team lands on a shared route and a first project review packet.',
    recordingSteps: [
      'Open Start Here and identify the doorway list.',
      'Open the project-alignment route and show ordered IDs.',
      'Open the project review packet and show the done condition.',
    ],
    docsSteps: [
      {
        path: '/start-here',
        heading: 'Pick a doorway',
        stage: 'Initial state',
        message: 'The docs start by naming the work shape before asking anyone to load the full framework.',
      },
      {
        path: '/generated/routes/route_project-alignment',
        heading: 'Ordered steps',
        stage: 'Tool in action',
        message: 'The route turns a broad alignment problem into a short ordered set of FPF IDs.',
      },
      {
        path: '/work-packets#project-review-packet',
        heading: 'Project review packet',
        stage: 'Useful outcome',
        message: 'The packet gives the team a concrete context, owner, evidence, and done check.',
      },
    ],
  },
  {
    kind: 'docs',
    slug: 'docs-audit-exact-source',
    product: 'Docs/wiki',
    title: 'Audit exact source',
    initialState: 'A person or agent cited an FPF ID in a review.',
    problem: 'The reviewer needs canonical source text instead of trusting a paraphrase.',
    tools: ['/generated/routes/route_project-alignment', '/generated/patterns/A.1.1'],
    outcome: 'The reviewer verifies the route, canonical page, exact ID, and relation context.',
    recordingSteps: [
      'Open the generated route page that names the cited ID.',
      'Open the canonical generated pattern page.',
      'Show the relation/source area that makes the citation auditable.',
    ],
    docsSteps: [
      {
        path: '/generated/routes/route_project-alignment',
        heading: 'Ordered steps',
        stage: 'Initial state',
        message: 'A generated route preserves the exact IDs that were used in the work.',
      },
      {
        path: '/generated/patterns/A.1.1',
        heading: 'U.BoundedContext: The Semantic Frame',
        stage: 'Tool in action',
        message: 'The generated pattern page is the canonical source for the cited FPF ID.',
      },
      {
        path: '/generated/patterns/A.1.1',
        heading: 'Relations',
        stage: 'Useful outcome',
        message: 'The reviewer can inspect relation context before accepting or challenging the citation.',
      },
    ],
  },
  {
    kind: 'docs',
    slug: 'docs-product-role-feedback',
    product: 'Docs/wiki',
    title: 'Dogfood product-role feedback',
    initialState: 'A product maintainer wants real adoption feedback, not a generic opinion.',
    problem: 'Feedback must come from one role doing one job with bounded FPF context and visible evidence.',
    tools: ['/start-here', '/work-packets#product-role-feedback-packet', '/mcp-recipes#dogfood-a-product-role'],
    outcome: 'The maintainer gets a replayable job, friction evidence, a proposed improvement, and a validation path.',
    recordingSteps: [
      'Open Start Here and select the product-role feedback doorway.',
      'Open the product-role feedback packet and show the evidence fields.',
      'Open the MCP recipe that turns the run into discussion-ready feedback.',
    ],
    docsSteps: [
      {
        path: '/start-here',
        heading: 'Dogfood a product as a user role',
        stage: 'Initial state',
        message: 'The doorway frames feedback as one role doing one concrete product job.',
      },
      {
        path: '/work-packets#product-role-feedback-packet',
        heading: 'Product-role feedback packet',
        stage: 'Tool in action',
        message: 'The packet separates persona, surface, job, friction, evidence, and proposed improvement.',
      },
      {
        path: '/mcp-recipes#dogfood-a-product-role',
        heading: 'Dogfood a product role',
        stage: 'Useful outcome',
        message: 'The recipe produces discussion-ready feedback without loading the full FPF.',
      },
    ],
  },
  {
    kind: 'docs',
    slug: 'docs-pr-review-without-full-spec',
    product: 'Docs/wiki',
    title: 'Review a PR without full-spec paste',
    initialState: 'A reviewer has a PR or design change and needs FPF discipline.',
    problem: 'A generic review can miss claims, boundaries, and evidence, while a full-spec paste wastes context.',
    tools: ['/start-here', '/work-packets#pr-or-code-review-packet', '/mcp-recipes#review-a-pr-without-full-spec-paste'],
    outcome: 'The reviewer gets findings tied to behavior, FPF IDs, evidence, tests, residual risk, and verdict.',
    recordingSteps: [
      'Open Start Here and select the PR or design review doorway.',
      'Open the PR or code review packet and show the claim, boundary, evidence, risk, and verdict fields.',
      'Open the MCP recipe that keeps review context bounded to the needed route and evidence.',
    ],
    docsSteps: [
      {
        path: '/start-here',
        heading: 'Review a PR or design change',
        stage: 'Initial state',
        message: 'The doorway starts from the work shape: one PR or design change that needs review.',
      },
      {
        path: '/work-packets#pr-or-code-review-packet',
        heading: 'PR or code review packet',
        stage: 'Tool in action',
        message: 'The packet separates claim, boundary, evidence, risk, and verdict before reading more FPF.',
      },
      {
        path: '/mcp-recipes#review-a-pr-without-full-spec-paste',
        heading: 'Review a PR without full-spec paste',
        stage: 'Useful outcome',
        message: 'The recipe keeps the review grounded in compact FPF IDs, local evidence, tests, and residual risk.',
      },
    ],
  },
  {
    kind: 'mcp',
    slug: 'mcp-bounded-agent-context',
    product: 'MCP runtime',
    title: 'Bounded agent context',
    initialState: 'An agent needs FPF guidance for project alignment.',
    problem: 'Pasting the whole specification would waste context and hide the decisive IDs.',
    tools: ['get_fpf_index_status', 'query_fpf_spec', 'read_fpf_doc'],
    outcome: 'The agent gets compact IDs, constraints, citations, and one exact source page.',
    recordingSteps: [
      'Initialize the local full-surface MCP server.',
      'Check runtime freshness.',
      'Query for the bounded project-alignment packet.',
      'Read the exact route page for the selected doorway.',
    ],
    mcpCalls: [
      {
        label: 'Check runtime freshness',
        name: 'get_fpf_index_status',
        arguments: {},
        outputFormat: 'raw',
      },
      {
        label: 'Query for bounded context',
        name: 'query_fpf_spec',
        arguments: {
          question: 'Give me the smallest work packet for project alignment.',
          mode: 'compact',
        },
        outputFormat: 'query-json',
      },
      {
        label: 'Read exact route source',
        name: 'read_fpf_doc',
        arguments: {
          selector: 'route:project-alignment',
        },
        outputFormat: 'raw',
      },
    ],
  },
  {
    kind: 'mcp',
    slug: 'mcp-retrieval-provenance',
    product: 'MCP runtime',
    title: 'Retrieval provenance',
    initialState: 'A reviewer wants to trust the selected FPF context.',
    problem: 'A final answer is not enough; the reviewer needs retrieval evidence.',
    tools: ['query_fpf_spec', 'trace_fpf_path'],
    outcome: 'The selected nodes, anchors, and trace summary are visible.',
    recordingSteps: [
      'Ask a grounded relationship question.',
      'Run trace_fpf_path through the local full-surface MCP server.',
      'Show selected node and anchor evidence.',
    ],
    mcpCalls: [
      {
        label: 'Ask the relationship question',
        name: 'query_fpf_spec',
        arguments: {
          question: 'How does U.BoundedContext relate to U.RoleAssignment?',
          mode: 'compact',
          sessionId: 'video-provenance',
        },
        outputFormat: 'query-json',
      },
      {
        label: 'Trace retrieval path',
        name: 'trace_fpf_path',
        arguments: {
          question: 'How does U.BoundedContext relate to U.RoleAssignment?',
          mode: 'compact',
          sessionId: 'video-provenance',
        },
        outputFormat: 'trace-json',
      },
    ],
  },
  {
    kind: 'commands',
    slug: 'cli-ask-from-terminal',
    product: 'CLI runtime',
    title: 'Ask from terminal',
    initialState: 'A developer is already in the repository terminal.',
    problem: 'They need a quick grounded FPF answer without opening docs or an MCP client.',
    tools: ['bun run cli -- query ...'],
    outcome: 'The CLI returns JSON with answer text, IDs, constraints, and citations.',
    recordingSteps: [
      'Run the CLI query command against the pinned published spec.',
      'Show the compact JSON answer.',
      'Highlight IDs and constraints as the usable output.',
    ],
    commands: [
      {
        label: 'Query U.BoundedContext',
        displayCommand:
          'bun run cli -- query --question "What is U.BoundedContext?" --mode compact',
        command: 'bun',
        args: [
          'run',
          'cli',
          '--',
          'query',
          '--question',
          'What is U.BoundedContext?',
          '--mode',
          'compact',
        ],
        outputFormat: 'query-json',
      },
    ],
  },
  {
    kind: 'commands',
    slug: 'cli-follow-up-session',
    product: 'CLI runtime',
    title: 'Follow-up session',
    initialState: 'A developer asks one question, then asks a related follow-up.',
    problem: 'The second retrieval should stay connected to the same work thread.',
    tools: ['CLI --session', 'query', 'trace'],
    outcome: 'The CLI shows session-aware query output and trace evidence.',
    recordingSteps: [
      'Run a query with a session ID.',
      'Run trace with the same session ID.',
      'Show selected nodes and trace fields for the follow-up.',
    ],
    commands: [
      {
        label: 'Query with session',
        displayCommand:
          'bun run cli -- query --question "What is U.BoundedContext?" --mode compact --session video-session',
        command: 'bun',
        args: [
          'run',
          'cli',
          '--',
          'query',
          '--question',
          'What is U.BoundedContext?',
          '--mode',
          'compact',
          '--session',
          'video-session',
        ],
        outputFormat: 'query-json',
      },
      {
        label: 'Trace session follow-up',
        displayCommand:
          'bun run cli -- trace --question "How does it relate to U.RoleAssignment?" --mode compact --session video-session',
        command: 'bun',
        args: [
          'run',
          'cli',
          '--',
          'trace',
          '--question',
          'How does it relate to U.RoleAssignment?',
          '--mode',
          'compact',
          '--session',
          'video-session',
        ],
        outputFormat: 'trace-json',
      },
    ],
  },
  {
    kind: 'commands',
    slug: 'evaluator-review-working-tree',
    product: 'Work evaluator',
    title: 'Review working tree',
    initialState: 'A branch has local changes and needs an FPF-grounded review.',
    problem: 'A generic diff summary does not say whether the work respects the repo rubric.',
    tools: ['bun run cli -- evaluate-work --target working-tree --format markdown'],
    outcome: 'The evaluator returns a scorecard, findings, evidence, and recommendations.',
    recordingSteps: [
      'Run evaluate-work against the working tree.',
      'Show the markdown scorecard.',
      'Show evidence and recommendations as the useful review output.',
    ],
    commands: [
      {
        label: 'Evaluate working tree',
        displayCommand:
          'bun run cli -- evaluate-work --target working-tree --format markdown',
        command: 'bun',
        args: [
          'run',
          'cli',
          '--',
          'evaluate-work',
          '--target',
          'working-tree',
          '--format',
          'markdown',
        ],
        outputFormat: 'raw',
      },
    ],
  },
  {
    kind: 'commands',
    slug: 'evaluator-ci-readable-gate',
    product: 'Work evaluator',
    title: 'CI-readable gate',
    initialState: 'Automation needs review evidence it can parse.',
    problem: 'Markdown is useful for people but awkward for CI gates and dashboards.',
    tools: ['evaluate-work --format json'],
    outcome: 'The evaluator emits machine-readable status, findings, recommendations, and evidence.',
    recordingSteps: [
      'Run evaluate-work in JSON mode.',
      'Show overallStatus, findings, recommendations, and evidence count.',
      'Use the structured output as the automation handoff.',
    ],
    commands: [
      {
        label: 'Evaluate JSON for automation',
        displayCommand:
          'bun run cli -- evaluate-work --target working-tree --format json',
        command: 'bun',
        args: [
          'run',
          'cli',
          '--',
          'evaluate-work',
          '--target',
          'working-tree',
          '--format',
          'json',
        ],
        outputFormat: 'evaluation-json',
      },
    ],
  },
];

export function parseRecordUseCaseVideoArgs(args: string[]): ParsedRecordUseCaseVideoArgs {
  const parsed: ParsedRecordUseCaseVideoArgs = {
    skipBuild: false,
    artifactRoot: DEFAULT_ARTIFACT_ROOT,
    durationMs: DEFAULT_DURATION_MS,
    scenarioSlugs: [],
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index]!;
    switch (arg) {
      case '--':
        break;
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
      case '--scenario':
        parsed.scenarioSlugs.push(readOptionValue(args, index, arg));
        index += 1;
        break;
      default:
        throw new Error(`Unknown record-use-case-videos option: ${arg}`);
    }
  }

  return parsed;
}

export function selectUseCaseScenarios(scenarioSlugs: string[]): UseCaseVideoScenario[] {
  if (scenarioSlugs.length === 0) {
    return USE_CASE_SCENARIOS;
  }

  const selected = scenarioSlugs.map((slug) => {
    const scenario = USE_CASE_SCENARIOS.find((candidate) => candidate.slug === slug);
    if (!scenario) {
      throw new Error(
        `Unknown use-case video scenario "${slug}". Expected one of: ${USE_CASE_SCENARIOS.map((candidate) => candidate.slug).join(', ')}`,
      );
    }
    return scenario;
  });

  return selected;
}

export function buildUseCaseVideoArtifactDirName(now: Date): string {
  return `${now.toISOString().replace(/[:.]/gu, '-')}-fpf-product-use-cases`;
}

export function groupUseCaseScenariosByProduct(
  scenarios: UseCaseVideoScenario[],
): Record<ProductSurface, UseCaseVideoScenario[]> {
  return PRODUCT_SURFACES.reduce(
    (groups, product) => ({
      ...groups,
      [product]: scenarios.filter((scenario) => scenario.product === product),
    }),
    {} as Record<ProductSurface, UseCaseVideoScenario[]>,
  );
}

export function renderUseCaseVideoReadme(videos: RecordedUseCase[]): string {
  const lines = [
    '# FPF Product Use-Case Videos',
    '',
    'Playwright recordings for product-level FPF demos. Each video shows initial state, problem, tool use, product behavior, and useful outcome.',
    '',
  ];

  for (const product of PRODUCT_SURFACES) {
    const productVideos = videos.filter((video) => video.product === product);
    lines.push(`## ${product}`, '');
    if (productVideos.length === 0) {
      lines.push('_No videos recorded._', '');
      continue;
    }

    lines.push('| Use case | Video | Transcript | Outcome |', '| --- | --- | --- | --- |');
    for (const video of productVideos) {
      lines.push(
        `| ${escapeMarkdownTable(video.title)} | \`${video.videoPath}\` | ${video.transcriptPath ? `\`${video.transcriptPath}\`` : 'docs recording'} | ${escapeMarkdownTable(video.outcome)} |`,
      );
    }
    lines.push('');
  }

  return `${lines.join('\n')}\n`;
}

export async function recordUseCaseVideos(
  args: ParsedRecordUseCaseVideoArgs,
  options: { cwd?: string; now?: Date } = {},
): Promise<{
  artifactDir: string;
  manifestPath: string;
  readmePath: string;
  videos: RecordedUseCase[];
}> {
  const cwd = options.cwd ?? process.cwd();
  if (!args.skipBuild) {
    await runInheritedCommand('bun', ['run', 'docs:build'], cwd);
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
    const scenarios = selectUseCaseScenarios(args.scenarioSlugs);
    for (const scenario of scenarios) {
      if (scenario.kind === 'docs') {
        videos.push(
          await recordDocsUseCase({
            browser,
            artifactDir,
            baseUrl: staticServer.url,
            scenario,
            durationMs: args.durationMs,
          }),
        );
      } else if (scenario.kind === 'mcp') {
        const transcript = await buildMcpTranscript({
          cwd,
          artifactDir,
          scenario,
        });
        videos.push(
          await recordTranscriptUseCase({
            browser,
            artifactDir,
            scenario,
            transcript,
            durationMs: args.durationMs,
          }),
        );
      } else {
        const transcript = await buildCommandTranscript({
          cwd,
          artifactDir,
          scenario,
        });
        videos.push(
          await recordTranscriptUseCase({
            browser,
            artifactDir,
            scenario,
            transcript,
            durationMs: args.durationMs,
          }),
        );
      }
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
          products: PRODUCT_SURFACES,
          videos,
        },
        null,
        2,
      )}\n`,
      'utf8',
    );
    await writeFile(readmePath, renderUseCaseVideoReadme(videos), 'utf8');

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

async function recordDocsUseCase(input: {
  browser: Browser;
  artifactDir: string;
  baseUrl: string;
  scenario: DocsUseCaseVideoScenario;
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
  const urls: string[] = [];
  const perStepMs = Math.max(1_000, Math.floor(input.durationMs / input.scenario.docsSteps.length));

  for (const step of input.scenario.docsSteps) {
    const url = new URL(`${DOCS_BASE_PATH}${step.path}`, input.baseUrl).href;
    urls.push(url);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 });
    await assertCssAssetsLoaded(page);
    await installDocsOverlay(page, input.scenario, step);
    await focusHeading(page, step.heading);
    await page.waitForTimeout(Math.max(700, Math.floor(perStepMs * 0.45)));
    await page.evaluate(() => window.scrollBy({ top: 260, behavior: 'smooth' }));
    await page.waitForTimeout(Math.max(700, Math.floor(perStepMs * 0.35)));
  }

  await context.close();
  const rawVideoPath = await video?.path();
  if (!rawVideoPath) {
    throw new Error(`Playwright did not produce a video for ${input.scenario.slug}.`);
  }
  const videoPath = resolve(input.artifactDir, `${input.scenario.slug}.webm`);
  await rename(rawVideoPath, videoPath);

  return toRecordedUseCase(input.scenario, {
    url: urls[0],
    videoPath,
  });
}

async function recordTranscriptUseCase(input: {
  browser: Browser;
  artifactDir: string;
  scenario: Exclude<UseCaseVideoScenario, DocsUseCaseVideoScenario>;
  transcript: { path: string; blocks: TranscriptBlock[] };
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
  const stageIds = ['initial', 'problem', 'tools', 'action', 'outcome'];
  const perStageMs = Math.max(900, Math.floor(input.durationMs / stageIds.length));

  await page.goto(pathToFileURL(input.transcript.path).href, {
    waitUntil: 'domcontentloaded',
    timeout: 30_000,
  });
  await page.waitForSelector('[data-stage="initial"]', { timeout: 10_000 });

  for (const stageId of stageIds) {
    await activateTranscriptStage(page, stageId);
    await page.waitForTimeout(perStageMs);
  }

  await context.close();
  const rawVideoPath = await video?.path();
  if (!rawVideoPath) {
    throw new Error(`Playwright did not produce a video for ${input.scenario.slug}.`);
  }
  const videoPath = resolve(input.artifactDir, `${input.scenario.slug}.webm`);
  await rename(rawVideoPath, videoPath);

  return toRecordedUseCase(input.scenario, {
    url: pathToFileURL(input.transcript.path).href,
    transcriptPath: input.transcript.path,
    videoPath,
  });
}

async function buildCommandTranscript(input: {
  cwd: string;
  artifactDir: string;
  scenario: CommandUseCaseVideoScenario;
}): Promise<{ path: string; blocks: TranscriptBlock[] }> {
  const blocks: TranscriptBlock[] = [];
  const env = await buildDemoEnv(input.cwd, input.artifactDir, input.scenario.slug);
  for (const command of input.scenario.commands) {
    const result = await runCapturedCommand(command, {
      cwd: input.cwd,
      env,
      timeoutMs: COMMAND_TIMEOUT_MS,
    });
    if (result.exitCode !== 0 || result.timedOut) {
      throw new Error(
        `${command.displayCommand} failed with ${result.timedOut ? 'timeout' : `exit code ${result.exitCode}`}.`,
      );
    }
    blocks.push({
      label: result.label,
      command: result.displayCommand,
      status: `exit ${result.exitCode} in ${result.durationMs}ms`,
      output: result.renderedOutput,
    });
  }

  return writeTranscriptHtml(input.artifactDir, input.scenario, blocks);
}

async function buildMcpTranscript(input: {
  cwd: string;
  artifactDir: string;
  scenario: McpUseCaseVideoScenario;
}): Promise<{ path: string; blocks: TranscriptBlock[] }> {
  const client = await StdioMcpClient.start(input.cwd, input.artifactDir, input.scenario.slug);
  try {
    const blocks: TranscriptBlock[] = [];
    for (const call of input.scenario.mcpCalls) {
      const startedAt = Date.now();
      const payload = await client.callTool(call.name, call.arguments);
      blocks.push({
        label: call.label,
        command: `${call.name}(${JSON.stringify(call.arguments)})`,
        status: `ok in ${Date.now() - startedAt}ms`,
        output: renderStructuredOutput(payload, call.outputFormat),
      });
    }
    return writeTranscriptHtml(input.artifactDir, input.scenario, blocks);
  } finally {
    await client.close();
  }
}

async function writeTranscriptHtml(
  artifactDir: string,
  scenario: Exclude<UseCaseVideoScenario, DocsUseCaseVideoScenario>,
  blocks: TranscriptBlock[],
): Promise<{ path: string; blocks: TranscriptBlock[] }> {
  const transcriptPath = resolve(artifactDir, `${scenario.slug}.html`);
  await writeFile(transcriptPath, renderTranscriptHtml(scenario, blocks), 'utf8');
  return { path: transcriptPath, blocks };
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
  if (failed.length > 0) {
    throw new Error(`CSS assets did not load for video recording: ${JSON.stringify(failed)}`);
  }
}

async function installDocsOverlay(
  page: Page,
  scenario: UseCaseVideoScenario,
  step: DocsRecordingStep,
): Promise<void> {
  await page.addStyleTag({
    content: `
      .fpf-video-overlay {
        position: fixed;
        right: 24px;
        bottom: 24px;
        z-index: 9999;
        width: 440px;
        max-width: calc(100vw - 48px);
        padding: 18px 20px;
        border: 1px solid rgba(20, 75, 61, 0.22);
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.95);
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
      .fpf-video-overlay__stage {
        margin: 10px 0 0;
        color: #23362a;
        font-size: 13px;
        font-weight: 700;
      }
      .fpf-video-overlay__description {
        margin: 6px 0 0;
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
  await page.evaluate(
    ({ overlayScenario, overlayStep }) => {
      document.querySelector('.fpf-video-overlay')?.remove();
      const node = document.createElement('aside');
      node.className = 'fpf-video-overlay';
      node.innerHTML = `
        <p class="fpf-video-overlay__eyebrow"></p>
        <h2 class="fpf-video-overlay__title"></h2>
        <p class="fpf-video-overlay__stage"></p>
        <p class="fpf-video-overlay__description"></p>
      `;
      node.querySelector('.fpf-video-overlay__eyebrow')!.textContent =
        `${overlayScenario.product} use case`;
      node.querySelector('.fpf-video-overlay__title')!.textContent = overlayScenario.title;
      node.querySelector('.fpf-video-overlay__stage')!.textContent = overlayStep.stage;
      node.querySelector('.fpf-video-overlay__description')!.textContent = overlayStep.message;
      document.body.append(node);
    },
    { overlayScenario: scenario, overlayStep: step },
  );
}

async function focusHeading(page: Page, heading: string): Promise<void> {
  await page
    .waitForFunction(
      (headingText) =>
        document.body?.innerText?.includes(headingText) || document.title.includes(headingText),
      heading,
      { timeout: 5_000 },
    )
    .catch(() => undefined);
  const found = await page.evaluate((headingText) => {
    const normalize = (value: string) => value.replace(/^#+/u, '').replace(/\s+/gu, ' ').trim().toLowerCase();
    const normalizedHeading = normalize(headingText);
    document
      .querySelectorAll('.fpf-video-heading-highlight')
      .forEach((node) => node.classList.remove('fpf-video-heading-highlight'));
    const headings = Array.from(document.querySelectorAll('h1,h2,h3'));
    const candidate =
      headings.find((node) => normalize(node.textContent ?? '').includes(normalizedHeading)) ??
      (normalize(document.body?.innerText ?? '').includes(normalizedHeading)
        ? headings[0]
        : undefined);
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

async function activateTranscriptStage(page: Page, stageId: string): Promise<void> {
  await page.evaluate((activeStageId) => {
    document
      .querySelectorAll('[data-stage]')
      .forEach((node) => node.classList.toggle('is-active', node.getAttribute('data-stage') === activeStageId));
    document
      .querySelector(`[data-stage="${activeStageId}"]`)
      ?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, stageId);
}

async function buildDemoEnv(
  cwd: string,
  artifactDir: string,
  scenarioSlug: string,
): Promise<NodeJS.ProcessEnv> {
  const runtimeDir = resolve(artifactDir, 'runtime', scenarioSlug);
  const logDir = resolve(artifactDir, 'logs');
  await mkdir(runtimeDir, { recursive: true });
  await mkdir(logDir, { recursive: true });

  return {
    ...process.env,
    FPF_SPEC_SOURCE_PATH: resolve(cwd, SPEC_SOURCE_PATH),
    FPF_RUNTIME_ARTIFACT_DIR: runtimeDir,
    FPF_LOCAL_LLM_BASE_URL: '',
    FPF_LOCAL_LLM_MODEL: '',
    FPF_LOCAL_LLM_API_KEY: '',
    FPF_PERSIST_SESSION_CACHE: 'false',
    FPF_MASTRA_LOG_PATH: resolve(logDir, `${scenarioSlug}-mastra.log`),
    FPF_MASTRA_OBSERVABILITY_PATH: resolve(logDir, `${scenarioSlug}-observability.json`),
    FPF_AI_TRACE_LOG_PATH: resolve(logDir, `${scenarioSlug}-ai-traces.jsonl`),
  };
}

function runCapturedCommand(
  command: DemoCommand,
  options: { cwd: string; env: NodeJS.ProcessEnv; timeoutMs: number },
): Promise<CommandRunResult> {
  return new Promise((resolvePromise, reject) => {
    const startedAt = Date.now();
    let stdout = '';
    let stderr = '';
    let timedOut = false;
    const child = spawn(command.command, command.args, {
      cwd: options.cwd,
      env: options.env,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', (chunk: string) => {
      stdout += chunk;
    });
    child.stderr.on('data', (chunk: string) => {
      stderr += chunk;
    });

    const timeout = setTimeout(() => {
      timedOut = true;
      child.kill('SIGTERM');
    }, options.timeoutMs);

    child.once('error', reject);
    child.once('close', (code, signal) => {
      clearTimeout(timeout);
      resolvePromise({
        label: command.label,
        displayCommand: command.displayCommand,
        exitCode: timedOut ? null : code,
        signal,
        timedOut,
        durationMs: Date.now() - startedAt,
        stdout,
        stderr,
        renderedOutput: renderCommandOutput(command.outputFormat, stdout, stderr),
      });
    });
  });
}

function renderCommandOutput(
  outputFormat: TranscriptOutputFormat,
  stdout: string,
  stderr: string,
): string {
  const parsed = parseJsonFromCommandOutput(stdout) ?? parseJsonFromCommandOutput(stderr);
  if (parsed) {
    return renderStructuredOutput(parsed, outputFormat);
  }

  const combined = [stdout.trim(), stderr.trim()].filter(Boolean).join('\n\n');
  return trimForDisplay(combined || '(no output)', 8_000);
}

function renderStructuredOutput(value: unknown, outputFormat: TranscriptOutputFormat): string {
  if (outputFormat === 'query-json') {
    const record = asRecord(value);
    return stringifyForDisplay({
      answer: record.answer,
      ids: record.ids,
      constraints: record.constraints,
      citations: record.citations,
      status: record.status,
      mode: record.mode,
      snapshot: summarizeSnapshot(record.snapshot),
    });
  }

  if (outputFormat === 'trace-json') {
    const record = asRecord(value);
    return stringifyForDisplay({
      status: record.status,
      mode: record.mode,
      selectedNodeIds: record.selectedNodeIds,
      selectedAnchorIds: firstItems(record.selectedAnchorIds, 10),
      candidateScores: firstItems(record.candidateScores, 5),
      sessionApplied: record.sessionApplied,
      sessionReusedNodeIds: record.sessionReusedNodeIds,
      sufficient: record.sufficient,
      snapshot: summarizeSnapshot(record.snapshot),
    });
  }

  if (outputFormat === 'evaluation-json') {
    const record = asRecord(value);
    return stringifyForDisplay({
      overallStatus: record.overallStatus,
      target: record.target,
      branch: record.branch,
      findings: record.findings,
      recommendations: record.recommendations,
      evidenceCount: Array.isArray(record.evidence) ? record.evidence.length : undefined,
      generatedAt: record.generatedAt,
    });
  }

  const record = asRecord(value);
  if (typeof record.markdown === 'string') {
    return stringifyForDisplay({
      selector: record.selector,
      nodeId: record.nodeId,
      title: record.title,
      docRef: record.docRef,
      markdownPreview: trimForDisplay(record.markdown, 1_600),
      snapshot: summarizeSnapshot(record.snapshot),
    });
  }

  return stringifyForDisplay(summarizeRuntimeStatus(value));
}

function summarizeRuntimeStatus(value: unknown): unknown {
  const record = asRecord(value);
  if ('sourceHash' in record || 'compilerMode' in record) {
    return {
      sourcePath: record.sourcePath,
      sourceHash: record.sourceHash,
      snapshotExists: record.snapshotExists,
      fresh: record.fresh,
      compilerMode: record.compilerMode,
      artifacts: record.artifacts,
      sessionCache: record.sessionCache,
    };
  }
  return value;
}

function summarizeSnapshot(value: unknown): unknown {
  const record = asRecord(value);
  if (Object.keys(record).length === 0) {
    return undefined;
  }
  return {
    sourceHash: record.sourceHash,
    builtAt: record.builtAt,
    rebuilt: record.rebuilt,
  };
}

function parseJsonFromCommandOutput(output: string): unknown | undefined {
  const start = output.indexOf('{');
  const end = output.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) {
    return undefined;
  }
  try {
    return JSON.parse(output.slice(start, end + 1));
  } catch {
    return undefined;
  }
}

function renderTranscriptHtml(
  scenario: Exclude<UseCaseVideoScenario, DocsUseCaseVideoScenario>,
  blocks: TranscriptBlock[],
): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(scenario.product)} - ${escapeHtml(scenario.title)}</title>
    <style>
      :root {
        color-scheme: light;
        --ink: #172018;
        --muted: #607067;
        --paper: #fbfaf7;
        --panel: #ffffff;
        --line: #d9ddd4;
        --accent: #0b6b4f;
        --accent-soft: #e8f5ef;
        --code: #18201c;
        --code-ink: #e9f2ec;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        background: var(--paper);
        color: var(--ink);
        font: 16px/1.5 Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      main {
        max-width: 1180px;
        margin: 0 auto;
        padding: 44px 36px 72px;
      }
      header {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 24px;
        align-items: start;
        margin-bottom: 28px;
        border-bottom: 1px solid var(--line);
        padding-bottom: 24px;
      }
      .eyebrow {
        margin: 0 0 8px;
        color: var(--accent);
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0;
        text-transform: uppercase;
      }
      h1 {
        margin: 0;
        font-size: 42px;
        line-height: 1.06;
        letter-spacing: 0;
      }
      .product {
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 10px 12px;
        background: var(--panel);
        color: var(--muted);
        font-size: 14px;
        font-weight: 700;
      }
      .stage-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px;
        margin-bottom: 28px;
      }
      .stage-panel {
        min-height: 118px;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: var(--panel);
        padding: 16px;
        transition: border-color 160ms ease, background 160ms ease, box-shadow 160ms ease;
      }
      .stage-panel.is-active {
        border-color: rgba(11, 107, 79, 0.55);
        background: var(--accent-soft);
        box-shadow: 0 10px 30px rgba(21, 77, 55, 0.12);
      }
      .stage-panel h2 {
        margin: 0 0 8px;
        font-size: 15px;
        line-height: 1.2;
      }
      .stage-panel p, .stage-panel ul {
        margin: 0;
        color: var(--muted);
      }
      .stage-panel ul {
        padding-left: 18px;
      }
      .execution {
        display: grid;
        gap: 16px;
      }
      .terminal {
        border: 1px solid #25342d;
        border-radius: 8px;
        overflow: hidden;
        background: var(--code);
      }
      .terminal__bar {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        padding: 10px 14px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        color: #b9c8be;
        font-size: 13px;
      }
      .terminal__cmd {
        margin: 0;
        padding: 12px 14px 0;
        color: #9fe1c3;
        font: 13px/1.45 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        white-space: pre-wrap;
      }
      pre {
        margin: 0;
        max-height: 430px;
        overflow: auto;
        padding: 12px 14px 16px;
        color: var(--code-ink);
        font: 13px/1.45 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        white-space: pre-wrap;
      }
      @media (max-width: 760px) {
        main { padding: 28px 18px 48px; }
        header, .stage-grid { grid-template-columns: 1fr; }
        h1 { font-size: 32px; }
      }
    </style>
  </head>
  <body>
    <main>
      <header>
        <div>
          <p class="eyebrow">FPF product use case</p>
          <h1>${escapeHtml(scenario.title)}</h1>
        </div>
        <div class="product">${escapeHtml(scenario.product)}</div>
      </header>
      <section class="stage-grid" aria-label="Use-case narrative">
        ${renderStagePanel('initial', 'Initial state', scenario.initialState)}
        ${renderStagePanel('problem', 'Problem', scenario.problem)}
        ${renderToolsPanel(scenario.tools)}
        ${renderStagePanel('outcome', 'Useful outcome', scenario.outcome)}
      </section>
      <section class="execution" data-stage="action">
        ${blocks.map(renderTranscriptBlock).join('\n')}
      </section>
    </main>
  </body>
</html>`;
}

function renderStagePanel(stageId: string, title: string, body: string): string {
  return `<article class="stage-panel" data-stage="${stageId}">
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(body)}</p>
        </article>`;
}

function renderToolsPanel(tools: string[]): string {
  return `<article class="stage-panel" data-stage="tools">
          <h2>Tools used</h2>
          <ul>${tools.map((tool) => `<li>${escapeHtml(tool)}</li>`).join('')}</ul>
        </article>`;
}

function renderTranscriptBlock(block: TranscriptBlock): string {
  return `<article class="terminal">
          <div class="terminal__bar"><strong>${escapeHtml(block.label)}</strong><span>${escapeHtml(block.status)}</span></div>
          <p class="terminal__cmd">$ ${escapeHtml(block.command)}</p>
          <pre>${escapeHtml(block.output)}</pre>
        </article>`;
}

function runInheritedCommand(command: string, args: string[], cwd: string): Promise<void> {
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

function toRecordedUseCase(
  scenario: UseCaseVideoScenario,
  paths: { url?: string; transcriptPath?: string; videoPath: string },
): RecordedUseCase {
  return {
    slug: scenario.slug,
    product: scenario.product,
    title: scenario.title,
    initialState: scenario.initialState,
    problem: scenario.problem,
    tools: scenario.tools,
    outcome: scenario.outcome,
    recordingSteps: scenario.recordingSteps,
    kind: scenario.kind,
    url: paths.url,
    transcriptPath: paths.transcriptPath,
    videoPath: paths.videoPath,
  };
}

class StdioMcpClient {
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
  private readonly stderr: string[] = [];

  private constructor(private readonly child: ChildProcessWithoutNullStreams) {
    this.rl = readline.createInterface({
      input: child.stdout,
      crlfDelay: Infinity,
    });
    this.rl.on('line', (line) => this.handleLine(line));
    this.child.stderr.on('data', (chunk) => {
      this.stderr.push(chunk.toString());
    });
    this.child.on('error', (error) => this.rejectPending(error.message));
    this.child.once('exit', (code, signal) => {
      this.rejectPending(
        `MCP stdio exited before responding (code=${code ?? 'null'}, signal=${signal ?? 'null'})`,
      );
    });
  }

  static async start(cwd: string, artifactDir: string, scenarioSlug: string): Promise<StdioMcpClient> {
    const env = await buildDemoEnv(cwd, artifactDir, scenarioSlug);
    const child = spawn('bun', ['src/mastra/stdio.ts'], {
      cwd,
      env: {
        ...env,
        FPF_MCP_SURFACE: 'full',
      },
      stdio: ['pipe', 'pipe', 'pipe'],
    } satisfies SpawnOptionsWithoutStdio) as ChildProcessWithoutNullStreams;
    const client = new StdioMcpClient(child);
    const initialize = await client.request('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: {
        name: 'fpf-use-case-video-recorder',
        version: '1.0.0',
      },
    });
    if (initialize.error) {
      throw new Error(`MCP initialize failed: ${initialize.error.message}`);
    }
    client.notify('notifications/initialized');
    return client;
  }

  async callTool(name: string, toolArguments: Record<string, unknown>): Promise<Record<string, unknown>> {
    const response = await this.request('tools/call', {
      name,
      arguments: toolArguments,
    });
    if (response.error) {
      throw new Error(`MCP tool ${name} failed: ${response.error.message}`);
    }
    const result = response.result ?? {};
    if (result.isError === true) {
      throw new Error(`MCP tool ${name} returned an error: ${JSON.stringify(result)}`);
    }
    return asRecord(result.structuredContent);
  }

  async close(): Promise<void> {
    this.rl.close();
    if (this.child.exitCode !== null) {
      return;
    }
    await new Promise<void>((resolvePromise) => {
      const killTimer = setTimeout(() => {
        this.child.kill('SIGKILL');
        resolvePromise();
      }, 3_000);
      this.child.once('exit', () => {
        clearTimeout(killTimer);
        resolvePromise();
      });
      this.child.kill();
    });
  }

  private request(method: string, params?: Record<string, unknown>): Promise<JsonRpcResponse> {
    const id = this.nextId++;
    const payload = JSON.stringify({
      jsonrpc: '2.0',
      id,
      method,
      ...(params ? { params } : {}),
    });

    const response = new Promise<JsonRpcResponse>((resolvePromise, reject) => {
      const timeout = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`Timed out waiting for MCP response to ${method}\n${this.stderr.join('')}`));
      }, MCP_TIMEOUT_MS);
      this.pending.set(id, { resolve: resolvePromise, reject, timeout });
    });

    this.child.stdin.write(`${payload}\n`);
    return response;
  }

  private notify(method: string, params?: Record<string, unknown>): void {
    const payload = JSON.stringify({
      jsonrpc: '2.0',
      method,
      ...(params ? { params } : {}),
    });
    this.child.stdin.write(`${payload}\n`);
  }

  private handleLine(line: string): void {
    const trimmed = line.trim();
    if (!trimmed) {
      return;
    }

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

  private rejectPending(message: string): void {
    for (const { reject, timeout } of this.pending.values()) {
      clearTimeout(timeout);
      reject(new Error(`${message}\n${this.stderr.join('')}`));
    }
    this.pending.clear();
  }
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

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function firstItems(value: unknown, count: number): unknown {
  return Array.isArray(value) ? value.slice(0, count) : value;
}

function stringifyForDisplay(value: unknown): string {
  return trimForDisplay(JSON.stringify(value, null, 2), 8_000);
}

function trimForDisplay(value: string, maxLength: number): string {
  if (value.length <= maxLength) {
    return value;
  }
  return `${value.slice(0, maxLength)}\n... trimmed ${value.length - maxLength} characters ...`;
}

function escapeHtml(value: unknown): string {
  return String(value)
    .replace(/&/gu, '&amp;')
    .replace(/</gu, '&lt;')
    .replace(/>/gu, '&gt;')
    .replace(/"/gu, '&quot;')
    .replace(/'/gu, '&#39;');
}

function escapeMarkdownTable(value: string): string {
  return value.replace(/\|/gu, '\\|').replace(/\n/gu, ' ');
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
