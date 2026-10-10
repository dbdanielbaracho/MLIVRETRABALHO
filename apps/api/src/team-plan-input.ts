import type {TeamRequirement} from './team-optimizer';

export function teamPlanRequirements(body: unknown): TeamRequirement[] | null {
  if (body === null || typeof body !== 'object' || Array.isArray(body)) return null;
  const rows = (body as Record<string, unknown>).requirements;
  if (!Array.isArray(rows) || rows.length === 0) return null;
  const requirements: TeamRequirement[] = [];
  for (const row of rows) {
    if (row === null || typeof row !== 'object' || Array.isArray(row)) return null;
    const {role, count} = row as Record<string, unknown>;
    if (typeof role !== 'string' || !role.trim() || typeof count !== 'number' || !Number.isInteger(count) || count < 1) return null;
    requirements.push({role: role.trim(), count});
  }
  return requirements;
}
