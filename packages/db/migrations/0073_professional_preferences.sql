BEGIN;
-- Identity-owned platform data; company/tenant runtime receives no privileges.
CREATE TABLE professional_preferences(
 identity_id uuid PRIMARY KEY REFERENCES identities(id) ON DELETE CASCADE,
 preferred_role_ids text[] NOT NULL,
 preferred_cities text[] NOT NULL,
 revision bigint NOT NULL CHECK(revision>0 AND revision<=9007199254740991),
 updated_at timestamptz NOT NULL DEFAULT now(),
 CHECK(cardinality(preferred_role_ids)<=20 AND COALESCE(array_ndims(preferred_role_ids),1)=1 AND array_position(preferred_role_ids,NULL) IS NULL),
 CHECK(cardinality(preferred_cities)<=10 AND COALESCE(array_ndims(preferred_cities),1)=1 AND array_position(preferred_cities,NULL) IS NULL)
);
ALTER TABLE professional_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE professional_preferences FORCE ROW LEVEL SECURITY;
CREATE POLICY professional_preferences_no_tenant ON professional_preferences TO app_runtime USING(false) WITH CHECK(false);
REVOKE ALL ON professional_preferences FROM PUBLIC,app_runtime;
COMMIT;
