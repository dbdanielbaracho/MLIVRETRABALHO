#!/usr/bin/env bash
set -euo pipefail

DB_URL="${DATABASE_URL:-postgresql://postgres:postgres@localhost:5432/mlivretrabalho_retention}"
TENANT="11111111-2222-4333-8444-555555555555"
IDENTITY="aaaaaaaa-1111-4111-8111-111111111111"
PROFILE="bbbbbbbb-1111-4111-8111-111111111111"
JOB1="cccccccc-1111-4111-8111-111111111111"
JOB2="cccccccc-2222-4222-8222-222222222222"
ASSIGN1="dddddddd-1111-4111-8111-111111111111"
ASSIGN2="dddddddd-2222-4222-8222-222222222222"
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
 ('$JOB2','$TENANT','Old Job 2','closed')
ON CONFLICT(id) DO NOTHING;
INSERT INTO work_assignments(id,tenant_id,job_id,professional_id,status,confirmed_at,checked_in_at,checked_out_at,completed_at,check_in_lat,check_in_lng,check_out_lat,check_out_lng) VALUES
 ('$ASSIGN1','$TENANT','$JOB1','$PROFILE','completed',now()-interval '40 days',now()-interval '40 days',now()-interval '40 days',now()-interval '40 days',-23.5,-46.6,-23.6,-46.7),
 ('$ASSIGN2','$TENANT','$JOB2','$PROFILE','completed',now()-interval '40 days',now()-interval '40 days',now()-interval '40 days',now()-interval '40 days',-23.5,-46.6,-23.6,-46.7)
ON CONFLICT(id) DO NOTHING;
INSERT INTO privacy_legal_holds(scope_type,scope_id,reason,evidence_ref) VALUES
 ('assignment','$ASSIGN2','retention test assignment hold','test:assignment'),
 ('identity','$IDENTITY_HELD','retention test identity hold','test:identity');
SQL

DATABASE_URL="$DB_URL" node apps/api/dist/privacy-retention.js --apply >/tmp/privacy-retention-result.json

CLEARED="$(psql "$DB_URL" -tAc "SELECT (check_in_lat IS NULL AND check_in_lng IS NULL AND check_out_lat IS NULL AND check_out_lng IS NULL)::int FROM work_assignments WHERE id='$ASSIGN1'")"
HELD="$(psql "$DB_URL" -tAc "SELECT (check_in_lat IS NOT NULL AND check_out_lat IS NOT NULL)::int FROM work_assignments WHERE id='$ASSIGN2'")"
ANON="$(psql "$DB_URL" -tAc "SELECT (display_name='Deleted professional' AND home_city IS NULL AND primary_role IS NULL)::int FROM professional_profiles WHERE id='$PROFILE_ANON'")"
HELD_PROFILE="$(psql "$DB_URL" -tAc "SELECT (display_name='Keep Me' AND home_city='São Paulo' AND primary_role='Bartender')::int FROM professional_profiles WHERE id='$PROFILE_HELD'")"

test "$CLEARED" = "1"
test "$HELD" = "1"
test "$ANON" = "1"
test "$HELD_PROFILE" = "1"

psql "$DB_URL" -v ON_ERROR_STOP=1 -q <<SQL
DELETE FROM privacy_legal_holds WHERE evidence_ref IN('test:assignment','test:identity');
DELETE FROM identities WHERE id IN('$IDENTITY','$IDENTITY_ANON','$IDENTITY_HELD');
DELETE FROM tenants WHERE id='$TENANT';
SQL

echo "PASS: retention clears precise geo, anonymizes deactivated profile and respects legal hold"
