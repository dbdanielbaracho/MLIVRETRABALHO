BEGIN;

-- Keep private conversations and messages in their parent tenant.
-- Reuse the assignment composite key from0065; retain old FKs/cascades and NULL compatibility.
CREATE UNIQUE INDEX IF NOT EXISTS conversations_id_tenant_uq
  ON conversations(id,tenant_id);

DO $$
BEGIN
  IF NOT EXISTS(
    SELECT 1 FROM pg_constraint
    WHERE conname='conversations_assignment_tenant_fk'
      AND conrelid='conversations'::regclass
  ) THEN
    ALTER TABLE conversations
      ADD CONSTRAINT conversations_assignment_tenant_fk
      FOREIGN KEY(assignment_id,tenant_id)
      REFERENCES work_assignments(id,tenant_id)
      ON DELETE CASCADE
      NOT VALID;
  END IF;
  IF NOT EXISTS(
    SELECT 1 FROM pg_constraint
    WHERE conname='conversation_messages_conversation_tenant_fk'
      AND conrelid='conversation_messages'::regclass
  ) THEN
    ALTER TABLE conversation_messages
      ADD CONSTRAINT conversation_messages_conversation_tenant_fk
      FOREIGN KEY(conversation_id,tenant_id)
      REFERENCES conversations(id,tenant_id)
      ON DELETE CASCADE
      NOT VALID;
  END IF;
END;
$$;

-- Inconsistent historical references must fail/rollback, never be silently rewritten.
ALTER TABLE conversations
  VALIDATE CONSTRAINT conversations_assignment_tenant_fk;
ALTER TABLE conversation_messages
  VALIDATE CONSTRAINT conversation_messages_conversation_tenant_fk;

COMMIT;
