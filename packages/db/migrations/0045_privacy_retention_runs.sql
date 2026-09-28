BEGIN;
CREATE TABLE IF NOT EXISTS privacy_retention_runs(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  operator_id text NOT NULL CHECK(length(operator_id)>=1 AND length(operator_id)<=200),
  status text NOT NULL CHECK(status IN('running','completed','failed')),
  expired_sessions integer NOT NULL DEFAULT 0 CHECK(expired_sessions>=0),
  geo_candidates integer NOT NULL DEFAULT 0 CHECK(geo_candidates>=0),
  profile_candidates integer NOT NULL DEFAULT 0 CHECK(profile_candidates>=0),
  chat_candidates integer NOT NULL DEFAULT 0 CHECK(chat_candidates>=0),
  error_code text,
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);
ALTER TABLE privacy_retention_runs DROP CONSTRAINT IF EXISTS privacy_retention_runs_error_code_length_check;
ALTER TABLE privacy_retention_runs ADD CONSTRAINT privacy_retention_runs_error_code_length_check CHECK(error_code IS NULL OR length(error_code)<=500);
REVOKE ALL ON privacy_retention_runs FROM app_runtime;
COMMIT;
