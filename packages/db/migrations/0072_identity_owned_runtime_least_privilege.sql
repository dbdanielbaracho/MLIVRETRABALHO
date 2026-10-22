BEGIN;

-- Terms are resolved by authenticated identity on the explicit platform path,
-- never by a tenant-scoped runtime query. Do not permit runtime identity forgery.
REVOKE ALL ON terms_acceptances FROM app_runtime;

-- Owner-bound capability writes use the explicit identity path. Tenant planners
-- still need SELECT for matching; retain that read permission without widening it.
REVOKE INSERT, UPDATE, DELETE ON professional_capabilities FROM app_runtime;

COMMIT;
