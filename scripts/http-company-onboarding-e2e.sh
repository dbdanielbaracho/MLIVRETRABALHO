#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
STAMP="$(date +%s)-$RANDOM"
EMAIL="company-onboard-${STAMP}@example.test"
PASSWORD="CompanyPass123!"
WORKSPACE="Empresa HTTP ${STAMP}"

json_field(){ node -e 'const fs=require("fs");let x=JSON.parse(fs.readFileSync(0,"utf8"));for(const p of process.argv[1].split(".")){if(/^\d+$/.test(p))x=x[Number(p)];else x=x?.[p]}if(x===undefined||x===null)process.exit(2);process.stdout.write(String(x));' "$1"; }
request(){ local method="$1" url="$2" token="${3:-}" tenant="${4:-}" body="${5:-}"; local args=(-sS --fail-with-body -X "$method" "${BASE_URL%/}$url"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$tenant" ]] && args+=(-H "x-tenant-id: $tenant"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }

SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"$WORKSPACE\"}")"
TENANT_ID="$(printf '%s' "$SIGNUP" | json_field tenantId)"
test "$(printf '%s' "$SIGNUP" | json_field role)" = "owner"
test "$(printf '%s' "$SIGNUP" | json_field accountType)" = "company"

SIGNIN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")"
TOKEN="$(printf '%s' "$SIGNIN" | json_field accessToken)"
printf '%s' "$SIGNIN" | grep -q "$TENANT_ID"
printf '%s' "$SIGNIN" | grep -q 'owner'

ME="$(request GET /v1/me "$TOKEN")"
printf '%s' "$ME" | grep -q "$TENANT_ID"
printf '%s' "$ME" | grep -q 'owner'

JOB="$(request POST /v1/company/jobs "$TOKEN" "$TENANT_ID" '{"title":"Bartender","requiredRole":"Bartender","workCity":"São Paulo","location":"Centro","payCents":10000}')"
test "$(printf '%s' "$JOB" | json_field title)" = "Bartender"
test "$(printf '%s' "$JOB" | json_field status)" = "open"

request POST /v1/auth/signout "$TOKEN" '' '{}' >/dev/null

echo "PASS: company signup creates workspace + owner membership + usable tenant"
