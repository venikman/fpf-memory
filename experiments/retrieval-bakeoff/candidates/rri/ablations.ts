/**
 * Ablation variants of the rri candidate, for `bun harness/run.ts --factory`
 * runs during category-level dev tuning. NOT registered in the harness
 * registry — only `index.ts` is the candidate. Each class moves one knob away
 * from DEFAULT_CONFIG so the README can report knob provenance honestly.
 */
import RriRetriever, { type RriConfig } from './index.js';

function variant(name: string, cfg: Partial<RriConfig>): new () => RriRetriever {
  return class extends RriRetriever {
    override readonly name: string = name;
    constructor() {
      super(cfg);
    }
  };
}

/** Pure Random Indexing: no reflective pass, direct channel only. */
export const RriNoReflect = variant('rri-noreflect', { reflectivePasses: 0 });
/** Convex-combination weight sweep (digest §(c)). */
export const RriLam40 = variant('rri-lam40', { lambdaDirect: 0.4 });
export const RriLam50 = variant('rri-lam50', { lambdaDirect: 0.5 });
export const RriLam60 = variant('rri-lam60', { lambdaDirect: 0.6 });
export const RriLam70 = variant('rri-lam70', { lambdaDirect: 0.7 });
export const RriLam80 = variant('rri-lam80', { lambdaDirect: 0.8 });
/** Reflective-channel query blend sweep. */
export const RriGamma0 = variant('rri-g0', { gammaIndex: 0 });
export const RriGamma50 = variant('rri-g50', { gammaIndex: 0.5 });
/** Kind-prior sweeps. */
export const RriLex85 = variant('rri-lex85', { lexemeMult: 0.85 });
export const RriLex50 = variant('rri-lex50', { lexemeMult: 0.5 });
export const RriPref100 = variant('rri-pref100', { prefaceMult: 1 });
export const RriPref70 = variant('rri-pref70', { prefaceMult: 0.7 });
/** Semantic admission floor sweep. */
export const RriSem40 = variant('rri-sem40', { tauSem: 0.4 });
export const RriSem55 = variant('rri-sem55', { tauSem: 0.55 });
/** Known-idf-mass gate sweep. */
export const RriMass60 = variant('rri-mass60', { tauMass: 0.6 });
export const RriMass80 = variant('rri-mass80', { tauMass: 0.8 });
/** Title-weight sweep (wt6 became the default; wt4 is the revert probe). */
export const RriTitle4 = variant('rri-wt4', { wTitle: 4, wAlias: 3, wTitleR: 4, wAliasR: 3 });
/** Second reflective cycle (digest recipe is one pass; measurement only). */
export const RriRefl2 = variant('rri-refl2', { reflectivePasses: 2 });
/** Query idf sharpening for long NL queries. */
export const RriQpow15 = variant('rri-qpow15', { queryIdfPow: 1.5 });
/** Body-heavier reflective channel (situation vocabulary lives in bodies). */
export const RriRw221 = variant('rri-rw221', { wTitleR: 2, wAliasR: 2, wBodyR: 1 });
/** Combined refinement probe: idf sharpening + body-heavy reflective channel. */
export const RriCombo = variant('rri-combo', {
  queryIdfPow: 1.5,
  wTitleR: 2,
  wAliasR: 2,
  wBodyR: 1,
});
