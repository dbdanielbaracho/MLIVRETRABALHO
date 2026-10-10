BEGIN;
ALTER TABLE support_cases ADD COLUMN IF NOT EXISTS request_key uuid;
ALTER TABLE support_cases ADD COLUMN IF NOT EXISTS request_payload_hash text;
ALTER TABLE support_cases ADD CONSTRAINT support_cases_request_pair CHECK(
 (request_key IS NULL AND request_payload_hash IS NULL) OR
 (request_key IS NOT NULL AND request_payload_hash IS NOT NULL AND request_payload_hash ~ '^[0-9a-f]{64}$')
);
CREATE UNIQUE INDEX support_cases_request_key_idx
 ON support_cases(tenant_id,reporter_identity_id,request_key) WHERE request_key IS NOT NULL;
CREATE OR REPLACE FUNCTION keep_support_request_identity() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
 IF NEW.request_key IS DISTINCT FROM OLD.request_key OR NEW.request_payload_hash IS DISTINCT FROM OLD.request_payload_hash THEN
  RAISE EXCEPTION 'support_request_identity_immutable' USING ERRCODE='23514';
 END IF;
 RETURN NEW;
END;
$$;
CREATE TRIGGER support_request_identity_immutable BEFORE UPDATE ON support_cases
 FOR EACH ROW EXECUTE FUNCTION keep_support_request_identity();
COMMIT;
