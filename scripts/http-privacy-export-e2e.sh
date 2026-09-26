#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
MAINTENANCE_DB="${PRIVACY_MAINTENANCE_DATABASE_URL:-}"
STAMP="$(date +%s)-$RANDOM"
EMAIL="privacy-${STAMP}@example.test"
PASSWORD="PrivacyPass123!"
OPERATOR_ID="e2e-privacy-operator"

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
for(const forbidden of ["password_hash","passwordHash","accessToken","token_hash","tokenHash","operatorNote","evidenceRef","handledBy"]){if(raw.includes(forbidden))throw new Error(`forbidden secret/operator field: ${forbidden}`)}
for(const key of ["memberships","assignments","earnings","verifications","notifications","authoredMessages","ratingsReceived","ratingsAuthored","trustEvents","safetyReports","safetyRelated","appeals","privacyRequests"]){if(!Array.isArray(x[key]))throw new Error(`export collection missing: ${key}`)}
if(x.notice?.redaction!=="third-party free-text is omitted unless authored by the authenticated identity")throw new Error("redaction contract missing");
const current=x.privacyRequests.find(r=>r.id===x.requestId);
if(!current||current.requestType!=="access"||current.status!=="completed")throw new Error("completed access request missing from export audit");
' "$EXPORT" "$EMAIL"

MISSING_DETAILS_STATUS="$(curl -sS -o /tmp/privacy-request-missing-details.json -w '%{http_code}' -X POST "${BASE_URL%/}/v1/privacy/requests" -H "authorization: Bearer $TOKEN" -H 'content-type: application/json' --data '{"requestType":"correction"}')"
test "$MISSING_DETAILS_STATUS" = "400"
grep -q 'privacy_request_details_required' /tmp/privacy-request-missing-details.json

CORRECTION_DETAILS="Quero corrigir meu nome de exibição para o valor atualizado informado no atendimento."
CORRECTION="$(request POST /v1/privacy/requests "$TOKEN" "{\"requestType\":\"correction\",\"details\":\"$CORRECTION_DETAILS\"}")"
CORRECTION_REQUEST_ID="$(printf '%s' "$CORRECTION" | json_field requestId)"
PORTABILITY="$(request POST /v1/privacy/requests "$TOKEN" '{"requestType":"portability"}')"
PORTABILITY_REQUEST_ID="$(printf '%s' "$PORTABILITY" | json_field requestId)"

# Maintenance lifecycle must fail closed without an explicit privileged connection.
if env -u PRIVACY_MAINTENANCE_DATABASE_URL node apps/api/dist/privacy-requests-ops.js list >/tmp/privacy-ops-no-maintenance.log 2>&1; then
  echo "FAIL: privacy ops accepted missing maintenance database" >&2
  exit 1
fi
grep -q 'PRIVACY_MAINTENANCE_DATABASE_URL_required' /tmp/privacy-ops-no-maintenance.log

if [[ -z "$MAINTENANCE_DB" ]]; then
  echo "FAIL: test harness requires PRIVACY_MAINTENANCE_DATABASE_URL for lifecycle proof" >&2
  exit 1
fi

EVIDENCE_REF="test:privacy-correction-$STAMP"
# Mutations also require a structured operator identity.
if PRIVACY_MAINTENANCE_DATABASE_URL="$MAINTENANCE_DB" env -u PRIVACY_OPERATOR_ID node apps/api/dist/privacy-requests-ops.js start "$CORRECTION_REQUEST_ID" "$EVIDENCE_REF" >/tmp/privacy-ops-no-operator.log 2>&1; then
  echo "FAIL: privacy ops accepted mutation without operator identity" >&2
  exit 1
fi
grep -q 'PRIVACY_OPERATOR_ID_required' /tmp/privacy-ops-no-operator.log

PRIVACY_MAINTENANCE_DATABASE_URL="$MAINTENANCE_DB" PRIVACY_OPERATOR_ID="$OPERATOR_ID" node apps/api/dist/privacy-requests-ops.js start "$CORRECTION_REQUEST_ID" "$EVIDENCE_REF" >/tmp/privacy-ops-start.json
PRIVACY_MAINTENANCE_DATABASE_URL="$MAINTENANCE_DB" PRIVACY_OPERATOR_ID="$OPERATOR_ID" node apps/api/dist/privacy-requests-ops.js complete "$CORRECTION_REQUEST_ID" "correction_processed" "$EVIDENCE_REF" "Processed by E2E maintenance operator" >/tmp/privacy-ops-complete.json
node -e '
const fs=require("fs"); const x=JSON.parse(fs.readFileSync("/tmp/privacy-ops-complete.json","utf8"));
if(x.status!=="completed"||x.resolutionCode!=="correction_processed"||x.evidenceRef!==process.argv[1]||x.handledBy!==process.argv[2])throw new Error("operator evidence/accountability lifecycle missing");
' "$EVIDENCE_REF" "$OPERATOR_ID"

REQUESTS="$(request GET /v1/privacy/requests "$TOKEN")"
node -e '
const rows=JSON.parse(process.argv[1]);
const accessId=process.argv[2], correctionId=process.argv[3], portabilityId=process.argv[4], expectedDetails=process.argv[5];
if(!Array.isArray(rows))throw new Error("privacy requests list missing");
const access=rows.find(x=>x.id===accessId), correction=rows.find(x=>x.id===correctionId), portability=rows.find(x=>x.id===portabilityId);
if(!access||access.requestType!=="access"||access.status!=="completed")throw new Error("access request audit missing");
if(!correction||correction.requestType!=="correction"||correction.status!=="completed")throw new Error("correction lifecycle missing");
if(correction.requestDetails!==expectedDetails)throw new Error("correction details missing");
if(correction.resolutionCode!=="correction_processed")throw new Error("correction resolution missing");
if("evidenceRef" in correction||"operatorNote" in correction||"handledBy" in correction)throw new Error("operator-only evidence leaked to user response");
if(!portability||portability.requestType!=="portability"||portability.status!=="submitted")throw new Error("portability request audit missing");
' "$REQUESTS" "$ACCESS_REQUEST_ID" "$CORRECTION_REQUEST_ID" "$PORTABILITY_REQUEST_ID" "$CORRECTION_DETAILS"

STATUS="$(curl -sS -o /tmp/privacy-export-unauth.json -w '%{http_code}' "${BASE_URL%/}/v1/privacy/export")"
test "$STATUS" = "401"
BAD_STATUS="$(curl -sS -o /tmp/privacy-request-invalid.json -w '%{http_code}' -X POST "${BASE_URL%/}/v1/privacy/requests" -H "authorization: Bearer $TOKEN" -H 'content-type: application/json' --data '{"requestType":"unknown"}')"
test "$BAD_STATUS" = "400"

request POST /v1/auth/signout "$TOKEN" '{}' >/dev/null

echo "PASS: privacy export is scoped/redacted and DSAR requests are actionable with accountable internal-only operator evidence"
