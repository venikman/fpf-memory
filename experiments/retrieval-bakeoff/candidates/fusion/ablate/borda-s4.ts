// Ablation variant — see ../README.md. Not registered in the harness registry.
import FusionRetriever from '../index.js';

export default class extends FusionRetriever {
  constructor() {
    super({ name: 'fusion-borda-s4', norm: 'borda', sources: [{ id: 'bm25f', weight: 1 }, { id: 'rri', weight: 0.5 }, { id: 'graph-ppr', weight: 0.5 }, { id: 'trigram-fuzzy', weight: 0.5 }] });
  }
}
