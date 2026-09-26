BEGIN;
ALTER TABLE privacy_requests
  ADD COLUMN IF NOT EXISTS request_details text,
  ADD COLUMN IF NOT EXISTS evidence_ref text,
  ADD COLUMN IF NOT EXISTS operator_note text;
ALTER TABLE privacy_requests DROP CONSTRAINT IF EXISTS privacy_requests_details_length_check;
ALTER TABLE privacy_requests ADD CONSTRAINT privacy_requests_details_length_check CHECK(request_details IS NULL OR length(request_details)<=2000);
ALTER TABLE privacy_requests DROP CONSTRAINT IF EXISTS privacy_requests_operator_note_length_check;
ALTER TABLE privacy_requests ADD CONSTRAINT privacy_requests_operator_note_length_check CHECK(operator_note IS NULL OR length(operator_note)<=2000);
REVOKE ALL ON privacy_requests FROM app_runtime;
COMMIT;
