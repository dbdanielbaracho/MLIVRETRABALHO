#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
[[ "$BASE_URL" =~ ^http://(127\.0\.0\.1|localhost):[0-9]+/?$ ]] || { echo 'Local disposable API required' >&2; exit 1; }
ALLOCATION_INPUT_DIR="$(mktemp -d)"
trap 'rm -rf "$ALLOCATION_INPUT_DIR"' EXIT
STAMP="$(date +%s)-$RANDOM"
PASSWORD='TeamAllocation123!'

iso_in(){ node -e 'process.stdout.write(new Date(Date.now()+Number(process.argv[1])*60*60*1000).toISOString())' "$1"; }
json_field(){ node -e 'const fs=require("fs");let x=JSON.parse(fs.readFileSync(0,"utf8"));for(const p of process.argv[1].split(".")){if(/^\d+$/.test(p))x=x[Number(p)];else x=x?.[p]}if(x===undefined||x===null)process.exit(2);process.stdout.write(String(x));' "$1"; }
request(){ local method="$1" url="$2" token="${3:-}" tenant="${4:-}" body="${5:-}"; local args=(-sS --fail-with-body -X "$method" "${BASE_URL%/}$url"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$tenant" ]] && args+=(-H "x-tenant-id: $tenant"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }

AVAIL_START="$(iso_in 20)"
AVAIL_END="$(iso_in 80)"
SEED_A_START="$(iso_in 24)"
SEED_A_END="$(iso_in 30)"
SEED_B_START="$(iso_in 32)"
SEED_B_END="$(iso_in 38)"
TARGET_START="$(iso_in 48)"
TARGET_END="$(iso_in 56)"
OUTSIDE_START="$(iso_in 100)"
OUTSIDE_END="$(iso_in 108)"

COMPANY_EMAIL="team-company-${STAMP}@example.test"
PRO_A_EMAIL="team-bartender-${STAMP}@example.test"
PRO_B_EMAIL="team-kitchen-${STAMP}@example.test"

COMPANY_SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$COMPANY_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"Equipe HTTP\"}")"
TENANT_ID="$(printf '%s' "$COMPANY_SIGNUP" | json_field tenantId)"
request POST /v1/auth/signup '' '' "{\"email\":\"$PRO_A_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"professional\"}" >/dev/null
request POST /v1/auth/signup '' '' "{\"email\":\"$PRO_B_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"professional\"}" >/dev/null

COMPANY_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$COMPANY_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
PRO_A_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$PRO_A_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
PRO_B_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$PRO_B_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"

PROFILE_A="$(request PUT /v1/professional-profile "$PRO_A_TOKEN" '' '{"displayName":"Bartender São Paulo","homeCity":"São Paulo","primaryRole":"Bartender"}')"
PROFILE_B="$(request PUT /v1/professional-profile "$PRO_B_TOKEN" '' '{"displayName":"Cozinha Rio","homeCity":"Rio de Janeiro","primaryRole":"Cozinha"}')"
PRO_A_ID="$(printf '%s' "$PROFILE_A" | json_field id)"
PRO_B_ID="$(printf '%s' "$PROFILE_B" | json_field id)"

request POST /v1/availability/mine "$PRO_A_TOKEN" '' "{\"startsAt\":\"$AVAIL_START\",\"endsAt\":\"$AVAIL_END\"}" >/dev/null
request POST /v1/availability/mine "$PRO_B_TOKEN" '' "{\"startsAt\":\"$AVAIL_START\",\"endsAt\":\"$AVAIL_END\"}" >/dev/null

SEED_A="$(request POST /v1/company/jobs "$COMPANY_TOKEN" "$TENANT_ID" "{\"title\":\"Seed Bartender\",\"requiredRole\":\"Bartender\",\"workCity\":\"São Paulo\",\"startsAt\":\"$SEED_A_START\",\"endsAt\":\"$SEED_A_END\",\"payCents\":10000}")"
SEED_B="$(request POST /v1/company/jobs "$COMPANY_TOKEN" "$TENANT_ID" "{\"title\":\"Seed Cozinha\",\"requiredRole\":\"Cozinha\",\"workCity\":\"Rio de Janeiro\",\"startsAt\":\"$SEED_B_START\",\"endsAt\":\"$SEED_B_END\",\"payCents\":10000}")"
SEED_A_ID="$(printf '%s' "$SEED_A" | json_field id)"
SEED_B_ID="$(printf '%s' "$SEED_B" | json_field id)"

request POST "/v1/jobs/$SEED_A_ID/interest" "$PRO_A_TOKEN" >/dev/null
request POST "/v1/jobs/$SEED_B_ID/interest" "$PRO_B_TOKEN" >/dev/null
request POST "/v1/company/jobs/$SEED_A_ID/confirm" "$COMPANY_TOKEN" "$TENANT_ID" "{\"professionalId\":\"$PRO_A_ID\"}" >/dev/null
request POST "/v1/company/jobs/$SEED_B_ID/confirm" "$COMPANY_TOKEN" "$TENANT_ID" "{\"professionalId\":\"$PRO_B_ID\"}" >/dev/null

DASHBOARD_ASSIGNMENTS="$(request GET /v1/company/dashboard/assignments "$COMPANY_TOKEN" "$TENANT_ID")"
node -e 'const rows=JSON.parse(process.argv[1]),a=process.argv[2],b=process.argv[3];if(!rows.some(x=>x.professionalId===a)||!rows.some(x=>x.professionalId===b)){console.error("dashboard professionalId missing",rows);process.exit(1)}' "$DASHBOARD_ASSIGNMENTS" "$PRO_A_ID" "$PRO_B_ID"

TARGET_JOB="$(request POST /v1/company/jobs "$COMPANY_TOKEN" "$TENANT_ID" "{\"title\":\"Bartender Evento\",\"requiredRole\":\"Bartender\",\"workCity\":\"São Paulo\",\"startsAt\":\"$TARGET_START\",\"endsAt\":\"$TARGET_END\",\"payCents\":18000}")"
TARGET_JOB_ID="$(printf '%s' "$TARGET_JOB" | json_field id)"
OUTSIDE_JOB="$(request POST /v1/company/jobs "$COMPANY_TOKEN" "$TENANT_ID" "{\"title\":\"Bartender Fora da Disponibilidade\",\"requiredRole\":\"Bartender\",\"workCity\":\"São Paulo\",\"startsAt\":\"$OUTSIDE_START\",\"endsAt\":\"$OUTSIDE_END\",\"payCents\":18000}")"
OUTSIDE_JOB_ID="$(printf '%s' "$OUTSIDE_JOB" | json_field id)"

TEAM="$(request POST /v1/company/teams "$COMPANY_TOKEN" "$TENANT_ID" '{"name":"Equipe Evento"}')"
TEAM_ID="$(printf '%s' "$TEAM" | json_field id)"
request POST "/v1/company/teams/$TEAM_ID/members" "$COMPANY_TOKEN" "$TENANT_ID" "{\"professionalId\":\"$PRO_A_ID\"}" >/dev/null
request POST "/v1/company/teams/$TEAM_ID/members" "$COMPANY_TOKEN" "$TENANT_ID" "{\"professionalId\":\"$PRO_B_ID\"}" >/dev/null

TEAMS="$(request GET /v1/company/teams "$COMPANY_TOKEN" "$TENANT_ID")"
node -e 'const teams=JSON.parse(process.argv[1]),id=process.argv[2];const t=teams.find(x=>x.id===id);if(!t||t.memberCount!==2){console.error(teams);process.exit(1)}' "$TEAMS" "$TEAM_ID"

MEMBERS="$(request GET "/v1/company/teams/$TEAM_ID/members" "$COMPANY_TOKEN" "$TENANT_ID")"
node -e '
const rows=JSON.parse(process.argv[1]),a=process.argv[2],b=process.argv[3];
const A=rows.find(x=>x.professionalId===a),B=rows.find(x=>x.professionalId===b);
if(!A||!B||A.displayName!=="Bartender São Paulo"||B.displayName!=="Cozinha Rio"){console.error("team members assertion failed",rows);process.exit(1)}
' "$MEMBERS" "$PRO_A_ID" "$PRO_B_ID"


# A second real workspace proves both job and team isolation without modifying allocation.
OTHER_EMAIL="allocation-other-$STAMP@example.test"
OTHER_SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$OTHER_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"Allocation B\"}")"
OTHER_TENANT="$(printf '%s' "$OTHER_SIGNUP" | json_field tenantId)"
OTHER_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$OTHER_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
OTHER_JOB="$(request POST /v1/company/jobs "$OTHER_TOKEN" "$OTHER_TENANT" "{\"title\":\"B own job\",\"requiredRole\":\"Bartender\",\"workCity\":\"São Paulo\",\"startsAt\":\"$TARGET_START\",\"endsAt\":\"$TARGET_END\",\"payCents\":18000}")"
OTHER_JOB_ID="$(printf '%s' "$OTHER_JOB" | json_field id)"
OTHER_TEAM="$(request POST /v1/company/teams "$OTHER_TOKEN" "$OTHER_TENANT" '{"name":"B empty team"}')"
OTHER_TEAM_ID="$(printf '%s' "$OTHER_TEAM" | json_field id)"
A_ASSIGN_BEFORE="$(request GET /v1/assignments/mine "$PRO_A_TOKEN")"
B_ASSIGN_BEFORE="$(request GET /v1/assignments/mine "$PRO_B_TOKEN")"
A_EARNINGS_BEFORE="$(request GET /v1/earnings/mine "$PRO_A_TOKEN")"
B_EARNINGS_BEFORE="$(request GET /v1/earnings/mine "$PRO_B_TOKEN")"
A_ALERTS_BEFORE="$(request GET /v1/notifications/mine "$PRO_A_TOKEN")"
B_ALERTS_BEFORE="$(request GET /v1/notifications/mine "$PRO_B_TOKEN")"
allocation_status(){ local team="$1" job="$2" token="$3" tenant="$4"; curl -sS -o "$ALLOCATION_INPUT_DIR/response.json" -w '%{http_code}' "$BASE_URL/v1/company/teams/$team/allocation/$job" -H "authorization: Bearer $token" -H "x-tenant-id: $tenant"; }
for id in not-a-uuid 42 "$TEAM_ID"x; do
 test "$(allocation_status "$TEAM_ID" "$id" "$COMPANY_TOKEN" "$TENANT_ID")" = 400
 test "$(json_field message < "$ALLOCATION_INPUT_DIR/response.json")" = job_invalid
 test "$(allocation_status "$id" "$TARGET_JOB_ID" "$COMPANY_TOKEN" "$TENANT_ID")" = 400
 test "$(json_field message < "$ALLOCATION_INPUT_DIR/response.json")" = team_not_found
done
for spec in "bad|$TENANT_ID|401" "$COMPANY_TOKEN||400" "$COMPANY_TOKEN|$OTHER_TENANT|401" "$PRO_A_TOKEN|$TENANT_ID|403"; do
 IFS='|' read -r token tenant expected <<< "$spec"
 test "$(allocation_status not-a-uuid not-a-uuid "$token" "$tenant")" = "$expected"
done
for id in 00000000-0000-0000-0000-000000000000 "$OTHER_JOB_ID"; do
 test "$(allocation_status not-a-uuid "$id" "$COMPANY_TOKEN" "$TENANT_ID")" = 400
 test "$(json_field message < "$ALLOCATION_INPUT_DIR/response.json")" = job_not_found
done
for id in 00000000-0000-0000-0000-000000000000 "$OTHER_TEAM_ID"; do
 test "$(allocation_status "$id" "$TARGET_JOB_ID" "$COMPANY_TOKEN" "$TENANT_ID")" = 400
 test "$(json_field message < "$ALLOCATION_INPUT_DIR/response.json")" = team_not_found
done
test "$(allocation_status "$OTHER_TEAM_ID" "$TARGET_JOB_ID" "$OTHER_TOKEN" "$OTHER_TENANT")" = 400
test "$(json_field message < "$ALLOCATION_INPUT_DIR/response.json")" = job_not_found
test "$(allocation_status "$OTHER_TEAM_ID" "$OTHER_JOB_ID" "$OTHER_TOKEN" "$OTHER_TENANT")" = 400
test "$(json_field message < "$ALLOCATION_INPUT_DIR/response.json")" = team_empty
test "$(request GET /v1/company/teams "$COMPANY_TOKEN" "$TENANT_ID")" = "$TEAMS"
test "$(request GET "/v1/company/teams/$TEAM_ID/members" "$COMPANY_TOKEN" "$TENANT_ID")" = "$MEMBERS"
test "$(request GET /v1/assignments/mine "$PRO_A_TOKEN")" = "$A_ASSIGN_BEFORE"
test "$(request GET /v1/assignments/mine "$PRO_B_TOKEN")" = "$B_ASSIGN_BEFORE"
test "$(request GET /v1/earnings/mine "$PRO_A_TOKEN")" = "$A_EARNINGS_BEFORE"
test "$(request GET /v1/earnings/mine "$PRO_B_TOKEN")" = "$B_EARNINGS_BEFORE"
test "$(request GET /v1/notifications/mine "$PRO_A_TOKEN")" = "$A_ALERTS_BEFORE"
test "$(request GET /v1/notifications/mine "$PRO_B_TOKEN")" = "$B_ALERTS_BEFORE"
echo 'PASS: team allocation malformed UUIDs authority missing or foreign job and team and empty team retain scoped factual errors without writes'

ALLOCATION="$(request GET "/v1/company/teams/$TEAM_ID/allocation/$TARGET_JOB_ID" "$COMPANY_TOKEN" "$TENANT_ID")"
node -e '
const rows=JSON.parse(process.argv[1]),a=process.argv[2],b=process.argv[3];
const A=rows.find(x=>x.professionalId===a),B=rows.find(x=>x.professionalId===b);
if(!A||!B||!(A.score>B.score)){console.error("ranking assertion failed",rows);process.exit(1)}
if(!A.reasons.includes("alta compatibilidade com a função")||!A.reasons.includes("próximo do local")){console.error("real signal reasons missing",A);process.exit(1)}
' "$ALLOCATION" "$PRO_A_ID" "$PRO_B_ID"

OUTSIDE_ALLOCATION="$(request GET "/v1/company/teams/$TEAM_ID/allocation/$OUTSIDE_JOB_ID" "$COMPANY_TOKEN" "$TENANT_ID")"
node -e 'const rows=JSON.parse(process.argv[1]);if(rows.length!==0){console.error("availability network assertion failed",rows);process.exit(1)}' "$OUTSIDE_ALLOCATION"

test "$(request GET "/v1/company/teams/$TEAM_ID/allocation/$TARGET_JOB_ID" "$COMPANY_TOKEN" "$TENANT_ID")" = "$ALLOCATION"
test "$(request GET /v1/assignments/mine "$PRO_A_TOKEN")" = "$A_ASSIGN_BEFORE"
test "$(request GET /v1/earnings/mine "$PRO_A_TOKEN")" = "$A_EARNINGS_BEFORE"
test "$(request GET /v1/notifications/mine "$PRO_A_TOKEN")" = "$A_ALERTS_BEFORE"
echo 'PASS: team allocation retains real role city ranking reasons and unavailable empty list without mutating journey facts'

request DELETE "/v1/company/teams/$TEAM_ID/members/$PRO_B_ID" "$COMPANY_TOKEN" "$TENANT_ID" >/dev/null
MEMBERS_AFTER="$(request GET "/v1/company/teams/$TEAM_ID/members" "$COMPANY_TOKEN" "$TENANT_ID")"
node -e 'const rows=JSON.parse(process.argv[1]),a=process.argv[2],b=process.argv[3];if(rows.length!==1||rows[0].professionalId!==a||rows.some(x=>x.professionalId===b)){console.error("team remove assertion failed",rows);process.exit(1)}' "$MEMBERS_AFTER" "$PRO_A_ID" "$PRO_B_ID"
TEAMS_AFTER="$(request GET /v1/company/teams "$COMPANY_TOKEN" "$TENANT_ID")"
node -e 'const teams=JSON.parse(process.argv[1]),id=process.argv[2];const t=teams.find(x=>x.id===id);if(!t||t.memberCount!==1){console.error("member count after remove failed",teams);process.exit(1)}' "$TEAMS_AFTER" "$TEAM_ID"

request POST /v1/auth/signout "$OTHER_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$PRO_A_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$PRO_B_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$COMPANY_TOKEN" '' '{}' >/dev/null

echo 'PASS: team allocation + mobile team member operations use real business data without technical IDs'
