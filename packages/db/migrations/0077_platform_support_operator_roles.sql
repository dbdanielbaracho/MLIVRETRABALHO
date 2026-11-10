BEGIN;
-- Logical application role only; no database GRANT, administrator bootstrap or intake activation.
ALTER TABLE platform_support_operators ADD COLUMN revision integer NOT NULL DEFAULT 0 CHECK(revision>=0);
ALTER TABLE platform_support_audit DROP CONSTRAINT platform_support_audit_action_check;
ALTER TABLE platform_support_audit ADD CONSTRAINT platform_support_audit_action_check CHECK(action IN('submitted','read','assigned','revoked','responded','withdrawn','expired','operator_granted','operator_revoked'));
COMMIT;
