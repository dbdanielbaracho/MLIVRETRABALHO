BEGIN;
CREATE TABLE IF NOT EXISTS earnings_ledger(id uuid PRIMARY KEY DEFAULT gen_random_uuid(),tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,assignment_id uuid NOT NULL REFERENCES work_assignments(id) ON DELETE CASCADE,professional_id uuid NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,amount_cents integer NOT NULL CHECK(amount_cents>=0),status text NOT NULL DEFAULT 'pending' CHECK(status IN('pending','payable','paid','reversed')),created_at timestamptz NOT NULL DEFAULT now(),UNIQUE(assignment_id));
ALTER TABLE earnings_ledger ENABLE ROW LEVEL SECURITY; ALTER TABLE earnings_ledger FORCE ROW LEVEL SECURITY;
CREATE POLICY earnings_ledger_tenant_isolation ON earnings_ledger USING(tenant_id=NULLIF(current_setting('app.tenant_id',true),'')::uuid) WITH CHECK(tenant_id=NULLIF(current_setting('app.tenant_id',true),'')::uuid);
GRANT SELECT,INSERT,UPDATE,DELETE ON earnings_ledger TO app_runtime;
COMMIT;
