/**
 * Canonical adoption copy for the FPF Reference hosted MCP surface.
 *
 * Wiki projection (`documents.ts`), hosted HTML (`home-page.ts`), and
 * authored docs should stay aligned with these strings. Tests in
 * `tests/public-copy-parity.test.ts` lock the contract.
 */

export const HOSTED_MCP_ENDPOINT =
  'https://mcp.fpf.sh/api/mcp/fpf_reference/mcp';

export const LEGACY_HOSTED_MCP_ENDPOINT =
  'https://mcp.fpf.sh/api/mcp/fpf_memory/mcp';

export const HOSTED_MCP_STATUS_URL = 'https://mcp.fpf.sh/api/fpf/status';

export const WIKI_BASE_URL = 'https://fpf.sh';

export const WIKI_CONNECT_MCP_URL = `${WIKI_BASE_URL}/connect-mcp`;

export const MCP_ORIGIN_HOME_URL = 'https://mcp.fpf.sh/';

export const MCP_SERVER_NAME = 'fpf_reference';

export const LEGACY_MCP_SERVER_NAME = 'fpf_memory';

export const FIRST_SUCCESSFUL_CALL_HEADING = 'First successful call';

export const PUBLIC_MCP_TOOLS = [
  'browse_fpf_catalog',
  'search_fpf',
  'ask_fpf',
  'query_fpf_spec',
  'read_fpf_doc',
  'get_fpf_index_status',
] as const;

export const FPF_VS_MCP_EXPLAINER_MARKDOWN = `## FPF vs MCP in one paragraph

- **FPF** is the specification (patterns, evidence rules, and any published route surfaces).
- **FPF Reference** projects that spec two ways: this wiki (read) and the MCP endpoint (query by ID).
- **FPF Reference MCP** is not agent memory, not a workflow engine, and not a web page.

You do not install FPF. Add one MCP URL to your client as **fpf_reference**.`;

export const LEGACY_MIGRATION_CALLOUT_MARKDOWN = `> **Still using \`fpf_memory\`?** Swap the server name to **\`fpf_reference\`** and replace the URL with the canonical endpoint above. The legacy route is blocked during the May 2026 mitigation.`;

export const HOSTED_THREE_STEP_MARKDOWN = `## Connect in three steps

1. Copy the canonical endpoint into your MCP client config.
2. Register the server as **\`fpf_reference\`** (not \`fpf_memory\`).
3. Run **${FIRST_SUCCESSFUL_CALL_HEADING}** below: \`get_fpf_index_status\`, then one compact \`query_fpf_spec\`.`;

export const FIRST_SUCCESSFUL_CALL_PROMPT = `Use only fpf_reference. Call query_fpf_spec with question: "Project kickoff: align a project information system with roles and adoption next steps" and mode "compact". Return the most relevant FPF IDs, acceptance check, and next move.`;

export const SUCCESS_CHECKLIST_MARKDOWN = `**Success checklist**

- \`get_fpf_index_status\` reports a loadable index.
- The compact query returns stable FPF IDs in \`ids\` with bounded next steps, not a full FPF paste.`;

export const GOOD_FIRST_PROMPT = `Use only fpf_reference. First call get_fpf_index_status. If the index is available, find the smallest useful FPF context for this work: <describe work>. Return Context | FPF IDs | Friction avoided | Acceptance check | Next move.`;

export const GOOD_FIRST_PROMPT_FOOTER =
  'Keep answers compact. Read exact generated docs only when wording matters, and do not paste the full FPF into the chat.';

export interface ClientSetupSection {
  id: string;
  title: string;
  summary: string;
  body: readonly string[];
  code?: string;
  href: string;
}

export function buildClientSetupSections(
  endpoint = HOSTED_MCP_ENDPOINT,
): readonly ClientSetupSection[] {
  return [
    {
      id: 'chatgpt',
      title: 'ChatGPT',
      summary:
        'Create a custom app or connector and use the hosted MCP endpoint as the connector URL.',
      body: [
        'Open Settings > Apps & Connectors.',
        'Enable developer mode under Advanced settings when your plan or workspace requires it.',
        'Create a custom app or connector, set the Connector URL to the hosted endpoint, then confirm the advertised tools.',
        'Open a new chat and add FPF Reference from the composer tools menu.',
      ],
      href: 'https://developers.openai.com/apps-sdk/deploy/connect-chatgpt',
    },
    {
      id: 'claude',
      title: 'Claude',
      summary: 'Add a custom connector from Claude settings and point it at the public MCP endpoint.',
      body: [
        'Open Customize > Connectors.',
        'Click the + button next to Connectors and choose Add custom connector.',
        'Use FPF Reference as the name and the hosted endpoint as the URL.',
        'Connect it, then ask Claude to use fpf_reference for bounded FPF retrieval.',
      ],
      href: 'https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities',
    },
    {
      id: 'vscode',
      title: 'VS Code',
      summary: 'Use MCP: Add Server or commit a workspace .vscode/mcp.json file.',
      body: [
        'Open Command Palette > MCP: Add Server for the guided flow, or add this workspace file.',
        'Start or restart the server from the MCP code lens and confirm trust when VS Code asks.',
      ],
      code: `{
  "servers": {
    "fpf_reference": {
      "type": "http",
      "url": "${endpoint}"
    }
  }
}`,
      href: 'https://code.visualstudio.com/docs/copilot/customization/mcp-servers',
    },
    {
      id: 'zed',
      title: 'Zed',
      summary: 'Add FPF Reference as a custom remote context server in Agent Panel settings.',
      body: [
        'Open Agent Panel settings with agent: open settings.',
        'Add a custom server using the url-only remote server shape.',
        'Check the indicator next to FPF Reference; green means the server is active.',
      ],
      code: `{
  "context_servers": {
    "fpf_reference": {
      "url": "${endpoint}"
    }
  }
}`,
      href: 'https://zed.dev/docs/ai/mcp',
    },
    {
      id: 'codex',
      title: 'Codex CLI',
      summary: 'Register the remote streamable HTTP server with codex mcp add.',
      body: ['Run the command, then ask Codex to call get_fpf_index_status before route work.'],
      code: `codex mcp add fpf_reference --url ${endpoint}

[mcp_servers.fpf_reference]
url = "${endpoint}"`,
      href: 'https://developers.openai.com/codex/config-reference#mcp_serversidurl',
    },
    {
      id: 'claude-code',
      title: 'Claude Code',
      summary: 'Use the HTTP MCP transport and verify status with /mcp inside Claude Code.',
      body: ['Run the command, then use /mcp inside Claude Code to check connection status.'],
      code: `claude mcp add --transport http fpf_reference ${endpoint}`,
      href: 'https://docs.claude.com/en/docs/claude-code/mcp',
    },
    {
      id: 'pi',
      title: 'Pi',
      summary: 'Install an MCP extension, then configure FPF Reference as a streamable HTTP server.',
      body: [
        'Install pi-mcp-extension or another Pi MCP extension.',
        'Add the server to ~/.pi/agent/mcp.json for global use or .pi/mcp.json for one project.',
        'Start Pi and use /mcp to check status.',
      ],
      code: `pi install npm:pi-mcp-extension

{
  "mcpServers": {
    "fpf_reference": {
      "transport": "streamable-http",
      "url": "${endpoint}",
      "lifecycle": "eager"
    }
  }
}`,
      href: 'https://pi.dev/packages/pi-mcp-extension',
    },
  ] as const;
}

export const CLIENT_SETUP_SECTIONS = buildClientSetupSections();

export function renderPublicMcpToolsMarkdown(): string {
  return PUBLIC_MCP_TOOLS.map((tool) => `- \`${tool}\``).join('\n');
}

export function renderHomeMcpToolsMarkdown(): string {
  const descriptions: Record<(typeof PUBLIC_MCP_TOOLS)[number], string> = {
    browse_fpf_catalog: 'paginate patterns, lexemes, preface, and any published routes',
    search_fpf: 'ranked text search across the compiled index',
    query_fpf_spec: 'bounded answer with IDs, citations, constraints',
    ask_fpf: 'same plus rendered markdown for chat surfaces',
    read_fpf_doc: 'exact canonical page for a selector (preview + full modes)',
    get_fpf_index_status: 'snapshot freshness, source hash, build time',
  };
  return PUBLIC_MCP_TOOLS.map(
    (tool) => `- \`${tool}\` — ${descriptions[tool]}`,
  ).join('\n');
}

export function renderHomeMcpEndpointLine(): string {
  return `Endpoint: \`${HOSTED_MCP_ENDPOINT}\` · Legacy blocked during May 2026 mitigation: \`${LEGACY_HOSTED_MCP_ENDPOINT}\` · Status: [${HOSTED_MCP_STATUS_URL}](${HOSTED_MCP_STATUS_URL}) · [Quick connect →](/connect-local) · [Full setup →](/connect-mcp)`;
}
