BEGIN;

ALTER TABLE trust_events
  ADD COLUMN IF NOT EXISTS cause text NOT NULL DEFAULT 'undetermined'
    CHECK (cause IN ('professional','company','force_majeure','platform','undetermined')),
  ADD COLUMN IF NOT EXISTS reported_by_identity_id uuid REFERENCES identities(id) ON DELETE SET NULL;

REVOKE UPDATE, DELETE ON trust_events FROM app_runtime;
GRANT SELECT, INSERT ON trust_events TO app_runtime;

COMMIT;
