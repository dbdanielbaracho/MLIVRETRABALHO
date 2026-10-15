#!/usr/bin/env bash
set -euo pipefail
# Existing CI only: all database, API and browser origins must be disposable localhost.
node -e 'const u=new URL(process.env.DATABASE_URL||"");if(!["postgres:","postgresql:"].includes(u.protocol)||!["127.0.0.1","localhost"].includes(u.hostname)||!u.port)throw Error("Local disposable PostgreSQL required for browser journey")'
BROWSER_LOG_DIR="$(mktemp -d)"
BROWSER_API_PID=""
BROWSER_WEB_PID=""
cleanup_browser_journey(){
 [[ -z "$BROWSER_WEB_PID" ]] || kill "$BROWSER_WEB_PID" 2>/dev/null || true
 [[ -z "$BROWSER_API_PID" ]] || kill "$BROWSER_API_PID" 2>/dev/null || true
}
trap cleanup_browser_journey EXIT
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:3002 pnpm --filter @mlivretrabalho/web build > "$BROWSER_LOG_DIR/web-build.log" 2>&1 || { echo 'Browser fixture Web build failed' >&2; exit 1; }
PORT=3002 HOST=127.0.0.1 CORS_ORIGINS=http://127.0.0.1:3001 pnpm --filter @mlivretrabalho/api start > "$BROWSER_LOG_DIR/api.log" 2>&1 &
BROWSER_API_PID=$!
pnpm --filter @mlivretrabalho/web start --hostname 127.0.0.1 --port 3001 > "$BROWSER_LOG_DIR/web.log" 2>&1 &
BROWSER_WEB_PID=$!
for browser_fixture_step in $(seq 1 60); do
 if curl --fail --silent http://127.0.0.1:3002/v1/health/ready >/dev/null && curl --fail --silent http://127.0.0.1:3001 >/dev/null; then break; fi
 sleep 0.5
done
curl --fail --silent http://127.0.0.1:3002/v1/health/ready >/dev/null
curl --fail --silent http://127.0.0.1:3001 >/dev/null
BROWSER_MATRIX_STATUS=0
# Four distinct control cases, not retries. A failed case can never be replaced by a later PASS.
for browser_scenario in minimal journey; do
 for browser_diagnostic_case in baseline log-only native-only instrumented; do
 browser_api_offset="$(wc -c < "$BROWSER_LOG_DIR/api.log")"
 if BROWSER_SCENARIO="$browser_scenario" BROWSER_DIAGNOSTIC_MODE="$browser_diagnostic_case" BROWSER_API_URL=http://127.0.0.1:3002 BROWSER_WEB_URL=http://127.0.0.1:3001 node scripts/web-browser-journey-e2e.cjs; then
  echo "WEB_BROWSER_DIAGNOSTIC_CASE_RESULT $browser_scenario/$browser_diagnostic_case PASS"
 else
  browser_case_status=$?
  BROWSER_MATRIX_STATUS=1
  echo "WEB_BROWSER_DIAGNOSTIC_CASE_RESULT $browser_scenario/$browser_diagnostic_case FAIL exit=$browser_case_status"
  # Failure stays failure. Print only method/path/status/timing metadata from the fixture API.
  node - "$BROWSER_LOG_DIR/api.log" "$browser_diagnostic_case" "$browser_scenario" "$browser_api_offset" <<'NODE'
const fs=require('node:fs');const events=[];
const offset=Number(process.argv[5]);if(!Number.isSafeInteger(offset)||offset<0)throw Error('Invalid case log offset');
for(const line of fs.readFileSync(process.argv[2]).subarray(offset).toString('utf8').split('\n')){
 let row;try{row=JSON.parse(line);}catch{continue;}
 if(!row.reqId)continue;
 events.push({at:row.time,id:row.reqId,...(row.req?{method:row.req.method,path:new URL(row.req.url,'http://fixture.invalid').pathname}:{}),...(row.res?{status:row.res.statusCode}:{}),...(typeof row.responseTime==='number'?{responseTime:row.responseTime}:{})});
}
console.log('WEB_BROWSER_SERVER_DIAGNOSTIC '+JSON.stringify({scenario:process.argv[4],diagnostic:process.argv[3],scope:'only API bytes after this case started; method/path/status/timing metadata',events:events.slice(-300)}));
NODE
 fi
 done
done
echo "WEB_BROWSER_DIAGNOSTIC_MATRIX_RESULT status=$BROWSER_MATRIX_STATUS"
exit "$BROWSER_MATRIX_STATUS"



