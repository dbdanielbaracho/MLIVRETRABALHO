BEGIN;
ALTER TABLE company_jobs ADD COLUMN IF NOT EXISTS required_role text;
ALTER TABLE company_jobs ADD COLUMN IF NOT EXISTS work_city text;
UPDATE company_jobs SET required_role=title WHERE required_role IS NULL OR btrim(required_role)='';
COMMIT;
