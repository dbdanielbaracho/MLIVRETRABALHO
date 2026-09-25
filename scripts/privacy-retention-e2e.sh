#!/usr/bin/env bash
set -euo pipefail

DB_URL="${DATABASE_URL:-postgresql://postgres:postgres@localhost:5432/mlivretrabalho_retention}"
TENANT="11111111-2222-4333-8444-555555555555"
IDENTITY="aaaaaaaa-1111-4111-8111-111111111111"
PROFILE="bbbbbbbb-1111-4111-8111-111111111111"
JOB1="cccccccc-1111-4111-8111-111111111111"
JOB2="cccccccc-2222-4222-8222-222222222222"
JOB3="cccccccc-3333-4333-8333-333333333333"
JOB4="cccccccc-4444-4444-8444-444444444444"
ASSIGN1="dddddddd-1111-4111-8111-111111111111"
ASSIGN2="dddddddd-2222-4222-8222-222222222222"
ASSIGN3="dddddddd-3333-4333-8333-333333333333"
ASSIGN4="dddddddd-4444-4444-8444-444444444444"
CONV_DELETE="eeeeeeee-1111-4111-8111-111111111111"
CONV_HOLD="eeeeeeee-2222-4222-8222-222222222222"
CONV_WORKER_HOLD="eeeeeeee-4444-4444-8444-444444444444"
MSG_DELETE="ffffffff-1111-4111-8111-111111111111"
MSG_HOLD="ffffffff-2222-4222-8222-222222222222"
MSG_WORKER_HOLD="ffffffff-4444-4444-8444-444444444444"
IDENTITY_ANON="aaaaaaaa-2222-4222-8222-222222222222"
PROFILE_ANON="bbbbbbbb-2222-4222-8222-222222222222"
IDENTITY_HELD="aaaaaaaa-3333-4333-8333-333333333333"
PROFILE_HELD="bbbbbbbb-3333-4333-8333-333333333333"

psql "$DB_URL" -v ON_ERROR_STOP=1 -q <<SQL
INSERT INTO tenants(id,slug,display_name) VALUES('$TENANT','retention-test','Retention Test') ON CONFLICT DO NOTHING;
INSERT INTO identities(id,email,password_hash) VALUES
 ('$IDENTITY','retention-main@example.test','x'),
 ('$IDENTITY_ANON','retention-anon@example.test','x'),
 ('$IDENTITY_HELD','retention-held@example.test','x')
ON CONFLICT DO NOTHING;
UPDATE identities SET deactivated_at=now()-interval '40 days' WHERE id IN('$IDENTITY_ANON','$IDENTITY_HELD');
INSERT INTO professional_profiles(id,subject_id,identity_id,display_name,home_city,primary_role) VALUES
 ('$PROFILE','$IDENTITY','$IDENTITY','Main Profile','São Paulo','Bartender'),
 ('$PROFILE_ANON','$IDENTITY_ANON','$IDENTITY_ANON','Anon Me','São Paulo','Bartender'),
 ('$PROFILE_HELD','$IDENTITY_HELD','$IDENTITY_HELD','Keep Me','São Paulo','Bartender')
ON CONFLICT(id) DO NOTHING;
INSERT INTO company_jobs(id,tenant_id,title,status) VALUES
 ('$JOB1','$TENANT','Old Job 1','closed'),
 ('$JOB2','$TENANT','Old Job 2','closed'),
 ('$JOB3','$TENANT','Very Old Chat Job','closed'),
 ('$JOB4','$TENANT','Held Worker Chat Job','closed')
ON CONFLICT(id) DO NOTHING;
INSERT INTO work_assignments(id,tenant_id,job_id,professional_id,status,confirmed_at,checked_in_at,checked_out_at,completed_at,check_in_lat,check_in_lng,check_out_lat,check_out_lng) VALUES
 ('$ASSIGN1','$TENANT','$JOB1','$PROFILE','completed',now()-interval '40 days',now()-interval '40 days',now()-interval '40 days',now()-interval '40 days',-23.5,-46.6,-23.6,-46.7),
 ('$ASSIGN2','$TENANT','$JOB2','$PROFILE','completed',now()-interval '800 days',now()-interval '800 days',now()-interval '800 days',now()-interval '800 days',-23.5,-46.6,-23.6,-46.7),
 ('$ASSIGN3','$TENANT','$JOB3','$PROFILE','completed',now()-interval '800 days',now()-interval '800 days',now()-interval '800 days',now()-interval '800 days',NULL,NULL,NULL,NULL),
 ('$ASSIGN4','$TENANT','$JOB4','$PROFILE_HELD','completed',now()-interval '800 days',now()-interval '800 days',now()-interval '800 days',now()-interval '800 days',NULL,NULL,NULL,NULL)
ON CONFLICT(id) DO NOTHING;
INSERT INTO conversations(id,tenant_id,assignment_id,created_at) VALUES
 ('$CONV_DELETE','$TENANT','$ASSIGN3',now()-interval '800 days'),
 ('$CONV_HOLD','$TENANT','$ASSIGN2',now()-interval '800 days'),
 ('$CONV_WORKER_HOLD','$TENANT','$ASSIGN4',now()-interval '800 days')
ON CONFLICT(id) DO NOTHING;
INSERT INTO conversation_messages(id,tenant_id,conversation_id,sender_identity_id,body,created_at) VALUES
 ('$MSG_DELETE','$TENANT','$CONV_DELETE','$IDENTITY','expire me',now()-interval '800 days'),
 ('$MSG_HOLD','$TENANT','$CONV_HOLD','$IDENTITY','preserve me',now()-interval '800 days'),
 ('$MSG_WORKER_HOLD','$TENANT','$CONV_WORKER_HOLD','$IDENTITY','preserve because assigned worker is held',now()-interval '800 days')
ON CONFLICT(id) DO NOTHING;
INSERT INTO privacy_legal_holds(scope_type,scope_id,reason,evidence_ref) VALUES
 ('assignment','$ASSIGN2','retention test assignment hold','test:assignment'),
 ('identity','$IDENTITY_HELD','retention test identity hold','test:identity');
SQL

# Destructive mode must fail closed unless a separate maintenance connection is explicit.
if DATABASE_URL="$DB_URL" node apps/api/dist/privacy-retention.js --apply >/tmp/privacy-retention-missing-maintenance.log 2>&1; then
  echo "FAIL: retention apply accepted DATABASE_URL without maintenance URL" >&2
  exit 1
fi
grep -q 'PRIVACY_MAINTENANCE_DATABASE_URL_required_for_apply' /tmp/privacy-retention-missing-maintenance.log

DATABASE_URL="$DB_URL" PRIVACY_MAINTENANCE_DATABASE_URL="$DB_URL" node apps/api/dist/privacy-retention.js --apply >/tmp/privacy-retention-result.json

CLEARED="$(psql "$DB_URL" -tAc "SELECT (check_in_lat IS NULL AND check_in_lng IS NULL AND check_out_lat IS NULL AND check_out_lng IS NULL)::int FROM work_assignments WHERE id='$ASSIGN1'")"
HELD="$(psql "$DB_URL" -tAc "SELECT (check_in_lat IS NOT NULL AND check_out_lat IS NOT NULL)::int FROM work_assignments WHERE id='$ASSIGN2'")"
ANON="$(psql "$DB_URL" -tAc "SELECT (display_name='Deleted professional' AND home_city IS NULL AND primary_role IS NULL)::int FROM professional_profiles WHERE id='$PROFILE_ANON'")"
HELD_PROFILE="$(psql "$DB_URL" -tAc "SELECT (display_name='Keep Me' AND home_city='São Paulo' AND primary_role='Bartender')::int FROM professional_profiles WHERE id='$PROFILE_HELD'")"
CHAT_DELETED="$(psql "$DB_URL" -tAc "SELECT (count(*)=0)::int FROM conversation_messages WHERE id='$MSG_DELETE'")"
CHAT_HELD="$(psql "$DB_URL" -tAc "SELECT (count(*)=1)::int FROM conversation_messages WHERE id='$MSG_HOLD'")"
WORKER_HELD_CHAT="$(psql "$DB_URL" -tAc "SELECT (count(*)=1)::int FROM conversation_messages WHERE id='$MSG_WORKER_HOLD'")"
CONV_DELETED="$(psql "$DB_URL" -tAc "SELECT (count(*)=0)::int FROM conversations WHERE id='$CONV_DELETE'")"
CONV_HELD="$(psql "$DB_URL" -tAc "SELECT (count(*)=1)::int FROM conversations WHERE id='$CONV_HOLD'")"
CONV_WORKER_HELD="$(psql "$DB_URL" -tAc "SELECT (count(*)=1)::int FROM conversations WHERE id='$CONV_WORKER_HOLD'")"

test "$CLEARED" = "1"
test "$HELD" = "1"
test "$ANON" = "1"
test "$HELD_PROFILE" = "1"
test "$CHAT_DELETED" = "1"
test "$CHAT_HELD" = "1"
test "$WORKER_HELD_CHAT" = "1"
test "$CONV_DELETED" = "1"
test "$CONV_HELD" = "1"
test "$CONV_WORKER_HELD" = "1"

psql "$DB_URL" -v ON_ERROR_STOP=1 -q <<SQL
DELETE FROM privacy_legal_holds WHERE evidence_ref IN('test:assignment','test:identity');
DELETE FROM identities WHERE id IN('$IDENTITY','$IDENTITY_ANON','$IDENTITY_HELD');
DELETE FROM tenants WHERE id='$TENANT';
SQL

echo "PASS: retention is fail-closed without maintenance DB, clears precise geo, anonymizes profile, expires chat and respects legal holds"
