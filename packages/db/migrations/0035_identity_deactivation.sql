BEGIN;

ALTER TABLE identities
  ADD COLUMN IF NOT EXISTS deactivated_at timestamptz;

CREATE INDEX IF NOT EXISTS identities_active_idx
  ON identities(id)
  WHERE deactivated_at IS NULL;

COMMIT;
