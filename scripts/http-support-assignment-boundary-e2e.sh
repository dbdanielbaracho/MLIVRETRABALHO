#!/usr/bin/env bash
# Disposable HTTP fixtures; CI supplies the local API and ephemeral database.
set -euo pipefail
BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
STAMP="$(date +%s)-$RANDOM"
PASSWORD='SupportFixture123!'
json_field(){ node -e 'let x=JSON.parse(require("fs").readFileSync(0,"utf8"));for(const p of process.argv[1].split("."))x=x?.[p];if(x==null)process.exit(2);process.stdout.write(String(x));' -- "$1"; }
request(){ local method="$1" path="$2" token="${3:-}" tenant="${4:-}" body="${5:-}"; local args=(-sS --fail-with-body -X "$method" "$BASE_URL$path"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$tenant" ]] && args+=(-H "x-tenant-id: $tenant"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }
status_only(){ local method="$1" path="$2" token="$3" tenant="$4" body="$5"; curl -sS -o /dev/null -w '%{http_code}' -X "$method" "$BASE_URL$path" -H "authorization: Bearer $token" -H "x-tenant-id: $tenant" -H 'content-type: application/json' --data "$body"; }
signup_body(){ node -e 'process.stdout.write(JSON.stringify({email:process.argv[1],password:process.argv[2],accountType:process.argv[3],workspaceName:"Support fixture"}))' -- "$1" "$PASSWORD" "$2"; }
signin_body(){ node -e 'process.stdout.write(JSON.stringify({email:process.argv[1],password:process.argv[2]}))' -- "$1" "$PASSWORD"; }
case_body(){ node -e 'const id=process.argv[1];process.stdout.write(JSON.stringify({...(id?{assignmentId:id}:{}),category:"schedule",description:"Support fixture",priority:"normal"}))' -- "$1"; }
EMAIL_A="support-company-a-$STAMP@example.test"
EMAIL_B="support-company-b-$STAMP@example.test"
EMAIL_P="support-professional-$STAMP@example.test"
TENANT_A="$(request POST /v1/auth/signup '' '' "$(signup_body "$EMAIL_A" company)" | json_field tenantId)"
TENANT_B="$(request POST /v1/auth/signup '' '' "$(signup_body "$EMAIL_B" company)" | json_field tenantId)"
request POST /v1/auth/signup '' '' "$(signup_body "$EMAIL_P" professional)" >/dev/null
TOKEN_A="$(request POST /v1/auth/signin '' '' "$(signin_body "$EMAIL_A")" | json_field accessToken)"
TOKEN_B="$(request POST /v1/auth/signin '' '' "$(signin_body "$EMAIL_B")" | json_field accessToken)"
TOKEN_P="$(request POST /v1/auth/signin '' '' "$(signin_body "$EMAIL_P")" | json_field accessToken)"
PROFILE_ID="$(request PUT /v1/professional-profile "$TOKEN_P" '' '{"displayName":"Support fixture","primaryRole":"Bartender"}' | json_field id)"
JOB_BODY="$(node -e 'process.stdout.write(JSON.stringify({title:"Support fixture",requiredRole:"Bartender",startsAt:new Date(Date.now()+24*3600000).toISOString(),endsAt:new Date(Date.now()+32*3600000).toISOString(),payCents:10000}))')"
JOB_A="$(request POST /v1/company/jobs "$TOKEN_A" "$TENANT_A" "$JOB_BODY" | json_field id)"
request POST "/v1/jobs/$JOB_A/interest" "$TOKEN_P" >/dev/null
CONFIRM_BODY="$(node -e 'process.stdout.write(JSON.stringify({professionalId:process.argv[1]}))' -- "$PROFILE_ID")"
ASSIGNMENT_A="$(request POST "/v1/company/jobs/$JOB_A/confirm" "$TOKEN_A" "$TENANT_A" "$CONFIRM_BODY" | json_field id)"
assert_count(){ node -e 'const x=JSON.parse(require("fs").readFileSync(0,"utf8"));if(!Array.isArray(x)||x.length!==Number(process.argv[1]))process.exit(1)' -- "$1"; }
request GET /v1/support-cases/mine "$TOKEN_B" "$TENANT_B" | assert_count 0
# Company B is authorized in B but cannot attach a real assignment belonging to A.
test "$(status_only POST /v1/support-cases "$TOKEN_B" "$TENANT_B" "$(case_body "$ASSIGNMENT_A")")" = 400
request GET /v1/support-cases/mine "$TOKEN_B" "$TENANT_B" | assert_count 0
# Nonexistent, malformed and blank references fail before insertion.
for id in 11111111-2222-3333-4444-555555555555 not-a-uuid ' '; do
 test "$(status_only POST /v1/support-cases "$TOKEN_A" "$TENANT_A" "$(case_body "$id")")" = 400
done
LONG_BODY="$(node -e 'process.stdout.write(JSON.stringify({category:"other",description:"x".repeat(4001)}))')"
test "$(status_only POST /v1/support-cases "$TOKEN_A" "$TENANT_A" "$LONG_BODY")" = 400
request GET /v1/support-cases/mine "$TOKEN_A" "$TENANT_A" | assert_count 0
test "$(status_only POST /v1/support-cases "$TOKEN_A" "$TENANT_B" "$(case_body '')")" = 403
# Valid linked and unlinked requests preserve the existing support contract.
CASE_A="$(request POST /v1/support-cases "$TOKEN_A" "$TENANT_A" "$(case_body "$ASSIGNMENT_A")")"
CASE_A_ID="$(printf '%s' "$CASE_A" | json_field id)"
test "$(printf '%s' "$CASE_A" | json_field status)" = open
request POST /v1/support-cases "$TOKEN_A" "$TENANT_A" "$(case_body '')" >/dev/null
request GET /v1/support-cases/mine "$TOKEN_A" "$TENANT_A" | assert_count 2
# Reporter filtering remains in force, and professionals retain legitimate access.
request GET /v1/support-cases/mine "$TOKEN_P" "$TENANT_A" | assert_count 0
PRO_CASE_ID="$(request POST /v1/support-cases "$TOKEN_P" "$TENANT_A" "$(case_body "$ASSIGNMENT_A")" | json_field id)"
request GET /v1/support-cases/mine "$TOKEN_P" "$TENANT_A" | assert_count 1
request GET /v1/support-cases/mine "$TOKEN_A" "$TENANT_A" | assert_count 2
request GET /v1/support-cases/mine "$TOKEN_B" "$TENANT_B" | assert_count 0
test "$(status_only POST "/v1/company/support-cases/$CASE_A_ID/status" "$TOKEN_B" "$TENANT_B" '{"status":"reviewing","note":"fixture"}')" = 400
UPDATED="$(request POST "/v1/company/support-cases/$PRO_CASE_ID/status" "$TOKEN_A" "$TENANT_A" '{"status":"reviewing","note":"Revisão humana fixture"}')"
test "$(printf '%s' "$UPDATED" | json_field status)" = reviewing
for token in "$TOKEN_A" "$TOKEN_B" "$TOKEN_P"; do request POST /v1/auth/signout "$token" >/dev/null; done
echo 'PASS: support assignment binding rejects cross-tenant and malformed requests without insert; legitimate reporter/admin flows preserved'
