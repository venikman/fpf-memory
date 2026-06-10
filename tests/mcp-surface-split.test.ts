import { describe, expect, it } from '@rstest/core';

import { createHostedComposition } from '../src/composition/hosted.js';
import { createMcpComposition } from '../src/composition/mcp.js';
import { PUBLIC_MCP_TOOLS } from '../src/core/public-copy.js';

describe('MCP surface split (hosted public vs local full)', () => {
  it('exposes exactly six public tools in the public composition', () => {
    const composition = createMcpComposition({
      FPF_MCP_SURFACE: 'public',
    } as NodeJS.ProcessEnv);

    expect(Object.keys(composition.tools.fpfPublicTools).sort()).toEqual(
      [...PUBLIC_MCP_TOOLS].sort(),
    );
    expect(Object.keys(composition.tools.fpfPublicTools)).toHaveLength(6);
  });

  it('exposes eleven tools in the full local composition', () => {
    const composition = createMcpComposition({
      FPF_MCP_SURFACE: 'full',
    } as NodeJS.ProcessEnv);

    const toolNames = Object.keys(composition.tools.fpfMcpTools).sort();
    expect(toolNames).toHaveLength(11);
    for (const publicTool of PUBLIC_MCP_TOOLS) {
      expect(toolNames).toContain(publicTool);
    }
  });

  it('defaults hosted composition to the public MCP surface', () => {
    const composition = createHostedComposition({
      PORT: '0',
    } as NodeJS.ProcessEnv);

    expect(composition.hostedConfig.surface).toBe('public');
  });
});
