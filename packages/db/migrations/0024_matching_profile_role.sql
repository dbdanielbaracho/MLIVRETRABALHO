BEGIN;
ALTER TABLE professional_profiles ADD COLUMN IF NOT EXISTS primary_role text;
COMMIT;
