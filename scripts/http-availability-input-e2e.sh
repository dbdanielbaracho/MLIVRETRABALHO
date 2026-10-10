#!/usr/bin/env bash
# Only ephemeral localhost CI availability/profile fixtures; never production data.
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
EMAIL_A="availability-a-$STAMP@example.test"
EMAIL_B="availability-b-$STAMP@example.test"
request POST /v1/auth/signup '' "$(credentials "$EMAIL_A" signup)" >/dev/null
request POST /v1/auth/signup '' "$(credentials "$EMAIL_B" signup)" >/dev/null
TOKEN_A="$(request POST /v1/auth/signin '' "$(credentials "$EMAIL_A")" | json_field accessToken)"
TOKEN_B="$(request POST /v1/auth/signin '' "$(credentials "$EMAIL_B")" | json_field accessToken)"
request GET /v1/professional-profile "$TOKEN_A" | assert_null
# Both profiles are real ephemeral fixtures, scoped to their authenticated identities.
for token in "$TOKEN_A" "$TOKEN_B"; do
 request PUT /v1/professional-profile "$token" '{"displayName":"Availability fixture"}' >/dev/null
 request GET /v1/availability/mine "$token" | node -e 'const x=JSON.parse(require("fs").readFileSync(0,"utf8"));if(!Array.isArray(x)||x.length)process.exit(1)'
done
START_AT="$(node -e 'process.stdout.write(new Date(Date.now()+3600000).toISOString())')"
END_AT="$(node -e 'process.stdout.write(new Date(Date.now()+7200000).toISOString())')"
expect_availability_status(){ local expected="$1" token="$2" body="$3" actual; actual="$(curl -sS -o /dev/null -w '%{http_code}' -X POST "$BASE_URL/v1/availability/mine" -H "authorization: Bearer $token" -H 'content-type: application/json' --data "$body")"; [[ "$actual" == "$expected" ]] || { printf 'FAIL availability: expected %s, got %s\n' "$expected" "$actual" >&2; return 1; }; }
for body in '{}' '[]' 'null' '{"startsAt":0,"endsAt":1}' '{"startsAt":{},"endsAt":"2026-10-11T01:00:00Z"}' '{"startsAt":"bad-date","endsAt":"bad-date"}' '{"startsAt":"2026-10-11T01:00:00Z","endsAt":"2026-10-10T01:00:00Z"}'; do
 expect_availability_status 400 "$TOKEN_A" "$body"
 request GET /v1/availability/mine "$TOKEN_A" | node -e 'if(JSON.parse(require("fs").readFileSync(0,"utf8")).length)process.exit(1)'
done
expect_availability_status 401 '' '{}'
BODY="$(node -e 'process.stdout.write(JSON.stringify({startsAt:process.argv[1],endsAt:process.argv[2],professionalId:"untrusted",tenantId:"untrusted"}))' -- "$START_AT" "$END_AT")"
WINDOW="$(request POST /v1/availability/mine "$TOKEN_A" "$BODY")"
printf '%s' "$WINDOW" | node -e 'const x=JSON.parse(require("fs").readFileSync(0,"utf8"));if(!x.id||x.startsAt!==process.argv[1]||x.endsAt!==process.argv[2])process.exit(1)' -- "$START_AT" "$END_AT"
# Existing upsert on the same exact interval stays idempotent.
test "$(request POST /v1/availability/mine "$TOKEN_A" "$BODY" | json_field id)" = "$(printf '%s' "$WINDOW" | json_field id)"
request GET /v1/availability/mine "$TOKEN_A" | node -e 'const x=JSON.parse(require("fs").readFileSync(0,"utf8"));if(x.length!==1||x[0].id!==process.argv[1])process.exit(1)' -- "$(printf '%s' "$WINDOW" | json_field id)"
request GET /v1/availability/mine "$TOKEN_B" | node -e 'if(JSON.parse(require("fs").readFileSync(0,"utf8")).length)process.exit(1)'
for token in "$TOKEN_A" "$TOKEN_B"; do request POST /v1/auth/signout "$token" >/dev/null; done
echo 'PASS: availability rejects malformed inputs without writes, authenticates first, preserves interval and idempotency with identity isolation'
