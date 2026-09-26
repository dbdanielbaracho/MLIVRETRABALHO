#!/usr/bin/env bash
set -euo pipefail

DB_URL="${DATABASE_URL:-postgresql://postgres:postgres@localhost:5432/mlivretrabalho}"
STAMP="$(date +%s)-$RANDOM"
EMAIL="profile-${STAMP}@example.test"
PASSWORD_HASH="test-only-hash-${STAMP}"

IDENTITY_ID="$(psql "$DB_URL" -v ON_ERROR_STOP=1 -tAc "INSERT INTO identities(email,password_hash) VALUES ('$EMAIL','$PASSWORD_HASH') RETURNING id")"

psql "$DB_URL" -v ON_ERROR_STOP=1 -q <<SQL
INSERT INTO professional_profiles(subject_id,identity_id,display_name,home_city,primary_role)
VALUES ('$IDENTITY_ID','$IDENTITY_ID','Profile Identity Test','São Paulo','Bartender');
SQL

BOUND="$(psql "$DB_URL" -v ON_ERROR_STOP=1 -tAc "SELECT identity_id::text FROM professional_profiles WHERE subject_id='$IDENTITY_ID'")"
test "$BOUND" = "$IDENTITY_ID"

DUP_STATUS=0
psql "$DB_URL" -v ON_ERROR_STOP=1 -q <<SQL || DUP_STATUS=$?
INSERT INTO professional_profiles(subject_id,identity_id,display_name)
VALUES (gen_random_uuid(),'$IDENTITY_ID','Duplicate Identity');
SQL

test "$DUP_STATUS" -ne 0

psql "$DB_URL" -v ON_ERROR_STOP=1 -q <<SQL
DELETE FROM professional_profiles WHERE identity_id='$IDENTITY_ID';
DELETE FROM identities WHERE id='$IDENTITY_ID';
SQL

echo "PASS: professional profile identity binding"
