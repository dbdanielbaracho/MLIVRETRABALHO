BEGIN;
-- The session-bound role service selects this transaction-local operation scope.
-- The marker alone never authorizes: dedicated active administrator is rechecked.
ALTER POLICY platform_support_role_admin_select ON platform_support_operators
 USING(current_setting('app.platform_support_role_management',true)='true' AND platform_support_lock_administrator());
ALTER POLICY platform_support_role_admin_insert ON platform_support_operators
 WITH CHECK(identity_id<>NULLIF(current_setting('app.platform_support_identity',true),'')::uuid
 AND current_setting('app.platform_support_role_management',true)='true' AND platform_support_lock_administrator());
ALTER POLICY platform_support_role_admin_update ON platform_support_operators
 USING(identity_id<>NULLIF(current_setting('app.platform_support_identity',true),'')::uuid
 AND current_setting('app.platform_support_role_management',true)='true' AND platform_support_lock_administrator())
 WITH CHECK(identity_id<>NULLIF(current_setting('app.platform_support_identity',true),'')::uuid
 AND current_setting('app.platform_support_role_management',true)='true' AND platform_support_lock_administrator());
ALTER POLICY platform_support_case_admin_metadata ON platform_support_cases
 USING(current_setting('app.platform_support_role_management',true)='true' AND platform_support_lock_administrator());
ALTER POLICY platform_support_assignment_admin_select ON platform_support_assignments
 USING(current_setting('app.platform_support_role_management',true)='true' AND platform_support_lock_administrator());
ALTER POLICY platform_support_assignment_admin_revoke ON platform_support_assignments
 USING(current_setting('app.platform_support_role_management',true)='true' AND platform_support_lock_administrator())
 WITH CHECK(revoked_at IS NOT NULL AND current_setting('app.platform_support_role_management',true)='true' AND platform_support_lock_administrator());
COMMIT;
