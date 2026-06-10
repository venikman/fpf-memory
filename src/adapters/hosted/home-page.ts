import {
  CLIENT_SETUP_SECTIONS,
  FIRST_SUCCESSFUL_CALL_PROMPT,
  FPF_REFERENCE_INTERFACE_CONTRACT,
  GOOD_FIRST_PROMPT,
  GOOD_FIRST_PROMPT_FOOTER,
  HOSTED_MCP_ENDPOINT,
  HOSTED_MCP_STATUS_URL,
  LEGACY_HOSTED_MCP_ENDPOINT,
  LEGACY_MCP_SERVER_NAME,
  MCP_SERVER_NAME,
  PUBLIC_MCP_TOOLS,
  WIKI_CONNECT_MCP_URL,
  WIKI_INTERFACE_CONTRACT_URL,
} from '../../core/public-copy.js';

export function renderHostedHomePage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="canonical" href="https://mcp.fpf.sh/" />
    <title>FPF Reference MCP</title>
    <style>
      :root {
        color-scheme: light;
        --bg: #f6efe5;
        --panel: #fffaf2;
        --panel-soft: #f2eadf;
        --text: #20241e;
        --muted: #62685e;
        --faint: #7a766b;
        --line: rgb(37 43 36 / 18%);
        --line-strong: #252b24;
        --accent: #a23b2e;
        --green: #28513f;
        --gold: #c2923a;
        --code-bg: #12160f;
        --code-text: #d7b36a;
        --font-display: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        --font-serif: Georgia, "Times New Roman", serif;
        --font-mono: "SF Mono", ui-monospace, Menlo, Monaco, Consolas, monospace;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        background: var(--bg);
        color: var(--text);
        font-family: var(--font-display);
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
      }

      a {
        color: var(--accent);
        text-decoration-thickness: 0.08em;
        text-underline-offset: 0.18em;
      }

      a:hover {
        color: var(--green);
      }

      main {
        width: min(1180px, calc(100% - 40px));
        margin: 0 auto;
        padding: 46px 0 58px;
      }

      .hero {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(320px, 0.7fr);
        min-height: 470px;
        border: 1px solid var(--line-strong);
        background: var(--panel);
      }

      .hero > * {
        margin-left: clamp(30px, 5vw, 64px);
        margin-right: clamp(30px, 5vw, 64px);
      }

      .hero .eyebrow {
        align-self: end;
        margin-top: clamp(30px, 5vw, 64px);
      }

      .eyebrow {
        margin: 0;
        color: var(--accent);
        font-family: var(--font-mono);
        font-size: 0.72rem;
        font-weight: 600;
        letter-spacing: 0;
      }

      h1 {
        margin: 0;
        max-width: 10ch;
        font-family: var(--font-serif);
        font-size: clamp(4rem, 7vw, 7rem);
        font-weight: 500;
        line-height: 0.9;
        letter-spacing: 0;
      }

      h2,
      h3 {
        letter-spacing: 0;
      }

      .lead {
        max-width: 44rem;
        margin: 0;
        color: var(--muted);
        font-size: 1.05rem;
        line-height: 1.55;
      }

      .endpoint {
        display: grid;
        grid-column: 2;
        grid-row: 1 / span 4;
        align-content: center;
        gap: 14px;
        padding: 18px;
        border-left: 1px solid var(--line-strong);
        border-radius: 0;
        background: #12160f;
      }

      .endpoint span {
        color: var(--accent);
        font-family: var(--font-mono);
        font-size: 0.72rem;
        font-weight: 600;
      }

      code,
      pre {
        font-family: var(--font-mono);
      }

      .endpoint > code {
        overflow-wrap: anywhere;
        padding: 18px;
        border: 1px solid rgb(246 239 229 / 18%);
        background: #0c100a;
        color: var(--gold);
        font-size: 0.82rem;
        line-height: 1.55;
      }

      .endpoint small {
        color: rgb(246 239 229 / 72%);
      }

      .endpoint small code {
        overflow-wrap: anywhere;
        padding: 1px 4px;
        background: #0c100a;
        color: var(--gold);
      }

      .quick {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 0;
        margin: 0 0 34px;
        border-right: 1px solid var(--line-strong);
        border-bottom: 1px solid var(--line-strong);
        border-left: 1px solid var(--line-strong);
      }

      .quick div,
      .client,
      .tools,
      .prompt {
        border: 0;
        border-radius: 0;
        background: var(--panel);
      }

      .quick div {
        padding: 20px;
        border-right: 1px solid var(--line);
      }

      .quick strong {
        display: block;
        margin-bottom: 6px;
        color: var(--green);
        font-size: 1.25rem;
        line-height: 1.08;
      }

      .quick p {
        margin: 0;
        color: var(--muted);
      }

      .section-title {
        margin: 42px 0 14px;
        padding-top: 18px;
        border-top: 1px solid var(--line-strong);
        color: var(--text);
        font-family: var(--font-serif);
        font-size: clamp(2.4rem, 4vw, 4rem);
        font-weight: 500;
        line-height: 0.94;
      }

      .clients {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0;
        border-top: 1px solid var(--line-strong);
        border-left: 1px solid var(--line-strong);
      }

      .client {
        display: grid;
        gap: 12px;
        align-content: start;
        padding: 22px;
        border-right: 1px solid var(--line-strong);
        border-bottom: 1px solid var(--line-strong);
      }

      .client h3 {
        margin: 0;
        color: var(--green);
        font-size: clamp(1.4rem, 2.2vw, 2rem);
        line-height: 1;
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
        border: 1px solid rgb(246 239 229 / 18%);
        border-radius: 0;
        background: var(--code-bg);
        color: var(--code-text);
        font-size: 0.86rem;
        line-height: 1.45;
      }

      .tools,
      .contract,
      .prompt {
        border: 1px solid var(--line-strong);
        padding: 18px;
      }

      .contract dl {
        display: grid;
        grid-template-columns: minmax(120px, 0.28fr) minmax(0, 1fr);
        gap: 10px 16px;
        margin: 0;
      }

      .contract dt {
        color: var(--green);
        font-weight: 700;
      }

      .contract dd {
        margin: 0;
        color: var(--muted);
      }

      .contract ul {
        margin: 0;
        padding-left: 1.1rem;
      }

      .contract li + li {
        margin-top: 4px;
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
        font-family: var(--font-mono);
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
          grid-template-columns: 1fr;
          min-height: auto;
        }

        .hero > * {
          margin-left: 28px;
          margin-right: 28px;
        }

        .endpoint {
          grid-column: auto;
          grid-row: auto;
          margin: 28px 0 0;
          border-top: 1px solid var(--line-strong);
          border-left: 0;
          border-radius: 0;
        }

        h1 {
          font-size: 48px;
          line-height: 0.94;
        }

        .quick div,
        .client {
          border-right: 0;
        }

        .contract dl {
          display: block;
        }

        .contract dd {
          margin: 0 0 12px;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <section class="hero" aria-labelledby="page-title">
        <p class="eyebrow">Hosted MCP server</p>
        <h1 id="page-title">FPF Reference MCP</h1>
        <p class="lead">
          Connect chat clients, editors, and coding CLIs to bounded FPF lookup by stable ID — not agent memory, not a web page. Register the server as <code>${MCP_SERVER_NAME}</code> (not <code>${LEGACY_MCP_SERVER_NAME}</code>).
        </p>
        <p class="lead">
          Full wiki setup guide: <a href="${WIKI_CONNECT_MCP_URL}">${WIKI_CONNECT_MCP_URL}</a>.
        </p>
        <div class="endpoint">
          <span>Streamable HTTP endpoint</span>
          <code>${HOSTED_MCP_ENDPOINT}</code>
          <small>Legacy <code>${LEGACY_HOSTED_MCP_ENDPOINT}</code> is blocked during the May 2026 mitigation; use the endpoint above.</small>
          <small>Browser GET returns <strong>405 Method Not Allowed</strong>; MCP clients should use POST Streamable HTTP JSON-RPC requests.</small>
        </div>
      </section>

      <section class="quick" aria-label="First validation path">
        <div>
          <strong>1. Check health</strong>
          <p>Call <code>get_fpf_index_status</code> and confirm the compiled index is fresh.</p>
        </div>
        <div>
          <strong>2. Query context</strong>
          <p>Ask for a compact project kickoff answer and expect stable FPF IDs in <code>ids</code>.</p>
        </div>
        <div>
          <strong>3. Read exact docs</strong>
          <p>Use <code>read_fpf_doc</code> only when exact pattern or generated-doc wording matters.</p>
        </div>
      </section>

      <h2 class="section-title">Client Setup</h2>
      <section class="clients" aria-label="Client setup instructions">
        ${CLIENT_SETUP_SECTIONS.map(renderClientSection).join('\n')}
      </section>

      <h2 class="section-title">Public Tools</h2>
      <section class="tools" aria-label="Public MCP tools">
        <ul>
          ${PUBLIC_MCP_TOOLS.map((tool) => `<li><code>${tool}</code></li>`).join('\n          ')}
        </ul>
      </section>

      <h2 class="section-title">Interface Contract</h2>
      <section class="contract" aria-label="Interface contract">
        <dl>
          <dt>Entity</dt>
          <dd>${escapeHtml(FPF_REFERENCE_INTERFACE_CONTRACT.entityOfConcern)}</dd>
          <dt>Purpose</dt>
          <dd>${escapeHtml(FPF_REFERENCE_INTERFACE_CONTRACT.purpose)}</dd>
          <dt>Reliance gate</dt>
          <dd>${renderContractList(FPF_REFERENCE_INTERFACE_CONTRACT.relianceGate)}</dd>
          <dt>Freshness</dt>
          <dd>${renderContractList(FPF_REFERENCE_INTERFACE_CONTRACT.freshnessSemantics)}</dd>
        </dl>
        <p>Full card: <a href="${WIKI_INTERFACE_CONTRACT_URL}">${WIKI_INTERFACE_CONTRACT_URL}</a>.</p>
      </section>

      <h2 class="section-title">First Successful Call</h2>
      <section class="prompt" aria-label="First successful call">
        <pre><code>${escapeHtml(FIRST_SUCCESSFUL_CALL_PROMPT)}</code></pre>
        <p>Expect compact FPF IDs in <code>ids</code>. Check freshness at <a href="${HOSTED_MCP_STATUS_URL}">${HOSTED_MCP_STATUS_URL}</a>.</p>
      </section>

      <h2 class="section-title">Good First Prompt</h2>
      <section class="prompt" aria-label="Good first prompt">
        <pre><code>${escapeHtml(GOOD_FIRST_PROMPT)}</code></pre>
        <p>${GOOD_FIRST_PROMPT_FOOTER}</p>
      </section>

      <footer>
        Wiki connect guide: <a href="${WIKI_CONNECT_MCP_URL}">${WIKI_CONNECT_MCP_URL}</a>.
        Projection repo: <a href="https://github.com/venikman/fpf-memory">github.com/venikman/fpf-memory</a> · upstream FPF: <a href="https://github.com/ailev/FPF">github.com/ailev/FPF</a>.
      </footer>
    </main>
  </body>
</html>`;
}

function renderContractList(items: readonly string[]): string {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
}

function renderClientSection(section: (typeof CLIENT_SETUP_SECTIONS)[number]): string {
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
