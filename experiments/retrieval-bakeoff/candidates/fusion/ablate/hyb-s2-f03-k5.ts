// Ablation variant — see ../README.md. Not registered in the harness registry.
import FusionRetriever from '../index.js';

export default class extends FusionRetriever {
  constructor() {
    super({ name: 'fusion-hyb-s2-f03-k5', norm: 'minmax', rrfK: 5, sources: [{ id: 'bm25f', weight: 0.7 }, { id: 'graph-ppr', weight: 0.3 }, { id: 'flow', weight: 0.3, norm: 'rrf' }] });
  }
}
