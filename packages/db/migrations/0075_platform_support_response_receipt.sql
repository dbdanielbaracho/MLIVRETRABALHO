BEGIN;
-- Include the resolution decision in the durable reply receipt; no roles or grants.
ALTER TABLE platform_support_responses ADD COLUMN resolves_case boolean NOT NULL DEFAULT false;
ALTER TABLE platform_support_responses ADD COLUMN request_key uuid;
CREATE UNIQUE INDEX platform_support_reply_key ON platform_support_responses(case_id,request_key) WHERE request_key IS NOT NULL;
COMMIT;
