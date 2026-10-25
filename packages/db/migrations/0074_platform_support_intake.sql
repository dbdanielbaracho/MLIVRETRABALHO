BEGIN;
-- No intake is activated, no operator provisioned, no tenant/global membership.
CREATE TABLE platform_support_capability(singleton boolean PRIMARY KEY DEFAULT true CHECK(singleton),enabled boolean NOT NULL DEFAULT false);
INSERT INTO platform_support_capability(singleton,enabled) VALUES(true,false);
CREATE TABLE platform_support_operators(identity_id uuid PRIMARY KEY REFERENCES identities(id) ON DELETE RESTRICT,active boolean NOT NULL DEFAULT false);
CREATE TABLE platform_support_intents(
 request_key uuid PRIMARY KEY DEFAULT gen_random_uuid(),owner_identity_id uuid NOT NULL REFERENCES identities(id) ON DELETE RESTRICT,
 payload_hash text CHECK(payload_hash IS NULL OR payload_hash ~ '^[a-f0-9]{64}$'),created_at timestamptz NOT NULL DEFAULT now(),expires_at timestamptz NOT NULL DEFAULT now()+interval '24 hours',
 submitted_at timestamptz, UNIQUE(request_key,owner_identity_id), CHECK(expires_at>created_at)
);
CREATE TABLE platform_support_cases(
 id uuid PRIMARY KEY,
 owner_identity_id uuid NOT NULL REFERENCES identities(id) ON DELETE RESTRICT,
 category text NOT NULL CHECK(category IN('app_access','profile','preferences','notifications','privacy','other')),
 description text CHECK(description IS NULL OR char_length(btrim(description)) BETWEEN 1 AND 4000),
 status text NOT NULL DEFAULT 'open' CHECK(status IN('open','reviewing','resolved','withdrawn','expired')),
 created_at timestamptz NOT NULL DEFAULT now(),updated_at timestamptz NOT NULL DEFAULT now(),closed_at timestamptz,
 FOREIGN KEY(id,owner_identity_id) REFERENCES platform_support_intents(request_key,owner_identity_id) ON DELETE RESTRICT,
 CHECK((status IN('resolved','withdrawn','expired'))=(closed_at IS NOT NULL))
);
CREATE INDEX platform_support_owner_cursor ON platform_support_cases(owner_identity_id,created_at DESC,id DESC);
CREATE TABLE platform_support_assignments(case_id uuid PRIMARY KEY REFERENCES platform_support_cases(id) ON DELETE CASCADE,operator_identity_id uuid NOT NULL REFERENCES platform_support_operators(identity_id),assigned_at timestamptz NOT NULL DEFAULT now(),revoked_at timestamptz);
CREATE TABLE platform_support_responses(id uuid PRIMARY KEY DEFAULT gen_random_uuid(),case_id uuid NOT NULL REFERENCES platform_support_cases(id) ON DELETE CASCADE,operator_identity_id uuid NOT NULL REFERENCES identities(id),body text CHECK(body IS NULL OR char_length(btrim(body)) BETWEEN 1 AND 4000),created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE platform_support_audit(id uuid PRIMARY KEY DEFAULT gen_random_uuid(),case_id uuid REFERENCES platform_support_cases(id) ON DELETE SET NULL,actor_identity_id uuid REFERENCES identities(id),action text NOT NULL CHECK(action IN('submitted','read','assigned','revoked','responded','withdrawn','expired')),created_at timestamptz NOT NULL DEFAULT now());
-- Server-selected identity context only. Tenant runtime has neither ACLs nor policies permitting access.
ALTER TABLE platform_support_capability ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_support_capability FORCE ROW LEVEL SECURITY;
CREATE POLICY platform_support_capability_read ON platform_support_capability FOR SELECT USING(true);
ALTER TABLE platform_support_operators ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_support_operators FORCE ROW LEVEL SECURITY;
CREATE POLICY platform_support_operator_self ON platform_support_operators FOR SELECT USING(identity_id=NULLIF(current_setting('app.platform_support_identity',true),'')::uuid AND active);
ALTER TABLE platform_support_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_support_assignments FORCE ROW LEVEL SECURITY;
CREATE POLICY platform_support_assignment_self ON platform_support_assignments FOR SELECT USING(operator_identity_id=NULLIF(current_setting('app.platform_support_identity',true),'')::uuid AND revoked_at IS NULL);
ALTER TABLE platform_support_intents ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_support_intents FORCE ROW LEVEL SECURITY;
CREATE POLICY platform_support_intent_owner ON platform_support_intents USING(owner_identity_id=NULLIF(current_setting('app.platform_support_identity',true),'')::uuid) WITH CHECK(owner_identity_id=NULLIF(current_setting('app.platform_support_identity',true),'')::uuid);
ALTER TABLE platform_support_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_support_cases FORCE ROW LEVEL SECURITY;
CREATE POLICY platform_support_case_owner ON platform_support_cases USING(owner_identity_id=NULLIF(current_setting('app.platform_support_identity',true),'')::uuid) WITH CHECK(owner_identity_id=NULLIF(current_setting('app.platform_support_identity',true),'')::uuid);
CREATE POLICY platform_support_case_operator_read ON platform_support_cases FOR SELECT USING(EXISTS(SELECT 1 FROM platform_support_assignments a JOIN platform_support_operators o ON o.identity_id=a.operator_identity_id JOIN identities i ON i.id=o.identity_id WHERE a.case_id=platform_support_cases.id AND a.revoked_at IS NULL AND o.active AND i.deactivated_at IS NULL));
ALTER TABLE platform_support_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_support_responses FORCE ROW LEVEL SECURITY;
CREATE POLICY platform_support_response_read ON platform_support_responses FOR SELECT USING(EXISTS(SELECT 1 FROM platform_support_cases c WHERE c.id=platform_support_responses.case_id));
ALTER TABLE platform_support_audit ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_support_audit FORCE ROW LEVEL SECURITY;
CREATE POLICY platform_support_audit_actor ON platform_support_audit USING(actor_identity_id=NULLIF(current_setting('app.platform_support_identity',true),'')::uuid) WITH CHECK(actor_identity_id=NULLIF(current_setting('app.platform_support_identity',true),'')::uuid);
REVOKE ALL ON platform_support_capability,platform_support_operators,platform_support_intents,platform_support_cases,platform_support_assignments,platform_support_responses,platform_support_audit FROM PUBLIC,app_runtime;
COMMIT;
