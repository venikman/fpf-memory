#!/bin/sh
#
# fpf-memory pre-push hook — local memory preparation surface owner.
#
# Runs before `git push`. Fails the push on any error so stale or
# un-prepared commits never reach CI. Skip by setting FPF_SKIP_PUBLISH=1,
# for instance when pushing a branch that only touches docs/CI.
#
# Steps:
#   1. Refresh the runtime snapshot against the upstream working copy.
#   2. Optional LM Studio health check (skipped unless
#      FPF_LOCAL_LLM_BASE_URL or FPF_LOCAL_LLM_MODEL is set).
#   3. Publish the committed `published/current/**` surface.
#   4. Stage the published files so the user decides whether to amend
#      or make a new commit.

set -eu

if [ "${FPF_SKIP_PUBLISH:-}" = "1" ]; then
  echo "pre-push: FPF_SKIP_PUBLISH=1 — skipping publish step." >&2
  exit 0
fi

PUBLISH_SOURCE="${FPF_PUBLISH_SOURCE_PATH:-.fpf-upstream/FPF-Spec.md}"

if [ ! -f "$PUBLISH_SOURCE" ]; then
  echo "pre-push: publish source missing at $PUBLISH_SOURCE" >&2
  echo "          run \`bun run spec:download\` (or set FPF_PUBLISH_SOURCE_PATH) and retry." >&2
  exit 1
fi

echo "pre-push: refreshing runtime snapshot from $PUBLISH_SOURCE"
FPF_SPEC_SOURCE_PATH="$PUBLISH_SOURCE" bun run cli -- refresh

if [ -n "${FPF_LOCAL_LLM_BASE_URL:-}${FPF_LOCAL_LLM_MODEL:-}" ]; then
  echo "pre-push: running LM Studio health check"
  bun run cli -- lm-check --timeout-ms 60000 || {
    echo "pre-push: lm-check failed — set FPF_SKIP_PUBLISH=1 to bypass, or fix LM Studio." >&2
    exit 1
  }
else
  echo "pre-push: LM Studio not configured; skipping lm-check"
fi

echo "pre-push: publishing ./published/current/"
FPF_PUBLISH_SOURCE_PATH="$PUBLISH_SOURCE" bun run publish:current

git add published/current/FPF-Spec.md \
        published/current/fpf-index/snapshot.json \
        published/current/manifest.json

# Tell the user whether the publication diff is clean. If publish
# changed anything, they need to amend or make a new commit before
# pushing — exit non-zero so git aborts the push.
if ! git diff --cached --quiet -- published/current/; then
  echo "" >&2
  echo "pre-push: published/current/ changed — stage + commit (or amend) before pushing:" >&2
  git --no-pager diff --cached --stat -- published/current/ >&2
  echo "" >&2
  echo "  git commit --amend --no-edit   # fold into the tip commit" >&2
  echo "  # or:  git commit -m 'publish: refresh current channel'" >&2
  exit 1
fi

echo "pre-push: published/current/ is up to date."
