BEGIN;

-- Preserve the original RESTRICT references and reuse assignment identity from0065.
DO $$
BEGIN
  IF NOT EXISTS(
    SELECT 1 FROM pg_constraint
    WHERE conname='assignment_cancellations_assignment_tenant_fk'
      AND conrelid='assignment_cancellations'::regclass
  ) THEN
    ALTER TABLE assignment_cancellations
      ADD CONSTRAINT assignment_cancellations_assignment_tenant_fk
      FOREIGN KEY(assignment_id,tenant_id)
      REFERENCES work_assignments(id,tenant_id)
      ON DELETE RESTRICT
      NOT VALID;
  END IF;
  IF NOT EXISTS(
    SELECT 1 FROM pg_constraint
    WHERE conname='direct_hire_conversions_assignment_tenant_fk'
      AND conrelid='direct_hire_conversions'::regclass
  ) THEN
    ALTER TABLE direct_hire_conversions
      ADD CONSTRAINT direct_hire_conversions_assignment_tenant_fk
      FOREIGN KEY(source_assignment_id,tenant_id)
      REFERENCES work_assignments(id,tenant_id)
      ON DELETE RESTRICT
      NOT VALID;
  END IF;
  IF NOT EXISTS(
    SELECT 1 FROM pg_constraint
    WHERE conname='marketplace_integrity_cases_assignment_tenant_fk'
      AND conrelid='marketplace_integrity_cases'::regclass
  ) THEN
    ALTER TABLE marketplace_integrity_cases
      ADD CONSTRAINT marketplace_integrity_cases_assignment_tenant_fk
      FOREIGN KEY(assignment_id,tenant_id)
      REFERENCES work_assignments(id,tenant_id)
      ON DELETE RESTRICT
      NOT VALID;
  END IF;
END;
$$;

-- Fail atomically on inconsistent history; never delete, guess or reparent records.
ALTER TABLE assignment_cancellations
  VALIDATE CONSTRAINT assignment_cancellations_assignment_tenant_fk;
ALTER TABLE direct_hire_conversions
  VALIDATE CONSTRAINT direct_hire_conversions_assignment_tenant_fk;
ALTER TABLE marketplace_integrity_cases
  VALIDATE CONSTRAINT marketplace_integrity_cases_assignment_tenant_fk;

COMMIT;
