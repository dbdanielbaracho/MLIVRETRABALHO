BEGIN;
CREATE UNIQUE INDEX IF NOT EXISTS privacy_retention_single_running_uq
  ON privacy_retention_runs ((1))
  WHERE status='running';
COMMIT;
