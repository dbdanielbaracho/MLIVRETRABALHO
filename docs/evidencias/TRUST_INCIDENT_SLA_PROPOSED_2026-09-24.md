# TRUST-ARCH — SLA operacional de incidentes proposto

**Data:** 2026-09-24  
**Status:** PROPOSTO / NÃO É GARANTIA CONTRATUAL OU JURÍDICA

## Objetivo

Definir prioridade operacional simples para incidentes Trust/Safety sem automatizar culpa ou punição.

## Prioridades

### P0 — risco imediato à vida/integridade, account takeover ativo ou fraude financeira ativa

- triagem humana: alvo operacional de até **15 minutos** durante janela coberta de operação;
- ação possível: contenção mínima e reversível da capability afetada, quando tecnicamente disponível;
- sempre registrar ator, motivo, evidência disponível e horário;
- revisão humana obrigatória após contenção;
- orientar serviço de emergência competente quando houver risco físico imediato; o canal da plataforma não substitui emergência.

### P1 — ameaça relevante sem risco imediato, fraude suspeita não ativa, assédio/violência/discriminação reportados

- triagem humana: alvo de até **4 horas**;
- caso permanece `open/reviewing` até evidência suficiente;
- nenhuma declaração automática de culpa.

### P2 — disputa operacional, no-show contestado, trabalho inseguro sem risco imediato, conflito de evidências

- triagem humana: alvo de até **1 dia útil**;
- preservar causalidade e permitir contraditório.

### P3 — verificação/documentação e questões administrativas sem risco imediato

- triagem: alvo de até **2 dias úteis**;
- sem punição reputacional automática por fila administrativa.

## Regras

- tempos são metas operacionais propostas, não SLA contratual enquanto TRUST-ARCH/LEGAL-ARCH estiverem abertos;
- P0 permite somente contenção proporcional/reversível e revisão humana posterior;
- nenhuma prioridade autoriza score punitivo, suspensão permanente ou deactivation automática;
- recurso/contestação permanece disponível para ação material;
- incidentes de provider devem preservar provider reference/evidence reference, evitando documentos brutos quando possível.

## Pendências antes de ativação formal

- cobertura real de suporte/pessoas;
- provider KYC/KYB e PSP;
- revisão jurídica/LGPD;
- política de retenção;
- runbook de escalonamento com contatos reais;
- pentest e exercício operacional.
