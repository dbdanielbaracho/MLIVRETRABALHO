BEGIN;
ALTER TABLE professional_profiles ADD COLUMN IF NOT EXISTS identity_id uuid REFERENCES identities(id) ON DELETE CASCADE;
CREATE UNIQUE INDEX IF NOT EXISTS professional_profiles_identity_uq ON professional_profiles(identity_id) WHERE identity_id IS NOT NULL;
ALTER TABLE company_jobs ADD COLUMN IF NOT EXISTS location text;
ALTER TABLE company_jobs ADD COLUMN IF NOT EXISTS starts_at timestamptz;
ALTER TABLE company_jobs ADD COLUMN IF NOT EXISTS ends_at timestamptz;
ALTER TABLE company_jobs ADD COLUMN IF NOT EXISTS pay_cents integer CHECK(pay_cents IS NULL OR pay_cents>=0);
COMMIT;
