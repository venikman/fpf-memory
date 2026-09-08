// Ablation variant — see ../README.md. Not registered in the harness registry.
import GraphPprRetriever from '../index.js';

export default class extends GraphPprRetriever {
  constructor() {
    super({name: 'ppr-mult-b10-r00',rho: 0,tau: 6,walkGamma: 1,combine: 'mult',beta: 1,walkScore: 'pi'});
  }
}
