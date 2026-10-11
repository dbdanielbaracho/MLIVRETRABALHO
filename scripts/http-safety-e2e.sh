#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
[[ "$BASE_URL" =~ ^http://(127\.0\.0\.1|localhost):[0-9]+/?$ ]] || { echo "local_http_required" >&2; exit 2; }
SAFETY_INPUT_DIR="$(mktemp -d)"
trap 'rm -rf "$SAFETY_INPUT_DIR"' EXIT
STAMP="$(date +%s)-$RANDOM"
PRO_EMAIL="safety-pro-${STAMP}@example.test"
COMPANY_A_EMAIL="safety-company-a-${STAMP}@example.test"
COMPANY_B_EMAIL="safety-company-b-${STAMP}@example.test"
PASSWORD="SafetyPass123!"
START_AT="$(node -e 'process.stdout.write(new Date(Date.now()+24*60*60*1000).toISOString())')"
END_AT="$(node -e 'process.stdout.write(new Date(Date.now()+32*60*60*1000).toISOString())')"

json_field(){ node -e 'const fs=require("fs");let x=JSON.parse(fs.readFileSync(0,"utf8"));for(const p of process.argv[1].split(".")){if(/^\d+$/.test(p))x=x[Number(p)];else x=x?.[p]}if(x===undefined||x===null)process.exit(2);process.stdout.write(String(x));' "$1"; }
contains(){ [[ "$1" == *"$2"* ]] || { echo "missing expected value: $2" >&2; return 1; }; }
not_contains(){ [[ "$1" != *"$2"* ]] || { echo "unexpected value present: $2" >&2; return 1; }; }
request(){ local method="$1" url="$2" token="${3:-}" tenant="${4:-}" body="${5:-}"; local args=(-sS --fail-with-body -X "$method" "${BASE_URL%/}$url"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$tenant" ]] && args+=(-H "x-tenant-id: $tenant"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }
status_only(){ local method="$1" url="$2" token="$3" tenant="$4" body="${5:-}"; local args=(-sS -o /tmp/safety-negative.json -w '%{http_code}' -X "$method" "${BASE_URL%/}$url" -H "authorization: Bearer $token" -H "x-tenant-id: $tenant"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }

request POST /v1/auth/signup '' '' "{\"email\":\"$PRO_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"professional\"}" >/dev/null
COMPANY_A_SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$COMPANY_A_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"Safety Company A\"}")"
TENANT_A="$(printf '%s' "$COMPANY_A_SIGNUP" | json_field tenantId)"
COMPANY_B_SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$COMPANY_B_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"Safety Company B\"}")"
TENANT_B="$(printf '%s' "$COMPANY_B_SIGNUP" | json_field tenantId)"

PRO_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$PRO_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
COMPANY_A_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$COMPANY_A_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
COMPANY_B_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$COMPANY_B_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"

PROFILE="$(request PUT /v1/professional-profile "$PRO_TOKEN" '' '{"displayName":"Safety Professional","homeCity":"São Paulo","primaryRole":"Bartender"}')"
PROFESSIONAL_ID="$(printf '%s' "$PROFILE" | json_field id)"

JOB="$(request POST /v1/company/jobs "$COMPANY_A_TOKEN" "$TENANT_A" "{\"title\":\"Safety Bartender\",\"requiredRole\":\"Bartender\",\"workCity\":\"São Paulo\",\"startsAt\":\"$START_AT\",\"endsAt\":\"$END_AT\",\"payCents\":15000}")"
JOB_ID="$(printf '%s' "$JOB" | json_field id)"
request POST "/v1/jobs/$JOB_ID/interest" "$PRO_TOKEN" >/dev/null
ASSIGNMENT="$(request POST "/v1/company/jobs/$JOB_ID/confirm" "$COMPANY_A_TOKEN" "$TENANT_A" "{\"professionalId\":\"$PROFESSIONAL_ID\"}")"
ASSIGNMENT_ID="$(printf '%s' "$ASSIGNMENT" | json_field id)"


# Invalid report payloads reject before creating a safety case, including malformed assignment UUIDs.
REPORT_MINE_BEFORE="$(request GET /v1/safety-cases/mine "$PRO_TOKEN")"
REPORT_COMPANY_BEFORE="$(request GET /v1/company/safety-cases "$COMPANY_A_TOKEN" "$TENANT_A")"
node - "$SAFETY_INPUT_DIR" "$ASSIGNMENT_ID" <<'NODE'
const fs=require('fs'),dir=process.argv[2],id=process.argv[3],base={category:'other',description:'fixture'};
const rows=[
 ...[null,false,true,42,'text',[],{}].map(body=>({body,error:'safety_case_invalid'})),
 ...[null,false,true,42,[],{},['text'],'','  ','x'.repeat(4001)].map(description=>({body:{...base,description},error:'safety_case_invalid'})),
 ...[null,false,42,[],{},['other'],'unknown'].map(category=>({body:{...base,category},error:'safety_case_invalid'})),
 ...['','invalid',false,42,[],{},[id]].map(assignmentId=>({body:{...base,assignmentId},error:'assignment_invalid'}))
];rows.forEach((x,i)=>fs.writeFileSync(dir+'/bad-report-'+i+'.json',JSON.stringify(x)));
NODE
for token in "$PRO_TOKEN" "$COMPANY_A_TOKEN"; do
 for payload in "$SAFETY_INPUT_DIR"/bad-report-*.json; do
  body="$(node -e 'process.stdout.write(JSON.stringify(JSON.parse(require("fs").readFileSync(process.argv[1])).body))' "$payload")"
  error="$(node -e 'process.stdout.write(JSON.parse(require("fs").readFileSync(process.argv[1])).error)' "$payload")"
  code="$(curl -sS -o "$SAFETY_INPUT_DIR/report-response.json" -w '%{http_code}' -X POST "$BASE_URL/v1/safety-cases" -H "authorization: Bearer $token" -H "x-tenant-id: $TENANT_A" -H 'content-type: application/json' --data "$body")"
  test "$code" = 400
  test "$(json_field message < "$SAFETY_INPUT_DIR/report-response.json")" = "$error"
 done
done
test "$(status_only POST /v1/safety-cases invalid-token "$TENANT_A" null)" = 401
test "$(status_only POST /v1/safety-cases "$PRO_TOKEN" '' null)" = 400
test "$(status_only POST /v1/safety-cases "$PRO_TOKEN" "$TENANT_B" null)" = 401
test "$(status_only POST /v1/safety-cases "$COMPANY_A_TOKEN" "$TENANT_B" null)" = 401
test "$(status_only POST /v1/safety-cases "$PRO_TOKEN" "$TENANT_A" '{"assignmentId":"00000000-0000-0000-0000-000000000000","category":"other","description":"fixture"}')" = 400
test "$(request GET /v1/safety-cases/mine "$PRO_TOKEN")" = "$REPORT_MINE_BEFORE"
test "$(request GET /v1/company/safety-cases "$COMPANY_A_TOKEN" "$TENANT_A")" = "$REPORT_COMPANY_BEFORE"
echo 'PASS: malformed safety reports and assignment UUIDs reject without creating real cases'

CASE="$(request POST /v1/safety-cases "$PRO_TOKEN" "$TENANT_A" "{\"assignmentId\":\"$ASSIGNMENT_ID\",\"category\":\"unsafe_work\",\"description\":\"Condição insegura no local do trabalho\"}")"
CASE_ID="$(printf '%s' "$CASE" | json_field id)"
test "$(printf '%s' "$CASE" | json_field status)" = "open"

MINE="$(request GET /v1/safety-cases/mine "$PRO_TOKEN")"
contains "$MINE" "$CASE_ID"
contains "$MINE" "$TENANT_A"
contains "$MINE" 'Condição insegura'

COMPANY_A_CASES="$(request GET /v1/company/safety-cases "$COMPANY_A_TOKEN" "$TENANT_A")"
contains "$COMPANY_A_CASES" "$CASE_ID"
COMPANY_B_CASES="$(request GET /v1/company/safety-cases "$COMPANY_B_TOKEN" "$TENANT_B")"
not_contains "$COMPANY_B_CASES" "$CASE_ID"

CROSS_STATUS="$(status_only POST "/v1/company/safety-cases/$CASE_ID/status" "$COMPANY_B_TOKEN" "$TENANT_B" '{"status":"reviewing"}')"
test "$CROSS_STATUS" = "404"

# Reject malformed reviews before changing the actual case or immutable event log.
SAFETY_BEFORE="$(request GET /v1/company/safety-cases "$COMPANY_A_TOKEN" "$TENANT_A")"
SAFETY_MINE_BEFORE="$(request GET /v1/safety-cases/mine "$PRO_TOKEN")"
SAFETY_EVENTS_BEFORE="$(request GET "/v1/company/safety-cases/$CASE_ID/events" "$COMPANY_A_TOKEN" "$TENANT_A")"
node >"$SAFETY_INPUT_DIR/inputs.jsonl" <<'NODE'
const rows=[null,[],true,42,"text",{}];
for(const status of [null,42,true,{},[],["reviewing"],"invalid"])rows.push({status});
for(const note of [42,true,false,{},[],["Fixture"],"x".repeat(2001)])rows.push({status:"reviewing",note});
for(const row of rows)console.log(JSON.stringify(row));
NODE
while IFS= read -r body; do
 test "$(status_only POST "/v1/company/safety-cases/$CASE_ID/status" "$COMPANY_A_TOKEN" "$TENANT_A" "$body")" = "400"
done <"$SAFETY_INPUT_DIR/inputs.jsonl"
test "$(status_only POST /v1/company/safety-cases/not-a-uuid/status "$COMPANY_A_TOKEN" "$TENANT_A" '{"status":"reviewing"}')" = "400"
test "$(status_only GET /v1/company/safety-cases/not-a-uuid/events "$COMPANY_A_TOKEN" "$TENANT_A")" = "400"
test "$(status_only POST /v1/company/safety-cases/not-a-uuid/status invalid-token "$TENANT_A" 'null')" = "401"
test "$(status_only GET /v1/company/safety-cases/not-a-uuid/events invalid-token "$TENANT_A")" = "401"
test "$(status_only POST /v1/company/safety-cases/not-a-uuid/status "$PRO_TOKEN" "$TENANT_A" 'null')" = "403"
test "$(status_only GET /v1/company/safety-cases/not-a-uuid/events "$PRO_TOKEN" "$TENANT_A")" = "403"
test "$(status_only POST "/v1/company/safety-cases/$CASE_ID/status" "$COMPANY_A_TOKEN" "$TENANT_B" 'null')" = "401"
node - "$SAFETY_BEFORE" "$(request GET /v1/company/safety-cases "$COMPANY_A_TOKEN" "$TENANT_A")" "$SAFETY_MINE_BEFORE" "$(request GET /v1/safety-cases/mine "$PRO_TOKEN")" "$SAFETY_EVENTS_BEFORE" "$(request GET "/v1/company/safety-cases/$CASE_ID/events" "$COMPANY_A_TOKEN" "$TENANT_A")" <<'NODE'
const x=process.argv.slice(2).map(JSON.parse);
for(let i=0;i<x.length;i+=2)if(JSON.stringify(x[i])!==JSON.stringify(x[i+1]))throw Error("safety_changed_on_invalid_review");
NODE
echo 'PASS: safety admin malformed JSON and UUID reject before changing real cases or events'

UPDATED="$(request POST "/v1/company/safety-cases/$CASE_ID/status" "$COMPANY_A_TOKEN" "$TENANT_A" '{"status":"reviewing","note":"Revisão humana iniciada"}')"
test "$(printf '%s' "$UPDATED" | json_field status)" = "reviewing"
test "$(printf '%s' "$UPDATED" | json_field changed)" = "true"

EVENTS="$(request GET "/v1/company/safety-cases/$CASE_ID/events" "$COMPANY_A_TOKEN" "$TENANT_A")"
node - "$EVENTS" <<'NODE'
const events=JSON.parse(process.argv[2]);
if(!Array.isArray(events)||events.length!==1){console.error('expected exactly one safety event',events);process.exit(1)}
const event=events[0];
if(event.fromStatus!=='open'||event.toStatus!=='reviewing'||event.note!=='Revisão humana iniciada'||!event.actorIdentityId){
  console.error('invalid safety audit event',event);process.exit(1)
}
NODE

IDEMPOTENT="$(request POST "/v1/company/safety-cases/$CASE_ID/status" "$COMPANY_A_TOKEN" "$TENANT_A" '{"status":"reviewing","note":"Não deve duplicar"}')"
test "$(printf '%s' "$IDEMPOTENT" | json_field changed)" = "false"
EVENTS_AFTER="$(request GET "/v1/company/safety-cases/$CASE_ID/events" "$COMPANY_A_TOKEN" "$TENANT_A")"
node - "$EVENTS_AFTER" <<'NODE'
const events=JSON.parse(process.argv[2]);if(events.length!==1){console.error('idempotent status duplicated audit history',events);process.exit(1)}
NODE

CROSS_EVENTS="$(status_only GET "/v1/company/safety-cases/$CASE_ID/events" "$COMPANY_B_TOKEN" "$TENANT_B")"
test "$CROSS_EVENTS" = "404"
MINE_AFTER="$(request GET /v1/safety-cases/mine "$PRO_TOKEN")"
contains "$MINE_AFTER" 'reviewing'


# Optional notes and all original statuses stay valid; each actual transition has
# one immutable event, and repeating that state does not duplicate history.
for review_status in resolved dismissed open reviewing; do
 REVIEW_BODY="$(node -e 'const status=process.argv[1];const row={status,tenantId:"untrusted",actorIdentityId:"untrusted"};if(status==="dismissed")row.note=null;if(status==="open")row.note="   ";if(status==="reviewing")row.note=" Fixture ";process.stdout.write(JSON.stringify(row));' -- "$review_status")"
 request POST "/v1/company/safety-cases/$CASE_ID/status" "$COMPANY_A_TOKEN" "$TENANT_A" "$REVIEW_BODY" | node -e 'const x=JSON.parse(require("fs").readFileSync(0,"utf8"));if(x.id!==process.argv[1]||x.status!==process.argv[2]||x.changed!==true)throw Error("safety_review_ack_invalid");if(["resolved","dismissed"].includes(x.status)?!Number.isFinite(Date.parse(x.resolvedAt)):x.resolvedAt!==null)throw Error("safety_review_date_invalid");' -- "$CASE_ID" "$review_status"
 REPEAT="$(request POST "/v1/company/safety-cases/$CASE_ID/status" "$COMPANY_A_TOKEN" "$TENANT_A" "$REVIEW_BODY")"
 test "$(printf '%s' "$REPEAT" | json_field changed)" = false
done
FINAL_EVENTS="$(request GET "/v1/company/safety-cases/$CASE_ID/events" "$COMPANY_A_TOKEN" "$TENANT_A")"
OWNER_ID="$(printf '%s' "$COMPANY_A_SIGNUP" | json_field id)"
node - "$FINAL_EVENTS" "$OWNER_ID" <<'NODE'
const x=JSON.parse(process.argv[2]),actor=process.argv[3];
const targets=["reviewing","resolved","dismissed","open","reviewing"];
const from=["open","reviewing","resolved","dismissed","open"];
const notes=["Revisão humana iniciada",null,null,null,"Fixture"];
if(x.length!==5||x.some((e,i)=>e.toStatus!==targets[i]||e.fromStatus!==from[i]||e.note!==notes[i]||e.actorIdentityId!==actor))throw Error("safety_optional_note_or_event_history_invalid");
NODE
echo 'PASS: safety admin optional notes and four statuses retain real dates trusted actors and idempotent audit events'


# Optional assignment, every original category, trusted actor and actual ACK timestamps stay valid.
for category in harassment violence fraud discrimination unsafe_work other; do
 body="$(node -e 'const x={category:process.argv[1],description:"  "+"x".repeat(4000)+"  ",reporterIdentityId:"spoof",tenantId:"spoof"};if(x.category==="other")x.assignmentId=null;process.stdout.write(JSON.stringify(x));' "$category")"
 ack="$(request POST /v1/safety-cases "$PRO_TOKEN" "$TENANT_A" "$body")"
 mine="$(request GET /v1/safety-cases/mine "$PRO_TOKEN" "$TENANT_A")"
 owner="$(request GET /v1/company/safety-cases "$COMPANY_A_TOKEN" "$TENANT_A")"
 node - "$ack" "$mine" "$owner" "$category" "$TENANT_A" <<'NODE'
const ack=JSON.parse(process.argv[2]),mine=JSON.parse(process.argv[3]),owner=JSON.parse(process.argv[4]),category=process.argv[5],tenant=process.argv[6],row=mine.find(x=>x.id===ack.id);
if(!ack.id||ack.category!==category||ack.status!=='open'||!Number.isFinite(Date.parse(ack.createdAt))||!row||row.assignmentId!==null||row.category!==category||row.description!=='x'.repeat(4000)||row.tenantId!==tenant||row.reportedByMe!==true||!owner.some(x=>x.id===ack.id))throw Error('optional safety report lost actual trimmed text, actor, tenant or ACK');
NODE
done
owner_ack="$(request POST /v1/safety-cases "$COMPANY_A_TOKEN" "$TENANT_A" "{\"assignmentId\":\"$ASSIGNMENT_ID\",\"category\":\"other\",\"description\":\"owner fixture\"}")"
test "$(printf '%s' "$owner_ack" | json_field status)" = open
test "$(printf '%s' "$owner_ack" | json_field category)" = other
node - "$owner_ack" "$(request GET /v1/safety-cases/mine "$PRO_TOKEN" "$TENANT_A")" "$ASSIGNMENT_ID" <<'NODE'
const ack=JSON.parse(process.argv[2]),rows=JSON.parse(process.argv[3]),id=process.argv[4],row=rows.find(x=>x.id===ack.id);
if(!ack.id||!Number.isFinite(Date.parse(ack.createdAt))||!row||row.assignmentId!==id||row.reportedByMe!==false)throw Error('company report lost linked professional visibility or real ACK');
NODE
not_contains "$(request GET /v1/company/safety-cases "$COMPANY_B_TOKEN" "$TENANT_B")" "$(printf '%s' "$owner_ack" | json_field id)"
echo 'PASS: optional safety assignments and original categories retain real scoped report ACKs and dates'

request POST /v1/auth/signout "$PRO_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$COMPANY_A_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$COMPANY_B_TOKEN" '' '{}' >/dev/null

echo "PASS: safety case reporting + immutable status audit + tenant isolation"
