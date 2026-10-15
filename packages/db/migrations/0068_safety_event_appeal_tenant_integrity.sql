BEGIN;

-- Keep immutable private safety history in its parent tenant.
-- Global identities and optional case-to-assignment links are not changed here.
CREATE UNIQUE INDEX IF NOT EXISTS safety_cases_id_tenant_uq
  ON safety_cases(id,tenant_id);
CREATE UNIQUE INDEX IF NOT EXISTS safety_case_appeals_id_tenant_uq
  ON safety_case_appeals(id,tenant_id);

DO $$
BEGIN
  IF NOT EXISTS(
    SELECT 1 FROM pg_constraint
    WHERE conname='safety_case_events_case_tenant_fk'
      AND conrelid='safety_case_events'::regclass
  ) THEN
    ALTER TABLE safety_case_events
      ADD CONSTRAINT safety_case_events_case_tenant_fk
      FOREIGN KEY(safety_case_id,tenant_id)
      REFERENCES safety_cases(id,tenant_id)
      ON DELETE CASCADE
      NOT VALID;
  END IF;
  IF NOT EXISTS(
    SELECT 1 FROM pg_constraint
    WHERE conname='safety_case_appeals_case_tenant_fk'
      AND conrelid='safety_case_appeals'::regclass
  ) THEN
    ALTER TABLE safety_case_appeals
      ADD CONSTRAINT safety_case_appeals_case_tenant_fk
      FOREIGN KEY(safety_case_id,tenant_id)
      REFERENCES safety_cases(id,tenant_id)
      ON DELETE CASCADE
      NOT VALID;
  END IF;
  IF NOT EXISTS(
    SELECT 1 FROM pg_constraint
    WHERE conname='safety_case_appeal_events_appeal_tenant_fk'
      AND conrelid='safety_case_appeal_events'::regclass
  ) THEN
    ALTER TABLE safety_case_appeal_events
      ADD CONSTRAINT safety_case_appeal_events_appeal_tenant_fk
      FOREIGN KEY(appeal_id,tenant_id)
      REFERENCES safety_case_appeals(id,tenant_id)
      ON DELETE CASCADE
      NOT VALID;
  END IF;
END;
$$;

-- Validate history atomically; do not delete, reparent or guess tenant ownership.
ALTER TABLE safety_case_events
  VALIDATE CONSTRAINT safety_case_events_case_tenant_fk;
ALTER TABLE safety_case_appeals
  VALIDATE CONSTRAINT safety_case_appeals_case_tenant_fk;
ALTER TABLE safety_case_appeal_events
  VALIDATE CONSTRAINT safety_case_appeal_events_appeal_tenant_fk;

COMMIT;
