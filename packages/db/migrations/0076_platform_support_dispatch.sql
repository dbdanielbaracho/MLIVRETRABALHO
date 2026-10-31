BEGIN;
-- Empty administrative authority: no real person, role grant or intake activation.
CREATE TABLE platform_support_administrators(identity_id uuid PRIMARY KEY REFERENCES identities(id) ON DELETE RESTRICT,active boolean NOT NULL DEFAULT false);
ALTER TABLE platform_support_administrators ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_support_administrators FORCE ROW LEVEL SECURITY;
CREATE POLICY platform_support_administrator_self ON platform_support_administrators FOR SELECT USING(identity_id=NULLIF(current_setting('app.platform_support_identity',true),'')::uuid AND active);
REVOKE ALL ON platform_support_administrators FROM PUBLIC,app_runtime;
ALTER TABLE platform_support_assignments ADD COLUMN revision integer NOT NULL DEFAULT 1 CHECK(revision>0);
ALTER TABLE platform_support_audit ADD COLUMN subject_identity_id uuid REFERENCES identities(id) ON DELETE RESTRICT;
COMMIT;
