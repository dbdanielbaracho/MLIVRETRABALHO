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
ACCESS_REQUEST_ID="$(printf '%s' "$EXPORT" | json_field requestId)"
node -e '
const x=JSON.parse(process.argv[1]);
const email=process.argv[2];
if(!x.requestId)throw new Error("requestId missing");
if(x.identity?.email!==email)throw new Error("identity email missing");
if(x.professionalProfile?.displayName!=="Privacy Export Test")throw new Error("profile missing");
const raw=JSON.stringify(x);
for(const forbidden of ["password_hash","passwordHash","accessToken","token_hash","tokenHash"]){if(raw.includes(forbidden))throw new Error(`forbidden secret field: ${forbidden}`)}
if(!Array.isArray(x.memberships)||!Array.isArray(x.assignments)||!Array.isArray(x.earnings)||!Array.isArray(x.verifications))throw new Error("export arrays missing");
' "$EXPORT" "$EMAIL"

CORRECTION="$(request POST /v1/privacy/requests "$TOKEN" '{"requestType":"correction"}')"
CORRECTION_REQUEST_ID="$(printf '%s' "$CORRECTION" | json_field requestId)"
PORTABILITY="$(request POST /v1/privacy/requests "$TOKEN" '{"requestType":"portability"}')"
PORTABILITY_REQUEST_ID="$(printf '%s' "$PORTABILITY" | json_field requestId)"
REQUESTS="$(request GET /v1/privacy/requests "$TOKEN")"
node -e '
const rows=JSON.parse(process.argv[1]);
const accessId=process.argv[2], correctionId=process.argv[3], portabilityId=process.argv[4];
if(!Array.isArray(rows))throw new Error("privacy requests list missing");
const access=rows.find(x=>x.id===accessId);
const correction=rows.find(x=>x.id===correctionId);
const portability=rows.find(x=>x.id===portabilityId);
if(!access||access.requestType!=="access"||access.status!=="completed")throw new Error("access request audit missing");
if(!correction||correction.requestType!=="correction"||correction.status!=="submitted")throw new Error("correction request audit missing");
if(!portability||portability.requestType!=="portability"||portability.status!=="submitted")throw new Error("portability request audit missing");
' "$REQUESTS" "$ACCESS_REQUEST_ID" "$CORRECTION_REQUEST_ID" "$PORTABILITY_REQUEST_ID"

STATUS="$(curl -sS -o /tmp/privacy-export-unauth.json -w '%{http_code}' "${BASE_URL%/}/v1/privacy/export")"
test "$STATUS" = "401"
BAD_STATUS="$(curl -sS -o /tmp/privacy-request-invalid.json -w '%{http_code}' -X POST "${BASE_URL%/}/v1/privacy/requests" -H "authorization: Bearer $TOKEN" -H 'content-type: application/json' --data '{"requestType":"unknown"}')"
test "$BAD_STATUS" = "400"

request POST /v1/auth/signout "$TOKEN" '{}' >/dev/null

echo "PASS: privacy export is scoped, secret-free and access/correction/portability requests have auditable ids"
