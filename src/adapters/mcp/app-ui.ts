/**
 * MCP Apps (io.modelcontextprotocol/ui) surface for the fpf_reference server.
 *
 * Tools that benefit from a visual rendering declare `_meta.ui.resourceUri`
 * pointing at a `ui://` resource whose HTML the host renders in a sandboxed
 * iframe (AI SDK `experimental_MCPAppRenderer`, and other MCP Apps hosts).
 * Hosts without MCP Apps support ignore the metadata and keep using the
 * text/structuredContent channels, so this surface is purely additive.
 *
 * The app HTML is fully self-contained (inline CSS/JS, no external fetches)
 * because MCP App sandboxes typically block network access, and it speaks the
 * MCP Apps bridge protocol (JSON-RPC 2.0 over `postMessage`) directly instead
 * of bundling the ~330KB official app SDK into the size-monitored Vercel
 * function.
 */

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

/** MIME type required by MCP Apps hosts for UI resources. */
export const MCP_APP_MIME_TYPE = 'text/html;profile=mcp-app';

/** MCP Apps bridge protocol version implemented by the inline bridge. */
export const MCP_APP_PROTOCOL_VERSION = '2025-11-21';

/** Single shared viewer app for all app-enabled fpf_reference tools. */
export const FPF_APP_RESOURCE_URI = 'ui://fpf-reference/result-viewer';

export const FPF_APP_RESOURCE_NAME = 'FPF result viewer';

/**
 * Public tools whose results get the interactive viewer. Discovery and
 * answer tools only — status/read tools stay text-first.
 */
export const APP_ENABLED_TOOL_IDS: ReadonlySet<string> = new Set([
  'search_fpf',
  'browse_fpf_catalog',
  'ask_fpf',
  'query_fpf_spec',
]);

/**
 * Tool `_meta` advertising the app. Emits both the current nested key
 * (`_meta.ui.resourceUri`) and the legacy flat key (`_meta["ui/resourceUri"]`)
 * so pre-final-spec hosts still detect the app.
 */
export function getFpfAppToolMeta(
  toolId: string,
): Record<string, unknown> | undefined {
  if (!APP_ENABLED_TOOL_IDS.has(toolId)) {
    return undefined;
  }
  return {
    ui: { resourceUri: FPF_APP_RESOURCE_URI },
    'ui/resourceUri': FPF_APP_RESOURCE_URI,
  };
}

export function registerFpfAppResource(server: McpServer): void {
  server.registerResource(
    FPF_APP_RESOURCE_NAME,
    FPF_APP_RESOURCE_URI,
    {
      description:
        'Interactive viewer for fpf_reference discovery and answer tool results (MCP Apps HTML template).',
      mimeType: MCP_APP_MIME_TYPE,
    },
    () => ({
      contents: [
        {
          uri: FPF_APP_RESOURCE_URI,
          mimeType: MCP_APP_MIME_TYPE,
          text: renderFpfAppHtml(),
        },
      ],
    }),
  );
}

/**
 * The viewer picks its layout from the structured payload shape rather than
 * the tool name so it keeps working if the host omits `toolInfo`:
 * `hits` → search, `entries` → catalog, `markdown` → ask, `answer` → query.
 * Anything else falls back to pretty-printed JSON.
 */
export function renderFpfAppHtml(): string {
  return FPF_APP_HTML;
}

const FPF_APP_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>FPF result viewer</title>
<style>
  :root {
    --bg: #ffffff;
    --fg: #1a1d21;
    --fg-muted: #5c6570;
    --border: #d9dee3;
    --chip-bg: #eef1f4;
    --accent: #2563eb;
    --accent-soft: #dbeafe;
    --code-bg: #f4f6f8;
    color-scheme: light dark;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #16181c;
      --fg: #e8eaed;
      --fg-muted: #9aa4af;
      --border: #33383f;
      --chip-bg: #23272e;
      --accent: #7aa2f7;
      --accent-soft: #1e2a45;
      --code-bg: #1e2126;
    }
  }
  :root[data-theme="light"] {
    --bg: #ffffff;
    --fg: #1a1d21;
    --fg-muted: #5c6570;
    --border: #d9dee3;
    --chip-bg: #eef1f4;
    --accent: #2563eb;
    --accent-soft: #dbeafe;
    --code-bg: #f4f6f8;
  }
  :root[data-theme="dark"] {
    --bg: #16181c;
    --fg: #e8eaed;
    --fg-muted: #9aa4af;
    --border: #33383f;
    --chip-bg: #23272e;
    --accent: #7aa2f7;
    --accent-soft: #1e2a45;
    --code-bg: #1e2126;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 12px 14px;
    background: var(--bg);
    color: var(--fg);
    font: 14px/1.5 system-ui, -apple-system, "Segoe UI", sans-serif;
  }
  .muted { color: var(--fg-muted); }
  .header {
    display: flex;
    align-items: baseline;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }
  .header h1 { font-size: 15px; margin: 0; font-weight: 600; }
  .badge {
    display: inline-block;
    padding: 1px 8px;
    border-radius: 999px;
    background: var(--chip-bg);
    color: var(--fg-muted);
    font-size: 11px;
    white-space: nowrap;
  }
  .badge.kind { background: var(--accent-soft); color: var(--accent); }
  .card {
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 8px 10px;
    margin-bottom: 8px;
  }
  .card .title { font-weight: 600; }
  .card .id {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 12px;
    color: var(--accent);
  }
  .card .snippet { margin-top: 4px; font-size: 13px; color: var(--fg-muted); }
  .meter {
    height: 3px;
    border-radius: 2px;
    background: var(--chip-bg);
    margin-top: 6px;
    overflow: hidden;
  }
  .meter > div { height: 100%; background: var(--accent); }
  .chips { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px; }
  .prose h2 { font-size: 15px; margin: 12px 0 4px; }
  .prose h3 { font-size: 14px; margin: 10px 0 4px; }
  .prose p { margin: 6px 0; }
  .prose li { margin: 2px 0; }
  .prose code, .id-chip code {
    background: var(--code-bg);
    border-radius: 4px;
    padding: 0 4px;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 12px;
  }
  .prose pre {
    background: var(--code-bg);
    border-radius: 6px;
    padding: 8px 10px;
    overflow-x: auto;
  }
  .section-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--fg-muted);
    margin: 10px 0 4px;
  }
  details.raw { margin-top: 10px; font-size: 12px; }
  details.raw pre {
    background: var(--code-bg);
    border-radius: 6px;
    padding: 8px;
    overflow-x: auto;
    max-height: 320px;
  }
  .empty { color: var(--fg-muted); padding: 12px 0; }
</style>
</head>
<body>
<div id="root"><div class="empty">Waiting for tool result…</div></div>
<script>
(function () {
  'use strict';

  // --- Minimal MCP Apps bridge (JSON-RPC 2.0 over postMessage) -------------
  var PROTOCOL_VERSION = '${MCP_APP_PROTOCOL_VERSION}';
  var nextId = 1;
  var pending = {};

  function post(message) {
    window.parent.postMessage(message, '*');
  }
  function request(method, params) {
    var id = nextId++;
    post({ jsonrpc: '2.0', id: id, method: method, params: params });
    return new Promise(function (resolve) { pending[id] = resolve; });
  }
  function notify(method, params) {
    post({ jsonrpc: '2.0', method: method, params: params });
  }

  window.addEventListener('message', function (event) {
    var msg = event.data;
    if (!msg || msg.jsonrpc !== '2.0') return;
    if (msg.id !== undefined && msg.method === undefined) {
      var resolve = pending[msg.id];
      if (resolve) {
        delete pending[msg.id];
        resolve(msg);
      }
      return;
    }
    if (msg.method === undefined) return;
    if (msg.id !== undefined) {
      // Host-initiated request. We implement none beyond ping.
      if (msg.method === 'ping') {
        post({ jsonrpc: '2.0', id: msg.id, result: {} });
      } else {
        post({
          jsonrpc: '2.0',
          id: msg.id,
          error: { code: -32601, message: 'Method not implemented: ' + msg.method },
        });
      }
      return;
    }
    handleNotification(msg.method, msg.params || {});
  });

  function handleNotification(method, params) {
    if (method === 'ui/notifications/tool-input') {
      state.input = params.arguments || {};
      render();
    } else if (method === 'ui/notifications/tool-result') {
      state.result = params;
      render();
    } else if (method === 'ui/notifications/tool-cancelled') {
      state.cancelled = true;
      render();
    } else if (method === 'ui/notifications/host-context-changed') {
      applyHostContext(params);
    }
  }

  function applyHostContext(context) {
    if (!context) return;
    if (context.theme === 'light' || context.theme === 'dark') {
      document.documentElement.setAttribute('data-theme', context.theme);
    }
    if (context.toolInfo && context.toolInfo.tool && context.toolInfo.tool.name) {
      state.toolName = context.toolInfo.tool.name;
      render();
    }
  }

  // Report content height so the host can size the iframe.
  var lastHeight = 0;
  function reportSize() {
    var height = document.documentElement.scrollHeight;
    if (height !== lastHeight) {
      lastHeight = height;
      notify('ui/notifications/size-changed', { height: height });
    }
  }
  if (typeof ResizeObserver === 'function') {
    new ResizeObserver(reportSize).observe(document.documentElement);
  }

  request('ui/initialize', {
    protocolVersion: PROTOCOL_VERSION,
    appInfo: { name: 'fpf-reference-result-viewer', version: '1.0.0' },
    appCapabilities: {},
  }).then(function (response) {
    if (response.result && response.result.hostContext) {
      applyHostContext(response.result.hostContext);
    }
    notify('ui/notifications/initialized', {});
  });

  // --- Rendering ------------------------------------------------------------
  var state = { input: null, result: null, cancelled: false, toolName: null };
  var root = document.getElementById('root');

  function esc(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function chip(text, extraClass) {
    return '<span class="badge ' + (extraClass || '') + '">' + esc(text) + '</span>';
  }

  function idChips(ids, max) {
    var shown = ids.slice(0, max || 12);
    var html = shown
      .map(function (id) { return '<span class="id-chip"><code>' + esc(id) + '</code></span>'; })
      .join(' ');
    if (ids.length > shown.length) {
      html += ' <span class="muted">+' + (ids.length - shown.length) + ' more</span>';
    }
    return html;
  }

  // Tiny safe markdown: escape everything first, then line-based transforms.
  function md(text) {
    var lines = esc(text).split('\\n');
    var html = [];
    var inCode = false;
    var inList = false;
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (/^\`\`\`/.test(line)) {
        if (inList) { html.push('</ul>'); inList = false; }
        html.push(inCode ? '</pre>' : '<pre>');
        inCode = !inCode;
        continue;
      }
      if (inCode) { html.push(line); continue; }
      var isList = /^\\s*[-*] /.test(line);
      if (isList && !inList) { html.push('<ul>'); inList = true; }
      if (!isList && inList) { html.push('</ul>'); inList = false; }
      var heading = line.match(/^(#{1,4})\\s+(.*)$/);
      var body = heading ? heading[2] : isList ? line.replace(/^\\s*[-*] /, '') : line;
      body = body
        .replace(/\\*\\*([^*]+)\\*\\*/g, '<strong>$1</strong>')
        .replace(/\`([^\`]+)\`/g, '<code>$1</code>');
      if (heading) {
        var level = Math.min(heading[1].length + 1, 4);
        html.push('<h' + level + '>' + body + '</h' + level + '>');
      } else if (isList) {
        html.push('<li>' + body + '</li>');
      } else if (body.trim() !== '') {
        html.push('<p>' + body + '</p>');
      }
    }
    if (inList) html.push('</ul>');
    if (inCode) html.push('</pre>');
    return html.join('');
  }

  function structuredContentOf(result) {
    if (result.structuredContent && typeof result.structuredContent === 'object') {
      return result.structuredContent;
    }
    var content = Array.isArray(result.content) ? result.content : [];
    for (var i = 0; i < content.length; i++) {
      if (content[i] && content[i].type === 'text') {
        try { return JSON.parse(content[i].text); } catch (e) { /* not JSON */ }
      }
    }
    return null;
  }

  function nodeBadges(node) {
    var html = '';
    if (node.kind) html += chip(node.kind, 'kind');
    if (node.status) html += ' ' + chip(node.status);
    if (node.part) html += ' ' + chip(node.part);
    return html;
  }

  function renderSearch(data) {
    var hits = data.hits || [];
    var html = '<div class="header"><h1>' + hits.length + ' of ' + esc(data.total)
      + ' results</h1><span class="muted">for “' + esc(data.query) + '”</span></div>';
    if (hits.length === 0) {
      html += '<div class="empty">No FPF nodes matched this query.</div>';
    }
    var maxScore = hits.reduce(function (max, hit) { return Math.max(max, hit.score || 0); }, 0) || 1;
    for (var i = 0; i < hits.length; i++) {
      var hit = hits[i];
      html += '<div class="card">'
        + '<div><span class="title">' + esc(hit.title) + '</span> <span class="id">' + esc(hit.id) + '</span></div>'
        + '<div class="chips">' + nodeBadges(hit) + '</div>'
        + '<div class="snippet">' + esc(hit.snippet || '') + '</div>'
        + '<div class="meter"><div style="width:' + Math.round(100 * (hit.score || 0) / maxScore) + '%"></div></div>'
        + '</div>';
    }
    return html;
  }

  function renderCatalog(data) {
    var entries = data.entries || [];
    var filters = data.filters || {};
    var filterChips = ['part', 'status', 'kind']
      .filter(function (key) { return filters[key]; })
      .map(function (key) { return chip(key + ': ' + filters[key]); })
      .join(' ');
    var from = (data.offset || 0) + 1;
    var to = (data.offset || 0) + entries.length;
    var html = '<div class="header"><h1>FPF catalog</h1><span class="muted">'
      + (entries.length ? from + '–' + to : '0') + ' of ' + esc(data.total) + '</span>'
      + (filterChips ? ' ' + filterChips : '') + '</div>';
    if (entries.length === 0) {
      html += '<div class="empty">No catalog entries for these filters.</div>';
      if (data.didYouMean && data.didYouMean.part) {
        html += '<p class="muted">Did you mean part “' + esc(data.didYouMean.part) + '”?</p>';
      }
    }
    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      html += '<div class="card">'
        + '<div><span class="title">' + esc(entry.title) + '</span> <span class="id">' + esc(entry.id) + '</span></div>'
        + '<div class="chips">' + nodeBadges(entry) + '</div>'
        + '<div class="snippet">' + esc(entry.description || '') + '</div>'
        + '</div>';
    }
    if (data.nextOffset !== undefined) {
      html += '<p class="muted">More entries available — call browse_fpf_catalog with offset '
        + esc(data.nextOffset) + '.</p>';
    }
    return html;
  }

  function renderAnswer(data) {
    var isMarkdown = typeof data.markdown === 'string';
    var body = isMarkdown ? data.markdown : data.answer || '';
    var html = '<div class="header"><h1>FPF answer</h1>'
      + (data.mode ? chip(data.mode) : '')
      + (data.status ? chip(data.status) : '')
      + (typeof data.confidence === 'number'
        ? chip('confidence ' + Math.round(data.confidence * 100) + '%')
        : '')
      + '</div>';
    if (data.question) {
      html += '<p class="muted">“' + esc(data.question) + '”</p>';
    }
    html += '<div class="prose">' + (isMarkdown ? md(body) : '<p>' + esc(body) + '</p>') + '</div>';
    if (Array.isArray(data.ids) && data.ids.length) {
      html += '<div class="section-label">Grounding IDs</div><div class="chips">' + idChips(data.ids) + '</div>';
    }
    if (Array.isArray(data.constraints) && data.constraints.length) {
      html += '<div class="section-label">Constraints</div><ul>'
        + data.constraints.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('')
        + '</ul>';
    }
    if (Array.isArray(data.citations) && data.citations.length) {
      html += '<div class="section-label">Citations</div><ul>'
        + data.citations.slice(0, 20).map(function (c) { return '<li class="muted">' + esc(c) + '</li>'; }).join('')
        + '</ul>';
    }
    if (Array.isArray(data.gaps) && data.gaps.length) {
      html += '<div class="section-label">Gaps</div><ul>'
        + data.gaps.map(function (g) { return '<li class="muted">' + esc(g) + '</li>'; }).join('')
        + '</ul>';
    }
    return html;
  }

  function render() {
    if (state.cancelled) {
      root.innerHTML = '<div class="empty">Tool call was cancelled.</div>';
      reportSize();
      return;
    }
    if (!state.result) {
      var waitingFor = state.input && (state.input.query || state.input.question);
      root.innerHTML = '<div class="empty">Running'
        + (waitingFor ? ' “' + esc(waitingFor) + '”' : '') + '…</div>';
      reportSize();
      return;
    }
    var data = structuredContentOf(state.result);
    var html;
    if (data && Array.isArray(data.hits)) {
      html = renderSearch(data);
    } else if (data && Array.isArray(data.entries)) {
      html = renderCatalog(data);
    } else if (data && (typeof data.markdown === 'string' || typeof data.answer === 'string')) {
      html = renderAnswer(data);
    } else if (data) {
      html = '<div class="header"><h1>Tool result</h1></div><pre>' + esc(JSON.stringify(data, null, 2)) + '</pre>';
    } else {
      html = '<div class="empty">No structured result to display.</div>';
    }
    if (data) {
      html += '<details class="raw"><summary class="muted">Raw structured result</summary><pre>'
        + esc(JSON.stringify(data, null, 2)) + '</pre></details>';
    }
    root.innerHTML = html;
    reportSize();
  }
})();
</script>
</body>
</html>
`;
