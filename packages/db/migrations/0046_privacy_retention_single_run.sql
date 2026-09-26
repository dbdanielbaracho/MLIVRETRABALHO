BEGIN;
-- Concurrency is enforced with a PostgreSQL advisory lock held by the
-- maintenance connection for the entire destructive run. A unique partial
-- index on status='running' can deadlock future maintenance after a process
-- crash leaves an audit row unfinished, so explicitly remove that strategy.
DROP INDEX IF EXISTS privacy_retention_single_running_uq;
COMMIT;
