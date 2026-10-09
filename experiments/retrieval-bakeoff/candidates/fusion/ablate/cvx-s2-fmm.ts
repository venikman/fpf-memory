// Ablation variant — see ../README.md. Not registered in the harness registry.
import FusionRetriever from '../index.js';

export default class extends FusionRetriever {
  constructor() {
    super({ name: 'fusion-cvx-s2-fmm', norm: 'minmax', sources: [{ id: 'bm25f', weight: 0.6 }, { id: 'graph-ppr', weight: 0.2 }, { id: 'flow', weight: 0.2 }] });
  }
}
