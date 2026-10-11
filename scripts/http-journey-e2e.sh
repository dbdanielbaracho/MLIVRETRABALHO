#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
[[ "$BASE_URL" =~ ^http://(127\.0\.0\.1|localhost):[0-9]+/?$ ]] || { echo 'Local disposable API required' >&2; exit 1; }
GPS_INPUT_DIR="$(mktemp -d)"
trap 'rm -rf "$GPS_INPUT_DIR"' EXIT
STAMP="$(date +%s)-$RANDOM"
PRO_EMAIL="pro-${STAMP}@example.test"
COMPANY_EMAIL="company-${STAMP}@example.test"
COMPANY2_EMAIL="company2-${STAMP}@example.test"
PASSWORD="JourneyPass123!"
START_AT="$(node -e 'process.stdout.write(new Date(Date.now()+24*60*60*1000).toISOString())')"
END_AT="$(node -e 'process.stdout.write(new Date(Date.now()+32*60*60*1000).toISOString())')"
START2_AT="$(node -e 'process.stdout.write(new Date(Date.now()+48*60*60*1000).toISOString())')"
END2_AT="$(node -e 'process.stdout.write(new Date(Date.now()+56*60*60*1000).toISOString())')"
AVAIL_START="$(node -e 'process.stdout.write(new Date(Date.now()+23*60*60*1000).toISOString())')"
AVAIL_END="$(node -e 'process.stdout.write(new Date(Date.now()+57*60*60*1000).toISOString())')"

json_field(){ node -e 'const fs=require("fs");let x=JSON.parse(fs.readFileSync(0,"utf8"));for(const p of process.argv[1].split(".")){if(/^\d+$/.test(p))x=x[Number(p)];else x=x?.[p]}if(x===undefined||x===null)process.exit(2);process.stdout.write(String(x));' "$1"; }
contains(){ [[ "$1" == *"$2"* ]] || { echo "missing expected value: $2" >&2; return 1; }; }
not_contains(){ [[ "$1" != *"$2"* ]] || { echo "unexpected value present: $2" >&2; return 1; }; }
request(){ local method="$1" url="$2" token="${3:-}" tenant="${4:-}" body="${5:-}"; local args=(-sS --fail-with-body -X "$method" "${BASE_URL%/}$url"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$tenant" ]] && args+=(-H "x-tenant-id: $tenant"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }
status_only(){ local method="$1" url="$2" token="$3" tenant="$4"; curl -sS -o /tmp/http-journey-negative.json -w '%{http_code}' -X "$method" "${BASE_URL%/}$url" -H "authorization: Bearer $token" -H "x-tenant-id: $tenant"; }

PRO_SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$PRO_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"professional\"}")"
test "$(printf '%s' "$PRO_SIGNUP" | json_field accountType)" = "professional"
COMPANY_SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$COMPANY_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"HTTP Journey Company A\"}")"
TENANT_ID="$(printf '%s' "$COMPANY_SIGNUP" | json_field tenantId)"
COMPANY2_SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$COMPANY2_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"HTTP Journey Company B\"}")"
TENANT2_ID="$(printf '%s' "$COMPANY2_SIGNUP" | json_field tenantId)"

test "$(printf '%s' "$COMPANY_SIGNUP" | json_field role)" = "owner"
test "$(printf '%s' "$COMPANY2_SIGNUP" | json_field role)" = "owner"

PRO_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$PRO_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
COMPANY_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$COMPANY_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
COMPANY2_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$COMPANY2_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"

PROFILE="$(request PUT /v1/professional-profile "$PRO_TOKEN" '' '{"displayName":"HTTP Bartender","homeCity":"São Paulo","primaryRole":"Bartender"}')"
PROFESSIONAL_ID="$(printf '%s' "$PROFILE" | json_field id)"

AVAILABILITY="$(request POST /v1/availability/mine "$PRO_TOKEN" '' "{\"startsAt\":\"$AVAIL_START\",\"endsAt\":\"$AVAIL_END\"}")"
contains "$AVAILABILITY" 'startsAt'

JOB="$(request POST /v1/company/jobs "$COMPANY_TOKEN" "$TENANT_ID" "{\"title\":\"Bartender A\",\"requiredRole\":\"Bartender\",\"workCity\":\"São Paulo\",\"location\":\"Centro\",\"startsAt\":\"$START_AT\",\"endsAt\":\"$END_AT\",\"payCents\":25000}")"
JOB_ID="$(printf '%s' "$JOB" | json_field id)"
JOB2="$(request POST /v1/company/jobs "$COMPANY2_TOKEN" "$TENANT2_ID" "{\"title\":\"Bartender B\",\"requiredRole\":\"Bartender\",\"workCity\":\"São Paulo\",\"location\":\"Paulista\",\"startsAt\":\"$START2_AT\",\"endsAt\":\"$END2_AT\",\"payCents\":30000}")"
JOB2_ID="$(printf '%s' "$JOB2" | json_field id)"

COMPANY_JOBS="$(request GET /v1/company/jobs "$COMPANY_TOKEN" "$TENANT_ID")"
contains "$COMPANY_JOBS" "$JOB_ID"
not_contains "$COMPANY_JOBS" "$JOB2_ID"
COMPANY2_JOBS="$(request GET /v1/company/jobs "$COMPANY2_TOKEN" "$TENANT2_ID")"
contains "$COMPANY2_JOBS" "$JOB2_ID"
not_contains "$COMPANY2_JOBS" "$JOB_ID"

JOBS="$(request GET /v1/jobs "$PRO_TOKEN")"
contains "$JOBS" "$JOB_ID"
contains "$JOBS" "$JOB2_ID"


# Marketplace job UUIDs reject before any interest write; valid absent UUID remains a factual null/404.
INTEREST_MINE_BEFORE="$(request GET /v1/assignments/mine "$PRO_TOKEN")"
INTEREST_EARNINGS_BEFORE="$(request GET /v1/earnings/mine "$PRO_TOKEN")"
INTEREST_NOTIFICATIONS_BEFORE="$(request GET /v1/notifications/mine "$PRO_TOKEN")"
INTEREST_BEFORE="$(request GET "/v1/jobs/$JOB_ID/interest" "$PRO_TOKEN")"
for id in invalid bad-id 42; do
 for method in GET POST; do
  code="$(curl -sS -o "$GPS_INPUT_DIR/interest-response.json" -w '%{http_code}' -X "$method" "$BASE_URL/v1/jobs/$id/interest" -H "authorization: Bearer $PRO_TOKEN")"
  test "$code" = 400
  test "$(json_field message < "$GPS_INPUT_DIR/interest-response.json")" = job_invalid
  test "$(status_only "$method" "/v1/jobs/$id/interest" invalid-token '')" = 401
 done
done
test "$(status_only POST /v1/jobs/invalid/interest "$COMPANY_TOKEN" '')" = 404
test "$(request GET /v1/jobs/00000000-0000-0000-0000-000000000000/interest "$PRO_TOKEN")" = null
test "$(status_only POST /v1/jobs/00000000-0000-0000-0000-000000000000/interest "$PRO_TOKEN" '')" = 404
test "$(request GET "/v1/jobs/$JOB_ID/interest" "$PRO_TOKEN")" = "$INTEREST_BEFORE"
test "$(request GET /v1/assignments/mine "$PRO_TOKEN")" = "$INTEREST_MINE_BEFORE"
test "$(request GET /v1/earnings/mine "$PRO_TOKEN")" = "$INTEREST_EARNINGS_BEFORE"
test "$(request GET /v1/notifications/mine "$PRO_TOKEN")" = "$INTEREST_NOTIFICATIONS_BEFORE"
echo 'PASS: malformed marketplace job UUIDs reject after authority without creating real interests assignments notifications or earnings'

for JOBX in "$JOB_ID" "$JOB2_ID"; do
  test "$(request POST "/v1/jobs/$JOBX/interest" "$PRO_TOKEN" | json_field status)" = "interested"
done


for JOBX in "$JOB_ID" "$JOB2_ID"; do
 test "$(request GET "/v1/jobs/$JOBX/interest" "$PRO_TOKEN" | json_field status)" = interested
 test "$(request GET "/v1/jobs/$JOBX/interest" "$COMPANY_TOKEN")" = null
done

RECOMMENDATIONS="$(request GET "/v1/company/jobs/$JOB_ID/recommendations" "$COMPANY_TOKEN" "$TENANT_ID")"
contains "$RECOMMENDATIONS" "$PROFESSIONAL_ID"
RECOMMENDATIONS2="$(request GET "/v1/company/jobs/$JOB2_ID/recommendations" "$COMPANY2_TOKEN" "$TENANT2_ID")"
contains "$RECOMMENDATIONS2" "$PROFESSIONAL_ID"


# Malformed confirmations cannot create assignments, memberships or notifications.
CONFIRM_MEMBERS_BEFORE="$(request GET /v1/me "$PRO_TOKEN")"
CONFIRM_ASSIGN_BEFORE="$(request GET /v1/assignments/mine "$PRO_TOKEN")"
CONFIRM_EARNINGS_BEFORE="$(request GET /v1/earnings/mine "$PRO_TOKEN")"
CONFIRM_NOTIFICATIONS_BEFORE="$(request GET /v1/notifications/mine "$PRO_TOKEN")"
CONFIRM_CANDIDATES_BEFORE="$(request GET "/v1/company/jobs/$JOB_ID/candidates" "$COMPANY_TOKEN" "$TENANT_ID")"
node - "$GPS_INPUT_DIR" "$PROFESSIONAL_ID" <<'NODE'
const fs=require('fs'),dir=process.argv[2],pro=process.argv[3];
const bad=[null,false,true,42,'text',[],{},...[undefined,null,false,42,[],{},[pro],'','invalid'].map(professionalId=>({professionalId}))];
bad.forEach((body,i)=>fs.writeFileSync(dir+'/bad-confirm-'+i+'.json',JSON.stringify(body)));
NODE
for payload in "$GPS_INPUT_DIR"/bad-confirm-*.json; do
 code="$(curl -sS -o "$GPS_INPUT_DIR/confirm-response.json" -w '%{http_code}' -X POST "$BASE_URL/v1/company/jobs/$JOB_ID/confirm" -H "authorization: Bearer $COMPANY_TOKEN" -H "x-tenant-id: $TENANT_ID" -H 'content-type: application/json' --data-binary "@$payload")"
 test "$code" = 400
 test "$(json_field message < "$GPS_INPUT_DIR/confirm-response.json")" = professional_required
done
for id in invalid bad-id 42; do
 for suffix in candidates recommendations; do
  test "$(status_only GET "/v1/company/jobs/$id/$suffix" "$COMPANY_TOKEN" "$TENANT_ID")" = 400
 done
 code="$(curl -sS -o "$GPS_INPUT_DIR/confirm-response.json" -w '%{http_code}' -X POST "$BASE_URL/v1/company/jobs/$id/confirm" -H "authorization: Bearer $COMPANY_TOKEN" -H "x-tenant-id: $TENANT_ID" -H 'content-type: application/json' --data "{\"professionalId\":\"$PROFESSIONAL_ID\"}")"
 test "$code" = 400
 test "$(json_field message < "$GPS_INPUT_DIR/confirm-response.json")" = job_invalid
done
for fixture in auth tenant membership; do
 token="$COMPANY_TOKEN"
 tenant="$TENANT_ID"
 expected=401
 case "$fixture" in auth) token=invalid-token ;; tenant) tenant=''; expected=400 ;; membership) tenant="$TENANT2_ID" ;; esac
 code="$(curl -sS -o "$GPS_INPUT_DIR/confirm-response.json" -w '%{http_code}' -X POST "$BASE_URL/v1/company/jobs/invalid/confirm" -H "authorization: Bearer $token" -H "x-tenant-id: $tenant" -H 'content-type: application/json' --data null)"
 test "$code" = "$expected"
done
test "$(request GET /v1/me "$PRO_TOKEN")" = "$CONFIRM_MEMBERS_BEFORE"
test "$(request GET /v1/assignments/mine "$PRO_TOKEN")" = "$CONFIRM_ASSIGN_BEFORE"
test "$(request GET /v1/earnings/mine "$PRO_TOKEN")" = "$CONFIRM_EARNINGS_BEFORE"
test "$(request GET /v1/notifications/mine "$PRO_TOKEN")" = "$CONFIRM_NOTIFICATIONS_BEFORE"
test "$(request GET "/v1/company/jobs/$JOB_ID/candidates" "$COMPANY_TOKEN" "$TENANT_ID")" = "$CONFIRM_CANDIDATES_BEFORE"
echo 'PASS: malformed company confirmation JSON and job UUIDs reject before changing real assignments memberships interests notifications or earnings'

CONFIRM="$(request POST "/v1/company/jobs/$JOB_ID/confirm" "$COMPANY_TOKEN" "$TENANT_ID" "{\"professionalId\":\"$PROFESSIONAL_ID\"}")"
ASSIGNMENT_ID="$(printf '%s' "$CONFIRM" | json_field id)"
CONFIRM2="$(request POST "/v1/company/jobs/$JOB2_ID/confirm" "$COMPANY2_TOKEN" "$TENANT2_ID" "{\"professionalId\":\"$PROFESSIONAL_ID\"}")"
ASSIGNMENT2_ID="$(printf '%s' "$CONFIRM2" | json_field id)"
test "$(printf '%s' "$CONFIRM" | json_field tenantId)" = "$TENANT_ID"
test "$(printf '%s' "$CONFIRM2" | json_field tenantId)" = "$TENANT2_ID"


# Confirmed replay returns the real original assignment/date and cannot duplicate notifications.
CONFIRM_REPLAY_NOTIFICATIONS="$(request GET /v1/notifications/mine "$PRO_TOKEN")"
node - "$CONFIRM_REPLAY_NOTIFICATIONS" "$TENANT_ID" "$TENANT2_ID" <<'NODE'
const rows=JSON.parse(process.argv[2]);if(rows.length!==2||rows.some(x=>x.type!=='assignment_confirmed')||!rows.some(x=>x.tenantId===process.argv[3])||!rows.some(x=>x.tenantId===process.argv[4]))throw Error('expected one real confirmation notification per tenant');
NODE
CONFIRM_REPLAY_MEMBERS="$(request GET /v1/me "$PRO_TOKEN")"
CONFIRM_REPLAY_MINE="$(request GET /v1/assignments/mine "$PRO_TOKEN")"
REPLAY="$(request POST "/v1/company/jobs/$JOB_ID/confirm" "$COMPANY_TOKEN" "$TENANT_ID" "{\"professionalId\":\"$PROFESSIONAL_ID\",\"tenantId\":\"spoof\"}")"
node - "$CONFIRM" "$REPLAY" "$JOB_ID" "$PROFESSIONAL_ID" "$TENANT_ID" <<'NODE'
const ack=JSON.parse(process.argv[2]),replay=JSON.parse(process.argv[3]);
if(!ack.id||ack.jobId!==process.argv[4]||ack.professionalId!==process.argv[5]||ack.tenantId!==process.argv[6]||ack.status!=='confirmed'||!Number.isFinite(Date.parse(ack.confirmedAt))||JSON.stringify(ack)!==JSON.stringify(replay))throw Error('confirmed replay lost actual assignment identity tenant status or immutable timestamp');
NODE
for payload in "$GPS_INPUT_DIR"/bad-confirm-*.json; do
 code="$(curl -sS -o "$GPS_INPUT_DIR/confirm-response.json" -w '%{http_code}' -X POST "$BASE_URL/v1/company/jobs/$JOB_ID/confirm" -H "authorization: Bearer $COMPANY_TOKEN" -H "x-tenant-id: $TENANT_ID" -H 'content-type: application/json' --data-binary "@$payload")"
 test "$code" = 400
 test "$(json_field message < "$GPS_INPUT_DIR/confirm-response.json")" = professional_required
done
test "$(curl -sS -o "$GPS_INPUT_DIR/confirm-response.json" -w '%{http_code}' -X POST "$BASE_URL/v1/company/jobs/$JOB_ID/confirm" -H "authorization: Bearer $PRO_TOKEN" -H "x-tenant-id: $TENANT_ID" -H 'content-type: application/json' --data null)" = 403
test "$(json_field message < "$GPS_INPUT_DIR/confirm-response.json")" = company_role_required
test "$(request GET /v1/notifications/mine "$PRO_TOKEN")" = "$CONFIRM_REPLAY_NOTIFICATIONS"
test "$(request GET /v1/me "$PRO_TOKEN")" = "$CONFIRM_REPLAY_MEMBERS"
test "$(request GET /v1/assignments/mine "$PRO_TOKEN")" = "$CONFIRM_REPLAY_MINE"
echo 'PASS: company confirmation retains real scoped ACK immutable replay date trusted membership and one notification without malformed overwrite'


# A later interest POST retains the real confirmed status and creates no new assignment/notification.
for JOBX in "$JOB_ID" "$JOB2_ID"; do
 test "$(request POST "/v1/jobs/$JOBX/interest" "$PRO_TOKEN" | json_field status)" = confirmed
 test "$(request GET "/v1/jobs/$JOBX/interest" "$PRO_TOKEN" | json_field status)" = confirmed
done
test "$(request GET /v1/notifications/mine "$PRO_TOKEN")" = "$CONFIRM_REPLAY_NOTIFICATIONS"
test "$(request GET /v1/assignments/mine "$PRO_TOKEN")" = "$CONFIRM_REPLAY_MINE"
echo 'PASS: marketplace interests retain real owner scoped reads absent NULL and confirmed replay without duplicate assignments or notifications'

PRO_ME="$(request GET /v1/me "$PRO_TOKEN")"
contains "$PRO_ME" "$TENANT_ID"
contains "$PRO_ME" "$TENANT2_ID"

MINE="$(request GET /v1/assignments/mine "$PRO_TOKEN")"
contains "$MINE" "$ASSIGNMENT_ID"
contains "$MINE" "$ASSIGNMENT2_ID"
contains "$MINE" "$TENANT_ID"
contains "$MINE" "$TENANT2_ID"

COMPANY_ASSIGNMENTS="$(request GET /v1/company/dashboard/assignments "$COMPANY2_TOKEN" "$TENANT2_ID")"
contains "$COMPANY_ASSIGNMENTS" "$ASSIGNMENT2_ID"
not_contains "$COMPANY_ASSIGNMENTS" "$ASSIGNMENT_ID"
REPLACEMENT="$(request POST "/v1/company/replacements/$ASSIGNMENT2_ID" "$COMPANY2_TOKEN" "$TENANT2_ID" '{"reason":"Imprevisto operacional"}')"
REPLACEMENT_ID="$(printf '%s' "$REPLACEMENT" | json_field id)"
REPLACEMENTS="$(request GET /v1/company/replacements "$COMPANY2_TOKEN" "$TENANT2_ID")"
contains "$REPLACEMENTS" "$REPLACEMENT_ID"
contains "$REPLACEMENTS" "$ASSIGNMENT2_ID"


# Malformed content must produce no message or notification for either actor.
json_equal(){ node -e 'require("node:assert/strict").deepEqual(JSON.parse(require("fs").readFileSync(0,"utf8")),JSON.parse(process.argv[1]))' -- "$1"; }
bad_message_status(){ local method="$1" id="$2" token="$3" tenant="$4" body="$5"; curl -sS -o /tmp/message-input-negative.json -w '%{http_code}' -X "$method" "$BASE_URL/v1/conversations/$id/messages" -H "authorization: Bearer $token" -H "x-tenant-id: $tenant" -H 'content-type: application/json' --data "$body"; }
PRO_ALERTS="$(request GET /v1/notifications/mine "$PRO_TOKEN" "$TENANT_ID")"
COMPANY_ALERTS="$(request GET /v1/notifications/mine "$COMPANY_TOKEN" "$TENANT_ID")"
INVALID_MESSAGE="$(node -e 'for(const b of [null,[],42,true,"text",{},...[42,true,false,[],{},["Hello"],null," "].map(body=>({body}))])process.stdout.write(JSON.stringify(b)+"\n")')"
test "$(bad_message_status POST not-a-uuid '' "$TENANT_ID" 'null')" = 401
test "$(bad_message_status POST "$ASSIGNMENT_ID" "$COMPANY_TOKEN" "$TENANT2_ID" 'null')" = 401
for token in "$PRO_TOKEN" "$COMPANY_TOKEN"; do
  for method in GET POST; do
    test "$(bad_message_status "$method" not-a-uuid "$token" "$TENANT_ID" '{"body":"fixture"}')" = 400
  done
  while IFS= read -r body; do
    test "$(bad_message_status POST "$ASSIGNMENT_ID" "$token" "$TENANT_ID" "$body")" = 400
    request GET "/v1/conversations/$ASSIGNMENT_ID/messages" "$token" "$TENANT_ID" | json_equal '[]'
    request GET /v1/notifications/mine "$PRO_TOKEN" "$TENANT_ID" | json_equal "$PRO_ALERTS"
    request GET /v1/notifications/mine "$COMPANY_TOKEN" "$TENANT_ID" | json_equal "$COMPANY_ALERTS"
  done <<< "$INVALID_MESSAGE"
done
echo 'PASS: conversation malformed input rejects 400 without messages or notifications'

COMPANY_MESSAGE="$(request POST "/v1/conversations/$ASSIGNMENT_ID/messages" "$COMPANY_TOKEN" "$TENANT_ID" '{"body":"Olá, confirme seu horário."}')"
contains "$COMPANY_MESSAGE" 'confirme seu horário'
PRO_MESSAGES="$(request GET "/v1/conversations/$ASSIGNMENT_ID/messages" "$PRO_TOKEN" "$TENANT_ID")"
contains "$PRO_MESSAGES" 'confirme seu horário'
PRO_NOTIFICATIONS="$(request GET /v1/notifications/mine "$PRO_TOKEN" "$TENANT_ID")"
contains "$PRO_NOTIFICATIONS" 'new_message'
PRO_REPLY="$(request POST "/v1/conversations/$ASSIGNMENT_ID/messages" "$PRO_TOKEN" "$TENANT_ID" '{"body":"Confirmado, estarei no horário."}')"
contains "$PRO_REPLY" 'Confirmado'
COMPANY_NOTIFICATIONS="$(request GET /v1/notifications/mine "$COMPANY_TOKEN" "$TENANT_ID")"
contains "$COMPANY_NOTIFICATIONS" 'new_message'
WRONG_TENANT_STATUS="$(status_only GET "/v1/conversations/$ASSIGNMENT_ID/messages" "$COMPANY2_TOKEN" "$TENANT2_ID")"
test "$WRONG_TENANT_STATUS" = "404"

# Every operational route must reject malformed IDs without changing real state or earnings.
TRANSITION_MINE_BEFORE="$(request GET /v1/assignments/mine "$PRO_TOKEN")"
TRANSITION_EARNINGS_BEFORE="$(request GET /v1/earnings/mine "$PRO_TOKEN")"
for step in check-in start check-out complete; do
 for id in not-a-uuid 42 "${ASSIGNMENT_ID}x"; do
  test "$(status_only POST "/v1/assignments/$id/$step" "$PRO_TOKEN" "$TENANT_ID")" = "400"
 done
 test "$(status_only POST "/v1/assignments/not-a-uuid/$step" '' "$TENANT_ID")" = "401"
 test "$(status_only POST "/v1/assignments/not-a-uuid/$step" "$PRO_TOKEN" '')" = "400"
 test "$(status_only POST "/v1/assignments/not-a-uuid/$step" "$COMPANY2_TOKEN" "$TENANT_ID")" = "401"
 test "$(status_only POST "/v1/assignments/$ASSIGNMENT_ID/$step" "$PRO_TOKEN" "$TENANT2_ID")" = "400"
 test "$(status_only POST "/v1/assignments/$ASSIGNMENT_ID/$step" "$COMPANY_TOKEN" "$TENANT_ID")" = "404"
done
test "$(request GET /v1/assignments/mine "$PRO_TOKEN")" = "$TRANSITION_MINE_BEFORE"
test "$(request GET /v1/earnings/mine "$PRO_TOKEN")" = "$TRANSITION_EARNINGS_BEFORE"
echo 'PASS: assignment malformed UUID and tenant or actor failures preserve real assignments and earnings'

# Invalid GPS types must never become invented 0,0 coordinates or mutate operational state.
GPS_MINE_BEFORE="$(request GET /v1/assignments/mine "$PRO_TOKEN")"
GPS_EARNINGS_BEFORE="$(request GET /v1/earnings/mine "$PRO_TOKEN")"
node - "$GPS_INPUT_DIR" <<'NODE'
const fs=require('fs'),dir=process.argv[2];
const cases=[
 ...[false,true,42,'text',[],[{lat:1,lng:1}]].map(body=>({body,error:'location_invalid'})),
 ...[false,true,'','0',[],[0],{}].map(lat=>({body:{lat,lng:1},error:'latitude_invalid'})),
 ...[false,true,'','0',[],[0],{}].map(lng=>({body:{lat:1,lng},error:'longitude_invalid'})),
 ...[{lat:1},{lng:1},{lat:null,lng:1},{lat:1,lng:null}].map(body=>({body,error:'location_pair_required'})),
 ...[{lat:91,lng:1},{lat:-91,lng:1}].map(body=>({body,error:'latitude_invalid'})),
 ...[{lat:1,lng:181},{lat:1,lng:-181}].map(body=>({body,error:'longitude_invalid'}))
];
cases.forEach((value,i)=>fs.writeFileSync(dir+'/gps-'+i+'.json',JSON.stringify(value)));
NODE
for step in check-in check-out; do
 for payload in "$GPS_INPUT_DIR"/gps-*.json; do
  body="$(node -e 'process.stdout.write(JSON.stringify(JSON.parse(require("fs").readFileSync(process.argv[1],"utf8")).body))' "$payload")"
  expected="$(node -e 'process.stdout.write(JSON.parse(require("fs").readFileSync(process.argv[1],"utf8")).error)' "$payload")"
  code="$(curl -sS -o "$GPS_INPUT_DIR/response.json" -w '%{http_code}' -X POST "$BASE_URL/v1/assignments/$ASSIGNMENT_ID/$step" -H "authorization: Bearer $PRO_TOKEN" -H "x-tenant-id: $TENANT_ID" -H 'content-type: application/json' --data "$body")"
  test "$code" = "400"
  test "$(json_field message < "$GPS_INPUT_DIR/response.json")" = "$expected"
 done
done
test "$(request GET /v1/assignments/mine "$PRO_TOKEN")" = "$GPS_MINE_BEFORE"
test "$(request GET /v1/earnings/mine "$PRO_TOKEN")" = "$GPS_EARNINGS_BEFORE"
echo 'PASS: malformed GPS JSON and non-numeric coordinates reject without invented coordinates or real assignment mutations'

for STEP in check-in start check-out complete; do
  STATUS="$(case "$STEP" in check-in) echo checked_in;; start) echo in_progress;; check-out) echo checked_out;; complete) echo completed;; esac)"
  TRANSITION_ACK="$(request POST "/v1/assignments/$ASSIGNMENT_ID/$STEP" "$PRO_TOKEN" "$TENANT_ID" '{}')"
  test "$(printf '%s' "$TRANSITION_ACK" | json_field status)" = "$STATUS"
  node - "$TRANSITION_ACK" "$ASSIGNMENT_ID" "$STEP" <<'NODE'
const row=JSON.parse(process.argv[2]),id=process.argv[3],step=process.argv[4];
const field={'check-in':'checkedInAt','check-out':'checkedOutAt',complete:'completedAt'}[step];
if(row.id!==id||field&&!Number.isFinite(Date.parse(row[field])))throw Error('actual assignment ACK or timestamp lost');
NODE
  if [[ "$STEP" == "complete" ]]; then COMPLETION_EARNINGS_BEFORE_REPLAY="$(request GET /v1/earnings/mine "$PRO_TOKEN")"; fi
  test "$(status_only POST "/v1/assignments/$ASSIGNMENT_ID/$STEP" "$PRO_TOKEN" "$TENANT_ID")" = "400"
  if [[ "$STEP" == "complete" ]]; then test "$(request GET /v1/earnings/mine "$PRO_TOKEN")" = "$COMPLETION_EARNINGS_BEFORE_REPLAY"; fi
done

EARNINGS="$(request GET /v1/earnings/mine "$PRO_TOKEN")"
contains "$EARNINGS" '25000'
contains "$EARNINGS" "$TENANT_ID"
EARNINGS_AFTER_REPLAY="$(request GET /v1/earnings/mine "$PRO_TOKEN")"
test "$EARNINGS_AFTER_REPLAY" = "$EARNINGS"
echo 'PASS: assignment lifecycle returns real timestamps without GPS and rejects replay without duplicate earnings'

# Separate company-B fixture verifies numerical zero and bounds; company-A flow above remained GPS-optional.
GPS_VALID_IN="$(request POST "/v1/assignments/$ASSIGNMENT2_ID/check-in" "$PRO_TOKEN" "$TENANT2_ID" '{"lat":0,"lng":0}')"
GPS_VALID_OUT="$(request POST "/v1/assignments/$ASSIGNMENT2_ID/check-out" "$PRO_TOKEN" "$TENANT2_ID" '{"lat":90,"lng":180}')"
node - "$GPS_VALID_IN" "$GPS_VALID_OUT" "$ASSIGNMENT2_ID" <<'NODE'
const rows=[JSON.parse(process.argv[2]),JSON.parse(process.argv[3])],id=process.argv[4];
for(const [i,row] of rows.entries()){
 if(row.id!==id||row.status!==['checked_in','checked_out'][i]||!Number.isFinite(Date.parse(row[['checkedInAt','checkedOutAt'][i]])))throw Error('valid numerical GPS lost actual ACK or timestamp');
}
NODE
test "$(request GET /v1/earnings/mine "$PRO_TOKEN")" = "$EARNINGS"
echo 'PASS: GPS remains optional while numerical zero and bounds retain real lifecycle ACKs without new earnings'

RATING="$(request POST "/v1/assignments/$ASSIGNMENT_ID/rating" "$COMPANY_TOKEN" "$TENANT_ID" '{"score":5,"comment":"Excelente"}')"
test "$(printf '%s' "$RATING" | json_field score)" = "5"

COMPLETED="$(request GET /v1/company/dashboard/completed "$COMPANY_TOKEN" "$TENANT_ID")"
contains "$COMPLETED" "$PROFESSIONAL_ID"
PREFERRED="$(request POST /v1/company/talent-pools "$COMPANY_TOKEN" "$TENANT_ID" "{\"professionalId\":\"$PROFESSIONAL_ID\",\"pool\":\"preferred\"}")"
test "$(printf '%s' "$PREFERRED" | json_field professionalId)" = "$PROFESSIONAL_ID"
test "$(printf '%s' "$PREFERRED" | json_field pool)" = "preferred"
TALENT_POOL="$(request GET /v1/company/talent-pools "$COMPANY_TOKEN" "$TENANT_ID")"
contains "$TALENT_POOL" "$PROFESSIONAL_ID"
contains "$TALENT_POOL" 'preferred'

PASSPORT="$(request GET /v1/work-passport/mine "$PRO_TOKEN")"
node -e 'const p=JSON.parse(process.argv[1]);const tenant=process.argv[2];if(p.completedWorkCount!==1||p.ratingCount!==1||p.averageRating!==5||!p.verifiedHistory?.some(x=>x.tenantId===tenant)){console.error("passport assertion failed",JSON.stringify(p));process.exit(1)}' "$PASSPORT" "$TENANT_ID"

request POST /v1/auth/signout "$PRO_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$COMPANY_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$COMPANY2_TOKEN" '' '{}' >/dev/null

echo "PASS: HTTP journey multi-company + company jobs/chat/notifications/replacements/talent-pool"
