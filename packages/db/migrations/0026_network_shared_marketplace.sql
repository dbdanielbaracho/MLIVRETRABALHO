BEGIN;

CREATE TABLE IF NOT EXISTS marketplace_jobs (
  job_id uuid PRIMARY KEY REFERENCES company_jobs(id) ON DELETE CASCADE,
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  title text NOT NULL,
  required_role text,
  work_city text,
  location text,
  starts_at timestamptz,
  ends_at timestamptz,
  pay_cents integer CHECK(pay_cents IS NULL OR pay_cents>=0),
  status text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
COMMENT ON TABLE marketplace_jobs IS 'NETWORK_SHARED projection of job fields intentionally visible to professionals.';
CREATE INDEX IF NOT EXISTS marketplace_jobs_status_start_idx ON marketplace_jobs(status,starts_at);

CREATE TABLE IF NOT EXISTS marketplace_interests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid NOT NULL REFERENCES marketplace_jobs(job_id) ON DELETE CASCADE,
  professional_id uuid NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'interested' CHECK(status IN ('interested','confirmed','withdrawn')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(job_id,professional_id)
);
COMMENT ON TABLE marketplace_interests IS 'NETWORK_SHARED professional interest signal; company access is constrained by job ownership in application code.';
CREATE INDEX IF NOT EXISTS marketplace_interests_professional_idx ON marketplace_interests(professional_id,created_at DESC);

CREATE TABLE IF NOT EXISTS professional_availability_network (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id uuid NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
  starts_at timestamptz NOT NULL,
  ends_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK(ends_at>starts_at),
  UNIQUE(professional_id,starts_at,ends_at)
);
COMMENT ON TABLE professional_availability_network IS 'PROFESSIONAL_OWNED availability shared with matching without company tenant membership.';
CREATE INDEX IF NOT EXISTS professional_availability_network_lookup_idx ON professional_availability_network(professional_id,starts_at,ends_at);

INSERT INTO marketplace_jobs(job_id,tenant_id,title,required_role,work_city,location,starts_at,ends_at,pay_cents,status,updated_at)
SELECT id,tenant_id,title,required_role,work_city,location,starts_at,ends_at,pay_cents,status,updated_at FROM company_jobs
ON CONFLICT(job_id) DO UPDATE SET tenant_id=EXCLUDED.tenant_id,title=EXCLUDED.title,required_role=EXCLUDED.required_role,work_city=EXCLUDED.work_city,location=EXCLUDED.location,starts_at=EXCLUDED.starts_at,ends_at=EXCLUDED.ends_at,pay_cents=EXCLUDED.pay_cents,status=EXCLUDED.status,updated_at=EXCLUDED.updated_at;

INSERT INTO marketplace_interests(job_id,professional_id,status,created_at,updated_at)
SELECT ji.job_id,ji.professional_id,ji.status,ji.created_at,ji.created_at FROM job_interests ji
JOIN marketplace_jobs mj ON mj.job_id=ji.job_id
ON CONFLICT(job_id,professional_id) DO NOTHING;

INSERT INTO professional_availability_network(professional_id,starts_at,ends_at,created_at)
SELECT DISTINCT ON (professional_id,starts_at,ends_at) professional_id,starts_at,ends_at,created_at
FROM professional_availability
ORDER BY professional_id,starts_at,ends_at,created_at
ON CONFLICT(professional_id,starts_at,ends_at) DO NOTHING;

CREATE OR REPLACE FUNCTION sync_marketplace_job_projection() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,pg_temp AS $$
BEGIN
  IF TG_OP='DELETE' THEN
    DELETE FROM marketplace_jobs WHERE job_id=OLD.id;
    RETURN OLD;
  END IF;
  INSERT INTO marketplace_jobs(job_id,tenant_id,title,required_role,work_city,location,starts_at,ends_at,pay_cents,status,updated_at)
  VALUES(NEW.id,NEW.tenant_id,NEW.title,NEW.required_role,NEW.work_city,NEW.location,NEW.starts_at,NEW.ends_at,NEW.pay_cents,NEW.status,NEW.updated_at)
  ON CONFLICT(job_id) DO UPDATE SET tenant_id=EXCLUDED.tenant_id,title=EXCLUDED.title,required_role=EXCLUDED.required_role,work_city=EXCLUDED.work_city,location=EXCLUDED.location,starts_at=EXCLUDED.starts_at,ends_at=EXCLUDED.ends_at,pay_cents=EXCLUDED.pay_cents,status=EXCLUDED.status,updated_at=EXCLUDED.updated_at;
  RETURN NEW;
END $$;
REVOKE ALL ON FUNCTION sync_marketplace_job_projection() FROM PUBLIC;

DROP TRIGGER IF EXISTS company_jobs_marketplace_projection ON company_jobs;
CREATE TRIGGER company_jobs_marketplace_projection
AFTER INSERT OR UPDATE OR DELETE ON company_jobs
FOR EACH ROW EXECUTE FUNCTION sync_marketplace_job_projection();

GRANT SELECT ON marketplace_jobs TO app_runtime;
GRANT SELECT,INSERT,UPDATE ON marketplace_interests TO app_runtime;
GRANT SELECT,INSERT,UPDATE,DELETE ON professional_availability_network TO app_runtime;

COMMIT;
