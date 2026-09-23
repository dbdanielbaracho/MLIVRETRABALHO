BEGIN;

CREATE TABLE IF NOT EXISTS marketplace_company_reputation (
  tenant_id uuid PRIMARY KEY REFERENCES tenants(id) ON DELETE CASCADE,
  average_rating numeric(3,2),
  rating_count integer NOT NULL DEFAULT 0 CHECK (rating_count >= 0),
  updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE marketplace_company_reputation IS 'NETWORK_SHARED aggregate company reputation only; individual ratings/comments remain tenant-owned.';

INSERT INTO marketplace_company_reputation(tenant_id, average_rating, rating_count, updated_at)
SELECT tenant_id, ROUND(AVG(score)::numeric, 2), COUNT(*)::int, now()
FROM company_work_ratings
GROUP BY tenant_id
ON CONFLICT(tenant_id) DO UPDATE SET
  average_rating=EXCLUDED.average_rating,
  rating_count=EXCLUDED.rating_count,
  updated_at=now();

CREATE OR REPLACE FUNCTION refresh_marketplace_company_reputation() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,pg_temp AS $$
DECLARE
  target_tenant uuid;
  total_count integer;
  avg_score numeric(3,2);
BEGIN
  target_tenant := COALESCE(NEW.tenant_id, OLD.tenant_id);

  SELECT COUNT(*)::int, ROUND(AVG(score)::numeric, 2)
  INTO total_count, avg_score
  FROM company_work_ratings
  WHERE tenant_id=target_tenant;

  IF total_count = 0 THEN
    DELETE FROM marketplace_company_reputation WHERE tenant_id=target_tenant;
  ELSE
    INSERT INTO marketplace_company_reputation(tenant_id, average_rating, rating_count, updated_at)
    VALUES(target_tenant, avg_score, total_count, now())
    ON CONFLICT(tenant_id) DO UPDATE SET
      average_rating=EXCLUDED.average_rating,
      rating_count=EXCLUDED.rating_count,
      updated_at=now();
  END IF;

  RETURN COALESCE(NEW, OLD);
END $$;

REVOKE ALL ON FUNCTION refresh_marketplace_company_reputation() FROM PUBLIC;

DROP TRIGGER IF EXISTS company_work_ratings_marketplace_reputation ON company_work_ratings;
CREATE TRIGGER company_work_ratings_marketplace_reputation
AFTER INSERT OR UPDATE OR DELETE ON company_work_ratings
FOR EACH ROW EXECUTE FUNCTION refresh_marketplace_company_reputation();

GRANT SELECT ON marketplace_company_reputation TO app_runtime;

COMMIT;
