/**
 * Porter2 (Snowball English) stemmer — hand-ported from the Snowball
 * specification (https://snowballstem.org/algorithms/english/stemmer.html),
 * 2006 revision (the variant shipped by snowballstemmer 2.x): includes the
 * gener-/commun-/arsen- R1 exceptions and the fulli/lessli/bli step-2 rules.
 *
 * Frozen behavior: `PORTER2_VECTORS` below is the contract. `selfCheckPorter2()`
 * runs the full table and returns any mismatches; the index build asserts it is
 * empty, so any future edit that drifts from the frozen behavior fails loudly
 * (research/lexical.md §(c): "Porter2 must be frozen with test vectors").
 *
 * Determinism: pure string logic, no locale ops, no Date/random. Input is
 * expected to be lowercase ASCII (the tokenizer guarantees [a-z0-9]+); other
 * input is handled but not part of the frozen contract.
 */

const EXCEPTIONS1: Record<string, string> = {
  skis: 'ski',
  skies: 'sky',
  dying: 'die',
  lying: 'lie',
  tying: 'tie',
  idly: 'idl',
  gently: 'gentl',
  ugly: 'ugli',
  early: 'earli',
  only: 'onli',
  singly: 'singl',
  sky: 'sky',
  news: 'news',
  howe: 'howe',
  atlas: 'atlas',
  cosmos: 'cosmos',
  bias: 'bias',
  andes: 'andes',
};

/** Words left invariant when found after step 1a. */
const EXCEPTIONS2 = new Set([
  'inning',
  'outing',
  'canning',
  'herring',
  'earring',
  'proceed',
  'exceed',
  'succeed',
]);

const DOUBLES = new Set(['bb', 'dd', 'ff', 'gg', 'mm', 'nn', 'pp', 'rr', 'tt']);
const LI_ENDING = new Set(['c', 'd', 'e', 'g', 'h', 'k', 'm', 'n', 'r', 't']);

/** Vowels; consonant `y` is marked as uppercase `Y` beforehand, so it is excluded here. */
function isVowel(ch: string): boolean {
  return ch === 'a' || ch === 'e' || ch === 'i' || ch === 'o' || ch === 'u' || ch === 'y';
}

/** Position after the first non-vowel that follows a vowel, scanning w[from..]; w.length if none. */
function regionAfter(w: string, from: number): number {
  for (let i = from + 1; i < w.length; i++) {
    if (!isVowel(w[i]!) && isVowel(w[i - 1]!)) return i + 1;
  }
  return w.length;
}

function computeR1(w: string): number {
  if (w.startsWith('gener')) return 5;
  if (w.startsWith('commun')) return 6;
  if (w.startsWith('arsen')) return 5;
  return regionAfter(w, 0);
}

/**
 * Short syllable: (a) vowel followed by a non-vowel other than w/x/Y, preceded
 * by a non-vowel, at the end of the word; or (b) a word of the form
 * vowel + non-vowel ("bed", "us").
 */
function endsShortSyllable(w: string): boolean {
  const n = w.length;
  if (n === 2) return isVowel(w[0]!) && !isVowel(w[1]!);
  if (n >= 3) {
    const c = w[n - 1]!;
    return (
      !isVowel(c) && c !== 'w' && c !== 'x' && c !== 'Y' && isVowel(w[n - 2]!) && !isVowel(w[n - 3]!)
    );
  }
  return false;
}

/** Step-2 suffix table, longest first (longest-match-then-gate semantics). */
const STEP2: ReadonlyArray<readonly [string, string]> = [
  ['ational', 'ate'],
  ['ization', 'ize'],
  ['fulness', 'ful'],
  ['ousness', 'ous'],
  ['iveness', 'ive'],
  ['tional', 'tion'],
  ['biliti', 'ble'],
  ['lessli', 'less'],
  ['ation', 'ate'],
  ['alism', 'al'],
  ['aliti', 'al'],
  ['ousli', 'ous'],
  ['iviti', 'ive'],
  ['entli', 'ent'],
  ['fulli', 'ful'],
  ['enci', 'ence'],
  ['anci', 'ance'],
  ['abli', 'able'],
  ['izer', 'ize'],
  ['ator', 'ate'],
  ['alli', 'al'],
  ['bli', 'ble'],
  ['ogi', 'og'], // only if preceded by 'l'
  ['li', ''], // only if preceded by a valid li-ending
];

const STEP3: ReadonlyArray<readonly [string, string]> = [
  ['ational', 'ate'],
  ['tional', 'tion'],
  ['alize', 'al'],
  ['icate', 'ic'],
  ['iciti', 'ic'],
  ['ative', ''], // only if in R2
  ['ical', 'ic'],
  ['ness', ''],
  ['ful', ''],
];

const STEP4: ReadonlyArray<string> = [
  'ement',
  'ance',
  'ence',
  'able',
  'ible',
  'ment',
  'ant',
  'ent',
  'ism',
  'ate',
  'iti',
  'ous',
  'ive',
  'ize',
  'ion', // only if preceded by 's' or 't'
  'al',
  'er',
  'ic',
];

export function porter2(input: string): string {
  if (input.length < 3) return input;

  let w = input;
  if (w[0] === "'") {
    w = w.slice(1);
    if (w.length < 3) return w;
  }

  const exceptional = EXCEPTIONS1[w];
  if (exceptional !== undefined) return exceptional;

  // Mark consonant y as 'Y' (initial y, or y after a vowel).
  let marked = '';
  for (let i = 0; i < w.length; i++) {
    const ch = w[i]!;
    marked += ch === 'y' && (i === 0 || isVowel(w[i - 1]!)) ? 'Y' : ch;
  }
  w = marked;

  const r1 = computeR1(w);
  const r2 = regionAfter(w, r1); // vowel/non-vowel pair must lie fully inside R1

  // Step 0 — strip apostrophe suffixes.
  if (w.endsWith("'s'")) w = w.slice(0, -3);
  else if (w.endsWith("'s")) w = w.slice(0, -2);
  else if (w.endsWith("'")) w = w.slice(0, -1);

  // Step 1a.
  if (w.endsWith('sses')) {
    w = w.slice(0, -2);
  } else if (w.endsWith('ied') || w.endsWith('ies')) {
    w = w.length - 3 > 1 ? w.slice(0, -2) : w.slice(0, -1);
  } else if (w.endsWith('us') || w.endsWith('ss')) {
    // no-op
  } else if (w.endsWith('s')) {
    let hasEarlierVowel = false;
    for (let i = 0; i < w.length - 2; i++) {
      if (isVowel(w[i]!)) {
        hasEarlierVowel = true;
        break;
      }
    }
    if (hasEarlierVowel) w = w.slice(0, -1);
  }

  if (EXCEPTIONS2.has(w)) return w;

  // Step 1b.
  {
    const suffix = ['eedly', 'ingly', 'edly', 'eed', 'ing', 'ed'].find((s) => w.endsWith(s));
    if (suffix === 'eed' || suffix === 'eedly') {
      if (w.length - suffix.length >= r1) w = w.slice(0, -suffix.length) + 'ee';
    } else if (suffix !== undefined) {
      const stemPart = w.slice(0, -suffix.length);
      let hasVowel = false;
      for (let i = 0; i < stemPart.length; i++) {
        if (isVowel(stemPart[i]!)) {
          hasVowel = true;
          break;
        }
      }
      if (hasVowel) {
        w = stemPart;
        if (w.endsWith('at') || w.endsWith('bl') || w.endsWith('iz')) w += 'e';
        else if (DOUBLES.has(w.slice(-2))) w = w.slice(0, -1);
        else if (r1 >= w.length && endsShortSyllable(w)) w += 'e';
      }
    }
  }

  // Step 1c — y/Y -> i when preceded by a non-vowel that is not the first letter.
  {
    const n = w.length;
    const last = w[n - 1];
    if (n > 2 && (last === 'y' || last === 'Y') && !isVowel(w[n - 2]!)) {
      w = w.slice(0, -1) + 'i';
    }
  }

  // Step 2 — longest matching suffix, applied only when it lies in R1.
  {
    const hit = STEP2.find(([s]) => w.endsWith(s));
    if (hit) {
      const [s, repl] = hit;
      const start = w.length - s.length;
      if (start >= r1) {
        if (s === 'ogi') {
          if (w[start - 1] === 'l') w = w.slice(0, start) + repl;
        } else if (s === 'li') {
          if (LI_ENDING.has(w[start - 1] ?? '')) w = w.slice(0, start) + repl;
        } else {
          w = w.slice(0, start) + repl;
        }
      }
    }
  }

  // Step 3.
  {
    const hit = STEP3.find(([s]) => w.endsWith(s));
    if (hit) {
      const [s, repl] = hit;
      const start = w.length - s.length;
      if (start >= r1 && (s !== 'ative' || start >= r2)) {
        w = w.slice(0, start) + repl;
      }
    }
  }

  // Step 4 — delete when in R2 ('ion' additionally needs s/t before it).
  {
    const hit = STEP4.find((s) => w.endsWith(s));
    if (hit) {
      const start = w.length - hit.length;
      if (start >= r2 && (hit !== 'ion' || w[start - 1] === 's' || w[start - 1] === 't')) {
        w = w.slice(0, start);
      }
    }
  }

  // Step 5.
  {
    const n = w.length;
    if (w.endsWith('e')) {
      if (n - 1 >= r2) w = w.slice(0, -1);
      else if (n - 1 >= r1 && !endsShortSyllable(w.slice(0, -1))) w = w.slice(0, -1);
    } else if (w.endsWith('l')) {
      if (n - 1 >= r2 && w[n - 2] === 'l') w = w.slice(0, -1);
    }
  }

  return w.replace(/Y/g, 'y');
}

/**
 * Frozen unit vectors (input -> expected stem), each hand-traced against the
 * Snowball English specification. Covers every step: plural handling (1a),
 * ed/ing with the at/bl/iz, undoubling, and short-word e-restoration branches
 * (1b), y->i (1c), the long-suffix tables (2, 3, 4 incl. the ion/ogi/li
 * conditions and R1/R2 gating), e/l deletion (5), both exception lists, and
 * the gener-/commun- R1 prefix exceptions.
 */
export const PORTER2_VECTORS: ReadonlyArray<readonly [string, string]> = [
  // step 1a
  ['caresses', 'caress'],
  ['ponies', 'poni'],
  ['ties', 'tie'],
  ['cries', 'cri'],
  ['caress', 'caress'],
  ['cats', 'cat'],
  ['gaps', 'gap'],
  ['kiwis', 'kiwi'],
  ['gas', 'gas'],
  ['this', 'this'],
  ['contexts', 'context'],
  ['roles', 'role'],
  ['patterns', 'pattern'],
  // step 1b
  ['feed', 'feed'],
  ['agreed', 'agre'],
  ['plastered', 'plaster'],
  ['bled', 'bled'],
  ['motoring', 'motor'],
  ['sing', 'sing'],
  ['hopping', 'hop'],
  ['tanned', 'tan'],
  ['falling', 'fall'],
  ['hissing', 'hiss'],
  ['failing', 'fail'],
  ['filing', 'file'],
  ['using', 'use'],
  ['meeting', 'meet'],
  ['string', 'string'],
  ['amazingly', 'amaz'],
  ['supposedly', 'suppos'],
  // step 1c
  ['happy', 'happi'],
  ['crying', 'cri'],
  ['boundary', 'boundari'],
  ['boundaries', 'boundari'],
  // exception lists
  ['sky', 'sky'],
  ['skies', 'sky'],
  ['dying', 'die'],
  ['news', 'news'],
  ['early', 'earli'],
  ['only', 'onli'],
  ['inning', 'inning'],
  ['proceed', 'proceed'],
  ['exceed', 'exceed'],
  // steps 2-4 with R1/R2 gating
  ['relational', 'relat'],
  ['conditional', 'condit'],
  ['rational', 'ration'],
  ['national', 'nation'],
  ['digitizer', 'digit'],
  ['communication', 'communic'],
  ['consistency', 'consist'],
  ['responsibilities', 'respons'],
  ['abilities', 'abil'],
  ['capability', 'capabl'],
  ['generate', 'generat'],
  ['generation', 'generat'],
  ['evaluation', 'evalu'],
  ['definition', 'definit'],
  ['description', 'descript'],
  ['argument', 'argument'],
  ['element', 'element'],
  ['generously', 'generous'],
  ['possibli', 'possibl'],
  ['ugliness', 'ugli'],
  // step 5
  ['promise', 'promis'],
  ['promises', 'promis'],
  ['architecture', 'architectur'],
  ['hope', 'hope'],
] as const;

/** Runs the frozen vectors; returns human-readable mismatch lines (empty = pass). */
export function selfCheckPorter2(): string[] {
  const failures: string[] = [];
  for (const [input, expected] of PORTER2_VECTORS) {
    const actual = porter2(input);
    if (actual !== expected) failures.push(`porter2(${input}) = ${actual}, expected ${expected}`);
  }
  return failures;
}
