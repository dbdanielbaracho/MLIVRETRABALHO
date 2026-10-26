BEGIN;
-- Bounded row locks only: no role creation, grants, operator bootstrap or activation.
-- Fully qualified relations, fixed trusted search_path; no caller-supplied identifiers.
DO $migration$
DECLARE s name := current_schema();
BEGIN
 EXECUTE format($ddl$
  CREATE FUNCTION %1$I.platform_support_lock_owner_identity() RETURNS boolean
  LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,pg_temp AS $body$
  DECLARE actor pg_catalog.uuid := NULLIF(current_setting('app.platform_support_identity',true),'')::pg_catalog.uuid;
  BEGIN
   IF actor IS NULL THEN RETURN false; END IF;
   PERFORM id FROM %1$I.identities WHERE id=actor AND deactivated_at IS NULL FOR SHARE;
   RETURN FOUND;
  END;
  $body$
 $ddl$,s);
 EXECUTE format($ddl$
  CREATE FUNCTION %1$I.platform_support_intake_available(lock_rows boolean) RETURNS boolean
  LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,pg_temp AS $body$
  DECLARE enabled_value pg_catalog.bool;
  BEGIN
   IF NOT %1$I.platform_support_lock_owner_identity() THEN RETURN false; END IF;
   IF NOT coalesce(lock_rows,false) THEN
    RETURN EXISTS(SELECT 1 FROM %1$I.platform_support_capability c WHERE c.singleton AND c.enabled
     AND EXISTS(SELECT 1 FROM %1$I.platform_support_operators o JOIN %1$I.identities i ON i.id=o.identity_id
      WHERE o.active AND i.deactivated_at IS NULL));
   END IF;
   SELECT enabled INTO enabled_value FROM %1$I.platform_support_capability WHERE singleton=true FOR SHARE;
   IF NOT coalesce(enabled_value,false) THEN RETURN false; END IF;
   PERFORM o.identity_id FROM %1$I.platform_support_operators o
    JOIN %1$I.identities i ON i.id=o.identity_id
    WHERE o.active AND i.deactivated_at IS NULL ORDER BY o.identity_id FOR SHARE OF o,i;
   RETURN FOUND;
  END;
  $body$
 $ddl$,s);
 EXECUTE format('REVOKE ALL ON FUNCTION %I.platform_support_lock_owner_identity() FROM PUBLIC,app_runtime',s);
 EXECUTE format('REVOKE ALL ON FUNCTION %I.platform_support_intake_available(boolean) FROM PUBLIC,app_runtime',s);
END;
$migration$;
COMMIT;
