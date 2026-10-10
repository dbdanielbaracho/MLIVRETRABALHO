#!/usr/bin/env bash
# Disposable HTTP fixtures; CI supplies the local API and ephemeral database.
set -euo pipefail
BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
case "$BASE_URL" in http://127.0.0.1:*|http://localhost:*) ;; *) echo 'This fixture only runs against localhost' >&2; exit 2;; esac
case "${DATABASE_URL:-}" in postgresql://*@localhost:*|postgresql://*@127.0.0.1:*) ;; *) echo 'This fixture requires a local ephemeral database' >&2; exit 2;; esac
FIXTURE_DIR="$(mktemp -d)"
trap 'rm -rf "$FIXTURE_DIR"' EXIT
STAMP="$(date +%s)-$RANDOM"
PASSWORD='SupportFixture123!'
json_field(){ node -e 'let x=JSON.parse(require("fs").readFileSync(0,"utf8"));for(const p of process.argv[1].split("."))x=x?.[p];if(x==null)process.exit(2);process.stdout.write(String(x));' -- "$1"; }
request(){ local method="$1" path="$2" token="${3:-}" tenant="${4:-}" body="${5:-}" key="${6:-}"; local args=(-sS --fail-with-body -X "$method" "$BASE_URL$path"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$tenant" ]] && args+=(-H "x-tenant-id: $tenant"); [[ -n "$key" ]] && args+=(-H "idempotency-key: $key"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }
status_only(){ local method="$1" path="$2" token="$3" tenant="$4" body="$5" key="${6:-}"; local extra=() json=(); [[ -n "$body" ]] && json+=(-H 'content-type: application/json' --data "$body"); [[ -n "$key" ]] && extra+=(-H "idempotency-key: $key"); curl -sS -o /dev/null -w '%{http_code}' -X "$method" "$BASE_URL$path" -H "authorization: Bearer $token" -H "x-tenant-id: $tenant" "${json[@]}" "${extra[@]}"; }
expect_status(){ local label="$1" expected="$2"; shift 2; local actual; actual="$(status_only "$@")"; if [[ "$actual" != "$expected" ]]; then printf 'FAIL support %s: expected HTTP %s, got %s\n' "$label" "$expected" "$actual" >&2; return 1; fi; }
signup_body(){ node -e 'process.stdout.write(JSON.stringify({email:process.argv[1],password:process.argv[2],accountType:process.argv[3],workspaceName:"Support fixture"}))' -- "$1" "$PASSWORD" "$2"; }
signin_body(){ node -e 'process.stdout.write(JSON.stringify({email:process.argv[1],password:process.argv[2]}))' -- "$1" "$PASSWORD"; }
case_body(){ node -e 'const id=process.argv[1];process.stdout.write(JSON.stringify({...(id?{assignmentId:id}:{}),category:"schedule",description:"Support fixture",priority:"normal"}))' -- "$1"; }
EMAIL_A="support-company-a-$STAMP@example.test"
EMAIL_B="support-company-b-$STAMP@example.test"
EMAIL_P="support-professional-$STAMP@example.test"
TENANT_A="$(request POST /v1/auth/signup '' '' "$(signup_body "$EMAIL_A" company)" | json_field tenantId)"
TENANT_B="$(request POST /v1/auth/signup '' '' "$(signup_body "$EMAIL_B" company)" | json_field tenantId)"
request POST /v1/auth/signup '' '' "$(signup_body "$EMAIL_P" professional)" >/dev/null
TOKEN_A="$(request POST /v1/auth/signin '' '' "$(signin_body "$EMAIL_A")" | json_field accessToken)"
TOKEN_B="$(request POST /v1/auth/signin '' '' "$(signin_body "$EMAIL_B")" | json_field accessToken)"
TOKEN_P="$(request POST /v1/auth/signin '' '' "$(signin_body "$EMAIL_P")" | json_field accessToken)"
PROFILE_ID="$(request PUT /v1/professional-profile "$TOKEN_P" '' '{"displayName":"Support fixture","primaryRole":"Bartender"}' | json_field id)"
assert_count(){ node -e 'const x=JSON.parse(require("fs").readFileSync(0,"utf8"));if(!Array.isArray(x)||x.length!==Number(process.argv[1]))process.exit(1)' -- "$1"; }
# A new professional has no tenant until an actual membership exists.
request GET /v1/me/support-contexts "$TOKEN_P" | assert_count 0
JOB_BODY="$(node -e 'process.stdout.write(JSON.stringify({title:"Support fixture",requiredRole:"Bartender",startsAt:new Date(Date.now()+24*3600000).toISOString(),endsAt:new Date(Date.now()+32*3600000).toISOString(),payCents:10000}))')"
JOB_A="$(request POST /v1/company/jobs "$TOKEN_A" "$TENANT_A" "$JOB_BODY" | json_field id)"
request POST "/v1/jobs/$JOB_A/interest" "$TOKEN_P" >/dev/null
CONFIRM_BODY="$(node -e 'process.stdout.write(JSON.stringify({professionalId:process.argv[1]}))' -- "$PROFILE_ID")"
ASSIGNMENT_A="$(request POST "/v1/company/jobs/$JOB_A/confirm" "$TOKEN_A" "$TENANT_A" "$CONFIRM_BODY" | json_field id)"
# Context metadata is filtered by authenticated membership, independent of a supplied tenant header.
expect_status contexts-auth 401 GET /v1/me/support-contexts invalid-token "$TENANT_A" ''
for fixture in A B P; do
 if [[ "$fixture" == B ]]; then CONTEXT_TOKEN="$TOKEN_B"; EXPECTED_TENANT="$TENANT_B"; else EXPECTED_TENANT="$TENANT_A"; [[ "$fixture" == A ]] && CONTEXT_TOKEN="$TOKEN_A" || CONTEXT_TOKEN="$TOKEN_P"; fi
 request GET /v1/me/support-contexts "$CONTEXT_TOKEN" "$TENANT_B" | node -e 'const x=JSON.parse(require("fs").readFileSync(0,"utf8"));if(!Array.isArray(x)||x.length!==1||x[0].tenantId!==process.argv[1]||x[0].displayName!=="Support fixture"||Object.keys(x[0]).sort().join(",")!=="displayName,tenantId")throw Error("support_context_isolation_failed");' -- "$EXPECTED_TENANT"
done
echo 'PASS: named support contexts list only authenticated memberships, without inventing a tenant for a new professional'
request GET /v1/support-cases/mine "$TOKEN_B" "$TENANT_B" | assert_count 0
# Company B is authorized in B but cannot attach a real assignment belonging to A.
expect_status cross-assignment 400 POST /v1/support-cases "$TOKEN_B" "$TENANT_B" "$(case_body "$ASSIGNMENT_A")"
request GET /v1/support-cases/mine "$TOKEN_B" "$TENANT_B" | assert_count 0
# Nonexistent, malformed and blank references fail before insertion.
for id in 11111111-2222-3333-4444-555555555555 not-a-uuid ' '; do
 expect_status invalid-assignment 400 POST /v1/support-cases "$TOKEN_A" "$TENANT_A" "$(case_body "$id")"
done
LONG_BODY="$(node -e 'process.stdout.write(JSON.stringify({category:"other",description:"x".repeat(4001)}))')"
expect_status description-limit 400 POST /v1/support-cases "$TOKEN_A" "$TENANT_A" "$LONG_BODY"
request GET /v1/support-cases/mine "$TOKEN_A" "$TENANT_A" | assert_count 0
expect_status absent-membership 401 POST /v1/support-cases "$TOKEN_A" "$TENANT_B" "$(case_body '')"
# Preparing keys is authenticated, checks the existing assignment boundary and creates no case.
expect_status prepare-auth-first 401 POST /v1/support-cases/intent invalid-token "$TENANT_A" 'null'
expect_status prepare-absent-membership 401 POST /v1/support-cases/intent "$TOKEN_A" "$TENANT_B" "$(case_body '')"
expect_status prepare-cross-assignment 400 POST /v1/support-cases/intent "$TOKEN_B" "$TENANT_B" "$(case_body "$ASSIGNMENT_A")"
expect_status prepare-malformed-assignment 400 POST /v1/support-cases/intent "$TOKEN_A" "$TENANT_A" "$(case_body bad-id)"
expect_status prepare-invalid-payload 400 POST /v1/support-cases/intent "$TOKEN_A" "$TENANT_A" "$LONG_BODY"
PREPARED_A="$(request POST /v1/support-cases/intent "$TOKEN_P" "$TENANT_A" "$(case_body "$ASSIGNMENT_A")")"
PREPARED_B="$(request POST /v1/support-cases/intent "$TOKEN_P" "$TENANT_A" "$(case_body "$ASSIGNMENT_A")")"
PREPARED_KEY="$(printf '%s' "$PREPARED_A" | json_field requestKey)"
ACTUAL_REPORTER="$(request GET /v1/me "$TOKEN_P" | json_field id)"
node - "$PREPARED_A" "$PREPARED_B" "$ACTUAL_REPORTER" <<'JS'
const [a,b]=process.argv.slice(2,4).map(JSON.parse),reporter=process.argv[4];
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
if(!uuid.test(a.requestKey)||!uuid.test(b.requestKey)||a.requestKey===b.requestKey||a.reporterIdentityId!==reporter||b.reporterIdentityId!==reporter)throw Error('support_prepare_invalid');
for(const x of [a,b])if(Object.keys(x).sort().join(',')!=='reporterIdentityId,requestKey')throw Error('support_prepare_response_leak');
JS
request POST /v1/support-cases/intent "$TOKEN_B" "$TENANT_B" "$(case_body '')" >/dev/null
request GET /v1/support-cases/mine "$TOKEN_P" "$TENANT_A" | assert_count 0
request GET /v1/support-cases/mine "$TOKEN_A" "$TENANT_A" | assert_count 0
request GET /v1/support-cases/mine "$TOKEN_B" "$TENANT_B" | assert_count 0
echo 'PASS: support key preparation checks auth/membership/assignment, issues cryptographic UUIDs and creates no case'
# Valid linked and unlinked requests preserve the existing support contract.
CASE_A="$(request POST /v1/support-cases "$TOKEN_A" "$TENANT_A" "$(case_body "$ASSIGNMENT_A")")"
CASE_A_ID="$(printf '%s' "$CASE_A" | json_field id)"
test "$(printf '%s' "$CASE_A" | json_field status)" = open
request POST /v1/support-cases "$TOKEN_A" "$TENANT_A" "$(case_body '')" >/dev/null
request GET /v1/support-cases/mine "$TOKEN_A" "$TENANT_A" | assert_count 2
# Reporter filtering remains in force, and professionals retain legitimate access.
request GET /v1/support-cases/mine "$TOKEN_P" "$TENANT_A" | assert_count 0
PRO_CASE_ID="$(request POST /v1/support-cases "$TOKEN_P" "$TENANT_A" "$(case_body "$ASSIGNMENT_A")" | json_field id)"
request GET /v1/support-cases/mine "$TOKEN_P" "$TENANT_A" | assert_count 1
request GET /v1/support-cases/mine "$TOKEN_A" "$TENANT_A" | assert_count 2
request GET /v1/support-cases/mine "$TOKEN_B" "$TENANT_B" | assert_count 0
expect_status cross-review 400 POST "/v1/company/support-cases/$CASE_A_ID/status" "$TOKEN_B" "$TENANT_B" '{"status":"reviewing","note":"fixture"}'
UPDATED="$(request POST "/v1/company/support-cases/$PRO_CASE_ID/status" "$TOKEN_A" "$TENANT_A" '{"status":"reviewing","note":"Revisão humana fixture"}')"
test "$(printf '%s' "$UPDATED" | json_field status)" = reviewing
# Keyed requests keep one intent per tenant + authenticated reporter.
INTENT_KEY="$PREPARED_KEY"
CONCURRENT_KEY='bbbbbbbb-cccc-dddd-eeee-ffffffffffff'
CASE_BODY="$(case_body "$ASSIGNMENT_A")"
KEYED_CASE="$(request POST /v1/support-cases "$TOKEN_P" "$TENANT_A" "$CASE_BODY" "$INTENT_KEY")"
KEYED_ID="$(printf '%s' "$KEYED_CASE" | json_field id)"
REPLAY="$(request POST /v1/support-cases "$TOKEN_P" "$TENANT_A" "$CASE_BODY" "$INTENT_KEY")"
test "$(printf '%s' "$REPLAY" | json_field id)" = "$KEYED_ID"
request GET /v1/support-cases/mine "$TOKEN_P" "$TENANT_A" | assert_count 2
for key in bad-key "$INTENT_KEY-x"; do expect_status invalid-key 400 POST /v1/support-cases "$TOKEN_P" "$TENANT_A" "$CASE_BODY" "$key"; done
DIFFERENT_BODY="$(node -e 'process.stdout.write(JSON.stringify({assignmentId:process.argv[1],category:"schedule",description:"Different fixture",priority:"normal"}))' -- "$ASSIGNMENT_A")"
expect_status intent-conflict 409 POST /v1/support-cases "$TOKEN_P" "$TENANT_A" "$DIFFERENT_BODY" "$INTENT_KEY"
request GET /v1/support-cases/mine "$TOKEN_P" "$TENANT_A" | assert_count 2
expect_status key-auth-first 401 POST /v1/support-cases invalid-token "$TENANT_A" "$CASE_BODY" bad-key
expect_status key-membership-first 401 POST /v1/support-cases "$TOKEN_P" "$TENANT_B" "$CASE_BODY" "$INTENT_KEY"
# Human review does not reset on replay, and the internal hash/key are not exposed.
request POST "/v1/company/support-cases/$KEYED_ID/status" "$TOKEN_A" "$TENANT_A" '{"status":"reviewing","note":"Real fixture review"}' >/dev/null
REPLAY="$(request POST /v1/support-cases "$TOKEN_P" "$TENANT_A" "$CASE_BODY" "$INTENT_KEY")"
test "$(printf '%s' "$REPLAY" | json_field id)" = "$KEYED_ID"
test "$(printf '%s' "$REPLAY" | json_field status)" = reviewing
printf '%s' "$REPLAY" | node -e 'const x=JSON.parse(require("fs").readFileSync(0,"utf8"));if("requestHash"in x||"requestKey"in x||"request_payload_hash"in x)process.exit(1)'
# Same UUID in another reporter or another tenant is an independent intent.
OWNER_ID="$(request POST /v1/support-cases "$TOKEN_A" "$TENANT_A" "$CASE_BODY" "$INTENT_KEY" | json_field id)"
test "$OWNER_ID" != "$KEYED_ID"
request GET /v1/support-cases/mine "$TOKEN_A" "$TENANT_A" | assert_count 3
B_CASE_BODY="$(case_body '')"
B_ID="$(request POST /v1/support-cases "$TOKEN_B" "$TENANT_B" "$B_CASE_BODY" "$INTENT_KEY" | json_field id)"
test "$B_ID" != "$KEYED_ID"
test "$(request POST /v1/support-cases "$TOKEN_B" "$TENANT_B" "$B_CASE_BODY" "$INTENT_KEY" | json_field id)" = "$B_ID"
request GET /v1/support-cases/mine "$TOKEN_B" "$TENANT_B" | assert_count 1
# A real concurrent first-use race produces one case and one shared acknowledgement.
PIDS=()
for i in $(seq 1 8); do
 request POST /v1/support-cases "$TOKEN_P" "$TENANT_A" "$CASE_BODY" "$CONCURRENT_KEY" > "$FIXTURE_DIR/reply-$i.json" &
 PIDS+=("$!")
done
for pid in "${PIDS[@]}"; do wait "$pid"; done
node - "$FIXTURE_DIR" <<'JS'
const fs=require('fs'),path=require('path'),folder=process.argv[2];
const ids=fs.readdirSync(folder).filter(n=>n.startsWith('reply-')).map(n=>JSON.parse(fs.readFileSync(path.join(folder,n),'utf8')).id);
if(ids.length!==8||ids.some(id=>typeof id!=='string'||!id)||new Set(ids).size!==1)throw Error('support_concurrency_failed');
JS
request GET /v1/support-cases/mine "$TOKEN_P" "$TENANT_A" | assert_count 3
# Database guards prevent changing intent identity or inserting an incomplete pair.
expect_sql_failure(){
 local kind="$1" error
 if error="$(psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -v case_id="$KEYED_ID" -f "$FIXTURE_DIR/$kind.sql" 2>&1)"; then echo "FAIL support database guard $kind" >&2; return 1; fi
 [[ "$error" == *support_request_identity_immutable* || "$error" == *support_cases_request_pair* ]]
}
cat > "$FIXTURE_DIR/key-change.sql" <<'SQL'
UPDATE support_cases SET request_key='cccccccc-dddd-eeee-ffff-aaaaaaaaaaaa' WHERE id=:'case_id'::uuid;
SQL
cat > "$FIXTURE_DIR/hash-change.sql" <<'SQL'
UPDATE support_cases SET request_payload_hash=repeat('0',64) WHERE id=:'case_id'::uuid;
SQL
cat > "$FIXTURE_DIR/incomplete-pair.sql" <<'SQL'
INSERT INTO support_cases(tenant_id,reporter_identity_id,category,description,request_key)
 SELECT tenant_id,reporter_identity_id,'other','Invalid fixture',gen_random_uuid() FROM support_cases WHERE id=:'case_id'::uuid;
SQL
for guard in key-change hash-change incomplete-pair; do expect_sql_failure "$guard"; done
# Deleting an assignment may null its case link; the original normalized intent stays immutable.
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -v case_id="$KEYED_ID" > /dev/null <<'SQL'
UPDATE support_cases SET assignment_id=NULL WHERE id=:'case_id'::uuid;
SQL
REPLAY="$(request POST /v1/support-cases "$TOKEN_P" "$TENANT_A" "$CASE_BODY" "$INTENT_KEY")"
test "$(printf '%s' "$REPLAY" | json_field id)" = "$KEYED_ID"
test "$(printf '%s' "$REPLAY" | json_field status)" = reviewing
request GET /v1/support-cases/mine "$TOKEN_P" "$TENANT_A" | assert_count 3
echo 'PASS: support intent sequential/concurrent retry, payload conflict, reporter/tenant isolation and immutable database guards'

for token in "$TOKEN_A" "$TOKEN_B" "$TOKEN_P"; do request POST /v1/auth/signout "$token" >/dev/null; done
expect_status contexts-revoked 401 GET /v1/me/support-contexts "$TOKEN_P" '' ''
echo 'PASS: support assignment binding rejects cross-tenant and malformed requests without insert; legitimate reporter/admin flows preserved'
