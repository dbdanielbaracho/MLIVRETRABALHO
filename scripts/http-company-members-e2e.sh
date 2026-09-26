#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
STAMP="$(date +%s)-$RANDOM"
OWNER_EMAIL="owner-${STAMP}@example.test"
NEXT_OWNER_EMAIL="next-owner-${STAMP}@example.test"
WRONG_EMAIL="wrong-${STAMP}@example.test"
PASSWORD="MemberInvitePass123!"

json_field(){ node -e 'const fs=require("fs");let x=JSON.parse(fs.readFileSync(0,"utf8"));for(const p of process.argv[1].split(".")){x=x?.[p]}if(x===undefined||x===null)process.exit(2);process.stdout.write(String(x));' "$1"; }
request(){ local method="$1" url="$2" token="${3:-}" tenant="${4:-}" body="${5:-}"; local args=(-sS --fail-with-body -X "$method" "${BASE_URL%/}$url"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$tenant" ]] && args+=(-H "x-tenant-id: $tenant"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }

OWNER_SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$OWNER_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"Invite Test $STAMP\"}")"
TENANT_ID="$(printf '%s' "$OWNER_SIGNUP" | json_field tenantId)"
OWNER_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$OWNER_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"

# A sole owner must not be able to demote itself through invitation acceptance.
SELF_INVITE="$(request POST /v1/company/members/invitations "$OWNER_TOKEN" "$TENANT_ID" "{\"email\":\"$OWNER_EMAIL\",\"role\":\"manager\"}")"
SELF_CODE="$(printf '%s' "$SELF_INVITE" | json_field inviteCode)"
SELF_STATUS="$(curl -sS -o /tmp/member-invite-self-demotion.json -w '%{http_code}' -X POST "${BASE_URL%/}/v1/company/members/invitations/accept" -H "authorization: Bearer $OWNER_TOKEN" -H 'content-type: application/json' --data "{\"inviteCode\":\"$SELF_CODE\"}")"
test "$SELF_STATUS" = "400"
grep -q 'invitation_existing_membership_role_change_forbidden' /tmp/member-invite-self-demotion.json
OWNER_MEMBERS="$(request GET /v1/company/members "$OWNER_TOKEN" "$TENANT_ID")"
node -e '
const rows=JSON.parse(process.argv[1]); const owner=process.argv[2];
if(!rows.some(x=>x.email===owner&&x.role==="owner"&&!x.deactivatedAt))throw new Error("sole owner was demoted");
' "$OWNER_MEMBERS" "$OWNER_EMAIL"

request POST /v1/auth/signup '' '' "{\"email\":\"$NEXT_OWNER_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"professional\"}" >/dev/null
NEXT_OWNER_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$NEXT_OWNER_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
request POST /v1/auth/signup '' '' "{\"email\":\"$WRONG_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"professional\"}" >/dev/null
WRONG_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$WRONG_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"

INVITE="$(request POST /v1/company/members/invitations "$OWNER_TOKEN" "$TENANT_ID" "{\"email\":\"$NEXT_OWNER_EMAIL\",\"role\":\"owner\"}")"
CODE="$(printf '%s' "$INVITE" | json_field inviteCode)"
test "$(printf '%s' "$INVITE" | json_field role)" = "owner"
test "$(printf '%s' "$INVITE" | json_field email)" = "$NEXT_OWNER_EMAIL"

WRONG_STATUS="$(curl -sS -o /tmp/member-invite-wrong.json -w '%{http_code}' -X POST "${BASE_URL%/}/v1/company/members/invitations/accept" -H "authorization: Bearer $WRONG_TOKEN" -H 'content-type: application/json' --data "{\"inviteCode\":\"$CODE\"}")"
test "$WRONG_STATUS" = "403"
grep -q 'invitation_email_mismatch' /tmp/member-invite-wrong.json

ACCEPT="$(request POST /v1/company/members/invitations/accept "$NEXT_OWNER_TOKEN" '' "{\"inviteCode\":\"$CODE\"}")"
test "$(printf '%s' "$ACCEPT" | json_field accepted)" = "true"
test "$(printf '%s' "$ACCEPT" | json_field tenantId)" = "$TENANT_ID"
test "$(printf '%s' "$ACCEPT" | json_field role)" = "owner"

MEMBERS="$(request GET /v1/company/members "$OWNER_TOKEN" "$TENANT_ID")"
node -e '
const rows=JSON.parse(process.argv[1]); const target=process.argv[2];
if(!rows.some(x=>x.email===target&&x.role==="owner"&&!x.deactivatedAt))throw new Error("accepted owner missing");
' "$MEMBERS" "$NEXT_OWNER_EMAIL"

# Invitation remains single-use before either owner deactivates.
REUSE_STATUS="$(curl -sS -o /tmp/member-invite-reuse.json -w '%{http_code}' -X POST "${BASE_URL%/}/v1/company/members/invitations/accept" -H "authorization: Bearer $NEXT_OWNER_TOKEN" -H 'content-type: application/json' --data "{\"inviteCode\":\"$CODE\"}")"
test "$REUSE_STATUS" = "400"

# Race both active owners. Advisory tenant locking must permit exactly one account
# deactivation and force the second transaction to observe a sole-owner blocker.
(
  curl -sS -o /tmp/owner-deactivate.json -w '%{http_code}' -X POST "${BASE_URL%/}/v1/privacy/deactivate" -H "authorization: Bearer $OWNER_TOKEN" -H 'content-type: application/json' --data '{}' > /tmp/owner-deactivate.status
) &
P1=$!
(
  curl -sS -o /tmp/next-owner-deactivate.json -w '%{http_code}' -X POST "${BASE_URL%/}/v1/privacy/deactivate" -H "authorization: Bearer $NEXT_OWNER_TOKEN" -H 'content-type: application/json' --data '{}' > /tmp/next-owner-deactivate.status
) &
P2=$!
wait "$P1"
wait "$P2"

OWNER_STATUS="$(cat /tmp/owner-deactivate.status)"
NEXT_STATUS="$(cat /tmp/next-owner-deactivate.status)"
SUCCESS_COUNT=0
BLOCKED_COUNT=0
for status in "$OWNER_STATUS" "$NEXT_STATUS"; do
  [[ "$status" = "200" ]] && SUCCESS_COUNT=$((SUCCESS_COUNT+1))
  [[ "$status" = "400" ]] && BLOCKED_COUNT=$((BLOCKED_COUNT+1))
done
test "$SUCCESS_COUNT" = "1"
test "$BLOCKED_COUNT" = "1"

if [[ "$OWNER_STATUS" = "200" ]]; then
  grep -q '"deactivated":true' /tmp/owner-deactivate.json
  grep -q 'account_deactivation_sole_tenant_owner' /tmp/next-owner-deactivate.json
  ACTIVE_OWNER_TOKEN="$NEXT_OWNER_TOKEN"
else
  grep -q 'account_deactivation_sole_tenant_owner' /tmp/owner-deactivate.json
  grep -q '"deactivated":true' /tmp/next-owner-deactivate.json
  ACTIVE_OWNER_TOKEN="$OWNER_TOKEN"
fi

ACTIVE_OWNER_ME="$(request GET /v1/me "$ACTIVE_OWNER_TOKEN")"
printf '%s' "$ACTIVE_OWNER_ME" | grep -q "$TENANT_ID"
printf '%s' "$ACTIVE_OWNER_ME" | grep -q 'owner'

request POST /v1/auth/signout "$ACTIVE_OWNER_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$WRONG_TOKEN" '' '{}' >/dev/null

echo "PASS: invitations are email-bound/single-use, role changes are safe, and concurrent owner deactivation cannot orphan the tenant"
