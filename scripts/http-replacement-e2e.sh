#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
if [[ ! "$BASE_URL" =~ ^http://(127\.0\.0\.1|localhost):[0-9]+/?$ ]]; then
  echo "HTTP replacement/cancellation fixtures require a local API on an explicit port" >&2
  exit 1
fi
CANCEL_INPUT_DIR="$(mktemp -d)"
trap 'rm -rf "$CANCEL_INPUT_DIR"' EXIT
STAMP="$(date +%s)-$RANDOM"
PASSWORD="ReplacementPass123!"
PRO1_EMAIL="replacement-pro1-${STAMP}@example.test"
PRO2_EMAIL="replacement-pro2-${STAMP}@example.test"
COMPANY_EMAIL="replacement-company-${STAMP}@example.test"
TARGET_START="$(node -e 'process.stdout.write(new Date(Date.now()+48*60*60*1000).toISOString())')"
TARGET_END="$(node -e 'process.stdout.write(new Date(Date.now()+56*60*60*1000).toISOString())')"
SEED_START="$(node -e 'process.stdout.write(new Date(Date.now()+72*60*60*1000).toISOString())')"
SEED_END="$(node -e 'process.stdout.write(new Date(Date.now()+80*60*60*1000).toISOString())')"
AVAIL_START="$(node -e 'process.stdout.write(new Date(Date.now()+47*60*60*1000).toISOString())')"
AVAIL_END="$(node -e 'process.stdout.write(new Date(Date.now()+81*60*60*1000).toISOString())')"

json_field(){ node -e 'const fs=require("fs");let x=JSON.parse(fs.readFileSync(0,"utf8"));for(const p of process.argv[1].split(".")){if(/^\d+$/.test(p))x=x[Number(p)];else x=x?.[p]}if(x===undefined||x===null)process.exit(2);process.stdout.write(String(x));' "$1"; }
request(){ local method="$1" url="$2" token="${3:-}" tenant="${4:-}" body="${5:-}"; local args=(-sS --fail-with-body -X "$method" "${BASE_URL%/}$url"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$tenant" ]] && args+=(-H "x-tenant-id: $tenant"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }

status_only(){ local method="$1" url="$2" token="$3" tenant="$4" body="${5:-}"; local args=(-sS -o "$CANCEL_INPUT_DIR/negative.json" -w '%{http_code}' -X "$method" "${BASE_URL%/}$url" -H "authorization: Bearer $token" -H "x-tenant-id: $tenant"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }

request POST /v1/auth/signup '' '' "{\"email\":\"$PRO1_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"professional\"}" >/dev/null
request POST /v1/auth/signup '' '' "{\"email\":\"$PRO2_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"professional\"}" >/dev/null
COMPANY_SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$COMPANY_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"Replacement E2E Company\"}")"
TENANT_ID="$(printf '%s' "$COMPANY_SIGNUP" | json_field tenantId)"

PRO1_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$PRO1_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
PRO2_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$PRO2_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
COMPANY_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$COMPANY_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"

PRO1_PROFILE="$(request PUT /v1/professional-profile "$PRO1_TOKEN" '' '{"displayName":"Original Bartender","homeCity":"São Paulo","primaryRole":"Bartender"}')"
PRO1_ID="$(printf '%s' "$PRO1_PROFILE" | json_field id)"
PRO2_PROFILE="$(request PUT /v1/professional-profile "$PRO2_TOKEN" '' '{"displayName":"Replacement Bartender","homeCity":"São Paulo","primaryRole":"Bartender"}')"
PRO2_ID="$(printf '%s' "$PRO2_PROFILE" | json_field id)"

request POST /v1/availability/mine "$PRO1_TOKEN" '' "{\"startsAt\":\"$AVAIL_START\",\"endsAt\":\"$AVAIL_END\"}" >/dev/null
request POST /v1/availability/mine "$PRO2_TOKEN" '' "{\"startsAt\":\"$AVAIL_START\",\"endsAt\":\"$AVAIL_END\"}" >/dev/null

TARGET_JOB="$(request POST /v1/company/jobs "$COMPANY_TOKEN" "$TENANT_ID" "{\"title\":\"Target Bartender\",\"requiredRole\":\"Bartender\",\"workCity\":\"São Paulo\",\"location\":\"Centro\",\"startsAt\":\"$TARGET_START\",\"endsAt\":\"$TARGET_END\",\"payCents\":30000}")"
TARGET_JOB_ID="$(printf '%s' "$TARGET_JOB" | json_field id)"
SEED_JOB="$(request POST /v1/company/jobs "$COMPANY_TOKEN" "$TENANT_ID" "{\"title\":\"Seed Bartender\",\"requiredRole\":\"Bartender\",\"workCity\":\"São Paulo\",\"location\":\"Centro\",\"startsAt\":\"$SEED_START\",\"endsAt\":\"$SEED_END\",\"payCents\":20000}")"
SEED_JOB_ID="$(printf '%s' "$SEED_JOB" | json_field id)"

request POST "/v1/jobs/$TARGET_JOB_ID/interest" "$PRO1_TOKEN" >/dev/null
request POST "/v1/jobs/$SEED_JOB_ID/interest" "$PRO2_TOKEN" >/dev/null

ORIGINAL_CONFIRM="$(request POST "/v1/company/jobs/$TARGET_JOB_ID/confirm" "$COMPANY_TOKEN" "$TENANT_ID" "{\"professionalId\":\"$PRO1_ID\"}")"
ORIGINAL_ASSIGNMENT_ID="$(printf '%s' "$ORIGINAL_CONFIRM" | json_field id)"
SEED_CONFIRM="$(request POST "/v1/company/jobs/$SEED_JOB_ID/confirm" "$COMPANY_TOKEN" "$TENANT_ID" "{\"professionalId\":\"$PRO2_ID\"}")"
SEED_ASSIGNMENT_ID="$(printf '%s' "$SEED_CONFIRM" | json_field id)"
[[ -n "$SEED_ASSIGNMENT_ID" ]]

POOL="$(request POST /v1/company/talent-pools "$COMPANY_TOKEN" "$TENANT_ID" "{\"professionalId\":\"$PRO2_ID\",\"pool\":\"preferred\"}")"
test "$(printf '%s' "$POOL" | json_field professionalId)" = "$PRO2_ID"

# Invalid cancellation must not mutate either professional's real assignments.
CANCEL_PRO1_BEFORE="$(request GET /v1/assignments/mine "$PRO1_TOKEN")"
CANCEL_PRO2_BEFORE="$(request GET /v1/assignments/mine "$PRO2_TOKEN")"
CANCEL_REPLACEMENTS_BEFORE="$(request GET /v1/company/replacements "$COMPANY_TOKEN" "$TENANT_ID")"
node - "$CANCEL_INPUT_DIR" <<'NODE'
const fs=require('fs'),dir=process.argv[2];
const bodies=[null,[],true,false,42,'text',{},...[null,true,false,42,{},[],['Fixture'],'','   ','x'.repeat(1001)].map(reason=>({reason}))];
bodies.forEach((b,i)=>fs.writeFileSync(dir+'/cancel-'+i+'.json',JSON.stringify(b)));
NODE
for payload in "$CANCEL_INPUT_DIR"/cancel-*.json; do
 test "$(status_only POST "/v1/assignments/$ORIGINAL_ASSIGNMENT_ID/cancel" "$COMPANY_TOKEN" "$TENANT_ID" "$(cat "$payload")")" = "400"
done
test "$(status_only POST /v1/assignments/not-a-uuid/cancel "$COMPANY_TOKEN" "$TENANT_ID" '{"reason":"Fixture"}')" = "400"
test "$(status_only POST "/v1/assignments/$ORIGINAL_ASSIGNMENT_ID/cancel" '' "$TENANT_ID" 'null')" = "401"
# Both professionals have tenant membership; an unrelated professional still cannot cancel.
test "$(status_only POST "/v1/assignments/$ORIGINAL_ASSIGNMENT_ID/cancel" "$PRO2_TOKEN" "$TENANT_ID" '{"reason":"Fixture"}')" = "400"
test "$(request GET /v1/assignments/mine "$PRO1_TOKEN")" = "$CANCEL_PRO1_BEFORE"
test "$(request GET /v1/assignments/mine "$PRO2_TOKEN")" = "$CANCEL_PRO2_BEFORE"
test "$(request GET /v1/company/replacements "$COMPANY_TOKEN" "$TENANT_ID")" = "$CANCEL_REPLACEMENTS_BEFORE"
echo "PASS: cancellation malformed JSON reason UUID and unauthorized actor leave real assignments unchanged"

# Replacement input validation must precede creation without changing either assignment.
CREATE_REPLACEMENTS_BEFORE="$(request GET /v1/company/replacements "$COMPANY_TOKEN" "$TENANT_ID")"
CREATE_PRO1_BEFORE="$(request GET /v1/assignments/mine "$PRO1_TOKEN")"
CREATE_PRO2_BEFORE="$(request GET /v1/assignments/mine "$PRO2_TOKEN")"
node - "$CANCEL_INPUT_DIR" <<'NODE'
const fs=require('fs'),dir=process.argv[2];
const bodies=[null,[],true,false,42,'text',...[42,true,false,{},[],['Fixture']].map(reason=>({reason}))];
bodies.forEach((body,i)=>fs.writeFileSync(dir+'/replacement-create-'+i+'.json',JSON.stringify(body)));
NODE
for payload in "$CANCEL_INPUT_DIR"/replacement-create-*.json; do
 test "$(status_only POST "/v1/company/replacements/$ORIGINAL_ASSIGNMENT_ID" "$COMPANY_TOKEN" "$TENANT_ID" "$(cat "$payload")")" = "400"
done
test "$(status_only POST /v1/company/replacements/not-a-uuid "$COMPANY_TOKEN" "$TENANT_ID" '{}')" = "400"
test "$(status_only POST "/v1/company/replacements/$ORIGINAL_ASSIGNMENT_ID" '' "$TENANT_ID" '{}')" = "401"
test "$(status_only POST "/v1/company/replacements/$ORIGINAL_ASSIGNMENT_ID" "$PRO1_TOKEN" "$TENANT_ID" '{}')" = "403"
test "$(request GET /v1/company/replacements "$COMPANY_TOKEN" "$TENANT_ID")" = "$CREATE_REPLACEMENTS_BEFORE"
test "$(request GET /v1/assignments/mine "$PRO1_TOKEN")" = "$CREATE_PRO1_BEFORE"
test "$(request GET /v1/assignments/mine "$PRO2_TOKEN")" = "$CREATE_PRO2_BEFORE"
echo "PASS: replacement malformed creation rejects before changing real requests or assignments"

REPLACEMENT="$(request POST "/v1/company/replacements/$ORIGINAL_ASSIGNMENT_ID" "$COMPANY_TOKEN" "$TENANT_ID" '{"reason":"Troca operacional"}')"
REPLACEMENT_ID="$(printf '%s' "$REPLACEMENT" | json_field id)"

# Existing upsert semantics retain optional notes and have no invented length limit.
node - "$CANCEL_INPUT_DIR" <<'NODE'
const fs=require('fs'),dir=process.argv[2];
const bodies=[{}, {reason:null},{reason:''},{reason:'   '},{reason:'  Fixture '},{reason:'  '+'x'.repeat(5000)+'  '}];
bodies.forEach((b,i)=>fs.writeFileSync(dir+'/replacement-valid-'+i+'.json',JSON.stringify(b)));
NODE
for payload in "$CANCEL_INPUT_DIR"/replacement-valid-*.json; do
 VALID_UPSERT="$(request POST "/v1/company/replacements/$ORIGINAL_ASSIGNMENT_ID" "$COMPANY_TOKEN" "$TENANT_ID" "$(cat "$payload")")"
 node - "$VALID_UPSERT" "$payload" "$REPLACEMENT_ID" "$ORIGINAL_ASSIGNMENT_ID" <<'NODE'
const fs=require('fs'),row=JSON.parse(process.argv[2]),input=JSON.parse(fs.readFileSync(process.argv[3],'utf8'));
const expected=typeof input.reason==='string'?input.reason.trim()||null:null;
if(row.id!==process.argv[4]||row.assignmentId!==process.argv[5]||row.status!=='open'||row.reason!==expected)throw Error('replacement optional reason upsert contract lost');
NODE
done
SELECT_REPLACEMENTS_BEFORE="$(request GET /v1/company/replacements "$COMPANY_TOKEN" "$TENANT_ID")"
SELECT_PRO1_BEFORE="$(request GET /v1/assignments/mine "$PRO1_TOKEN")"
SELECT_PRO2_BEFORE="$(request GET /v1/assignments/mine "$PRO2_TOKEN")"
node - "$PRO2_ID" "$CANCEL_INPUT_DIR" <<'NODE'
const fs=require('fs'),id=process.argv[2],dir=process.argv[3];
const bodies=[null,[],true,false,42,'text',{},...[null,true,42,{},[],['Fixture'],'','bad',id+'x'].map(professionalId=>({professionalId}))];
bodies.forEach((b,i)=>fs.writeFileSync(dir+'/replacement-select-'+i+'.json',JSON.stringify(b)));
NODE
for payload in "$CANCEL_INPUT_DIR"/replacement-select-*.json; do
 test "$(status_only POST "/v1/company/replacements/$REPLACEMENT_ID/select" "$COMPANY_TOKEN" "$TENANT_ID" "$(cat "$payload")")" = "400"
done
test "$(status_only POST /v1/company/replacements/not-a-uuid/select "$COMPANY_TOKEN" "$TENANT_ID" "{\"professionalId\":\"$PRO2_ID\"}")" = "400"
test "$(status_only GET /v1/company/replacements/not-a-uuid/candidates "$COMPANY_TOKEN" "$TENANT_ID")" = "400"
test "$(status_only POST /v1/company/replacements/not-a-uuid/auto-match "$COMPANY_TOKEN" "$TENANT_ID")" = "400"
test "$(status_only POST "/v1/company/replacements/$REPLACEMENT_ID/select" '' "$TENANT_ID" 'null')" = "401"
test "$(status_only POST "/v1/company/replacements/$REPLACEMENT_ID/select" "$PRO2_TOKEN" "$TENANT_ID" 'null')" = "403"
test "$(request GET /v1/company/replacements "$COMPANY_TOKEN" "$TENANT_ID")" = "$SELECT_REPLACEMENTS_BEFORE"
test "$(request GET /v1/assignments/mine "$PRO1_TOKEN")" = "$SELECT_PRO1_BEFORE"
test "$(request GET /v1/assignments/mine "$PRO2_TOKEN")" = "$SELECT_PRO2_BEFORE"
echo "PASS: replacement optional reasons and malformed selection UUIDs preserve real requests and assignments"


# The original worker can be an active pool member; the concrete selection must still exclude them.
SELF_POOL="$(request POST /v1/company/talent-pools "$COMPANY_TOKEN" "$TENANT_ID" "{\"professionalId\":\"$PRO1_ID\",\"pool\":\"preferred\"}")"
test "$(printf '%s' "$SELF_POOL" | json_field professionalId)" = "$PRO1_ID"
SELF_PRO1_NOTICES="$(request GET /v1/notifications/mine "$PRO1_TOKEN")"
SELF_PRO2_NOTICES="$(request GET /v1/notifications/mine "$PRO2_TOKEN")"
SELF_PRO1_EARNINGS="$(request GET /v1/earnings/mine "$PRO1_TOKEN")"
SELF_PRO2_EARNINGS="$(request GET /v1/earnings/mine "$PRO2_TOKEN")"
SELF_UPPER="$(node -e 'process.stdout.write(process.argv[1].toUpperCase())' "$PRO1_ID")"
for self_id in "$PRO1_ID" "$SELF_UPPER"; do
 test "$(status_only POST "/v1/company/replacements/$REPLACEMENT_ID/select" "$COMPANY_TOKEN" "$TENANT_ID" "{\"professionalId\":\"$self_id\"}")" = "400"
 test "$(json_field message < "$CANCEL_INPUT_DIR/negative.json")" = "replacement_candidate_required"
done
test "$(request GET /v1/company/replacements "$COMPANY_TOKEN" "$TENANT_ID")" = "$SELECT_REPLACEMENTS_BEFORE"
test "$(request GET /v1/assignments/mine "$PRO1_TOKEN")" = "$SELECT_PRO1_BEFORE"
test "$(request GET /v1/assignments/mine "$PRO2_TOKEN")" = "$SELECT_PRO2_BEFORE"
test "$(request GET /v1/notifications/mine "$PRO1_TOKEN")" = "$SELF_PRO1_NOTICES"
test "$(request GET /v1/notifications/mine "$PRO2_TOKEN")" = "$SELF_PRO2_NOTICES"
test "$(request GET /v1/earnings/mine "$PRO1_TOKEN")" = "$SELF_PRO1_EARNINGS"
test "$(request GET /v1/earnings/mine "$PRO2_TOKEN")" = "$SELF_PRO2_EARNINGS"
echo "PASS: replacement rejects original worker and equivalent UUID case without cancelling assignments matching requests notifications or earnings"

AUTO="$(request POST "/v1/company/replacements/$REPLACEMENT_ID/auto-match" "$COMPANY_TOKEN" "$TENANT_ID")"
test "$(printf '%s' "$AUTO" | json_field recommendedProfessionalId)" = "$PRO2_ID"
test "$(printf '%s' "$AUTO" | json_field recommendedProfessionalName)" = "Replacement Bartender"

SELECTED="$(request POST "/v1/company/replacements/$REPLACEMENT_ID/select" "$COMPANY_TOKEN" "$TENANT_ID" "{\"professionalId\":\"$PRO2_ID\"}")"
test "$(printf '%s' "$SELECTED" | json_field status)" = "matched"
test "$(printf '%s' "$SELECTED" | json_field replacedAssignmentId)" = "$ORIGINAL_ASSIGNMENT_ID"
NEW_ASSIGNMENT_ID="$(printf '%s' "$SELECTED" | json_field assignmentId)"

PRO1_ASSIGNMENTS="$(request GET /v1/assignments/mine "$PRO1_TOKEN")"
node -e 'const rows=JSON.parse(process.argv[1]);const id=process.argv[2];const item=rows.find(x=>x.id===id);if(!item||item.status!=="cancelled"){console.error("original assignment was not cancelled",JSON.stringify(item));process.exit(1)}' "$PRO1_ASSIGNMENTS" "$ORIGINAL_ASSIGNMENT_ID"

PRO2_ASSIGNMENTS="$(request GET /v1/assignments/mine "$PRO2_TOKEN")"
node -e 'const rows=JSON.parse(process.argv[1]);const id=process.argv[2];const tenant=process.argv[3];const item=rows.find(x=>x.id===id);if(!item||item.status!=="confirmed"||item.tenantId!==tenant){console.error("replacement assignment missing",JSON.stringify(item));process.exit(1)}' "$PRO2_ASSIGNMENTS" "$NEW_ASSIGNMENT_ID" "$TENANT_ID"

REPLACEMENTS="$(request GET /v1/company/replacements "$COMPANY_TOKEN" "$TENANT_ID")"
node -e 'const rows=JSON.parse(process.argv[1]);const id=process.argv[2];const pro=process.argv[3];const item=rows.find(x=>x.id===id);if(!item||item.status!=="matched"||item.replacementProfessionalId!==pro){console.error("replacement request not resolved",JSON.stringify(item));process.exit(1)}' "$REPLACEMENTS" "$REPLACEMENT_ID" "$PRO2_ID"

# These CI-only assignments were already verified confirmed by the original replacement flow.
PRO_CANCEL_BODY="$(node -e 'process.stdout.write(JSON.stringify({reason:"  "+"x".repeat(1000)+"  ",initiator_identity_id:"forged",tenant_id:"forged"}))')"
PRO_CANCEL="$(request POST "/v1/assignments/$SEED_ASSIGNMENT_ID/cancel" "$PRO2_TOKEN" "$TENANT_ID" "$PRO_CANCEL_BODY")"
COMPANY_CANCEL="$(request POST "/v1/assignments/$NEW_ASSIGNMENT_ID/cancel" "$COMPANY_TOKEN" "$TENANT_ID" '{"reason":"  Fixture company cancellation  ","initiator_identity_id":"forged"}')"
node - "$PRO_CANCEL" "$COMPANY_CANCEL" "$SEED_ASSIGNMENT_ID" "$NEW_ASSIGNMENT_ID" <<'NODE'
const rows=[JSON.parse(process.argv[2]),JSON.parse(process.argv[3])],ids=[process.argv[4],process.argv[5]];
for(const [i,row] of rows.entries()){
 if(row.id!==ids[i]||row.status!=='cancelled'||row.initiatorKind!==['professional','company'][i]||row.compensationPolicy!=='none_until_fin_risk_policy_approved')throw Error('real cancellation ACK or policy changed');
}
NODE
test "$(status_only POST "/v1/assignments/$SEED_ASSIGNMENT_ID/cancel" "$PRO2_TOKEN" "$TENANT_ID" '{"reason":"Retry must keep existing policy"}')" = "400"
AFTER_CANCEL="$(request GET /v1/assignments/mine "$PRO2_TOKEN")"
node - "$AFTER_CANCEL" "$SEED_ASSIGNMENT_ID" "$NEW_ASSIGNMENT_ID" "$TENANT_ID" <<'NODE'
const rows=JSON.parse(process.argv[2]);for(const id of [process.argv[3],process.argv[4]]){const row=rows.find(r=>r.id===id);if(!row||row.status!=='cancelled'||row.tenantId!==process.argv[5])throw Error('actual tenant assignment was not cancelled');}
NODE
test "$(request GET /v1/company/replacements "$COMPANY_TOKEN" "$TENANT_ID")" = "$REPLACEMENTS"
echo "PASS: professional and company cancellation retain real ACKs tenant scope and no financial compensation"

# Separate fresh-job fixture preserves every assertion of the existing journey.
REPLACE_COMPANY_TOKEN="$COMPANY_TOKEN" REPLACE_ORIGINAL_TOKEN="$PRO1_TOKEN" REPLACE_ORIGINAL_ID="$PRO1_ID" REPLACE_CANDIDATE_ID="$PRO2_ID" REPLACE_TENANT="$TENANT_ID" node scripts/replacement-selection-concurrency-e2e.cjs

request POST /v1/auth/signout "$PRO1_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$PRO2_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$COMPANY_TOKEN" '' '{}' >/dev/null

echo "PASS: replacement auto-match selects preferred worker, cancels original and confirms replacement assignment"
