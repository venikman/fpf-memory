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
  MCP_INTERFACE_CONTRACT_URL,
  MCP_ORIGIN_HOME_URL,
  MCP_SERVER_NAME,
  PUBLIC_MCP_TOOLS,
  WIKI_BASE_URL,
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

      .contract table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.9rem;
      }

      .contract th,
      .contract td {
        padding: 8px;
        border: 1px solid var(--line);
        text-align: left;
        vertical-align: top;
      }

      .contract th {
        color: var(--green);
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
          This is the MCP setup home. The human-readable FPF specification reference stays on <a href="${WIKI_BASE_URL}">${WIKI_BASE_URL}</a>.
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

      <h2 id="client-setup" class="section-title">Client Setup</h2>
      <section class="clients" aria-label="Client setup instructions">
        ${CLIENT_SETUP_SECTIONS.map(renderClientSection).join('\n')}
      </section>

      <h2 id="package-self-hosting" class="section-title">Package And Self-Hosting</h2>
      <section class="prompt" aria-label="Package and self-hosting options">
        <p>Use the hosted endpoint above when your client allows remote HTTP MCP servers. If your policy requires local or self-hosted tooling, run the same FPF Reference MCP runtime from source.</p>
        <pre><code>git clone https://github.com/venikman/fpf-memory.git
cd fpf-memory
bun install
bun run mcp</code></pre>
        <p>Use the full local surface only for contributor or operator work that needs expert inspection tools.</p>
        <pre><code>FPF_MCP_SURFACE=full bun run mcp</code></pre>
        <p>For clients that require an HTTP URL instead of a stdio command, start the local HTTP server and register its MCP route.</p>
        <pre><code>bun run start

http://localhost:4111/api/mcp/fpf_reference/mcp</code></pre>
      </section>

      <h2 id="recipes" class="section-title">Recipes</h2>
      <section class="clients" aria-label="MCP usage recipes">
        <article class="client">
          <h3>Find the right doorway</h3>
          <p>Use search or structured query before opening exact generated docs.</p>
          <pre><code>${escapeHtml('Use only the fpf_reference MCP server. Search or query FPF for the best route for this work: <describe work>. Return 3-8 exact IDs, why they matter, and what not to load yet.')}</code></pre>
        </article>
        <article class="client">
          <h3>Build a compact work packet</h3>
          <p>Ask for enough grounded context to start work without pasting the full FPF specification.</p>
          <pre><code>${escapeHtml('Use only the fpf_reference MCP server. Build an FPF work packet for <task>. Include goal, relevant route or IDs, operating questions, constraints, acceptance checks, risks, and one next move. Do not paste the whole FPF.')}</code></pre>
        </article>
        <article class="client">
          <h3>Review a PR</h3>
          <p>Combine bounded FPF retrieval with the actual diff, files, and CI evidence.</p>
          <pre><code>${escapeHtml('Use only the fpf_reference MCP server plus the PR diff, local files, and CI evidence. Review this PR through the PR or code review packet. Return Findings | FPF IDs | Evidence | Tests | Residual risk | Verdict. Lead with behavioral issues and cite exact files; do not paste the full FPF.')}</code></pre>
        </article>
        <article class="client">
          <h3>Dogfood a product role</h3>
          <p>Rotate adopter, reviewer, integrator, maintainer, and project-lead perspectives.</p>
          <pre><code>${escapeHtml('Use only bounded FPF retrieval plus direct product evidence. Act as <persona> trying to complete <job> with FPF Reference. Return Context | Persona/job | Surface | FPF IDs used | Evidence | Friction | Proposed improvement | Severity | Validation path.')}</code></pre>
        </article>
      </section>

      <h2 id="public-tools" class="section-title">Public Tools</h2>
      <section class="tools" aria-label="Public MCP tools">
        <ul>
          ${PUBLIC_MCP_TOOLS.map((tool) => `<li><code>${tool}</code></li>`).join('\n          ')}
        </ul>
      </section>

      <h2 id="operator-packaging" class="section-title">Operator Packaging</h2>
      <section class="prompt" aria-label="Operator packaging notes">
        <p>The hosted MCP runtime and the reference wiki are separate Vercel projects. The MCP project serves the Streamable HTTP endpoint, this setup page, and the freshness status JSON. The wiki project serves the static FPF reference.</p>
        <pre><code>bun run vercel:mcp:build
bun run vercel:mcp:deploy:prod

bun run vercel:website:build
bun run vercel:website:deploy:prod

bun run deploy:prod</code></pre>
        <p>Vercel MCP at <a href="https://mcp.vercel.com">https://mcp.vercel.com</a> is Vercel's operator-side control-plane MCP server. It is useful for deployment evidence and logs, but it is not the public <code>${MCP_SERVER_NAME}</code> FPF lookup endpoint.</p>
        <pre><code>codex mcp add vercel --url https://mcp.vercel.com

https://mcp.vercel.com/venikmans-projects/fpf-reference-mcp
https://mcp.vercel.com/venikmans-projects/fpf-sh</code></pre>
      </section>

      <h2 id="legacy-compatibility" class="section-title">Legacy Compatibility</h2>
      <section class="prompt" aria-label="Legacy compatibility">
        <p>The canonical server name is <code>${MCP_SERVER_NAME}</code>. The legacy name <code>${LEGACY_MCP_SERVER_NAME}</code> is compatibility-only and should not appear in new client setup.</p>
        <p>The old endpoint remains explicitly routed so stale clients fail cheaply with a migration signal instead of falling through to the hosted runtime.</p>
        <pre><code>${LEGACY_HOSTED_MCP_ENDPOINT}</code></pre>
      </section>

      <h2 id="interface-contract" class="section-title">Interface Contract</h2>
      <section class="contract" aria-label="Interface contract">
        <dl>
          <dt>Entity</dt>
          <dd>${escapeHtml(FPF_REFERENCE_INTERFACE_CONTRACT.entityOfConcern)}</dd>
          <dt>Purpose</dt>
          <dd>${escapeHtml(FPF_REFERENCE_INTERFACE_CONTRACT.purpose)}</dd>
          <dt>Governing FPF</dt>
          <dd>${renderContractRefs(FPF_REFERENCE_INTERFACE_CONTRACT.governingFpf)}</dd>
          <dt>Admissible use</dt>
          <dd>${renderContractList(FPF_REFERENCE_INTERFACE_CONTRACT.admissibleUse)}</dd>
          <dt>Non-admissible use</dt>
          <dd>${renderContractList(FPF_REFERENCE_INTERFACE_CONTRACT.nonAdmissibleUse)}</dd>
          <dt>Reliance gate</dt>
          <dd>${renderContractList(FPF_REFERENCE_INTERFACE_CONTRACT.relianceGate)}</dd>
          <dt>Freshness</dt>
          <dd>${renderContractList(FPF_REFERENCE_INTERFACE_CONTRACT.freshnessSemantics)}</dd>
          <dt>Output expectation</dt>
          <dd>${renderContractList(FPF_REFERENCE_INTERFACE_CONTRACT.outputExpectation)}</dd>
          <dt>Acceptance tests</dt>
          <dd>${renderContractList(FPF_REFERENCE_INTERFACE_CONTRACT.acceptanceTests)}</dd>
          <dt>Public tool schemas</dt>
          <dd>${renderToolContractTable()}</dd>
        </dl>
        <p>Section link: <a href="${MCP_INTERFACE_CONTRACT_URL}">${MCP_INTERFACE_CONTRACT_URL}</a>.</p>
      </section>

      <h2 id="first-successful-call" class="section-title">First Successful Call</h2>
      <section class="prompt" aria-label="First successful call">
        <pre><code>${escapeHtml(FIRST_SUCCESSFUL_CALL_PROMPT)}</code></pre>
        <p>Expect compact FPF IDs in <code>ids</code>. Check freshness at <a href="${HOSTED_MCP_STATUS_URL}">${HOSTED_MCP_STATUS_URL}</a>.</p>
      </section>

      <h2 id="good-first-prompt" class="section-title">Good First Prompt</h2>
      <section class="prompt" aria-label="Good first prompt">
        <pre><code>${escapeHtml(GOOD_FIRST_PROMPT)}</code></pre>
        <p>${GOOD_FIRST_PROMPT_FOOTER}</p>
      </section>

      <footer>
        MCP setup home: <a href="${MCP_ORIGIN_HOME_URL}">${MCP_ORIGIN_HOME_URL}</a>.
        FPF reference: <a href="${WIKI_BASE_URL}">${WIKI_BASE_URL}</a>.
        Projection repo: <a href="https://github.com/venikman/fpf-memory">github.com/venikman/fpf-memory</a> · upstream FPF: <a href="https://github.com/ailev/FPF">github.com/ailev/FPF</a>.
      </footer>
    </main>
  </body>
</html>`;
}

function renderContractList(items: readonly string[]): string {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
}

function renderContractRefs(items: readonly { id: string; purpose: string }[]): string {
  return `<ul>${items.map((item) =>
    `<li><code>${escapeHtml(item.id)}</code> ${escapeHtml(item.purpose)}</li>`
  ).join('')}</ul>`;
}

function renderToolContractTable(): string {
  const rows = FPF_REFERENCE_INTERFACE_CONTRACT.publicTools
    .map((tool) => `<tr>
      <td><code>${escapeHtml(tool.name)}</code></td>
      <td>${escapeHtml(tool.purpose)}</td>
      <td><code>${escapeHtml(tool.inputSchema)}</code><br />${escapeHtml(tool.inputSummary)}</td>
      <td><code>${escapeHtml(tool.outputSchema)}</code><br />${escapeHtml(tool.outputSummary)}</td>
      <td>${escapeHtml(tool.acceptanceCue)}</td>
    </tr>`)
    .join('');
  return `<table>
    <thead>
      <tr><th>Tool</th><th>Purpose</th><th>Input</th><th>Output</th><th>Acceptance cue</th></tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>`;
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
