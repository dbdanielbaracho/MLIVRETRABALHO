BEGIN;
ALTER TABLE privacy_requests DROP CONSTRAINT IF EXISTS privacy_requests_request_type_check;
ALTER TABLE privacy_requests ADD CONSTRAINT privacy_requests_request_type_check CHECK(request_type IN('access','correction','erasure','restriction','objection','consent_withdrawal','automated_decision_review','sharing_information','portability','deactivation'));
COMMIT;
