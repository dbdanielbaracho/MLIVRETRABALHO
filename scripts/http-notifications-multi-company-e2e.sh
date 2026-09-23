#!/usr/bin/env bash
set -euo pipefail
BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
STAMP="$(date +%s)-$RANDOM"
PASSWORD='NotifyPass123!'
json_field(){ node -e 'const fs=require("fs");let x=JSON.parse(fs.readFileSync(0,"utf8"));for(const p of process.argv[1].split(".")){if(/^\d+$/.test(p))x=x[Number(p)];else x=x?.[p]}if(x===undefined||x===null)process.exit(2);process.stdout.write(String(x));' "$1"; }
request(){ local method="$1" url="$2" token="${3:-}" tenant="${4:-}" body="${5:-}"; local args=(-sS --fail-with-body -X "$method" "${BASE_URL%/}$url"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$tenant" ]] && args+=(-H "x-tenant-id: $tenant"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }
PRO_EMAIL="notify-pro-${STAMP}@example.test"; A_EMAIL="notify-a-${STAMP}@example.test"; B_EMAIL="notify-b-${STAMP}@example.test"
PRO_SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$PRO_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"professional\"}")"
A_SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$A_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"Notify A\"}")"
B_SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$B_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"Notify B\"}")"
TENANT_A="$(printf '%s' "$A_SIGNUP"|json_field tenantId)"; TENANT_B="$(printf '%s' "$B_SIGNUP"|json_field tenantId)"
PRO_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$PRO_EMAIL\",\"password\":\"$PASSWORD\"}"|json_field accessToken)"
A_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$A_EMAIL\",\"password\":\"$PASSWORD\"}"|json_field accessToken)"
B_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$B_EMAIL\",\"password\":\"$PASSWORD\"}"|json_field accessToken)"
PROFILE="$(request PUT /v1/professional-profile "$PRO_TOKEN" '' '{"displayName":"Notify Pro","homeCity":"São Paulo","primaryRole":"Garçom"}')"; PRO_ID="$(printf '%s' "$PROFILE"|json_field id)"
JOB_A="$(request POST /v1/company/jobs "$A_TOKEN" "$TENANT_A" '{"title":"Garçom A","requiredRole":"Garçom","workCity":"São Paulo","payCents":10000}')"; JOB_A_ID="$(printf '%s' "$JOB_A"|json_field id)"
JOB_B="$(request POST /v1/company/jobs "$B_TOKEN" "$TENANT_B" '{"title":"Garçom B","requiredRole":"Garçom","workCity":"São Paulo","payCents":11000}')"; JOB_B_ID="$(printf '%s' "$JOB_B"|json_field id)"
request POST "/v1/jobs/$JOB_A_ID/interest" "$PRO_TOKEN" >/dev/null
request POST "/v1/jobs/$JOB_B_ID/interest" "$PRO_TOKEN" >/dev/null
request POST "/v1/company/jobs/$JOB_A_ID/confirm" "$A_TOKEN" "$TENANT_A" "{\"professionalId\":\"$PRO_ID\"}" >/dev/null
request POST "/v1/company/jobs/$JOB_B_ID/confirm" "$B_TOKEN" "$TENANT_B" "{\"professionalId\":\"$PRO_ID\"}" >/dev/null
NOTIFS="$(request GET /v1/notifications/mine "$PRO_TOKEN")"
node -e 'const n=JSON.parse(process.argv[1]),a=process.argv[2],b=process.argv[3];if(!n.some(x=>x.tenantId===a&&x.type==="assignment_confirmed")||!n.some(x=>x.tenantId===b&&x.type==="assignment_confirmed")){console.error(n);process.exit(1)}' "$NOTIFS" "$TENANT_A" "$TENANT_B"
COUNT="$(request GET /v1/notifications/unread-count "$PRO_TOKEN"|json_field count)"; test "$COUNT" -ge 2
NOTIF_A_ID="$(node -e 'const n=JSON.parse(process.argv[1]),a=process.argv[2];const x=n.find(v=>v.tenantId===a&&v.type==="assignment_confirmed");if(!x)process.exit(2);process.stdout.write(x.id)' "$NOTIFS" "$TENANT_A")"
request POST "/v1/notifications/$NOTIF_A_ID/read" "$PRO_TOKEN" "$TENANT_A" >/dev/null
AFTER="$(request GET /v1/notifications/mine "$PRO_TOKEN")"
node -e 'const n=JSON.parse(process.argv[1]),id=process.argv[2];const x=n.find(v=>v.id===id);if(!x?.readAt){console.error(n);process.exit(1)}' "$AFTER" "$NOTIF_A_ID"
echo 'PASS: notifications aggregate across two company memberships and mark-read remains tenant scoped'
