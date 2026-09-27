BEGIN;

CREATE OR REPLACE FUNCTION confirm_marketplace_interest(p_job_id uuid,p_professional_id uuid)
RETURNS void
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

  UPDATE marketplace_interests mi
  SET status='confirmed',updated_at=now()
  FROM marketplace_jobs mj
  WHERE mi.job_id=p_job_id
    AND mi.professional_id=p_professional_id
    AND mj.job_id=mi.job_id
    AND mj.tenant_id=v_tenant_id
    AND mi.status IN ('interested','confirmed');

  IF NOT FOUND THEN
    RAISE EXCEPTION 'marketplace_interest_not_confirmable';
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION confirm_marketplace_interest(uuid,uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION confirm_marketplace_interest(uuid,uuid) TO app_runtime;

REVOKE INSERT,UPDATE,DELETE ON marketplace_interests FROM app_runtime;
GRANT SELECT ON marketplace_interests TO app_runtime;

REVOKE INSERT,UPDATE,DELETE ON professional_availability_network FROM app_runtime;
GRANT SELECT ON professional_availability_network TO app_runtime;

COMMIT;
