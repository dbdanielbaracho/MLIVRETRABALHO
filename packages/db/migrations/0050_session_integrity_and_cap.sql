BEGIN;

ALTER TABLE sessions
  DROP CONSTRAINT IF EXISTS sessions_token_hash_format_check;
ALTER TABLE sessions
  ADD CONSTRAINT sessions_token_hash_format_check
    CHECK(token_hash ~ '^[0-9a-f]{64}$');

CREATE INDEX IF NOT EXISTS sessions_identity_created_idx
  ON sessions(identity_id,created_at DESC,id DESC);

COMMIT;
