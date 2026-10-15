BEGIN;

-- Legacy private interests are not NETWORK_SHARED marketplace_interests.
-- Reuse company_jobs identity from0064 and work_assignments identity from0065.
DO $$
BEGIN
  IF NOT EXISTS(
    SELECT 1 FROM pg_constraint
    WHERE conname='job_interests_job_tenant_fk'
      AND conrelid='job_interests'::regclass
  ) THEN
    ALTER TABLE job_interests
      ADD CONSTRAINT job_interests_job_tenant_fk
      FOREIGN KEY(job_id,tenant_id)
      REFERENCES company_jobs(id,tenant_id)
      ON DELETE CASCADE
      NOT VALID;
  END IF;
  IF NOT EXISTS(
    SELECT 1 FROM pg_constraint
    WHERE conname='replacement_requests_assignment_tenant_fk'
      AND conrelid='replacement_requests'::regclass
  ) THEN
    ALTER TABLE replacement_requests
      ADD CONSTRAINT replacement_requests_assignment_tenant_fk
      FOREIGN KEY(assignment_id,tenant_id)
      REFERENCES work_assignments(id,tenant_id)
      ON DELETE CASCADE
      NOT VALID;
  END IF;
END;
$$;

-- Fail atomically on inconsistent history, with no deletion or guessed ownership.
ALTER TABLE job_interests
  VALIDATE CONSTRAINT job_interests_job_tenant_fk;
ALTER TABLE replacement_requests
  VALIDATE CONSTRAINT replacement_requests_assignment_tenant_fk;

COMMIT;
