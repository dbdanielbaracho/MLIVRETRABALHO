BEGIN;

CREATE TABLE IF NOT EXISTS privacy_legal_holds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES tenants(id) ON DELETE CASCADE,
  scope_type text NOT NULL CHECK(scope_type IN('identity','assignment','safety_case','financial_record')),
  scope_id uuid NOT NULL,
  reason text NOT NULL,
  evidence_ref text,
  starts_at timestamptz NOT NULL DEFAULT now(),
  review_at timestamptz,
  released_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS privacy_legal_holds_active_scope_idx
  ON privacy_legal_holds(scope_type,scope_id)
  WHERE released_at IS NULL;

CREATE INDEX IF NOT EXISTS privacy_legal_holds_review_idx
  ON privacy_legal_holds(review_at)
  WHERE released_at IS NULL AND review_at IS NOT NULL;

REVOKE ALL ON privacy_legal_holds FROM app_runtime;

COMMIT;
