#!/usr/bin/env bash
set -euo pipefail

DB_URL="${DATABASE_URL:?DATABASE_URL_required}"
STAMP="$(date +%s)-$RANDOM"
VALID_EMAIL="db-invariant-${STAMP}@example.test"

expect_fail(){
  local sql="$1" marker="$2"
  if psql "$DB_URL" -v ON_ERROR_STOP=1 -q -c "$sql" >/tmp/auth-db-invariant.out 2>/tmp/auth-db-invariant.err; then
    echo "FAIL: expected database rejection for $marker" >&2
    exit 1
  fi
}

expect_fail "INSERT INTO identities(email,password_hash) VALUES('missing-at-${STAMP}','x')" email_missing_at
expect_fail "INSERT INTO identities(email,password_hash) VALUES('white space-${STAMP}@example.test','x')" email_whitespace

IDENTITY_ID="$(psql "$DB_URL" -tAc "INSERT INTO identities(email,password_hash) VALUES('$VALID_EMAIL','x') RETURNING id")"
test -n "$IDENTITY_ID"

expect_fail "INSERT INTO sessions(identity_id,token_hash,expires_at,created_at) VALUES('$IDENTITY_ID',repeat('a',64),now()-interval '1 minute',now())" session_expiry

psql "$DB_URL" -v ON_ERROR_STOP=1 -q -c "DELETE FROM identities WHERE id='$IDENTITY_ID'"

echo 'PASS: identity email shape and session expiry invariants are enforced by PostgreSQL'
