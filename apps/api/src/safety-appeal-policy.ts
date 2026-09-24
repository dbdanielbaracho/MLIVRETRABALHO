export type SafetyAppealStatus = 'submitted' | 'reviewing' | 'upheld' | 'modified' | 'reversed';

export function safetyAppealTransition(
  current: SafetyAppealStatus,
  next: SafetyAppealStatus
): 'same' | 'allowed' | 'conflict' {
  if (current === next) return 'same';
  if (current === 'submitted') return ['reviewing', 'upheld', 'modified', 'reversed'].includes(next) ? 'allowed' : 'conflict';
  if (current === 'reviewing') return ['upheld', 'modified', 'reversed'].includes(next) ? 'allowed' : 'conflict';
  return 'conflict';
}
