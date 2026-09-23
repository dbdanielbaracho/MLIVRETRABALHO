#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
STAMP="$(date +%s)-$RANDOM"
PRO_EMAIL="pro-${STAMP}@example.test"
COMPANY_EMAIL="company-${STAMP}@example.test"
COMPANY2_EMAIL="company2-${STAMP}@example.test"
PASSWORD="JourneyPass123!"
START_AT="$(node -e 'process.stdout.write(new Date(Date.now()+24*60*60*1000).toISOString())')"
END_AT="$(node -e 'process.stdout.write(new Date(Date.now()+32*60*60*1000).toISOString())')"
START2_AT="$(node -e 'process.stdout.write(new Date(Date.now()+48*60*60*1000).toISOString())')"
END2_AT="$(node -e 'process.stdout.write(new Date(Date.now()+56*60*60*1000).toISOString())')"
AVAIL_START="$(node -e 'process.stdout.write(new Date(Date.now()+23*60*60*1000).toISOString())')"
AVAIL_END="$(node -e 'process.stdout.write(new Date(Date.now()+57*60*60*1000).toISOString())')"

json_field(){ node -e 'const fs=require("fs");let x=JSON.parse(fs.readFileSync(0,"utf8"));for(const p of process.argv[1].split(".")){if(/^\d+$/.test(p))x=x[Number(p)];else x=x?.[p]}if(x===undefined||x===null)process.exit(2);process.stdout.write(String(x));' "$1"; }
request(){ local method="$1" url="$2" token="${3:-}" tenant="${4:-}" body="${5:-}"; local args=(-sS --fail-with-body -X "$method" "${BASE_URL%/}$url"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$tenant" ]] && args+=(-H "x-tenant-id: $tenant"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }

PRO_SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$PRO_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"professional\"}")"
test "$(printf '%s' "$PRO_SIGNUP" | json_field accountType)" = "professional"
COMPANY_SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$COMPANY_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"HTTP Journey Company A\"}")"
TENANT_ID="$(printf '%s' "$COMPANY_SIGNUP" | json_field tenantId)"
COMPANY2_SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$COMPANY2_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"HTTP Journey Company B\"}")"
TENANT2_ID="$(printf '%s' "$COMPANY2_SIGNUP" | json_field tenantId)"

test "$(printf '%s' "$COMPANY_SIGNUP" | json_field role)" = "owner"
test "$(printf '%s' "$COMPANY2_SIGNUP" | json_field role)" = "owner"

PRO_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$PRO_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
COMPANY_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$COMPANY_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
COMPANY2_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$COMPANY2_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"

PROFILE="$(request PUT /v1/professional-profile "$PRO_TOKEN" '' '{"displayName":"HTTP Bartender","homeCity":"São Paulo","primaryRole":"Bartender"}')"
PROFESSIONAL_ID="$(printf '%s' "$PROFILE" | json_field id)"

AVAILABILITY="$(request POST /v1/availability/mine "$PRO_TOKEN" '' "{\"startsAt\":\"$AVAIL_START\",\"endsAt\":\"$AVAIL_END\"}")"
printf '%s' "$AVAILABILITY" | grep -q 'startsAt'

JOB="$(request POST /v1/company/jobs "$COMPANY_TOKEN" "$TENANT_ID" "{\"title\":\"Bartender A\",\"requiredRole\":\"Bartender\",\"workCity\":\"São Paulo\",\"location\":\"Centro\",\"startsAt\":\"$START_AT\",\"endsAt\":\"$END_AT\",\"payCents\":25000}")"
JOB_ID="$(printf '%s' "$JOB" | json_field id)"
JOB2="$(request POST /v1/company/jobs "$COMPANY2_TOKEN" "$TENANT2_ID" "{\"title\":\"Bartender B\",\"requiredRole\":\"Bartender\",\"workCity\":\"São Paulo\",\"location\":\"Paulista\",\"startsAt\":\"$START2_AT\",\"endsAt\":\"$END2_AT\",\"payCents\":30000}")"
JOB2_ID="$(printf '%s' "$JOB2" | json_field id)"

JOBS="$(request GET /v1/jobs "$PRO_TOKEN")"
printf '%s' "$JOBS" | grep -q "$JOB_ID"
printf '%s' "$JOBS" | grep -q "$JOB2_ID"

for JOBX in "$JOB_ID" "$JOB2_ID"; do
  test "$(request POST "/v1/jobs/$JOBX/interest" "$PRO_TOKEN" | json_field status)" = "interested"
done

RECOMMENDATIONS="$(request GET "/v1/company/jobs/$JOB_ID/recommendations" "$COMPANY_TOKEN" "$TENANT_ID")"
printf '%s' "$RECOMMENDATIONS" | grep -q "$PROFESSIONAL_ID"
RECOMMENDATIONS2="$(request GET "/v1/company/jobs/$JOB2_ID/recommendations" "$COMPANY2_TOKEN" "$TENANT2_ID")"
printf '%s' "$RECOMMENDATIONS2" | grep -q "$PROFESSIONAL_ID"

CONFIRM="$(request POST "/v1/company/jobs/$JOB_ID/confirm" "$COMPANY_TOKEN" "$TENANT_ID" "{\"professionalId\":\"$PROFESSIONAL_ID\"}")"
ASSIGNMENT_ID="$(printf '%s' "$CONFIRM" | json_field id)"
CONFIRM2="$(request POST "/v1/company/jobs/$JOB2_ID/confirm" "$COMPANY2_TOKEN" "$TENANT2_ID" "{\"professionalId\":\"$PROFESSIONAL_ID\"}")"
ASSIGNMENT2_ID="$(printf '%s' "$CONFIRM2" | json_field id)"
test "$(printf '%s' "$CONFIRM" | json_field tenantId)" = "$TENANT_ID"
test "$(printf '%s' "$CONFIRM2" | json_field tenantId)" = "$TENANT2_ID"

PRO_ME="$(request GET /v1/me "$PRO_TOKEN")"
printf '%s' "$PRO_ME" | grep -q "$TENANT_ID"
printf '%s' "$PRO_ME" | grep -q "$TENANT2_ID"

MINE="$(request GET /v1/assignments/mine "$PRO_TOKEN")"
printf '%s' "$MINE" | grep -q "$ASSIGNMENT_ID"
printf '%s' "$MINE" | grep -q "$ASSIGNMENT2_ID"
printf '%s' "$MINE" | grep -q "$TENANT_ID"
printf '%s' "$MINE" | grep -q "$TENANT2_ID"

for STEP in check-in start check-out complete; do
  STATUS="$(case "$STEP" in check-in) echo checked_in;; start) echo in_progress;; check-out) echo checked_out;; complete) echo completed;; esac)"
  test "$(request POST "/v1/assignments/$ASSIGNMENT_ID/$STEP" "$PRO_TOKEN" "$TENANT_ID" '{}' | json_field status)" = "$STATUS"
done

EARNINGS="$(request GET /v1/earnings/mine "$PRO_TOKEN")"
printf '%s' "$EARNINGS" | grep -q '25000'
printf '%s' "$EARNINGS" | grep -q "$TENANT_ID"

RATING="$(request POST "/v1/assignments/$ASSIGNMENT_ID/rating" "$COMPANY_TOKEN" "$TENANT_ID" '{"score":5,"comment":"Excelente"}')"
test "$(printf '%s' "$RATING" | json_field score)" = "5"

PASSPORT="$(request GET /v1/work-passport/mine "$PRO_TOKEN")"
test "$(printf '%s' "$PASSPORT" | json_field completedWorkCount)" = "1"
test "$(printf '%s' "$PASSPORT" | json_field ratingCount)" = "1"
test "$(printf '%s' "$PASSPORT" | json_field averageRating)" = "5"
printf '%s' "$PASSPORT" | grep -q "$TENANT_ID"

request POST /v1/auth/signout "$PRO_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$COMPANY_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$COMPANY2_TOKEN" '' '{}' >/dev/null

echo "PASS: HTTP journey multi-company aggregation with two independent company tenants"
