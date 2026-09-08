/**
 * Deterministic gold-case generator for the retrieval bake-off.
 *
 * Usage:
 *   bun gold/generate.ts --split dev  --seed 20260831 --out gold/dev-generated.json
 *   bun gold/generate.ts --split test --seed 20260831 --out gold/test-generated.json
 *
 * Determinism: a seeded mulberry32 PRNG drives every sampling decision — no
 * Math.random(), no Date.now(). Same corpus + same seed + same split ⇒
 * byte-identical output.
 *
 * Split disjointness: the dev split is always generated first from the base
 * seed. When --split test is requested, the generator re-runs the dev
 * generation internally (same base seed), collects the doc IDs whose surface
 * text dev questions were built from (the "primary" sampled docs), and then
 * generates the test split from a derived seed while refusing to sample any
 * of dev's primary docs. Expected IDs that merely appear as answers (e.g. a
 * builds_on target) do not block reuse — only the doc a question's surface
 * text is derived from counts as "sampled".
 *
 * Every emitted expectedId is validated against the corpus (throws on
 * unknown). Questions are deduped case-insensitively.
 */

import { loadCorpus } from '../harness/corpus.ts';
import type { Corpus } from '../harness/corpus.ts';
import type { CorpusDoc, GoldCase } from '../harness/types.ts';

// ---------------------------------------------------------------------------
// Seeded PRNG (mulberry32) + helpers
// ---------------------------------------------------------------------------

type Rng = () => number;

function mulberry32(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rng: Rng, arr: readonly T[]): T {
  return arr[Math.floor(rng() * arr.length)]!;
}

/** Fisher–Yates shuffle (copy), seeded. */
function shuffled<T>(rng: Rng, arr: readonly T[]): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = out[i]!;
    out[i] = out[j]!;
    out[j] = tmp;
  }
  return out;
}

// ---------------------------------------------------------------------------
// Text helpers
// ---------------------------------------------------------------------------

const STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'of', 'for', 'in', 'on', 'to', 'with', 'by', 'at',
  'as', 'is', 'are', 'was', 'were', 'be', 'been', 'that', 'this', 'these', 'those',
  'it', 'its', 'has', 'have', 'had', 'not', 'no', 'any', 'all', 'one', 'two',
  'when', 'then', 'than', 'but', 'if', 'else', 'so', 'such', 'via', 'per',
  'within', 'into', 'from', 'under', 'over', 'about', 'exactly', 'already', 'either',
  'actually', 'obtains', 'obtaining', 'occurs', 'satisfied', 'optional', 'some',
  'each', 'every', 'only', 'both', 'same', 'other', 'more', 'most', 'may', 'must',
  'can', 'shall', 'should', 'will', 'would', 'accepts', 'against', 'because',
  'before', 'after', 'between', 'during', 'through', 'where', 'which', 'while',
  'without', 'across', 'omits', 'insufficient', 'absent', 'coherent', 'qualifying',
]);

function norm(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function contentWords(s: string): Set<string> {
  return new Set(
    norm(s)
      .split(' ')
      .filter((w) => w.length > 2 && !STOPWORDS.has(w)),
  );
}

function overlapCount(a: string, b: string): number {
  const wa = contentWords(a);
  const wb = contentWords(b);
  let n = 0;
  for (const w of wa) if (wb.has(w)) n++;
  return n;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Part letter for stratified sampling, e.g. "Part A - …" -> "A". */
function partLetter(doc: CorpusDoc): string {
  const m = /^Part ([A-Z])/.exec(doc.part ?? '');
  return m ? m[1]! : '?';
}

// ---------------------------------------------------------------------------
// Deterministic typo corruption
// ---------------------------------------------------------------------------

/**
 * Apply 1-2 seeded single-word corruptions to a phrase.
 * Rules: only words >= 5 alphabetic chars, never touch a word's first
 * character, ops = swap adjacent letters | drop one letter | double one letter.
 * Returns null when the phrase has no eligible word.
 */
function corruptPhrase(rng: Rng, phrase: string): string | null {
  const tokens = phrase.split(/(\s+)/); // keep whitespace tokens
  const eligible: number[] = [];
  for (let i = 0; i < tokens.length; i++) {
    if (/^[A-Za-z]{5,}$/.test(tokens[i]!)) eligible.push(i);
  }
  if (eligible.length === 0) return null;
  const editCount = eligible.length >= 2 && rng() < 0.5 ? 2 : 1;
  const targets = shuffled(rng, eligible).slice(0, editCount);
  for (const ti of targets) {
    tokens[ti] = corruptWord(rng, tokens[ti]!);
  }
  const result = tokens.join('');
  return result === phrase ? null : result;
}

function corruptWord(rng: Rng, word: string): string {
  // position >= 1 so the first character is never touched
  const op = Math.floor(rng() * 3);
  if (op === 0) {
    // swap two adjacent letters (positions p, p+1 with p >= 1)
    if (word.length < 3) return word;
    const p = 1 + Math.floor(rng() * (word.length - 2));
    if (word[p] === word[p + 1]) {
      // swapping identical letters is a no-op; fall through to drop
      return word.slice(0, p) + word.slice(p + 1);
    }
    return word.slice(0, p) + word[p + 1] + word[p] + word.slice(p + 2);
  }
  if (op === 1) {
    // drop one letter
    const p = 1 + Math.floor(rng() * (word.length - 1));
    return word.slice(0, p) + word.slice(p + 1);
  }
  // double one letter
  const p = 1 + Math.floor(rng() * (word.length - 1));
  return word.slice(0, p + 1) + word[p] + word.slice(p + 1);
}

// ---------------------------------------------------------------------------
// Pools
// ---------------------------------------------------------------------------

interface AliasEntry {
  /** The alternate surface form the question will use. */
  alias: string;
  /** Doc the question surface derives from (for used-doc tracking). */
  sourceDocId: string;
  expectedIds: string[];
}

interface Pools {
  /** Patterns grouped by part letter, each list sorted by id. */
  patternsByPart: Map<string, CorpusDoc[]>;
  /** Patterns with a quotable title (used by title + multi-hop rules). */
  titleable: CorpusDoc[];
  aliasPool: AliasEntry[];
  /** Clean concept lexemes usable for definition questions. */
  definitionLexemes: Array<{ lex: CorpusDoc; patternIds: string[] }>;
  /** Patterns with 1-4 builds_on pattern targets. */
  buildsOn: Array<{ doc: CorpusDoc; targets: string[] }>;
  /** Patterns with refines targets. */
  refines: Array<{ doc: CorpusDoc; targets: string[] }>;
}

/**
 * Sentence-fragment lexemes (e.g. "states include", "use either") sneak into
 * the corpus; reject titles that start like an imperative verb phrase or end
 * on a conjugated verb, so definition and alias questions stay natural
 * concept phrases. Directional on purpose: "intended use" (noun ending) is a
 * real concept, "use either" (verb start) is a fragment.
 */
const FRAGMENT_FIRST_WORDS = new Set([
  'use', 'apply', 'include', 'return', 'keep', 'carry', 'begin', 'become',
  'remain', 'occur', 'avoid', 'add', 'ask', 'choose', 'compare', 'normally',
  'usually', 'typically', 'often', 'always', 'never', 'still',
]);
const FRAGMENT_LAST_WORDS = new Set([
  'include', 'includes', 'including', 'applies', 'occurs', 'remains', 'returns',
  'becomes', 'carries', 'begins', 'means', 'holds', 'says', 'gives', 'takes',
  'moves', 'requires', 'provides', 'contains', 'needs', 'keeps', 'uses', 'used',
  'names', 'normally', 'usually', 'typically', 'often', 'always', 'never', 'still',
]);

function isCleanConceptTitle(title: string): boolean {
  // 2-4 natural words, letters only, no word in the stoplist, each word >= 3 chars
  if (!/^[A-Za-z][A-Za-z-]*(?: [A-Za-z][A-Za-z-]*){1,3}$/.test(title)) return false;
  const words = title.toLowerCase().split(/\s+/);
  if (words.some((w) => w.length < 3 || STOPWORDS.has(w))) return false;
  if (FRAGMENT_FIRST_WORDS.has(words[0]!) || FRAGMENT_LAST_WORDS.has(words[words.length - 1]!)) {
    return false;
  }
  return true;
}

function patternNeighborIds(corpus: Corpus, lex: CorpusDoc, max: number): string[] {
  const ids: string[] = [];
  for (const n of lex.neighbors) {
    const target = corpus.byId.get(n.to);
    if (target?.kind === 'pattern' && !ids.includes(n.to)) ids.push(n.to);
  }
  ids.sort();
  return ids.length > max ? [] : ids;
}

function buildPools(corpus: Corpus): Pools {
  const patterns = corpus.docs.filter((d) => d.kind === 'pattern');
  const lexemes = corpus.docs.filter((d) => d.kind === 'lexeme');

  const patternsByPart = new Map<string, CorpusDoc[]>();
  for (const p of patterns) {
    const letter = partLetter(p);
    if (!patternsByPart.has(letter)) patternsByPart.set(letter, []);
    patternsByPart.get(letter)!.push(p);
  }

  const titleable = patterns.filter((p) => p.title.length >= 8 && p.title.length <= 90);

  // --- alias pool -----------------------------------------------------------
  const aliasPool: AliasEntry[] = [];

  // (a) explicit extra aliases on patterns (e.g. "U.Work" on A.15.1)
  for (const p of patterns) {
    for (const alias of p.aliases) {
      if (alias === p.title || alias.length < 3) continue;
      const expected = [p.id];
      const lexId = `lex:${slugify(alias)}`;
      if (corpus.byId.has(lexId)) expected.push(lexId);
      aliasPool.push({ alias, sourceDocId: p.id, expectedIds: expected });
    }
  }

  // (b) parenthesized short names inside pattern titles, e.g. "(C-4)"
  for (const p of patterns) {
    const m = /\(([A-Za-z][A-Za-z0-9 .&/‑–-]{1,24})\)/.exec(p.title);
    if (!m) continue;
    const inner = m[1]!.trim();
    if (inner.length < 2 || norm(inner) === norm(p.title)) continue;
    // Skip parentheticals that are just re-worded title words (keep acronym-ish ones)
    if (overlapCount(inner, p.title.replace(m[0], '')) > 1) continue;
    const expected = [p.id];
    const lexId = `lex:${slugify(inner)}`;
    if (corpus.byId.has(lexId)) expected.push(lexId);
    aliasPool.push({ alias: inner, sourceDocId: p.id, expectedIds: expected });
  }

  // (c) clean concept lexemes whose title has ZERO content-word overlap with
  // every linked pattern title — i.e. a genuine alternate name for the concept.
  const cleanLexemes: Array<{ lex: CorpusDoc; patternIds: string[] }> = [];
  for (const l of lexemes) {
    if (!isCleanConceptTitle(l.title)) continue;
    const patIds = patternNeighborIds(corpus, l, 3);
    if (patIds.length === 0) continue;
    cleanLexemes.push({ lex: l, patternIds: patIds });
  }
  for (const { lex, patternIds } of cleanLexemes) {
    const maxOverlap = Math.max(
      ...patternIds.map((id) => overlapCount(lex.title, corpus.byId.get(id)!.title)),
    );
    if (maxOverlap === 0) {
      aliasPool.push({
        alias: lex.title,
        sourceDocId: lex.id,
        expectedIds: [lex.id, ...patternIds],
      });
    }
  }

  // Definition pool: all clean concept lexemes (alias-used ones are excluded
  // at sampling time via the used-doc set).
  const definitionLexemes = cleanLexemes;

  // --- multi-hop pools ------------------------------------------------------
  const buildsOn: Array<{ doc: CorpusDoc; targets: string[] }> = [];
  const refines: Array<{ doc: CorpusDoc; targets: string[] }> = [];
  for (const p of patterns) {
    if (p.title.length > 90) continue; // question quotes the title
    const b = [
      ...new Set(
        p.neighbors
          .filter((n) => n.relation === 'builds_on' && corpus.byId.get(n.to)?.kind === 'pattern')
          .map((n) => n.to),
      ),
    ].sort();
    if (b.length >= 1 && b.length <= 4) buildsOn.push({ doc: p, targets: b });
    const r = [
      ...new Set(
        p.neighbors
          .filter((n) => n.relation === 'refines' && corpus.byId.get(n.to)?.kind === 'pattern')
          .map((n) => n.to),
      ),
    ].sort();
    if (r.length >= 1 && r.length <= 4) refines.push({ doc: p, targets: r });
  }

  return { patternsByPart, titleable, aliasPool, definitionLexemes, buildsOn, refines };
}

// ---------------------------------------------------------------------------
// Question templates (picked by PRNG for surface variety)
// ---------------------------------------------------------------------------

const ID_TEMPLATES = [
  (id: string) => `What is ${id} and when do I apply it?`,
  (id: string) => `Explain ${id} from the FPF spec.`,
  (id: string) => `What does pattern ${id} cover?`,
  (id: string) => `When should I reach for ${id}?`,
  (id: string) => `Give me a quick summary of ${id}.`,
  (id: string) => `Open ${id} — what problem does it solve?`,
];

const TITLE_TEMPLATES = [
  (t: string) => `Explain the pattern called "${t}".`,
  (t: string) => `What does the "${t}" pattern say?`,
  (t: string) => `Tell me about "${t}" in FPF.`,
  (t: string) => `Where is "${t}" defined and what is it for?`,
  (t: string) => `I'm looking for the section titled "${t}".`,
  (t: string) => `Summarize "${t}" for me.`,
];

const ALIAS_TEMPLATES = [
  (a: string) => `Which FPF pattern covers what's called "${a}"?`,
  (a: string) => `People keep mentioning "${a}" — where does FPF define that?`,
  (a: string) => `Find the FPF entry for "${a}".`,
  (a: string) => `What is "${a}" in the FPF spec?`,
  (a: string) => `Where does "${a}" come up in FPF?`,
];

const TYPO_TEMPLATES = [
  (t: string) => `Explain "${t}" from the spec.`,
  (t: string) => `What does FPF say about "${t}"?`,
  (t: string) => `Tell me about "${t}".`,
  (t: string) => `Where is "${t}" covered in the spec?`,
  (t: string) => `What is "${t}" in FPF?`,
];

const DEFINITION_TEMPLATES = [
  (t: string) => `What does "${t}" mean in FPF?`,
  (t: string) => `Define "${t}" as FPF uses the term.`,
  (t: string) => `How does FPF define "${t}"?`,
  (t: string) => `In FPF terms, what is ${/^[aeiou]/i.test(t) ? 'an' : 'a'} "${t}"?`,
  (t: string) => `What's the FPF meaning of "${t}"?`,
];

const MULTIHOP_BUILDS_TEMPLATES = [
  (t: string) => `Which pattern does "${t}" build on?`,
  (t: string) => `What does "${t}" directly build on in FPF?`,
  (t: string) => `Name a pattern that "${t}" builds on.`,
  (t: string) => `"${t}" builds on which earlier pattern?`,
];

const MULTIHOP_REFINES_TEMPLATES = [
  (t: string) => `Which pattern does "${t}" refine?`,
  (t: string) => `"${t}" is a refinement of which pattern?`,
];

// Mundane word bank for negative queries. Any word that happens to collide
// with a lexeme title/alias in the corpus is dropped at generation time.
const NEGATIVE_WORDS = [
  'banana', 'wallpaper', 'saxophone', 'pancake', 'umbrella', 'giraffe', 'volcano',
  'trombone', 'cupcake', 'flamingo', 'snorkel', 'marmalade', 'kayak', 'porcupine',
  'waffle', 'juggler', 'lighthouse', 'mustache', 'origami', 'pretzel', 'tricycle',
  'walrus', 'yodeling', 'zucchini', 'hammock', 'confetti', 'bagpipes', 'meatball',
  'sombrero', 'tapioca', 'unicycle', 'jukebox', 'lasagna', 'parakeet', 'quicksand',
  'raccoon', 'sherbet', 'tambourine', 'earmuffs', 'firefly', 'gumdrop', 'hopscotch',
  'icicle', 'jellyfish', 'kaleidoscope', 'limerick', 'moonwalk', 'noodle',
] as const;

const NEGATIVE_QUESTION_TEMPLATES = [
  (w: string[]) => `Where can I buy a discounted ${w[0]} ${w[1]} near the beach?`,
  (w: string[]) => `What's a good recipe that combines ${w[0]}, ${w[1]}, and ${w[2]}?`,
  (w: string[]) => `How do I teach my ${w[0]} to play the ${w[1]}?`,
  (w: string[]) => `Best ${w[0]} repair shop that also sells ${w[1]} ${w[2]}?`,
  (w: string[]) => `Why does my ${w[0]} smell like ${w[1]} after the ${w[2]} festival?`,
] as const;

// ---------------------------------------------------------------------------
// Generation
// ---------------------------------------------------------------------------

interface SplitCounts {
  idLookup: number;
  title: number;
  alias: number;
  typo: number;
  definition: number;
  multiHop: number;
  negative: number;
}

const COUNTS: SplitCounts = {
  idLookup: 17,
  title: 17,
  alias: 16,
  typo: 17,
  definition: 17,
  multiHop: 16,
  negative: 10,
};

interface GenResult {
  cases: GoldCase[];
  /** Doc IDs whose surface text this split's questions derive from. */
  usedDocIds: Set<string>;
}

function generateSplit(
  corpus: Corpus,
  pools: Pools,
  seed: number,
  counts: SplitCounts,
  excludeDocIds: ReadonlySet<string>,
): GenResult {
  const rng = mulberry32(seed);
  const used = new Set<string>(); // primary docs sampled by THIS split
  const questions = new Set<string>(); // dedupe (normalized)
  const cases: GoldCase[] = [];

  const blocked = (id: string) => used.has(id) || excludeDocIds.has(id);

  function emit(c: GoldCase): boolean {
    const key = c.question.toLowerCase().trim();
    if (questions.has(key)) return false;
    questions.add(key);
    cases.push(c);
    return true;
  }

  // --- id-lookup: stratified across parts ----------------------------------
  {
    const partOrder = shuffled(rng, [...pools.patternsByPart.keys()].sort());
    const perPart = new Map(
      partOrder.map((k) => [k, shuffled(rng, pools.patternsByPart.get(k)!)] as const),
    );
    let emitted = 0;
    let cursor = 0;
    let stall = 0;
    while (emitted < counts.idLookup && stall < partOrder.length * 4) {
      const part = partOrder[cursor % partOrder.length]!;
      cursor++;
      const bucket = perPart.get(part)!;
      const doc = bucket.find((d) => !blocked(d.id));
      if (!doc) {
        stall++;
        continue;
      }
      const q = pick(rng, ID_TEMPLATES)(doc.id);
      if (emit({
        id: `id-lookup-${emitted + 1}`,
        question: q,
        expectedIds: [doc.id],
        category: 'id-lookup',
        source: 'generated',
        provenance: 'id-lookup',
      })) {
        used.add(doc.id);
        emitted++;
        stall = 0;
      } else {
        stall++;
      }
    }
  }

  // --- title ----------------------------------------------------------------
  const titleCases: Array<{ goldCase: GoldCase; phrase: string }> = [];
  {
    let emitted = 0;
    for (const doc of shuffled(rng, pools.titleable)) {
      if (emitted >= counts.title) break;
      if (blocked(doc.id)) continue;
      const q = pick(rng, TITLE_TEMPLATES)(doc.title);
      const goldCase: GoldCase = {
        id: `title-${emitted + 1}`,
        question: q,
        expectedIds: [doc.id],
        category: 'title',
        source: 'generated',
        provenance: 'title',
      };
      if (emit(goldCase)) {
        used.add(doc.id);
        titleCases.push({ goldCase, phrase: doc.title });
        emitted++;
      }
    }
  }

  // --- alias ----------------------------------------------------------------
  const aliasCases: Array<{ goldCase: GoldCase; phrase: string }> = [];
  {
    let emitted = 0;
    for (const entry of shuffled(rng, pools.aliasPool)) {
      if (emitted >= counts.alias) break;
      if (blocked(entry.sourceDocId)) continue;
      const q = pick(rng, ALIAS_TEMPLATES)(entry.alias);
      const goldCase: GoldCase = {
        id: `alias-${emitted + 1}`,
        question: q,
        expectedIds: entry.expectedIds.slice(),
        category: 'alias',
        source: 'generated',
        provenance: 'alias',
      };
      if (emit(goldCase)) {
        used.add(entry.sourceDocId);
        aliasCases.push({ goldCase, phrase: entry.alias });
        emitted++;
      }
    }
  }

  // --- typo: corrupt phrases from this split's title/alias cases ------------
  {
    const sources = [...titleCases, ...aliasCases].filter(
      ({ phrase }) => /[A-Za-z]{5,}/.test(phrase),
    );
    let emitted = 0;
    for (const { goldCase, phrase } of shuffled(rng, sources)) {
      if (emitted >= counts.typo) break;
      const corrupted = corruptPhrase(rng, phrase);
      if (!corrupted) continue;
      const q = pick(rng, TYPO_TEMPLATES)(corrupted);
      if (emit({
        id: `typo-${emitted + 1}`,
        question: q,
        expectedIds: goldCase.expectedIds.slice(),
        category: 'typo',
        source: 'generated',
        provenance: 'typo',
      })) {
        emitted++;
      }
    }
  }

  // --- definition -----------------------------------------------------------
  {
    let emitted = 0;
    for (const { lex, patternIds } of shuffled(rng, pools.definitionLexemes)) {
      if (emitted >= counts.definition) break;
      if (blocked(lex.id)) continue;
      const q = pick(rng, DEFINITION_TEMPLATES)(lex.title.toLowerCase());
      if (emit({
        id: `definition-${emitted + 1}`,
        question: q,
        expectedIds: [lex.id, ...patternIds],
        category: 'definition',
        source: 'generated',
        provenance: 'definition',
      })) {
        used.add(lex.id);
        emitted++;
      }
    }
  }

  // --- multi-hop ------------------------------------------------------------
  {
    const refinesShare = Math.min(2, counts.multiHop, pools.refines.length);
    let emitted = 0;
    for (const { doc, targets } of shuffled(rng, pools.refines)) {
      if (emitted >= refinesShare) break;
      if (blocked(doc.id)) continue;
      const q = pick(rng, MULTIHOP_REFINES_TEMPLATES)(doc.title);
      if (emit({
        id: `multi-hop-${emitted + 1}`,
        question: q,
        expectedIds: targets.slice(),
        category: 'multi-hop',
        source: 'generated',
        provenance: 'multi-hop',
      })) {
        used.add(doc.id);
        emitted++;
      }
    }
    for (const { doc, targets } of shuffled(rng, pools.buildsOn)) {
      if (emitted >= counts.multiHop) break;
      if (blocked(doc.id)) continue;
      const q = pick(rng, MULTIHOP_BUILDS_TEMPLATES)(doc.title);
      if (emit({
        id: `multi-hop-${emitted + 1}`,
        question: q,
        expectedIds: targets.slice(),
        category: 'multi-hop',
        source: 'generated',
        provenance: 'multi-hop',
      })) {
        used.add(doc.id);
        emitted++;
      }
    }
  }

  // --- negative -------------------------------------------------------------
  {
    // Drop bank words that collide with any corpus title/alias token, so the
    // queries are guaranteed FPF-irrelevant.
    const corpusTokens = new Set<string>();
    for (const d of corpus.docs) {
      for (const t of norm(d.title).split(' ')) corpusTokens.add(t);
      for (const a of d.aliases) for (const t of norm(a).split(' ')) corpusTokens.add(t);
    }
    const safeWords = NEGATIVE_WORDS.filter((w) => !corpusTokens.has(w));
    let emitted = 0;
    let attempt = 0;
    while (emitted < counts.negative && attempt < counts.negative * 20) {
      attempt++;
      const ws = shuffled(rng, safeWords);
      const q =
        emitted % 2 === 0
          ? // bare word-salad style
            ws.slice(0, 4 + Math.floor(rng() * 2)).join(' ')
          : // natural-but-irrelevant question style
            pick(rng, NEGATIVE_QUESTION_TEMPLATES)(ws.slice(0, 3));
      if (emit({
        id: `negative-${emitted + 1}`,
        question: q,
        expectedIds: [],
        category: 'negative',
        source: 'generated',
        provenance: 'negative',
      })) {
        emitted++;
      }
    }
  }

  return { cases, usedDocIds: used };
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function validate(corpus: Corpus, cases: GoldCase[]): void {
  const ids = new Set<string>();
  const questions = new Set<string>();
  for (const c of cases) {
    if (ids.has(c.id)) throw new Error(`duplicate case id: ${c.id}`);
    ids.add(c.id);
    const qKey = c.question.toLowerCase().trim();
    if (questions.has(qKey)) throw new Error(`duplicate question: ${c.question}`);
    questions.add(qKey);
    for (const expected of c.expectedIds) {
      if (!corpus.byId.has(expected)) {
        throw new Error(`case ${c.id} expects unknown corpus id: ${expected}`);
      }
    }
    if (c.category === 'negative' && c.expectedIds.length !== 0) {
      throw new Error(`negative case ${c.id} must have empty expectedIds`);
    }
    if (c.category !== 'negative' && c.expectedIds.length === 0) {
      throw new Error(`case ${c.id} has no expectedIds`);
    }
  }
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  let split: 'dev' | 'test' = 'dev';
  let seed: number | null = null;
  let out: string | null = null;
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]!;
    const next = (): string => {
      const value = argv[++i];
      if (value === undefined) throw new Error(`missing value for ${arg}`);
      return value;
    };
    if (arg === '--split') split = next() as 'dev' | 'test';
    else if (arg.startsWith('--split=')) split = arg.slice(8) as 'dev' | 'test';
    else if (arg === '--seed') seed = Number(next());
    else if (arg.startsWith('--seed=')) seed = Number(arg.slice(7));
    else if (arg === '--out') out = next();
    else if (arg.startsWith('--out=')) out = arg.slice(6);
    else throw new Error(`unknown argument: ${arg}`);
  }
  if (split !== 'dev' && split !== 'test') throw new Error(`--split must be dev|test`);
  if (seed === null || !Number.isInteger(seed)) throw new Error(`--seed <integer> is required`);

  const corpus = await loadCorpus();
  const pools = buildPools(corpus);

  // Dev is always generated first from the base seed; test excludes dev's
  // sampled docs and uses a derived seed so its PRNG stream is independent.
  const dev = generateSplit(corpus, pools, seed, COUNTS, new Set());
  let result = dev;
  if (split === 'test') {
    const testSeed = (seed ^ 0x9e3779b9) >>> 0;
    result = generateSplit(corpus, pools, testSeed, COUNTS, dev.usedDocIds);
  }

  validate(corpus, result.cases);

  const json = JSON.stringify(result.cases, null, 2) + '\n';
  if (out) {
    await Bun.write(out, json);
    const counts: Record<string, number> = {};
    for (const c of result.cases) counts[c.category] = (counts[c.category] ?? 0) + 1;
    console.error(
      `wrote ${result.cases.length} ${split} cases (seed ${seed}) to ${out}: ` +
        Object.entries(counts)
          .sort()
          .map(([k, v]) => `${k}=${v}`)
          .join(' '),
    );
  } else {
    console.log(json);
  }
}

await main();
