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
login_token(){ curl -sS --fail-with-body -X POST "${BASE_URL%/}/v1/auth/signin" -H 'content-type: application/json' --data "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken; }

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
FIRST_TOKEN="$(login_token)"
test -n "$FIRST_TOKEN"
test "$(psql "$DB_URL" -tAc "SELECT count(*) FROM auth_signin_limits WHERE identity_id='$IDENTITY_ID'")" = "0"

BEFORE_UNKNOWN="$(psql "$DB_URL" -tAc 'SELECT count(*) FROM auth_signin_limits')"
test "$(status "$UNKNOWN_EMAIL" "$WRONG_PASSWORD" /tmp/signin-limit-unknown.json)" = "401"
AFTER_UNKNOWN="$(psql "$DB_URL" -tAc 'SELECT count(*) FROM auth_signin_limits')"
test "$BEFORE_UNKNOWN" = "$AFTER_UNKNOWN"

LAST_TOKEN="$FIRST_TOKEN"
for n in $(seq 1 11); do LAST_TOKEN="$(login_token)"; done
ACTIVE_SESSIONS="$(psql "$DB_URL" -tAc "SELECT count(*) FROM sessions WHERE identity_id='$IDENTITY_ID' AND expires_at>now()")"
test "$ACTIVE_SESSIONS" = "10"
FIRST_HASH="$(node -e 'const c=require("node:crypto");process.stdout.write(c.createHash("sha256").update(process.argv[1]).digest("hex"))' "$FIRST_TOKEN")"
test "$(psql "$DB_URL" -tAc "SELECT count(*) FROM sessions WHERE identity_id='$IDENTITY_ID' AND token_hash='$FIRST_HASH'")" = "0"

curl -sS --fail-with-body -X POST "${BASE_URL%/}/v1/auth/signout" -H "authorization: Bearer $LAST_TOKEN" -H 'content-type: application/json' --data '{}' >/dev/null

echo 'PASS: signin brute force is limited, limiter resets on success, unknown emails create no limiter state, and active sessions are capped at 10'
