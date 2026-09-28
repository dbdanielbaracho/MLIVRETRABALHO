BEGIN;
REVOKE DELETE ON earnings_ledger FROM app_runtime;
COMMIT;
