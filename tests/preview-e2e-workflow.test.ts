import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from '@rstest/core';

describe('preview E2E workflow', () => {
  it('routes Vercel previews by MCP project host without dropping website regression specs', async () => {
    const workflow = await readFile(
      resolve(process.cwd(), '.github/workflows/preview-e2e.yml'),
      'utf8',
    );
    const routesSpec = await readFile(
      resolve(process.cwd(), 'tests/e2e/routes.spec.ts'),
      'utf8',
    );
    const mcpSpec = await readFile(
      resolve(process.cwd(), 'tests/e2e/mcp.spec.ts'),
      'utf8',
    );

    expect(workflow).toContain('PREVIEW_HOST=$(node -e');
    expect(workflow).toContain('"$PREVIEW_HOST" == "mcp.fpf.sh"');
    expect(workflow).toContain('"$PREVIEW_HOST" == "fpf-reference-mcp.vercel.app"');
    expect(workflow).toContain('"$PREVIEW_HOST" == fpf-reference-mcp-*');
    expect(workflow).not.toContain('== *"mcp"*');
    expect(workflow).toContain('FPF_E2E_MCP_BASE_URL="$PREVIEW_URL" bunx playwright test tests/e2e/mcp.spec.ts');
    expect(workflow).toContain('tests/e2e/rendering.spec.ts');
    expect(workflow).toContain('tests/e2e/routes.spec.ts');
    expect(workflow).toContain('tests/e2e/head-shape.spec.ts');
    expect(workflow).toContain('tests/e2e/keybindings.spec.ts');
    expect(routesSpec).not.toContain('/api/fpf/status');
    expect(mcpSpec).toContain("const STATUS_PATH = '/api/fpf/status';");
  });
});
