import { HOSTED_MCP_ENDPOINT } from '../../core/constants.js';

const CLIENT_SECTIONS = [
  {
    id: 'chatgpt',
    title: 'ChatGPT',
    summary: 'Create a custom app or connector and use the hosted MCP endpoint as the connector URL.',
    body: [
      'Open Settings > Apps & Connectors.',
      'Enable developer mode under Advanced settings when your plan or workspace requires it.',
      'Create a custom app or connector, set the Connector URL to the hosted endpoint, then confirm the advertised tools.',
      'Open a new chat and add fpf-memory from the composer tools menu.',
    ],
    code: undefined,
    href: 'https://developers.openai.com/apps-sdk/deploy/connect-chatgpt',
  },
  {
    id: 'claude',
    title: 'Claude',
    summary: 'Add a custom connector from Claude settings and point it at the public MCP endpoint.',
    body: [
      'Open Customize > Connectors.',
      'Click the + button next to Connectors and choose Add custom connector.',
      'Use fpf-memory as the name and the hosted endpoint as the URL.',
      'Connect it, then ask Claude to use fpf_memory for bounded FPF retrieval.',
    ],
    code: undefined,
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
    "fpf_memory": {
      "type": "http",
      "url": "${HOSTED_MCP_ENDPOINT}"
    }
  }
}`,
    href: 'https://code.visualstudio.com/docs/copilot/customization/mcp-servers',
  },
  {
    id: 'zed',
    title: 'Zed',
    summary: 'Add fpf-memory as a custom remote context server in Agent Panel settings.',
    body: [
      'Open Agent Panel settings with agent: open settings.',
      'Add a custom server using the url-only remote server shape.',
      'Check the indicator next to fpf-memory; green means the server is active.',
    ],
    code: `{
  "context_servers": {
    "fpf-memory": {
      "url": "${HOSTED_MCP_ENDPOINT}"
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
    code: `codex mcp add fpf_memory --url ${HOSTED_MCP_ENDPOINT}

[mcp_servers.fpf_memory]
url = "${HOSTED_MCP_ENDPOINT}"`,
    href: 'https://developers.openai.com/codex/config-reference#mcp_serversidurl',
  },
  {
    id: 'claude-code',
    title: 'Claude Code',
    summary: 'Use the HTTP MCP transport and verify status with /mcp inside Claude Code.',
    body: ['Run the command, then use /mcp inside Claude Code to check connection status.'],
    code: `claude mcp add --transport http fpf_memory ${HOSTED_MCP_ENDPOINT}`,
    href: 'https://docs.claude.com/en/docs/claude-code/mcp',
  },
  {
    id: 'pi',
    title: 'Pi',
    summary: 'Install an MCP extension, then configure fpf-memory as a streamable HTTP server.',
    body: [
      'Install pi-mcp-extension or another Pi MCP extension.',
      'Add the server to ~/.pi/agent/mcp.json for global use or .pi/mcp.json for one project.',
      'Start Pi and use /mcp to check status.',
    ],
    code: `pi install npm:pi-mcp-extension

{
  "mcpServers": {
    "fpf_memory": {
      "transport": "streamable-http",
      "url": "${HOSTED_MCP_ENDPOINT}",
      "lifecycle": "eager"
    }
  }
}`,
    href: 'https://pi.dev/packages/pi-mcp-extension',
  },
] as const;

export function renderHostedHomePage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>fpf-memory MCP</title>
    <style>
      :root {
        color-scheme: light;
        --bg: #f7f8fa;
        --panel: #ffffff;
        --text: #1c2430;
        --muted: #576474;
        --line: #d9dee7;
        --accent: #0b6bcb;
        --accent-strong: #084f97;
        --code-bg: #111827;
        --code-text: #f8fafc;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        background: var(--bg);
        color: var(--text);
        font-family:
          Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        line-height: 1.5;
      }

      a {
        color: var(--accent);
        text-decoration-thickness: 0.08em;
        text-underline-offset: 0.18em;
      }

      a:hover {
        color: var(--accent-strong);
      }

      main {
        width: min(1120px, calc(100% - 32px));
        margin: 0 auto;
        padding: 40px 0 56px;
      }

      .hero {
        display: grid;
        gap: 20px;
        padding: 32px 0 28px;
      }

      .eyebrow {
        margin: 0;
        color: var(--accent-strong);
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0;
        text-transform: uppercase;
      }

      h1 {
        margin: 0;
        max-width: 820px;
        font-size: clamp(2.25rem, 5vw, 4.5rem);
        line-height: 1;
        letter-spacing: 0;
      }

      h2,
      h3 {
        letter-spacing: 0;
      }

      .lead {
        max-width: 780px;
        margin: 0;
        color: var(--muted);
        font-size: 1.1rem;
      }

      .endpoint {
        display: grid;
        gap: 10px;
        padding: 18px;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: var(--panel);
      }

      .endpoint span {
        color: var(--muted);
        font-size: 0.92rem;
        font-weight: 650;
      }

      code,
      pre {
        font-family:
          "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
      }

      .endpoint code {
        overflow-wrap: anywhere;
        color: var(--text);
        font-size: 0.98rem;
      }

      .quick {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 14px;
        margin: 8px 0 28px;
      }

      .quick div,
      .client,
      .tools,
      .prompt {
        border: 1px solid var(--line);
        border-radius: 8px;
        background: var(--panel);
      }

      .quick div {
        padding: 16px;
      }

      .quick strong {
        display: block;
        margin-bottom: 6px;
      }

      .quick p {
        margin: 0;
        color: var(--muted);
      }

      .section-title {
        margin: 36px 0 12px;
        font-size: 1.4rem;
      }

      .clients {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px;
      }

      .client {
        display: grid;
        gap: 12px;
        align-content: start;
        padding: 18px;
      }

      .client h3 {
        margin: 0;
        font-size: 1.02rem;
      }

      .client p {
        margin: 0;
        color: var(--muted);
      }

      .client ol {
        margin: 0;
        padding-left: 1.25rem;
        color: var(--text);
      }

      .client li + li {
        margin-top: 4px;
      }

      pre {
        margin: 0;
        padding: 14px;
        overflow-x: auto;
        border-radius: 8px;
        background: var(--code-bg);
        color: var(--code-text);
        font-size: 0.86rem;
        line-height: 1.45;
      }

      .tools,
      .prompt {
        padding: 18px;
      }

      .tools ul {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px 16px;
        margin: 0;
        padding-left: 1.2rem;
      }

      .prompt {
        display: grid;
        gap: 12px;
      }

      .prompt p {
        margin: 0;
        color: var(--muted);
      }

      footer {
        margin-top: 34px;
        color: var(--muted);
        font-size: 0.92rem;
      }

      @media (max-width: 760px) {
        main {
          width: min(100% - 24px, 1120px);
          padding-top: 24px;
        }

        .quick,
        .clients,
        .tools ul {
          grid-template-columns: 1fr;
        }

        .hero {
          padding-top: 20px;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <section class="hero" aria-labelledby="page-title">
        <p class="eyebrow">Hosted MCP server</p>
        <h1 id="page-title">fpf-memory MCP</h1>
        <p class="lead">
          Connect chat clients, editors, and coding CLIs to compact, grounded FPF retrieval without pasting the full specification into every conversation.
        </p>
        <div class="endpoint">
          <span>Streamable HTTP endpoint</span>
          <code>${HOSTED_MCP_ENDPOINT}</code>
        </div>
      </section>

      <section class="quick" aria-label="First validation path">
        <div>
          <strong>1. Check health</strong>
          <p>Call <code>get_fpf_index_status</code> and distinguish index freshness from synthesizer availability.</p>
        </div>
        <div>
          <strong>2. Query a route</strong>
          <p>Ask for a compact project kickoff answer and expect <code>route:project-alignment</code> in <code>ids</code>.</p>
        </div>
        <div>
          <strong>3. Read exact docs</strong>
          <p>Use <code>read_fpf_doc</code> only when exact route or pattern wording matters.</p>
        </div>
      </section>

      <h2 class="section-title">Client Setup</h2>
      <section class="clients" aria-label="Client setup instructions">
        ${CLIENT_SECTIONS.map(renderClientSection).join('\n')}
      </section>

      <h2 class="section-title">Public Tools</h2>
      <section class="tools" aria-label="Public MCP tools">
        <ul>
          <li><code>browse_fpf_catalog</code></li>
          <li><code>search_fpf</code></li>
          <li><code>ask_fpf</code></li>
          <li><code>query_fpf_spec</code></li>
          <li><code>read_fpf_doc</code></li>
          <li><code>get_fpf_index_status</code></li>
        </ul>
      </section>

      <h2 class="section-title">Good First Prompt</h2>
      <section class="prompt" aria-label="Good first prompt">
        <pre><code>Use only fpf_memory. First call get_fpf_index_status. If the index is available, find the smallest FPF route for this work: &lt;describe work&gt;. Return Context | Route ID | Ordered IDs | Friction avoided | Acceptance check | Next move.</code></pre>
        <p>Keep route answers compact. Read exact generated docs only when wording matters, and do not paste the full FPF into the chat.</p>
      </section>

      <footer>
        Wiki reference: <a href="https://venikman.github.io/fpf-memory/connect-mcp">Connect MCP</a>.
        Source: <a href="https://github.com/venikman/fpf-memory">github.com/venikman/fpf-memory</a>.
      </footer>
    </main>
  </body>
</html>`;
}

function renderClientSection(section: (typeof CLIENT_SECTIONS)[number]): string {
  return `<article class="client" id="${section.id}">
          <h3>${section.title}</h3>
          <p>${section.summary}</p>
          <ol>
            ${section.body.map((line) => `<li>${line}</li>`).join('\n            ')}
          </ol>
          ${section.code ? `<pre><code>${escapeHtml(section.code)}</code></pre>` : ''}
          <a href="${section.href}">Reference docs</a>
        </article>`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
