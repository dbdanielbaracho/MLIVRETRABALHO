#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
[[ "$BASE_URL" =~ ^http://(127\.0\.0\.1|localhost):[0-9]+/?$ ]] || { echo "local_http_required" >&2; exit 2; }
DB_URL="${DATABASE_URL:?DATABASE_URL_required}"
STAMP="$(date +%s)-$RANDOM"
EMAIL="signin-limit-${STAMP}@example.test"
UNKNOWN_EMAIL="signin-limit-unknown-${STAMP}@example.test"
PASSWORD="SigninLimitPass123!"
WRONG_PASSWORD="DefinitelyWrongPass123!"
LONG_PASSWORD="$(node -e 'process.stdout.write("x".repeat(129))')"
LONG_EMAIL="$(node -e 'process.stdout.write("x".repeat(310)+"@example.test")')"
LONG_WORKSPACE="$(node -e 'process.stdout.write("W".repeat(121))')"

json_field(){ node -e 'const fs=require("fs");let x=JSON.parse(fs.readFileSync(0,"utf8"));for(const p of process.argv[1].split(".")){x=x?.[p]}if(x===undefined||x===null)process.exit(2);process.stdout.write(String(x));' "$1"; }
status(){ local email="$1" password="$2" out="$3"; curl -sS -o "$out" -w '%{http_code}' -X POST "${BASE_URL%/}/v1/auth/signin" -H 'content-type: application/json' --data "{\"email\":\"$email\",\"password\":\"$password\"}"; }
signup_status(){ local body="$1" out="$2"; curl -sS -o "$out" -w '%{http_code}' -X POST "${BASE_URL%/}/v1/auth/signup" -H 'content-type: application/json' --data "$body"; }
login_token(){ curl -sS --fail-with-body -X POST "${BASE_URL%/}/v1/auth/signin" -H 'content-type: application/json' --data "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken; }


# Runtime JSON validation must reject malformed credentials without creating identity,
# workspace, membership, limiter or session state in this isolated CI database.
AUTH_INPUT_DIR="$(mktemp -d)"
trap 'rm -rf "$AUTH_INPUT_DIR"' EXIT
auth_snapshot(){ psql "$DB_URL" -AtF '|' -c 'SELECT (SELECT count(*) FROM identities),(SELECT count(*) FROM tenants),(SELECT count(*) FROM tenant_memberships),(SELECT count(*) FROM auth_signin_limits),(SELECT count(*) FROM sessions)'; }
node - "$EMAIL" "$PASSWORD" >"$AUTH_INPUT_DIR/credentials.jsonl" <<'NODE'
const [email,password]=process.argv.slice(2);
const rows=[null,[],true,42,"text",{}, {email,password:""}, {email:"",password}];
for(const value of [null,42,true,false,{},[],["text"]])for(const field of ["email","password"])rows.push({...{email,password},[field]:value});
for(const row of rows)console.log(JSON.stringify(row));
NODE
AUTH_BEFORE="$(auth_snapshot)"
for endpoint in signup signin; do
  while IFS= read -r body; do
    code="$(curl -sS -o "$AUTH_INPUT_DIR/response.json" -w '%{http_code}' -X POST "${BASE_URL%/}/v1/auth/$endpoint" -H 'content-type: application/json' --data "$body")"
    test "$code" = "401"
    if [[ "$endpoint" = signup ]]; then grep -q 'invalid_signup' "$AUTH_INPUT_DIR/response.json"; fi
  done <"$AUTH_INPUT_DIR/credentials.jsonl"
done
node - "$EMAIL" "$PASSWORD" >"$AUTH_INPUT_DIR/workspaces.jsonl" <<'NODE'
const [email,password]=process.argv.slice(2);
for(const workspaceName of [null,42,true,false,{},[],["Empresa"],"","   "])console.log(JSON.stringify({email,password,accountType:"company",workspaceName}));
console.log(JSON.stringify({email,password,accountType:"company"}));
NODE
while IFS= read -r body; do
  test "$(signup_status "$body" "$AUTH_INPUT_DIR/response.json")" = "400"
  grep -q 'workspace_name_required' "$AUTH_INPUT_DIR/response.json"
done <"$AUTH_INPUT_DIR/workspaces.jsonl"
test "$(signup_status "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"admin\"}" "$AUTH_INPUT_DIR/response.json")" = "400"
grep -q 'account_type_invalid' "$AUTH_INPUT_DIR/response.json"
test "$(auth_snapshot)" = "$AUTH_BEFORE"
echo 'PASS: auth malformed JSON rejects without identity, tenant, membership, limiter or session writes'

# Input bounds must fail before expensive or persistent work.
test "$(signup_status "{\"email\":\"bounds-pass-${STAMP}@example.test\",\"password\":\"$LONG_PASSWORD\",\"accountType\":\"professional\"}" /tmp/auth-bounds-password.json)" = "401"
grep -q 'invalid_signup' /tmp/auth-bounds-password.json
test "$(signup_status "{\"email\":\"$LONG_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"professional\"}" /tmp/auth-bounds-email.json)" = "401"
grep -q 'invalid_signup' /tmp/auth-bounds-email.json
test "$(signup_status "{\"email\":\"bounds-workspace-${STAMP}@example.test\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"$LONG_WORKSPACE\"}" /tmp/auth-bounds-workspace.json)" = "400"
grep -q 'workspace_name_too_long' /tmp/auth-bounds-workspace.json
test "$(status "$EMAIL" "$LONG_PASSWORD" /tmp/auth-bounds-signin-password.json)" = "401"

curl -sS --fail-with-body -X POST "${BASE_URL%/}/v1/auth/signup" -H 'content-type: application/json' --data "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"professional\"}" >/dev/null
IDENTITY_ID="$(psql "$DB_URL" -tAc "SELECT id FROM identities WHERE email='$EMAIL'")"
test -n "$IDENTITY_ID"


# Malformed passwords on a real identity must not consume its failure window or
# create a session. Valid/wrong string credentials below still exercise real scrypt.
AUTH_EXISTING_BEFORE="$(auth_snapshot)"
node - "$EMAIL" >"$AUTH_INPUT_DIR/existing.jsonl" <<'NODE'
const email=process.argv[2];
for(const password of [null,42,true,false,{},[],["text"]])console.log(JSON.stringify({email,password}));
NODE
while IFS= read -r body; do
  test "$(curl -sS -o "$AUTH_INPUT_DIR/response.json" -w '%{http_code}' -X POST "${BASE_URL%/}/v1/auth/signin" -H 'content-type: application/json' --data "$body")" = "401"
done <"$AUTH_INPUT_DIR/existing.jsonl"
test "$(auth_snapshot)" = "$AUTH_EXISTING_BEFORE"
echo 'PASS: auth malformed passwords leave real identity limiter and sessions unchanged'

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
FIRST_HASH="$(node -e 'const c=require("node:crypto");process.stdout.write(c.createHash("sha256").update(process.argv[1]).digest("hex"))' -- "$FIRST_TOKEN")"
test "$(psql "$DB_URL" -tAc "SELECT count(*) FROM sessions WHERE identity_id='$IDENTITY_ID' AND token_hash='$FIRST_HASH'")" = "0"

curl -sS --fail-with-body -X POST "${BASE_URL%/}/v1/auth/signout" -H "authorization: Bearer $LAST_TOKEN" -H 'content-type: application/json' --data '{}' >/dev/null

echo 'PASS: auth inputs are bounded, signin brute force is limited, limiter resets on success, unknown emails create no limiter state, and active sessions are capped at 10'
