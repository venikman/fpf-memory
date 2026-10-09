// Ablation variant — see ../README.md. Not registered in the harness registry.
import GraphPprRetriever from '../index.js';

export default class extends GraphPprRetriever {
  constructor() {
    super({name: 'ppr-puref-r00',rho: 0,tau: 6,walkGamma: 1,combine: 'pure',walkScore: 'flow'});
  }
}
