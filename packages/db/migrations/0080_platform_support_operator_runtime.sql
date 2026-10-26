BEGIN;
-- Closed lock helpers only. No roles, ACL grants, provisioning or activation.
DO $migration$
DECLARE s name := current_schema();
BEGIN
 EXECUTE format($ddl$
  CREATE FUNCTION %1$I.platform_support_lock_operator() RETURNS boolean
  LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,pg_temp AS $body$
  DECLARE actor pg_catalog.uuid := NULLIF(current_setting('app.platform_support_identity',true),'')::pg_catalog.uuid;
  BEGIN
   IF NOT %1$I.platform_support_lock_owner_identity() THEN RETURN false; END IF;
   PERFORM identity_id FROM %1$I.platform_support_operators WHERE identity_id=actor AND active FOR SHARE;
   RETURN FOUND;
  END;
  $body$
 $ddl$,s);
 EXECUTE format($ddl$
  CREATE FUNCTION %1$I.platform_support_lock_assigned_case(requested_case pg_catalog.uuid,exclusive_lock pg_catalog.bool) RETURNS boolean
  LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,pg_temp AS $body$
  DECLARE actor pg_catalog.uuid := NULLIF(current_setting('app.platform_support_identity',true),'')::pg_catalog.uuid;
  BEGIN
   IF NOT %1$I.platform_support_lock_operator() THEN RETURN false; END IF;
   IF coalesce(exclusive_lock,false) THEN
    PERFORM c.id FROM %1$I.platform_support_cases c
     JOIN %1$I.platform_support_assignments a ON a.case_id=c.id JOIN %1$I.identities requester ON requester.id=c.owner_identity_id
     WHERE c.id=requested_case AND a.operator_identity_id=actor AND a.revoked_at IS NULL AND requester.deactivated_at IS NULL
     FOR UPDATE OF c FOR SHARE OF a,requester;
   ELSE
    PERFORM c.id FROM %1$I.platform_support_cases c
     JOIN %1$I.platform_support_assignments a ON a.case_id=c.id JOIN %1$I.identities requester ON requester.id=c.owner_identity_id
     WHERE c.id=requested_case AND a.operator_identity_id=actor AND a.revoked_at IS NULL AND requester.deactivated_at IS NULL
     FOR SHARE OF c,a,requester;
   END IF;
   RETURN FOUND;
  END;
  $body$
 $ddl$,s);
 EXECUTE format('REVOKE ALL ON FUNCTION %I.platform_support_lock_operator() FROM PUBLIC,app_runtime',s);
 EXECUTE format('REVOKE ALL ON FUNCTION %I.platform_support_lock_assigned_case(uuid,boolean) FROM PUBLIC,app_runtime',s);
END;
$migration$;
-- Column ACLs are configured separately; policies cannot grant relation privileges.
CREATE POLICY platform_support_case_operator_update ON platform_support_cases FOR UPDATE
 USING(EXISTS(SELECT 1 FROM platform_support_assignments a JOIN platform_support_operators o ON o.identity_id=a.operator_identity_id
 JOIN identities i ON i.id=o.identity_id WHERE a.case_id=platform_support_cases.id
 AND a.operator_identity_id=NULLIF(current_setting('app.platform_support_identity',true),'')::uuid
 AND a.revoked_at IS NULL AND o.active AND i.deactivated_at IS NULL)
 AND EXISTS(SELECT 1 FROM identities requester WHERE requester.id=owner_identity_id AND requester.deactivated_at IS NULL))
 WITH CHECK(status IN('reviewing','resolved') AND EXISTS(SELECT 1 FROM platform_support_assignments a JOIN platform_support_operators o ON o.identity_id=a.operator_identity_id
 JOIN identities i ON i.id=o.identity_id WHERE a.case_id=platform_support_cases.id
 AND a.operator_identity_id=NULLIF(current_setting('app.platform_support_identity',true),'')::uuid
 AND a.revoked_at IS NULL AND o.active AND i.deactivated_at IS NULL)
 AND EXISTS(SELECT 1 FROM identities requester WHERE requester.id=owner_identity_id AND requester.deactivated_at IS NULL));
CREATE POLICY platform_support_response_operator_insert ON platform_support_responses FOR INSERT
 WITH CHECK(operator_identity_id=NULLIF(current_setting('app.platform_support_identity',true),'')::uuid AND request_key IS NOT NULL
 AND EXISTS(SELECT 1 FROM platform_support_cases c JOIN platform_support_assignments a ON a.case_id=c.id
 JOIN platform_support_operators o ON o.identity_id=a.operator_identity_id JOIN identities i ON i.id=o.identity_id
 JOIN identities requester ON requester.id=c.owner_identity_id
 WHERE c.id=platform_support_responses.case_id AND c.status IN('open','reviewing')
 AND a.operator_identity_id=platform_support_responses.operator_identity_id AND a.revoked_at IS NULL AND o.active
 AND i.deactivated_at IS NULL AND requester.deactivated_at IS NULL));
COMMIT;
