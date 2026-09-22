BEGIN;
ALTER TABLE payment_events ADD COLUMN IF NOT EXISTS provider text;
UPDATE payment_events SET provider='legacy_internal' WHERE provider IS NULL;
ALTER TABLE payment_events ALTER COLUMN provider SET NOT NULL;
COMMIT;
