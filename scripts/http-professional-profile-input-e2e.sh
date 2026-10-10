#!/usr/bin/env bash
# Only ephemeral localhost CI fixtures; never production profiles.
set -euo pipefail
BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
case "$BASE_URL" in http://127.0.0.1:*|http://localhost:*) ;; *) echo 'Local disposable API required' >&2; exit 1;; esac
BASE_URL="${BASE_URL%/}"
STAMP="$(date +%s)-$RANDOM"
PASSWORD='ProfileFixture123!'
json_field(){ node -e 'let x=JSON.parse(require("fs").readFileSync(0,"utf8"));for(const p of process.argv[1].split("."))x=x?.[p];if(x==null)process.exit(2);process.stdout.write(String(x));' -- "$1"; }
request(){ local method="$1" path="$2" token="${3:-}" body="${4:-}"; local args=(-sS --fail-with-body -X "$method" "$BASE_URL$path"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }
credentials(){ node -e 'process.stdout.write(JSON.stringify({email:process.argv[1],password:process.argv[2],...(process.argv[3]?{accountType:"professional"}:{})}))' -- "$1" "$PASSWORD" "${2:-}"; }
assert_null(){ node -e 'if(JSON.parse(require("fs").readFileSync(0,"utf8"))!==null)process.exit(1)'; }
assert_equal(){ node -e 'const assert=require("node:assert/strict");assert.deepEqual(JSON.parse(require("fs").readFileSync(0,"utf8")),JSON.parse(process.argv[1]))' -- "$1"; }
expect_status(){ local expected="$1" token="$2" body="$3" actual; actual="$(curl -sS -o /dev/null -w '%{http_code}' -X PUT "$BASE_URL/v1/professional-profile" -H "authorization: Bearer $token" -H 'content-type: application/json' --data "$body")"; [[ "$actual" == "$expected" ]] || { printf 'FAIL profile: expected %s, got %s\n' "$expected" "$actual" >&2; return 1; }; }
EMAIL_A="profile-a-$STAMP@example.test"
EMAIL_B="profile-b-$STAMP@example.test"
request POST /v1/auth/signup '' "$(credentials "$EMAIL_A" signup)" >/dev/null
request POST /v1/auth/signup '' "$(credentials "$EMAIL_B" signup)" >/dev/null
TOKEN_A="$(request POST /v1/auth/signin '' "$(credentials "$EMAIL_A")" | json_field accessToken)"
TOKEN_B="$(request POST /v1/auth/signin '' "$(credentials "$EMAIL_B")" | json_field accessToken)"
request GET /v1/professional-profile "$TOKEN_A" | assert_null
request GET /v1/professional-profile "$TOKEN_B" | assert_null
for body in '{}' '{"displayName":""}' '{"displayName":" "}' '{"displayName":42}' '{"displayName":null}' '{"displayName":"Name","homeCity":42}' '{"displayName":"Name","primaryRole":[]}' '[]' 'null'; do
 expect_status 400 "$TOKEN_A" "$body"
 request GET /v1/professional-profile "$TOKEN_A" | assert_null
done
# Auth is checked before inspecting a malformed body.
expect_status 401 '' '{}'
PROFILE="$(request PUT /v1/professional-profile "$TOKEN_A" '{"displayName":"  Profile fixture  ","homeCity":" São Paulo ","primaryRole":" Bartender ","identityId":"untrusted","id":"untrusted"}')"
printf '%s' "$PROFILE" | node -e 'const x=JSON.parse(require("fs").readFileSync(0,"utf8"));if(!x.id||x.id==="untrusted"||x.displayName!=="Profile fixture"||x.homeCity!=="São Paulo"||x.primaryRole!=="Bartender")process.exit(1)'
request GET /v1/professional-profile "$TOKEN_B" | assert_null
for body in '{"displayName":""}' '{"displayName":"Name","homeCity":{}}' '{"displayName":"Name","primaryRole":false}' '[]'; do
 expect_status 400 "$TOKEN_A" "$body"
 request GET /v1/professional-profile "$TOKEN_A" | assert_equal "$PROFILE"
 request GET /v1/professional-profile "$TOKEN_B" | assert_null
done
UPDATED="$(request PUT /v1/professional-profile "$TOKEN_A" '{"displayName":" Profile updated ","homeCity":null,"primaryRole":" "}')"
printf '%s' "$UPDATED" | node -e 'const x=JSON.parse(require("fs").readFileSync(0,"utf8"));if(x.id!==process.argv[1]||x.displayName!=="Profile updated"||x.homeCity!==null||x.primaryRole!==null)process.exit(1)' -- "$(printf '%s' "$PROFILE" | json_field id)"
request GET /v1/professional-profile "$TOKEN_B" | assert_null
for token in "$TOKEN_A" "$TOKEN_B"; do request POST /v1/auth/signout "$token" >/dev/null; done
echo 'PASS: profile invalid input rejects 400 without writes, authentication comes first, trim/null contract and identity isolation preserved'
