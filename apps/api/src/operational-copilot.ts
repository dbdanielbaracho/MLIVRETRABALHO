export type CopilotJob = {
  id: string;
  title: string;
  startsAt?: string | null;
  interestCount: number;
  confirmedCount: number;
  activeCount: number;
};

export type CopilotReplacement = {
  id: string;
  assignmentId: string;
  title: string;
};

export type OperationalAlert = {
  id: string;
  kind: 'replacement_open' | 'job_unstaffed_soon' | 'job_no_interest';
  priority: 'high' | 'medium';
  title: string;
  detail: string;
  recommendedAction: string;
  jobId?: string;
  assignmentId?: string;
  replacementRequestId?: string;
};

const HOUR_MS = 60 * 60 * 1000;

export function buildOperationalAlerts(
  jobs: CopilotJob[],
  replacements: CopilotReplacement[],
  now = new Date()
): OperationalAlert[] {
  const alerts: OperationalAlert[] = [];
  const horizon = now.getTime() + 48 * HOUR_MS;

  for (const replacement of replacements) {
    alerts.push({
      id: `replacement:${replacement.id}`,
      kind: 'replacement_open',
      priority: 'high',
      title: `Substituição pendente — ${replacement.title}`,
      detail: 'Existe uma solicitação de substituição aberta para este trabalho.',
      recommendedAction: 'Abrir Substituições e buscar um profissional disponível.',
      assignmentId: replacement.assignmentId,
      replacementRequestId: replacement.id
    });
  }

  for (const job of jobs) {
    const startsAt = job.startsAt ? new Date(job.startsAt).getTime() : Number.NaN;
    const staffed = job.confirmedCount > 0 || job.activeCount > 0;

    if (!staffed && Number.isFinite(startsAt) && startsAt >= now.getTime() && startsAt <= horizon) {
      alerts.push({
        id: `unstaffed:${job.id}`,
        kind: 'job_unstaffed_soon',
        priority: 'high',
        title: `Trabalho próximo sem profissional — ${job.title}`,
        detail: 'O trabalho começa nas próximas 48 horas e ainda não há profissional confirmado.',
        recommendedAction: job.interestCount > 0 ? 'Revisar os interessados e confirmar um profissional.' : 'Divulgar a oportunidade e acompanhar novos interessados.',
        jobId: job.id
      });
      continue;
    }

    if (!staffed && job.interestCount === 0) {
      alerts.push({
        id: `no-interest:${job.id}`,
        kind: 'job_no_interest',
        priority: 'medium',
        title: `Vaga sem interessados — ${job.title}`,
        detail: 'A vaga está aberta e ainda não recebeu interesse de profissionais.',
        recommendedAction: 'Revisar função, local, horário e valor publicados.',
        jobId: job.id
      });
    }
  }

  const priorityWeight = { high: 0, medium: 1 } as const;
  return alerts.sort((a, b) => priorityWeight[a.priority] - priorityWeight[b.priority] || a.id.localeCompare(b.id));
}
