BEGIN;
ALTER TABLE privacy_legal_holds
  ADD COLUMN IF NOT EXISTS created_by text,
  ADD COLUMN IF NOT EXISTS released_by text,
  ADD COLUMN IF NOT EXISTS release_reason text;
ALTER TABLE privacy_legal_holds DROP CONSTRAINT IF EXISTS privacy_legal_holds_created_by_length_check;
ALTER TABLE privacy_legal_holds ADD CONSTRAINT privacy_legal_holds_created_by_length_check CHECK(created_by IS NULL OR (length(created_by)>=1 AND length(created_by)<=200));
ALTER TABLE privacy_legal_holds DROP CONSTRAINT IF EXISTS privacy_legal_holds_released_by_length_check;
ALTER TABLE privacy_legal_holds ADD CONSTRAINT privacy_legal_holds_released_by_length_check CHECK(released_by IS NULL OR (length(released_by)>=1 AND length(released_by)<=200));
ALTER TABLE privacy_legal_holds DROP CONSTRAINT IF EXISTS privacy_legal_holds_release_reason_length_check;
ALTER TABLE privacy_legal_holds ADD CONSTRAINT privacy_legal_holds_release_reason_length_check CHECK(release_reason IS NULL OR (length(release_reason)>=1 AND length(release_reason)<=1000));
REVOKE ALL ON privacy_legal_holds FROM app_runtime;
COMMIT;
