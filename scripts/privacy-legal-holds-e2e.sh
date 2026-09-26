#!/usr/bin/env bash
set -euo pipefail

DB_URL="${DATABASE_URL:?DATABASE_URL_required}"
OPERATOR_ID="e2e:privacy-legal-holds"
TENANT="91111111-2222-4333-8444-555555555555"
IDENTITY="9aaaaaaa-1111-4111-8111-111111111111"
PROFILE="9bbbbbbb-1111-4111-8111-111111111111"
JOB="9ccccccc-1111-4111-8111-111111111111"
ASSIGNMENT="9ddddddd-1111-4111-8111-111111111111"
REVIEW_AT="2099-01-01T00:00:00Z"
NEXT_REVIEW_AT="2099-02-01T00:00:00Z"

json_field(){ node -e 'const fs=require("fs");let x=JSON.parse(fs.readFileSync(0,"utf8"));for(const p of process.argv[1].split(".")){x=x?.[p]}if(x===undefined||x===null)process.exit(2);process.stdout.write(String(x));' "$1"; }

psql "$DB_URL" -v ON_ERROR_STOP=1 -q <<SQL
INSERT INTO tenants(id,slug,display_name) VALUES('$TENANT','legal-hold-e2e','Legal Hold E2E') ON CONFLICT DO NOTHING;
INSERT INTO identities(id,email,password_hash) VALUES('$IDENTITY','legal-hold-e2e@example.test','x') ON CONFLICT DO NOTHING;
INSERT INTO professional_profiles(id,subject_id,identity_id,display_name) VALUES('$PROFILE','$IDENTITY','$IDENTITY','Legal Hold E2E') ON CONFLICT(id) DO NOTHING;
INSERT INTO company_jobs(id,tenant_id,title,status) VALUES('$JOB','$TENANT','Legal Hold E2E','closed') ON CONFLICT(id) DO NOTHING;
INSERT INTO work_assignments(id,tenant_id,job_id,professional_id,status,confirmed_at,completed_at) VALUES('$ASSIGNMENT','$TENANT','$JOB','$PROFILE','completed',now()-interval '800 days',now()-interval '800 days') ON CONFLICT(id) DO NOTHING;
SQL

if PRIVACY_OPERATOR_ID="$OPERATOR_ID" node apps/api/dist/privacy-legal-holds-ops.js create assignment "$ASSIGNMENT" reason evidence "$REVIEW_AT" >/tmp/legal-hold-no-db.log 2>&1; then
  echo 'FAIL: legal hold create accepted missing maintenance DB' >&2; exit 1
fi
grep -q 'PRIVACY_MAINTENANCE_DATABASE_URL_required' /tmp/legal-hold-no-db.log

if PRIVACY_MAINTENANCE_DATABASE_URL="$DB_URL" node apps/api/dist/privacy-legal-holds-ops.js create assignment "$ASSIGNMENT" reason evidence "$REVIEW_AT" >/tmp/legal-hold-no-operator.log 2>&1; then
  echo 'FAIL: legal hold create accepted missing operator' >&2; exit 1
fi
grep -q 'PRIVACY_OPERATOR_ID_required' /tmp/legal-hold-no-operator.log

if PRIVACY_MAINTENANCE_DATABASE_URL="$DB_URL" PRIVACY_OPERATOR_ID="$OPERATOR_ID" node apps/api/dist/privacy-legal-holds-ops.js create assignment "$ASSIGNMENT" reason evidence >/tmp/legal-hold-no-review.log 2>&1; then
  echo 'FAIL: legal hold create accepted missing review date' >&2; exit 1
fi
grep -q 'review_at_required' /tmp/legal-hold-no-review.log

HOLD_JSON="$(PRIVACY_MAINTENANCE_DATABASE_URL="$DB_URL" PRIVACY_OPERATOR_ID="$OPERATOR_ID" node apps/api/dist/privacy-legal-holds-ops.js create assignment "$ASSIGNMENT" 'E2E legal hold' 'test:legal-hold' "$REVIEW_AT")"
HOLD_ID="$(printf '%s' "$HOLD_JSON" | json_field id)"
node -e 'const x=JSON.parse(process.argv[1]);if(x.scopeType!=="assignment"||!x.tenantId||x.createdBy!==process.argv[2]||!x.reviewAt)throw new Error("hold audit missing")' "$HOLD_JSON" "$OPERATOR_ID"

REVIEW_JSON="$(PRIVACY_MAINTENANCE_DATABASE_URL="$DB_URL" PRIVACY_OPERATOR_ID="$OPERATOR_ID" node apps/api/dist/privacy-legal-holds-ops.js review "$HOLD_ID" 'E2E review completed; hold remains required' "$NEXT_REVIEW_AT")"
node -e 'const x=JSON.parse(process.argv[1]);if(!x.reviewedAt||x.reviewedBy!==process.argv[2]||x.reviewNote.indexOf("hold remains required")<0||!x.reviewAt)throw new Error("review audit missing")' "$REVIEW_JSON" "$OPERATOR_ID"

LIST_JSON="$(PRIVACY_MAINTENANCE_DATABASE_URL="$DB_URL" node apps/api/dist/privacy-legal-holds-ops.js list)"
node -e 'const rows=JSON.parse(process.argv[1]);if(!rows.some(x=>x.id===process.argv[2]&&x.createdBy===process.argv[3]&&x.reviewedBy===process.argv[3]))throw new Error("reviewed active hold not listed")' "$LIST_JSON" "$HOLD_ID" "$OPERATOR_ID"

RELEASE_JSON="$(PRIVACY_MAINTENANCE_DATABASE_URL="$DB_URL" PRIVACY_OPERATOR_ID="$OPERATOR_ID" node apps/api/dist/privacy-legal-holds-ops.js release "$HOLD_ID" 'E2E release')"
node -e 'const x=JSON.parse(process.argv[1]);if(!x.releasedAt||x.releasedBy!==process.argv[2]||x.releaseReason!=="E2E release")throw new Error("release audit missing")' "$RELEASE_JSON" "$OPERATOR_ID"

ACTIVE="$(psql "$DB_URL" -tAc "SELECT count(*) FROM privacy_legal_holds WHERE id='$HOLD_ID' AND released_at IS NULL")"
test "$ACTIVE" = "0"

psql "$DB_URL" -v ON_ERROR_STOP=1 -q <<SQL
DELETE FROM privacy_legal_holds WHERE id='$HOLD_ID';
DELETE FROM identities WHERE id='$IDENTITY';
DELETE FROM tenants WHERE id='$TENANT';
SQL

echo 'PASS: legal hold lifecycle is privileged, operator-audited, reviewable, listed, and releasable'
