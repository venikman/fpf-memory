import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, resolve } from 'node:path';

import { afterEach, describe, expect, it } from '@rstest/core';

import { scanBoundaryViolations } from '../scripts/check-boundaries.js';

describe('boundary checker', () => {
  const tempRoots: string[] = [];

  afterEach(async () => {
    await Promise.all(
      tempRoots.splice(0).map((directory) => rm(directory, { recursive: true, force: true })),
    );
  });

  it('accepts a clean context graph', async () => {
    const root = await createFixtureRoot();
    await writeModule(root, 'src/core/model.ts', 'export const model = 1;\n');
    await writeModule(
      root,
      'src/app/use-case.ts',
      "import { model } from '../core/model.js';\nexport const value = model;\n",
    );
    await writeModule(
      root,
      'src/composition/main.ts',
      "import { value } from '../app/use-case.js';\nexport const main = value;\n",
    );
    await writeModule(
      root,
      'src/entrypoints/cli.ts',
      "import { main } from '../composition/main.js';\nvoid main;\n",
    );

    expect(scanBoundaryViolations(root)).toEqual([]);
  });

  it('reports representative context violations', async () => {
    const root = await createFixtureRoot();

    await writeModule(root, 'src/adapters/mcp/tool.ts', 'export const tool = 1;\n');
    await writeModule(
      root,
      'src/adapters/hosted/server.ts',
      "import { tool } from '../mcp/tool.js';\nexport const hostedServer = tool;\n",
    );
    await writeModule(
      root,
      'src/core/model.ts',
      "import { tool } from '../adapters/mcp/tool.js';\nexport const model = tool;\n",
    );
    await writeModule(
      root,
      'src/app/use-case.ts',
      "import { tool } from '../adapters/mcp/tool.js';\nexport const value = tool;\n",
    );
    await writeModule(
      root,
      'src/adapters/docs/build.ts',
      "import { hostedServer } from '../hosted/server.js';\nexport const build = hostedServer;\n",
    );
    await writeModule(root, 'src/composition/main.ts', 'export const main = 1;\n');
    await writeModule(
      root,
      'src/entrypoints/cli.ts',
      "import { tool } from '../adapters/mcp/tool.js';\nvoid tool;\n",
    );

    const violations = scanBoundaryViolations(root);

    expect(violations.map((violation) => violation.rule)).toEqual(
      expect.arrayContaining([
        'Ctx.Core may import only Ctx.Core',
        'Ctx.App may depend only on Ctx.Core and Ctx.App',
        'Ctx.Run.Hosted may not depend on Ctx.Run.MCP',
        'Ctx.Docs/Ctx.Build may not depend on runtime adapters or entrypoints',
        'Ctx.EntryPoint may import only Ctx.Composition',
      ]),
    );
  });

  async function createFixtureRoot(): Promise<string> {
    const root = await mkdtemp(resolve(tmpdir(), 'fpf-boundary-checker-'));
    tempRoots.push(root);
    return root;
  }
});

async function writeModule(root: string, relativePath: string, source: string): Promise<void> {
  const filePath = resolve(root, relativePath);
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, source, 'utf8');
}
