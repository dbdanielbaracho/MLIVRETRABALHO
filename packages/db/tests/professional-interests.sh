#!/usr/bin/env bash
set -euo pipefail
DATABASE_URL="${DATABASE_URL:-postgresql://postgres:postgres@localhost:5432/mlivretrabalho}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -q -f "$ROOT_DIR/packages/db/infra/roles.sql"
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -q -f "$ROOT_DIR/packages/db/migrations/0001_tenancy_foundation.sql"
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -q -f "$ROOT_DIR/packages/db/migrations/0002_professionals_and_interests.sql"
echo "PASS: professional/interests schema applied"
