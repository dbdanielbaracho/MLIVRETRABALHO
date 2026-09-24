BEGIN;

CREATE TABLE IF NOT EXISTS safety_case_appeals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  safety_case_id uuid NOT NULL REFERENCES safety_cases(id) ON DELETE CASCADE,
  appellant_identity_id uuid NOT NULL REFERENCES identities(id) ON DELETE RESTRICT,
  reason text NOT NULL CHECK (char_length(reason) BETWEEN 1 AND 4000),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS safety_case_appeals_case_appellant_uidx
  ON safety_case_appeals(safety_case_id, appellant_identity_id);
CREATE INDEX IF NOT EXISTS safety_case_appeals_tenant_created_idx
  ON safety_case_appeals(tenant_id, created_at DESC);

CREATE TABLE IF NOT EXISTS safety_case_appeal_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  appeal_id uuid NOT NULL REFERENCES safety_case_appeals(id) ON DELETE CASCADE,
  actor_identity_id uuid NOT NULL REFERENCES identities(id) ON DELETE RESTRICT,
  from_status text NOT NULL CHECK (from_status IN ('submitted','reviewing','upheld','modified','reversed')),
  to_status text NOT NULL CHECK (to_status IN ('submitted','reviewing','upheld','modified','reversed')),
  note text CHECK (note IS NULL OR char_length(note) BETWEEN 1 AND 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS safety_case_appeal_events_appeal_created_idx
  ON safety_case_appeal_events(appeal_id, created_at, id);
CREATE INDEX IF NOT EXISTS safety_case_appeal_events_tenant_created_idx
  ON safety_case_appeal_events(tenant_id, created_at DESC);

ALTER TABLE safety_case_appeals ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_case_appeals FORCE ROW LEVEL SECURITY;
ALTER TABLE safety_case_appeal_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_case_appeal_events FORCE ROW LEVEL SECURITY;

CREATE POLICY safety_case_appeals_tenant_isolation ON safety_case_appeals
  USING (tenant_id = NULLIF(current_setting('app.tenant_id', true), '')::uuid)
  WITH CHECK (tenant_id = NULLIF(current_setting('app.tenant_id', true), '')::uuid);

CREATE POLICY safety_case_appeal_events_tenant_isolation ON safety_case_appeal_events
  USING (tenant_id = NULLIF(current_setting('app.tenant_id', true), '')::uuid)
  WITH CHECK (tenant_id = NULLIF(current_setting('app.tenant_id', true), '')::uuid);

GRANT SELECT, INSERT ON safety_case_appeals TO app_runtime;
GRANT SELECT, INSERT ON safety_case_appeal_events TO app_runtime;
REVOKE UPDATE, DELETE ON safety_case_appeals FROM app_runtime;
REVOKE UPDATE, DELETE ON safety_case_appeal_events FROM app_runtime;

COMMIT;
