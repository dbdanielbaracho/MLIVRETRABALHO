BEGIN;
-- No provisioning, data writes or grants. Helpers return only authority/lock booleans.
DO $migration$
DECLARE s name := current_schema();
BEGIN
 EXECUTE format($ddl$
 CREATE FUNCTION %1$I.platform_support_lock_administrator() RETURNS boolean
 LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,pg_temp AS $body$
 DECLARE actor pg_catalog.uuid := NULLIF(current_setting('app.platform_support_identity',true),'')::pg_catalog.uuid;
 BEGIN
  IF NOT %1$I.platform_support_lock_owner_identity() THEN RETURN false; END IF;
  PERFORM identity_id FROM %1$I.platform_support_administrators WHERE identity_id=actor AND active FOR SHARE;
  RETURN FOUND;
 END;
 $body$
 $ddl$,s);
 EXECUTE format($ddl$
 CREATE FUNCTION %1$I.platform_support_lock_role_target(target pg_catalog.uuid,requested_active pg_catalog.bool) RETURNS boolean
 LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,pg_temp AS $body$
 DECLARE actor pg_catalog.uuid := NULLIF(current_setting('app.platform_support_identity',true),'')::pg_catalog.uuid;
 deactivated pg_catalog.timestamptz;
 BEGIN
  IF target IS NULL OR requested_active IS NULL OR actor=target OR NOT %1$I.platform_support_lock_administrator() THEN RETURN false; END IF;
  SELECT i.deactivated_at INTO deactivated FROM %1$I.identities i WHERE i.id=target FOR UPDATE OF i;
  IF NOT FOUND THEN RETURN false; END IF;
  RETURN NOT requested_active OR deactivated IS NULL;
 END;
 $body$
 $ddl$,s);
 EXECUTE format('REVOKE ALL ON FUNCTION %I.platform_support_lock_administrator() FROM PUBLIC,app_runtime',s);
 EXECUTE format('REVOKE ALL ON FUNCTION %I.platform_support_lock_role_target(uuid,boolean) FROM PUBLIC,app_runtime',s);
END;
$migration$;
COMMIT;
