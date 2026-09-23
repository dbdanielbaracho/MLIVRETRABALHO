BEGIN;
CREATE TABLE IF NOT EXISTS verification_cases(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  subject_type text NOT NULL CHECK(subject_type IN('identity','business')),
  identity_id uuid REFERENCES identities(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending' CHECK(status IN('pending','reviewing','verified','rejected','expired')),
  provider text,
  provider_reference text,
  reason_code text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  verified_at timestamptz,
  CHECK((subject_type='identity' AND identity_id IS NOT NULL) OR (subject_type='business' AND identity_id IS NULL))
);
CREATE UNIQUE INDEX IF NOT EXISTS verification_cases_identity_uq ON verification_cases(tenant_id,identity_id) WHERE subject_type='identity';
CREATE UNIQUE INDEX IF NOT EXISTS verification_cases_business_uq ON verification_cases(tenant_id) WHERE subject_type='business';
ALTER TABLE verification_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_cases FORCE ROW LEVEL SECURITY;
CREATE POLICY verification_cases_tenant_isolation ON verification_cases USING(tenant_id=NULLIF(current_setting('app.tenant_id',true),'')::uuid) WITH CHECK(tenant_id=NULLIF(current_setting('app.tenant_id',true),'')::uuid);
GRANT SELECT,INSERT,UPDATE ON verification_cases TO app_runtime;
REVOKE DELETE ON verification_cases FROM app_runtime;
COMMIT;
