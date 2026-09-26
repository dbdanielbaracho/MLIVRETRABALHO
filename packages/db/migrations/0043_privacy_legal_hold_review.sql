BEGIN;
ALTER TABLE privacy_legal_holds
  ADD COLUMN IF NOT EXISTS reviewed_at timestamptz,
  ADD COLUMN IF NOT EXISTS reviewed_by text,
  ADD COLUMN IF NOT EXISTS review_note text;
ALTER TABLE privacy_legal_holds DROP CONSTRAINT IF EXISTS privacy_legal_holds_reviewed_by_length_check;
ALTER TABLE privacy_legal_holds ADD CONSTRAINT privacy_legal_holds_reviewed_by_length_check CHECK(reviewed_by IS NULL OR (length(reviewed_by)>=1 AND length(reviewed_by)<=200));
ALTER TABLE privacy_legal_holds DROP CONSTRAINT IF EXISTS privacy_legal_holds_review_note_length_check;
ALTER TABLE privacy_legal_holds ADD CONSTRAINT privacy_legal_holds_review_note_length_check CHECK(review_note IS NULL OR (length(review_note)>=1 AND length(review_note)<=2000));
REVOKE ALL ON privacy_legal_holds FROM app_runtime;
COMMIT;
