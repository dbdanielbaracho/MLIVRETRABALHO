#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
STAMP="$(date +%s)-$RANDOM"
PRO_EMAIL="rating-pro-${STAMP}@example.test"
COMPANY_EMAIL="rating-company-${STAMP}@example.test"
OTHER_EMAIL="rating-other-${STAMP}@example.test"
PASSWORD="RatingPass123!"
START_AT="$(node -e 'process.stdout.write(new Date(Date.now()+24*60*60*1000).toISOString())')"
END_AT="$(node -e 'process.stdout.write(new Date(Date.now()+32*60*60*1000).toISOString())')"
NEXT_START_AT="$(node -e 'process.stdout.write(new Date(Date.now()+48*60*60*1000).toISOString())')"
NEXT_END_AT="$(node -e 'process.stdout.write(new Date(Date.now()+56*60*60*1000).toISOString())')"
AVAIL_START="$(node -e 'process.stdout.write(new Date(Date.now()+23*60*60*1000).toISOString())')"
AVAIL_END="$(node -e 'process.stdout.write(new Date(Date.now()+57*60*60*1000).toISOString())')"

json_field(){ node -e 'const fs=require("fs");let x=JSON.parse(fs.readFileSync(0,"utf8"));for(const p of process.argv[1].split(".")){if(/^\d+$/.test(p))x=x[Number(p)];else x=x?.[p]}if(x===undefined||x===null)process.exit(2);process.stdout.write(String(x));' "$1"; }
request(){ local method="$1" url="$2" token="${3:-}" tenant="${4:-}" body="${5:-}"; local args=(-sS --fail-with-body -X "$method" "${BASE_URL%/}$url"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$tenant" ]] && args+=(-H "x-tenant-id: $tenant"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }
status_only(){ local method="$1" url="$2" token="$3" tenant="$4" body="$5"; curl -sS -o /tmp/rating-negative.json -w '%{http_code}' -X "$method" "${BASE_URL%/}$url" -H "authorization: Bearer $token" -H "x-tenant-id: $tenant" -H 'content-type: application/json' --data "$body"; }

request POST /v1/auth/signup '' '' "{\"email\":\"$PRO_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"professional\"}" >/dev/null
COMPANY_SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$COMPANY_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"Ratings Company\"}")"
TENANT_ID="$(printf '%s' "$COMPANY_SIGNUP" | json_field tenantId)"
OTHER_SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$OTHER_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"Other Company\"}")"
OTHER_TENANT="$(printf '%s' "$OTHER_SIGNUP" | json_field tenantId)"

PRO_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$PRO_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
COMPANY_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$COMPANY_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
OTHER_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$OTHER_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"

PROFILE="$(request PUT /v1/professional-profile "$PRO_TOKEN" '' '{"displayName":"Rating Professional","homeCity":"São Paulo","primaryRole":"Bartender"}')"
PROFESSIONAL_ID="$(printf '%s' "$PROFILE" | json_field id)"
request POST /v1/availability/mine "$PRO_TOKEN" '' "{\"startsAt\":\"$AVAIL_START\",\"endsAt\":\"$AVAIL_END\"}" >/dev/null

JOB="$(request POST /v1/company/jobs "$COMPANY_TOKEN" "$TENANT_ID" "{\"title\":\"Bartender Rating\",\"requiredRole\":\"Bartender\",\"workCity\":\"São Paulo\",\"startsAt\":\"$START_AT\",\"endsAt\":\"$END_AT\",\"payCents\":20000}")"
JOB_ID="$(printf '%s' "$JOB" | json_field id)"
request POST "/v1/jobs/$JOB_ID/interest" "$PRO_TOKEN" >/dev/null
ASSIGNMENT="$(request POST "/v1/company/jobs/$JOB_ID/confirm" "$COMPANY_TOKEN" "$TENANT_ID" "{\"professionalId\":\"$PROFESSIONAL_ID\"}")"
ASSIGNMENT_ID="$(printf '%s' "$ASSIGNMENT" | json_field id)"

for STEP in check-in start check-out complete; do
  request POST "/v1/assignments/$ASSIGNMENT_ID/$STEP" "$PRO_TOKEN" "$TENANT_ID" '{}' >/dev/null
done

PRO_RATING="$(request POST "/v1/assignments/$ASSIGNMENT_ID/rating" "$COMPANY_TOKEN" "$TENANT_ID" '{"score":5,"comment":"Excelente profissional"}')"
test "$(printf '%s' "$PRO_RATING" | json_field score)" = "5"
COMPANY_RATING="$(request POST "/v1/assignments/$ASSIGNMENT_ID/company-rating" "$PRO_TOKEN" "$TENANT_ID" '{"score":4,"comment":"Boa empresa"}')"
test "$(printf '%s' "$COMPANY_RATING" | json_field score)" = "4"

MINE="$(request GET /v1/assignments/mine "$PRO_TOKEN")"
node -e 'const rows=JSON.parse(process.argv[1]);const id=process.argv[2];const row=rows.find(x=>x.id===id);if(!row||row.companyRatingScore!==4){console.error(JSON.stringify(row));process.exit(1)}' "$MINE" "$ASSIGNMENT_ID"

UPDATED="$(request POST "/v1/assignments/$ASSIGNMENT_ID/company-rating" "$PRO_TOKEN" "$TENANT_ID" '{"score":3,"comment":"Atualização"}')"
test "$(printf '%s' "$UPDATED" | json_field score)" = "3"

CROSS_STATUS="$(status_only POST "/v1/assignments/$ASSIGNMENT_ID/company-rating" "$OTHER_TOKEN" "$OTHER_TENANT" '{"score":1}')"
test "$CROSS_STATUS" = "400" || test "$CROSS_STATUS" = "401" || test "$CROSS_STATUS" = "403"

NEXT_JOB="$(request POST /v1/company/jobs "$COMPANY_TOKEN" "$TENANT_ID" "{\"title\":\"Bartender Reputation\",\"requiredRole\":\"Bartender\",\"workCity\":\"São Paulo\",\"startsAt\":\"$NEXT_START_AT\",\"endsAt\":\"$NEXT_END_AT\",\"payCents\":22000}")"
NEXT_JOB_ID="$(printf '%s' "$NEXT_JOB" | json_field id)"
JOBS="$(request GET /v1/jobs "$PRO_TOKEN")"
node -e 'const rows=JSON.parse(process.argv[1]);const id=process.argv[2];const row=rows.find(x=>x.id===id);if(!row||row.companyAverageRating!==3||row.companyRatingCount!==1){console.error("reputation assertion failed",JSON.stringify(row));process.exit(1)}' "$JOBS" "$NEXT_JOB_ID"

request POST /v1/auth/signout "$PRO_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$COMPANY_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$OTHER_TOKEN" '' '{}' >/dev/null

echo "PASS: bidirectional ratings + idempotent update + network-shared company reputation"
