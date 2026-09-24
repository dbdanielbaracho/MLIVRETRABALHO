import test from 'node:test';
import assert from 'node:assert/strict';
import { copilotPolicy } from './copilot';

test('professional copilot maps common requests to existing product routes', () => {
  assert.equal(copilotPolicy({ text: 'quero ver trabalhos perto de mim' }).intent, 'find_jobs');
  assert.equal(copilotPolicy({ text: 'qual é meu próximo turno?' }).suggestedRoute, '/agenda');
  assert.equal(copilotPolicy({ text: 'quanto vou ganhar?' }).suggestedRoute, '/ganhos');
});

test('company copilot maps staffing and analytics requests without executing them', () => {
  const staffing = copilotPolicy({ text: 'monte minha equipe para amanhã', accountType: 'company' });
  assert.equal(staffing.intent, 'company_staffing');
  assert.equal(staffing.suggestedRoute, '/planejamento');
  assert.equal(staffing.executionAllowed, false);

  const analytics = copilotPolicy({ text: 'mostrar indicadores da operação', accountType: 'company' });
  assert.equal(analytics.intent, 'company_analytics');
  assert.equal(analytics.suggestedRoute, '/analytics');
});

test('critical commands are deny-by-default and require human confirmation', () => {
  const critical = copilotPolicy({ text: 'confirme candidato e pague automaticamente', accountType: 'company', mode: 'automatic' });
  assert.equal(critical.executionAllowed, false);
  assert.equal(critical.requiresHumanConfirmation, true);
});

test('unknown language does not invent a critical action', () => {
  const unknown = copilotPolicy({ text: 'faça alguma coisa inteligente' });
  assert.equal(unknown.intent, 'unknown');
  assert.equal(unknown.suggestedRoute, null);
  assert.equal(unknown.executionAllowed, false);
});
