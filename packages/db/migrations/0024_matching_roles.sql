BEGIN;
ALTER TABLE professional_profiles ADD COLUMN IF NOT EXISTS primary_role text;
ALTER TABLE company_jobs ADD COLUMN IF NOT EXISTS required_role text;
UPDATE company_jobs SET required_role=title WHERE required_role IS NULL;
COMMIT;
