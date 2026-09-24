export type CopilotMode = 'manual' | 'assisted' | 'automatic';
export type CopilotIntent =
  | 'find_jobs'
  | 'show_schedule'
  | 'show_earnings'
  | 'show_notifications'
  | 'company_staffing'
  | 'company_candidates'
  | 'company_analytics'
  | 'unknown';

export type CopilotInterpretation = {
  intent: CopilotIntent;
  confidence: number;
  reasons: string[];
  suggestedRoute: string | null;
  mode: CopilotMode;
  executionAllowed: false;
  requiresHumanConfirmation: boolean;
};

export interface CopilotProviderAdapter {
  readonly provider: string;
  interpret(input: { text: string; accountType?: string }): Promise<{
    intent: CopilotIntent;
    confidence: number;
    reasons: string[];
  }>;
}

const normalized = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

function includesAny(text: string, terms: string[]) {
  return terms.some(term => text.includes(term));
}

export function interpretCopilotIntent(text: string, accountType?: string): Omit<CopilotInterpretation, 'mode' | 'executionAllowed' | 'requiresHumanConfirmation'> {
  const input = normalized(text.trim());
  if (!input) return { intent: 'unknown', confidence: 0, reasons: ['mensagem vazia'], suggestedRoute: null };

  if (accountType === 'company') {
    if (includesAny(input, ['indicador', 'analytics', 'metrica', 'desempenho'])) {
      return { intent: 'company_analytics', confidence: 0.9, reasons: ['pedido explícito de indicadores da operação'], suggestedRoute: '/analytics' };
    }
    if (includesAny(input, ['candidato', 'interessado', 'recomendacao', 'recomenda'])) {
      return { intent: 'company_candidates', confidence: 0.9, reasons: ['pedido explícito sobre candidatos/recomendações'], suggestedRoute: '/candidatos' };
    }
    if (includesAny(input, ['equipe', 'escala', 'planejamento', 'monte minha equipe', 'staffing'])) {
      return { intent: 'company_staffing', confidence: 0.88, reasons: ['pedido de planejamento/alocação de equipe'], suggestedRoute: '/planejamento' };
    }
  }

  if (includesAny(input, ['ganho', 'recebi', 'receber', 'pagamento', 'quanto vou ganhar'])) {
    return { intent: 'show_earnings', confidence: 0.88, reasons: ['pedido sobre ganhos/pagamentos'], suggestedRoute: '/ganhos' };
  }
  if (includesAny(input, ['agenda', 'proximo trabalho', 'meu turno', 'meus turnos'])) {
    return { intent: 'show_schedule', confidence: 0.88, reasons: ['pedido sobre agenda/turnos'], suggestedRoute: '/agenda' };
  }
  if (includesAny(input, ['notificacao', 'aviso', 'mensagem nova'])) {
    return { intent: 'show_notifications', confidence: 0.85, reasons: ['pedido sobre notificações'], suggestedRoute: '/notificacoes' };
  }
  if (includesAny(input, ['trabalho', 'vaga', 'oportunidade', 'turno disponivel'])) {
    return { intent: 'find_jobs', confidence: 0.86, reasons: ['pedido sobre oportunidades de trabalho'], suggestedRoute: '/trabalhos' };
  }

  return { intent: 'unknown', confidence: 0.2, reasons: ['nenhuma intenção segura reconhecida'], suggestedRoute: null };
}

export function copilotPolicy(input: { text: string; accountType?: string; mode?: CopilotMode }): CopilotInterpretation {
  const mode = input.mode ?? 'assisted';
  const interpreted = interpretCopilotIntent(input.text, input.accountType);
  const criticalLanguage = includesAny(normalized(input.text), [
    'contrate', 'confirme candidato', 'demita', 'suspenda', 'bloqueie', 'pague', 'transfira', 'deposite', 'penalize', 'rejeite automaticamente'
  ]);

  return {
    ...interpreted,
    mode,
    executionAllowed: false,
    requiresHumanConfirmation: criticalLanguage || mode === 'automatic'
  };
}
