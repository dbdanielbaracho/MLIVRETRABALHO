BEGIN;
DO $migration$
DECLARE s name := current_schema();
BEGIN
 EXECUTE format($ddl$
 CREATE FUNCTION %1$I.platform_support_lock_role_cases(target pg_catalog.uuid) RETURNS boolean
 LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,pg_temp AS $body$
 BEGIN
  IF NOT %1$I.platform_support_lock_role_target(target,false) THEN RETURN false; END IF;
  PERFORM c.id FROM %1$I.platform_support_cases c JOIN %1$I.platform_support_assignments a ON a.case_id=c.id
   WHERE a.operator_identity_id=target AND a.revoked_at IS NULL ORDER BY c.id FOR UPDATE OF c;
  RETURN true;
 END;
 $body$
 $ddl$,s);
 EXECUTE format('REVOKE ALL ON FUNCTION %I.platform_support_lock_role_cases(uuid) FROM PUBLIC,app_runtime',s);
END;
$migration$;
-- Policies grant no ACL. A dedicated connection still needs narrow column privileges.
CREATE POLICY platform_support_role_admin_select ON platform_support_operators FOR SELECT
 USING(platform_support_lock_administrator());
CREATE POLICY platform_support_role_admin_insert ON platform_support_operators FOR INSERT
 WITH CHECK(identity_id<>NULLIF(current_setting('app.platform_support_identity',true),'')::uuid AND platform_support_lock_administrator());
CREATE POLICY platform_support_role_admin_update ON platform_support_operators FOR UPDATE
 USING(identity_id<>NULLIF(current_setting('app.platform_support_identity',true),'')::uuid AND platform_support_lock_administrator())
 WITH CHECK(identity_id<>NULLIF(current_setting('app.platform_support_identity',true),'')::uuid AND platform_support_lock_administrator());
CREATE POLICY platform_support_case_admin_metadata ON platform_support_cases FOR SELECT
 USING(platform_support_lock_administrator());
CREATE POLICY platform_support_assignment_admin_select ON platform_support_assignments FOR SELECT
 USING(platform_support_lock_administrator());
CREATE POLICY platform_support_assignment_admin_revoke ON platform_support_assignments FOR UPDATE
 USING(platform_support_lock_administrator())
 WITH CHECK(revoked_at IS NOT NULL AND platform_support_lock_administrator());
COMMIT;
