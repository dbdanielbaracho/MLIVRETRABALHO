BEGIN;
DO $migration$
DECLARE s name := current_schema();
BEGIN
 EXECUTE format($ddl$
 CREATE FUNCTION %1$I.platform_support_lock_dispatch_operator(target pg_catalog.uuid) RETURNS boolean
 LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,pg_temp AS $body$
 DECLARE actor pg_catalog.uuid := NULLIF(current_setting('app.platform_support_identity',true),'')::pg_catalog.uuid;
 BEGIN
  IF target IS NULL OR target=actor OR NOT %1$I.platform_support_lock_administrator() THEN RETURN false; END IF;
  PERFORM o.identity_id FROM %1$I.platform_support_operators o JOIN %1$I.identities i ON i.id=o.identity_id
   WHERE o.identity_id=target AND o.active AND i.deactivated_at IS NULL FOR SHARE OF o,i;
  RETURN FOUND;
 END;
 $body$
 $ddl$,s);
 EXECUTE format($ddl$
 CREATE FUNCTION %1$I.platform_support_lock_dispatch_case(requested_case pg_catalog.uuid) RETURNS boolean
 LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,pg_temp AS $body$
 DECLARE actor pg_catalog.uuid := NULLIF(current_setting('app.platform_support_identity',true),'')::pg_catalog.uuid;
 BEGIN
  IF NOT %1$I.platform_support_lock_administrator() THEN RETURN false; END IF;
  PERFORM c.id FROM %1$I.platform_support_cases c JOIN %1$I.identities i ON i.id=c.owner_identity_id
   WHERE c.id=requested_case AND c.owner_identity_id<>actor AND i.deactivated_at IS NULL FOR UPDATE OF c FOR SHARE OF i;
  RETURN FOUND;
 END;
 $body$
 $ddl$,s);
 EXECUTE format($ddl$
 CREATE FUNCTION %1$I.platform_support_dispatch_case_allowed(requested_case pg_catalog.uuid,target pg_catalog.uuid,revoking pg_catalog.bool) RETURNS boolean
 LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,pg_temp AS $body$
 DECLARE actor pg_catalog.uuid := NULLIF(current_setting('app.platform_support_identity',true),'')::pg_catalog.uuid;
 BEGIN
  IF current_setting('app.platform_support_dispatch',true) IS DISTINCT FROM 'true' OR NOT %1$I.platform_support_lock_administrator() THEN RETURN false; END IF;
  RETURN EXISTS(SELECT 1 FROM %1$I.platform_support_cases c JOIN %1$I.identities requester ON requester.id=c.owner_identity_id
   WHERE c.id=requested_case AND c.owner_identity_id<>actor AND requester.deactivated_at IS NULL
   AND target<>actor AND (coalesce(revoking,false) OR (c.status IN('open','reviewing') AND EXISTS(
    SELECT 1 FROM %1$I.platform_support_operators o JOIN %1$I.identities i ON i.id=o.identity_id WHERE o.identity_id=target AND o.active AND i.deactivated_at IS NULL))));
 END;
 $body$
 $ddl$,s);
 EXECUTE format('REVOKE ALL ON FUNCTION %I.platform_support_dispatch_case_allowed(uuid,uuid,boolean) FROM PUBLIC,app_runtime',s);
 EXECUTE format('REVOKE ALL ON FUNCTION %I.platform_support_lock_dispatch_operator(uuid) FROM PUBLIC,app_runtime',s);
 EXECUTE format('REVOKE ALL ON FUNCTION %I.platform_support_lock_dispatch_case(uuid) FROM PUBLIC,app_runtime',s);
END;
$migration$;
CREATE POLICY platform_support_operator_dispatch_select ON platform_support_operators FOR SELECT
 USING(current_setting('app.platform_support_dispatch',true)='true' AND platform_support_lock_administrator());
CREATE POLICY platform_support_case_dispatch_metadata ON platform_support_cases FOR SELECT
 USING(current_setting('app.platform_support_dispatch',true)='true' AND platform_support_lock_administrator()
 AND owner_identity_id<>NULLIF(current_setting('app.platform_support_identity',true),'')::uuid
 AND EXISTS(SELECT 1 FROM identities i WHERE i.id=owner_identity_id AND i.deactivated_at IS NULL));
CREATE POLICY platform_support_assignment_dispatch_select ON platform_support_assignments FOR SELECT
 USING(current_setting('app.platform_support_dispatch',true)='true' AND platform_support_lock_administrator());
CREATE POLICY platform_support_assignment_dispatch_insert ON platform_support_assignments FOR INSERT
 WITH CHECK(revoked_at IS NULL AND platform_support_dispatch_case_allowed(case_id,operator_identity_id,false));
CREATE POLICY platform_support_assignment_dispatch_update ON platform_support_assignments FOR UPDATE
 USING(current_setting('app.platform_support_dispatch',true)='true' AND platform_support_lock_administrator())
 WITH CHECK(platform_support_dispatch_case_allowed(case_id,operator_identity_id,revoked_at IS NOT NULL));
COMMIT;
