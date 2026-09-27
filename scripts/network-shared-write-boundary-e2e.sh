#!/usr/bin/env bash
set -euo pipefail

DB_URL="${DATABASE_URL:?DATABASE_URL_required}"
T1="a1111111-1111-4111-8111-111111111111"
T2="a2222222-2222-4222-8222-222222222222"
IDENTITY="a3333333-3333-4333-8333-333333333333"
PROFILE="a4444444-4444-4444-8444-444444444444"
J1="a5555555-5555-4555-8555-555555555555"
J2="a6666666-6666-4666-8666-666666666666"

psql "$DB_URL" -v ON_ERROR_STOP=1 -q <<SQL
INSERT INTO tenants(id,slug,display_name) VALUES
 ('$T1','network-boundary-t1','Network Boundary T1'),
 ('$T2','network-boundary-t2','Network Boundary T2')
ON CONFLICT(id) DO NOTHING;
INSERT INTO identities(id,email,password_hash) VALUES('$IDENTITY','network-boundary@example.test','x') ON CONFLICT(id) DO NOTHING;
INSERT INTO professional_profiles(id,subject_id,identity_id,display_name) VALUES('$PROFILE','$IDENTITY','$IDENTITY','Network Boundary') ON CONFLICT(id) DO NOTHING;
INSERT INTO company_jobs(id,tenant_id,title,status) VALUES
 ('$J1','$T1','Network Boundary Job 1','open'),
 ('$J2','$T2','Network Boundary Job 2','open')
ON CONFLICT(id) DO NOTHING;
INSERT INTO marketplace_interests(job_id,professional_id,status) VALUES
 ('$J1','$PROFILE','interested'),
 ('$J2','$PROFILE','interested')
ON CONFLICT(job_id,professional_id) DO UPDATE SET status='interested';
INSERT INTO professional_availability_network(professional_id,starts_at,ends_at)
VALUES('$PROFILE',now()+interval '1 day',now()+interval '2 days')
ON CONFLICT DO NOTHING;
SQL

if psql "$DB_URL" -v ON_ERROR_STOP=1 -q <<SQL >/tmp/network-direct-write.out 2>/tmp/network-direct-write.err
BEGIN;
SET LOCAL ROLE app_runtime;
SELECT set_config('app.tenant_id','$T1',true);
UPDATE marketplace_interests SET status='confirmed' WHERE job_id='$J1' AND professional_id='$PROFILE';
COMMIT;
SQL
then
  echo 'FAIL: app_runtime could update marketplace_interests directly' >&2
  exit 1
fi

grep -qi 'permission denied' /tmp/network-direct-write.err

psql "$DB_URL" -v ON_ERROR_STOP=1 -q <<SQL
BEGIN;
SET LOCAL ROLE app_runtime;
SELECT set_config('app.tenant_id','$T1',true);
SELECT confirm_marketplace_interest('$J1','$PROFILE');
COMMIT;
SQL

test "$(psql "$DB_URL" -tAc "SELECT status FROM marketplace_interests WHERE job_id='$J1' AND professional_id='$PROFILE'")" = "confirmed"

if psql "$DB_URL" -v ON_ERROR_STOP=1 -q <<SQL >/tmp/network-cross-tenant.out 2>/tmp/network-cross-tenant.err
BEGIN;
SET LOCAL ROLE app_runtime;
SELECT set_config('app.tenant_id','$T1',true);
SELECT confirm_marketplace_interest('$J2','$PROFILE');
COMMIT;
SQL
then
  echo 'FAIL: tenant T1 confirmed marketplace interest owned by T2' >&2
  exit 1
fi

grep -q 'marketplace_interest_not_confirmable' /tmp/network-cross-tenant.err
test "$(psql "$DB_URL" -tAc "SELECT status FROM marketplace_interests WHERE job_id='$J2' AND professional_id='$PROFILE'")" = "interested"

if psql "$DB_URL" -v ON_ERROR_STOP=1 -q <<SQL >/tmp/network-availability-write.out 2>/tmp/network-availability-write.err
BEGIN;
SET LOCAL ROLE app_runtime;
SELECT set_config('app.tenant_id','$T1',true);
DELETE FROM professional_availability_network WHERE professional_id='$PROFILE';
COMMIT;
SQL
then
  echo 'FAIL: app_runtime could delete professional network availability directly' >&2
  exit 1
fi

grep -qi 'permission denied' /tmp/network-availability-write.err

psql "$DB_URL" -v ON_ERROR_STOP=1 -q <<SQL
DELETE FROM professional_availability_network WHERE professional_id='$PROFILE';
DELETE FROM marketplace_interests WHERE professional_id='$PROFILE';
DELETE FROM company_jobs WHERE id IN('$J1','$J2');
DELETE FROM professional_profiles WHERE id='$PROFILE';
DELETE FROM identities WHERE id='$IDENTITY';
DELETE FROM tenants WHERE id IN('$T1','$T2');
SQL

echo 'PASS: NETWORK_SHARED runtime writes are least-privilege and tenant-bound'
