#!/usr/bin/env bash
set -euo pipefail
BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
STAMP="$(date +%s)-$RANDOM"
PASSWORD="FinancePass123!"
PRO_EMAIL="finance-pro-${STAMP}@example.test"
COMPANY_A_EMAIL="finance-company-a-${STAMP}@example.test"
COMPANY_B_EMAIL="finance-company-b-${STAMP}@example.test"
START_AT="$(node -e 'process.stdout.write(new Date(Date.now()+24*60*60*1000).toISOString())')"
END_AT="$(node -e 'process.stdout.write(new Date(Date.now()+32*60*60*1000).toISOString())')"
AVAIL_START="$(node -e 'process.stdout.write(new Date(Date.now()+23*60*60*1000).toISOString())')"
AVAIL_END="$(node -e 'process.stdout.write(new Date(Date.now()+33*60*60*1000).toISOString())')"
json_field(){ node -e 'const fs=require("fs");let x=JSON.parse(fs.readFileSync(0,"utf8"));for(const p of process.argv[1].split(".")){x=/^\d+$/.test(p)?x[Number(p)]:x?.[p]}if(x===undefined||x===null)process.exit(2);process.stdout.write(String(x));' "$1"; }
request(){ local method="$1" url="$2" token="${3:-}" tenant="${4:-}" body="${5:-}"; local args=(-sS --fail-with-body -X "$method" "${BASE_URL%/}$url"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$tenant" ]] && args+=(-H "x-tenant-id: $tenant"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }
request POST /v1/auth/signup '' '' "{\"email\":\"$PRO_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"professional\"}" >/dev/null
COMPANY_A="$(request POST /v1/auth/signup '' '' "{\"email\":\"$COMPANY_A_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"Finance Company A\"}")"
COMPANY_B="$(request POST /v1/auth/signup '' '' "{\"email\":\"$COMPANY_B_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"Finance Company B\"}")"
TENANT_A="$(printf '%s' "$COMPANY_A" | json_field tenantId)"; TENANT_B="$(printf '%s' "$COMPANY_B" | json_field tenantId)"
PRO_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$PRO_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
A_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$COMPANY_A_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
B_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$COMPANY_B_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
PROFILE="$(request PUT /v1/professional-profile "$PRO_TOKEN" '' '{"displayName":"Finance Bartender","homeCity":"São Paulo","primaryRole":"Bartender"}')"; PRO_ID="$(printf '%s' "$PROFILE" | json_field id)"
request POST /v1/availability/mine "$PRO_TOKEN" '' "{\"startsAt\":\"$AVAIL_START\",\"endsAt\":\"$AVAIL_END\"}" >/dev/null
JOB="$(request POST /v1/company/jobs "$A_TOKEN" "$TENANT_A" "{\"title\":\"Finance Bartender Shift\",\"requiredRole\":\"Bartender\",\"workCity\":\"São Paulo\",\"startsAt\":\"$START_AT\",\"endsAt\":\"$END_AT\",\"payCents\":25000}")"; JOB_ID="$(printf '%s' "$JOB" | json_field id)"
request POST "/v1/jobs/$JOB_ID/interest" "$PRO_TOKEN" >/dev/null
CONFIRM="$(request POST "/v1/company/jobs/$JOB_ID/confirm" "$A_TOKEN" "$TENANT_A" "{\"professionalId\":\"$PRO_ID\"}")"; ASSIGNMENT_ID="$(printf '%s' "$CONFIRM" | json_field id)"
for STEP in check-in start check-out complete; do request POST "/v1/assignments/$ASSIGNMENT_ID/$STEP" "$PRO_TOKEN" "$TENANT_A" '{}' >/dev/null; done
RECON_A="$(request GET /v1/company/payment-events/reconciliation "$A_TOKEN" "$TENANT_A")"
node -e 'const rows=JSON.parse(process.argv[1]);const id=process.argv[2];const x=rows.find(v=>v.assignmentId===id);if(!x||x.payableCents!==25000||x.paidOutCents!==0||x.reconciliationStatus!=="pending"||x.professionalName!=="Finance Bartender"){console.error("reconciliation assertion failed",JSON.stringify(x));process.exit(1)}' "$RECON_A" "$ASSIGNMENT_ID"
RECON_B="$(request GET /v1/company/payment-events/reconciliation "$B_TOKEN" "$TENANT_B")"
node -e 'const rows=JSON.parse(process.argv[1]);const id=process.argv[2];if(rows.some(v=>v.assignmentId===id)){console.error("cross-tenant reconciliation leak");process.exit(1)}' "$RECON_B" "$ASSIGNMENT_ID"
EVENTS_A="$(request GET /v1/company/payment-events "$A_TOKEN" "$TENANT_A")"
node -e 'const rows=JSON.parse(process.argv[1]);if(!Array.isArray(rows)||rows.length!==0){console.error("unexpected payment events",JSON.stringify(rows));process.exit(1)}' "$EVENTS_A"
request POST /v1/auth/signout "$PRO_TOKEN" '' '{}' >/dev/null; request POST /v1/auth/signout "$A_TOKEN" '' '{}' >/dev/null; request POST /v1/auth/signout "$B_TOKEN" '' '{}' >/dev/null
echo "PASS: read-only finance reconciliation is tenant-isolated and provider events remain absent"
