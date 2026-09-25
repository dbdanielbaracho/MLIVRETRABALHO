#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
STAMP="$(date +%s)-$RANDOM"
EMAIL="privacy-${STAMP}@example.test"
PASSWORD="PrivacyPass123!"

json_field(){ node -e 'const fs=require("fs");let x=JSON.parse(fs.readFileSync(0,"utf8"));for(const p of process.argv[1].split(".")){x=x?.[p]}if(x===undefined||x===null)process.exit(2);process.stdout.write(String(x));' "$1"; }
request(){ local method="$1" url="$2" token="${3:-}" body="${4:-}"; local args=(-sS --fail-with-body -X "$method" "${BASE_URL%/}$url"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }

request POST /v1/auth/signup '' "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"professional\"}" >/dev/null
TOKEN="$(request POST /v1/auth/signin '' "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
request PUT /v1/professional-profile "$TOKEN" '{"displayName":"Privacy Export Test","homeCity":"São Paulo","primaryRole":"Bartender"}' >/dev/null

EXPORT="$(request GET /v1/privacy/export "$TOKEN")"
node -e '
const x=JSON.parse(process.argv[1]);
const email=process.argv[2];
if(x.identity?.email!==email)throw new Error("identity email missing");
if(x.professionalProfile?.displayName!=="Privacy Export Test")throw new Error("profile missing");
const raw=JSON.stringify(x);
for(const forbidden of ["password_hash","passwordHash","accessToken","token_hash","tokenHash"]){if(raw.includes(forbidden))throw new Error(`forbidden secret field: ${forbidden}`)}
if(!Array.isArray(x.memberships)||!Array.isArray(x.assignments)||!Array.isArray(x.earnings)||!Array.isArray(x.verifications))throw new Error("export arrays missing");
' "$EXPORT" "$EMAIL"

STATUS="$(curl -sS -o /tmp/privacy-export-unauth.json -w '%{http_code}' "${BASE_URL%/}/v1/privacy/export")"
test "$STATUS" = "401"

request POST /v1/auth/signout "$TOKEN" '{}' >/dev/null

echo "PASS: privacy export authenticated, scoped and secret-free"
