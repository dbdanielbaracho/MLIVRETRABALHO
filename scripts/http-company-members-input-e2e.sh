#!/usr/bin/env bash
# Disposable localhost CI fixtures only; never production jobs or payments.
set -euo pipefail
BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
case "$BASE_URL" in http://127.0.0.1:*|http://localhost:*) ;; *) echo 'Local disposable API required' >&2; exit 1;; esac
BASE_URL="${BASE_URL%/}"
STAMP="$(date +%s)-$RANDOM"
PASSWORD='MemberInputFixture123!'
json_field(){ node -e 'let x=JSON.parse(require("fs").readFileSync(0,"utf8"));for(const p of process.argv[1].split("."))x=x?.[p];if(x==null)process.exit(2);process.stdout.write(String(x));' -- "$1"; }
request(){ local method="$1" path="$2" token="${3:-}" tenant="${4:-}" body="${5:-}"; local args=(-sS --fail-with-body -X "$method" "$BASE_URL$path"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$tenant" ]] && args+=(-H "x-tenant-id: $tenant"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }
credentials(){ node -e 'process.stdout.write(JSON.stringify({email:process.argv[1],password:process.argv[2],...(process.argv[3]?{accountType:"company",workspaceName:process.argv[3]}:{})}))' -- "$1" "$PASSWORD" "${2:-}"; }
assert_equal(){ node -e 'require("node:assert/strict").deepEqual(JSON.parse(require("fs").readFileSync(0,"utf8")),JSON.parse(process.argv[1]))' -- "$1"; }
expect_status(){ local expected="$1" token="$2" tenant="$3" body="$4" actual; actual="$(curl -sS -o /dev/null -w '%{http_code}' -X "${HTTP_METHOD:-POST}" "$BASE_URL$TARGET" -H "authorization: Bearer $token" -H "x-tenant-id: $tenant" -H 'content-type: application/json' --data "$body")"; [[ "$actual" == "$expected" ]] || { printf 'FAIL member input: expected %s, got %s\n' "$expected" "$actual" >&2; return 1; }; }
EMAIL_A="member-input-a-$STAMP@example.test"
EMAIL_B="member-input-b-$STAMP@example.test"
TENANT_A="$(request POST /v1/auth/signup '' '' "$(credentials "$EMAIL_A" "Member fixture A $STAMP")" | json_field tenantId)"
TENANT_B="$(request POST /v1/auth/signup '' '' "$(credentials "$EMAIL_B" "Member fixture B $STAMP")" | json_field tenantId)"
TOKEN_A="$(request POST /v1/auth/signin '' '' "$(credentials "$EMAIL_A")" | json_field accessToken)"
TOKEN_B="$(request POST /v1/auth/signin '' '' "$(credentials "$EMAIL_B")" | json_field accessToken)"
request GET /v1/company/members/invitations "$TOKEN_A" "$TENANT_A" | assert_equal '[]'
request GET /v1/company/members/invitations "$TOKEN_B" "$TENANT_B" | assert_equal '[]'
TARGET=/v1/company/members/invitations
expect_status 401 '' "$TENANT_A" '{}'
expect_status 401 "$TOKEN_A" "$TENANT_B" '{}'
VALID="$(node -e 'process.stdout.write(JSON.stringify({email:" "+process.argv[1].toUpperCase()+" ",role:"admin",tenantId:"untrusted"}))' -- "$EMAIL_B")"
INVITE="$(request POST "$TARGET" "$TOKEN_A" "$TENANT_A" "$VALID")"
CODE="$(printf '%s' "$INVITE" | json_field inviteCode)"
ID="$(printf '%s' "$INVITE" | json_field invitationId)"
printf '%s' "$INVITE" | node -e 'const x=JSON.parse(require("fs").readFileSync(0,"utf8"));if(!x.invitationId||x.email!==process.argv[1]||x.role!=="admin"||!x.inviteCode.startsWith(process.argv[2]+"."))process.exit(1)' -- "$EMAIL_B" "$TENANT_A"
BASELINE="$(request GET /v1/company/members/invitations "$TOKEN_A" "$TENANT_A")"
INVALID="$(node -e 'const email=process.argv[1];for(const b of [null,[],true,42,"text",{email:[email],role:"admin"},{email,role:["admin"]},{email:42,role:"admin"},{email:{},role:"admin"},{email,role:{}},{email,role:true}])process.stdout.write(JSON.stringify(b)+"\n")' -- "$EMAIL_B")"
while IFS= read -r body; do
 expect_status 400 "$TOKEN_A" "$TENANT_A" "$body"
 request GET /v1/company/members/invitations "$TOKEN_A" "$TENANT_A" | assert_equal "$BASELINE"
 request GET /v1/company/members/invitations "$TOKEN_B" "$TENANT_B" | assert_equal '[]'
done <<< "$INVALID"
TARGET=/v1/company/members/invitations/accept
INVALID_ACCEPT="$(node -e 'for(const b of [null,[],true,42,"text",{inviteCode:[process.argv[1]]},{inviteCode:{}},{inviteCode:42}])process.stdout.write(JSON.stringify(b)+"\n")' -- "$CODE")"
while IFS= read -r body; do
 expect_status 400 "$TOKEN_B" '' "$body"
 request GET /v1/company/members/invitations "$TOKEN_A" "$TENANT_A" | assert_equal "$BASELINE"
done <<< "$INVALID_ACCEPT"
TARGET=/v1/company/members/invitations/not-a-uuid/revoke
expect_status 401 '' "$TENANT_A" '{}'
expect_status 401 "$TOKEN_A" "$TENANT_B" '{}'
expect_status 400 "$TOKEN_A" "$TENANT_A" '{}'
request GET /v1/company/members/invitations "$TOKEN_A" "$TENANT_A" | assert_equal "$BASELINE"
ACCEPT="$(node -e 'process.stdout.write(JSON.stringify({inviteCode:" "+process.argv[1]+" ",tenantId:"untrusted"}))' -- "$CODE")"
request POST /v1/company/members/invitations/accept "$TOKEN_B" '' "$ACCEPT" | node -e 'const x=JSON.parse(require("fs").readFileSync(0,"utf8"));if(x.accepted!==true||x.tenantId!==process.argv[1]||x.role!=="admin")process.exit(1)' -- "$TENANT_A"
TARGET=/v1/company/members/invitations
expect_status 403 "$TOKEN_B" "$TENANT_A" '{}'
# Owner's real read confirms consumption, while the new admin cannot generate secrets.
request GET /v1/company/members/invitations "$TOKEN_A" "$TENANT_A" | node -e 'const rows=JSON.parse(require("fs").readFileSync(0,"utf8")),x=rows.find(x=>x.id===process.argv[1]);if(!x||!x.acceptedAt||x.revokedAt!==null)process.exit(1)' -- "$ID"
for token in "$TOKEN_A" "$TOKEN_B"; do request POST /v1/auth/signout "$token" '' '{}' >/dev/null; done
echo 'PASS: invitation malformed input rejects 400 without writes or consumption; owner role, tenant isolation and valid secret/accept ACK preserved'
