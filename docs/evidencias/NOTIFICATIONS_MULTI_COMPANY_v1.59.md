# Notifications multi-company v1.59

Work in progress evidence placeholder created after identifying that the mobile notifications screen still depends on a selected tenant, while assignments, earnings and Work Passport already aggregate across multiple company memberships.

Target behavior:
- notification list without `x-tenant-id` aggregates only tenants where the authenticated identity has membership;
- each returned notification includes `tenantId`;
- mark-read remains tenant-scoped and requires the notification tenant;
- explicit tenant filters remain in SQL in addition to RLS;
- HTTP E2E proves a professional receives notifications from two independent companies without switching workspace.
