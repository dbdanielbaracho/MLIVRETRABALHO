#!/usr/bin/env bash
set -euo pipefail
BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
: "${PAYMENT_WEBHOOK_SECRET:?PAYMENT_WEBHOOK_SECRET_required}"
STAMP="$(date +%s)-$RANDOM"
PASSWORD="FinancePass123!"
PRO_EMAIL="finance-pro-${STAMP}@example.test"
PRO2_EMAIL="finance-wrong-${STAMP}@example.test"
COMPANY_A_EMAIL="finance-company-a-${STAMP}@example.test"
COMPANY_B_EMAIL="finance-company-b-${STAMP}@example.test"
START_AT="$(node -e 'process.stdout.write(new Date(Date.now()+24*60*60*1000).toISOString())')"
END_AT="$(node -e 'process.stdout.write(new Date(Date.now()+32*60*60*1000).toISOString())')"
AVAIL_START="$(node -e 'process.stdout.write(new Date(Date.now()+23*60*60*1000).toISOString())')"
AVAIL_END="$(node -e 'process.stdout.write(new Date(Date.now()+33*60*60*1000).toISOString())')"
json_field(){ node -e 'const fs=require("fs");let x=JSON.parse(fs.readFileSync(0,"utf8"));for(const p of process.argv[1].split(".")){x=/^\d+$/.test(p)?x[Number(p)]:x?.[p]}if(x===undefined||x===null)process.exit(2);process.stdout.write(String(x));' "$1"; }
request(){ local method="$1" url="$2" token="${3:-}" tenant="${4:-}" body="${5:-}"; local args=(-sS --fail-with-body -X "$method" "${BASE_URL%/}$url"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$tenant" ]] && args+=(-H "x-tenant-id: $tenant"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }
signature_for(){ local body="$1" timestamp="$2"; node -e 'const c=require("node:crypto");process.stdout.write(c.createHmac("sha256",process.argv[1]).update(`${process.argv[2]}.${process.argv[3]}`).digest("hex"))' "$PAYMENT_WEBHOOK_SECRET" "$timestamp" "$body"; }
signed_webhook(){ local body="$1" timestamp signature; timestamp="$(date +%s)"; signature="$(signature_for "$body" "$timestamp")"; curl -sS --fail-with-body -X POST "${BASE_URL%/}/v1/payments/webhook" -H 'content-type: application/json' -H "x-webhook-timestamp: $timestamp" -H "x-webhook-signature: sha256=$signature" --data "$body"; }
signed_status(){ local body="$1" timestamp signature; timestamp="$(date +%s)"; signature="$(signature_for "$body" "$timestamp")"; curl -sS -o /tmp/finance-negative.json -w '%{http_code}' -X POST "${BASE_URL%/}/v1/payments/webhook" -H 'content-type: application/json' -H "x-webhook-timestamp: $timestamp" -H "x-webhook-signature: sha256=$signature" --data "$body"; }

for EMAIL in "$PRO_EMAIL" "$PRO2_EMAIL"; do request POST /v1/auth/signup '' '' "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"professional\"}" >/dev/null; done
COMPANY_A="$(request POST /v1/auth/signup '' '' "{\"email\":\"$COMPANY_A_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"Finance Company A\"}")"
COMPANY_B="$(request POST /v1/auth/signup '' '' "{\"email\":\"$COMPANY_B_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"Finance Company B\"}")"
TENANT_A="$(printf '%s' "$COMPANY_A" | json_field tenantId)"; TENANT_B="$(printf '%s' "$COMPANY_B" | json_field tenantId)"
PRO_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$PRO_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
PRO2_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$PRO2_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
A_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$COMPANY_A_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
B_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$COMPANY_B_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
PROFILE="$(request PUT /v1/professional-profile "$PRO_TOKEN" '' '{"displayName":"Finance Bartender","homeCity":"São Paulo","primaryRole":"Bartender"}')"; PRO_ID="$(printf '%s' "$PROFILE" | json_field id)"
PROFILE2="$(request PUT /v1/professional-profile "$PRO2_TOKEN" '' '{"displayName":"Wrong Recipient","homeCity":"São Paulo","primaryRole":"Bartender"}')"; PRO2_ID="$(printf '%s' "$PROFILE2" | json_field id)"
request POST /v1/availability/mine "$PRO_TOKEN" '' "{\"startsAt\":\"$AVAIL_START\",\"endsAt\":\"$AVAIL_END\"}" >/dev/null
JOB="$(request POST /v1/company/jobs "$A_TOKEN" "$TENANT_A" "{\"title\":\"Finance Bartender Shift\",\"requiredRole\":\"Bartender\",\"workCity\":\"São Paulo\",\"startsAt\":\"$START_AT\",\"endsAt\":\"$END_AT\",\"payCents\":25000}")"; JOB_ID="$(printf '%s' "$JOB" | json_field id)"
request POST "/v1/jobs/$JOB_ID/interest" "$PRO_TOKEN" >/dev/null
CONFIRM="$(request POST "/v1/company/jobs/$JOB_ID/confirm" "$A_TOKEN" "$TENANT_A" "{\"professionalId\":\"$PRO_ID\"}")"; ASSIGNMENT_ID="$(printf '%s' "$CONFIRM" | json_field id)"
for STEP in check-in start check-out complete; do request POST "/v1/assignments/$ASSIGNMENT_ID/$STEP" "$PRO_TOKEN" "$TENANT_A" '{}' >/dev/null; done

RECON_A="$(request GET /v1/company/payment-events/reconciliation "$A_TOKEN" "$TENANT_A")"
node -e 'const rows=JSON.parse(process.argv[1]);const id=process.argv[2];const x=rows.find(v=>v.assignmentId===id);if(!x||x.payableCents!==25000||x.paidOutCents!==0||x.reconciliationStatus!=="pending"){process.exit(1)}' "$RECON_A" "$ASSIGNMENT_ID"

CAPTURE_BODY="{\"tenantId\":\"$TENANT_A\",\"assignmentId\":\"$ASSIGNMENT_ID\",\"eventType\":\"captured\",\"amountCents\":25000,\"providerReference\":\"capture-$STAMP\",\"idempotencyKey\":\"capture-$STAMP\"}"
WRONG_PAYOUT="{\"tenantId\":\"$TENANT_A\",\"assignmentId\":\"$ASSIGNMENT_ID\",\"eventType\":\"payout_paid\",\"amountCents\":25000,\"recipientProfessionalId\":\"$PRO2_ID\",\"providerReference\":\"wrong-$STAMP\",\"idempotencyKey\":\"wrong-$STAMP\"}"
PAYOUT_BODY="{\"tenantId\":\"$TENANT_A\",\"assignmentId\":\"$ASSIGNMENT_ID\",\"eventType\":\"payout_paid\",\"amountCents\":25000,\"recipientProfessionalId\":\"$PRO_ID\",\"providerReference\":\"payout-$STAMP\",\"idempotencyKey\":\"payout-$STAMP\"}"
signed_webhook "$CAPTURE_BODY" >/dev/null
signed_webhook "$CAPTURE_BODY" >/dev/null
test "$(signed_status "$WRONG_PAYOUT")" = "400"
signed_webhook "$PAYOUT_BODY" >/dev/null
signed_webhook "$PAYOUT_BODY" >/dev/null

EVENTS_A="$(request GET /v1/company/payment-events "$A_TOKEN" "$TENANT_A")"
node -e 'const rows=JSON.parse(process.argv[1]);const id=process.argv[2],pro=process.argv[3];const own=rows.filter(v=>v.assignmentId===id);const payouts=own.filter(v=>v.eventType==="payout_paid");const p=payouts[0];if(own.length!==2||payouts.length!==1||!p||p.recipientProfessionalId!==pro){console.error("duplicate payout/idempotency assertion failed",own);process.exit(1)}' "$EVENTS_A" "$ASSIGNMENT_ID" "$PRO_ID"
RECON_AFTER="$(request GET /v1/company/payment-events/reconciliation "$A_TOKEN" "$TENANT_A")"
node -e 'const rows=JSON.parse(process.argv[1]);const id=process.argv[2];const x=rows.find(v=>v.assignmentId===id);if(!x||x.capturedCents!==25000||x.paidOutCents!==25000||x.reconciliationStatus!=="reconciled"){process.exit(1)}' "$RECON_AFTER" "$ASSIGNMENT_ID"
EVENTS_B="$(request GET /v1/company/payment-events "$B_TOKEN" "$TENANT_B")"
node -e 'const rows=JSON.parse(process.argv[1]);const id=process.argv[2];if(rows.some(v=>v.assignmentId===id))process.exit(1)' "$EVENTS_B" "$ASSIGNMENT_ID"

for TOKEN in "$PRO_TOKEN" "$PRO2_TOKEN"; do request POST /v1/auth/signout "$TOKEN" '' '{}' >/dev/null; done
request POST /v1/auth/signout "$A_TOKEN" '' '{}' >/dev/null; request POST /v1/auth/signout "$B_TOKEN" '' '{}' >/dev/null
echo "PASS: signed finance events are idempotent, recipient-bound, duplicate-payout-safe, tenant-isolated and reconciled"
