BEGIN;
CREATE TABLE IF NOT EXISTS work_assignments(id uuid PRIMARY KEY DEFAULT gen_random_uuid(),tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,job_id uuid NOT NULL REFERENCES company_jobs(id) ON DELETE CASCADE,professional_id uuid NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,status text NOT NULL DEFAULT 'confirmed' CHECK(status IN('confirmed','checked_in','in_progress','checked_out','completed','cancelled')),confirmed_at timestamptz NOT NULL DEFAULT now(),checked_in_at timestamptz,checked_out_at timestamptz,completed_at timestamptz,UNIQUE(job_id,professional_id));
ALTER TABLE work_assignments ENABLE ROW LEVEL SECURITY; ALTER TABLE work_assignments FORCE ROW LEVEL SECURITY;
CREATE POLICY work_assignments_tenant_isolation ON work_assignments USING(tenant_id=NULLIF(current_setting('app.tenant_id',true),'')::uuid) WITH CHECK(tenant_id=NULLIF(current_setting('app.tenant_id',true),'')::uuid);
GRANT SELECT,INSERT,UPDATE,DELETE ON work_assignments TO app_runtime;
COMMIT;
