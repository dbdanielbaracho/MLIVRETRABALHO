# TRUST-ARCH — plano de fechamento externo — 2026-09-24

O baseline interno já possui reporting, verification provider-neutral, casos Safety tenant-scoped, histórico imutável de status e eventos Trust com causalidade/ator append-only. Isso não autoriza enforcement definitivo.

## Evidências ainda obrigatórias
1. provider KYC/KYB escolhido e elegível para Brasil/modelo;
2. callbacks/webhooks autenticados e idempotentes em sandbox real;
3. matriz de enforcement documentada: sinal → revisão → ação permitida → ação proibida;
4. nenhuma suspensão/score de culpa por evento sem causalidade e revisão adequada;
5. fluxo de contestação/recurso e revisão humana;
6. retenção, acesso e exclusão compatíveis com LGPD e obrigações legais;
7. SLA operacional de incidentes/emergência;
8. revisão jurídica brasileira;
9. pentest/adversarial externo das superfícies admin, reporting e verification;
10. atualização do ADR-TRUST-001 somente após evidências.

## Regra
TRUST-ARCH continua OPEN/BLOCKING. O código atual é baseline reversível e não ativa punição automática.
