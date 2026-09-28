BEGIN;

CREATE OR REPLACE FUNCTION active_tenant_professional(
  p_professional_id uuid
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path=public,pg_temp
AS $$
DECLARE
  v_tenant_id uuid := NULLIF(current_setting('app.tenant_id',true),'')::uuid;
BEGIN
  IF v_tenant_id IS NULL THEN
    RAISE EXCEPTION 'tenant_context_required';
  END IF;

  RETURN EXISTS(
    SELECT 1
    FROM work_assignments wa
    JOIN professional_profiles p ON p.id=wa.professional_id
    JOIN identities i ON i.id=p.identity_id
    WHERE wa.tenant_id=v_tenant_id
      AND wa.professional_id=p_professional_id
      AND i.deactivated_at IS NULL
  );
END;
$$;

REVOKE ALL ON FUNCTION active_tenant_professional(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION active_tenant_professional(uuid) TO app_runtime;

COMMIT;
