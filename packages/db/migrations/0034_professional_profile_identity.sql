BEGIN;

ALTER TABLE professional_profiles
  ADD COLUMN IF NOT EXISTS identity_id uuid REFERENCES identities(id) ON DELETE CASCADE;

UPDATE professional_profiles p
SET identity_id = p.subject_id
FROM identities i
WHERE p.identity_id IS NULL
  AND i.id = p.subject_id;

CREATE UNIQUE INDEX IF NOT EXISTS professional_profiles_identity_uq
  ON professional_profiles(identity_id)
  WHERE identity_id IS NOT NULL;

GRANT SELECT, INSERT, UPDATE ON professional_profiles TO app_runtime;

COMMIT;
