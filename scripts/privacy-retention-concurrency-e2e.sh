#!/usr/bin/env bash
set -euo pipefail
DB_URL="${DATABASE_URL:?DATABASE_URL_required}"
LOCK_KEY='privacy-retention'
OPERATOR='e2e:privacy-retention-concurrency'

# Hold the same PostgreSQL advisory lock in another session. The destructive
# job must fail closed before any mutation or audit row is created.
psql "$DB_URL" -v ON_ERROR_STOP=1 -q -c "SELECT pg_advisory_lock(hashtextextended('$LOCK_KEY',0)); SELECT pg_sleep(4);" >/tmp/privacy-retention-lock-holder.log 2>&1 &
LOCK_PID=$!
sleep 1
if DATABASE_URL="$DB_URL" PRIVACY_MAINTENANCE_DATABASE_URL="$DB_URL" PRIVACY_OPERATOR_ID="$OPERATOR" node apps/api/dist/privacy-retention.js --apply >/tmp/privacy-retention-concurrent.log 2>&1; then
  echo 'FAIL: concurrent retention apply was accepted while advisory lock was held' >&2
  kill "$LOCK_PID" 2>/dev/null || true
  exit 1
fi
grep -q 'privacy_retention_already_running' /tmp/privacy-retention-concurrent.log
wait "$LOCK_PID"

# Simulate a process crash that left an audit row as running. Because the
# concurrency guard is connection-scoped, stale audit rows must not brick
# future maintenance; the next valid run marks them failed and proceeds.
STALE_ID="$(psql "$DB_URL" -Atc "INSERT INTO privacy_retention_runs(operator_id,status) VALUES('e2e:abandoned','running') RETURNING id")"
DATABASE_URL="$DB_URL" PRIVACY_MAINTENANCE_DATABASE_URL="$DB_URL" PRIVACY_OPERATOR_ID="$OPERATOR" node apps/api/dist/privacy-retention.js --apply >/tmp/privacy-retention-recovery.json
STALE_STATE="$(psql "$DB_URL" -AtF '|' -c "SELECT status,error_code,(completed_at IS NOT NULL)::int FROM privacy_retention_runs WHERE id='$STALE_ID'")"
test "$STALE_STATE" = 'failed|abandoned_before_completion|1'
LATEST_STATE="$(psql "$DB_URL" -AtF '|' -c "SELECT operator_id,status,(completed_at IS NOT NULL)::int FROM privacy_retention_runs WHERE operator_id='$OPERATOR' ORDER BY started_at DESC LIMIT 1")"
test "$LATEST_STATE" = "$OPERATOR|completed|1"
psql "$DB_URL" -v ON_ERROR_STOP=1 -q -c "DELETE FROM privacy_retention_runs WHERE id='$STALE_ID' OR operator_id='$OPERATOR'"
echo 'PASS: retention apply is single-run, crash-safe, and stale audit rows do not brick maintenance'
