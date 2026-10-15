BEGIN;

-- Optional links remain optional. Deleting an assignment retains cases and their tenant.
-- Reuse work_assignments(id,tenant_id) from0065; keep original single-column FKs.
DO $$
BEGIN
  IF NOT EXISTS(
    SELECT 1 FROM pg_constraint
    WHERE conname='safety_cases_assignment_tenant_fk'
      AND conrelid='safety_cases'::regclass
  ) THEN
    ALTER TABLE safety_cases
      ADD CONSTRAINT safety_cases_assignment_tenant_fk
      FOREIGN KEY(assignment_id,tenant_id)
      REFERENCES work_assignments(id,tenant_id)
      ON DELETE SET NULL (assignment_id)
      NOT VALID;
  END IF;
  IF NOT EXISTS(
    SELECT 1 FROM pg_constraint
    WHERE conname='support_cases_assignment_tenant_fk'
      AND conrelid='support_cases'::regclass
  ) THEN
    ALTER TABLE support_cases
      ADD CONSTRAINT support_cases_assignment_tenant_fk
      FOREIGN KEY(assignment_id,tenant_id)
      REFERENCES work_assignments(id,tenant_id)
      ON DELETE SET NULL (assignment_id)
      NOT VALID;
  END IF;
  IF NOT EXISTS(
    SELECT 1 FROM pg_constraint
    WHERE conname='trust_events_assignment_tenant_fk'
      AND conrelid='trust_events'::regclass
  ) THEN
    ALTER TABLE trust_events
      ADD CONSTRAINT trust_events_assignment_tenant_fk
      FOREIGN KEY(assignment_id,tenant_id)
      REFERENCES work_assignments(id,tenant_id)
      ON DELETE CASCADE
      NOT VALID;
  END IF;
END;
$$;

-- Reject inconsistent historical references atomically, without data repair or reparenting.
ALTER TABLE safety_cases
  VALIDATE CONSTRAINT safety_cases_assignment_tenant_fk;
ALTER TABLE support_cases
  VALIDATE CONSTRAINT support_cases_assignment_tenant_fk;
ALTER TABLE trust_events
  VALIDATE CONSTRAINT trust_events_assignment_tenant_fk;

COMMIT;
