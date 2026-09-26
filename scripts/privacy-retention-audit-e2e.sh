#!/usr/bin/env bash
set -euo pipefail
DB_URL="${DATABASE_URL:?DATABASE_URL_required}"
EXPECTED_OPERATOR="${EXPECTED_OPERATOR:?EXPECTED_OPERATOR_required}"
ROW="$(psql "$DB_URL" -AtF '|' -c "SELECT operator_id,status,expired_sessions,geo_candidates,profile_candidates,chat_candidates,(completed_at IS NOT NULL)::int FROM privacy_retention_runs ORDER BY started_at DESC LIMIT 1")"
IFS='|' read -r OP STATUS EXPIRED GEO PROFILE CHAT COMPLETED <<<"$ROW"
test "$OP" = "$EXPECTED_OPERATOR"
test "$STATUS" = "completed"
test "$COMPLETED" = "1"
for VALUE in "$EXPIRED" "$GEO" "$PROFILE" "$CHAT"; do [[ "$VALUE" =~ ^[0-9]+$ ]]; done
psql "$DB_URL" -v ON_ERROR_STOP=1 -q -c "DELETE FROM privacy_retention_runs WHERE operator_id='$EXPECTED_OPERATOR'"
echo 'PASS: destructive retention execution is operator-audited and completed'
DATABASE_URL="$DB_URL" bash scripts/privacy-retention-concurrency-e2e.sh
