BEGIN;
REVOKE UPDATE,DELETE ON payment_events FROM app_runtime;
COMMIT;
