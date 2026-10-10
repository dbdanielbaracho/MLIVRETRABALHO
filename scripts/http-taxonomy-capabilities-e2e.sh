#!/usr/bin/env bash
# Mutating fixtures run only against the local disposable CI API/database.
set -euo pipefail
BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
case "$BASE_URL" in http://127.0.0.1:*|http://localhost:*) ;; *) echo 'Local disposable API required' >&2; exit 1;; esac
STAMP="$(date +%s)-$RANDOM"
PASSWORD='CatalogFixture123!'
json_field(){ node -e 'let x=JSON.parse(require("fs").readFileSync(0,"utf8"));for(const p of process.argv[1].split("."))x=x?.[p];if(x==null)process.exit(2);process.stdout.write(String(x));' -- "$1"; }
request(){ local method="$1" path="$2" token="${3:-}" body="${4:-}"; local args=(-sS --fail-with-body -X "$method" "$BASE_URL$path"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }
expect_status(){ local label="$1" expected="$2" method="$3" path="$4" token="$5" body="$6" actual; actual="$(curl -sS -o /dev/null -w '%{http_code}' -X "$method" "$BASE_URL$path" -H "authorization: Bearer $token" -H 'content-type: application/json' --data "$body")"; [[ "$actual" == "$expected" ]] || { printf 'FAIL catalog %s: expected %s, got %s\n' "$label" "$expected" "$actual" >&2; return 1; }; }
credentials(){ node -e 'process.stdout.write(JSON.stringify({email:process.argv[1],password:process.argv[2],...(process.argv[3]?{accountType:"professional"}:{})}))' -- "$1" "$PASSWORD" "${2:-}"; }
assert_count(){ node -e 'const x=JSON.parse(require("fs").readFileSync(0,"utf8"));if(!Array.isArray(x)||x.length!==Number(process.argv[1]))process.exit(1)' -- "$1"; }
# Anonymous read uses governed database IDs; no assumption that ID equals vertical.role.
CATALOG="$(request GET /v1/taxonomy/roles)"
ROLE="$(printf '%s' "$CATALOG" | node -e 'const rows=JSON.parse(require("fs").readFileSync(0,"utf8"));if(!Array.isArray(rows)||rows.some(x=>typeof x.id!=="string"||!x.id))process.exit(1);const r=rows.find(x=>x.role==="bartender");if(!r||!r.skills.length)process.exit(1);process.stdout.write(JSON.stringify(r));')"
ROLE_ID="$(printf '%s' "$ROLE" | json_field id)"
ROLE_PATH="$(node -e 'process.stdout.write(encodeURIComponent(process.argv[1]))' -- "$ROLE_ID")"
SKILL="$(printf '%s' "$ROLE" | json_field skills.0)"
request GET /v1/taxonomy/roles?q=NO_MATCHING_CATALOG_FIXTURE | assert_count 0
SEARCH="$(request GET /v1/taxonomy/roles?q=bartender)"
printf '%s' "$SEARCH" | node -e 'const rows=JSON.parse(require("fs").readFileSync(0,"utf8"));if(rows.length!==1||rows[0].id!==process.argv[1])process.exit(1)' -- "$ROLE_ID"
EMAIL_A="catalog-a-$STAMP@example.test"
EMAIL_B="catalog-b-$STAMP@example.test"
request POST /v1/auth/signup '' "$(credentials "$EMAIL_A" signup)" >/dev/null
request POST /v1/auth/signup '' "$(credentials "$EMAIL_B" signup)" >/dev/null
TOKEN_A="$(request POST /v1/auth/signin '' "$(credentials "$EMAIL_A")" | json_field accessToken)"
TOKEN_B="$(request POST /v1/auth/signin '' "$(credentials "$EMAIL_B")" | json_field accessToken)"
for token in "$TOKEN_A" "$TOKEN_B"; do
 request PUT /v1/professional-profile "$token" '{"displayName":"Catalog fixture","primaryRole":"Bartender"}' >/dev/null
 request GET /v1/professional-capabilities "$token" | assert_count 0
done
BODY="$(node -e 'process.stdout.write(JSON.stringify({skills:[process.argv[1]],certifications:[],provenLevel:null}))' -- "$SKILL")"
RESULT="$(request PUT "/v1/professional-capabilities/$ROLE_PATH" "$TOKEN_A" "$BODY")"
test "$(printf '%s' "$RESULT" | json_field roleId)" = "$ROLE_ID"
request GET /v1/professional-capabilities "$TOKEN_A" | node -e 'const x=JSON.parse(require("fs").readFileSync(0,"utf8"));if(x.length!==1||x[0].roleId!==process.argv[1]||x[0].skills.length!==1||x[0].skills[0]!==process.argv[2])process.exit(1)' -- "$ROLE_ID" "$SKILL"
# Another identity cannot observe or delete the first identity's capability.
request GET /v1/professional-capabilities "$TOKEN_B" | assert_count 0
request DELETE "/v1/professional-capabilities/$ROLE_PATH" "$TOKEN_B" >/dev/null
request GET /v1/professional-capabilities "$TOKEN_A" | assert_count 1
# Malformed JSON shapes are rejected as400 without replacing the previously registered capability.
for invalid in 'null' '[]' '{"skills":1}' '{"skills":"drink_preparation"}' '{"skills":["drink_preparation",1]}' '{"certifications":"certificate"}' '{"certifications":[null]}' '{"provenLevel":0}' '{"provenLevel":"verified_by_agent"}'; do
 expect_status malformed-capability 400 PUT "/v1/professional-capabilities/$ROLE_PATH" "$TOKEN_A" "$invalid"
done
expect_status auth-before-shape 401 PUT "/v1/professional-capabilities/$ROLE_PATH" invalid-token 'null'
request GET /v1/professional-capabilities "$TOKEN_A" | node -e 'const x=JSON.parse(require("fs").readFileSync(0,"utf8"));if(x.length!==1||x[0].roleId!==process.argv[1]||x[0].skills.length!==1||x[0].skills[0]!==process.argv[2]||x[0].certifications.length!==0||x[0].provenLevel!==null)throw Error("invalid_capability_changed_registration");' -- "$ROLE_ID" "$SKILL"
echo 'PASS: malformed capability bodies are HTTP400 after authentication, without overwriting canonical registration'
expect_status noncanonical-skill 400 PUT "/v1/professional-capabilities/$ROLE_PATH" "$TOKEN_A" '{"skills":["fixture_not_in_catalog"]}'
expect_status absent-role 400 PUT /v1/professional-capabilities/fixture.missing "$TOKEN_A" "$BODY"
request GET /v1/professional-capabilities "$TOKEN_A" | assert_count 1
request DELETE "/v1/professional-capabilities/$ROLE_PATH" "$TOKEN_A" >/dev/null
request GET /v1/professional-capabilities "$TOKEN_A" | assert_count 0
for token in "$TOKEN_A" "$TOKEN_B"; do request POST /v1/auth/signout "$token" >/dev/null; done
echo 'PASS: governed taxonomy IDs support real capability CRUD with identity isolation and canonical validation'
