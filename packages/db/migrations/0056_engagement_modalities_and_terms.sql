BEGIN;
ALTER TABLE company_jobs ADD COLUMN IF NOT EXISTS engagement_modality text NOT NULL DEFAULT 'gig' CHECK(engagement_modality IN ('gig','freelance','temporary','recurring','temp_to_hire','permanent','staffing','internal'));
ALTER TABLE marketplace_jobs ADD COLUMN IF NOT EXISTS engagement_modality text NOT NULL DEFAULT 'gig' CHECK(engagement_modality IN ('gig','freelance','temporary','recurring','temp_to_hire','permanent','staffing','internal'));

CREATE TABLE IF NOT EXISTS terms_acceptances(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 identity_id uuid NOT NULL REFERENCES identities(id) ON DELETE CASCADE,
 terms_key text NOT NULL,
 version text NOT NULL,
 accepted_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(identity_id,terms_key,version)
);
CREATE INDEX IF NOT EXISTS terms_acceptances_identity_idx ON terms_acceptances(identity_id,accepted_at DESC);
GRANT SELECT,INSERT ON terms_acceptances TO app_runtime;

CREATE OR REPLACE FUNCTION sync_marketplace_job_projection() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,pg_temp AS $$
BEGIN
 IF TG_OP='DELETE' THEN DELETE FROM marketplace_jobs WHERE job_id=OLD.id; RETURN OLD; END IF;
 INSERT INTO marketplace_jobs(job_id,tenant_id,title,required_role,work_city,location,starts_at,ends_at,pay_cents,status,updated_at,engagement_modality)
 VALUES(NEW.id,NEW.tenant_id,NEW.title,NEW.required_role,NEW.work_city,NEW.location,NEW.starts_at,NEW.ends_at,NEW.pay_cents,NEW.status,NEW.updated_at,NEW.engagement_modality)
 ON CONFLICT(job_id) DO UPDATE SET tenant_id=EXCLUDED.tenant_id,title=EXCLUDED.title,required_role=EXCLUDED.required_role,work_city=EXCLUDED.work_city,location=EXCLUDED.location,starts_at=EXCLUDED.starts_at,ends_at=EXCLUDED.ends_at,pay_cents=EXCLUDED.pay_cents,status=EXCLUDED.status,updated_at=EXCLUDED.updated_at,engagement_modality=EXCLUDED.engagement_modality;
 RETURN NEW;
END $$;
REVOKE ALL ON FUNCTION sync_marketplace_job_projection() FROM PUBLIC;
UPDATE marketplace_jobs mj SET engagement_modality=j.engagement_modality FROM company_jobs j WHERE j.id=mj.job_id;
COMMIT;