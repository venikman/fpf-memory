/** Source-preserving ranges for the Markdown constructs our link projection edits. */
export interface MarkdownRange {
  start: number;
  end: number;
}

interface MarkdownLink extends MarkdownRange {
  destination?: MarkdownRange;
  label?: MarkdownRange;
}

export function containsOffset(ranges: MarkdownRange[], offset: number): boolean {
  return ranges.some(({ start, end }) => offset >= start && offset < end);
}

function codeRanges(body: string, inlineCode: boolean): MarkdownRange[] {
  const ranges: MarkdownRange[] = [];
  // Match the closing fence by delimiter and minimum length, including tilde
  // fences. An unclosed fence protects the remainder of the source.
  const fences = /^ {0,3}(`{3,}|~{3,})[^\n]*\n/gm;
  for (const match of body.matchAll(fences)) {
    if (containsOffset(ranges, match.index)) continue;
    const closing = new RegExp(`^ {0,3}${match[1]![0]}{${match[1]!.length},}[ \\t]*$`, 'gm');
    closing.lastIndex = match.index + match[0].length;
    const end = closing.exec(body);
    ranges.push({ start: match.index, end: end ? end.index + end[0].length : body.length });
  }
  if (!inlineCode) return ranges;
  for (const match of body.matchAll(/`+/g)) {
    if (containsOffset(ranges, match.index)) continue;
    const closing = new RegExp(`(?<!\u0060)\u0060{${match[0].length}}(?!\u0060)`, 'g');
    closing.lastIndex = match.index + match[0].length;
    const end = closing.exec(body);
    if (end) ranges.push({ start: match.index, end: end.index + end[0].length });
  }
  return ranges;
}

function delimitedEnd(body: string, start: number, open: string, close: string): number {
  let depth = 0;
  for (let index = start; index < body.length; index += 1) {
    if (body[index] === '\\') {
      index += 1;
    } else if (body[index] === open) {
      depth += 1;
    } else if (body[index] === close && --depth === 0) {
      return index + 1;
    }
  }
  return -1;
}

function destinationRange(body: string, start: number, end: number): MarkdownRange | undefined {
  while (start < end && /\s/.test(body[start]!)) start += 1;
  if (body[start] === '<') {
    const closing = body.indexOf('>', start + 1);
    return closing < 0 || closing >= end ? undefined : { start: start + 1, end: closing };
  }
  let cursor = start;
  while (cursor < end && !/\s/.test(body[cursor]!)) cursor += 1;
  return cursor > start ? { start, end: cursor } : undefined;
}

function markdownLinks(body: string, code = codeRanges(body, true)): MarkdownLink[] {
  const links: MarkdownLink[] = [];
  const referenceLabels = new Set<string>();
  const normalizeLabel = (label: string) => label.trim().replace(/\s+/g, ' ').toLowerCase();
  for (const match of body.matchAll(/^ {0,3}\[([^\]\n]+)\]:[ \t]*/gm)) {
    if (containsOffset(code, match.index)) continue;
    referenceLabels.add(normalizeLabel(match[1]!));
    const nextLine = body.indexOf('\n', match.index + match[0].length);
    const end = nextLine < 0 ? body.length : nextLine;
    links.push({
      start: match.index,
      end,
      destination: destinationRange(body, match.index + match[0].length, end),
    });
  }
  for (let index = 0; index < body.length; index += 1) {
    if (body[index] === '\\') {
      index += 1;
      continue;
    }
    if (body[index] !== '[' || containsOffset(code, index) || containsOffset(links, index)) continue;
    const labelEnd = delimitedEnd(body, index, '[', ']');
    if (labelEnd < 0) continue;
    if (body[labelEnd] === '(') {
      const end = delimitedEnd(body, labelEnd, '(', ')');
      if (end < 0) continue;
      links.push({
        start: index,
        end,
        label: { start: index + 1, end: labelEnd - 1 },
        destination: destinationRange(body, labelEnd + 1, end - 1),
      });
      index = end - 1;
    } else if (body[labelEnd] === '[') {
      const end = delimitedEnd(body, labelEnd, '[', ']');
      if (end < 0) continue;
      links.push({ start: index, end });
      index = end - 1;
    } else if (referenceLabels.has(normalizeLabel(body.slice(index + 1, labelEnd - 1)))) {
      links.push({ start: index, end: labelEnd });
      index = labelEnd - 1;
    }
  }
  return links;
}

export function markdownAutolinkGuards(body: string, inlineCode = true): MarkdownRange[] {
  const code = codeRanges(body, true);
  return [
    ...(inlineCode ? code : codeRanges(body, false)),
    ...markdownLinks(body, code),
    ...Array.from(body.matchAll(/<[^>]+>/g), (match) => ({
      start: match.index,
      end: match.index + match[0].length,
    })),
  ];
}

export function rewriteMarkdownDestinations(
  body: string,
  resolve: (target: string) => string,
  unavailableDocument?: (target: string) => boolean,
): string {
  const links = markdownLinks(body).filter((link) => link.destination);
  const edits: Array<MarkdownRange & { replacement: string }> = [];
  for (const link of links) {
    const { start, end } = link.destination!;
    const target = body.slice(start, end);
    const resolved = resolve(target);
    if (resolved === target && link.label && body[link.start - 1] !== '!' && unavailableDocument?.(target)) {
      const label = body.slice(link.label.start, link.label.end);
      const codeFence = '`'.repeat(Math.max(0, ...Array.from(target.matchAll(/`+/g), (match) => match[0].length)) + 1);
      edits.push({
        start: link.start,
        end: link.end,
        replacement: `${label} (source document not included in this publication: ${codeFence}${target}${codeFence})`,
      });
    } else if (resolved !== target) {
      edits.push({ start, end, replacement: resolved });
    }
  }
  if (edits.length === 0) return body;
  // Most projected links already point at the generated site. Rebuilding a
  // multi-megabyte preface for each unchanged destination is quadratic in
  // page size and link count. Apply only real edits in one source-order pass.
  const parts: string[] = [];
  let cursor = 0;
  for (const edit of edits.sort((left, right) => left.start - right.start)) {
    parts.push(body.slice(cursor, edit.start), edit.replacement);
    cursor = edit.end;
  }
  parts.push(body.slice(cursor));
  return parts.join('');
}
