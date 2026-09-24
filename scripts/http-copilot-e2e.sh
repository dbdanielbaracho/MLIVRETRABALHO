#!/usr/bin/env bash
set -euo pipefail
BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
STAMP="$(date +%s)-$RANDOM"
PASSWORD="CopilotPass123!"
PRO_EMAIL="copilot-pro-${STAMP}@example.test"
COMPANY_EMAIL="copilot-company-${STAMP}@example.test"
json_field(){ node -e 'const fs=require("fs");let x=JSON.parse(fs.readFileSync(0,"utf8"));for(const p of process.argv[1].split(".")){x=/^\d+$/.test(p)?x[Number(p)]:x?.[p]}if(x===undefined||x===null)process.exit(2);process.stdout.write(String(x));' "$1"; }
request(){ local method="$1" url="$2" token="${3:-}" body="${4:-}"; local args=(-sS --fail-with-body -X "$method" "${BASE_URL%/}$url"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }

request POST /v1/auth/signup '' "{\"email\":\"$PRO_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"professional\"}" >/dev/null
request POST /v1/auth/signup '' "{\"email\":\"$COMPANY_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"Copilot Company\"}" >/dev/null
PRO_TOKEN="$(request POST /v1/auth/signin '' "{\"email\":\"$PRO_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
COMPANY_TOKEN="$(request POST /v1/auth/signin '' "{\"email\":\"$COMPANY_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"

PRO="$(request POST /v1/copilot/interpret "$PRO_TOKEN" '{"text":"qual é meu próximo turno?","mode":"assisted"}')"
test "$(printf '%s' "$PRO" | json_field accountType)" = "professional"
test "$(printf '%s' "$PRO" | json_field intent)" = "show_schedule"
test "$(printf '%s' "$PRO" | json_field suggestedRoute)" = "/agenda"
test "$(printf '%s' "$PRO" | json_field executionAllowed)" = "false"

COMPANY="$(request POST /v1/copilot/interpret "$COMPANY_TOKEN" '{"text":"monte minha equipe para amanhã","mode":"assisted"}')"
test "$(printf '%s' "$COMPANY" | json_field accountType)" = "company"
test "$(printf '%s' "$COMPANY" | json_field intent)" = "company_staffing"
test "$(printf '%s' "$COMPANY" | json_field suggestedRoute)" = "/planejamento"
test "$(printf '%s' "$COMPANY" | json_field executionAllowed)" = "false"

CRITICAL="$(request POST /v1/copilot/interpret "$COMPANY_TOKEN" '{"text":"confirme candidato e pague automaticamente","mode":"automatic"}')"
test "$(printf '%s' "$CRITICAL" | json_field executionAllowed)" = "false"
test "$(printf '%s' "$CRITICAL" | json_field requiresHumanConfirmation)" = "true"
test "$(printf '%s' "$CRITICAL" | json_field providerConfigured)" = "false"

request POST /v1/auth/signout "$PRO_TOKEN" '{}' >/dev/null
request POST /v1/auth/signout "$COMPANY_TOKEN" '{}' >/dev/null

echo "PASS: copilot interprets safe intents and never executes critical actions"
