#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
STAMP="$(date +%s)-$RANDOM"
OWNER_EMAIL="invite-race-owner-${STAMP}@example.test"
TARGET_EMAIL="invite-race-target-${STAMP}@example.test"
PASSWORD="InviteRacePass123!"

json_field(){ node -e 'const fs=require("fs");let x=JSON.parse(fs.readFileSync(0,"utf8"));for(const p of process.argv[1].split(".")){x=x?.[p]}if(x===undefined||x===null)process.exit(2);process.stdout.write(String(x));' "$1"; }
request(){ local method="$1" url="$2" token="${3:-}" tenant="${4:-}" body="${5:-}"; local args=(-sS --fail-with-body -X "$method" "${BASE_URL%/}$url"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$tenant" ]] && args+=(-H "x-tenant-id: $tenant"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }

OWNER_SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$OWNER_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"Invite Race $STAMP\"}")"
TENANT_ID="$(printf '%s' "$OWNER_SIGNUP" | json_field tenantId)"
OWNER_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$OWNER_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
request POST /v1/auth/signup '' '' "{\"email\":\"$TARGET_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"professional\"}" >/dev/null
TARGET_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$TARGET_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"

invite_parallel(){
  local out="$1" status="$2"
  curl -sS -o "$out" -w '%{http_code}' -X POST "${BASE_URL%/}/v1/company/members/invitations" \
    -H "authorization: Bearer $OWNER_TOKEN" -H "x-tenant-id: $TENANT_ID" -H 'content-type: application/json' \
    --data "{\"email\":\"$TARGET_EMAIL\",\"role\":\"owner\"}" > "$status"
}

invite_parallel /tmp/invite-race-a.json /tmp/invite-race-a.status & P1=$!
invite_parallel /tmp/invite-race-b.json /tmp/invite-race-b.status & P2=$!
wait "$P1"; wait "$P2"
# POST create uses Nest's standard 201 Created response. Both requests may
# succeed serially; the later transaction revokes the prior active invite.
test "$(cat /tmp/invite-race-a.status)" = "201"
test "$(cat /tmp/invite-race-b.status)" = "201"

CODE_A="$(cat /tmp/invite-race-a.json | json_field inviteCode)"
CODE_B="$(cat /tmp/invite-race-b.json | json_field inviteCode)"
test "$CODE_A" != "$CODE_B"

INVITES="$(request GET /v1/company/members/invitations "$OWNER_TOKEN" "$TENANT_ID")"
node -e '
const rows=JSON.parse(process.argv[1]); const email=process.argv[2];
const mine=rows.filter(x=>x.email===email);
const active=mine.filter(x=>!x.acceptedAt&&!x.revokedAt);
const revoked=mine.filter(x=>!!x.revokedAt);
if(mine.length<2||active.length!==1||revoked.length<1){console.error(mine);process.exit(1)}
' "$INVITES" "$TARGET_EMAIL"

accept_status(){
  local code="$1" out="$2"
  curl -sS -o "$out" -w '%{http_code}' -X POST "${BASE_URL%/}/v1/company/members/invitations/accept" \
    -H "authorization: Bearer $TARGET_TOKEN" -H 'content-type: application/json' --data "{\"inviteCode\":\"$code\"}"
}
STATUS_A="$(accept_status "$CODE_A" /tmp/invite-race-accept-a.json)"
STATUS_B="$(accept_status "$CODE_B" /tmp/invite-race-accept-b.json)"
SUCCESS=0; REJECTED=0
for s in "$STATUS_A" "$STATUS_B"; do
  [[ "$s" = "201" ]] && SUCCESS=$((SUCCESS+1))
  [[ "$s" = "400" ]] && REJECTED=$((REJECTED+1))
done
test "$SUCCESS" = "1"
test "$REJECTED" = "1"

MEMBERS="$(request GET /v1/company/members "$OWNER_TOKEN" "$TENANT_ID")"
node -e 'const rows=JSON.parse(process.argv[1]);const email=process.argv[2];if(!rows.some(x=>x.email===email&&x.role==="owner"&&!x.deactivatedAt))process.exit(1)' "$MEMBERS" "$TARGET_EMAIL"

request POST /v1/auth/signout "$OWNER_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$TARGET_TOKEN" '' '{}' >/dev/null

echo 'PASS: concurrent invitations serialize to one active token and only one code can be accepted'
