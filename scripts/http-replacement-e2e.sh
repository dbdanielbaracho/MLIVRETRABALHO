#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
STAMP="$(date +%s)-$RANDOM"
PASSWORD="ReplacementPass123!"
PRO1_EMAIL="replacement-pro1-${STAMP}@example.test"
PRO2_EMAIL="replacement-pro2-${STAMP}@example.test"
COMPANY_EMAIL="replacement-company-${STAMP}@example.test"
TARGET_START="$(node -e 'process.stdout.write(new Date(Date.now()+48*60*60*1000).toISOString())')"
TARGET_END="$(node -e 'process.stdout.write(new Date(Date.now()+56*60*60*1000).toISOString())')"
SEED_START="$(node -e 'process.stdout.write(new Date(Date.now()+72*60*60*1000).toISOString())')"
SEED_END="$(node -e 'process.stdout.write(new Date(Date.now()+80*60*60*1000).toISOString())')"
AVAIL_START="$(node -e 'process.stdout.write(new Date(Date.now()+47*60*60*1000).toISOString())')"
AVAIL_END="$(node -e 'process.stdout.write(new Date(Date.now()+81*60*60*1000).toISOString())')"

json_field(){ node -e 'const fs=require("fs");let x=JSON.parse(fs.readFileSync(0,"utf8"));for(const p of process.argv[1].split(".")){if(/^\d+$/.test(p))x=x[Number(p)];else x=x?.[p]}if(x===undefined||x===null)process.exit(2);process.stdout.write(String(x));' "$1"; }
request(){ local method="$1" url="$2" token="${3:-}" tenant="${4:-}" body="${5:-}"; local args=(-sS --fail-with-body -X "$method" "${BASE_URL%/}$url"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$tenant" ]] && args+=(-H "x-tenant-id: $tenant"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }

request POST /v1/auth/signup '' '' "{\"email\":\"$PRO1_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"professional\"}" >/dev/null
request POST /v1/auth/signup '' '' "{\"email\":\"$PRO2_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"professional\"}" >/dev/null
COMPANY_SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$COMPANY_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"Replacement E2E Company\"}")"
TENANT_ID="$(printf '%s' "$COMPANY_SIGNUP" | json_field tenantId)"

PRO1_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$PRO1_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
PRO2_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$PRO2_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
COMPANY_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$COMPANY_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"

PRO1_PROFILE="$(request PUT /v1/professional-profile "$PRO1_TOKEN" '' '{"displayName":"Original Bartender","homeCity":"São Paulo","primaryRole":"Bartender"}')"
PRO1_ID="$(printf '%s' "$PRO1_PROFILE" | json_field id)"
PRO2_PROFILE="$(request PUT /v1/professional-profile "$PRO2_TOKEN" '' '{"displayName":"Replacement Bartender","homeCity":"São Paulo","primaryRole":"Bartender"}')"
PRO2_ID="$(printf '%s' "$PRO2_PROFILE" | json_field id)"

request POST /v1/availability/mine "$PRO1_TOKEN" '' "{\"startsAt\":\"$AVAIL_START\",\"endsAt\":\"$AVAIL_END\"}" >/dev/null
request POST /v1/availability/mine "$PRO2_TOKEN" '' "{\"startsAt\":\"$AVAIL_START\",\"endsAt\":\"$AVAIL_END\"}" >/dev/null

TARGET_JOB="$(request POST /v1/company/jobs "$COMPANY_TOKEN" "$TENANT_ID" "{\"title\":\"Target Bartender\",\"requiredRole\":\"Bartender\",\"workCity\":\"São Paulo\",\"location\":\"Centro\",\"startsAt\":\"$TARGET_START\",\"endsAt\":\"$TARGET_END\",\"payCents\":30000}")"
TARGET_JOB_ID="$(printf '%s' "$TARGET_JOB" | json_field id)"
SEED_JOB="$(request POST /v1/company/jobs "$COMPANY_TOKEN" "$TENANT_ID" "{\"title\":\"Seed Bartender\",\"requiredRole\":\"Bartender\",\"workCity\":\"São Paulo\",\"location\":\"Centro\",\"startsAt\":\"$SEED_START\",\"endsAt\":\"$SEED_END\",\"payCents\":20000}")"
SEED_JOB_ID="$(printf '%s' "$SEED_JOB" | json_field id)"

request POST "/v1/jobs/$TARGET_JOB_ID/interest" "$PRO1_TOKEN" >/dev/null
request POST "/v1/jobs/$SEED_JOB_ID/interest" "$PRO2_TOKEN" >/dev/null

ORIGINAL_CONFIRM="$(request POST "/v1/company/jobs/$TARGET_JOB_ID/confirm" "$COMPANY_TOKEN" "$TENANT_ID" "{\"professionalId\":\"$PRO1_ID\"}")"
ORIGINAL_ASSIGNMENT_ID="$(printf '%s' "$ORIGINAL_CONFIRM" | json_field id)"
SEED_CONFIRM="$(request POST "/v1/company/jobs/$SEED_JOB_ID/confirm" "$COMPANY_TOKEN" "$TENANT_ID" "{\"professionalId\":\"$PRO2_ID\"}")"
SEED_ASSIGNMENT_ID="$(printf '%s' "$SEED_CONFIRM" | json_field id)"
[[ -n "$SEED_ASSIGNMENT_ID" ]]

POOL="$(request POST /v1/company/talent-pools "$COMPANY_TOKEN" "$TENANT_ID" "{\"professionalId\":\"$PRO2_ID\",\"pool\":\"preferred\"}")"
test "$(printf '%s' "$POOL" | json_field professionalId)" = "$PRO2_ID"

REPLACEMENT="$(request POST "/v1/company/replacements/$ORIGINAL_ASSIGNMENT_ID" "$COMPANY_TOKEN" "$TENANT_ID" '{"reason":"Troca operacional"}')"
REPLACEMENT_ID="$(printf '%s' "$REPLACEMENT" | json_field id)"

AUTO="$(request POST "/v1/company/replacements/$REPLACEMENT_ID/auto-match" "$COMPANY_TOKEN" "$TENANT_ID")"
test "$(printf '%s' "$AUTO" | json_field recommendedProfessionalId)" = "$PRO2_ID"
test "$(printf '%s' "$AUTO" | json_field recommendedProfessionalName)" = "Replacement Bartender"

SELECTED="$(request POST "/v1/company/replacements/$REPLACEMENT_ID/select" "$COMPANY_TOKEN" "$TENANT_ID" "{\"professionalId\":\"$PRO2_ID\"}")"
test "$(printf '%s' "$SELECTED" | json_field status)" = "matched"
test "$(printf '%s' "$SELECTED" | json_field replacedAssignmentId)" = "$ORIGINAL_ASSIGNMENT_ID"
NEW_ASSIGNMENT_ID="$(printf '%s' "$SELECTED" | json_field assignmentId)"

PRO1_ASSIGNMENTS="$(request GET /v1/assignments/mine "$PRO1_TOKEN")"
node -e 'const rows=JSON.parse(process.argv[1]);const id=process.argv[2];const item=rows.find(x=>x.id===id);if(!item||item.status!=="cancelled"){console.error("original assignment was not cancelled",JSON.stringify(item));process.exit(1)}' "$PRO1_ASSIGNMENTS" "$ORIGINAL_ASSIGNMENT_ID"

PRO2_ASSIGNMENTS="$(request GET /v1/assignments/mine "$PRO2_TOKEN")"
node -e 'const rows=JSON.parse(process.argv[1]);const id=process.argv[2];const tenant=process.argv[3];const item=rows.find(x=>x.id===id);if(!item||item.status!=="confirmed"||item.tenantId!==tenant){console.error("replacement assignment missing",JSON.stringify(item));process.exit(1)}' "$PRO2_ASSIGNMENTS" "$NEW_ASSIGNMENT_ID" "$TENANT_ID"

REPLACEMENTS="$(request GET /v1/company/replacements "$COMPANY_TOKEN" "$TENANT_ID")"
node -e 'const rows=JSON.parse(process.argv[1]);const id=process.argv[2];const pro=process.argv[3];const item=rows.find(x=>x.id===id);if(!item||item.status!=="matched"||item.replacementProfessionalId!==pro){console.error("replacement request not resolved",JSON.stringify(item));process.exit(1)}' "$REPLACEMENTS" "$REPLACEMENT_ID" "$PRO2_ID"

request POST /v1/auth/signout "$PRO1_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$PRO2_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$COMPANY_TOKEN" '' '{}' >/dev/null

echo "PASS: replacement auto-match selects preferred worker, cancels original and confirms replacement assignment"
