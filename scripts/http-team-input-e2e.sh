#!/usr/bin/env bash
# Disposable localhost CI fixtures only; never production jobs or payments.
set -euo pipefail
BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
case "$BASE_URL" in http://127.0.0.1:*|http://localhost:*) ;; *) echo 'Local disposable API required' >&2; exit 1;; esac
BASE_URL="${BASE_URL%/}"
STAMP="$(date +%s)-$RANDOM"
PASSWORD='TeamInputFixture123!'
json_field(){ node -e 'let x=JSON.parse(require("fs").readFileSync(0,"utf8"));for(const p of process.argv[1].split("."))x=x?.[p];if(x==null)process.exit(2);process.stdout.write(String(x));' -- "$1"; }
request(){ local method="$1" path="$2" token="${3:-}" tenant="${4:-}" body="${5:-}"; local args=(-sS --fail-with-body -X "$method" "$BASE_URL$path"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$tenant" ]] && args+=(-H "x-tenant-id: $tenant"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }
credentials(){ node -e 'process.stdout.write(JSON.stringify({email:process.argv[1],password:process.argv[2],...(process.argv[3]?{accountType:"company",workspaceName:process.argv[3]}:{})}))' -- "$1" "$PASSWORD" "${2:-}"; }
assert_equal(){ node -e 'require("node:assert/strict").deepEqual(JSON.parse(require("fs").readFileSync(0,"utf8")),JSON.parse(process.argv[1]))' -- "$1"; }
expect_status(){ local expected="$1" token="$2" tenant="$3" body="$4" actual; actual="$(curl -sS -o /dev/null -w '%{http_code}' -X POST "$BASE_URL$TARGET" -H "authorization: Bearer $token" -H "x-tenant-id: $tenant" -H 'content-type: application/json' --data "$body")"; [[ "$actual" == "$expected" ]] || { printf 'FAIL team input: expected %s, got %s\n' "$expected" "$actual" >&2; return 1; }; }
EMAIL_A="team-input-a-$STAMP@example.test"
EMAIL_B="team-input-b-$STAMP@example.test"
TENANT_A="$(request POST /v1/auth/signup '' '' "$(credentials "$EMAIL_A" "Team fixture A $STAMP")" | json_field tenantId)"
TENANT_B="$(request POST /v1/auth/signup '' '' "$(credentials "$EMAIL_B" "Team fixture B $STAMP")" | json_field tenantId)"
TOKEN_A="$(request POST /v1/auth/signin '' '' "$(credentials "$EMAIL_A")" | json_field accessToken)"
TOKEN_B="$(request POST /v1/auth/signin '' '' "$(credentials "$EMAIL_B")" | json_field accessToken)"
request GET /v1/company/teams "$TOKEN_A" "$TENANT_A" | assert_equal '[]'
request GET /v1/company/teams "$TOKEN_B" "$TENANT_B" | assert_equal '[]'
TARGET=/v1/company/teams
expect_status 401 '' "$TENANT_A" '{}'
expect_status 401 "$TOKEN_A" "$TENANT_B" '{}'
TEAM="$(request POST /v1/company/teams "$TOKEN_A" "$TENANT_A" '{"name":" Fixture team ","tenantId":"untrusted","id":"untrusted"}')"
printf '%s' "$TEAM" | node -e 'const x=JSON.parse(require("fs").readFileSync(0,"utf8"));if(!x.id||x.id==="untrusted"||x.name!=="Fixture team")process.exit(1)'
TEAM_ID="$(printf '%s' "$TEAM" | json_field id)"
BASELINE="$(request GET /v1/company/teams "$TOKEN_A" "$TENANT_A")"
INVALID_CREATE="$(node -e 'for(const b of [null,[],true,42,"text",{},...[42,{},[],false," ",null].map(name=>({name}))])process.stdout.write(JSON.stringify(b)+"\n")')"
while IFS= read -r body; do
 expect_status 400 "$TOKEN_A" "$TENANT_A" "$body"
 request GET /v1/company/teams "$TOKEN_A" "$TENANT_A" | assert_equal "$BASELINE"
 request GET /v1/company/teams "$TOKEN_B" "$TENANT_B" | assert_equal '[]'
done <<< "$INVALID_CREATE"
TARGET="/v1/company/teams/$TEAM_ID/members"
expect_status 401 '' "$TENANT_A" '{}'
expect_status 401 "$TOKEN_A" "$TENANT_B" '{}'
INVALID_ADD="$(node -e 'for(const b of [null,[],true,42,"text",{},...[""," ","not-a-uuid",42,true,[],{}].map(professionalId=>({professionalId}))])process.stdout.write(JSON.stringify(b)+"\n")')"
while IFS= read -r body; do
 expect_status 400 "$TOKEN_A" "$TENANT_A" "$body"
 request GET "/v1/company/teams/$TEAM_ID/members" "$TOKEN_A" "$TENANT_A" | assert_equal '[]'
 request GET /v1/company/teams "$TOKEN_A" "$TENANT_A" | assert_equal "$BASELINE"
 request GET /v1/company/teams "$TOKEN_B" "$TENANT_B" | assert_equal '[]'
done <<< "$INVALID_ADD"
# A valid canonical UUID still requires a real company assignment.
expect_status 400 "$TOKEN_A" "$TENANT_A" '{"professionalId":"22222222-2222-4222-8222-222222222222"}'
request GET "/v1/company/teams/$TEAM_ID/members" "$TOKEN_A" "$TENANT_A" | assert_equal '[]'
for token in "$TOKEN_A" "$TOKEN_B"; do request POST /v1/auth/signout "$token" '' '{}' >/dev/null; done
echo 'PASS: team malformed input rejects 400 without writes; authentication, tenant isolation, trimmed names and assignment requirement preserved'
