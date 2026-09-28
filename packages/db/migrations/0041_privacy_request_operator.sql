BEGIN;
ALTER TABLE privacy_requests
  ADD COLUMN IF NOT EXISTS handled_by text;
ALTER TABLE privacy_requests DROP CONSTRAINT IF EXISTS privacy_requests_handled_by_length_check;
ALTER TABLE privacy_requests ADD CONSTRAINT privacy_requests_handled_by_length_check CHECK(handled_by IS NULL OR (length(handled_by)>=1 AND length(handled_by)<=200));
REVOKE ALL ON privacy_requests FROM app_runtime;
COMMIT;
