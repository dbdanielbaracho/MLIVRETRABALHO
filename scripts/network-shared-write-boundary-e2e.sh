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


# A tenant-owned assignment must reference a job in that same tenant, even
# when a trusted runtime caller supplies a foreign UUID by mistake.
psql "$DB_URL" -v ON_ERROR_STOP=1 -q <<SQL
BEGIN;
SET LOCAL ROLE app_runtime;
SELECT set_config('app.tenant_id','$T1',true);
DO \$\$ BEGIN
 IF EXISTS(SELECT 1 FROM company_jobs WHERE id='$J2') THEN
  RAISE EXCEPTION 'cross_tenant_job_visible';
 END IF;
END \$\$;
INSERT INTO work_assignments(tenant_id,job_id,professional_id,status)
VALUES('$T1','$J1','$PROFILE','confirmed');
ROLLBACK;
SQL

if psql "$DB_URL" -v ON_ERROR_STOP=1 -q <<SQL >/tmp/assignment-job-tenant.out 2>/tmp/assignment-job-tenant.err
BEGIN;
SET LOCAL ROLE app_runtime;
SELECT set_config('app.tenant_id','$T1',true);
INSERT INTO work_assignments(tenant_id,job_id,professional_id,status)
VALUES('$T1','$J2','$PROFILE','confirmed');
ROLLBACK;
SQL
then
  echo 'FAIL: tenant T1 assignment referenced a job owned by T2' >&2
  exit 1
fi
grep -qi 'work_assignments_job_tenant_fk' /tmp/assignment-job-tenant.err

if psql "$DB_URL" -v ON_ERROR_STOP=1 -q <<SQL >/tmp/assignment-job-update.out 2>/tmp/assignment-job-update.err
BEGIN;
SET LOCAL ROLE app_runtime;
SELECT set_config('app.tenant_id','$T1',true);
INSERT INTO work_assignments(tenant_id,job_id,professional_id,status)
VALUES('$T1','$J1','$PROFILE','confirmed');
UPDATE work_assignments SET job_id='$J2'
 WHERE tenant_id='$T1' AND job_id='$J1' AND professional_id='$PROFILE';
ROLLBACK;
SQL
then
  echo 'FAIL: tenant T1 assignment switched its reference to a job owned by T2' >&2
  exit 1
fi
grep -qi 'work_assignments_job_tenant_fk' /tmp/assignment-job-update.err
echo 'PASS: assignment job FK rejects cross-tenant INSERT and UPDATE while own-tenant assignment remains allowed'



# Financial child rows must belong to the same tenant as their assignment.
# Only synthetic fixtures in the existing disposable CI database; all probes
# and cascade checks below are rolled back, including accepted negative writes.
psql "$DB_URL" -v ON_ERROR_STOP=1 -q <<SQL
BEGIN;
INSERT INTO work_assignments(id,tenant_id,job_id,professional_id,status) VALUES
 ('a7777777-7777-4777-8777-777777777777','$T1','$J1','$PROFILE','confirmed'),
 ('a8888888-8888-4888-8888-888888888888','$T2','$J2','$PROFILE','confirmed');
SET LOCAL ROLE app_runtime;
SELECT set_config('app.tenant_id','$T1',true);
DO \$\$
DECLARE
 violations integer := 0;
 rejected_by text;
BEGIN
 IF EXISTS(SELECT 1 FROM work_assignments WHERE id='a8888888-8888-4888-8888-888888888888') THEN
  RAISE EXCEPTION 'foreign_assignment_visible';
 END IF;
 INSERT INTO earnings_ledger(tenant_id,assignment_id,professional_id,amount_cents)
 VALUES('$T1','a7777777-7777-4777-8777-777777777777','$PROFILE',100);
 INSERT INTO payment_events(tenant_id,assignment_id,event_type,amount_cents,provider,idempotency_key)
 VALUES('$T1','a7777777-7777-4777-8777-777777777777','captured',100,'ci_fixture','financial-parent-own');
 IF (SELECT count(*) FROM earnings_ledger WHERE tenant_id='$T1')<>1
    OR (SELECT count(*) FROM payment_events WHERE tenant_id='$T1')<>1 THEN
  RAISE EXCEPTION 'financial_own_tenant_positive_control_failed';
 END IF;
 UPDATE earnings_ledger SET status='payable' WHERE assignment_id='a7777777-7777-4777-8777-777777777777';
 IF NOT FOUND THEN RAISE EXCEPTION 'ledger_own_update_failed'; END IF;
 IF has_table_privilege(current_user,'payment_events','UPDATE')
    OR has_table_privilege(current_user,'payment_events','DELETE')
    OR has_table_privilege(current_user,'earnings_ledger','DELETE') THEN
  RAISE EXCEPTION 'financial_immutable_grants_regressed';
 END IF;
 BEGIN
  INSERT INTO earnings_ledger(tenant_id,assignment_id,professional_id,amount_cents)
  VALUES('$T1','a8888888-8888-4888-8888-888888888888','$PROFILE',100);
  RAISE EXCEPTION USING ERRCODE='P9001',MESSAGE='probe_accepted';
 EXCEPTION
  WHEN SQLSTATE 'P9001' THEN
   violations := violations+1;
   RAISE NOTICE 'FAIL: cross-tenant ledger INSERT accepted';
  WHEN foreign_key_violation THEN
   GET STACKED DIAGNOSTICS rejected_by=CONSTRAINT_NAME;
   IF rejected_by<>'earnings_ledger_assignment_tenant_fk' THEN RAISE; END IF;
 END;
 BEGIN
  UPDATE earnings_ledger SET assignment_id='a8888888-8888-4888-8888-888888888888'
   WHERE assignment_id='a7777777-7777-4777-8777-777777777777';
  IF NOT FOUND THEN RAISE EXCEPTION 'ledger_probe_updated_zero_rows'; END IF;
  RAISE EXCEPTION USING ERRCODE='P9001',MESSAGE='probe_accepted';
 EXCEPTION
  WHEN SQLSTATE 'P9001' THEN
   violations := violations+1;
   RAISE NOTICE 'FAIL: cross-tenant ledger UPDATE accepted';
  WHEN foreign_key_violation THEN
   GET STACKED DIAGNOSTICS rejected_by=CONSTRAINT_NAME;
   IF rejected_by<>'earnings_ledger_assignment_tenant_fk' THEN RAISE; END IF;
 END;
 BEGIN
  INSERT INTO payment_events(tenant_id,assignment_id,event_type,amount_cents,provider,idempotency_key)
  VALUES('$T1','a8888888-8888-4888-8888-888888888888','captured',100,'ci_fixture','financial-parent-foreign');
  RAISE EXCEPTION USING ERRCODE='P9001',MESSAGE='probe_accepted';
 EXCEPTION
  WHEN SQLSTATE 'P9001' THEN
   violations := violations+1;
   RAISE NOTICE 'FAIL: cross-tenant payment event INSERT accepted';
  WHEN foreign_key_violation THEN
   GET STACKED DIAGNOSTICS rejected_by=CONSTRAINT_NAME;
   IF rejected_by<>'payment_events_assignment_tenant_fk' THEN RAISE; END IF;
 END;
 IF violations<>0 THEN
  RAISE EXCEPTION 'financial_assignment_tenant_integrity: % cross-tenant writes accepted',violations;
 END IF;
END;
\$\$;
RESET ROLE;
DELETE FROM work_assignments WHERE id='a7777777-7777-4777-8777-777777777777';
DO \$\$ BEGIN
 IF EXISTS(SELECT 1 FROM earnings_ledger WHERE assignment_id='a7777777-7777-4777-8777-777777777777')
    OR EXISTS(SELECT 1 FROM payment_events WHERE assignment_id='a7777777-7777-4777-8777-777777777777') THEN
  RAISE EXCEPTION 'financial_assignment_cascade_regressed';
 END IF;
END \$\$;
ROLLBACK;
SQL
echo 'PASS: financial assignment tenant FKs reject cross-tenant ledger INSERT/UPDATE and event INSERT; own writes, immutable grants and cascade preserved'


psql "$DB_URL" -v ON_ERROR_STOP=1 -q <<SQL
DELETE FROM professional_availability_network WHERE professional_id='$PROFILE';
DELETE FROM marketplace_interests WHERE professional_id='$PROFILE';
DELETE FROM company_jobs WHERE id IN('$J1','$J2');
DELETE FROM professional_profiles WHERE id='$PROFILE';
DELETE FROM identities WHERE id='$IDENTITY';
DELETE FROM tenants WHERE id IN('$T1','$T2');
SQL

echo 'PASS: NETWORK_SHARED runtime writes are least-privilege and tenant-bound'
