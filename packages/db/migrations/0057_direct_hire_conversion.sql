BEGIN;
CREATE TABLE IF NOT EXISTS direct_hire_conversions(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
 professional_id uuid NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
 source_assignment_id uuid NOT NULL REFERENCES work_assignments(id) ON DELETE RESTRICT,
 modality text NOT NULL CHECK(modality IN('temp_to_hire','permanent')),
 status text NOT NULL DEFAULT 'proposed' CHECK(status IN('proposed','accepted','declined','withdrawn')),
 proposed_by_identity_id uuid NOT NULL REFERENCES identities(id) ON DELETE RESTRICT,
 note text,
 created_at timestamptz NOT NULL DEFAULT now(),
 responded_at timestamptz,
 UNIQUE(tenant_id,source_assignment_id,modality)
);
ALTER TABLE direct_hire_conversions ENABLE ROW LEVEL SECURITY;ALTER TABLE direct_hire_conversions FORCE ROW LEVEL SECURITY;
CREATE POLICY direct_hire_conversions_tenant_isolation ON direct_hire_conversions USING(tenant_id=NULLIF(current_setting('app.tenant_id',true),'')::uuid) WITH CHECK(tenant_id=NULLIF(current_setting('app.tenant_id',true),'')::uuid);
GRANT SELECT,INSERT,UPDATE ON direct_hire_conversions TO app_runtime;
COMMIT;