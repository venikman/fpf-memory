// Ablation variant — see ../README.md. Not registered in the harness registry.
import FusionRetriever from '../index.js';

export default class extends FusionRetriever {
  constructor() {
    super({ name: 'fusion-cvx-s2-l8', norm: 'minmax', sources: [{ id: 'bm25f', weight: 0.8 }, { id: 'graph-ppr', weight: 0.2 }] });
  }
}
