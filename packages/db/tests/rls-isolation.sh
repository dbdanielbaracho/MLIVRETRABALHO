#!/usr/bin/env bash
set -euo pipefail

DATABASE_URL="${DATABASE_URL:-postgresql://postgres:postgres@localhost:5432/mlivretrabalho}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
DB_DIR="$ROOT_DIR/packages/db"

TENANT_A="11111111-1111-4111-8111-111111111111"
TENANT_B="22222222-2222-4222-8222-222222222222"
JOB_A="aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa"
JOB_B="bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb"

psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -q -f "$DB_DIR/infra/roles.sql"
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -q -f "$DB_DIR/migrations/0001_tenancy_foundation.sql"

psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -q <<SQL
TRUNCATE TABLE tenant_memberships, company_jobs, tenants CASCADE;
INSERT INTO tenants (id, slug, display_name) VALUES
  ('$TENANT_A', 'tenant-a', 'Tenant A'),
  ('$TENANT_B', 'tenant-b', 'Tenant B');
INSERT INTO company_jobs (id, tenant_id, title) VALUES
  ('$JOB_A', '$TENANT_A', 'Job A'),
  ('$JOB_B', '$TENANT_B', 'Job B');
SQL

run_as_tenant() {
  local tenant_id="$1"
  local sql="$2"
  psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -Atq <<SQL
SET ROLE app_runtime;
BEGIN;
SET LOCAL app.tenant_id = '$tenant_id';
$sql
COMMIT;
RESET ROLE;
SQL
}

count_a="$(run_as_tenant "$TENANT_A" "SELECT count(*) FROM company_jobs;" | tail -n 1)"
count_b="$(run_as_tenant "$TENANT_B" "SELECT count(*) FROM company_jobs;" | tail -n 1)"

[[ "$count_a" == "1" ]] || { echo "FAIL: Tenant A expected 1 visible job, got $count_a"; exit 1; }
[[ "$count_b" == "1" ]] || { echo "FAIL: Tenant B expected 1 visible job, got $count_b"; exit 1; }

visible_to_a="$(run_as_tenant "$TENANT_A" "SELECT string_agg(title, ',') FROM company_jobs;" | tail -n 1)"
[[ "$visible_to_a" == "Job A" ]] || { echo "FAIL: Tenant A saw unexpected rows: $visible_to_a"; exit 1; }

updated_b_by_a="$(run_as_tenant "$TENANT_A" "WITH changed AS (UPDATE company_jobs SET title = 'COMPROMISED' WHERE id = '$JOB_B' RETURNING 1) SELECT count(*) FROM changed;" | tail -n 1)"
[[ "$updated_b_by_a" == "0" ]] || { echo "FAIL: Tenant A updated Tenant B row"; exit 1; }

deleted_b_by_a="$(run_as_tenant "$TENANT_A" "WITH changed AS (DELETE FROM company_jobs WHERE id = '$JOB_B' RETURNING 1) SELECT count(*) FROM changed;" | tail -n 1)"
[[ "$deleted_b_by_a" == "0" ]] || { echo "FAIL: Tenant A deleted Tenant B row"; exit 1; }

if psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -q >/dev/null 2>&1 <<SQL
SET ROLE app_runtime;
BEGIN;
SET LOCAL app.tenant_id = '$TENANT_A';
INSERT INTO company_jobs (tenant_id, title) VALUES ('$TENANT_B', 'illegal cross-tenant insert');
COMMIT;
SQL
then
  echo "FAIL: Tenant A inserted a row for Tenant B"
  exit 1
fi

missing_context_count="$(psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -Atq <<SQL | tail -n 1
SET ROLE app_runtime;
SELECT count(*) FROM company_jobs;
RESET ROLE;
SQL
)"
[[ "$missing_context_count" == "0" ]] || { echo "FAIL: missing tenant context should see 0 rows, got $missing_context_count"; exit 1; }

mapfile -t pooled_counts < <(psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -Atq <<SQL
SET ROLE app_runtime;
BEGIN;
SET LOCAL app.tenant_id = '$TENANT_A';
SELECT count(*) FROM company_jobs;
COMMIT;
SELECT count(*) FROM company_jobs;
RESET ROLE;
SQL
)

[[ "${pooled_counts[0]:-}" == "1" ]] || { echo "FAIL: in-transaction tenant context did not expose Tenant A row"; exit 1; }
[[ "${pooled_counts[1]:-}" == "0" ]] || { echo "FAIL: SET LOCAL tenant context leaked after COMMIT"; exit 1; }

role_flags="$(psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -Atq -c "SELECT rolsuper::int || ':' || rolbypassrls::int FROM pg_roles WHERE rolname = 'app_runtime';")"
[[ "$role_flags" == "0:0" ]] || { echo "FAIL: app_runtime must not be superuser/BYPASSRLS; got $role_flags"; exit 1; }

job_b_title="$(psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -Atq -c "SELECT title FROM company_jobs WHERE id = '$JOB_B';")"
[[ "$job_b_title" == "Job B" ]] || { echo "FAIL: Tenant B row was modified unexpectedly: $job_b_title"; exit 1; }

echo "PASS: SEC-001 baseline RLS isolation checks passed"
