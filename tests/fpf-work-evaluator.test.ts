import { execFileSync } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { copyFile, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

import { afterEach, describe, expect, it } from '@rstest/core';

import {
  collectFpfWorkFacts,
  evaluateFpfWorkFacts,
  formatFpfWorkEvaluationReport,
  FPF_WORK_EVALUATION_ANCHORS,
  type FpfWorkFacts,
} from '../src/evaluation/fpf-work-evaluator.js';

describe('FPF work evaluator', () => {
  let tempRoot: string | undefined;

  afterEach(async () => {
    if (tempRoot) {
      await rm(tempRoot, { recursive: true, force: true });
      tempRoot = undefined;
    }
  });

  it('scores complete three-surface facts as aligned', () => {
    const report = evaluateFpfWorkFacts(makeFacts());

    expect(report.overallStatus).toBe('aligned');
    expect(report.scorecard).toHaveLength(6);
    expect(report.scorecard.every((item) => item.status === 'pass')).toBe(true);
    expect(report.anchors.map((anchor) => anchor.id)).toEqual([
      'E.14',
      'E.17',
      'F.17',
      'C.24',
      'B.3.5',
      'G.5',
    ]);
  });

  it('renders a useful markdown scorecard with all selected FPF anchors', () => {
    const report = evaluateFpfWorkFacts(makeFacts());
    const markdown = formatFpfWorkEvaluationReport(report, 'markdown');

    expect(markdown).toContain('# FPF Work Evaluation');
    expect(markdown).toContain('## FPF Scorecard');
    expect(markdown).toContain('## Useful Next Work');
    for (const anchor of FPF_WORK_EVALUATION_ANCHORS) {
      expect(markdown).toContain(anchor.id);
      expect(markdown).toContain(anchor.title);
    }
  });

  it('renders json output for tool consumers', () => {
    const report = evaluateFpfWorkFacts(makeFacts());
    const parsed = JSON.parse(formatFpfWorkEvaluationReport(report, 'json')) as {
      overallStatus: string;
      scorecard: unknown[];
    };

    expect(parsed.overallStatus).toBe('aligned');
    expect(parsed.scorecard).toHaveLength(6);
  });

  it('marks CI spec download as an FPF surface split gap', () => {
    const facts = makeFacts({
      fileTexts: {
        ...defaultFileTexts(),
        ciWorkflow: 'steps:\n  - run: bun run spec:download\n  - run: bun run validate:published\n',
      },
    });
    const report = evaluateFpfWorkFacts(facts);
    const surfaceSplit = report.scorecard.find((item) => item.id === 'surface-split');

    expect(surfaceSplit?.status).toBe('partial');
    expect(surfaceSplit?.severity).toBe('high');
    expect(report.overallStatus).toBe('needs_work');
  });

  it('requires optional term links to point at the matching generated pages when present', () => {
    const facts = makeFacts({
      fileTexts: {
        ...defaultFileTexts(),
        docsIndex: [
          '# FPF Reference',
          '## Choose your entry point',
          'New to FPF',
          'Connecting an agent or editor',
          'Reviewing a project, PR, or design change',
          '## Reference shortcuts',
          '[Pattern Catalog](/patterns)',
          '[Routes](/routes)',
          '[Glossary](/generated/patterns/A.0)',
          '[Change log](/generated/patterns/renumbered-change-log)',
          '## Published from',
        ].join('\n'),
      },
    });

    const report = evaluateFpfWorkFacts(facts);
    const termSheet = report.scorecard.find((item) => item.id === 'term-sheet');

    expect(termSheet?.status).toBe('partial');
    expect(report.overallStatus).toBe('usable_with_followups');
  });

  it('does not require optional term links when matching pages are absent from the snapshot', () => {
    const facts = makeFacts({
      fileTexts: {
        ...defaultFileTexts(),
        docsIndex: [
          '# FPF Reference',
          '## Choose your entry point',
          'New to FPF',
          'Connecting an agent or editor',
          'Reviewing a project, PR, or design change',
          '## Reference shortcuts',
          '[Pattern Catalog](/patterns)',
          '[Routes](/routes)',
          '[Glossary](/glossary)',
          '## Published from',
        ].join('\n'),
        publishedSnapshot: '{"sourceHash":"sha256:test","patternGraph":{"nodes":{}}}',
      },
    });

    const report = evaluateFpfWorkFacts(facts);
    const termSheet = report.scorecard.find((item) => item.id === 'term-sheet');

    expect(termSheet?.status).toBe('pass');
    expect(report.overallStatus).toBe('aligned');
  });

  it('rejects stale optional term links when matching pages are absent from the snapshot', () => {
    const facts = makeFacts({
      fileTexts: {
        ...defaultFileTexts(),
        docsIndex: [
          '# FPF Reference',
          '## Choose your entry point',
          'New to FPF',
          'Connecting an agent or editor',
          'Reviewing a project, PR, or design change',
          '## Reference shortcuts',
          '[Pattern Catalog](/patterns)',
          '[Routes](/routes)',
          '[Glossary](/generated/patterns/stale-glossary)',
          '## Published from',
        ].join('\n'),
        publishedSnapshot: '{"sourceHash":"sha256:test","patternGraph":{"nodes":{}}}',
      },
    });

    const report = evaluateFpfWorkFacts(facts);
    const termSheet = report.scorecard.find((item) => item.id === 'term-sheet');

    expect(termSheet?.status).toBe('partial');
    expect(report.overallStatus).toBe('usable_with_followups');
  });

  it('fails clearly when the evaluation spec is missing', () => {
    tempRoot = mkdtempSync(resolve(tmpdir(), 'fpf-work-evaluator-'));

    expect(() =>
      collectFpfWorkFacts({
        target: 'current-pr',
        baseRef: 'main',
        cwd: tempRoot,
        env: {},
      }),
    ).toThrow(/does not fall back to \.fpf-upstream/u);
  });

  it('collects working-tree facts without requiring the requested base ref', async () => {
    tempRoot = mkdtempSync(resolve(tmpdir(), 'fpf-work-evaluator-'));
    execFileSync('git', ['init'], { cwd: tempRoot, stdio: 'ignore' });
    execFileSync('git', ['config', 'user.email', 'test@example.com'], {
      cwd: tempRoot,
      stdio: 'ignore',
    });
    execFileSync('git', ['config', 'user.name', 'Test User'], {
      cwd: tempRoot,
      stdio: 'ignore',
    });
    await writeFile(
      resolve(tempRoot, 'README.md'),
      'Default runtime path: published/current/FPF-Spec.md',
    );
    await mkdir(resolve(tempRoot, 'published/current'), { recursive: true });
    await writeFile(
      resolve(tempRoot, 'published/current/FPF-Spec.md'),
      FPF_WORK_EVALUATION_ANCHORS.map((anchor) => `${anchor.id} ${anchor.title}`).join('\n'),
    );
    execFileSync('git', ['add', '.'], { cwd: tempRoot, stdio: 'ignore' });
    execFileSync('git', ['commit', '-m', 'baseline'], { cwd: tempRoot, stdio: 'ignore' });
    await writeFile(resolve(tempRoot, 'README.md'), 'changed working tree');

    const facts = collectFpfWorkFacts({
      target: 'working-tree',
      baseRef: 'origin/trunk',
      cwd: tempRoot,
      env: {},
    });

    expect(facts.baseRef).toBe('origin/trunk');
    expect(facts.changedFiles).toEqual([{ status: 'M', path: 'README.md' }]);
    expect(facts.commitSubjects).toEqual([]);
  });

  it('projects the wiki landing page from the published surface instead of stale ignored docs', async () => {
    tempRoot = mkdtempSync(resolve(tmpdir(), 'fpf-work-evaluator-'));
    execFileSync('git', ['init'], { cwd: tempRoot, stdio: 'ignore' });
    execFileSync('git', ['config', 'user.email', 'test@example.com'], {
      cwd: tempRoot,
      stdio: 'ignore',
    });
    execFileSync('git', ['config', 'user.name', 'Test User'], {
      cwd: tempRoot,
      stdio: 'ignore',
    });

    await mkdir(resolve(tempRoot, 'published/current/fpf-index'), { recursive: true });
    await mkdir(resolve(tempRoot, 'docs'), { recursive: true });
    await copyFile(
      resolve(process.cwd(), 'published/current/FPF-Spec.md'),
      resolve(tempRoot, 'published/current/FPF-Spec.md'),
    );
    await copyFile(
      resolve(process.cwd(), 'published/current/fpf-index/snapshot.json'),
      resolve(tempRoot, 'published/current/fpf-index/snapshot.json'),
    );
    await copyFile(
      resolve(process.cwd(), 'published/current/manifest.json'),
      resolve(tempRoot, 'published/current/manifest.json'),
    );
    await writeFile(resolve(tempRoot, 'README.md'), 'Default runtime path: published/current/FPF-Spec.md');
    await writeFile(resolve(tempRoot, '.gitignore'), 'docs/index.md\n');
    await writeFile(resolve(tempRoot, 'docs/index.md'), '# STALE HOME\n## Navigate\n[Patterns](/generated/patterns/index)\n');
    execFileSync('git', ['add', '.'], { cwd: tempRoot, stdio: 'ignore' });
    execFileSync('git', ['commit', '-m', 'baseline'], { cwd: tempRoot, stdio: 'ignore' });

    const facts = collectFpfWorkFacts({
      target: 'working-tree',
      baseRef: 'origin/main',
      cwd: tempRoot,
      env: {},
    });

    expect(facts.fileTexts.docsIndex).toContain('## Choose your entry point');
    expect(facts.fileTexts.docsIndex).toContain('[Pattern Catalog](/patterns)');
    expect(facts.fileTexts.docsIndex).not.toContain('STALE HOME');
  });
});

function makeFacts(overrides: Partial<FpfWorkFacts> = {}): FpfWorkFacts {
  const fileTexts = overrides.fileTexts ?? defaultFileTexts();

  return {
    cwd: '/repo',
    target: 'current-pr',
    baseRef: 'origin/main',
    branch: 'fix/three-surface',
    headSha: 'abc123',
    generatedAt: '2026-04-30T00:00:00.000Z',
    specPath: '/repo/published/current/FPF-Spec.md',
    specAnchorPresence: Object.fromEntries(
      FPF_WORK_EVALUATION_ANCHORS.map((anchor) => [anchor.id, true]),
    ) as FpfWorkFacts['specAnchorPresence'],
    changedFiles: [
      { status: 'M', path: '.github/workflows/ci.yml' },
      { status: 'M', path: 'docs/index.md' },
      { status: 'M', path: 'published/current/manifest.json' },
    ],
    dirtyFiles: [],
    commitSubjects: ['abc123 finish three-surface split'],
    fileTexts,
    fileExists: Object.fromEntries(
      Object.entries(fileTexts).map(([key, value]) => [key, value !== undefined]),
    ) as FpfWorkFacts['fileExists'],
    ...overrides,
  };
}

function defaultFileTexts(): FpfWorkFacts['fileTexts'] {
  return {
    readme: 'Default runtime path: published/current/FPF-Spec.md',
    agents: 'default published/current/FPF-Spec.md',
    docsIndex: [
      '# FPF Reference',
      '## Choose your entry point',
      'New to FPF',
      'Connecting an agent or editor',
      'Reviewing a project, PR, or design change',
      '## Reference shortcuts',
      '[Pattern Catalog](/patterns)',
      '[Routes](/routes)',
      '[Glossary](/glossary)',
      '[Change log](/generated/patterns/renumbered-change-log)',
      '## Published from',
    ].join('\n'),
    connectMcp: [
      '# Connect MCP',
      'https://mcp.fpf.sh/',
      'compatibility bridge',
      'not agent memory',
      'fpf_reference',
    ].join('\n'),
    ciWorkflow: [
      'run: bun run validate:published',
      'run: |',
      '  bun run vercel:website:build',
      '  test -f .vercel/output/static/index.html',
      '  bun run vercel:mcp:build',
      '  test -d .vercel/output/functions/_mcp.func',
      '  test -f .vercel/output/functions/_mcp.func/hosted/FPF-Spec.md',
    ].join('\n'),
    prePushHook: 'echo "pre-push: publishing ./published/current/"',
    packageJson: [
      '"publish:current": "bun scripts/publish-current.ts"',
      '"validate:published": "bun scripts/validate-published-current.ts"',
      '"stage:from-published": "bun scripts/stage-from-published.ts"',
      '"predeploy": "bun run stage:from-published"',
      '"vercel:website:build": "bun run docs:build && bun run build:vercel-website"',
      '"vercel:mcp:build": "bun run predeploy && bun run build:vercel-mcp && bun run bench:vercel:function-size"',
      '"vercel:git:build": "bun scripts/build-vercel-git-preview.ts"',
      '"vercel:website:deploy:prod": "bun run deploy:validate && bun run vercel:website:build && bun scripts/deploy-vercel-prebuilt.ts --project fpf-sh --config vercel.json --prod"',
      '"vercel:mcp:deploy:prod": "bun run deploy:validate && bun run vercel:mcp:build && bun scripts/deploy-vercel-prebuilt.ts --project fpf-reference-mcp --config vercel.mcp.json --prod"',
      '"deploy": "bun run deploy:prod"',
      '"deploy:prod": "bun scripts/deploy-production-surfaces.ts"',
    ].join(',\n'),
    productionDeployScript: [
      "'--skip-domain'",
      "'promote'",
      'rollbackPromotions',
    ].join('\n'),
    vercelWebsiteConfig: '"buildCommand": "bun run vercel:git:build"',
    vercelMcpConfig: '"buildCommand": "bun run vercel:mcp:build"',
    publishedSpec: '# FPF',
    publishedSnapshot: JSON.stringify({
      sourceHash: 'sha256:test',
      patternGraph: {
        nodes: {
          'renumbered-glossary': {
            id: 'renumbered-glossary',
            title: 'Alphabetic Glossary',
            aliases: ['Alphabetic Glossary'],
            part: 'Part H - Glossary & Definitional Pattern Index',
          },
          'renumbered-change-log': {
            id: 'renumbered-change-log',
            title: 'Change-Log (auto-generated)',
            aliases: ['Change-Log (auto-generated)'],
            part: 'Part I - Annexes & Extended Tutorials',
          },
        },
      },
    }),
    publishedManifest:
      '{"sourceHash":"sha256:test","upstreamRef":"abc","publishedAt":"2026-04-30T00:00:00.000Z","compilerFingerprint":"sha256:test"}',
  };
}
