// Ablation variant — see ../README.md. Not registered in the harness registry.
import FusionRetriever from '../index.js';

export default class extends FusionRetriever {
  constructor() {
    super({ name: 'fusion-q75-f02-k10', norm: 'minmax', rrfK: 10, sources: [{ id: 'bm25f', weight: 0.75 }, { id: 'rri', weight: 0.1 }, { id: 'graph-ppr', weight: 0.1 }, { id: 'trigram-fuzzy', weight: 0.1 }, { id: 'flow', weight: 0.2, norm: 'rrf' }] });
  }
}
