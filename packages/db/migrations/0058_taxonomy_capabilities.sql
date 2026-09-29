BEGIN;
CREATE TABLE IF NOT EXISTS taxonomy_roles(
 id text PRIMARY KEY,vertical text NOT NULL,family text NOT NULL,role text NOT NULL UNIQUE,specializations text[] NOT NULL DEFAULT '{}',skills text[] NOT NULL DEFAULT '{}',certifications text[] NOT NULL DEFAULT '{}',active boolean NOT NULL DEFAULT true,created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS professional_capabilities(
 professional_id uuid NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
 role_id text NOT NULL REFERENCES taxonomy_roles(id) ON DELETE RESTRICT,
 skills text[] NOT NULL DEFAULT '{}',certifications text[] NOT NULL DEFAULT '{}',proven_level text CHECK(proven_level IS NULL OR proven_level IN('entry','proven','advanced','expert')),
 updated_at timestamptz NOT NULL DEFAULT now(),PRIMARY KEY(professional_id,role_id)
);
INSERT INTO taxonomy_roles(id,vertical,family,role,specializations,skills) VALUES
('hospitality.waiter','hospitality','service','waiter',ARRAY['banquet','restaurant'],ARRAY['table_service','guest_service','order_accuracy']),
('hospitality.bartender','hospitality','beverage','bartender',ARRAY['events','bar'],ARRAY['drink_preparation','guest_service','bar_setup']),
('cleaning.cleaner','cleaning_facilities','cleaning','cleaner',ARRAY['commercial','events'],ARRAY['sanitation','room_reset','waste_handling']),
('hospitality.kitchen_assistant','hospitality','kitchen','kitchen_assistant',ARRAY['prep','service'],ARRAY['food_prep','station_setup','cleaning']),
('logistics.warehouse_associate','logistics_warehouse','warehouse','warehouse_associate',ARRAY['picking','packing'],ARRAY['picking','packing','inventory_handling']),
('retail.store_associate','retail','store','store_associate',ARRAY['sales_floor','stock'],ARRAY['customer_service','stocking','checkout'])
ON CONFLICT(id) DO NOTHING;
GRANT SELECT ON taxonomy_roles TO app_runtime;GRANT SELECT,INSERT,UPDATE,DELETE ON professional_capabilities TO app_runtime;
COMMIT;