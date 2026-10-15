BEGIN;

-- Individual ratings are tenant-owned; global professional/identity references stay global.
-- Reuse the assignment composite key from0065 and retain the original FKs/cascades.
DO $$
BEGIN
  IF NOT EXISTS(
    SELECT 1 FROM pg_constraint
    WHERE conname='work_ratings_assignment_tenant_fk'
      AND conrelid='work_ratings'::regclass
  ) THEN
    ALTER TABLE work_ratings
      ADD CONSTRAINT work_ratings_assignment_tenant_fk
      FOREIGN KEY(assignment_id,tenant_id)
      REFERENCES work_assignments(id,tenant_id)
      ON DELETE CASCADE
      NOT VALID;
  END IF;
  IF NOT EXISTS(
    SELECT 1 FROM pg_constraint
    WHERE conname='company_work_ratings_assignment_tenant_fk'
      AND conrelid='company_work_ratings'::regclass
  ) THEN
    ALTER TABLE company_work_ratings
      ADD CONSTRAINT company_work_ratings_assignment_tenant_fk
      FOREIGN KEY(assignment_id,tenant_id)
      REFERENCES work_assignments(id,tenant_id)
      ON DELETE CASCADE
      NOT VALID;
  END IF;
END;
$$;

-- Fail/rollback on inconsistent historical rows; never delete or guess their parent tenant.
ALTER TABLE work_ratings
  VALIDATE CONSTRAINT work_ratings_assignment_tenant_fk;
ALTER TABLE company_work_ratings
  VALIDATE CONSTRAINT company_work_ratings_assignment_tenant_fk;

COMMIT;
