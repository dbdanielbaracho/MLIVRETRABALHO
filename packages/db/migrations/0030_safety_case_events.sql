BEGIN;

CREATE TABLE IF NOT EXISTS safety_case_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  safety_case_id uuid NOT NULL REFERENCES safety_cases(id) ON DELETE CASCADE,
  actor_identity_id uuid NOT NULL REFERENCES identities(id) ON DELETE RESTRICT,
  from_status text NOT NULL CHECK (from_status IN ('open','reviewing','resolved','dismissed')),
  to_status text NOT NULL CHECK (to_status IN ('open','reviewing','resolved','dismissed')),
  note text CHECK (note IS NULL OR char_length(note) BETWEEN 1 AND 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS safety_case_events_case_created_idx
  ON safety_case_events(safety_case_id, created_at);
CREATE INDEX IF NOT EXISTS safety_case_events_tenant_created_idx
  ON safety_case_events(tenant_id, created_at);

ALTER TABLE safety_case_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_case_events FORCE ROW LEVEL SECURITY;

CREATE POLICY safety_case_events_tenant_isolation ON safety_case_events
  USING (tenant_id = NULLIF(current_setting('app.tenant_id', true), '')::uuid)
  WITH CHECK (tenant_id = NULLIF(current_setting('app.tenant_id', true), '')::uuid);

GRANT SELECT, INSERT ON safety_case_events TO app_runtime;
REVOKE UPDATE, DELETE ON safety_case_events FROM app_runtime;

COMMIT;
