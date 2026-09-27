BEGIN;

ALTER TABLE identities
  DROP CONSTRAINT IF EXISTS identities_email_shape_check;
ALTER TABLE identities
  ADD CONSTRAINT identities_email_shape_check
  CHECK (
    length(email) BETWEEN 3 AND 320
    AND position('@' IN email) > 1
    AND email !~ '[[:space:]]'
  );

ALTER TABLE sessions
  DROP CONSTRAINT IF EXISTS sessions_expiry_after_creation_check;
ALTER TABLE sessions
  ADD CONSTRAINT sessions_expiry_after_creation_check
  CHECK (expires_at > created_at);

COMMIT;
