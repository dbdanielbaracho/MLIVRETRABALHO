BEGIN;

CREATE OR REPLACE FUNCTION list_company_members()
RETURNS TABLE(
  identity_id uuid,
  email text,
  role text,
  created_at timestamptz,
  deactivated_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path=public,pg_temp
AS $$
DECLARE
  v_tenant_id uuid := NULLIF(current_setting('app.tenant_id',true),'')::uuid;
BEGIN
  IF v_tenant_id IS NULL THEN
    RAISE EXCEPTION 'tenant_context_required';
  END IF;

  RETURN QUERY
  SELECT
    m.identity_id,
    i.email,
    m.role::text,
    m.created_at,
    i.deactivated_at
  FROM tenant_memberships m
  JOIN identities i ON i.id=m.identity_id
  WHERE m.tenant_id=v_tenant_id
  ORDER BY m.created_at,m.identity_id;
END;
$$;

REVOKE ALL ON FUNCTION list_company_members() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION list_company_members() TO app_runtime;

COMMIT;
