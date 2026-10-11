#!/usr/bin/env bash
# Disposable localhost CI fixtures only; never production jobs or payments.
set -euo pipefail
BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
[[ "$BASE_URL" =~ ^http://(127\.0\.0\.1|localhost):[0-9]+/?$ ]] || { echo 'Local disposable API required' >&2; exit 1; }
BASE_URL="${BASE_URL%/}"
STAMP="$(date +%s)-$RANDOM"
PASSWORD='TalentInputFixture123!'
json_field(){ node -e 'let x=JSON.parse(require("fs").readFileSync(0,"utf8"));for(const p of process.argv[1].split("."))x=x?.[p];if(x==null)process.exit(2);process.stdout.write(String(x));' -- "$1"; }
request(){ local method="$1" path="$2" token="${3:-}" tenant="${4:-}" body="${5:-}"; local args=(-sS --fail-with-body -X "$method" "$BASE_URL$path"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$tenant" ]] && args+=(-H "x-tenant-id: $tenant"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }
credentials(){ node -e 'process.stdout.write(JSON.stringify({email:process.argv[1],password:process.argv[2],...(process.argv[3]?{accountType:"company",workspaceName:process.argv[3]}:{})}))' -- "$1" "$PASSWORD" "${2:-}"; }
assert_equal(){ node -e 'require("node:assert/strict").deepEqual(JSON.parse(require("fs").readFileSync(0,"utf8")),JSON.parse(process.argv[1]))' -- "$1"; }
expect_status(){ local expected="$1" token="$2" tenant="$3" body="$4" actual; actual="$(curl -sS -o /dev/null -w '%{http_code}' -X "${HTTP_METHOD:-POST}" "$BASE_URL$TARGET" -H "authorization: Bearer $token" -H "x-tenant-id: $tenant" -H 'content-type: application/json' --data "$body")"; [[ "$actual" == "$expected" ]] || { printf 'FAIL talent input: expected %s, got %s\n' "$expected" "$actual" >&2; return 1; }; }
EMAIL_A="talent-input-a-$STAMP@example.test"
EMAIL_B="talent-input-b-$STAMP@example.test"
TENANT_A="$(request POST /v1/auth/signup '' '' "$(credentials "$EMAIL_A" "Talent fixture A $STAMP")" | json_field tenantId)"
TENANT_B="$(request POST /v1/auth/signup '' '' "$(credentials "$EMAIL_B" "Talent fixture B $STAMP")" | json_field tenantId)"
TOKEN_A="$(request POST /v1/auth/signin '' '' "$(credentials "$EMAIL_A")" | json_field accessToken)"
TOKEN_B="$(request POST /v1/auth/signin '' '' "$(credentials "$EMAIL_B")" | json_field accessToken)"

TARGET=/v1/company/talent-pools
expect_status 401 '' "$TENANT_A" 'null'
expect_status 401 "$TOKEN_A" "$TENANT_B" 'null'
EMAIL_PRO="talent-input-pro-$STAMP@example.test"
request POST /v1/auth/signup '' '' "$(credentials "$EMAIL_PRO")" >/dev/null
TOKEN_PRO="$(request POST /v1/auth/signin '' '' "$(credentials "$EMAIL_PRO")" | json_field accessToken)"
PRO_ID="$(request PUT /v1/professional-profile "$TOKEN_PRO" '' '{"displayName":"Talent input fixture"}' | json_field id)"
START_AT="$(node -e 'process.stdout.write(new Date(Date.now()+86400000).toISOString())')"
END_AT="$(node -e 'process.stdout.write(new Date(Date.now()+115200000).toISOString())')"
request POST /v1/availability/mine "$TOKEN_PRO" '' "{\"startsAt\":\"$START_AT\",\"endsAt\":\"$END_AT\"}" >/dev/null
JOB_ID="$(request POST /v1/company/jobs "$TOKEN_A" "$TENANT_A" "{\"title\":\"Talent input fixture\",\"startsAt\":\"$START_AT\",\"endsAt\":\"$END_AT\"}" | json_field id)"
request POST "/v1/jobs/$JOB_ID/interest" "$TOKEN_PRO" >/dev/null
request POST "/v1/company/jobs/$JOB_ID/confirm" "$TOKEN_A" "$TENANT_A" "{\"professionalId\":\"$PRO_ID\"}" >/dev/null
expect_status 403 "$TOKEN_PRO" "$TENANT_A" 'null'
for pool in preferred network open; do
 BODY="$(node -e 'process.stdout.write(JSON.stringify({professionalId:process.argv[1],pool:process.argv[2],tenantId:"untrusted"}))' -- "$PRO_ID" "$pool")"
 for repeat in 1 2; do
  request POST /v1/company/talent-pools "$TOKEN_A" "$TENANT_A" "$BODY" | assert_equal "{\"professionalId\":\"$PRO_ID\",\"pool\":\"$pool\"}"
 done
done
BASELINE="$(request GET /v1/company/talent-pools "$TOKEN_A" "$TENANT_A")"
printf '%s' "$BASELINE" | node -e 'const x=JSON.parse(require("fs").readFileSync(0,"utf8"));require("node:assert/strict").equal(x.length,3)'
request GET /v1/company/talent-pools "$TOKEN_B" "$TENANT_B" | assert_equal '[]'
INVALID="$(node -e 'const id=process.argv[1];for(const b of [null,[],true,42,"text",{},...[""," ","not-a-uuid",42,true,[],{},null,[id]].map(professionalId=>({professionalId,pool:"preferred"})),...[""," preferred ","invented",42,true,["preferred"],{},null].map(pool=>({professionalId:id,pool}))])process.stdout.write(JSON.stringify(b)+"\n")' -- "$PRO_ID")"
while IFS= read -r body; do
 expect_status 400 "$TOKEN_A" "$TENANT_A" "$body"
 request GET /v1/company/talent-pools "$TOKEN_A" "$TENANT_A" | assert_equal "$BASELINE"
 request GET /v1/company/talent-pools "$TOKEN_B" "$TENANT_B" | assert_equal '[]'
done <<< "$INVALID"
# Real UUID alone must not expose a professional outside this tenant's work.
expect_status 400 "$TOKEN_B" "$TENANT_B" "{\"professionalId\":\"$PRO_ID\",\"pool\":\"preferred\"}"
request GET /v1/company/talent-pools "$TOKEN_B" "$TENANT_B" | assert_equal '[]'
HTTP_METHOD=DELETE TARGET=/v1/company/talent-pools/preferred/not-a-uuid
expect_status 401 '' "$TENANT_A" '{}'
expect_status 401 "$TOKEN_A" "$TENANT_B" '{}'
expect_status 403 "$TOKEN_PRO" "$TENANT_A" '{}'
expect_status 400 "$TOKEN_A" "$TENANT_A" '{}'
TARGET="/v1/company/talent-pools/invented/$PRO_ID"
expect_status 400 "$TOKEN_A" "$TENANT_A" '{}'
request GET /v1/company/talent-pools "$TOKEN_A" "$TENANT_A" | assert_equal "$BASELINE"
for pool in preferred network open; do
 request DELETE "/v1/company/talent-pools/$pool/$PRO_ID" "$TOKEN_A" "$TENANT_A" | assert_equal '{"removed":true}'
done
request GET /v1/company/talent-pools "$TOKEN_A" "$TENANT_A" | assert_equal '[]'
request GET /v1/company/talent-pools "$TOKEN_B" "$TENANT_B" | assert_equal '[]'
for token in "$TOKEN_A" "$TOKEN_B" "$TOKEN_PRO"; do request POST /v1/auth/signout "$token" '' '{}' >/dev/null; done
echo 'PASS: talent malformed input rejects 400 without writes; real pool ACKs, active tenant boundary and removal preserved'
