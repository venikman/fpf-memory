// Ablation variant — see ../README.md. Not registered in the harness registry.
import FusionRetriever from '../index.js';

export default class extends FusionRetriever {
  constructor() {
    super({ name: 'fusion-w5f-rri05-f02', norm: 'minmax', rrfK: 10, sources: [{ id: 'bm25f', weight: 0.7 }, { id: 'graph-ppr', weight: 0.3 }, { id: 'rri', weight: 0.05 }, { id: 'trigram-fuzzy', weight: 0.1 }, { id: 'flow', weight: 0.2, norm: 'rrf' }] });
  }
}
