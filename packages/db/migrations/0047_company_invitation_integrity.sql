BEGIN;

ALTER TABLE company_member_invitations
  DROP CONSTRAINT IF EXISTS company_member_invitations_token_hash_format_check,
  DROP CONSTRAINT IF EXISTS company_member_invitations_acceptance_pair_check,
  DROP CONSTRAINT IF EXISTS company_member_invitations_terminal_state_check;

ALTER TABLE company_member_invitations
  ADD CONSTRAINT company_member_invitations_token_hash_format_check
    CHECK (token_hash ~ '^[0-9a-f]{64}$'),
  ADD CONSTRAINT company_member_invitations_acceptance_pair_check
    CHECK ((accepted_at IS NULL AND accepted_by_identity_id IS NULL) OR (accepted_at IS NOT NULL AND accepted_by_identity_id IS NOT NULL)),
  ADD CONSTRAINT company_member_invitations_terminal_state_check
    CHECK (accepted_at IS NULL OR revoked_at IS NULL);

CREATE UNIQUE INDEX IF NOT EXISTS company_member_invitations_one_active_email_uq
  ON company_member_invitations(tenant_id,lower(email))
  WHERE accepted_at IS NULL AND revoked_at IS NULL;

COMMIT;
