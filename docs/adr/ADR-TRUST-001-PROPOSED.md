# ADR-TRUST-001 — Arquitetura de Trust & Safety

**Status:** PROPOSTO / GATE AINDA OPEN  
**Data:** 2026-09-22

## Contexto

O Documento da Verdade v1.5 define `TRUST-ARCH` como hard dependency gate. Enquanto OPEN, não é permitido congelar enforcement definitivo de KYC/KYB/no-show/reporting/suspension/dispute.

A pesquisa primária está registrada em `docs/evidencias/TRUST_ARCH_RESEARCH_2026-09-22.md`.

## Problema

Precisamos proteger profissionais, empresas e a plataforma sem:
- punir automaticamente uma pessoa com base em relato isolado;
- misturar bloqueio de uma empresa com suspensão global;
- armazenar documentos pessoais sensíveis além do necessário;
- transformar Reliability Score em mecanismo opaco de punição;
- impedir contraditório/recurso;
- criar burocracia desnecessária para casos de baixo risco.

## Arquitetura proposta

### 1. Verificação como capability gate

Estados separados:
- `identity_verification_status`: `pending | verified | rejected | needs_review`;
- `business_verification_status`: `pending | verified | rejected | needs_review`.

Capacidades sensíveis são liberadas por status, não por leitura direta de documentos no produto.

Princípio de minimização: quando possível, persistir `provider`, `provider_reference`, `status`, timestamps e evidence reference, e não documento bruto.

### 2. Escopo de restrição explícito

Ações distintas:
- `tenant_block`: uma empresa não deseja trabalhar novamente com determinado profissional;
- `platform_restriction`: limita uma capability específica;
- `platform_suspension`: impede novas oportunidades globalmente por tempo determinado;
- `platform_deactivation`: ação permanente/excepcional, sujeita a processo reforçado.

Um `tenant_block` não deve virar suspensão global automaticamente.

### 3. Causalidade obrigatória

Ocorrências operacionais devem declarar causa:
- `professional`;
- `company`;
- `force_majeure`;
- `platform`;
- `undetermined`.

Somente eventos com causalidade adequada podem alimentar regras futuras de reliability/enforcement. `force_majeure`, `company` e `platform` não podem penalizar automaticamente o profissional.

### 4. Case-first enforcement

Relato cria/atualiza um caso e sua evidência. A existência de um relato, isoladamente, não equivale a culpa.

Estados de caso propostos:
`open → reviewing → action_required | resolved | dismissed`.

Ações administrativas devem guardar:
- `reason_code`;
- escopo;
- ator responsável;
- `evidence_ref`;
- início;
- expiração opcional;
- status;
- rationale interno auditável.

### 5. Appeal/dispute

Toda ação material contestável deve possuir:
- canal de recurso;
- vínculo com ação/caso original;
- motivo apresentado pelo usuário;
- anexos/evidence refs quando cabível;
- estado `submitted | reviewing | upheld | modified | reversed`;
- decisão e timestamp;
- trilha de auditoria.

### 6. Emergência

Risco imediato de violência, fraude ativa, account takeover ou risco material pode justificar restrição temporária preventiva, com revisão humana posterior e motivo registrado. Isso não equivale automaticamente a decisão final de culpa.

### 7. Compromissos já confirmados

Suspensão de **novas** oportunidades e cancelamento de compromissos **já confirmados** são ações separadas. O comportamento por categoria de risco deve ser definido pela matriz de enforcement antes do fechamento do gate.

## O que NÃO está aprovado ainda

- provider específico de KYC/KYB;
- prazos ou número de strikes;
- threshold de score para suspensão;
- suspensão permanente automática;
- regra definitiva de cancelamento de assignments existentes;
- retenção de documentos/evidências;
- SLA jurídico de recursos;
- background check obrigatório de forma geral.

## Critérios para CLOSED/APROVADO

1. revisão jurídica brasileira: trabalhista/contratual/LGPD;
2. provider KYC/KYB selecionado com termos de tratamento avaliados;
3. reason-code taxonomy e enforcement matrix aprovadas;
4. política de appeal/dispute aprovada;
5. decisão sobre assignments existentes durante restrição;
6. testes negativos/abuso desenhados;
7. revisão adversarial concluída;
8. Documento da Verdade e Requirements Ledger atualizados.

## Critério de reabertura

Mudança material em legislação, provider, modelo contratual, tratamento de dados, categorias de risco, política de suspensão/recurso ou evidência de abuso/falso positivo reabre `TRUST-ARCH`.
