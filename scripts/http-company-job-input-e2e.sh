#!/usr/bin/env bash
# Disposable localhost CI fixtures only; never production jobs or payments.
set -euo pipefail
BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
case "$BASE_URL" in http://127.0.0.1:*|http://localhost:*) ;; *) echo 'Local disposable API required' >&2; exit 1;; esac
BASE_URL="${BASE_URL%/}"
STAMP="$(date +%s)-$RANDOM"
PASSWORD='JobInputFixture123!'
json_field(){ node -e 'let x=JSON.parse(require("fs").readFileSync(0,"utf8"));for(const p of process.argv[1].split("."))x=x?.[p];if(x==null)process.exit(2);process.stdout.write(String(x));' -- "$1"; }
request(){ local method="$1" path="$2" token="${3:-}" tenant="${4:-}" body="${5:-}"; local args=(-sS --fail-with-body -X "$method" "$BASE_URL$path"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$tenant" ]] && args+=(-H "x-tenant-id: $tenant"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }
credentials(){ node -e 'process.stdout.write(JSON.stringify({email:process.argv[1],password:process.argv[2],...(process.argv[3]?{accountType:"company",workspaceName:process.argv[3]}:{})}))' -- "$1" "$PASSWORD" "${2:-}"; }
assert_equal(){ node -e 'require("node:assert/strict").deepEqual(JSON.parse(require("fs").readFileSync(0,"utf8")),JSON.parse(process.argv[1]))' -- "$1"; }
expect_status(){ local expected="$1" token="$2" tenant="$3" body="$4" actual; actual="$(curl -sS -o /dev/null -w '%{http_code}' -X POST "$BASE_URL/v1/company/jobs" -H "authorization: Bearer $token" -H "x-tenant-id: $tenant" -H 'content-type: application/json' --data "$body")"; [[ "$actual" == "$expected" ]] || { printf 'FAIL job input: expected %s, got %s\n' "$expected" "$actual" >&2; return 1; }; }
EMAIL_A="job-input-a-$STAMP@example.test"
EMAIL_B="job-input-b-$STAMP@example.test"
TENANT_A="$(request POST /v1/auth/signup '' '' "$(credentials "$EMAIL_A" "Job fixture A $STAMP")" | json_field tenantId)"
TENANT_B="$(request POST /v1/auth/signup '' '' "$(credentials "$EMAIL_B" "Job fixture B $STAMP")" | json_field tenantId)"
TOKEN_A="$(request POST /v1/auth/signin '' '' "$(credentials "$EMAIL_A")" | json_field accessToken)"
TOKEN_B="$(request POST /v1/auth/signin '' '' "$(credentials "$EMAIL_B")" | json_field accessToken)"
request GET /v1/company/jobs "$TOKEN_A" "$TENANT_A" | assert_equal '[]'
request GET /v1/company/jobs "$TOKEN_B" "$TENANT_B" | assert_equal '[]'
# Authentication/membership precede malformed controller input.
expect_status 401 '' "$TENANT_A" '{}'
expect_status 403 "$TOKEN_A" "$TENANT_B" '{}'
VALID='{"title":" Fixture shift ","requiredRole":null,"location":" ","workCity":null,"startsAt":"2026-10-12T18:00:00Z","endsAt":"2026-10-12T23:00:00Z","payCents":null,"engagementModality":null,"tenantId":"untrusted","identityId":"untrusted","id":"untrusted"}'
JOB="$(request POST /v1/company/jobs "$TOKEN_A" "$TENANT_A" "$VALID")"
printf '%s' "$JOB" | node -e 'const x=JSON.parse(require("fs").readFileSync(0,"utf8"));if(!x.id||x.id==="untrusted"||x.title!=="Fixture shift"||x.requiredRole!=="Fixture shift"||x.location!==null||x.workCity!==null||x.payCents!==0||x.engagementModality!=="gig"||x.startsAt!=="2026-10-12T18:00:00.000Z"||x.endsAt!=="2026-10-12T23:00:00.000Z")process.exit(1)'
BASELINE="$(request GET /v1/company/jobs "$TOKEN_A" "$TENANT_A")"
INVALID="$(node -e 'const valid=JSON.parse(process.argv[1]);const patches=[{title:42},{title:{}},{title:[]},{title:" "},{requiredRole:42},{requiredRole:[]},{location:false},{location:{}},{workCity:42},{workCity:[]},{startsAt:42,endsAt:43},{startsAt:[]},{endsAt:{}},{startsAt:"invalid"},{startsAt:valid.endsAt},{endsAt:valid.startsAt},{startsAt:""},...[-1,0.1,"12050",true,2147483648,Number.MAX_SAFE_INTEGER].map(payCents=>({payCents})),...[false,0,"",[],{},"invented"].map(engagementModality=>({engagementModality}))];for(const body of [null,[],true,42,"text",...patches.map(p=>({...valid,...p}))])process.stdout.write(JSON.stringify(body)+"\n")' -- "$VALID")"
while IFS= read -r body; do
 expect_status 400 "$TOKEN_A" "$TENANT_A" "$body"
 request GET /v1/company/jobs "$TOKEN_A" "$TENANT_A" | assert_equal "$BASELINE"
 request GET /v1/company/jobs "$TOKEN_B" "$TENANT_B" | assert_equal '[]'
done <<< "$INVALID"
MAX_PAY="$(node -e 'process.stdout.write(JSON.stringify({...JSON.parse(process.argv[1]),payCents:2147483647}))' -- "$VALID")"
request POST /v1/company/jobs "$TOKEN_A" "$TENANT_A" "$MAX_PAY" | node -e 'const x=JSON.parse(require("fs").readFileSync(0,"utf8"));if(x.payCents!==2147483647||!x.id)process.exit(1)'
request GET /v1/company/jobs "$TOKEN_B" "$TENANT_B" | assert_equal '[]'
for token in "$TOKEN_A" "$TOKEN_B"; do request POST /v1/auth/signout "$token" '' '{}' >/dev/null; done
echo 'PASS: job malformed input rejects 400 without writes, authentication and tenant isolation precede input, trim/null/date/default and PostgreSQL integer range preserved'
