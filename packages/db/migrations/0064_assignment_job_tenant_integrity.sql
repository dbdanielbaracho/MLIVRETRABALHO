BEGIN;

-- A tenant-owned assignment must reference a job owned by the same tenant.
-- Keep the original FK/cascade and add the relational tenant invariant.
CREATE UNIQUE INDEX IF NOT EXISTS company_jobs_id_tenant_uq
  ON company_jobs(id,tenant_id);

DO $$
BEGIN
  IF NOT EXISTS(
    SELECT 1 FROM pg_constraint
    WHERE conname='work_assignments_job_tenant_fk'
      AND conrelid='work_assignments'::regclass
  ) THEN
    ALTER TABLE work_assignments
      ADD CONSTRAINT work_assignments_job_tenant_fk
      FOREIGN KEY(job_id,tenant_id)
      REFERENCES company_jobs(id,tenant_id)
      ON DELETE CASCADE
      NOT VALID;
  END IF;
END;
$$;

-- Fail closed if historical data violates the invariant. Never delete rows
-- or guess a different tenant to make validation pass.
ALTER TABLE work_assignments
  VALIDATE CONSTRAINT work_assignments_job_tenant_fk;

COMMIT;
