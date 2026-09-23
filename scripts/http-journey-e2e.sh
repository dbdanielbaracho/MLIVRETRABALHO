#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
DATABASE_URL="${DATABASE_URL:?DATABASE_URL_required}"
STAMP="$(date +%s)-$RANDOM"
PRO_EMAIL="pro-${STAMP}@example.test"
COMPANY_EMAIL="company-${STAMP}@example.test"
PASSWORD="JourneyPass123!"
START_AT="$(node -e 'process.stdout.write(new Date(Date.now()+24*60*60*1000).toISOString())')"
END_AT="$(node -e 'process.stdout.write(new Date(Date.now()+32*60*60*1000).toISOString())')"
AVAIL_START="$(node -e 'process.stdout.write(new Date(Date.now()+23*60*60*1000).toISOString())')"
AVAIL_END="$(node -e 'process.stdout.write(new Date(Date.now()+33*60*60*1000).toISOString())')"

json_field(){ node -e 'const fs=require("fs");let x=JSON.parse(fs.readFileSync(0,"utf8"));for(const p of process.argv[1].split(".")){if(/^\d+$/.test(p))x=x[Number(p)];else x=x?.[p]}if(x===undefined||x===null)process.exit(2);process.stdout.write(String(x));' "$1"; }
request(){ local method="$1" url="$2" token="${3:-}" tenant="${4:-}" body="${5:-}"; local args=(-sS --fail-with-body -X "$method" "${BASE_URL%/}$url"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$tenant" ]] && args+=(-H "x-tenant-id: $tenant"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }

# Auth identities are created through the real API.
PRO_SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$PRO_EMAIL\",\"password\":\"$PASSWORD\"}")"
COMPANY_SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$COMPANY_EMAIL\",\"password\":\"$PASSWORD\"}")"
PRO_ID="$(printf '%s' "$PRO_SIGNUP" | json_field id)"
COMPANY_ID="$(printf '%s' "$COMPANY_SIGNUP" | json_field id)"

# Minimal fixture: one tenant and the two memberships. Everything after this line goes through HTTP.
TENANT_ID="$(psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -qAtc "WITH created AS (INSERT INTO tenants(slug,display_name) VALUES('http-${STAMP}','HTTP Journey') RETURNING id) SELECT id FROM created")"
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -q <<SQL
INSERT INTO tenant_memberships(tenant_id,subject_id,identity_id,role) VALUES
('$TENANT_ID','$COMPANY_ID','$COMPANY_ID','company'),
('$TENANT_ID','$PRO_ID','$PRO_ID','professional');
SQL

PRO_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$PRO_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
COMPANY_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$COMPANY_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"

PROFILE="$(request PUT /v1/professional-profile "$PRO_TOKEN" "$TENANT_ID" '{"displayName":"HTTP Bartender","homeCity":"São Paulo","primaryRole":"Bartender"}')"
PROFESSIONAL_ID="$(printf '%s' "$PROFILE" | json_field id)"

AVAILABILITY="$(request POST /v1/availability/mine "$PRO_TOKEN" "$TENANT_ID" "{\"startsAt\":\"$AVAIL_START\",\"endsAt\":\"$AVAIL_END\"}")"
printf '%s' "$AVAILABILITY" | grep -q 'startsAt'

JOB="$(request POST /v1/company/jobs "$COMPANY_TOKEN" "$TENANT_ID" "{\"title\":\"Bartender\",\"requiredRole\":\"Bartender\",\"workCity\":\"São Paulo\",\"location\":\"Centro\",\"startsAt\":\"$START_AT\",\"endsAt\":\"$END_AT\",\"payCents\":25000}")"
JOB_ID="$(printf '%s' "$JOB" | json_field id)"

JOBS="$(request GET /v1/jobs "$PRO_TOKEN" "$TENANT_ID")"
printf '%s' "$JOBS" | grep -q "$JOB_ID"

INTEREST="$(request POST "/v1/jobs/$JOB_ID/interest" "$PRO_TOKEN" "$TENANT_ID")"
test "$(printf '%s' "$INTEREST" | json_field status)" = "interested"

RECOMMENDATIONS="$(request GET "/v1/company/jobs/$JOB_ID/recommendations" "$COMPANY_TOKEN" "$TENANT_ID")"
printf '%s' "$RECOMMENDATIONS" | grep -q "$PROFESSIONAL_ID"

CONFIRM="$(request POST "/v1/company/jobs/$JOB_ID/confirm" "$COMPANY_TOKEN" "$TENANT_ID" "{\"professionalId\":\"$PROFESSIONAL_ID\"}")"
ASSIGNMENT_ID="$(printf '%s' "$CONFIRM" | json_field id)"
test "$(printf '%s' "$CONFIRM" | json_field status)" = "confirmed"

MINE="$(request GET /v1/assignments/mine "$PRO_TOKEN" "$TENANT_ID")"
printf '%s' "$MINE" | grep -q "$ASSIGNMENT_ID"

test "$(request POST "/v1/assignments/$ASSIGNMENT_ID/check-in" "$PRO_TOKEN" "$TENANT_ID" '{}' | json_field status)" = "checked_in"
test "$(request POST "/v1/assignments/$ASSIGNMENT_ID/start" "$PRO_TOKEN" "$TENANT_ID" '{}' | json_field status)" = "in_progress"
test "$(request POST "/v1/assignments/$ASSIGNMENT_ID/check-out" "$PRO_TOKEN" "$TENANT_ID" '{}' | json_field status)" = "checked_out"
test "$(request POST "/v1/assignments/$ASSIGNMENT_ID/complete" "$PRO_TOKEN" "$TENANT_ID" '{}' | json_field status)" = "completed"

EARNINGS="$(request GET /v1/earnings/mine "$PRO_TOKEN" "$TENANT_ID")"
printf '%s' "$EARNINGS" | grep -q '25000'
printf '%s' "$EARNINGS" | grep -q 'payable'

RATING="$(request POST "/v1/assignments/$ASSIGNMENT_ID/rating" "$COMPANY_TOKEN" "$TENANT_ID" '{"score":5,"comment":"Excelente"}')"
test "$(printf '%s' "$RATING" | json_field score)" = "5"

PASSPORT="$(request GET /v1/work-passport/mine "$PRO_TOKEN" "$TENANT_ID")"
test "$(printf '%s' "$PASSPORT" | json_field completedWorkCount)" = "1"
test "$(printf '%s' "$PASSPORT" | json_field ratingCount)" = "1"
test "$(printf '%s' "$PASSPORT" | json_field averageRating)" = "5"

request POST /v1/auth/signout "$PRO_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$COMPANY_TOKEN" '' '{}' >/dev/null

echo "PASS: HTTP journey signup→availability→job→interest→recommend→confirm→work→earnings→rating→passport"
