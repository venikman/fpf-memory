#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

QUERY_TEXT="${FPF_VERIFY_QUERY:-What is U.BoundedContext?}"
CLI_MODE="${FPF_VERIFY_MODE:-verbose}"
MAS_LOG="${FPF_MASTRA_LOG_PATH:-.runtime/logs/mastra.log}"
OBS_LOG="${FPF_MASTRA_OBSERVABILITY_PATH:-.runtime/logs/mastra-observability.json}"
AI_LOG="${FPF_AI_TRACE_LOG_PATH:-.runtime/logs/ai-traces.jsonl}"

[[ "$MAS_LOG" = /* ]] || MAS_LOG="$ROOT_DIR/$MAS_LOG"
[[ "$OBS_LOG" = /* ]] || OBS_LOG="$ROOT_DIR/$OBS_LOG"
[[ "$AI_LOG" = /* ]] || AI_LOG="$ROOT_DIR/$AI_LOG"

mkdir -p "$(dirname "$MAS_LOG")"

printf '==> Running type-check\n'
bun run check

mas_before_size="$([[ -f "$MAS_LOG" ]] && wc -c <"$MAS_LOG" | tr -d ' ' || printf '0')"

printf '==> Running CLI status\n'
bun run cli -- status >/dev/null

mas_after_size="$(wc -c <"$MAS_LOG" | tr -d ' ')"
(( mas_after_size > mas_before_size ))
grep -q '"msg":"CLI command start"' "$MAS_LOG"
grep -q '"msg":"CLI command finished"' "$MAS_LOG"

printf '==> Starting MCP stdio server briefly\n'
bun run mcp >/dev/null 2>&1 &
mcp_pid="$!"
trap 'kill "$mcp_pid" 2>/dev/null || true; wait "$mcp_pid" 2>/dev/null || true' EXIT
sleep 2
kill "$mcp_pid" 2>/dev/null || true
wait "$mcp_pid" 2>/dev/null || true
trap - EXIT

grep -q '"msg":"MCP stdio server start"' "$MAS_LOG"

printf '==> Starting hosted Hono runtime briefly\n'
hosted_before_size="$(wc -c <"$MAS_LOG" | tr -d ' ')"
FPF_VERIFY_PORT="${FPF_VERIFY_PORT:-42111}"
PORT="$FPF_VERIFY_PORT" bun run start >/dev/null 2>&1 &
hosted_pid="$!"
trap 'kill "$hosted_pid" 2>/dev/null || true; wait "$hosted_pid" 2>/dev/null || true' EXIT
deadline=$((SECONDS + 15))
until [[ "$(wc -c <"$MAS_LOG" | tr -d ' ')" -gt "$hosted_before_size" ]] \
  && tail -c +"$((hosted_before_size + 1))" "$MAS_LOG" | grep -q '"msg":"Mastra Hono server start"'; do
  if ! kill -0 "$hosted_pid" 2>/dev/null; then
    printf 'Hosted runtime exited before emitting startup log\n' >&2
    exit 1
  fi
  (( SECONDS < deadline )) || {
    printf 'Timed out waiting for hosted runtime startup log\n' >&2
    exit 1
  }
  sleep 0.2
done
kill "$hosted_pid" 2>/dev/null || true
wait "$hosted_pid" 2>/dev/null || true
trap - EXIT

hosted_after_size="$(wc -c <"$MAS_LOG" | tr -d ' ')"
(( hosted_after_size > hosted_before_size ))

printf '==> CLI, MCP, and hosted runtime logging verified\n'
printf '    runtime log: %s\n' "$MAS_LOG"

if [[ -n "${FPF_LOCAL_LLM_BASE_URL:-}" || -n "${FPF_LOCAL_LLM_MODEL:-}" ]]; then
  printf '==> Running LM Studio-backed query\n'
  obs_before_size="$([[ -f "$OBS_LOG" ]] && wc -c <"$OBS_LOG" | tr -d ' ' || printf '0')"
  ai_before_size="$([[ -f "$AI_LOG" ]] && wc -c <"$AI_LOG" | tr -d ' ' || printf '0')"

  bun run cli -- query --question "$QUERY_TEXT" --mode "$CLI_MODE" >/dev/null

  obs_after_size="$(wc -c <"$OBS_LOG" | tr -d ' ')"
  ai_after_size="$(wc -c <"$AI_LOG" | tr -d ' ')"

  (( obs_after_size > obs_before_size ))
  (( ai_after_size > ai_before_size ))
  grep -q '"type": "model_generation"' "$OBS_LOG"
  grep -q '"provider": "lm_studio"' "$OBS_LOG"
  grep -q '"phase":"request"' "$AI_LOG"
  grep -Fq "\"question\":\"$QUERY_TEXT\"" "$AI_LOG"

  printf '==> LM Studio synthesis logging verified\n'
  printf '    observability log: %s\n' "$OBS_LOG"
  printf '    ai trace log: %s\n' "$AI_LOG"
else
  printf '==> Skipping LM Studio verification because neither FPF_LOCAL_LLM_BASE_URL nor FPF_LOCAL_LLM_MODEL is set\n'
fi

printf '==> Verification complete\n'
