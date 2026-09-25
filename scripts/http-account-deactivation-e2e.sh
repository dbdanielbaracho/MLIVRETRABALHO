#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
STAMP="$(date +%s)-$RANDOM"
EMAIL="deactivate-${STAMP}@example.test"
PASSWORD="DeactivatePass123!"

json_field(){ node -e 'const fs=require("fs");let x=JSON.parse(fs.readFileSync(0,"utf8"));for(const p of process.argv[1].split(".")){x=x?.[p]}if(x===undefined||x===null)process.exit(2);process.stdout.write(String(x));' "$1"; }
request(){ local method="$1" url="$2" token="${3:-}" body="${4:-}"; local args=(-sS --fail-with-body -X "$method" "${BASE_URL%/}$url"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }

request POST /v1/auth/signup '' "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"professional\"}" >/dev/null
TOKEN="$(request POST /v1/auth/signin '' "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
request PUT /v1/professional-profile "$TOKEN" '{"displayName":"Deactivate Test","homeCity":"São Paulo","primaryRole":"Bartender"}' >/dev/null

RESULT="$(request POST /v1/privacy/deactivate "$TOKEN" '{}')"
test "$(printf '%s' "$RESULT" | json_field deactivated)" = "true"

OLD_TOKEN_STATUS="$(curl -sS -o /tmp/deactivate-old-token.json -w '%{http_code}' -H "authorization: Bearer $TOKEN" "${BASE_URL%/}/v1/me")"
test "$OLD_TOKEN_STATUS" = "401"

SIGNIN_STATUS="$(curl -sS -o /tmp/deactivate-signin.json -w '%{http_code}' -H 'content-type: application/json' --data "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}" "${BASE_URL%/}/v1/auth/signin")"
test "$SIGNIN_STATUS" = "401"

echo "PASS: account deactivation revokes sessions and blocks signin"
