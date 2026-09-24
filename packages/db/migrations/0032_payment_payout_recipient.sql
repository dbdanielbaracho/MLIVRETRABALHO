BEGIN;

ALTER TABLE payment_events
  ADD COLUMN IF NOT EXISTS recipient_professional_id uuid REFERENCES professional_profiles(id) ON DELETE RESTRICT;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname='payment_events_payout_recipient_required'
  ) THEN
    ALTER TABLE payment_events
      ADD CONSTRAINT payment_events_payout_recipient_required
      CHECK (event_type NOT IN ('payout_sent','payout_paid','payout_failed') OR recipient_professional_id IS NOT NULL)
      NOT VALID;
  END IF;
END $$;

COMMIT;
