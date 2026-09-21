BEGIN;

CREATE TABLE IF NOT EXISTS professional_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid NOT NULL UNIQUE,
  display_name text NOT NULL,
  home_city text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS job_interests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  job_id uuid NOT NULL REFERENCES company_jobs(id) ON DELETE CASCADE,
  professional_id uuid NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'interested' CHECK (status IN ('interested','confirmed','withdrawn')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(job_id, professional_id)
);

ALTER TABLE job_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_interests FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS job_interests_tenant_isolation ON job_interests;
CREATE POLICY job_interests_tenant_isolation ON job_interests
USING (tenant_id = NULLIF(current_setting('app.tenant_id', true), '')::uuid)
WITH CHECK (tenant_id = NULLIF(current_setting('app.tenant_id', true), '')::uuid);

GRANT SELECT, INSERT, UPDATE, DELETE ON job_interests TO app_runtime;
GRANT SELECT ON professional_profiles TO app_runtime;

COMMIT;
