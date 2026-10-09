// Ablation variant — see ../README.md. Not registered in the harness registry.
import FusionRetriever from '../index.js';

export default class extends FusionRetriever {
  constructor() {
    super({ name: 'fusion-cvx-s3', norm: 'minmax', sources: [{ id: 'bm25f', weight: 0.7 }, { id: 'rri', weight: 0.15 }, { id: 'graph-ppr', weight: 0.15 }] });
  }
}
