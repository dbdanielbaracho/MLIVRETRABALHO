#!/usr/bin/env bash
set -euo pipefail
DB_URL="${DATABASE_URL:-postgresql://postgres:postgres@localhost:5432/mlivretrabalho}"
TENANT="81111111-2222-4333-8444-555555555555"
IDENTITY="8aaaaaaa-1111-4111-8111-111111111111"
PROFILE="8bbbbbbb-1111-4111-8111-111111111111"
JOB="8ccccccc-1111-4111-8111-111111111111"
ASSIGNMENT="8ddddddd-1111-4111-8111-111111111111"
EARNING="8eeeeeee-1111-4111-8111-111111111111"

psql "$DB_URL" -v ON_ERROR_STOP=1 -q <<SQL
INSERT INTO tenants(id,slug,display_name) VALUES('$TENANT','ledger-no-delete','Ledger No Delete') ON CONFLICT DO NOTHING;
INSERT INTO identities(id,email,password_hash) VALUES('$IDENTITY','ledger-no-delete@example.test','x') ON CONFLICT DO NOTHING;
INSERT INTO professional_profiles(id,subject_id,identity_id,display_name) VALUES('$PROFILE','$IDENTITY','$IDENTITY','Ledger Test') ON CONFLICT(id) DO NOTHING;
INSERT INTO company_jobs(id,tenant_id,title,status) VALUES('$JOB','$TENANT','Ledger Test','closed') ON CONFLICT(id) DO NOTHING;
INSERT INTO work_assignments(id,tenant_id,job_id,professional_id,status) VALUES('$ASSIGNMENT','$TENANT','$JOB','$PROFILE','completed') ON CONFLICT(id) DO NOTHING;
INSERT INTO earnings_ledger(id,tenant_id,assignment_id,professional_id,amount_cents,status) VALUES('$EARNING','$TENANT','$ASSIGNMENT','$PROFILE',1000,'paid') ON CONFLICT(id) DO NOTHING;
SQL

if psql "$DB_URL" -v ON_ERROR_STOP=1 -q <<SQL
BEGIN;
SET LOCAL ROLE app_runtime;
SELECT set_config('app.tenant_id','$TENANT',true);
DELETE FROM earnings_ledger WHERE id='$EARNING';
COMMIT;
SQL
then
  echo 'FAIL: app_runtime deleted earnings_ledger row' >&2
  exit 1
fi

REMAINS="$(psql "$DB_URL" -tAc "SELECT count(*) FROM earnings_ledger WHERE id='$EARNING'")"
test "$REMAINS" = "1"

psql "$DB_URL" -v ON_ERROR_STOP=1 -q <<SQL
DELETE FROM identities WHERE id='$IDENTITY';
DELETE FROM tenants WHERE id='$TENANT';
SQL

echo 'PASS: app_runtime cannot delete earnings ledger rows'
