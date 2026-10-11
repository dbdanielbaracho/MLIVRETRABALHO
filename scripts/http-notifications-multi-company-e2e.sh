#!/usr/bin/env bash
set -euo pipefail
BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
if [[ ! "$BASE_URL" =~ ^http://(127\.0\.0\.1|localhost):[0-9]+/?$ ]]; then
 echo "HTTP notification fixtures require a local API on an explicit port" >&2
 exit 1
fi
NOTIFY_INPUT_DIR="$(mktemp -d)"
trap 'rm -rf "$NOTIFY_INPUT_DIR"' EXIT
STAMP="$(date +%s)-$RANDOM"
PASSWORD='NotifyPass123!'
START_A="$(node -e 'process.stdout.write(new Date(Date.now()+24*60*60*1000).toISOString())')"
END_A="$(node -e 'process.stdout.write(new Date(Date.now()+32*60*60*1000).toISOString())')"
START_B="$(node -e 'process.stdout.write(new Date(Date.now()+48*60*60*1000).toISOString())')"
END_B="$(node -e 'process.stdout.write(new Date(Date.now()+56*60*60*1000).toISOString())')"
json_field(){ node -e 'const fs=require("fs");let x=JSON.parse(fs.readFileSync(0,"utf8"));for(const p of process.argv[1].split(".")){if(/^\d+$/.test(p))x=x[Number(p)];else x=x?.[p]}if(x===undefined||x===null)process.exit(2);process.stdout.write(String(x));' "$1"; }
request(){ local method="$1" url="$2" token="${3:-}" tenant="${4:-}" body="${5:-}"; local args=(-sS --fail-with-body -X "$method" "${BASE_URL%/}$url"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$tenant" ]] && args+=(-H "x-tenant-id: $tenant"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }
status_only(){ local method="$1" url="$2" token="$3" tenant="$4"; curl -sS -o "$NOTIFY_INPUT_DIR/negative.json" -w '%{http_code}' -X "$method" "${BASE_URL%/}$url" -H "authorization: Bearer $token" -H "x-tenant-id: $tenant"; }
PRO_EMAIL="notify-pro-${STAMP}@example.test"; A_EMAIL="notify-a-${STAMP}@example.test"; B_EMAIL="notify-b-${STAMP}@example.test"
PRO_SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$PRO_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"professional\"}")"
A_SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$A_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"Notify A\"}")"
B_SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$B_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"Notify B\"}")"
TENANT_A="$(printf '%s' "$A_SIGNUP"|json_field tenantId)"; TENANT_B="$(printf '%s' "$B_SIGNUP"|json_field tenantId)"
PRO_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$PRO_EMAIL\",\"password\":\"$PASSWORD\"}"|json_field accessToken)"
A_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$A_EMAIL\",\"password\":\"$PASSWORD\"}"|json_field accessToken)"
B_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$B_EMAIL\",\"password\":\"$PASSWORD\"}"|json_field accessToken)"
PROFILE="$(request PUT /v1/professional-profile "$PRO_TOKEN" '' '{"displayName":"Notify Pro","homeCity":"São Paulo","primaryRole":"Garçom"}')"; PRO_ID="$(printf '%s' "$PROFILE"|json_field id)"
JOB_A="$(request POST /v1/company/jobs "$A_TOKEN" "$TENANT_A" "{\"title\":\"Garçom A\",\"requiredRole\":\"Garçom\",\"workCity\":\"São Paulo\",\"startsAt\":\"$START_A\",\"endsAt\":\"$END_A\",\"payCents\":10000}")"; JOB_A_ID="$(printf '%s' "$JOB_A"|json_field id)"
JOB_B="$(request POST /v1/company/jobs "$B_TOKEN" "$TENANT_B" "{\"title\":\"Garçom B\",\"requiredRole\":\"Garçom\",\"workCity\":\"São Paulo\",\"startsAt\":\"$START_B\",\"endsAt\":\"$END_B\",\"payCents\":11000}")"; JOB_B_ID="$(printf '%s' "$JOB_B"|json_field id)"
request POST "/v1/jobs/$JOB_A_ID/interest" "$PRO_TOKEN" >/dev/null
request POST "/v1/jobs/$JOB_B_ID/interest" "$PRO_TOKEN" >/dev/null
request POST "/v1/company/jobs/$JOB_A_ID/confirm" "$A_TOKEN" "$TENANT_A" "{\"professionalId\":\"$PRO_ID\"}" >/dev/null
request POST "/v1/company/jobs/$JOB_B_ID/confirm" "$B_TOKEN" "$TENANT_B" "{\"professionalId\":\"$PRO_ID\"}" >/dev/null
NOTIFS="$(request GET /v1/notifications/mine "$PRO_TOKEN")"
node -e 'const n=JSON.parse(process.argv[1]),a=process.argv[2],b=process.argv[3];if(!n.some(x=>x.tenantId===a&&x.type==="assignment_confirmed")||!n.some(x=>x.tenantId===b&&x.type==="assignment_confirmed")){console.error(n);process.exit(1)}' "$NOTIFS" "$TENANT_A" "$TENANT_B"
COUNT="$(request GET /v1/notifications/unread-count "$PRO_TOKEN"|json_field count)"; test "$COUNT" -ge 2
NOTIF_A_ID="$(node -e 'const n=JSON.parse(process.argv[1]),a=process.argv[2];const x=n.find(v=>v.tenantId===a&&v.type==="assignment_confirmed");if(!x)process.exit(2);process.stdout.write(x.id)' "$NOTIFS" "$TENANT_A")"
# Invalid IDs, unrelated recipients and the wrong valid tenant cannot mark these real rows read.
for id in not-a-uuid 42 "${NOTIF_A_ID}x"; do
 test "$(status_only POST "/v1/notifications/$id/read" "$PRO_TOKEN" "$TENANT_A")" = "400"
done
test "$(status_only POST /v1/notifications/not-a-uuid/read '' "$TENANT_A")" = "401"
test "$(status_only POST /v1/notifications/not-a-uuid/read "$PRO_TOKEN" '')" = "400"
test "$(status_only POST /v1/notifications/not-a-uuid/read "$A_TOKEN" "$TENANT_B")" = "401"
# Existing null/not-found contract: valid request has 201 with no record mutation.
test "$(status_only POST "/v1/notifications/$NOTIF_A_ID/read" "$A_TOKEN" "$TENANT_A")" = "201"
test "$(status_only POST "/v1/notifications/$NOTIF_A_ID/read" "$PRO_TOKEN" "$TENANT_B")" = "201"
test "$(request GET /v1/notifications/mine "$PRO_TOKEN")" = "$NOTIFS"
test "$(request GET /v1/notifications/unread-count "$PRO_TOKEN" | json_field count)" = "$COUNT"
echo 'PASS: invalid notification IDs and cross-user or cross-tenant reads preserve real notifications and unread count'

READ_ACK="$(request POST "/v1/notifications/$NOTIF_A_ID/read" "$PRO_TOKEN" "$TENANT_A")"
REPEAT_ACK="$(request POST "/v1/notifications/$NOTIF_A_ID/read" "$PRO_TOKEN" "$TENANT_A")"
node - "$READ_ACK" "$REPEAT_ACK" "$NOTIF_A_ID" <<'NODE'
const a=JSON.parse(process.argv[2]),b=JSON.parse(process.argv[3]),id=process.argv[4];
if(a.id!==id||b.id!==id||!Number.isFinite(Date.parse(a.readAt))||b.readAt!==a.readAt)throw Error('real idempotent read ACK lost');
NODE
test "$(request GET /v1/notifications/unread-count "$PRO_TOKEN" | json_field count)" = "$((COUNT-1))"
echo 'PASS: notification mark-read returns real idempotent timestamp and decrements unread exactly once'
AFTER="$(request GET /v1/notifications/mine "$PRO_TOKEN")"
node -e 'const n=JSON.parse(process.argv[1]),id=process.argv[2];const x=n.find(v=>v.id===id);if(!x?.readAt){console.error(n);process.exit(1)}' "$AFTER" "$NOTIF_A_ID"
echo 'PASS: notifications aggregate across two company memberships and mark-read remains tenant scoped'
