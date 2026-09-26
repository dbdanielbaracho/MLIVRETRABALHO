BEGIN;

CREATE TABLE IF NOT EXISTS auth_signin_limits(
  identity_id uuid PRIMARY KEY REFERENCES identities(id) ON DELETE CASCADE,
  failed_count integer NOT NULL DEFAULT 0 CHECK(failed_count>=0),
  window_started_at timestamptz NOT NULL DEFAULT now(),
  locked_until timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS auth_signin_limits_locked_idx
  ON auth_signin_limits(locked_until)
  WHERE locked_until IS NOT NULL;

REVOKE ALL ON auth_signin_limits FROM app_runtime;

COMMIT;
