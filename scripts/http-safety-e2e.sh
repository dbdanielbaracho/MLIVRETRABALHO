#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
STAMP="$(date +%s)-$RANDOM"
PRO_EMAIL="safety-pro-${STAMP}@example.test"
COMPANY_A_EMAIL="safety-company-a-${STAMP}@example.test"
COMPANY_B_EMAIL="safety-company-b-${STAMP}@example.test"
PASSWORD="SafetyPass123!"
START_AT="$(node -e 'process.stdout.write(new Date(Date.now()+24*60*60*1000).toISOString())')"
END_AT="$(node -e 'process.stdout.write(new Date(Date.now()+32*60*60*1000).toISOString())')"

json_field(){ node -e 'const fs=require("fs");let x=JSON.parse(fs.readFileSync(0,"utf8"));for(const p of process.argv[1].split(".")){if(/^\d+$/.test(p))x=x[Number(p)];else x=x?.[p]}if(x===undefined||x===null)process.exit(2);process.stdout.write(String(x));' "$1"; }
contains(){ [[ "$1" == *"$2"* ]] || { echo "missing expected value: $2" >&2; return 1; }; }
not_contains(){ [[ "$1" != *"$2"* ]] || { echo "unexpected value present: $2" >&2; return 1; }; }
request(){ local method="$1" url="$2" token="${3:-}" tenant="${4:-}" body="${5:-}"; local args=(-sS --fail-with-body -X "$method" "${BASE_URL%/}$url"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$tenant" ]] && args+=(-H "x-tenant-id: $tenant"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }
status_only(){ local method="$1" url="$2" token="$3" tenant="$4" body="${5:-}"; local args=(-sS -o /tmp/safety-negative.json -w '%{http_code}' -X "$method" "${BASE_URL%/}$url" -H "authorization: Bearer $token" -H "x-tenant-id: $tenant"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }

request POST /v1/auth/signup '' '' "{\"email\":\"$PRO_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"professional\"}" >/dev/null
COMPANY_A_SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$COMPANY_A_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"Safety Company A\"}")"
TENANT_A="$(printf '%s' "$COMPANY_A_SIGNUP" | json_field tenantId)"
COMPANY_B_SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$COMPANY_B_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"Safety Company B\"}")"
TENANT_B="$(printf '%s' "$COMPANY_B_SIGNUP" | json_field tenantId)"

PRO_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$PRO_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
COMPANY_A_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$COMPANY_A_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
COMPANY_B_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$COMPANY_B_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"

PROFILE="$(request PUT /v1/professional-profile "$PRO_TOKEN" '' '{"displayName":"Safety Professional","homeCity":"São Paulo","primaryRole":"Bartender"}')"
PROFESSIONAL_ID="$(printf '%s' "$PROFILE" | json_field id)"

JOB="$(request POST /v1/company/jobs "$COMPANY_A_TOKEN" "$TENANT_A" "{\"title\":\"Safety Bartender\",\"requiredRole\":\"Bartender\",\"workCity\":\"São Paulo\",\"startsAt\":\"$START_AT\",\"endsAt\":\"$END_AT\",\"payCents\":15000}")"
JOB_ID="$(printf '%s' "$JOB" | json_field id)"
request POST "/v1/jobs/$JOB_ID/interest" "$PRO_TOKEN" >/dev/null
ASSIGNMENT="$(request POST "/v1/company/jobs/$JOB_ID/confirm" "$COMPANY_A_TOKEN" "$TENANT_A" "{\"professionalId\":\"$PROFESSIONAL_ID\"}")"
ASSIGNMENT_ID="$(printf '%s' "$ASSIGNMENT" | json_field id)"

CASE="$(request POST /v1/safety-cases "$PRO_TOKEN" "$TENANT_A" "{\"assignmentId\":\"$ASSIGNMENT_ID\",\"category\":\"unsafe_work\",\"description\":\"Condição insegura no local do trabalho\"}")"
CASE_ID="$(printf '%s' "$CASE" | json_field id)"
test "$(printf '%s' "$CASE" | json_field status)" = "open"

MINE="$(request GET /v1/safety-cases/mine "$PRO_TOKEN")"
contains "$MINE" "$CASE_ID"
contains "$MINE" "$TENANT_A"
contains "$MINE" 'Condição insegura'

COMPANY_A_CASES="$(request GET /v1/company/safety-cases "$COMPANY_A_TOKEN" "$TENANT_A")"
contains "$COMPANY_A_CASES" "$CASE_ID"
COMPANY_B_CASES="$(request GET /v1/company/safety-cases "$COMPANY_B_TOKEN" "$TENANT_B")"
not_contains "$COMPANY_B_CASES" "$CASE_ID"

CROSS_STATUS="$(status_only POST "/v1/company/safety-cases/$CASE_ID/status" "$COMPANY_B_TOKEN" "$TENANT_B" '{"status":"reviewing"}')"
test "$CROSS_STATUS" = "404"
UPDATED="$(request POST "/v1/company/safety-cases/$CASE_ID/status" "$COMPANY_A_TOKEN" "$TENANT_A" '{"status":"reviewing"}')"
test "$(printf '%s' "$UPDATED" | json_field status)" = "reviewing"
MINE_AFTER="$(request GET /v1/safety-cases/mine "$PRO_TOKEN")"
contains "$MINE_AFTER" 'reviewing'

request POST /v1/auth/signout "$PRO_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$COMPANY_A_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$COMPANY_B_TOKEN" '' '{}' >/dev/null

echo "PASS: safety case reporting + multi-company history + tenant isolation"
