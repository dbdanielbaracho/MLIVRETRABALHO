BEGIN;

CREATE TABLE IF NOT EXISTS company_work_ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  assignment_id uuid NOT NULL REFERENCES work_assignments(id) ON DELETE CASCADE,
  rater_identity_id uuid NOT NULL REFERENCES identities(id) ON DELETE CASCADE,
  professional_id uuid NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
  score integer NOT NULL CHECK (score BETWEEN 1 AND 5),
  comment text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (assignment_id, rater_identity_id)
);

ALTER TABLE company_work_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_work_ratings FORCE ROW LEVEL SECURITY;

CREATE POLICY company_work_ratings_tenant_isolation ON company_work_ratings
  USING (tenant_id = NULLIF(current_setting('app.tenant_id', true), '')::uuid)
  WITH CHECK (tenant_id = NULLIF(current_setting('app.tenant_id', true), '')::uuid);

GRANT SELECT, INSERT, UPDATE ON company_work_ratings TO app_runtime;
REVOKE DELETE ON company_work_ratings FROM app_runtime;

COMMIT;
