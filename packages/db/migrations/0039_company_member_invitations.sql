BEGIN;
CREATE TABLE IF NOT EXISTS company_member_invitations(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  email text NOT NULL,
  role text NOT NULL CHECK(role IN('owner','admin','manager')),
  token_hash text NOT NULL UNIQUE,
  invited_by_identity_id uuid NOT NULL REFERENCES identities(id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  accepted_at timestamptz,
  accepted_by_identity_id uuid REFERENCES identities(id) ON DELETE RESTRICT,
  revoked_at timestamptz,
  CHECK(expires_at>created_at)
);
CREATE INDEX IF NOT EXISTS company_member_invitations_tenant_created_idx ON company_member_invitations(tenant_id,created_at DESC);
CREATE INDEX IF NOT EXISTS company_member_invitations_email_idx ON company_member_invitations(lower(email));
ALTER TABLE company_member_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_member_invitations FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS company_member_invitations_isolation ON company_member_invitations;
CREATE POLICY company_member_invitations_isolation ON company_member_invitations
USING(tenant_id=NULLIF(current_setting('app.tenant_id',true),'')::uuid)
WITH CHECK(tenant_id=NULLIF(current_setting('app.tenant_id',true),'')::uuid);
GRANT SELECT,INSERT,UPDATE ON company_member_invitations TO app_runtime;
REVOKE DELETE ON company_member_invitations FROM app_runtime;
COMMIT;
