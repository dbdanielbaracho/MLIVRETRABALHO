export type RatingDirection = 'professional' | 'company';

const companyRoles = new Set(['owner', 'admin', 'manager', 'company']);

export function isValidRatingScore(score: unknown): score is number {
  return Number.isInteger(score) && Number(score) >= 1 && Number(score) <= 5;
}

export function canRate(direction: RatingDirection, role: string): boolean {
  return direction === 'professional' ? companyRoles.has(role) : role === 'professional';
}
