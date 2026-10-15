BEGIN;

-- Financial records are tenant-owned: the parent assignment must share that tenant.
-- Retain the existing single-column FKs and their cascade behavior.
CREATE UNIQUE INDEX IF NOT EXISTS work_assignments_id_tenant_uq
  ON work_assignments(id,tenant_id);

DO $$
BEGIN
  IF NOT EXISTS(
    SELECT 1 FROM pg_constraint
    WHERE conname='earnings_ledger_assignment_tenant_fk'
      AND conrelid='earnings_ledger'::regclass
  ) THEN
    ALTER TABLE earnings_ledger
      ADD CONSTRAINT earnings_ledger_assignment_tenant_fk
      FOREIGN KEY(assignment_id,tenant_id)
      REFERENCES work_assignments(id,tenant_id)
      ON DELETE CASCADE
      NOT VALID;
  END IF;
  IF NOT EXISTS(
    SELECT 1 FROM pg_constraint
    WHERE conname='payment_events_assignment_tenant_fk'
      AND conrelid='payment_events'::regclass
  ) THEN
    ALTER TABLE payment_events
      ADD CONSTRAINT payment_events_assignment_tenant_fk
      FOREIGN KEY(assignment_id,tenant_id)
      REFERENCES work_assignments(id,tenant_id)
      ON DELETE CASCADE
      NOT VALID;
  END IF;
END;
$$;

-- Reject inconsistent history atomically. Do not delete, reparent or guess tenants.
ALTER TABLE earnings_ledger
  VALIDATE CONSTRAINT earnings_ledger_assignment_tenant_fk;
ALTER TABLE payment_events
  VALIDATE CONSTRAINT payment_events_assignment_tenant_fk;

COMMIT;
