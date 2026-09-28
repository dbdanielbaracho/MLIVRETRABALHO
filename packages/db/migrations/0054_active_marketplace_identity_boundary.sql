BEGIN;

CREATE OR REPLACE FUNCTION active_marketplace_professional(
  p_job_id uuid,
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
    FROM company_jobs j
    JOIN marketplace_interests mi ON mi.job_id=j.id
    JOIN professional_profiles p ON p.id=mi.professional_id
    JOIN identities i ON i.id=p.identity_id
    WHERE j.id=p_job_id
      AND j.tenant_id=v_tenant_id
      AND mi.professional_id=p_professional_id
      AND i.deactivated_at IS NULL
  );
END;
$$;

CREATE OR REPLACE FUNCTION active_marketplace_professional_identity(
  p_job_id uuid,
  p_professional_id uuid
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path=public,pg_temp
AS $$
DECLARE
  v_tenant_id uuid := NULLIF(current_setting('app.tenant_id',true),'')::uuid;
  v_identity_id uuid;
BEGIN
  IF v_tenant_id IS NULL THEN
    RAISE EXCEPTION 'tenant_context_required';
  END IF;

  SELECT i.id INTO v_identity_id
  FROM company_jobs j
  JOIN marketplace_interests mi ON mi.job_id=j.id
  JOIN professional_profiles p ON p.id=mi.professional_id
  JOIN identities i ON i.id=p.identity_id
  WHERE j.id=p_job_id
    AND j.tenant_id=v_tenant_id
    AND mi.professional_id=p_professional_id
    AND i.deactivated_at IS NULL
  LIMIT 1;

  RETURN v_identity_id;
END;
$$;

REVOKE ALL ON FUNCTION active_marketplace_professional(uuid,uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION active_marketplace_professional_identity(uuid,uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION active_marketplace_professional(uuid,uuid) TO app_runtime;
GRANT EXECUTE ON FUNCTION active_marketplace_professional_identity(uuid,uuid) TO app_runtime;

COMMIT;
