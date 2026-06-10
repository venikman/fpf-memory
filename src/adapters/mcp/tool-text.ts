/**
 * Human-readable text mirrors for MCP tool results.
 *
 * Text-only MCP clients render only the `content` blocks of a tool result,
 * so every tool must pair its `structuredContent` with a text block that
 * carries the same load-bearing information. Renderers summarize — they
 * never add semantics beyond the structured payload.
 */

import {
  arrayOfRecords,
  arrayOfStrings,
  numberField,
  recordField,
  stringField,
} from '../../core/unknown-fields.js';

// Cap list-style renderings so a caller-requested 500-entry page does not
// double the response size on the text channel. The structured payload
// always carries the complete page.
const MAX_LISTED_ENTRIES = 100;
const MAX_LISTED_IDS = 30;
const MAX_ANCHOR_TEXT_CHARS = 1_000;
const MAX_CITATION_TEXT_CHARS = 300;
const MAX_ENTRY_LINE_CHARS = 160;
// read_fpf_doc's primary deliverable is the exact page wording, so the text
// mirror carries the markdown body itself, capped well above typical pattern
// pages; oversized bodies stay complete in structuredContent.markdown.
const MAX_DOC_TEXT_CHARS = 10_000;

export function renderToolContent(
  toolId: string,
  structuredContent: Record<string, unknown>,
): string {
  const markdown = structuredContent.markdown;
  if (typeof markdown === 'string' && toolId === 'ask_fpf') {
    return markdown;
  }

  switch (toolId) {
    case 'query_fpf_spec':
      return renderQueryAnswer(structuredContent);
    case 'get_fpf_index_status':
      return renderIndexStatus(structuredContent);
    case 'browse_fpf_catalog':
      return renderBrowseCatalog(structuredContent);
    case 'search_fpf':
      return renderSearch(structuredContent);
    case 'read_fpf_doc':
      return renderReadFpfDocFallback(structuredContent);
    case 'inspect_fpf_node':
      return renderInspectNode(structuredContent);
    case 'inspect_fpf_anchor':
      return renderInspectAnchor(structuredContent);
    case 'expand_fpf_citations':
      return renderExpandCitations(structuredContent);
    case 'trace_fpf_path':
      return renderTrace(structuredContent);
    case 'refresh_fpf_index':
      return renderRefreshAudit(structuredContent);
    default: {
      const answer = structuredContent.answer;
      if (typeof answer === 'string') {
        return answer;
      }
      const status = structuredContent.status;
      const summary = status ? ` status=${String(status)}` : '';
      return `${toolId} returned structured content.${summary}`;
    }
  }
}

/**
 * query_fpf_spec promises a bounded answer *with IDs, citations, and
 * constraints* — mirror those grounding fields after the answer so a
 * text-only client can chain into read_fpf_doc / expand_fpf_citations
 * instead of receiving the bare answer sentence.
 */
function renderQueryAnswer(content: Record<string, unknown>): string {
  const answer = stringField(content.answer);
  const status = stringField(content.status);
  if (!answer) {
    return `query_fpf_spec returned structured content.${status ? ` status=${status}` : ''}`;
  }

  const grounding: string[] = [];
  const confidence = numberField(content.confidence);
  const statusParts = [
    status ? `status ${status}` : undefined,
    confidence !== undefined ? `confidence ${confidence}` : undefined,
  ].filter(Boolean);
  if (statusParts.length > 0) grounding.push(`- ${statusParts.join(', ')}`);
  const ids = arrayOfStrings(content.ids);
  if (ids) grounding.push(`- ids: ${joinCapped(ids)}`);
  const citations = arrayOfStrings(content.citations);
  if (citations) grounding.push(`- citations: ${joinCapped(citations)}`);
  const constraints = arrayOfStrings(content.constraints);
  if (constraints) {
    grounding.push('- constraints:');
    for (const constraint of constraints.slice(0, MAX_LISTED_IDS)) {
      grounding.push(`  - ${truncate(constraint, MAX_ENTRY_LINE_CHARS)}`);
    }
    if (constraints.length > MAX_LISTED_IDS) {
      grounding.push(`  - … (${constraints.length - MAX_LISTED_IDS} more)`);
    }
  }
  const gaps = arrayOfStrings(content.gaps);
  if (gaps) {
    grounding.push('- gaps:');
    for (const gap of gaps.slice(0, MAX_LISTED_IDS)) {
      grounding.push(`  - ${truncate(gap, MAX_ENTRY_LINE_CHARS)}`);
    }
    if (gaps.length > MAX_LISTED_IDS) {
      grounding.push(`  - … (${gaps.length - MAX_LISTED_IDS} more)`);
    }
  }

  if (grounding.length === 0) {
    return answer;
  }
  return [answer, '', 'Grounding:', ...grounding].join('\n');
}

function renderIndexStatus(content: Record<string, unknown>): string {
  const fresh = content.fresh === true;
  const snapshotExists = content.snapshotExists === true;
  const artifacts = recordField(content.artifacts) ?? {};
  const artifactNames = Object.keys(artifacts);
  const presentNames = artifactNames.filter((name) => artifacts[name] === true);
  const missingNames = artifactNames.filter((name) => artifacts[name] !== true);
  const sessionCache = recordField(content.sessionCache) ?? {};

  const headline = !snapshotExists
    ? 'FPF index status: no snapshot — the index has not been built.'
    : fresh
      ? 'FPF index status: fresh — snapshot matches the current source.'
      : 'FPF index status: stale — snapshot does not match the current source.';

  const lines = [headline];
  const sourcePath = stringField(content.sourcePath);
  if (sourcePath) lines.push(`- source: ${sourcePath}`);
  const builtAt = stringField(content.builtAt);
  const sourceHash = stringField(content.sourceHash);
  if (builtAt || sourceHash) {
    lines.push(
      `- snapshot: built ${builtAt ?? 'unknown'}${sourceHash ? ` from ${sourceHash}` : ''}`,
    );
  }
  const currentSourceHash = stringField(content.currentSourceHash);
  if (currentSourceHash) lines.push(`- current source hash: ${currentSourceHash}`);
  if (artifactNames.length > 0) {
    lines.push(
      `- artifacts: ${presentNames.length}/${artifactNames.length} present${
        missingNames.length > 0 ? ` (missing: ${missingNames.join(', ')})` : ''
      }`,
    );
  }
  if (typeof sessionCache.enabled === 'boolean') {
    lines.push(
      `- session cache: ${sessionCache.enabled ? 'enabled' : 'disabled'} (${
        numberField(sessionCache.activeSessions) ?? 0
      }/${numberField(sessionCache.maxSessions) ?? 0} active)`,
    );
  }
  return lines.join('\n');
}

function renderBrowseCatalog(content: Record<string, unknown>): string {
  const entries = arrayOfRecords(content.entries) ?? [];
  const total = numberField(content.total) ?? entries.length;
  const offset = numberField(content.offset) ?? 0;
  const nextOffset = numberField(content.nextOffset);

  const lines: string[] = [];
  if (entries.length === 0) {
    lines.push(`FPF catalog: no entries matched (total ${total}).`);
  } else {
    lines.push(
      `FPF catalog: entries ${offset + 1}–${offset + entries.length} of ${total}.`,
    );
    for (const entry of entries.slice(0, MAX_LISTED_ENTRIES)) {
      lines.push(`- ${renderCatalogEntryLine(entry)}`);
    }
    if (entries.length > MAX_LISTED_ENTRIES) {
      lines.push(
        `- … (${entries.length - MAX_LISTED_ENTRIES} more on this page; see structuredContent.entries)`,
      );
    }
  }

  const didYouMean = recordField(content.didYouMean);
  const suggestion = didYouMean ? stringField(didYouMean.part) : undefined;
  if (suggestion) {
    lines.push(`Did you mean part "${suggestion}"?`);
  }
  if (nextOffset !== undefined) {
    lines.push(`Next page: call browse_fpf_catalog with offset: ${nextOffset}.`);
  }
  return lines.join('\n');
}

function renderCatalogEntryLine(entry: Record<string, unknown>): string {
  const id = stringField(entry.id) ?? 'unknown';
  const kind = stringField(entry.kind);
  const status = stringField(entry.status);
  const title = stringField(entry.title);
  const description = stringField(entry.description);
  const tag = [kind, status].filter(Boolean).join(', ');
  const head = `${id}${tag ? ` [${tag}]` : ''}${title ? ` ${title}` : ''}`;
  const line = description && description !== title ? `${head} — ${description}` : head;
  return truncate(line, MAX_ENTRY_LINE_CHARS);
}

function renderSearch(content: Record<string, unknown>): string {
  const query = stringField(content.query) ?? '';
  const hits = arrayOfRecords(content.hits) ?? [];
  const total = numberField(content.total) ?? hits.length;

  if (hits.length === 0) {
    return `Search "${query}": no hits.`;
  }

  const lines = [`Search "${query}": ${total} hits (showing ${hits.length}).`];
  for (const hit of hits.slice(0, MAX_LISTED_ENTRIES)) {
    const id = stringField(hit.id) ?? 'unknown';
    const kind = stringField(hit.kind);
    const title = stringField(hit.title);
    const snippet = stringField(hit.snippet);
    lines.push(
      `- ${id}${kind ? ` [${kind}]` : ''}${title ? ` ${title}` : ''}${
        snippet ? `: ${snippet}` : ''
      }`,
    );
  }
  return lines.join('\n');
}

function renderInspectNode(content: Record<string, unknown>): string {
  const selector = stringField(content.selector) ?? '';
  const node = recordField(content.node);
  if (!node || stringField(content.status) === 'not_found') {
    return `inspect_fpf_node: selector "${selector}" did not resolve to a known FPF node.`;
  }

  const lines = [
    `${stringField(node.id) ?? selector}${nodeTag(node)} (resolved as ${
      stringField(content.resolvedAs) ?? 'unknown'
    })`,
  ];
  const anchors = arrayOfRecords(content.anchors) ?? [];
  if (anchors.length > 0) {
    lines.push('Anchors:');
    for (const anchor of anchors.slice(0, MAX_LISTED_IDS)) {
      lines.push(
        `- ${stringField(anchor.id) ?? 'unknown'} — ${stringField(anchor.heading) ?? ''} (${
          stringField(anchor.role) ?? 'other'
        })`,
      );
    }
    if (anchors.length > MAX_LISTED_IDS) {
      lines.push(`- … (${anchors.length - MAX_LISTED_IDS} more)`);
    }
  }
  const neighbors = arrayOfRecords(content.neighbors) ?? [];
  if (neighbors.length > 0) {
    lines.push('Neighbors:');
    for (const neighbor of neighbors.slice(0, MAX_LISTED_IDS)) {
      lines.push(
        `- ${stringField(neighbor.id) ?? 'unknown'}${nodeTag(neighbor)} (${
          stringField(neighbor.relation) ?? 'related'
        })`,
      );
    }
    if (neighbors.length > MAX_LISTED_IDS) {
      lines.push(`- … (${neighbors.length - MAX_LISTED_IDS} more)`);
    }
  }
  return lines.join('\n');
}

function renderInspectAnchor(content: Record<string, unknown>): string {
  const anchorId = stringField(content.anchorId) ?? '';
  const anchor = recordField(content.anchor);
  if (!anchor || stringField(content.status) === 'not_found') {
    return `inspect_fpf_anchor: anchor "${anchorId}" was not found.`;
  }

  const ownerNode = recordField(content.ownerNode);
  const lines = [
    `${stringField(anchor.id) ?? anchorId} — ${stringField(anchor.heading) ?? ''} (${
      stringField(anchor.role) ?? 'other'
    })${
      ownerNode
        ? ` on ${stringField(ownerNode.id) ?? 'unknown'}${nodeTag(ownerNode)}`
        : ''
    }`,
  ];
  const text = stringField(anchor.plainText) ?? stringField(anchor.text);
  if (text) {
    lines.push('', truncate(text, MAX_ANCHOR_TEXT_CHARS));
  }
  return lines.join('\n');
}

function renderExpandCitations(content: Record<string, unknown>): string {
  const items = arrayOfRecords(content.items) ?? [];
  if (items.length === 0) {
    return 'expand_fpf_citations: no citations expanded.';
  }

  const lines = [`Expanded ${items.length} citation${items.length === 1 ? '' : 's'}:`];
  for (const item of items) {
    const citationId = stringField(item.citationId) ?? 'unknown';
    const status = stringField(item.status) ?? 'unknown';
    if (status !== 'ok') {
      lines.push(`- ${citationId}: ${status}`);
      continue;
    }
    const anchor = recordField(item.anchor);
    const ownerNode = recordField(item.ownerNode);
    const owner = ownerNode
      ? ` on ${stringField(ownerNode.id) ?? 'unknown'}${
          stringField(ownerNode.title) ? ` ${stringField(ownerNode.title)}` : ''
        }`
      : '';
    const text = anchor
      ? (stringField(anchor.plainText) ?? stringField(anchor.text))
      : undefined;
    lines.push(
      `- ${citationId} (${status})${owner}${
        text ? `: ${truncate(text, MAX_CITATION_TEXT_CHARS)}` : ''
      }`,
    );
  }
  return lines.join('\n');
}

function renderTrace(content: Record<string, unknown>): string {
  const question = stringField(content.question) ?? '';
  const mode = stringField(content.mode) ?? 'compact';
  const status = stringField(content.status) ?? 'unknown';
  const sufficient = content.sufficient === true;

  const lines = [
    `Trace for "${question}" (${mode}): status ${status}, ${
      sufficient ? 'sufficient' : 'insufficient'
    }.`,
  ];
  const normalized = stringField(content.normalizedQuestion);
  if (normalized) lines.push(`- normalized: ${normalized}`);
  const selectedNodes = arrayOfStrings(content.selectedNodeIds);
  if (selectedNodes && selectedNodes.length > 0) {
    lines.push(`- selected nodes: ${joinCapped(selectedNodes)}`);
  }
  const selectedAnchors = arrayOfStrings(content.selectedAnchorIds);
  if (selectedAnchors && selectedAnchors.length > 0) {
    lines.push(`- selected anchors: ${joinCapped(selectedAnchors)}`);
  }
  // The tool description promises candidate scores and graph expansions —
  // the diagnostic core of the trace (why candidates won or lost) — so the
  // text mirror must carry them, not just the selected slices.
  const candidateScores = arrayOfRecords(content.candidateScores) ?? [];
  if (candidateScores.length > 0) {
    lines.push('Candidates:');
    for (const candidate of candidateScores.slice(0, MAX_LISTED_IDS)) {
      const reasons = arrayOfStrings(candidate.reasons);
      lines.push(
        `- ${stringField(candidate.nodeId) ?? 'unknown'}${
          stringField(candidate.kind) ? ` [${stringField(candidate.kind)}]` : ''
        } score ${numberField(candidate.score) ?? '?'}${
          reasons ? `: ${truncate(reasons.join('; '), MAX_ENTRY_LINE_CHARS)}` : ''
        }`,
      );
    }
    if (candidateScores.length > MAX_LISTED_IDS) {
      lines.push(`- … (${candidateScores.length - MAX_LISTED_IDS} more)`);
    }
  }
  const expansions = arrayOfRecords(content.graphExpansions) ?? [];
  if (expansions.length > 0) {
    lines.push('Graph expansions:');
    for (const expansion of expansions.slice(0, MAX_LISTED_IDS)) {
      const reason = stringField(expansion.reason);
      lines.push(
        `- ${stringField(expansion.from) ?? 'unknown'} -[${
          stringField(expansion.relation) ?? 'related'
        }]-> ${stringField(expansion.to) ?? 'unknown'}${reason ? ` (${reason})` : ''}`,
      );
    }
    if (expansions.length > MAX_LISTED_IDS) {
      lines.push(`- … (${expansions.length - MAX_LISTED_IDS} more)`);
    }
  }
  return lines.join('\n');
}

function renderRefreshAudit(content: Record<string, unknown>): string {
  const rebuilt = content.rebuilt === true;
  const reason = stringField(content.reason) ?? 'unknown';
  const compiler = recordField(content.compiler) ?? {};
  const compiledNodes = numberField(compiler.compiledNodes);
  const anchorCount = numberField(compiler.anchorCount);
  const builtAt = stringField(content.builtAt);
  const sourceHash = stringField(content.sourceHash);

  const headline = rebuilt
    ? `FPF index rebuilt (${reason}).`
    : `FPF index already current (${reason}); not rebuilt.`;
  const lines = [headline];
  if (compiledNodes !== undefined || anchorCount !== undefined) {
    lines.push(
      `- compiled: ${compiledNodes ?? 'unknown'} nodes${
        anchorCount !== undefined ? `, ${anchorCount} anchors` : ''
      }`,
    );
  }
  if (builtAt || sourceHash) {
    lines.push(
      `- snapshot: built ${builtAt ?? 'unknown'}${sourceHash ? ` from ${sourceHash}` : ''}`,
    );
  }
  return lines.join('\n');
}

function nodeTag(node: Record<string, unknown>): string {
  const kind = stringField(node.kind);
  const title = stringField(node.title);
  return `${kind ? ` [${kind}]` : ''}${title ? ` ${title}` : ''}`;
}

/**
 * Build the text-content fallback for `read_fpf_doc`. Earlier this
 * was a single sentence pointing at structuredContent.markdown;
 * callers reading only the text channel got nothing actionable.
 *
 * The fallback mirrors the structured payload: title, node ID,
 * canonical doc paths, full markdown size, the first few outline
 * headings, and — in full mode — the markdown body itself (capped at
 * MAX_DOC_TEXT_CHARS), since the exact page wording is the tool's
 * primary deliverable and text-only clients cannot reach
 * structuredContent.markdown.
 */
function renderReadFpfDocFallback(
  structuredContent: Record<string, unknown>,
): string {
  const nodeId = stringField(structuredContent.nodeId);
  const title = stringField(structuredContent.title);
  const status = stringField(structuredContent.status);

  if (!nodeId || status === 'not_found') {
    return `read_fpf_doc: selector did not resolve to a known FPF node.${
      status ? ` status=${status}` : ''
    }`;
  }

  const docRef = (structuredContent.docRef ?? {}) as Record<string, unknown>;
  const staticPath = stringField(docRef.staticPath);
  const markdownPath = stringField(docRef.markdownPath);
  const markdownChars = numberField(structuredContent.markdownChars);
  const truncated = structuredContent.truncated === true;
  const headings = arrayOfStrings(structuredContent.headings);
  const preview = stringField(structuredContent.preview);

  const lines: string[] = [];
  lines.push(`# ${title ?? nodeId}`);
  const meta: string[] = [`node \`${nodeId}\``];
  if (staticPath) meta.push(`page \`${staticPath}\``);
  if (markdownPath) meta.push(`markdown \`${markdownPath}\``);
  if (markdownChars !== undefined) {
    meta.push(`${markdownChars} chars${truncated ? ' (truncated)' : ''}`);
  }
  lines.push(meta.join(' · '));

  if (headings && headings.length > 0) {
    lines.push('');
    lines.push('Outline:');
    for (const heading of headings.slice(0, 8)) {
      lines.push(`- ${heading}`);
    }
    if (headings.length > 8) {
      lines.push(`- … (${headings.length - 8} more)`);
    }
  }

  const markdown = stringField(structuredContent.markdown);
  if (preview) {
    lines.push('');
    lines.push(preview);
  } else if (markdown) {
    lines.push('');
    lines.push(truncate(markdown, MAX_DOC_TEXT_CHARS));
    if (markdown.length > MAX_DOC_TEXT_CHARS) {
      lines.push('');
      lines.push(
        `(truncated on the text channel — the complete markdown is in \`structuredContent.markdown\`)`,
      );
    }
  } else {
    lines.push('');
    lines.push('Full markdown is in `structuredContent.markdown`.');
  }

  return lines.join('\n');
}

function truncate(value: string, maxChars: number): string {
  return value.length > maxChars ? `${value.slice(0, maxChars)}…` : value;
}

function joinCapped(items: string[]): string {
  const capped = items.slice(0, MAX_LISTED_IDS);
  const suffix = items.length > capped.length
    ? `, … (+${items.length - capped.length} more)`
    : '';
  return `${capped.join(', ')}${suffix}`;
}
