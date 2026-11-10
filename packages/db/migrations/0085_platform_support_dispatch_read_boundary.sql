BEGIN;
DO $migration$
DECLARE s name := current_schema();
BEGIN
 EXECUTE format($ddl$
 CREATE OR REPLACE FUNCTION %1$I.platform_support_dispatch_case_allowed(requested_case pg_catalog.uuid,target pg_catalog.uuid,revoking pg_catalog.bool) RETURNS boolean
 LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,pg_temp AS $body$
 DECLARE actor pg_catalog.uuid := NULLIF(current_setting('app.platform_support_identity',true),'')::pg_catalog.uuid;
 BEGIN
  IF current_setting('app.platform_support_dispatch',true) IS DISTINCT FROM 'true' OR NOT %1$I.platform_support_lock_administrator() THEN RETURN false; END IF;
  RETURN EXISTS(SELECT 1 FROM %1$I.platform_support_cases c JOIN %1$I.identities requester ON requester.id=c.owner_identity_id
   WHERE c.id=requested_case AND c.owner_identity_id<>actor AND requester.deactivated_at IS NULL
   AND (target IS NULL OR (target<>actor AND (coalesce(revoking,false) OR (c.status IN('open','reviewing') AND EXISTS(
    SELECT 1 FROM %1$I.platform_support_operators o JOIN %1$I.identities i ON i.id=o.identity_id WHERE o.identity_id=target AND o.active AND i.deactivated_at IS NULL))))));
 END;
 $body$
 $ddl$,s);
 EXECUTE format('REVOKE ALL ON FUNCTION %I.platform_support_dispatch_case_allowed(uuid,uuid,boolean) FROM PUBLIC,app_runtime',s);
END;
$migration$;
ALTER POLICY platform_support_assignment_dispatch_select ON platform_support_assignments
 USING(platform_support_dispatch_case_allowed(case_id,NULL::uuid,true));
ALTER POLICY platform_support_assignment_dispatch_update ON platform_support_assignments
 USING(platform_support_dispatch_case_allowed(case_id,NULL::uuid,true))
 WITH CHECK(platform_support_dispatch_case_allowed(case_id,operator_identity_id,revoked_at IS NOT NULL));
COMMIT;
