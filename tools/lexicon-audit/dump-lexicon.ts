/**
 * dump-lexicon.ts — export the compiled FPF lexicon for pollution auditing.
 *
 * Compiles the committed publication spec with the repo's own deterministic
 * compiler and writes the lexicon (canonical term + alias/symbol counts) plus
 * a provenance block (source hash + compiler fingerprint) so the audit is
 * reproducible and pinned to a specific published artifact.
 *
 * Run:  bun tools/lexicon-audit/dump-lexicon.ts [--out <path>]
 *       FPF_SPEC_SOURCE_PATH overrides the spec (default: committed 07-03 spec).
 *
 * The emitted JSON feeds tools/lexicon-audit/lexicon-audit.ts.
 */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { computeCompilerFingerprint } from '../../src/build/compiler-fingerprint.js';
import { compileFpfSource } from '../../src/runtime/compiler.js';

const specPath = (process.env.FPF_SPEC_SOURCE_PATH ?? 'published/current/FPF-Spec.md').trim();
const outArg = process.argv.indexOf('--out');
const outPath =
  outArg !== -1 && outArg + 1 < process.argv.length
    ? process.argv[outArg + 1]!
    : 'tools/lexicon-audit/lexicon-export.json';

const sourceText = readFileSync(resolve(specPath), 'utf8');
const sourceHash = `sha256:${createHash('sha256').update(sourceText).digest('hex')}`;
const compilerFingerprint = await computeCompilerFingerprint();

// Best-effort manifest context (upstream ref / publish date) when auditing the
// committed publication surface. Absent for ad-hoc spec files — that is fine.
let manifest: Record<string, unknown> = {};
try {
  const manifestPath = resolve(specPath, '..', 'manifest.json');
  manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as Record<string, unknown>;
} catch {
  manifest = {};
}

const builtAt =
  typeof manifest.publishedAt === 'string' ? manifest.publishedAt : new Date(0).toISOString();

const { snapshot, projections } = compileFpfSource({
  sourcePath: specPath,
  sourceHash,
  builtAt,
  compilerFingerprint,
  sourceText,
});

const lexemes = Object.values(projections.lexicon).map((entry) => ({
  id: entry.id,
  canonical: entry.canonical,
  aliasCount: entry.aliases.length,
  symbolFormCount: entry.symbolForms.length,
  linkedNodeCount: entry.linkedNodeIds.length,
}));

const compiledNodes = snapshot.compiledNodes as unknown;
const nodeList = Array.isArray(compiledNodes)
  ? (compiledNodes as { kind: string }[])
  : compiledNodes
    ? (Object.values(compiledNodes as Record<string, { kind: string }>) as { kind: string }[])
    : [];
const kindCounts: Record<string, number> = {};
for (const node of nodeList) {
  kindCounts[node.kind] = (kindCounts[node.kind] ?? 0) + 1;
}

const totalAliases = lexemes.reduce((sum, l) => sum + l.aliasCount, 0);

const provenance = {
  specPath,
  sourceHash,
  compilerFingerprint,
  builtAt,
  upstreamRef: manifest.upstreamRef ?? null,
  totalCompiledNodes: nodeList.length,
  kindCounts,
  lexemeCount: lexemes.length,
  aliasStats: {
    total: totalAliases,
    avgPerLexeme: Number((totalAliases / Math.max(lexemes.length, 1)).toFixed(3)),
    max: lexemes.reduce((m, l) => Math.max(m, l.aliasCount), 0),
  },
};

writeFileSync(outPath, JSON.stringify({ provenance, lexemes }));
process.stderr.write(`${JSON.stringify(provenance, null, 2)}\n`);
process.stderr.write(`\nwrote ${lexemes.length} lexemes -> ${outPath}\n`);
