// Ablation variant — see ../README.md. Not registered in the harness registry.
import GraphPprRetriever from '../index.js';

export default class extends GraphPprRetriever {
  constructor() {
    super({name: 'ppr-flow-uniform',rho: 0,tau: 6,walkGamma: 1,combine: 'convex',lambda: 0.7,walkScore: 'flow',uniformEdgeWeights: true});
  }
}
