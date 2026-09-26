#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
DB_URL="${DATABASE_URL:?DATABASE_URL_required}"
STAMP="$(date +%s)-$RANDOM"
EMAIL="signin-limit-${STAMP}@example.test"
UNKNOWN_EMAIL="signin-limit-unknown-${STAMP}@example.test"
PASSWORD="SigninLimitPass123!"
WRONG_PASSWORD="DefinitelyWrongPass123!"

json_field(){ node -e 'const fs=require("fs");let x=JSON.parse(fs.readFileSync(0,"utf8"));for(const p of process.argv[1].split(".")){x=x?.[p]}if(x===undefined||x===null)process.exit(2);process.stdout.write(String(x));' "$1"; }
status(){ local email="$1" password="$2" out="$3"; curl -sS -o "$out" -w '%{http_code}' -X POST "${BASE_URL%/}/v1/auth/signin" -H 'content-type: application/json' --data "{\"email\":\"$email\",\"password\":\"$password\"}"; }

curl -sS --fail-with-body -X POST "${BASE_URL%/}/v1/auth/signup" -H 'content-type: application/json' --data "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"professional\"}" >/dev/null
IDENTITY_ID="$(psql "$DB_URL" -tAc "SELECT id FROM identities WHERE email='$EMAIL'")"
test -n "$IDENTITY_ID"

for n in $(seq 1 7); do
  test "$(status "$EMAIL" "$WRONG_PASSWORD" "/tmp/signin-limit-$n.json")" = "401"
done

test "$(status "$EMAIL" "$WRONG_PASSWORD" /tmp/signin-limit-lock.json)" = "429"
grep -q 'too_many_signin_attempts' /tmp/signin-limit-lock.json

test "$(status "$EMAIL" "$PASSWORD" /tmp/signin-limit-correct-while-locked.json)" = "429"

LIMIT_ROW="$(psql "$DB_URL" -AtF '|' -c "SELECT failed_count,(locked_until>now())::int FROM auth_signin_limits WHERE identity_id='$IDENTITY_ID'")"
test "$LIMIT_ROW" = "8|1"

psql "$DB_URL" -v ON_ERROR_STOP=1 -q -c "UPDATE auth_signin_limits SET locked_until=now()-interval '1 second' WHERE identity_id='$IDENTITY_ID'"
LOGIN_JSON="$(curl -sS --fail-with-body -X POST "${BASE_URL%/}/v1/auth/signin" -H 'content-type: application/json' --data "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")"
TOKEN="$(printf '%s' "$LOGIN_JSON" | json_field accessToken)"
test -n "$TOKEN"
test "$(psql "$DB_URL" -tAc "SELECT count(*) FROM auth_signin_limits WHERE identity_id='$IDENTITY_ID'")" = "0"

BEFORE_UNKNOWN="$(psql "$DB_URL" -tAc 'SELECT count(*) FROM auth_signin_limits')"
test "$(status "$UNKNOWN_EMAIL" "$WRONG_PASSWORD" /tmp/signin-limit-unknown.json)" = "401"
AFTER_UNKNOWN="$(psql "$DB_URL" -tAc 'SELECT count(*) FROM auth_signin_limits')"
test "$BEFORE_UNKNOWN" = "$AFTER_UNKNOWN"

curl -sS --fail-with-body -X POST "${BASE_URL%/}/v1/auth/signout" -H "authorization: Bearer $TOKEN" -H 'content-type: application/json' --data '{}' >/dev/null

echo 'PASS: signin brute force is rate-limited, unlocks after expiry, resets on success, and unknown emails do not create limiter state'
