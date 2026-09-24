# Evidência — Copilot orchestration baseline v1.79

## Objetivo
Criar a primeira fatia segura do AI Workforce Copilot sem acoplar o domínio a um LLM específico e sem permitir que IA execute decisões críticas sozinha.

## Baseline implementado
- interface `CopilotProviderAdapter` provider-neutral para futura conexão de LLM;
- interpretação determinística segura enquanto nenhum provider está configurado;
- intenções iniciais: trabalhos, agenda, ganhos, notificações, staffing, candidatos e analytics;
- endpoint autenticado `POST /v1/copilot/interpret`;
- tipo de conta inferido do contexto/membership, não escolhido pelo cliente para autorização;
- resposta sempre informa `executionAllowed: false`;
- linguagem crítica como contratar/confirmar/pagar/suspender/bloquear/penalizar exige confirmação humana;
- modo `automatic` não libera execução — permanece deny-by-default;
- provider retornado como `deterministic_baseline` e `providerConfigured: false`;
- tela mobile `Assistente` para profissional e empresa, com sugestão de rota e sem tool execution;
- HTTP E2E prova que profissional/empresa recebem rotas corretas e que comando crítico em modo automatic continua sem execução.

## Arquivos
- `apps/api/src/copilot.ts`
- `apps/api/src/copilot.test.ts`
- `apps/api/src/copilot.controller.ts`
- `apps/api/src/app.module.ts`
- `apps/mobile/app/copilot.tsx`
- `apps/mobile/app/trabalhos.tsx`
- `apps/mobile/app/empresa-inicio.tsx`
- `scripts/http-copilot-e2e.sh`
- `.github/workflows/ci.yml`

## Limites deliberados
- nenhum OpenAI/Anthropic/Gemini ou outro provider foi congelado;
- nenhuma decisão crítica é tool-called/executada;
- nenhum score, contratação, pagamento, suspensão ou punição é decidido pelo Copilot;
- futuras tools devem passar por policy/authorization do domínio e pelos gates LEGAL-ARCH, FIN-RISK e TRUST-ARCH aplicáveis.

## Próxima evolução segura
Adicionar multi-provider LLM gateway somente depois de definir contratos, custo, privacidade, retention e fallback. A camada de orchestration/policy deve permanecer independente do provider.
