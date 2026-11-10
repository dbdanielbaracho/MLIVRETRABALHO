BEGIN;
-- Identity-scoped read defense in depth. No role, ACL, bootstrap or activation changes.
ALTER POLICY platform_support_intent_owner ON platform_support_intents
 USING(owner_identity_id=NULLIF(current_setting('app.platform_support_identity',true),'')::uuid
 AND EXISTS(SELECT 1 FROM identities i WHERE i.id=owner_identity_id AND i.deactivated_at IS NULL))
 WITH CHECK(owner_identity_id=NULLIF(current_setting('app.platform_support_identity',true),'')::uuid
 AND EXISTS(SELECT 1 FROM identities i WHERE i.id=owner_identity_id AND i.deactivated_at IS NULL));
ALTER POLICY platform_support_case_owner ON platform_support_cases
 USING(owner_identity_id=NULLIF(current_setting('app.platform_support_identity',true),'')::uuid
 AND EXISTS(SELECT 1 FROM identities i WHERE i.id=owner_identity_id AND i.deactivated_at IS NULL))
 WITH CHECK(owner_identity_id=NULLIF(current_setting('app.platform_support_identity',true),'')::uuid
 AND EXISTS(SELECT 1 FROM identities i WHERE i.id=owner_identity_id AND i.deactivated_at IS NULL));
ALTER POLICY platform_support_case_operator_read ON platform_support_cases
 USING(EXISTS(SELECT 1 FROM platform_support_assignments a
 JOIN platform_support_operators o ON o.identity_id=a.operator_identity_id
 JOIN identities i ON i.id=o.identity_id
 WHERE a.case_id=platform_support_cases.id
 AND a.operator_identity_id=NULLIF(current_setting('app.platform_support_identity',true),'')::uuid
 AND a.revoked_at IS NULL AND o.active AND i.deactivated_at IS NULL)
 AND EXISTS(SELECT 1 FROM identities requester WHERE requester.id=owner_identity_id AND requester.deactivated_at IS NULL));
COMMIT;
