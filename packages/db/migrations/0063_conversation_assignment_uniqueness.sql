BEGIN;
UPDATE conversation_messages cm
SET conversation_id=duplicates.canonical_id
FROM (
  SELECT id,
         first_value(id) OVER (PARTITION BY tenant_id,assignment_id ORDER BY created_at,id) AS canonical_id,
         row_number() OVER (PARTITION BY tenant_id,assignment_id ORDER BY created_at,id) AS position
  FROM conversations
  WHERE assignment_id IS NOT NULL
) duplicates
WHERE duplicates.position>1 AND cm.conversation_id=duplicates.id;

DELETE FROM conversations c
USING (
  SELECT id,
         row_number() OVER (PARTITION BY tenant_id,assignment_id ORDER BY created_at,id) AS position
  FROM conversations
  WHERE assignment_id IS NOT NULL
) duplicates
WHERE duplicates.position>1 AND c.id=duplicates.id;

CREATE UNIQUE INDEX IF NOT EXISTS conversations_tenant_assignment_uq
ON conversations(tenant_id,assignment_id)
WHERE assignment_id IS NOT NULL;
COMMIT;
