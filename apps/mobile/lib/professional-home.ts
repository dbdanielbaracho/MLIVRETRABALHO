export type Profile = { displayName?: string | null };
export type Assignment = { id: string; title: string; status: string; startsAt?: string | null; endsAt?: string | null; location?: string | null; payCents?: number | null };
export type Earning = { amountCents: number; status: string; createdAt: string };
export type Availability = { startsAt: string; endsAt: string };
export type Section<T> = { status: 'loading' | 'error'; data?: never } | { status: 'ready'; data: T };
export type HomeData = { profile: Section<Profile | null>; assignments: Section<Assignment[]>; earnings: Section<Earning[]>; availability: Section<Availability[]> };
export const loadingHome = (): HomeData => ({ profile: {status:'loading'}, assignments: {status:'loading'}, earnings: {status:'loading'}, availability: {status:'loading'} });
type Request = (path: string) => Promise<{ ok: boolean; json(): Promise<unknown> }>;
const record = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value);
const nonempty = (value: unknown): value is string => typeof value === 'string' && !!value.trim();
const validDate = (value: unknown): value is string => typeof value === 'string' && Number.isFinite(new Date(value).getTime());
const optionalDate = (value: unknown) => value == null || validDate(value);
const optionalText = (value: unknown) => value == null || typeof value === 'string';
const validProfile = (value: unknown): value is Profile | null => value === null || (record(value) && (value.displayName == null || nonempty(value.displayName)));
const validAssignment = (value: unknown): value is Assignment => record(value) && nonempty(value.id) && nonempty(value.title) && nonempty(value.status) && optionalDate(value.startsAt) && optionalDate(value.endsAt) && optionalText(value.location) && (value.payCents == null || Number.isSafeInteger(value.payCents));
const validEarning = (value: unknown): value is Earning => record(value) && Number.isSafeInteger(value.amountCents) && nonempty(value.status) && validDate(value.createdAt);
const validAvailability = (value: unknown): value is Availability => record(value) && validDate(value.startsAt) && validDate(value.endsAt) && new Date(value.endsAt) > new Date(value.startsAt);
const listOf = <T>(validate: (value: unknown) => value is T) => (value: unknown): value is T[] => Array.isArray(value) && value.every(validate);

// Each API has an independent result: a failed request must never become an empty list or zero.
export async function loadProfessionalHome(request: Request): Promise<HomeData> {
 async function read<T>(path: string, validate: (value: unknown) => value is T): Promise<Section<T>> {
  try { const response = await request(path); if (!response.ok) return {status:'error'}; const data = await response.json(); return validate(data) ? {status:'ready',data} : {status:'error'}; }
  catch { return {status:'error'}; }
 }
 const [profile,assignments,earnings,availability] = await Promise.all([
  read('/professional-profile',validProfile), read('/assignments/mine',listOf(validAssignment)),
  read('/earnings/mine',listOf(validEarning)), read('/availability/mine',listOf(validAvailability)),
 ]);
 return {profile,assignments,earnings,availability};
}

const timestamp = (value?: string | null) => value ? new Date(value).getTime() : NaN;
const activeStatuses = new Set(['confirmed','checked_in','in_progress','checked_out']);
export function assignmentsToday(assignments: Assignment[], now = new Date()): number {
 const start = new Date(now); start.setHours(0,0,0,0); const end = new Date(start); end.setDate(end.getDate()+1);
 return assignments.filter(a => (activeStatuses.has(a.status) || a.status === 'completed') && timestamp(a.startsAt) >= start.getTime() && timestamp(a.startsAt) < end.getTime()).length;
}
export function nextAssignment(assignments: Assignment[], now = new Date()): Assignment | null {
 return assignments.filter(a => activeStatuses.has(a.status) && Number.isFinite(timestamp(a.startsAt)) &&
  (timestamp(a.startsAt) >= now.getTime() || timestamp(a.endsAt) > now.getTime()))
  .sort((a,b) => timestamp(a.startsAt)-timestamp(b.startsAt))[0] ?? null;
}
export function weeklyEarnings(earnings: Earning[], now = new Date()): number {
 const start = new Date(now); start.setHours(0,0,0,0); start.setDate(start.getDate()-((start.getDay()+6)%7));
 return earnings.filter(e => ['payable','paid'].includes(e.status) && Number.isSafeInteger(e.amountCents) && timestamp(e.createdAt) >= start.getTime() && timestamp(e.createdAt) <= now.getTime()).reduce((sum,e) => sum+e.amountCents,0);
}
export function availabilityState(windows: Availability[], now = new Date()): 'current' | 'scheduled' | 'empty' {
 const valid = windows.filter(w => Number.isFinite(timestamp(w.startsAt)) && timestamp(w.endsAt) > timestamp(w.startsAt));
 if (valid.some(w => timestamp(w.startsAt) <= now.getTime() && timestamp(w.endsAt) > now.getTime())) return 'current';
 return valid.some(w => timestamp(w.startsAt) > now.getTime()) ? 'scheduled' : 'empty';
}
export function assignmentSchedule(assignment: Assignment): string {
 const start = new Date(assignment.startsAt ?? ''); if (!Number.isFinite(start.getTime())) return 'Horário não informado';
 const text = `${start.toLocaleDateString('pt-BR')} · ${start.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}`;
 const end = new Date(assignment.endsAt ?? '');
 return Number.isFinite(end.getTime()) && end > start ? `${text} – ${end.toLocaleDateString('pt-BR') === start.toLocaleDateString('pt-BR') ? '' : end.toLocaleDateString('pt-BR')+' · '}${end.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}` : text;
}
