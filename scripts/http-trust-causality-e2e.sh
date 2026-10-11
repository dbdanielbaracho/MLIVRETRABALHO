#!/usr/bin/env bash
set -euo pipefail
BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
case "$BASE_URL" in http://127.0.0.1:*|http://localhost:*) ;; *) echo "Refusing trust fixture writes outside localhost" >&2; exit 2 ;; esac
TRUST_INPUT_DIR="$(mktemp -d)"
trap 'rm -rf "$TRUST_INPUT_DIR"' EXIT
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
status_with_body(){ local method="$1" url="$2" token="$3" tenant="$4" body="$5"; curl -sS -o "$TRUST_INPUT_DIR/response.json" -w '%{http_code}' -X "$method" "${BASE_URL%/}$url" -H "authorization: Bearer $token" -H "x-tenant-id: $tenant" -H 'content-type: application/json' --data "$body"; }

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


# Runtime validation rejects malformed JSON, causality, notes and UUIDs before inserting any trust event.
TRUST_BEFORE="$(request GET "/v1/company/trust-events/$PRO_ID" "$A_TOKEN" "$TENANT_A")"
TRUST_ASSIGNMENTS_BEFORE="$(request GET /v1/assignments/mine "$PRO_TOKEN")"
TRUST_EARNINGS_BEFORE="$(request GET /v1/earnings/mine "$PRO_TOKEN")"
node - "$TRUST_INPUT_DIR" "$PRO_ID" "$ASSIGNMENT_ID" <<'NODE'
const fs=require('fs'),dir=process.argv[2],pro=process.argv[3],id=process.argv[4],base={professionalId:pro,eventType:'incident'};
const bad=[
 ...[null,false,true,42,'text',[],{}].map(body=>({body,error:'trust_event_invalid'})),
 ...[undefined,null,false,42,[],{},[pro],'','invalid'].map(professionalId=>({body:{...base,professionalId},error:'trust_event_invalid'})),
 ...[undefined,null,false,42,[],{},['incident'],'unknown'].map(eventType=>({body:{...base,eventType},error:'trust_event_invalid'})),
 ...[false,true,0,42,[],{},['company'],'','automatic_guilt'].map(cause=>({body:{...base,cause},error:'trust_cause_invalid'})),
 ...['',false,42,[],{},[id],'invalid'].map(assignmentId=>({body:{...base,assignmentId},error:'trust_assignment_invalid'})),
 ...[false,true,42,[],{},['text']].map(notes=>({body:{...base,notes},error:'trust_notes_invalid'})),
 ...['no_show','late_arrival'].flatMap(eventType=>[undefined,null,''].map(assignmentId=>({body:{...base,eventType,assignmentId},error:'assignment_required'})))
];bad.forEach((x,i)=>fs.writeFileSync(dir+'/bad-trust-'+i+'.json',JSON.stringify(x)));
NODE
for payload in "$TRUST_INPUT_DIR"/bad-trust-*.json; do
 body="$(node -e 'process.stdout.write(JSON.stringify(JSON.parse(require("fs").readFileSync(process.argv[1])).body))' "$payload")"
 error="$(node -e 'process.stdout.write(JSON.parse(require("fs").readFileSync(process.argv[1])).error)' "$payload")"
 test "$(status_with_body POST /v1/company/trust-events "$A_TOKEN" "$TENANT_A" "$body")" = 400
 test "$(json_field message < "$TRUST_INPUT_DIR/response.json")" = "$error"
done
for id in invalid bad-id 42; do
 test "$(status_with_body GET "/v1/company/trust-events/$id" "$A_TOKEN" "$TENANT_A" '')" = 400
 test "$(json_field message < "$TRUST_INPUT_DIR/response.json")" = trust_event_invalid
done
test "$(status_with_body POST /v1/company/trust-events invalid-token "$TENANT_A" null)" = 401
test "$(status_with_body POST /v1/company/trust-events "$A_TOKEN" '' null)" = 400
test "$(status_with_body POST /v1/company/trust-events "$A_TOKEN" "$TENANT_B" null)" = 401
test "$(status_with_body POST /v1/company/trust-events "$PRO_TOKEN" "$TENANT_A" null)" = 403
test "$(status_with_body GET /v1/company/trust-events/invalid invalid-token "$TENANT_A" '')" = 401
test "$(status_with_body GET /v1/company/trust-events/invalid "$PRO_TOKEN" "$TENANT_A" '')" = 403
test "$(status_with_body GET /v1/company/trust-events/00000000-0000-0000-0000-000000000000 "$A_TOKEN" "$TENANT_A" '')" = 404
test "$(request GET "/v1/company/trust-events/$PRO_ID" "$A_TOKEN" "$TENANT_A")" = "$TRUST_BEFORE"
test "$(request GET /v1/assignments/mine "$PRO_TOKEN")" = "$TRUST_ASSIGNMENTS_BEFORE"
test "$(request GET /v1/earnings/mine "$PRO_TOKEN")" = "$TRUST_EARNINGS_BEFORE"
echo 'PASS: malformed trust JSON causes notes and UUIDs reject without changing real events assignments or earnings'

EVENT="$(request POST /v1/company/trust-events "$A_TOKEN" "$TENANT_A" "{\"assignmentId\":\"$ASSIGNMENT_ID\",\"professionalId\":\"$PRO_ID\",\"eventType\":\"incident\",\"cause\":\"company\",\"notes\":\"Operação cancelou acesso ao local\"}")"
test "$(printf '%s' "$EVENT" | json_field cause)" = "company"
REPORTER="$(printf '%s' "$EVENT" | json_field reportedByIdentityId)"; test -n "$REPORTER"

LIST="$(request GET "/v1/company/trust-events/$PRO_ID" "$A_TOKEN" "$TENANT_A")"
node -e 'const rows=JSON.parse(process.argv[1]);const id=process.argv[2];const x=rows.find(v=>v.assignmentId===id);if(!x||x.eventType!=="incident"||x.cause!=="company"||!x.reportedByIdentityId){console.error("causal trust event missing",x);process.exit(1)}' "$LIST" "$ASSIGNMENT_ID"

INVALID="$(status_with_body POST /v1/company/trust-events "$A_TOKEN" "$TENANT_A" "{\"assignmentId\":\"$ASSIGNMENT_ID\",\"professionalId\":\"$PRO_ID\",\"eventType\":\"no_show\",\"cause\":\"automatic_guilt\"}")"
test "$INVALID" = "400"

CROSS="$(curl -sS -o "$TRUST_INPUT_DIR/cross.json" -w '%{http_code}' -X GET "${BASE_URL%/}/v1/company/trust-events/$PRO_ID" -H "authorization: Bearer $B_TOKEN" -H "x-tenant-id: $TENANT_B")"
test "$CROSS" = "404"


# Every existing type/cause and optional nullish input preserves real actor audit and dates.
node - "$TRUST_INPUT_DIR" "$PRO_ID" "$ASSIGNMENT_ID" <<'NODE'
const fs=require('fs'),dir=process.argv[2],pro=process.argv[3],id=process.argv[4];
const good=['no_show','late_arrival','incident','commendation'].flatMap(eventType=>[undefined,null,'professional','company','force_majeure','platform','undetermined'].map(cause=>({professionalId:pro,assignmentId:id,eventType,cause,notes:'  fixture evidence  ',reportedByIdentityId:'spoof',tenantId:'spoof'})));
good.push(...[undefined,null].flatMap(assignmentId=>[undefined,null,'','  '].map(notes=>({professionalId:pro,eventType:'incident',assignmentId,notes}))));
good.forEach((body,i)=>fs.writeFileSync(dir+'/good-trust-'+i+'.json',JSON.stringify(body)));
NODE
for payload in "$TRUST_INPUT_DIR"/good-trust-*.json; do
 body="$(cat "$payload")"
 ack="$(request POST /v1/company/trust-events "$A_TOKEN" "$TENANT_A" "$body")"
 rows="$(request GET "/v1/company/trust-events/$PRO_ID" "$A_TOKEN" "$TENANT_A")"
 node - "$payload" "$ack" "$rows" "$REPORTER" <<'NODE'
const body=JSON.parse(require('fs').readFileSync(process.argv[2])),ack=JSON.parse(process.argv[3]),rows=JSON.parse(process.argv[4]),reporter=process.argv[5],row=rows.find(x=>x.id===ack.id);
if(!ack.id||ack.eventType!==body.eventType||ack.cause!==(body.cause??'undetermined')||ack.reportedByIdentityId!==reporter||!Number.isFinite(Date.parse(ack.occurredAt))||!row||row.eventType!==body.eventType||row.cause!==ack.cause||row.assignmentId!==(body.assignmentId??null)||row.notes!==(body.notes?.trim()||null)||row.reportedByIdentityId!==reporter||row.occurredAt!==ack.occurredAt)throw Error('trust event lost actual type/cause notes assignment actor or ACK timestamp');
NODE
done
test "$(status_with_body GET "/v1/company/trust-events/$PRO_ID" "$B_TOKEN" "$TENANT_B" '')" = 404
test "$(request GET /v1/assignments/mine "$PRO_TOKEN")" = "$TRUST_ASSIGNMENTS_BEFORE"
test "$(request GET /v1/earnings/mine "$PRO_TOKEN")" = "$TRUST_EARNINGS_BEFORE"
echo 'PASS: original trust types and causes retain scoped real ACKs actor audit optional NULL and dates without enforcement'


# Integrity cases remain admin-reviewed records; malformed requests never create or change them.
INTEGRITY_BEFORE="$(request GET /v1/company/integrity/cases "$A_TOKEN" "$TENANT_A")"
node - "$TRUST_INPUT_DIR" "$ASSIGNMENT_ID" <<'NODE'
const fs=require('fs'),dir=process.argv[2],id=process.argv[3],base={assignmentId:id,kind:'other',evidence:'fixture evidence'};
const bad=[null,false,true,42,'text',[],{},
 ...[undefined,null,false,42,[],{},[id],'','invalid'].map(assignmentId=>({...base,assignmentId})),
 ...[undefined,null,false,42,[],{},['other'],'unknown'].map(kind=>({...base,kind})),
 ...[undefined,null,false,42,[],{},['text'],'','  '].map(evidence=>({...base,evidence}))];
bad.forEach((body,i)=>fs.writeFileSync(dir+'/bad-integrity-create-'+i+'.json',JSON.stringify(body)));
NODE
for payload in "$TRUST_INPUT_DIR"/bad-integrity-create-*.json; do
 test "$(status_with_body POST /v1/company/integrity/cases "$A_TOKEN" "$TENANT_A" "$(cat "$payload")")" = 400
 test "$(json_field message < "$TRUST_INPUT_DIR/response.json")" = integrity_case_invalid
done
test "$(status_with_body POST /v1/company/integrity/cases "$A_TOKEN" "$TENANT_A" '{"assignmentId":"00000000-0000-0000-0000-000000000000","kind":"other","evidence":"fixture"}')" = 400
test "$(json_field message < "$TRUST_INPUT_DIR/response.json")" = assignment_not_found
test "$(status_with_body POST /v1/company/integrity/cases invalid-token "$TENANT_A" null)" = 401
test "$(status_with_body POST /v1/company/integrity/cases "$A_TOKEN" '' null)" = 400
test "$(status_with_body POST /v1/company/integrity/cases "$A_TOKEN" "$TENANT_B" null)" = 401
test "$(status_with_body POST /v1/company/integrity/cases "$PRO_TOKEN" "$TENANT_A" null)" = 403
test "$(request GET /v1/company/integrity/cases "$A_TOKEN" "$TENANT_A")" = "$INTEGRITY_BEFORE"
test "$(request GET /v1/assignments/mine "$PRO_TOKEN")" = "$TRUST_ASSIGNMENTS_BEFORE"
test "$(request GET /v1/earnings/mine "$PRO_TOKEN")" = "$TRUST_EARNINGS_BEFORE"
echo 'PASS: malformed integrity creation JSON and UUIDs reject before creating real admin cases'

for kind in suspected_bypass contact_exchange other; do
 body="$(node -e 'process.stdout.write(JSON.stringify({assignmentId:process.argv[1],kind:process.argv[2],evidence:"  fixture evidence  ",tenantId:"spoof",createdByIdentityId:"spoof"}))' "$ASSIGNMENT_ID" "$kind")"
 ack="$(request POST /v1/company/integrity/cases "$A_TOKEN" "$TENANT_A" "$body")"
 case_id="$(printf '%s' "$ack" | json_field id)"
 node - "$ack" "$(request GET /v1/company/integrity/cases "$A_TOKEN" "$TENANT_A")" "$kind" "$ASSIGNMENT_ID" <<'NODE'
const ack=JSON.parse(process.argv[2]),rows=JSON.parse(process.argv[3]),kind=process.argv[4],assignment=process.argv[5],row=rows.find(x=>x.id===ack.id);
if(!ack.id||ack.kind!==kind||ack.status!=='open'||!Number.isFinite(Date.parse(ack.createdAt))||!row||row.assignmentId!==assignment||row.evidence!=='fixture evidence'||row.reviewNote!==null||row.reviewedAt!==null)throw Error('actual integrity case lost kind/evidence/assignment/date');
NODE
 before="$(request GET /v1/company/integrity/cases "$A_TOKEN" "$TENANT_A")"
 node - "$TRUST_INPUT_DIR" <<'NODE'
const fs=require('fs'),dir=process.argv[2],base={decision:'needs_more_info',note:'fixture note'};
const bad=[null,false,true,42,'text',[],{},
 ...[undefined,null,false,42,[],{},['substantiated'],'unknown'].map(decision=>({...base,decision})),
 ...[undefined,null,false,42,[],{},['text'],'','  '].map(note=>({...base,note}))];
bad.forEach((body,i)=>fs.writeFileSync(dir+'/bad-integrity-review-'+i+'.json',JSON.stringify(body)));
NODE
 for payload in "$TRUST_INPUT_DIR"/bad-integrity-review-*.json; do
  test "$(status_with_body POST "/v1/company/integrity/cases/$case_id/review" "$A_TOKEN" "$TENANT_A" "$(cat "$payload")")" = 400
  test "$(json_field message < "$TRUST_INPUT_DIR/response.json")" = review_invalid
 done
 for id in invalid bad-id 42; do
  test "$(status_with_body POST "/v1/company/integrity/cases/$id/review" "$A_TOKEN" "$TENANT_A" '{"decision":"needs_more_info","note":"fixture"}')" = 400
  test "$(json_field message < "$TRUST_INPUT_DIR/response.json")" = review_invalid
 done
 test "$(status_with_body POST "/v1/company/integrity/cases/$case_id/review" invalid-token "$TENANT_A" null)" = 401
 test "$(status_with_body POST "/v1/company/integrity/cases/$case_id/review" "$PRO_TOKEN" "$TENANT_A" null)" = 403
 test "$(status_with_body POST "/v1/company/integrity/cases/$case_id/review" "$B_TOKEN" "$TENANT_B" '{"decision":"substantiated","note":"cross-tenant"}')" = 400
 test "$(json_field message < "$TRUST_INPUT_DIR/response.json")" = integrity_case_not_open
 test "$(request GET /v1/company/integrity/cases "$A_TOKEN" "$TENANT_A")" = "$before"
 terminal=substantiated
 test "$kind" != contact_exchange || terminal=unsubstantiated
 for decision in needs_more_info "$terminal"; do
  review_ack="$(request POST "/v1/company/integrity/cases/$case_id/review" "$A_TOKEN" "$TENANT_A" "{\"decision\":\"$decision\",\"note\":\"  fixture review  \",\"reviewedByIdentityId\":\"spoof\"}")"
  node - "$review_ack" "$case_id" "$decision" "$(request GET /v1/company/integrity/cases "$A_TOKEN" "$TENANT_A")" <<'NODE'
const ack=JSON.parse(process.argv[2]),id=process.argv[3],decision=process.argv[4],rows=JSON.parse(process.argv[5]),row=rows.find(x=>x.id===id);
if(ack.id!==id||ack.status!==decision||ack.reviewNote!=='fixture review'||!Number.isFinite(Date.parse(ack.reviewedAt))||!row||row.status!==decision||row.reviewNote!==ack.reviewNote||row.reviewedAt!==ack.reviewedAt)throw Error('integrity human review lost actual status/note/date');
NODE
 done
 closed="$(request GET /v1/company/integrity/cases "$A_TOKEN" "$TENANT_A")"
 test "$(status_with_body POST "/v1/company/integrity/cases/$case_id/review" "$A_TOKEN" "$TENANT_A" '{"decision":"needs_more_info","note":"closed replay"}')" = 400
 test "$(json_field message < "$TRUST_INPUT_DIR/response.json")" = integrity_case_not_open
 test "$(request GET /v1/company/integrity/cases "$A_TOKEN" "$TENANT_A")" = "$closed"
done
test "$(request GET /v1/company/integrity/cases "$B_TOKEN" "$TENANT_B")" = '[]'
test "$(request GET /v1/assignments/mine "$PRO_TOKEN")" = "$TRUST_ASSIGNMENTS_BEFORE"
test "$(request GET /v1/earnings/mine "$PRO_TOKEN")" = "$TRUST_EARNINGS_BEFORE"
echo 'PASS: malformed integrity reviews preserve real cases and original human decisions dates admin scope and closed-case guard without enforcement'

request POST /v1/auth/signout "$PRO_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$A_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$B_TOKEN" '' '{}' >/dev/null

echo "PASS: trust events preserve causal attribution, actor audit and tenant isolation without automatic enforcement"
