#!/usr/bin/env bash
set -euo pipefail
DATABASE_URL="${DATABASE_URL:-postgresql://postgres:postgres@localhost:5432/mlivretrabalho}"
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 <<'SQL'
BEGIN;
DO $$
DECLARE
  t uuid:=gen_random_uuid();
  p uuid:=gen_random_uuid();
  j uuid:=gen_random_uuid();
  a uuid;
  c timestamptz;
  e_status text;
  e_amount integer;
BEGIN
  INSERT INTO tenants(id,slug,display_name) VALUES(t,'journey-'||replace(t::text,'-',''),'Journey Test');
  INSERT INTO professional_profiles(id,subject_id,display_name) VALUES(p,gen_random_uuid(),'Journey Professional');
  INSERT INTO company_jobs(id,tenant_id,title,status,location,starts_at,ends_at,pay_cents)
    VALUES(j,t,'Bartender','open','São Paulo',now()+interval '1 day',now()+interval '1 day 8 hours',25000);
  INSERT INTO job_interests(tenant_id,job_id,professional_id,status) VALUES(t,j,p,'interested');
  UPDATE job_interests SET status='confirmed' WHERE job_id=j AND professional_id=p;
  INSERT INTO work_assignments(tenant_id,job_id,professional_id,status)
    VALUES(t,j,p,'confirmed') RETURNING id,confirmed_at INTO a,c;
  IF c IS NULL THEN RAISE EXCEPTION 'confirmed_at_not_set'; END IF;

  UPDATE work_assignments SET status='checked_in',checked_in_at=now() WHERE id=a AND status='confirmed';
  IF NOT FOUND THEN RAISE EXCEPTION 'check_in_transition_failed'; END IF;
  UPDATE work_assignments SET status='in_progress' WHERE id=a AND status='checked_in';
  IF NOT FOUND THEN RAISE EXCEPTION 'start_transition_failed'; END IF;
  UPDATE work_assignments SET status='checked_out',checked_out_at=now() WHERE id=a AND status='in_progress';
  IF NOT FOUND THEN RAISE EXCEPTION 'check_out_transition_failed'; END IF;
  UPDATE work_assignments SET status='completed',completed_at=now() WHERE id=a AND status='checked_out';
  IF NOT FOUND THEN RAISE EXCEPTION 'complete_transition_failed'; END IF;

  INSERT INTO earnings_ledger(tenant_id,assignment_id,professional_id,amount_cents,status)
    SELECT wa.tenant_id,wa.id,wa.professional_id,jb.pay_cents,'payable'
    FROM work_assignments wa JOIN company_jobs jb ON jb.id=wa.job_id WHERE wa.id=a;
  SELECT status,amount_cents INTO e_status,e_amount FROM earnings_ledger WHERE assignment_id=a;
  IF e_status<>'payable' THEN RAISE EXCEPTION 'earnings_status_invalid: %',e_status; END IF;
  IF e_amount<>25000 THEN RAISE EXCEPTION 'earnings_amount_invalid: %',e_amount; END IF;
  IF (SELECT status FROM work_assignments WHERE id=a)<>'completed' THEN RAISE EXCEPTION 'assignment_not_completed'; END IF;
  IF (SELECT status FROM job_interests WHERE job_id=j AND professional_id=p)<>'confirmed' THEN RAISE EXCEPTION 'interest_not_confirmed'; END IF;
END $$;
ROLLBACK;
SQL
echo "PASS: professional journey DB integration"
