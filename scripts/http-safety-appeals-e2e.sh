#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
if [[ ! "$BASE_URL" =~ ^http://(127\.0\.0\.1|localhost):[0-9]+/?$ ]]; then
  echo "HTTP safety appeal fixtures require a local API on an explicit port" >&2
  exit 1
fi
APPEAL_INPUT_DIR="$(mktemp -d)"
trap 'rm -rf "$APPEAL_INPUT_DIR"' EXIT
STAMP="$(date +%s)-$RANDOM"
PRO_EMAIL="appeal-pro-${STAMP}@example.test"
COMPANY_A_EMAIL="appeal-company-a-${STAMP}@example.test"
COMPANY_B_EMAIL="appeal-company-b-${STAMP}@example.test"
PASSWORD="AppealPass123!"
START_AT="$(node -e 'process.stdout.write(new Date(Date.now()+24*60*60*1000).toISOString())')"
END_AT="$(node -e 'process.stdout.write(new Date(Date.now()+32*60*60*1000).toISOString())')"

json_field(){ node -e 'const fs=require("fs");let x=JSON.parse(fs.readFileSync(0,"utf8"));for(const p of process.argv[1].split(".")){if(/^\d+$/.test(p))x=x[Number(p)];else x=x?.[p]}if(x===undefined||x===null)process.exit(2);process.stdout.write(String(x));' "$1"; }
contains(){ [[ "$1" == *"$2"* ]] || { echo "missing expected value: $2" >&2; return 1; }; }
not_contains(){ [[ "$1" != *"$2"* ]] || { echo "unexpected value present: $2" >&2; return 1; }; }
request(){ local method="$1" url="$2" token="${3:-}" tenant="${4:-}" body="${5:-}"; local args=(-sS --fail-with-body -X "$method" "${BASE_URL%/}$url"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$tenant" ]] && args+=(-H "x-tenant-id: $tenant"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }
status_only(){ local method="$1" url="$2" token="$3" tenant="$4" body="${5:-}"; local args=(-sS -o "$APPEAL_INPUT_DIR/negative.json" -w '%{http_code}' -X "$method" "${BASE_URL%/}$url" -H "authorization: Bearer $token" -H "x-tenant-id: $tenant"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }

request POST /v1/auth/signup '' '' "{\"email\":\"$PRO_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"professional\"}" >/dev/null
COMPANY_A_SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$COMPANY_A_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"Appeal Company A\"}")"
TENANT_A="$(printf '%s' "$COMPANY_A_SIGNUP" | json_field tenantId)"
COMPANY_B_SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$COMPANY_B_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"Appeal Company B\"}")"
TENANT_B="$(printf '%s' "$COMPANY_B_SIGNUP" | json_field tenantId)"

PRO_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$PRO_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
COMPANY_A_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$COMPANY_A_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
COMPANY_B_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$COMPANY_B_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"

PROFILE="$(request PUT /v1/professional-profile "$PRO_TOKEN" '' '{"displayName":"Appeal Professional","homeCity":"São Paulo","primaryRole":"Bartender"}')"
PROFESSIONAL_ID="$(printf '%s' "$PROFILE" | json_field id)"

JOB="$(request POST /v1/company/jobs "$COMPANY_A_TOKEN" "$TENANT_A" "{\"title\":\"Appeal Bartender\",\"requiredRole\":\"Bartender\",\"workCity\":\"São Paulo\",\"startsAt\":\"$START_AT\",\"endsAt\":\"$END_AT\",\"payCents\":18000}")"
JOB_ID="$(printf '%s' "$JOB" | json_field id)"
request POST "/v1/jobs/$JOB_ID/interest" "$PRO_TOKEN" >/dev/null
ASSIGNMENT="$(request POST "/v1/company/jobs/$JOB_ID/confirm" "$COMPANY_A_TOKEN" "$TENANT_A" "{\"professionalId\":\"$PROFESSIONAL_ID\"}")"
ASSIGNMENT_ID="$(printf '%s' "$ASSIGNMENT" | json_field id)"

# The company reports a case; the professional involved must see the case and have a contest/review path.
CASE="$(request POST /v1/safety-cases "$COMPANY_A_TOKEN" "$TENANT_A" "{\"assignmentId\":\"$ASSIGNMENT_ID\",\"category\":\"other\",\"description\":\"Ocorrência operacional sujeita a revisão humana\"}")"
CASE_ID="$(printf '%s' "$CASE" | json_field id)"

RELATED_CASES="$(request GET /v1/safety-cases/mine "$PRO_TOKEN")"
contains "$RELATED_CASES" "$CASE_ID"
contains "$RELATED_CASES" "$TENANT_A"
contains "$RELATED_CASES" '"reportedByMe":false'
contains "$RELATED_CASES" 'Ocorrência operacional sujeita a revisão humana'

# Malformed requests cannot create or change an appeal for the real case.
CREATE_MINE_BEFORE="$(request GET /v1/safety-appeals/mine "$PRO_TOKEN")"
CREATE_ADMIN_BEFORE="$(request GET /v1/company/safety-appeals "$COMPANY_A_TOKEN" "$TENANT_A")"
node - "$CASE_ID" "$APPEAL_INPUT_DIR" <<'NODE'
const fs=require('fs'),id=process.argv[2],dir=process.argv[3];
const bodies=[
 null,[],true,false,42,'text',
 ...[null,true,false,42,{},[],['Fixture'],'','   ','x'.repeat(4001)].map(reason=>({safetyCaseId:id,reason})),
 ...[null,true,42,{},[],id+'x','bad',''].map(safetyCaseId=>({safetyCaseId,reason:'Fixture'})),
 {safetyCaseId:id}, {reason:'Fixture'}
];
bodies.forEach((body,i)=>fs.writeFileSync(dir+'/create-'+i+'.json',JSON.stringify(body)));
NODE
for payload in "$APPEAL_INPUT_DIR"/create-*.json; do
  test "$(status_only POST /v1/safety-appeals "$PRO_TOKEN" "$TENANT_A" "$(cat "$payload")")" = "400"
done
test "$(status_only POST /v1/safety-appeals '' "$TENANT_A" 'null')" = "401"
test "$(status_only POST /v1/safety-appeals "$COMPANY_B_TOKEN" "$TENANT_A" 'null')" = "401"
test "$(request GET /v1/safety-appeals/mine "$PRO_TOKEN")" = "$CREATE_MINE_BEFORE"
test "$(request GET /v1/company/safety-appeals "$COMPANY_A_TOKEN" "$TENANT_A")" = "$CREATE_ADMIN_BEFORE"
echo "PASS: safety appeal malformed creation rejects before changing real tenant appeals"

APPEAL="$(request POST /v1/safety-appeals "$PRO_TOKEN" "$TENANT_A" "{\"safetyCaseId\":\"$CASE_ID\",\"reason\":\"Solicito revisão humana e registro do meu contraditório\"}")"
APPEAL_ID="$(printf '%s' "$APPEAL" | json_field id)"
test "$(printf '%s' "$APPEAL" | json_field status)" = "submitted"
test "$(printf '%s' "$APPEAL" | json_field created)" = "true"

DUPLICATE="$(request POST /v1/safety-appeals "$PRO_TOKEN" "$TENANT_A" "{\"safetyCaseId\":\"$CASE_ID\",\"reason\":\"Tentativa duplicada\"}")"
test "$(printf '%s' "$DUPLICATE" | json_field id)" = "$APPEAL_ID"
test "$(printf '%s' "$DUPLICATE" | json_field created)" = "false"
test "$(printf '%s' "$DUPLICATE" | json_field reason)" = "Solicito revisão humana e registro do meu contraditório"

MINE="$(request GET /v1/safety-appeals/mine "$PRO_TOKEN")"
contains "$MINE" "$APPEAL_ID"
contains "$MINE" "$TENANT_A"
contains "$MINE" 'submitted'

ADMIN_A="$(request GET /v1/company/safety-appeals "$COMPANY_A_TOKEN" "$TENANT_A")"
contains "$ADMIN_A" "$APPEAL_ID"
ADMIN_B="$(request GET /v1/company/safety-appeals "$COMPANY_B_TOKEN" "$TENANT_B")"
not_contains "$ADMIN_B" "$APPEAL_ID"

CROSS_STATUS="$(status_only POST "/v1/company/safety-appeals/$APPEAL_ID/status" "$COMPANY_B_TOKEN" "$TENANT_B" '{"status":"reviewing"}')"
test "$CROSS_STATUS" = "404"

# Malformed reviews must leave the case, appeal and immutable event log unchanged.
REVIEW_ADMIN_BEFORE="$(request GET /v1/company/safety-appeals "$COMPANY_A_TOKEN" "$TENANT_A")"
REVIEW_MINE_BEFORE="$(request GET /v1/safety-appeals/mine "$PRO_TOKEN")"
REVIEW_EVENTS_BEFORE="$(request GET "/v1/company/safety-appeals/$APPEAL_ID/events" "$COMPANY_A_TOKEN" "$TENANT_A")"
node - "$APPEAL_INPUT_DIR" <<'NODE'
const fs=require('fs'),dir=process.argv[2];
const bodies=[null,[],true,false,42,'text',
 ...[null,true,42,{},[],['reviewing'],'unknown'].map(status=>({status})),
 ...[42,true,false,{},[],['Fixture'],'x'.repeat(2001)].map(note=>({status:'reviewing',note}))];
bodies.forEach((body,i)=>fs.writeFileSync(dir+'/review-'+i+'.json',JSON.stringify(body)));
NODE
for payload in "$APPEAL_INPUT_DIR"/review-*.json; do
  test "$(status_only POST "/v1/company/safety-appeals/$APPEAL_ID/status" "$COMPANY_A_TOKEN" "$TENANT_A" "$(cat "$payload")")" = "400"
done
test "$(status_only GET /v1/company/safety-appeals/not-a-uuid/events "$COMPANY_A_TOKEN" "$TENANT_A")" = "400"
test "$(status_only POST /v1/company/safety-appeals/not-a-uuid/status "$COMPANY_A_TOKEN" "$TENANT_A" '{"status":"reviewing"}')" = "400"
for method in GET POST; do
  if [[ "$method" == "GET" ]]; then path="/v1/company/safety-appeals/$APPEAL_ID/events"; else path="/v1/company/safety-appeals/$APPEAL_ID/status"; fi
  test "$(status_only "$method" "$path" '' "$TENANT_A" '{"status":"reviewing"}')" = "401"
  test "$(status_only "$method" "$path" "$PRO_TOKEN" "$TENANT_A" '{"status":"reviewing"}')" = "403"
  test "$(status_only "$method" "$path" "$COMPANY_B_TOKEN" "$TENANT_A" '{"status":"reviewing"}')" = "401"
done
test "$(request GET /v1/company/safety-appeals "$COMPANY_A_TOKEN" "$TENANT_A")" = "$REVIEW_ADMIN_BEFORE"
test "$(request GET /v1/safety-appeals/mine "$PRO_TOKEN")" = "$REVIEW_MINE_BEFORE"
test "$(request GET "/v1/company/safety-appeals/$APPEAL_ID/events" "$COMPANY_A_TOKEN" "$TENANT_A")" = "$REVIEW_EVENTS_BEFORE"
echo "PASS: safety appeal malformed review and UUID reject before changing real appeals or audit events"

REVIEWING="$(request POST "/v1/company/safety-appeals/$APPEAL_ID/status" "$COMPANY_A_TOKEN" "$TENANT_A" '{"status":"reviewing","note":"Revisão humana iniciada"}')"
test "$(printf '%s' "$REVIEWING" | json_field status)" = "reviewing"
test "$(printf '%s' "$REVIEWING" | json_field changed)" = "true"

IDEMPOTENT="$(request POST "/v1/company/safety-appeals/$APPEAL_ID/status" "$COMPANY_A_TOKEN" "$TENANT_A" '{"status":"reviewing","note":"Não duplicar evento"}')"
test "$(printf '%s' "$IDEMPOTENT" | json_field changed)" = "false"

DECISION="$(request POST "/v1/company/safety-appeals/$APPEAL_ID/status" "$COMPANY_A_TOKEN" "$TENANT_A" '{"status":"modified","note":"Decisão humana modificada após contraditório"}')"
test "$(printf '%s' "$DECISION" | json_field status)" = "modified"

EVENTS="$(request GET "/v1/company/safety-appeals/$APPEAL_ID/events" "$COMPANY_A_TOKEN" "$TENANT_A")"
node - "$EVENTS" "$COMPANY_A_SIGNUP" <<'NODE'
const events=JSON.parse(process.argv[2]),actor=JSON.parse(process.argv[3]).id;
if(events.some(e=>e.actorIdentityId!==actor||!Number.isFinite(Date.parse(e.createdAt))))throw Error('trusted actor or real dates lost');
if(events[0]?.note!=='Revisão humana iniciada'||events[1]?.note!=='Decisão humana modificada após contraditório')throw Error('original notes lost');
if(!Array.isArray(events)||events.length!==2){console.error('expected two immutable appeal events',events);process.exit(1)}
if(events[0].fromStatus!=='submitted'||events[0].toStatus!=='reviewing'||!events[0].actorIdentityId){console.error('invalid review event',events[0]);process.exit(1)}
if(events[1].fromStatus!=='reviewing'||events[1].toStatus!=='modified'||!events[1].actorIdentityId){console.error('invalid decision event',events[1]);process.exit(1)}
NODE

REOPEN="$(status_only POST "/v1/company/safety-appeals/$APPEAL_ID/status" "$COMPANY_A_TOKEN" "$TENANT_A" '{"status":"reviewing"}')"
test "$REOPEN" = "409"
CROSS_EVENTS="$(status_only GET "/v1/company/safety-appeals/$APPEAL_ID/events" "$COMPANY_B_TOKEN" "$TENANT_B")"
test "$CROSS_EVENTS" = "404"

MINE_AFTER="$(request GET /v1/safety-appeals/mine "$PRO_TOKEN")"
contains "$MINE_AFTER" 'modified'

# A second authorized appellant keeps the original professional appeal intact.
LONG_REASON="$(node -e 'process.stdout.write(JSON.stringify({safetyCaseId:process.argv[1],reason:"  "+"x".repeat(4000)+"  ",appellantIdentityId:"forged",tenantId:"forged"}))' "$CASE_ID")"
OWNER_APPEAL="$(request POST /v1/safety-appeals "$COMPANY_A_TOKEN" "$TENANT_A" "$LONG_REASON")"
OWNER_APPEAL_ID="$(printf '%s' "$OWNER_APPEAL" | json_field id)"
test "$OWNER_APPEAL_ID" != "$APPEAL_ID"
test "$(printf '%s' "$OWNER_APPEAL" | json_field created)" = "true"
node - "$OWNER_APPEAL" <<'NODE'
const row=JSON.parse(process.argv[2]);if(row.reason!=='x'.repeat(4000)||row.status!=='submitted')throw Error('trimmed maximum reason lost');
NODE
OWNER_REVIEW="$(request POST "/v1/company/safety-appeals/$OWNER_APPEAL_ID/status" "$COMPANY_A_TOKEN" "$TENANT_A" '{"status":"reviewing","actorIdentityId":"forged","tenantId":"forged"}')"
test "$(printf '%s' "$OWNER_REVIEW" | json_field changed)" = "true"
test "$(request POST "/v1/company/safety-appeals/$OWNER_APPEAL_ID/status" "$COMPANY_A_TOKEN" "$TENANT_A" '{"status":"reviewing","note":"   "}' | json_field changed)" = "false"
OWNER_DECISION="$(request POST "/v1/company/safety-appeals/$OWNER_APPEAL_ID/status" "$COMPANY_A_TOKEN" "$TENANT_A" '{"status":"upheld","note":null}')"
test "$(printf '%s' "$OWNER_DECISION" | json_field changed)" = "true"
test "$(request POST "/v1/company/safety-appeals/$OWNER_APPEAL_ID/status" "$COMPANY_A_TOKEN" "$TENANT_A" '{"status":"upheld","note":"Retry cannot replace original"}' | json_field changed)" = "false"
OWNER_EVENTS="$(request GET "/v1/company/safety-appeals/$OWNER_APPEAL_ID/events" "$COMPANY_A_TOKEN" "$TENANT_A")"
OWNER_ID="$(printf '%s' "$COMPANY_A_SIGNUP" | json_field id)"
node - "$OWNER_EVENTS" "$OWNER_ID" <<'NODE'
const rows=JSON.parse(process.argv[2]),actor=process.argv[3];
if(rows.length!==2)throw Error('optional notes or repeats duplicated appeal events');
for(const [i,row] of rows.entries()){
 if(row.actorIdentityId!==actor||row.note!==null||!Number.isFinite(Date.parse(row.createdAt)))throw Error('trusted actor, optional note or real date lost');
 if(row.fromStatus!==['submitted','reviewing'][i]||row.toStatus!==['reviewing','upheld'][i])throw Error('transition lost');
}
NODE
test "$(status_only POST "/v1/company/safety-appeals/$OWNER_APPEAL_ID/status" "$COMPANY_A_TOKEN" "$TENANT_A" '{"status":"reviewing"}')" = "409"
test "$(request GET "/v1/company/safety-appeals/$OWNER_APPEAL_ID/events" "$COMPANY_A_TOKEN" "$TENANT_A")" = "$OWNER_EVENTS"
test "$(request GET "/v1/company/safety-appeals/$APPEAL_ID/events" "$COMPANY_A_TOKEN" "$TENANT_A")" = "$EVENTS"
echo "PASS: safety appeal optional notes trusted actors original reasons and terminal idempotence retain real audit events"

request POST /v1/auth/signout "$PRO_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$COMPANY_A_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$COMPANY_B_TOKEN" '' '{}' >/dev/null

echo "PASS: related safety case visibility + appeal submission + human review + immutable audit + tenant isolation"
