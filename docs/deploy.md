---
title: "Deploy to Mastra Cloud"
description: "How the hosted FPF runtime reaches Mastra Cloud and how to wire up CI-driven deploys."
---

# Deploy to Mastra Cloud

The hosted MCP surface is packaged by [`npx mastra build`](../package.json) and pushed to [Mastra Cloud](https://mastra.ai) by [`npx mastra server deploy`](../package.json). Two GitHub workflows cover the pipeline:

- [`.github/workflows/deploy-validation.yml`](../.github/workflows/deploy-validation.yml) — runs on every PR and `push` to `main`. Dry-run: stages assets with `bun run predeploy`, builds with `npx mastra build`, asserts the bundle is well-formed. No credentials needed.
- [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) — runs on `workflow_dispatch` only (click **Run workflow** in the Actions tab, or `gh workflow run deploy.yml`). Does the full push. Requires three GitHub-side values.

## Pipeline stages

```
bun run deploy
  ├── bun run predeploy
  │     ├── bun run spec:download        → .fpf-upstream/FPF-Spec.md
  │     └── bash scripts/prepare-deploy.sh
  │           └── bun scripts/prepare-deploy.ts
  │                 └── stageDeployAssets(...) → src/mastra/public/.fpf-upstream/FPF-Spec.md
  │                                              src/mastra/public/.runtime/fpf-index/snapshot.json
  ├── npx mastra build                    → .mastra/output/
  └── npx mastra server deploy --yes      → Mastra Cloud
```

Only the final `mastra server deploy` step talks to Mastra Cloud. The first two stages are local and deterministic; that is what `deploy-validation.yml` exercises.

## One-time setup for CI-driven deploys

1. **Create a Mastra Cloud API token** (locally, once):
   ```bash
   bun x mastra auth login                     # browser OAuth
   bun x mastra auth tokens create ci-deploy   # prints the token — copy it
   ```
   Save the token — Mastra does not show it again.

2. **Add the token as a GitHub secret**: repo **Settings → Secrets and variables → Actions → New repository secret**.
   - Name: `MASTRA_API_TOKEN`
   - Value: the token from step 1.

3. **Add the org and project IDs as GitHub variables** (same page → **Variables** tab → **New repository variable**):
   - `MASTRA_ORG_ID` — `bun x mastra auth whoami` prints it.
   - `MASTRA_PROJECT_ID` — open `.mastra-project.json` locally (gitignored, not in the repo) and copy `projectId`. If the file does not exist yet, run `bun x mastra init` in the repo root once to create it.

4. **Trigger a deploy**: go to **Actions → Deploy to Mastra Cloud → Run workflow**, or run `gh workflow run deploy.yml` from the CLI.

## Switching to auto-deploy on merge

When you're ready to remove the manual gate, change the trigger in [`deploy.yml`](../.github/workflows/deploy.yml):

```yaml
# from:
on:
  workflow_dispatch:

# to:
on:
  push:
    branches: [main]
  workflow_dispatch:   # keep manual trigger as a safety valve
```

Every merge to `main` will then deploy. Until you're confident the pipeline is safe, keep it on `workflow_dispatch` only.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `MASTRA_API_TOKEN secret is not set` | Step 2 skipped | Add the secret under repo Settings |
| `MASTRA_ORG_ID variable is not set` | Step 3 skipped | Add the variable |
| `mastra server deploy` hangs | Interactive prompt expecting input | Ensure `--yes` is passed (already wired in the workflow) |
| Build succeeds but deploy fails with 401 | Token revoked or expired | `bun x mastra auth tokens create <new-name>` and update the secret |
| Build succeeds but the deployed server 500s | Staged snapshot doesn't match runtime expectations | Check the `deploy-validation` workflow output for the same commit |

## Related

- [`scripts/prepare-deploy.sh`](../scripts/prepare-deploy.sh) — the wrapper invoked by `bun run predeploy`.
- [`scripts/prepare-deploy.ts`](../scripts/prepare-deploy.ts) — calls `stageDeployAssets` from [`src/build/stage-deploy-assets.ts`](../src/build/stage-deploy-assets.ts).
- [`docs/scripts.md`](./scripts.md) — full automation-script reference.
- [`docs/architecture/artifact-directories.md`](./architecture/artifact-directories.md) — where each output directory comes from.
