BEGIN;
ALTER TABLE tenant_memberships ADD COLUMN IF NOT EXISTS identity_id uuid REFERENCES identities(id) ON DELETE CASCADE;
CREATE UNIQUE INDEX IF NOT EXISTS tenant_memberships_tenant_identity_uq ON tenant_memberships(tenant_id,identity_id) WHERE identity_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS tenant_memberships_identity_idx ON tenant_memberships(identity_id);
COMMIT;
