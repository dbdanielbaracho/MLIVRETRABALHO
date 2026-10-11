#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
case "$BASE_URL" in http://127.0.0.1:*|http://localhost:*) ;; *) echo "Refusing terms fixture writes outside localhost" >&2; exit 2 ;; esac
TERMS_INPUT_DIR="$(mktemp -d)"
trap 'rm -rf "$TERMS_INPUT_DIR"' EXIT
STAMP="$(date +%s)-$RANDOM"
EMAIL="company-onboard-${STAMP}@example.test"
PASSWORD="CompanyPass123!"
WORKSPACE="Empresa HTTP ${STAMP}"
START_AT="$(node -e 'process.stdout.write(new Date(Date.now()+24*60*60*1000).toISOString())')"
END_AT="$(node -e 'process.stdout.write(new Date(Date.now()+32*60*60*1000).toISOString())')"

json_field(){ node -e 'const fs=require("fs");let x=JSON.parse(fs.readFileSync(0,"utf8"));for(const p of process.argv[1].split(".")){if(/^\d+$/.test(p))x=x[Number(p)];else x=x?.[p]}if(x===undefined||x===null)process.exit(2);process.stdout.write(String(x));' "$1"; }
request(){ local method="$1" url="$2" token="${3:-}" tenant="${4:-}" body="${5:-}"; local args=(-sS --fail-with-body -X "$method" "${BASE_URL%/}$url"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$tenant" ]] && args+=(-H "x-tenant-id: $tenant"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }
status_only(){ local method="$1" url="$2" token="$3" tenant="$4" body="$5"; curl -sS -o "$TERMS_INPUT_DIR/company-onboarding-negative.json" -w '%{http_code}' -X "$method" "${BASE_URL%/}$url" -H "authorization: Bearer $token" -H "x-tenant-id: $tenant" -H 'content-type: application/json' --data "$body"; }

SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"$WORKSPACE\"}")"
TENANT_ID="$(printf '%s' "$SIGNUP" | json_field tenantId)"
test "$(printf '%s' "$SIGNUP" | json_field role)" = "owner"
test "$(printf '%s' "$SIGNUP" | json_field accountType)" = "company"

SIGNIN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")"
TOKEN="$(printf '%s' "$SIGNIN" | json_field accessToken)"
printf '%s' "$SIGNIN" | grep -q "$TENANT_ID"
printf '%s' "$SIGNIN" | grep -q 'owner'

ME="$(request GET /v1/me "$TOKEN")"
printf '%s' "$ME" | grep -q "$TENANT_ID"
printf '%s' "$ME" | grep -q 'owner'


# Malformed term acceptances return 400 without creating or changing actual acceptance rows.
TERMS_BEFORE="$(request GET /v1/terms/acceptances "$TOKEN")"
TERMS_STATUS_BEFORE="$(request GET /v1/terms/status "$TOKEN")"
node - "$TERMS_INPUT_DIR" <<'NODE'
const fs=require('fs'),dir=process.argv[2];
const bad=[null,false,true,42,'text',[],{},
 ...[undefined,null,false,true,42,[],{},['platform_terms'],'','  '].map(termsKey=>({termsKey,version:'1.0'})),
 ...[undefined,null,false,true,42,[],{},['1.0'],'','  '].map(version=>({termsKey:'platform_terms',version}))];
bad.forEach((body,i)=>fs.writeFileSync(dir+'/bad-terms-'+i+'.json',JSON.stringify(body)));
NODE
for payload in "$TERMS_INPUT_DIR"/bad-terms-*.json; do
 code="$(curl -sS -o "$TERMS_INPUT_DIR/response.json" -w '%{http_code}' -X POST "$BASE_URL/v1/terms/accept" -H "authorization: Bearer $TOKEN" -H 'content-type: application/json' --data-binary "@$payload")"
 test "$code" = 400
 test "$(json_field message < "$TERMS_INPUT_DIR/response.json")" = terms_key_and_version_required
done
test "$(status_only POST /v1/terms/accept invalid-token '' null)" = 401
test "$(request GET /v1/terms/acceptances "$TOKEN")" = "$TERMS_BEFORE"
test "$(request GET /v1/terms/status "$TOKEN")" = "$TERMS_STATUS_BEFORE"
echo 'PASS: malformed terms JSON rejects before changing actual identity-scoped acceptances or compliance'

# Both account types keep explicit terms, actual acceptance dates and idempotent replay.
PRO_EMAIL="terms-professional-$STAMP@example.test"
request POST /v1/auth/signup '' '' "{\"email\":\"$PRO_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"professional\"}" >/dev/null
PRO_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$PRO_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
for token in "$TOKEN" "$PRO_TOKEN"; do
 for key in platform_terms privacy_notice; do
  body="$(node -e 'process.stdout.write(JSON.stringify({termsKey:" "+process.argv[1]+" ",version:" 1.0 ",identityId:"spoof"}))' "$key")"
  ack="$(request POST /v1/terms/accept "$token" '' "$body")"
  replay="$(request POST /v1/terms/accept "$token" '' "$body")"
  node - "$ack" "$replay" "$key" <<'NODE'
const ack=JSON.parse(process.argv[2]),replay=JSON.parse(process.argv[3]),key=process.argv[4];
if(ack.termsKey!==key||ack.version!=='1.0'||!Number.isFinite(Date.parse(ack.acceptedAt))||JSON.stringify(ack)!==JSON.stringify(replay))throw Error('terms replay lost explicit key/version or real immutable acceptance date');
NODE
 done
 rows="$(request GET /v1/terms/acceptances "$token")"
 status="$(request GET /v1/terms/status "$token")"
 account=professional
 test "$token" != "$TOKEN" || account=company
 node - "$rows" "$status" "$account" <<'NODE'
const rows=JSON.parse(process.argv[2]),status=JSON.parse(process.argv[3]),account=process.argv[4];
if(rows.length!==2||rows.some(x=>!['platform_terms','privacy_notice'].includes(x.termsKey)||x.version!=='1.0'||!Number.isFinite(Date.parse(x.acceptedAt)))||status.accountType!==account||!status.compliant||status.missing.length||status.accepted.length!==2)throw Error('actual terms lost scoped dates, explicit versions or account compliance');
NODE
 if test "$token" = "$TOKEN"; then
  test "$(request GET /v1/terms/acceptances "$PRO_TOKEN")" = '[]'
  COMPANY_TERMS="$(request GET /v1/terms/acceptances "$TOKEN")"
 fi
done
test "$(request GET /v1/terms/acceptances "$TOKEN")" = "$COMPANY_TERMS"
request POST /v1/auth/signout "$PRO_TOKEN" '' '{}' >/dev/null
echo 'PASS: terms acceptances preserve identity isolation explicit versions and immutable replay dates for company and professional'

MISSING_WINDOW_STATUS="$(status_only POST /v1/company/jobs "$TOKEN" "$TENANT_ID" '{"title":"Bartender inválido","workCity":"São Paulo","payCents":10000}')"
test "$MISSING_WINDOW_STATUS" = "400"
REVERSED_WINDOW_STATUS="$(status_only POST /v1/company/jobs "$TOKEN" "$TENANT_ID" "{\"title\":\"Bartender inválido 2\",\"workCity\":\"São Paulo\",\"startsAt\":\"$END_AT\",\"endsAt\":\"$START_AT\",\"payCents\":10000}")"
test "$REVERSED_WINDOW_STATUS" = "400"

JOB="$(request POST /v1/company/jobs "$TOKEN" "$TENANT_ID" "{\"title\":\"Bartender\",\"requiredRole\":\"Bartender\",\"workCity\":\"São Paulo\",\"location\":\"Centro\",\"startsAt\":\"$START_AT\",\"endsAt\":\"$END_AT\",\"payCents\":10000}")"
test "$(printf '%s' "$JOB" | json_field title)" = "Bartender"
test "$(printf '%s' "$JOB" | json_field status)" = "open"
test "$(printf '%s' "$JOB" | json_field startsAt)" = "$START_AT"
test "$(printf '%s' "$JOB" | json_field endsAt)" = "$END_AT"

ANALYTICS="$(request GET /v1/company/analytics "$TOKEN" "$TENANT_ID")"
test "$(printf '%s' "$ANALYTICS" | json_field jobsCreated)" = "1"
test "$(printf '%s' "$ANALYTICS" | json_field openJobs)" = "1"
test "$(printf '%s' "$ANALYTICS" | json_field jobsWithInterest)" = "0"
test "$(printf '%s' "$ANALYTICS" | json_field jobsWithConfirmation)" = "0"
test "$(printf '%s' "$ANALYTICS" | json_field completedAssignments)" = "0"
test "$(printf '%s' "$ANALYTICS" | json_field cancelledAssignments)" = "0"

request POST /v1/auth/signout "$TOKEN" '' '{}' >/dev/null

echo "PASS: company signup creates workspace + owner membership + valid scheduled job + factual analytics"
