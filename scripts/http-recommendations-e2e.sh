#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
STAMP="$(date +%s)-$RANDOM"
PASSWORD="RecommendPass123!"
COMPANY_EMAIL="recommend-company-${STAMP}@example.test"
GOOD_EMAIL="recommend-good-${STAMP}@example.test"
WEAK_EMAIL="recommend-weak-${STAMP}@example.test"
START_AT="$(node -e 'process.stdout.write(new Date(Date.now()+24*60*60*1000).toISOString())')"
END_AT="$(node -e 'process.stdout.write(new Date(Date.now()+32*60*60*1000).toISOString())')"
AVAIL_START="$(node -e 'process.stdout.write(new Date(Date.now()+23*60*60*1000).toISOString())')"
AVAIL_END="$(node -e 'process.stdout.write(new Date(Date.now()+33*60*60*1000).toISOString())')"

json_field(){ node -e 'const fs=require("fs");let x=JSON.parse(fs.readFileSync(0,"utf8"));for(const p of process.argv[1].split(".")){if(/^\d+$/.test(p))x=x[Number(p)];else x=x?.[p]}if(x===undefined||x===null)process.exit(2);process.stdout.write(String(x));' "$1"; }
request(){ local method="$1" url="$2" token="${3:-}" tenant="${4:-}" body="${5:-}"; local args=(-sS --fail-with-body -X "$method" "${BASE_URL%/}$url"); [[ -n "$token" ]] && args+=(-H "authorization: Bearer $token"); [[ -n "$tenant" ]] && args+=(-H "x-tenant-id: $tenant"); [[ -n "$body" ]] && args+=(-H 'content-type: application/json' --data "$body"); curl "${args[@]}"; }

COMPANY_SIGNUP="$(request POST /v1/auth/signup '' '' "{\"email\":\"$COMPANY_EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"company\",\"workspaceName\":\"Recommendation E2E\"}")"
TENANT_ID="$(printf '%s' "$COMPANY_SIGNUP" | json_field tenantId)"
COMPANY_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$COMPANY_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"

for EMAIL in "$GOOD_EMAIL" "$WEAK_EMAIL"; do
  request POST /v1/auth/signup '' '' "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\",\"accountType\":\"professional\"}" >/dev/null
done
GOOD_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$GOOD_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
WEAK_TOKEN="$(request POST /v1/auth/signin '' '' "{\"email\":\"$WEAK_EMAIL\",\"password\":\"$PASSWORD\"}" | json_field accessToken)"
GOOD_PROFILE="$(request PUT /v1/professional-profile "$GOOD_TOKEN" '' '{"displayName":"Bartender Compatível","homeCity":"São Paulo","primaryRole":"Bartender"}')"
WEAK_PROFILE="$(request PUT /v1/professional-profile "$WEAK_TOKEN" '' '{"displayName":"Perfil Menos Compatível","homeCity":"Campinas","primaryRole":"Limpeza"}')"
GOOD_ID="$(printf '%s' "$GOOD_PROFILE" | json_field id)"
WEAK_ID="$(printf '%s' "$WEAK_PROFILE" | json_field id)"

for TOKEN in "$GOOD_TOKEN" "$WEAK_TOKEN"; do
  request POST /v1/availability/mine "$TOKEN" '' "{\"startsAt\":\"$AVAIL_START\",\"endsAt\":\"$AVAIL_END\"}" >/dev/null
done

JOB="$(request POST /v1/company/jobs "$COMPANY_TOKEN" "$TENANT_ID" "{\"title\":\"Bartender Evento\",\"requiredRole\":\"Bartender\",\"workCity\":\"São Paulo\",\"location\":\"Centro\",\"startsAt\":\"$START_AT\",\"endsAt\":\"$END_AT\",\"payCents\":25000}")"
JOB_ID="$(printf '%s' "$JOB" | json_field id)"
request POST "/v1/jobs/$JOB_ID/interest" "$GOOD_TOKEN" >/dev/null
request POST "/v1/jobs/$JOB_ID/interest" "$WEAK_TOKEN" >/dev/null

RECOMMENDATIONS="$(request GET "/v1/company/jobs/$JOB_ID/recommendations" "$COMPANY_TOKEN" "$TENANT_ID")"
node - "$RECOMMENDATIONS" "$GOOD_ID" "$WEAK_ID" <<'NODE'
const recommendations=JSON.parse(process.argv[2]);
const goodId=process.argv[3], weakId=process.argv[4];
if(!Array.isArray(recommendations) || recommendations.length < 2){
  console.error('expected at least two recommendations', recommendations);
  process.exit(1);
}
const good=recommendations.find(x=>x.professionalId===goodId);
const weak=recommendations.find(x=>x.professionalId===weakId);
if(!good || !weak){console.error('missing candidates', recommendations);process.exit(1);}
if(recommendations[0].professionalId!==goodId){console.error('strong candidate is not ranked first', recommendations);process.exit(1);}
if(!(Number(good.score)>Number(weak.score))){console.error('score ordering invalid', {good,weak});process.exit(1);}
if(!(Number(good.score)>=80 && Number(good.score)<=100)){console.error('unexpected strong score', good);process.exit(1);}
if(!Array.isArray(good.reasons) || !good.reasons.includes('alta compatibilidade com a função') || !good.reasons.includes('próximo do local')){
  console.error('expected explainable reasons', good);
  process.exit(1);
}
if(Number(weak.score)<=0){console.error('weak candidate unexpectedly filtered/invalid', weak);process.exit(1);}
NODE

request POST /v1/auth/signout "$GOOD_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$WEAK_TOKEN" '' '{}' >/dev/null
request POST /v1/auth/signout "$COMPANY_TOKEN" '' '{}' >/dev/null

echo "PASS: recommendation ranking uses real role/city/availability signals and explainable reasons"
