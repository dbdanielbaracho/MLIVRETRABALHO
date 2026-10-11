#!/usr/bin/env bash
set -euo pipefail
BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
[[ "$BASE_URL" =~ ^http://(127\.0\.0\.1|localhost):[0-9]+/?$ ]] || { echo 'Local disposable API required' >&2; exit 1; }
COPILOT_INPUT_DIR="$(mktemp -d)"
trap 'rm -rf "$COPILOT_INPUT_DIR"' EXIT
STAMP="$(date +%s)-$RANDOM"
PASSWORD="CopilotPass123!"
PRO_EMAIL="copilot-pro-${STAMP}@example.test"
COMPANY_EMAIL="copilot-company-${STAMP}@example.test"
json_field(){ node -e 'const fs=require("fs");let x=JSON.parse(fs.readFileSync(0,"utf8"));for(const p of process.argv[1].split(".")){x=/^\d+$/.test(p)?x[Number(p)]:x?.[p]}if(x===undefined||x===null)process.exit(2);process.stdout.write(String(x));' "$1"; }
request(){ local method="$1" url="$2" token="${3:-}" body="${4:-}"; local args=(-sS --fail-with-body -X "$method" "${BASE_URL%/}$url"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }

request POST /v1/auth/signup '' "{\"email\":\"$PRO_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"professional\"}" >/dev/null
COMPANY_SIGNUP="$(request POST /v1/auth/signup '' "{\"email\":\"$COMPANY_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"Copilot Company\"}")"
COMPANY_TENANT="$(printf '%s' "$COMPANY_SIGNUP" | json_field tenantId)"
PRO_TOKEN="$(request POST /v1/auth/signin '' "{\"email\":\"$PRO_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
COMPANY_TOKEN="$(request POST /v1/auth/signin '' "{\"email\":\"$COMPANY_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"

PRO="$(request POST /v1/copilot/interpret "$PRO_TOKEN" '{"text":"qual é meu próximo turno?","mode":"assisted"}')"
test "$(printf '%s' "$PRO" | json_field accountType)" = "professional"
test "$(printf '%s' "$PRO" | json_field intent)" = "show_schedule"
test "$(printf '%s' "$PRO" | json_field suggestedRoute)" = "/agenda"
test "$(printf '%s' "$PRO" | json_field executionAllowed)" = "false"

COMPANY="$(request POST /v1/copilot/interpret "$COMPANY_TOKEN" '{"text":"monte minha equipe para amanhã","mode":"assisted"}')"
test "$(printf '%s' "$COMPANY" | json_field accountType)" = "company"
test "$(printf '%s' "$COMPANY" | json_field intent)" = "company_staffing"
test "$(printf '%s' "$COMPANY" | json_field suggestedRoute)" = "/planejamento"
test "$(printf '%s' "$COMPANY" | json_field executionAllowed)" = "false"

CRITICAL="$(request POST /v1/copilot/interpret "$COMPANY_TOKEN" '{"text":"confirme candidato e pague automaticamente","mode":"automatic"}')"
test "$(printf '%s' "$CRITICAL" | json_field executionAllowed)" = "false"
test "$(printf '%s' "$CRITICAL" | json_field requiresHumanConfirmation)" = "true"
test "$(printf '%s' "$CRITICAL" | json_field providerConfigured)" = "false"


PRO_NOTIFICATIONS="$(request POST /v1/copilot/interpret "$PRO_TOKEN" '{"text":"minhas notificações","mode":"assisted"}')"
test "$(printf '%s' "$PRO_NOTIFICATIONS" | json_field accountType)" = "professional"
test "$(printf '%s' "$PRO_NOTIFICATIONS" | json_field suggestedRoute)" = "/notificacoes"
test "$(printf '%s' "$PRO_NOTIFICATIONS" | json_field executionAllowed)" = "false"

COMPANY_NOTIFICATIONS="$(request POST /v1/copilot/interpret "$COMPANY_TOKEN" '{"text":"minhas notificações","mode":"assisted"}')"
test "$(printf '%s' "$COMPANY_NOTIFICATIONS" | json_field accountType)" = "company"
test "$(printf '%s' "$COMPANY_NOTIFICATIONS" | json_field suggestedRoute)" = "/empresa-notificacoes"
test "$(printf '%s' "$COMPANY_NOTIFICATIONS" | json_field executionAllowed)" = "false"


# Disposable fixtures only. Preserve original interpretation journey and exercise actual read contracts.
request PUT /v1/professional-profile "$PRO_TOKEN" '{"displayName":"Copilot HTTP fixture","homeCity":"São Paulo","primaryRole":"Bartender"}' >/dev/null
read_tool(){ curl -sS --fail-with-body -X POST "$BASE_URL/v1/copilot/read" -H "authorization: Bearer $1" -H "x-tenant-id: $2" -H 'content-type: application/json' --data "{\"tool\":\"$3\"}"; }
DASHBOARD_BEFORE="$(read_tool "$COMPANY_TOKEN" "$COMPANY_TENANT" company_dashboard)"
PLANNER_BEFORE="$(read_tool "$COMPANY_TOKEN" "$COMPANY_TENANT" company_planner)"
EXCEPTIONS_BEFORE="$(read_tool "$COMPANY_TOKEN" "$COMPANY_TENANT" company_exceptions)"
CAREER_BEFORE="$(read_tool "$PRO_TOKEN" '' career_progress)"
WEEK_BEFORE="$(read_tool "$PRO_TOKEN" '' my_week)"
SUPPORT_BEFORE="$(read_tool "$PRO_TOKEN" '' my_support_cases)"
node - "$DASHBOARD_BEFORE" "$PLANNER_BEFORE" "$EXCEPTIONS_BEFORE" "$CAREER_BEFORE" "$WEEK_BEFORE" "$SUPPORT_BEFORE" <<'NODE'
const [dashboard,planner,exceptions,career,week,support]=process.argv.slice(2).map(JSON.parse);
if(dashboard.openJobs!==0||dashboard.confirmedWorkers!==0||dashboard.activeWorkers!==0)throw Error('new company should have no work');
if(career.completed!==0||career.cancelled!==0||career.advisoryOnly!==true||!career.professionalId)throw Error('career read lost actual empty-profile contract');
if([planner,exceptions,week,support].some(x=>!Array.isArray(x)||x.length!==0))throw Error('new fixture read should be empty');
NODE
node - "$COPILOT_INPUT_DIR" <<'NODE'
const fs=require('fs'),dir=process.argv[2],cases=[
 ...[null,false,true,42,'text',[],{}, {text:null},{text:false},{text:7},{text:[]},{text:{}},{text:['agenda']}].map(body=>({endpoint:'interpret',body,error:'copilot_text_invalid'})),
 ...['','  ','x'.repeat(2001)].map(text=>({endpoint:'interpret',body:{text},error:'copilot_text_invalid'})),
 ...[false,true,0,1,'',[],{},['manual'],'unsupported'].map(mode=>({endpoint:'interpret',body:{text:'agenda',mode},error:'copilot_mode_invalid'})),
 ...[null,false,42,'text',[],{}, {tool:null},{tool:false},{tool:7},{tool:[]},{tool:{}},{tool:['company_dashboard']},{tool:'untrusted_tool'}].map(body=>({endpoint:'read',body,error:'copilot_tool_not_allowed'}))
];cases.forEach((x,i)=>fs.writeFileSync(dir+'/bad-'+i+'.json',JSON.stringify(x)));
NODE
for token in "$PRO_TOKEN" "$COMPANY_TOKEN"; do
 for payload in "$COPILOT_INPUT_DIR"/bad-*.json; do
  endpoint="$(node -e 'process.stdout.write(JSON.parse(require("fs").readFileSync(process.argv[1])).endpoint)' "$payload")"
  body="$(node -e 'process.stdout.write(JSON.stringify(JSON.parse(require("fs").readFileSync(process.argv[1])).body))' "$payload")"
  error="$(node -e 'process.stdout.write(JSON.parse(require("fs").readFileSync(process.argv[1])).error)' "$payload")"
  code="$(curl -sS -o "$COPILOT_INPUT_DIR/response.json" -w '%{http_code}' -X POST "$BASE_URL/v1/copilot/$endpoint" -H "authorization: Bearer $token" -H "x-tenant-id: $COMPANY_TENANT" -H 'content-type: application/json' --data "$body")"
  test "$code" = 400
  test "$(json_field message < "$COPILOT_INPUT_DIR/response.json")" = "$error"
 done
done
for endpoint in interpret read; do
 code="$(curl -sS -o "$COPILOT_INPUT_DIR/response.json" -w '%{http_code}' -X POST "$BASE_URL/v1/copilot/$endpoint" -H 'content-type: application/json' --data 'null')"
 test "$code" = 401
done
code="$(curl -sS -o "$COPILOT_INPUT_DIR/response.json" -w '%{http_code}' -X POST "$BASE_URL/v1/copilot/read" -H "authorization: Bearer $COMPANY_TOKEN" -H 'content-type: application/json' --data '{"tool":"company_dashboard"}')"
test "$code" = 400
test "$(json_field message < "$COPILOT_INPUT_DIR/response.json")" = tenant_required
code="$(curl -sS -o "$COPILOT_INPUT_DIR/response.json" -w '%{http_code}' -X POST "$BASE_URL/v1/copilot/read" -H "authorization: Bearer $COMPANY_TOKEN" -H 'x-tenant-id: 11111111-1111-1111-1111-111111111111' -H 'content-type: application/json' --data '{"tool":"company_dashboard"}')"
test "$code" = 401
for token in "$PRO_TOKEN" "$COMPANY_TOKEN"; do
 tool=company_dashboard; [[ "$token" = "$COMPANY_TOKEN" ]] && tool=career_progress
 code="$(curl -sS -o "$COPILOT_INPUT_DIR/response.json" -w '%{http_code}' -X POST "$BASE_URL/v1/copilot/read" -H "authorization: Bearer $token" -H "x-tenant-id: $COMPANY_TENANT" -H 'content-type: application/json' --data "{\"tool\":\"$tool\"}")"
 test "$code" = 400
 test "$(json_field message < "$COPILOT_INPUT_DIR/response.json")" = copilot_tool_not_allowed
done
test "$(read_tool "$COMPANY_TOKEN" "$COMPANY_TENANT" company_dashboard)" = "$DASHBOARD_BEFORE"
test "$(read_tool "$COMPANY_TOKEN" "$COMPANY_TENANT" company_planner)" = "$PLANNER_BEFORE"
test "$(read_tool "$COMPANY_TOKEN" "$COMPANY_TENANT" company_exceptions)" = "$EXCEPTIONS_BEFORE"
test "$(read_tool "$PRO_TOKEN" '' career_progress)" = "$CAREER_BEFORE"
test "$(read_tool "$PRO_TOKEN" '' my_week)" = "$WEEK_BEFORE"
test "$(read_tool "$PRO_TOKEN" '' my_support_cases)" = "$SUPPORT_BEFORE"
echo 'PASS: malformed copilot JSON text mode and tool reject without changing real tenant read results'
for token in "$PRO_TOKEN" "$COMPANY_TOKEN"; do
 for mode in manual assisted automatic default null; do
  body="{\"text\":\"confirme candidato e pague automaticamente\",\"mode\":\"$mode\"}"
  [[ "$mode" = default ]] && body='{"text":"confirme candidato e pague automaticamente"}'
  [[ "$mode" = null ]] && body='{"text":"confirme candidato e pague automaticamente","mode":null}'
  expected="$mode"; [[ "$mode" = default || "$mode" = null ]] && expected=assisted
  result="$(request POST /v1/copilot/interpret "$token" "$body")"
  node - "$result" "$expected" <<'NODE'
const x=JSON.parse(process.argv[2]);if(x.mode!==process.argv[3]||x.executionAllowed!==false||x.requiresHumanConfirmation!==true||x.provider!=='deterministic_baseline'||x.providerConfigured!==false||x.toolExecution!=='read_only_explicit')throw Error('copilot safety or mode contract changed');
NODE
 done
done
echo 'PASS: copilot optional modes and all supported modes preserve read-only deterministic baseline and human confirmation'

request POST /v1/auth/signout "$PRO_TOKEN" '{}' >/dev/null
request POST /v1/auth/signout "$COMPANY_TOKEN" '{}' >/dev/null

echo "PASS: copilot interprets safe intents and never executes critical actions"
