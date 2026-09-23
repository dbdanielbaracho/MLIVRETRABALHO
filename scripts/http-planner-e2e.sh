#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
STAMP="$(date +%s)-$RANDOM"
PASSWORD='PlannerPass123!'

iso_in(){ node -e 'process.stdout.write(new Date(Date.now()+Number(process.argv[1])*60*60*1000).toISOString())' "$1"; }
json_field(){ node -e 'const fs=require("fs");let x=JSON.parse(fs.readFileSync(0,"utf8"));for(const p of process.argv[1].split(".")){if(/^\d+$/.test(p))x=x[Number(p)];else x=x?.[p]}if(x===undefined||x===null)process.exit(2);process.stdout.write(String(x));' "$1"; }
request(){ local method="$1" url="$2" token="${3:-}" tenant="${4:-}" body="${5:-}"; local args=(-sS --fail-with-body -X "$method" "${BASE_URL%/}$url"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$tenant" ]] && args+=(-H "x-tenant-id: $tenant"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }

START_1="$(iso_in 24)"; END_1="$(iso_in 30)"
START_2="$(iso_in 48)"; END_2="$(iso_in 54)"
START_B="$(iso_in 72)"; END_B="$(iso_in 78)"
AVAIL_START="$(iso_in 20)"; AVAIL_END="$(iso_in 60)"

COMPANY_A_EMAIL="planner-a-${STAMP}@example.test"
COMPANY_B_EMAIL="planner-b-${STAMP}@example.test"
PRO_EMAIL="planner-pro-${STAMP}@example.test"

A_SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$COMPANY_A_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"Planner A\"}")"
B_SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$COMPANY_B_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"Planner B\"}")"
request POST /v1/auth/signup '' '' "{\"email\":\"$PRO_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"professional\"}" >/dev/null
TENANT_A="$(printf '%s' "$A_SIGNUP" | json_field tenantId)"
TENANT_B="$(printf '%s' "$B_SIGNUP" | json_field tenantId)"
A_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$COMPANY_A_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
B_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$COMPANY_B_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
PRO_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$PRO_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"

PROFILE="$(request PUT /v1/professional-profile "$PRO_TOKEN" '' '{"displayName":"Planner Bartender","homeCity":"São Paulo","primaryRole":"Bartender"}')"
PRO_ID="$(printf '%s' "$PROFILE" | json_field id)"
request POST /v1/availability/mine "$PRO_TOKEN" '' "{\"startsAt\":\"$AVAIL_START\",\"endsAt\":\"$AVAIL_END\"}" >/dev/null

JOB_EMPTY="$(request POST /v1/company/jobs "$A_TOKEN" "$TENANT_A" "{\"title\":\"Turno sem confirmação\",\"requiredRole\":\"Garçom\",\"workCity\":\"São Paulo\",\"startsAt\":\"$START_1\",\"endsAt\":\"$END_1\",\"payCents\":12000}")"
JOB_CONF="$(request POST /v1/company/jobs "$A_TOKEN" "$TENANT_A" "{\"title\":\"Turno confirmado\",\"requiredRole\":\"Bartender\",\"workCity\":\"São Paulo\",\"startsAt\":\"$START_2\",\"endsAt\":\"$END_2\",\"payCents\":18000}")"
JOB_B="$(request POST /v1/company/jobs "$B_TOKEN" "$TENANT_B" "{\"title\":\"Turno de outro tenant\",\"requiredRole\":\"Bartender\",\"workCity\":\"São Paulo\",\"startsAt\":\"$START_B\",\"endsAt\":\"$END_B\",\"payCents\":20000}")"
EMPTY_ID="$(printf '%s' "$JOB_EMPTY" | json_field id)"
CONF_ID="$(printf '%s' "$JOB_CONF" | json_field id)"
B_JOB_ID="$(printf '%s' "$JOB_B" | json_field id)"

request POST "/v1/jobs/$CONF_ID/interest" "$PRO_TOKEN" >/dev/null
CONFIRM="$(request POST "/v1/company/jobs/$CONF_ID/confirm" "$A_TOKEN" "$TENANT_A" "{\"professionalId\":\"$PRO_ID\"}")"
ASSIGNMENT_ID="$(printf '%s' "$CONFIRM" | json_field id)"

PLANNER="$(request GET /v1/company/planner "$A_TOKEN" "$TENANT_A")"
node -e '
const rows=JSON.parse(process.argv[1]),empty=process.argv[2],confirmed=process.argv[3],other=process.argv[4];
if(rows.some(x=>x.id===other)){console.error("cross tenant planner leak",rows);process.exit(1)}
const e=rows.find(x=>x.id===empty),c=rows.find(x=>x.id===confirmed);
if(!e||!c){console.error("planner jobs missing",rows);process.exit(1)}
if(e.interestCount!==0||e.confirmedCount!==0||e.activeCount!==0||e.completedCount!==0){console.error("empty planner counts wrong",e);process.exit(1)}
if(c.interestCount!==1||c.confirmedCount!==1||c.activeCount!==0||c.completedCount!==0){console.error("confirmed planner counts wrong",c);process.exit(1)}
' "$PLANNER" "$EMPTY_ID" "$CONF_ID" "$B_JOB_ID"

request POST "/v1/assignments/$ASSIGNMENT_ID/check-in" "$PRO_TOKEN" "$TENANT_A" '{}' >/dev/null
request POST "/v1/assignments/$ASSIGNMENT_ID/start" "$PRO_TOKEN" "$TENANT_A" '{}' >/dev/null
PLANNER_ACTIVE="$(request GET /v1/company/planner "$A_TOKEN" "$TENANT_A")"
node -e 'const rows=JSON.parse(process.argv[1]),id=process.argv[2],x=rows.find(v=>v.id===id);if(!x||x.confirmedCount!==0||x.activeCount!==1||x.completedCount!==0){console.error("active planner counts wrong",x,rows);process.exit(1)}' "$PLANNER_ACTIVE" "$CONF_ID"

request POST "/v1/assignments/$ASSIGNMENT_ID/check-out" "$PRO_TOKEN" "$TENANT_A" '{}' >/dev/null
request POST "/v1/assignments/$ASSIGNMENT_ID/complete" "$PRO_TOKEN" "$TENANT_A" '{}' >/dev/null
PLANNER_DONE="$(request GET /v1/company/planner "$A_TOKEN" "$TENANT_A")"
node -e 'const rows=JSON.parse(process.argv[1]),id=process.argv[2],x=rows.find(v=>v.id===id);if(!x||x.confirmedCount!==0||x.activeCount!==0||x.completedCount!==1){console.error("completed planner counts wrong",x,rows);process.exit(1)}' "$PLANNER_DONE" "$CONF_ID"

request POST /v1/auth/signout "$PRO_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$A_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$B_TOKEN" '' '{}' >/dev/null

echo 'PASS: company planner is tenant isolated and reflects assignment lifecycle facts'
