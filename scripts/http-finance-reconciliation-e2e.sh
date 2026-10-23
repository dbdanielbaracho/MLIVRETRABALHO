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
node -e 'const rows=JSON.parse(process.argv[1]);const id=process.argv[2];const x=rows.find(v=>v.assignmentId===id);if(!x||x.payableCents!==25000||x.paidOutCents!==0||x.reconciliationStatus!=="pending"||x.simulatedSplit?.netCapturedCents!==0||x.simulatedSplit?.professionalPayableCents!==25000||x.simulatedSplit?.platformRemainderCents!==-25000||x.cashBalanceCents!==0){process.exit(1)}' "$RECON_A" "$ASSIGNMENT_ID"

CAPTURE_BODY="{\"tenantId\":\"$TENANT_A\",\"assignmentId\":\"$ASSIGNMENT_ID\",\"eventType\":\"captured\",\"amountCents\":30000,\"providerReference\":\"capture-$STAMP\",\"idempotencyKey\":\"capture-$STAMP\"}"
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
node -e 'const rows=JSON.parse(process.argv[1]);const id=process.argv[2];const x=rows.find(v=>v.assignmentId===id);if(!x||x.capturedCents!==30000||x.refundedCents!==0||x.paidOutCents!==25000||x.reconciliationStatus!=="reconciled"||x.simulatedSplit?.netCapturedCents!==30000||x.simulatedSplit?.professionalPayableCents!==25000||x.simulatedSplit?.platformRemainderCents!==5000||x.cashBalanceCents!==5000){process.exit(1)}' "$RECON_AFTER" "$ASSIGNMENT_ID"
REFUND_BODY="{\"tenantId\":\"$TENANT_A\",\"assignmentId\":\"$ASSIGNMENT_ID\",\"eventType\":\"refunded\",\"amountCents\":40000,\"providerReference\":\"refund-$STAMP\",\"idempotencyKey\":\"refund-$STAMP\"}"
REFUND_ACK="$(signed_webhook "$REFUND_BODY")"
test "$(signed_webhook "$REFUND_BODY")" = "$REFUND_ACK"
NEGATIVE_EVENTS="$(request GET /v1/company/payment-events "$A_TOKEN" "$TENANT_A")"
node -e 'const assert=require("node:assert/strict"),rows=JSON.parse(process.argv[1]),id=process.argv[2];const own=rows.filter(v=>v.assignmentId===id),refunds=own.filter(v=>v.eventType==="refunded");assert.equal(own.length,3);assert.equal(refunds.length,1);assert.equal(refunds[0].amountCents,40000);' "$NEGATIVE_EVENTS" "$ASSIGNMENT_ID"
NEGATIVE_RECON="$(request GET /v1/company/payment-events/reconciliation "$A_TOKEN" "$TENANT_A")"
node -e 'const assert=require("node:assert/strict"),rows=JSON.parse(process.argv[1]),x=rows.find(v=>v.assignmentId===process.argv[2]);assert.ok(x);assert.equal(x.capturedCents,30000);assert.equal(x.refundedCents,40000);assert.equal(x.paidOutCents,25000);assert.equal(x.reconciliationStatus,"reconciled");assert.deepEqual(x.simulatedSplit,{netCapturedCents:-10000,professionalPayableCents:25000,platformRemainderCents:-35000});assert.equal(x.cashBalanceCents,-35000);' "$NEGATIVE_RECON" "$ASSIGNMENT_ID"
echo "PASS: theoretical split and negative simulated balance are exact, replay-safe and do not create a provider transfer"

# Deterministic concurrent signed callbacks against only the isolated CI HTTP/Postgres fixture.
node "$(dirname "$0")/payment-webhook-concurrency-e2e.cjs" "$TENANT_A" "$ASSIGNMENT_ID" "$STAMP"

EVENTS_B="$(request GET /v1/company/payment-events "$B_TOKEN" "$TENANT_B")"
node -e 'const rows=JSON.parse(process.argv[1]);const id=process.argv[2];if(rows.some(v=>v.assignmentId===id))process.exit(1)' "$EVENTS_B" "$ASSIGNMENT_ID"


# Aggregate totals must remain numeric/exact even when individually valid events
# exceed PostgreSQL int32 after summation. This fixture uses only local CI HTTP.
case "$BASE_URL" in http://127.0.0.1:*|http://localhost:*) ;; *) echo 'local finance fixture required' >&2; exit 1;; esac
for KIND in captured refunded payout_paid; do
  for PART in 1 2; do
    KEY="finance-wide-$KIND-$PART-$STAMP"
    WIDE_BODY="$(node -e 'process.stdout.write(JSON.stringify({tenantId:process.argv[1],assignmentId:process.argv[2],eventType:process.argv[3],amountCents:2147483647,recipientProfessionalId:process.argv[4],idempotencyKey:process.argv[5]}))' "$TENANT_A" "$ASSIGNMENT_ID" "$KIND" "$PRO_ID" "$KEY")"
    WIDE_ACK="$(signed_webhook "$WIDE_BODY")"
    node -e 'const assert=require("node:assert/strict"),x=JSON.parse(process.argv[1]);assert.equal(x.amountCents,2147483647);assert.equal(x.idempotencyKey,process.argv[2]);' "$WIDE_ACK" "$KEY"
    test "$(signed_webhook "$WIDE_BODY")" = "$WIDE_ACK"
  done
done
WIDE_RECON="$(request GET /v1/company/payment-events/reconciliation "$A_TOKEN" "$TENANT_A")"
node -e 'const assert=require("node:assert/strict"),rows=JSON.parse(process.argv[1]),x=rows.find(v=>v.assignmentId===process.argv[2]);assert.ok(x);assert.equal(x.capturedCents,4294997294);assert.equal(x.refundedCents,4295007294);assert.equal(x.paidOutCents,4294992294);for(const k of ["capturedCents","refundedCents","paidOutCents"])assert.ok(Number.isSafeInteger(x[k]));assert.equal(x.payableCents,25000);assert.equal(x.reconciliationStatus,"overpaid");assert.deepEqual(x.simulatedSplit,{netCapturedCents:-10000,professionalPayableCents:25000,platformRemainderCents:-35000});assert.equal(x.cashBalanceCents,-4295002294);' "$WIDE_RECON" "$ASSIGNMENT_ID"
WIDE_OTHER="$(request GET /v1/company/payment-events/reconciliation "$B_TOKEN" "$TENANT_B")"
node -e 'const assert=require("node:assert/strict"),rows=JSON.parse(process.argv[1]);assert.equal(rows.some(v=>v.assignmentId===process.argv[2]),false);' "$WIDE_OTHER" "$ASSIGNMENT_ID"
echo "PASS: reconciliation totals beyond int32 are exact JSON numbers, replay-safe and tenant-isolated"

for TOKEN in "$PRO_TOKEN" "$PRO2_TOKEN"; do request POST /v1/auth/signout "$TOKEN" '' '{}' >/dev/null; done
request POST /v1/auth/signout "$A_TOKEN" '' '{}' >/dev/null; request POST /v1/auth/signout "$B_TOKEN" '' '{}' >/dev/null
echo "PASS: signed finance events are idempotent, recipient-bound, duplicate-payout-safe, tenant-isolated and reconciled"
