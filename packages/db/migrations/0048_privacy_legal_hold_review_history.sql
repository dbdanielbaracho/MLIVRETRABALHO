BEGIN;

CREATE TABLE IF NOT EXISTS privacy_legal_hold_reviews(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legal_hold_id uuid NOT NULL REFERENCES privacy_legal_holds(id) ON DELETE RESTRICT,
  reviewed_by text NOT NULL CHECK(length(reviewed_by)>=1 AND length(reviewed_by)<=200),
  review_note text NOT NULL CHECK(length(review_note)>=1 AND length(review_note)<=2000),
  previous_review_at timestamptz,
  next_review_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS privacy_legal_hold_reviews_hold_created_idx
  ON privacy_legal_hold_reviews(legal_hold_id,created_at DESC);

CREATE OR REPLACE FUNCTION prevent_privacy_legal_hold_review_mutation()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  RAISE EXCEPTION 'privacy_legal_hold_reviews_append_only';
END;
$$;

DROP TRIGGER IF EXISTS privacy_legal_hold_reviews_append_only ON privacy_legal_hold_reviews;
CREATE TRIGGER privacy_legal_hold_reviews_append_only
BEFORE UPDATE OR DELETE ON privacy_legal_hold_reviews
FOR EACH ROW EXECUTE FUNCTION prevent_privacy_legal_hold_review_mutation();

REVOKE ALL ON privacy_legal_hold_reviews FROM app_runtime;

COMMIT;
