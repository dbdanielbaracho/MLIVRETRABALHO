BEGIN;
CREATE TABLE IF NOT EXISTS privacy_requests(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  identity_id uuid NOT NULL REFERENCES identities(id) ON DELETE RESTRICT,
  request_type text NOT NULL CHECK(request_type IN('access','correction','erasure','restriction','objection','consent_withdrawal','automated_decision_review','sharing_information','deactivation')),
  status text NOT NULL DEFAULT 'submitted' CHECK(status IN('submitted','reviewing','completed','partially_completed','rejected')),
  resolution_code text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);
CREATE INDEX IF NOT EXISTS privacy_requests_identity_created_idx ON privacy_requests(identity_id,created_at DESC);
GRANT SELECT,INSERT,UPDATE ON privacy_requests TO app_runtime;
REVOKE DELETE ON privacy_requests FROM app_runtime;
COMMIT;
