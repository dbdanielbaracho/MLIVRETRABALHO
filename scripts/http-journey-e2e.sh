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
contains(){ [[ "$1" == *"$2"* ]] || { echo "missing expected value: $2" >&2; return 1; }; }
request(){ local method="$1" url="$2" token="${3:-}" tenant="${4:-}" body="${5:-}"; local args=(-sS --fail-with-body -X "$method" "${BASE_URL%/}$url"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$tenant" ]] && args+=(-H "x-tenant-id: $tenant"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }
status_only(){ local method="$1" url="$2" token="$3" tenant="$4"; curl -sS -o /tmp/http-journey-negative.json -w '%{http_code}' -X "$method" "${BASE_URL%/}$url" -H "authorization: Bearer $token" -H "x-tenant-id: $tenant"; }

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
contains "$AVAILABILITY" 'startsAt'

JOB="$(request POST /v1/company/jobs "$COMPANY_TOKEN" "$TENANT_ID" "{\"title\":\"Bartender A\",\"requiredRole\":\"Bartender\",\"workCity\":\"São Paulo\",\"location\":\"Centro\",\"startsAt\":\"$START_AT\",\"endsAt\":\"$END_AT\",\"payCents\":25000}")"
JOB_ID="$(printf '%s' "$JOB" | json_field id)"
JOB2="$(request POST /v1/company/jobs "$COMPANY2_TOKEN" "$TENANT2_ID" "{\"title\":\"Bartender B\",\"requiredRole\":\"Bartender\",\"workCity\":\"São Paulo\",\"location\":\"Paulista\",\"startsAt\":\"$START2_AT\",\"endsAt\":\"$END2_AT\",\"payCents\":30000}")"
JOB2_ID="$(printf '%s' "$JOB2" | json_field id)"

JOBS="$(request GET /v1/jobs "$PRO_TOKEN")"
contains "$JOBS" "$JOB_ID"
contains "$JOBS" "$JOB2_ID"

for JOBX in "$JOB_ID" "$JOB2_ID"; do
  test "$(request POST "/v1/jobs/$JOBX/interest" "$PRO_TOKEN" | json_field status)" = "interested"
done

RECOMMENDATIONS="$(request GET "/v1/company/jobs/$JOB_ID/recommendations" "$COMPANY_TOKEN" "$TENANT_ID")"
contains "$RECOMMENDATIONS" "$PROFESSIONAL_ID"
RECOMMENDATIONS2="$(request GET "/v1/company/jobs/$JOB2_ID/recommendations" "$COMPANY2_TOKEN" "$TENANT2_ID")"
contains "$RECOMMENDATIONS2" "$PROFESSIONAL_ID"

CONFIRM="$(request POST "/v1/company/jobs/$JOB_ID/confirm" "$COMPANY_TOKEN" "$TENANT_ID" "{\"professionalId\":\"$PROFESSIONAL_ID\"}")"
ASSIGNMENT_ID="$(printf '%s' "$CONFIRM" | json_field id)"
CONFIRM2="$(request POST "/v1/company/jobs/$JOB2_ID/confirm" "$COMPANY2_TOKEN" "$TENANT2_ID" "{\"professionalId\":\"$PROFESSIONAL_ID\"}")"
ASSIGNMENT2_ID="$(printf '%s' "$CONFIRM2" | json_field id)"
test "$(printf '%s' "$CONFIRM" | json_field tenantId)" = "$TENANT_ID"
test "$(printf '%s' "$CONFIRM2" | json_field tenantId)" = "$TENANT2_ID"

PRO_ME="$(request GET /v1/me "$PRO_TOKEN")"
contains "$PRO_ME" "$TENANT_ID"
contains "$PRO_ME" "$TENANT2_ID"

MINE="$(request GET /v1/assignments/mine "$PRO_TOKEN")"
contains "$MINE" "$ASSIGNMENT_ID"
contains "$MINE" "$ASSIGNMENT2_ID"
contains "$MINE" "$TENANT_ID"
contains "$MINE" "$TENANT2_ID"

COMPANY_MESSAGE="$(request POST "/v1/conversations/$ASSIGNMENT_ID/messages" "$COMPANY_TOKEN" "$TENANT_ID" '{"body":"Olá, confirme seu horário."}')"
contains "$COMPANY_MESSAGE" 'confirme seu horário'
PRO_MESSAGES="$(request GET "/v1/conversations/$ASSIGNMENT_ID/messages" "$PRO_TOKEN" "$TENANT_ID")"
contains "$PRO_MESSAGES" 'confirme seu horário'
PRO_NOTIFICATIONS="$(request GET /v1/notifications/mine "$PRO_TOKEN" "$TENANT_ID")"
contains "$PRO_NOTIFICATIONS" 'new_message'
PRO_REPLY="$(request POST "/v1/conversations/$ASSIGNMENT_ID/messages" "$PRO_TOKEN" "$TENANT_ID" '{"body":"Confirmado, estarei no horário."}')"
contains "$PRO_REPLY" 'Confirmado'
COMPANY_NOTIFICATIONS="$(request GET /v1/notifications/mine "$COMPANY_TOKEN" "$TENANT_ID")"
contains "$COMPANY_NOTIFICATIONS" 'new_message'
WRONG_TENANT_STATUS="$(status_only GET "/v1/conversations/$ASSIGNMENT_ID/messages" "$COMPANY2_TOKEN" "$TENANT2_ID")"
test "$WRONG_TENANT_STATUS" = "404"

for STEP in check-in start check-out complete; do
  STATUS="$(case "$STEP" in check-in) echo checked_in;; start) echo in_progress;; check-out) echo checked_out;; complete) echo completed;; esac)"
  test "$(request POST "/v1/assignments/$ASSIGNMENT_ID/$STEP" "$PRO_TOKEN" "$TENANT_ID" '{}' | json_field status)" = "$STATUS"
done

EARNINGS="$(request GET /v1/earnings/mine "$PRO_TOKEN")"
contains "$EARNINGS" '25000'
contains "$EARNINGS" "$TENANT_ID"

RATING="$(request POST "/v1/assignments/$ASSIGNMENT_ID/rating" "$COMPANY_TOKEN" "$TENANT_ID" '{"score":5,"comment":"Excelente"}')"
test "$(printf '%s' "$RATING" | json_field score)" = "5"

PASSPORT="$(request GET /v1/work-passport/mine "$PRO_TOKEN")"
node -e 'const p=JSON.parse(process.argv[1]);const tenant=process.argv[2];if(p.completedWorkCount!==1||p.ratingCount!==1||p.averageRating!==5||!p.verifiedHistory?.some(x=>x.tenantId===tenant)){console.error("passport assertion failed",JSON.stringify(p));process.exit(1)}' "$PASSPORT" "$TENANT_ID"

request POST /v1/auth/signout "$PRO_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$COMPANY_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$COMPANY2_TOKEN" '' '{}' >/dev/null

echo "PASS: HTTP journey multi-company + tenant-isolated chat/notifications"
