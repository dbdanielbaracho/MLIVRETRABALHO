#!/usr/bin/env bash
set -euo pipefail
BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
STAMP="$(date +%s)-$RANDOM"
PASSWORD="TrustPass123!"
PRO_EMAIL="trust-pro-${STAMP}@example.test"
COMPANY_A_EMAIL="trust-company-a-${STAMP}@example.test"
COMPANY_B_EMAIL="trust-company-b-${STAMP}@example.test"
START_AT="$(node -e 'process.stdout.write(new Date(Date.now()+24*60*60*1000).toISOString())')"
END_AT="$(node -e 'process.stdout.write(new Date(Date.now()+32*60*60*1000).toISOString())')"
AVAIL_START="$(node -e 'process.stdout.write(new Date(Date.now()+23*60*60*1000).toISOString())')"
AVAIL_END="$(node -e 'process.stdout.write(new Date(Date.now()+33*60*60*1000).toISOString())')"
json_field(){ node -e 'const fs=require("fs");let x=JSON.parse(fs.readFileSync(0,"utf8"));for(const p of process.argv[1].split(".")){x=/^\d+$/.test(p)?x[Number(p)]:x?.[p]}if(x===undefined||x===null)process.exit(2);process.stdout.write(String(x));' "$1"; }
request(){ local method="$1" url="$2" token="${3:-}" tenant="${4:-}" body="${5:-}"; local args=(-sS --fail-with-body -X "$method" "${BASE_URL%/}$url"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$tenant" ]] && args+=(-H "x-tenant-id: $tenant"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }
status_with_body(){ local method="$1" url="$2" token="$3" tenant="$4" body="$5"; curl -sS -o /tmp/trust-cause-negative.json -w '%{http_code}' -X "$method" "${BASE_URL%/}$url" -H "authorization: Bearer $token" -H "x-tenant-id: $tenant" -H 'content-type: application/json' --data "$body"; }

request POST /v1/auth/signup '' '' "{\"email\":\"$PRO_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"professional\"}" >/dev/null
A="$(request POST /v1/auth/signup '' '' "{\"email\":\"$COMPANY_A_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"Trust A\"}")"
B="$(request POST /v1/auth/signup '' '' "{\"email\":\"$COMPANY_B_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"Trust B\"}")"
TENANT_A="$(printf '%s' "$A" | json_field tenantId)"; TENANT_B="$(printf '%s' "$B" | json_field tenantId)"
PRO_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$PRO_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
A_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$COMPANY_A_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
B_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$COMPANY_B_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
PROFILE="$(request PUT /v1/professional-profile "$PRO_TOKEN" '' '{"displayName":"Trust Worker","homeCity":"São Paulo","primaryRole":"Bartender"}')"; PRO_ID="$(printf '%s' "$PROFILE" | json_field id)"
request POST /v1/availability/mine "$PRO_TOKEN" '' "{\"startsAt\":\"$AVAIL_START\",\"endsAt\":\"$AVAIL_END\"}" >/dev/null
JOB="$(request POST /v1/company/jobs "$A_TOKEN" "$TENANT_A" "{\"title\":\"Trust Shift\",\"requiredRole\":\"Bartender\",\"workCity\":\"São Paulo\",\"startsAt\":\"$START_AT\",\"endsAt\":\"$END_AT\",\"payCents\":25000}")"; JOB_ID="$(printf '%s' "$JOB" | json_field id)"
request POST "/v1/jobs/$JOB_ID/interest" "$PRO_TOKEN" >/dev/null
CONFIRM="$(request POST "/v1/company/jobs/$JOB_ID/confirm" "$A_TOKEN" "$TENANT_A" "{\"professionalId\":\"$PRO_ID\"}")"; ASSIGNMENT_ID="$(printf '%s' "$CONFIRM" | json_field id)"

EVENT="$(request POST /v1/company/trust-events "$A_TOKEN" "$TENANT_A" "{\"assignmentId\":\"$ASSIGNMENT_ID\",\"professionalId\":\"$PRO_ID\",\"eventType\":\"incident\",\"cause\":\"company\",\"notes\":\"Operação cancelou acesso ao local\"}")"
test "$(printf '%s' "$EVENT" | json_field cause)" = "company"
REPORTER="$(printf '%s' "$EVENT" | json_field reportedByIdentityId)"; test -n "$REPORTER"

LIST="$(request GET "/v1/company/trust-events/$PRO_ID" "$A_TOKEN" "$TENANT_A")"
node -e 'const rows=JSON.parse(process.argv[1]);const id=process.argv[2];const x=rows.find(v=>v.assignmentId===id);if(!x||x.eventType!=="incident"||x.cause!=="company"||!x.reportedByIdentityId){console.error("causal trust event missing",x);process.exit(1)}' "$LIST" "$ASSIGNMENT_ID"

INVALID="$(status_with_body POST /v1/company/trust-events "$A_TOKEN" "$TENANT_A" "{\"assignmentId\":\"$ASSIGNMENT_ID\",\"professionalId\":\"$PRO_ID\",\"eventType\":\"no_show\",\"cause\":\"automatic_guilt\"}")"
test "$INVALID" = "400"

CROSS="$(curl -sS -o /tmp/trust-cross.json -w '%{http_code}' -X GET "${BASE_URL%/}/v1/company/trust-events/$PRO_ID" -H "authorization: Bearer $B_TOKEN" -H "x-tenant-id: $TENANT_B")"
test "$CROSS" = "404"

request POST /v1/auth/signout "$PRO_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$A_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$B_TOKEN" '' '{}' >/dev/null

echo "PASS: trust events preserve causal attribution, actor audit and tenant isolation without automatic enforcement"
