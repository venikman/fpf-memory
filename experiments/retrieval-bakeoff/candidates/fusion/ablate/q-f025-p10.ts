// Ablation variant — see ../README.md. Not registered in the harness registry.
import FusionRetriever from '../index.js';

export default class extends FusionRetriever {
  constructor() {
    super({ name: 'fusion-q-f025-p10', norm: 'minmax', rrfK: 10, sources: [{ id: 'bm25f', weight: 0.7 }, { id: 'rri', weight: 0.1 }, { id: 'graph-ppr', weight: 0.1 }, { id: 'trigram-fuzzy', weight: 0.1 }, { id: 'flow', weight: 0.25, norm: 'rrf', pool: 10 }] });
  }
}
