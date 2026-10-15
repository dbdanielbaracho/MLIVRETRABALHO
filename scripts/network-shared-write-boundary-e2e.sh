#!/usr/bin/env bash
set -euo pipefail

DB_URL="${DATABASE_URL:?DATABASE_URL_required}"
T1="a1111111-1111-4111-8111-111111111111"
T2="a2222222-2222-4222-8222-222222222222"
IDENTITY="a3333333-3333-4333-8333-333333333333"
PROFILE="a4444444-4444-4444-8444-444444444444"
J1="a5555555-5555-4555-8555-555555555555"
J2="a6666666-6666-4666-8666-666666666666"

# Read-only catalog evidence: every public-schema child FK, including ALTER-added ones.
# RLS flags are observed metadata, not a substitute for approved data-scope classification.
psql "$DB_URL" -v ON_ERROR_STOP=1 -At <<'SQL'
SELECT 'TENANT_FK_INVENTORY ' || jsonb_build_object(
 'schema','public','foreignKeyCount',count(*),'foreignKeys',coalesce(jsonb_agg(
 jsonb_build_object(
  'child',child.relname,'parentSchema',parent_ns.nspname,'parent',parent.relname,
  'constraint',c.conname,'validated',c.convalidated,
  'childRls',child.relrowsecurity,'childForceRls',child.relforcerowsecurity,
  'parentRls',parent.relrowsecurity,'parentForceRls',parent.relforcerowsecurity,
  'columns',ARRAY(SELECT a.attname FROM unnest(c.conkey) WITH ORDINALITY k(attnum,position)
    JOIN pg_attribute a ON a.attrelid=c.conrelid AND a.attnum=k.attnum ORDER BY k.position),
  'parentColumns',ARRAY(SELECT a.attname FROM unnest(c.confkey) WITH ORDINALITY k(attnum,position)
    JOIN pg_attribute a ON a.attrelid=c.confrelid AND a.attnum=k.attnum ORDER BY k.position),
  'definition',pg_get_constraintdef(c.oid)
 ) ORDER BY child.relname,c.conname),'[]'::jsonb))::text
FROM pg_constraint c
JOIN pg_class child ON child.oid=c.conrelid
JOIN pg_namespace child_ns ON child_ns.oid=child.relnamespace
JOIN pg_class parent ON parent.oid=c.confrelid
JOIN pg_namespace parent_ns ON parent_ns.oid=parent.relnamespace
WHERE c.contype='f' AND child_ns.nspname='public';
SQL

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



# Both links in the private conversation chain must remain within one tenant.
# Keep NULL assignment compatibility and the original cascade; roll back all fixtures.
psql "$DB_URL" -v ON_ERROR_STOP=1 -q <<SQL
BEGIN;
INSERT INTO work_assignments(id,tenant_id,job_id,professional_id,status) VALUES
 ('a7777777-7777-4777-8777-777777777777','$T1','$J1','$PROFILE','confirmed'),
 ('a8888888-8888-4888-8888-888888888888','$T2','$J2','$PROFILE','confirmed');
INSERT INTO conversations(id,tenant_id,assignment_id)
VALUES('b2222222-2222-4222-8222-222222222222','$T2','a8888888-8888-4888-8888-888888888888');
SET LOCAL ROLE app_runtime;
SELECT set_config('app.tenant_id','$T1',true);
DO \$\$
DECLARE
 probe record;
 violations integer := 0;
 affected integer;
 rejected_by text;
BEGIN
 IF EXISTS(SELECT 1 FROM work_assignments WHERE id='a8888888-8888-4888-8888-888888888888')
    OR EXISTS(SELECT 1 FROM conversations WHERE id='b2222222-2222-4222-8222-222222222222') THEN
  RAISE EXCEPTION 'foreign_chat_parent_visible';
 END IF;
 INSERT INTO conversations(id,tenant_id,assignment_id) VALUES
 ('b1111111-1111-4111-8111-111111111111','$T1','a7777777-7777-4777-8777-777777777777'),
 ('b4444444-4444-4444-8444-444444444444','$T1',NULL);
 INSERT INTO conversation_messages(id,tenant_id,conversation_id,sender_identity_id,body)
 VALUES('b3333333-3333-4333-8333-333333333333','$T1','b1111111-1111-4111-8111-111111111111','$IDENTITY','own message');
 UPDATE conversation_messages SET body='own message updated' WHERE id='b3333333-3333-4333-8333-333333333333';
 IF NOT FOUND THEN RAISE EXCEPTION 'chat_own_update_failed'; END IF;
 IF (SELECT count(*) FROM conversations WHERE tenant_id='$T1')<>2
    OR (SELECT body FROM conversation_messages WHERE id='b3333333-3333-4333-8333-333333333333')<>'own message updated' THEN
  RAISE EXCEPTION 'chat_own_positive_control_failed';
 END IF;
 FOR probe IN SELECT * FROM (VALUES
  ('conversation INSERT','conversations_assignment_tenant_fk','INSERT INTO conversations(tenant_id,assignment_id) VALUES(''$T1'',''a8888888-8888-4888-8888-888888888888'')'),
  ('conversation UPDATE','conversations_assignment_tenant_fk','UPDATE conversations SET assignment_id=''a8888888-8888-4888-8888-888888888888'' WHERE id=''b1111111-1111-4111-8111-111111111111'''),
  ('message INSERT','conversation_messages_conversation_tenant_fk','INSERT INTO conversation_messages(tenant_id,conversation_id,sender_identity_id,body) VALUES(''$T1'',''b2222222-2222-4222-8222-222222222222'',''$IDENTITY'',''foreign conversation probe'')'),
  ('message UPDATE','conversation_messages_conversation_tenant_fk','UPDATE conversation_messages SET conversation_id=''b2222222-2222-4222-8222-222222222222'' WHERE id=''b3333333-3333-4333-8333-333333333333''')
 ) AS cases(label,expected_constraint,statement)
 LOOP
  BEGIN
   EXECUTE probe.statement;
   GET DIAGNOSTICS affected=ROW_COUNT;
   IF affected<>1 THEN RAISE EXCEPTION 'chat_probe_did_not_write_one_row'; END IF;
   RAISE EXCEPTION USING ERRCODE='P9001',MESSAGE='probe_accepted';
  EXCEPTION
   WHEN SQLSTATE 'P9001' THEN
    violations := violations+1;
    RAISE NOTICE 'FAIL: cross-tenant % accepted',probe.label;
   WHEN foreign_key_violation THEN
    GET STACKED DIAGNOSTICS rejected_by=CONSTRAINT_NAME;
    IF rejected_by<>probe.expected_constraint THEN RAISE; END IF;
  END;
 END LOOP;
 IF violations<>0 THEN
  RAISE EXCEPTION 'conversation_tenant_integrity: % cross-tenant writes accepted',violations;
 END IF;
END;
\$\$;
RESET ROLE;
DELETE FROM work_assignments WHERE id='a7777777-7777-4777-8777-777777777777';
DO \$\$ BEGIN
 IF EXISTS(SELECT 1 FROM conversations WHERE id='b1111111-1111-4111-8111-111111111111')
    OR EXISTS(SELECT 1 FROM conversation_messages WHERE id='b3333333-3333-4333-8333-333333333333')
    OR NOT EXISTS(SELECT 1 FROM conversations WHERE id='b4444444-4444-4444-8444-444444444444' AND assignment_id IS NULL) THEN
  RAISE EXCEPTION 'conversation_cascade_or_nullable_contract_regressed';
 END IF;
END \$\$;
ROLLBACK;
SQL
echo 'PASS: conversation tenant FKs reject four cross-tenant writes; own writes, NULL assignment and cascade preserved'


# Both directions of a private rating must reference an assignment in the same tenant.
# Positive UPSERT, visibility, immutable grants, shared aggregate and cascade controls.
psql "$DB_URL" -v ON_ERROR_STOP=1 -q <<SQL
BEGIN;
INSERT INTO identities(id,email,password_hash)
 VALUES('c6666666-6666-4666-8666-666666666666','rating-boundary-foreign@example.test','x');
INSERT INTO work_assignments(id,tenant_id,job_id,professional_id,status) VALUES
 ('a7777777-7777-4777-8777-777777777777','$T1','$J1','$PROFILE','completed'),
 ('a8888888-8888-4888-8888-888888888888','$T2','$J2','$PROFILE','completed');
INSERT INTO work_ratings(id,tenant_id,assignment_id,rater_identity_id,professional_id,score)
 VALUES('c4444444-4444-4444-8444-444444444444','$T2','a8888888-8888-4888-8888-888888888888','c6666666-6666-4666-8666-666666666666','$PROFILE',2);
INSERT INTO company_work_ratings(id,tenant_id,assignment_id,rater_identity_id,professional_id,score)
 VALUES('c5555555-5555-4555-8555-555555555555','$T2','a8888888-8888-4888-8888-888888888888','c6666666-6666-4666-8666-666666666666','$PROFILE',2);
SET LOCAL ROLE app_runtime;
SELECT set_config('app.tenant_id','$T1',true);
DO \$\$
DECLARE
 probe record;
 violations integer := 0;
 affected integer;
 rejected_by text;
BEGIN
 IF EXISTS(SELECT 1 FROM work_assignments WHERE id='a8888888-8888-4888-8888-888888888888')
    OR EXISTS(SELECT 1 FROM work_ratings WHERE id='c4444444-4444-4444-8444-444444444444')
    OR EXISTS(SELECT 1 FROM company_work_ratings WHERE id='c5555555-5555-4555-8555-555555555555') THEN
  RAISE EXCEPTION 'foreign_rating_or_assignment_visible';
 END IF;
 IF NOT has_table_privilege(current_user,'work_ratings','DELETE')
    OR has_table_privilege(current_user,'company_work_ratings','DELETE') THEN
  RAISE EXCEPTION 'rating_delete_grants_regressed';
 END IF;
 INSERT INTO work_ratings(id,tenant_id,assignment_id,rater_identity_id,professional_id,score,comment)
 VALUES('c2222222-2222-4222-8222-222222222222','$T1','a7777777-7777-4777-8777-777777777777','$IDENTITY','$PROFILE',4,'own professional rating');
 INSERT INTO company_work_ratings(id,tenant_id,assignment_id,rater_identity_id,professional_id,score,comment)
 VALUES('c3333333-3333-4333-8333-333333333333','$T1','a7777777-7777-4777-8777-777777777777','$IDENTITY','$PROFILE',4,'own company rating');
 INSERT INTO work_ratings(tenant_id,assignment_id,rater_identity_id,professional_id,score,comment)
 VALUES('$T1','a7777777-7777-4777-8777-777777777777','$IDENTITY','$PROFILE',5,'updated professional rating')
 ON CONFLICT(assignment_id,rater_identity_id) DO UPDATE SET score=EXCLUDED.score,comment=EXCLUDED.comment;
 INSERT INTO company_work_ratings(tenant_id,assignment_id,rater_identity_id,professional_id,score,comment)
 VALUES('$T1','a7777777-7777-4777-8777-777777777777','$IDENTITY','$PROFILE',3,'updated company rating')
 ON CONFLICT(assignment_id,rater_identity_id) DO UPDATE SET score=EXCLUDED.score,comment=EXCLUDED.comment,updated_at=now();
 IF (SELECT count(*) FROM work_ratings)<>1 OR (SELECT count(*) FROM company_work_ratings)<>1
    OR NOT EXISTS(SELECT 1 FROM work_ratings WHERE id='c2222222-2222-4222-8222-222222222222' AND score=5 AND comment='updated professional rating')
    OR NOT EXISTS(SELECT 1 FROM company_work_ratings WHERE id='c3333333-3333-4333-8333-333333333333' AND score=3 AND comment='updated company rating')
    OR NOT EXISTS(SELECT 1 FROM marketplace_company_reputation WHERE tenant_id='$T1' AND rating_count=1 AND average_rating=3)
    OR NOT EXISTS(SELECT 1 FROM marketplace_company_reputation WHERE tenant_id='$T2' AND rating_count=1 AND average_rating=2) THEN
  RAISE EXCEPTION 'rating_own_upsert_or_shared_aggregate_regressed';
 END IF;
 FOR probe IN SELECT * FROM (VALUES
  ('professional rating INSERT','work_ratings_assignment_tenant_fk','INSERT INTO work_ratings(tenant_id,assignment_id,rater_identity_id,professional_id,score) VALUES(''$T1'',''a8888888-8888-4888-8888-888888888888'',''$IDENTITY'',''$PROFILE'',4)'),
  ('professional rating UPDATE','work_ratings_assignment_tenant_fk','UPDATE work_ratings SET assignment_id=''a8888888-8888-4888-8888-888888888888'' WHERE id=''c2222222-2222-4222-8222-222222222222'''),
  ('company rating INSERT','company_work_ratings_assignment_tenant_fk','INSERT INTO company_work_ratings(tenant_id,assignment_id,rater_identity_id,professional_id,score) VALUES(''$T1'',''a8888888-8888-4888-8888-888888888888'',''$IDENTITY'',''$PROFILE'',4)'),
  ('company rating UPDATE','company_work_ratings_assignment_tenant_fk','UPDATE company_work_ratings SET assignment_id=''a8888888-8888-4888-8888-888888888888'' WHERE id=''c3333333-3333-4333-8333-333333333333''')
 ) AS cases(label,expected_constraint,statement)
 LOOP
  BEGIN
   EXECUTE probe.statement;
   GET DIAGNOSTICS affected=ROW_COUNT;
   IF affected<>1 THEN RAISE EXCEPTION 'rating_probe_did_not_write_one_row'; END IF;
   RAISE EXCEPTION USING ERRCODE='P9001',MESSAGE='probe_accepted';
  EXCEPTION
   WHEN SQLSTATE 'P9001' THEN
    violations := violations+1;
    RAISE NOTICE 'FAIL: cross-tenant % accepted',probe.label;
   WHEN foreign_key_violation THEN
    GET STACKED DIAGNOSTICS rejected_by=CONSTRAINT_NAME;
    IF rejected_by<>probe.expected_constraint THEN RAISE; END IF;
  END;
 END LOOP;
 IF violations<>0 THEN
  RAISE EXCEPTION 'rating_assignment_tenant_integrity: % cross-tenant writes accepted',violations;
 END IF;
END;
\$\$;
RESET ROLE;
DELETE FROM work_assignments WHERE id='a7777777-7777-4777-8777-777777777777';
DO \$\$ BEGIN
 IF EXISTS(SELECT 1 FROM work_ratings WHERE id='c2222222-2222-4222-8222-222222222222')
    OR EXISTS(SELECT 1 FROM company_work_ratings WHERE id='c3333333-3333-4333-8333-333333333333')
    OR EXISTS(SELECT 1 FROM marketplace_company_reputation WHERE tenant_id='$T1')
    OR NOT EXISTS(SELECT 1 FROM work_ratings WHERE id='c4444444-4444-4444-8444-444444444444' AND score=2)
    OR NOT EXISTS(SELECT 1 FROM company_work_ratings WHERE id='c5555555-5555-4555-8555-555555555555' AND score=2)
    OR NOT EXISTS(SELECT 1 FROM marketplace_company_reputation WHERE tenant_id='$T2' AND rating_count=1 AND average_rating=2) THEN
  RAISE EXCEPTION 'rating_cascade_or_foreign_aggregate_regressed';
 END IF;
END \$\$;
ROLLBACK;
SQL
echo 'PASS: rating tenant FKs reject four cross-tenant writes; own UPSERT, private rows, shared aggregates, grants and cascade preserved'


# Case events, appeals and appeal events are immutable private tenant chains.
# Do not grant UPDATE/DELETE merely to test them; roll back the complete fixture.
psql "$DB_URL" -v ON_ERROR_STOP=1 -q <<SQL
BEGIN;
INSERT INTO identities(id,email,password_hash)
 VALUES('d9999999-9999-4999-8999-999999999999','safety-chain-foreign@example.test','x');
INSERT INTO safety_cases(id,tenant_id,reporter_identity_id,assignment_id,category,description) VALUES
 ('d1111111-1111-4111-8111-111111111111','$T1','$IDENTITY',NULL,'other','own fixture case'),
 ('d2222222-2222-4222-8222-222222222222','$T2','$IDENTITY',NULL,'other','foreign fixture case');
INSERT INTO safety_case_appeals(id,tenant_id,safety_case_id,appellant_identity_id,reason)
 VALUES('d3333333-3333-4333-8333-333333333333','$T2','d2222222-2222-4222-8222-222222222222','d9999999-9999-4999-8999-999999999999','foreign fixture appeal');
SET LOCAL ROLE app_runtime;
SELECT set_config('app.tenant_id','$T1',true);
DO \$\$
DECLARE
 probe record;
 relation_name text;
 violations integer := 0;
 affected integer;
 rejected_by text;
BEGIN
 IF EXISTS(SELECT 1 FROM safety_cases WHERE id='d2222222-2222-4222-8222-222222222222')
    OR EXISTS(SELECT 1 FROM safety_case_appeals WHERE id='d3333333-3333-4333-8333-333333333333') THEN
  RAISE EXCEPTION 'foreign_safety_parent_visible';
 END IF;
 FOREACH relation_name IN ARRAY ARRAY['safety_case_events','safety_case_appeals','safety_case_appeal_events']
 LOOP
  IF has_table_privilege(current_user,relation_name,'UPDATE')
     OR has_table_privilege(current_user,relation_name,'DELETE') THEN
   RAISE EXCEPTION 'safety_chain_immutable_grants_regressed: %',relation_name;
  END IF;
 END LOOP;
 IF has_table_privilege(current_user,'safety_cases','DELETE') THEN
  RAISE EXCEPTION 'safety_case_delete_grant_regressed';
 END IF;
 INSERT INTO safety_case_events(id,tenant_id,safety_case_id,actor_identity_id,from_status,to_status,note)
 VALUES('d4444444-4444-4444-8444-444444444444','$T1','d1111111-1111-4111-8111-111111111111','$IDENTITY','open','reviewing','own fixture event');
 INSERT INTO safety_case_appeals(id,tenant_id,safety_case_id,appellant_identity_id,reason)
 VALUES('d5555555-5555-4555-8555-555555555555','$T1','d1111111-1111-4111-8111-111111111111','$IDENTITY','own fixture appeal');
 INSERT INTO safety_case_appeals(tenant_id,safety_case_id,appellant_identity_id,reason)
 VALUES('$T1','d1111111-1111-4111-8111-111111111111','$IDENTITY','duplicate fixture appeal')
 ON CONFLICT(safety_case_id,appellant_identity_id) DO NOTHING;
 GET DIAGNOSTICS affected=ROW_COUNT;
 IF affected<>0 THEN RAISE EXCEPTION 'safety_appeal_idempotency_regressed'; END IF;
 INSERT INTO safety_case_appeal_events(id,tenant_id,appeal_id,actor_identity_id,from_status,to_status,note)
 VALUES('d6666666-6666-4666-8666-666666666666','$T1','d5555555-5555-4555-8555-555555555555','$IDENTITY','submitted','reviewing','own fixture appeal event');
 IF (SELECT count(*) FROM safety_case_events)<>1
    OR (SELECT count(*) FROM safety_case_appeals)<>1
    OR (SELECT count(*) FROM safety_case_appeal_events)<>1 THEN
  RAISE EXCEPTION 'safety_chain_own_insert_or_visibility_regressed';
 END IF;
 FOR probe IN SELECT * FROM (VALUES
  ('case event INSERT','safety_case_events_case_tenant_fk','INSERT INTO safety_case_events(tenant_id,safety_case_id,actor_identity_id,from_status,to_status) VALUES(''$T1'',''d2222222-2222-4222-8222-222222222222'',''$IDENTITY'',''open'',''reviewing'')'),
  ('appeal INSERT','safety_case_appeals_case_tenant_fk','INSERT INTO safety_case_appeals(tenant_id,safety_case_id,appellant_identity_id,reason) VALUES(''$T1'',''d2222222-2222-4222-8222-222222222222'',''$IDENTITY'',''foreign case probe'')'),
  ('appeal event INSERT','safety_case_appeal_events_appeal_tenant_fk','INSERT INTO safety_case_appeal_events(tenant_id,appeal_id,actor_identity_id,from_status,to_status) VALUES(''$T1'',''d3333333-3333-4333-8333-333333333333'',''$IDENTITY'',''submitted'',''reviewing'')')
 ) AS cases(label,expected_constraint,statement)
 LOOP
  BEGIN
   EXECUTE probe.statement;
   GET DIAGNOSTICS affected=ROW_COUNT;
   IF affected<>1 THEN RAISE EXCEPTION 'safety_chain_probe_did_not_write_one_row'; END IF;
   RAISE EXCEPTION USING ERRCODE='P9001',MESSAGE='probe_accepted';
  EXCEPTION
   WHEN SQLSTATE 'P9001' THEN
    violations := violations+1;
    RAISE NOTICE 'FAIL: cross-tenant % accepted',probe.label;
   WHEN foreign_key_violation THEN
    GET STACKED DIAGNOSTICS rejected_by=CONSTRAINT_NAME;
    IF rejected_by<>probe.expected_constraint THEN RAISE; END IF;
  END;
 END LOOP;
 IF violations<>0 THEN
  RAISE EXCEPTION 'safety_chain_tenant_integrity: % cross-tenant writes accepted',violations;
 END IF;
END;
\$\$;
RESET ROLE;
DELETE FROM safety_cases WHERE id='d1111111-1111-4111-8111-111111111111';
DO \$\$ BEGIN
 IF EXISTS(SELECT 1 FROM safety_case_events WHERE id='d4444444-4444-4444-8444-444444444444')
    OR EXISTS(SELECT 1 FROM safety_case_appeals WHERE id='d5555555-5555-4555-8555-555555555555')
    OR EXISTS(SELECT 1 FROM safety_case_appeal_events WHERE id='d6666666-6666-4666-8666-666666666666')
    OR NOT EXISTS(SELECT 1 FROM safety_cases WHERE id='d2222222-2222-4222-8222-222222222222' AND tenant_id='$T2' AND assignment_id IS NULL)
    OR NOT EXISTS(SELECT 1 FROM safety_case_appeals WHERE id='d3333333-3333-4333-8333-333333333333' AND tenant_id='$T2') THEN
  RAISE EXCEPTION 'safety_chain_cascade_or_foreign_rows_regressed';
 END IF;
END \$\$;
ROLLBACK;
SQL
echo 'PASS: safety chain tenant FKs reject three cross-tenant INSERTs; own immutable events, appeal idempotency and cascade preserved'


# Optional assignment links must match their case/event tenant without losing NULL/history semantics.
# Only disposable CI fixtures; negative probes and the full transaction roll back.
psql "$DB_URL" -v ON_ERROR_STOP=1 -q <<SQL
BEGIN;
INSERT INTO work_assignments(id,tenant_id,job_id,professional_id,status) VALUES
 ('a7777777-7777-4777-8777-777777777777','$T1','$J1','$PROFILE','confirmed'),
 ('a8888888-8888-4888-8888-888888888888','$T2','$J2','$PROFILE','confirmed');
SET LOCAL ROLE app_runtime;
SELECT set_config('app.tenant_id','$T1',true);
DO \$\$
DECLARE
 probe record;
 violations integer := 0;
 affected integer;
 rejected_by text;
BEGIN
 IF EXISTS(SELECT 1 FROM work_assignments WHERE id='a8888888-8888-4888-8888-888888888888') THEN
  RAISE EXCEPTION 'foreign_optional_assignment_visible';
 END IF;
 IF has_table_privilege(current_user,'safety_cases','DELETE')
    OR has_table_privilege(current_user,'support_cases','DELETE')
    OR has_table_privilege(current_user,'trust_events','UPDATE')
    OR has_table_privilege(current_user,'trust_events','DELETE') THEN
  RAISE EXCEPTION 'optional_assignment_grants_regressed';
 END IF;
 INSERT INTO safety_cases(id,tenant_id,reporter_identity_id,assignment_id,category,description) VALUES
 ('e1111111-1111-4111-8111-111111111111','$T1','$IDENTITY','a7777777-7777-4777-8777-777777777777','other','retained safety fixture'),
 ('e2222222-2222-4222-8222-222222222222','$T1','$IDENTITY',NULL,'other','unlinked safety fixture');
 INSERT INTO support_cases(id,tenant_id,reporter_identity_id,assignment_id,category,description,request_key,request_payload_hash) VALUES
 ('e3333333-3333-4333-8333-333333333333','$T1','$IDENTITY','a7777777-7777-4777-8777-777777777777','other','retained support fixture','eeeeeeee-1111-4111-8111-111111111111',repeat('a',64)),
 ('e4444444-4444-4444-8444-444444444444','$T1','$IDENTITY',NULL,'other','unlinked support fixture',NULL,NULL);
 UPDATE safety_cases SET status='reviewing' WHERE id='e1111111-1111-4111-8111-111111111111';
 UPDATE support_cases SET status='reviewing',resolution_note='human fixture review' WHERE id='e3333333-3333-4333-8333-333333333333';
 INSERT INTO trust_events(id,tenant_id,assignment_id,professional_id,event_type,cause,reported_by_identity_id,notes) VALUES
 ('e5555555-5555-4555-8555-555555555555','$T1','a7777777-7777-4777-8777-777777777777','$PROFILE','commendation','company','$IDENTITY','linked trust fixture'),
 ('e6666666-6666-4666-8666-666666666666','$T1',NULL,'$PROFILE','incident','undetermined','$IDENTITY','unlinked trust fixture');
 INSERT INTO safety_case_events(id,tenant_id,safety_case_id,actor_identity_id,from_status,to_status,note)
 VALUES('e7777777-7777-4777-8777-777777777777','$T1','e1111111-1111-4111-8111-111111111111','$IDENTITY','open','reviewing','retained history');
 INSERT INTO safety_case_appeals(id,tenant_id,safety_case_id,appellant_identity_id,reason)
 VALUES('e8888888-8888-4888-8888-888888888888','$T1','e1111111-1111-4111-8111-111111111111','$IDENTITY','retained appeal reason');
 INSERT INTO safety_case_appeal_events(id,tenant_id,appeal_id,actor_identity_id,from_status,to_status,note)
 VALUES('e9999999-9999-4999-8999-999999999999','$T1','e8888888-8888-4888-8888-888888888888','$IDENTITY','submitted','reviewing','retained appeal history');
 IF (SELECT count(*) FROM safety_cases)<>2 OR (SELECT count(*) FROM support_cases)<>2
    OR (SELECT count(*) FROM trust_events)<>2 THEN
  RAISE EXCEPTION 'optional_assignment_own_insert_or_null_regressed';
 END IF;
 FOR probe IN SELECT * FROM (VALUES
  ('safety INSERT','safety_cases_assignment_tenant_fk','INSERT INTO safety_cases(tenant_id,reporter_identity_id,assignment_id,category,description) VALUES(''$T1'',''$IDENTITY'',''a8888888-8888-4888-8888-888888888888'',''other'',''foreign assignment probe'')'),
  ('safety UPDATE','safety_cases_assignment_tenant_fk','UPDATE safety_cases SET assignment_id=''a8888888-8888-4888-8888-888888888888'' WHERE id=''e1111111-1111-4111-8111-111111111111'''),
  ('support INSERT','support_cases_assignment_tenant_fk','INSERT INTO support_cases(tenant_id,reporter_identity_id,assignment_id,category,description) VALUES(''$T1'',''$IDENTITY'',''a8888888-8888-4888-8888-888888888888'',''other'',''foreign assignment probe'')'),
  ('support UPDATE','support_cases_assignment_tenant_fk','UPDATE support_cases SET assignment_id=''a8888888-8888-4888-8888-888888888888'' WHERE id=''e3333333-3333-4333-8333-333333333333'''),
  ('trust INSERT','trust_events_assignment_tenant_fk','INSERT INTO trust_events(tenant_id,assignment_id,professional_id,event_type,reported_by_identity_id) VALUES(''$T1'',''a8888888-8888-4888-8888-888888888888'',''$PROFILE'',''incident'',''$IDENTITY'')')
 ) AS cases(label,expected_constraint,statement)
 LOOP
  BEGIN
   EXECUTE probe.statement;
   GET DIAGNOSTICS affected=ROW_COUNT;
   IF affected<>1 THEN RAISE EXCEPTION 'optional_assignment_probe_did_not_write_one_row'; END IF;
   RAISE EXCEPTION USING ERRCODE='P9001',MESSAGE='probe_accepted';
  EXCEPTION
   WHEN SQLSTATE 'P9001' THEN
    violations := violations+1;
    RAISE NOTICE 'FAIL: cross-tenant % accepted',probe.label;
   WHEN foreign_key_violation THEN
    GET STACKED DIAGNOSTICS rejected_by=CONSTRAINT_NAME;
    IF rejected_by<>probe.expected_constraint THEN RAISE; END IF;
  END;
 END LOOP;
 IF violations<>0 THEN
  RAISE EXCEPTION 'optional_assignment_tenant_integrity: % cross-tenant writes accepted',violations;
 END IF;
END;
\$\$;
RESET ROLE;
DO \$\$
DECLARE before_support jsonb; after_support jsonb; before_safety jsonb; after_safety jsonb; before_history jsonb; after_history jsonb;
BEGIN
 SELECT to_jsonb(s)-'assignment_id' INTO before_support FROM support_cases s WHERE id='e3333333-3333-4333-8333-333333333333';
 SELECT to_jsonb(s)-'assignment_id' INTO before_safety FROM safety_cases s WHERE id='e1111111-1111-4111-8111-111111111111';
 SELECT jsonb_build_array(
  (SELECT to_jsonb(e) FROM safety_case_events e WHERE id='e7777777-7777-4777-8777-777777777777'),
  (SELECT to_jsonb(a) FROM safety_case_appeals a WHERE id='e8888888-8888-4888-8888-888888888888'),
  (SELECT to_jsonb(e) FROM safety_case_appeal_events e WHERE id='e9999999-9999-4999-8999-999999999999')
 ) INTO before_history;
 DELETE FROM work_assignments WHERE id='a7777777-7777-4777-8777-777777777777';
 SELECT to_jsonb(s)-'assignment_id' INTO after_support FROM support_cases s WHERE id='e3333333-3333-4333-8333-333333333333' AND assignment_id IS NULL;
 SELECT to_jsonb(s)-'assignment_id' INTO after_safety FROM safety_cases s WHERE id='e1111111-1111-4111-8111-111111111111' AND assignment_id IS NULL;
 SELECT jsonb_build_array(
  (SELECT to_jsonb(e) FROM safety_case_events e WHERE id='e7777777-7777-4777-8777-777777777777'),
  (SELECT to_jsonb(a) FROM safety_case_appeals a WHERE id='e8888888-8888-4888-8888-888888888888'),
  (SELECT to_jsonb(e) FROM safety_case_appeal_events e WHERE id='e9999999-9999-4999-8999-999999999999')
 ) INTO after_history;
 IF before_support IS NULL OR before_safety IS NULL
    OR before_support IS DISTINCT FROM after_support OR before_safety IS DISTINCT FROM after_safety
    OR before_history IS DISTINCT FROM after_history
    OR EXISTS(SELECT 1 FROM trust_events WHERE id='e5555555-5555-4555-8555-555555555555')
    OR NOT EXISTS(SELECT 1 FROM safety_cases WHERE id='e2222222-2222-4222-8222-222222222222' AND tenant_id='$T1' AND assignment_id IS NULL)
    OR NOT EXISTS(SELECT 1 FROM support_cases WHERE id='e4444444-4444-4444-8444-444444444444' AND tenant_id='$T1' AND assignment_id IS NULL)
    OR NOT EXISTS(SELECT 1 FROM trust_events WHERE id='e6666666-6666-4666-8666-666666666666' AND tenant_id='$T1' AND assignment_id IS NULL)
    OR NOT EXISTS(SELECT 1 FROM work_assignments WHERE id='a8888888-8888-4888-8888-888888888888' AND tenant_id='$T2') THEN
  RAISE EXCEPTION 'optional_assignment_setnull_history_idempotency_or_cascade_regressed';
 END IF;
END;
\$\$;
ROLLBACK;
SQL
echo 'PASS: optional assignment tenant FKs reject five cross-tenant writes; NULL, retained case/history/intent identity and trust cascade preserved'


# Independent RESTRICT fixtures prevent one family's FK from masking another's delete behavior.
# Runtime negative writes and the entire disposable transaction roll back.
psql "$DB_URL" -v ON_ERROR_STOP=1 -q <<SQL
BEGIN;
INSERT INTO company_jobs(id,tenant_id,title,status) VALUES
 ('f1111111-1111-4111-8111-111111111111','$T1','Conversion tenant fixture','open'),
 ('f2222222-2222-4222-8222-222222222222','$T1','Integrity tenant fixture','open');
INSERT INTO work_assignments(id,tenant_id,job_id,professional_id,status) VALUES
 ('f3333333-3333-4333-8333-333333333333','$T1','$J1','$PROFILE','cancelled'),
 ('f4444444-4444-4444-8444-444444444444','$T1','f1111111-1111-4111-8111-111111111111','$PROFILE','completed'),
 ('f5555555-5555-4555-8555-555555555555','$T1','f2222222-2222-4222-8222-222222222222','$PROFILE','completed'),
 ('f6666666-6666-4666-8666-666666666666','$T2','$J2','$PROFILE','completed');
SET LOCAL ROLE app_runtime;
SELECT set_config('app.tenant_id','$T1',true);
DO \$\$
DECLARE probe record; violations integer := 0; affected integer; rejected_by text;
BEGIN
 IF EXISTS(SELECT 1 FROM work_assignments WHERE id='f6666666-6666-4666-8666-666666666666') THEN
  RAISE EXCEPTION 'restrict_foreign_assignment_visible';
 END IF;
 IF has_table_privilege(current_user,'assignment_cancellations','UPDATE')
    OR has_table_privilege(current_user,'assignment_cancellations','DELETE')
    OR has_table_privilege(current_user,'direct_hire_conversions','DELETE')
    OR has_table_privilege(current_user,'marketplace_integrity_cases','DELETE') THEN
  RAISE EXCEPTION 'restrict_assignment_immutable_grants_regressed';
 END IF;
 INSERT INTO assignment_cancellations(id,tenant_id,assignment_id,initiator_identity_id,reason,initiator_kind)
 VALUES('f7777777-7777-4777-8777-777777777777','$T1','f3333333-3333-4333-8333-333333333333','$IDENTITY','own cancellation fixture','company');
 INSERT INTO assignment_cancellations(tenant_id,assignment_id,initiator_identity_id,reason,initiator_kind)
 VALUES('$T1','f3333333-3333-4333-8333-333333333333','$IDENTITY','replay must not replace reason','company')
 ON CONFLICT(assignment_id) DO NOTHING;
 IF (SELECT count(*) FROM assignment_cancellations)<>1
    OR (SELECT reason FROM assignment_cancellations WHERE id='f7777777-7777-4777-8777-777777777777')<>'own cancellation fixture' THEN
  RAISE EXCEPTION 'cancellation_own_insert_or_replay_regressed';
 END IF;
 INSERT INTO direct_hire_conversions(id,tenant_id,professional_id,source_assignment_id,modality,proposed_by_identity_id,note)
 VALUES('f8888888-8888-4888-8888-888888888888','$T1','$PROFILE','f4444444-4444-4444-8444-444444444444','temp_to_hire','$IDENTITY','own conversion fixture');
 INSERT INTO direct_hire_conversions(tenant_id,professional_id,source_assignment_id,modality,proposed_by_identity_id,note)
 VALUES('$T1','$PROFILE','f4444444-4444-4444-8444-444444444444','temp_to_hire','$IDENTITY','legitimate updated note')
 ON CONFLICT(tenant_id,source_assignment_id,modality) DO UPDATE SET note=EXCLUDED.note;
 IF (SELECT count(*) FROM direct_hire_conversions)<>1
    OR (SELECT note FROM direct_hire_conversions WHERE id='f8888888-8888-4888-8888-888888888888')<>'legitimate updated note' THEN
  RAISE EXCEPTION 'conversion_own_upsert_regressed';
 END IF;
 INSERT INTO marketplace_integrity_cases(id,tenant_id,assignment_id,kind,evidence,created_by_identity_id)
 VALUES('f9999999-9999-4999-8999-999999999999','$T1','f5555555-5555-4555-8555-555555555555','other','own integrity fixture','$IDENTITY');
 UPDATE marketplace_integrity_cases SET status='needs_more_info',reviewed_by_identity_id='$IDENTITY',review_note='human review',reviewed_at=now()
 WHERE id='f9999999-9999-4999-8999-999999999999';
 IF NOT FOUND OR (SELECT status FROM marketplace_integrity_cases WHERE id='f9999999-9999-4999-8999-999999999999')<>'needs_more_info' THEN
  RAISE EXCEPTION 'integrity_own_review_regressed';
 END IF;
 FOR probe IN SELECT * FROM (VALUES
  ('cancellation INSERT','assignment_cancellations_assignment_tenant_fk','INSERT INTO assignment_cancellations(tenant_id,assignment_id,initiator_identity_id,reason,initiator_kind) VALUES(''$T1'',''f6666666-6666-4666-8666-666666666666'',''$IDENTITY'',''foreign cancellation probe'',''company'')'),
  ('conversion INSERT','direct_hire_conversions_assignment_tenant_fk','INSERT INTO direct_hire_conversions(tenant_id,professional_id,source_assignment_id,modality,proposed_by_identity_id) VALUES(''$T1'',''$PROFILE'',''f6666666-6666-4666-8666-666666666666'',''permanent'',''$IDENTITY'')'),
  ('conversion UPDATE','direct_hire_conversions_assignment_tenant_fk','UPDATE direct_hire_conversions SET source_assignment_id=''f6666666-6666-4666-8666-666666666666'' WHERE id=''f8888888-8888-4888-8888-888888888888'''),
  ('integrity INSERT','marketplace_integrity_cases_assignment_tenant_fk','INSERT INTO marketplace_integrity_cases(tenant_id,assignment_id,kind,evidence,created_by_identity_id) VALUES(''$T1'',''f6666666-6666-4666-8666-666666666666'',''other'',''foreign integrity probe'',''$IDENTITY'')'),
  ('integrity UPDATE','marketplace_integrity_cases_assignment_tenant_fk','UPDATE marketplace_integrity_cases SET assignment_id=''f6666666-6666-4666-8666-666666666666'' WHERE id=''f9999999-9999-4999-8999-999999999999''')
 ) AS cases(label,expected_constraint,statement)
 LOOP
  BEGIN
   EXECUTE probe.statement;
   GET DIAGNOSTICS affected=ROW_COUNT;
   IF affected<>1 THEN RAISE EXCEPTION 'restrict_assignment_probe_did_not_write_one_row'; END IF;
   RAISE EXCEPTION USING ERRCODE='P9001',MESSAGE='probe_accepted';
  EXCEPTION
   WHEN SQLSTATE 'P9001' THEN
    violations := violations+1;
    RAISE NOTICE 'FAIL: cross-tenant % accepted',probe.label;
   WHEN foreign_key_violation THEN
    GET STACKED DIAGNOSTICS rejected_by=CONSTRAINT_NAME;
    IF rejected_by<>probe.expected_constraint THEN RAISE; END IF;
  END;
 END LOOP;
 IF violations<>0 THEN RAISE EXCEPTION 'restrict_assignment_tenant_integrity: % cross-tenant writes accepted',violations; END IF;
END;
\$\$;
RESET ROLE;
DO \$\$
DECLARE probe record; affected integer; rejected_by text;
BEGIN
 FOR probe IN SELECT * FROM (VALUES
  ('f3333333-3333-4333-8333-333333333333'::uuid,'assignment_cancellations_assignment_id_fkey','assignment_cancellations_assignment_tenant_fk'),
  ('f4444444-4444-4444-8444-444444444444'::uuid,'direct_hire_conversions_source_assignment_id_fkey','direct_hire_conversions_assignment_tenant_fk'),
  ('f5555555-5555-4555-8555-555555555555'::uuid,'marketplace_integrity_cases_assignment_id_fkey','marketplace_integrity_cases_assignment_tenant_fk')
 ) AS cases(assignment_id,old_constraint,new_constraint)
 LOOP
  BEGIN
   DELETE FROM work_assignments WHERE id=probe.assignment_id;
   GET DIAGNOSTICS affected=ROW_COUNT;
   RAISE EXCEPTION 'restrict_assignment_delete_unexpectedly_allowed: % rows',affected;
  EXCEPTION WHEN foreign_key_violation THEN
   GET STACKED DIAGNOSTICS rejected_by=CONSTRAINT_NAME;
   IF rejected_by NOT IN(probe.old_constraint,probe.new_constraint) THEN RAISE; END IF;
  END;
  IF NOT EXISTS(SELECT 1 FROM work_assignments WHERE id=probe.assignment_id AND tenant_id='$T1') THEN
   RAISE EXCEPTION 'restrict_assignment_parent_not_retained';
  END IF;
 END LOOP;
 IF (SELECT count(*) FROM assignment_cancellations WHERE id='f7777777-7777-4777-8777-777777777777' AND reason='own cancellation fixture')<>1
    OR (SELECT count(*) FROM direct_hire_conversions WHERE id='f8888888-8888-4888-8888-888888888888' AND note='legitimate updated note')<>1
    OR (SELECT count(*) FROM marketplace_integrity_cases WHERE id='f9999999-9999-4999-8999-999999999999' AND status='needs_more_info' AND review_note='human review')<>1
    OR NOT EXISTS(SELECT 1 FROM work_assignments WHERE id='f6666666-6666-4666-8666-666666666666' AND tenant_id='$T2') THEN
  RAISE EXCEPTION 'restrict_assignment_history_or_foreign_parent_regressed';
 END IF;
END;
\$\$;
ROLLBACK;
SQL
echo 'PASS: restricted assignment tenant FKs reject five cross-tenant writes; own replay, upsert, review, immutable grants and three independent DELETE restrictions preserved'

psql "$DB_URL" -v ON_ERROR_STOP=1 -q <<SQL
DELETE FROM professional_availability_network WHERE professional_id='$PROFILE';
DELETE FROM marketplace_interests WHERE professional_id='$PROFILE';
DELETE FROM company_jobs WHERE id IN('$J1','$J2');
DELETE FROM professional_profiles WHERE id='$PROFILE';
DELETE FROM identities WHERE id='$IDENTITY';
DELETE FROM tenants WHERE id IN('$T1','$T2');
SQL

echo 'PASS: NETWORK_SHARED runtime writes are least-privilege and tenant-bound'
