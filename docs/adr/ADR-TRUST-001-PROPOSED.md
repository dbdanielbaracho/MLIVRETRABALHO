# ADR-TRUST-001 — Arquitetura de Trust & Safety

**Status:** PROPOSTO / GATE AINDA OPEN  
**Data:** 2026-09-22  
**Atualização:** 2026-09-24 — fronteira de referência/callback externo endurecida antes de qualquer KYC/KYB real.

## Contexto

O Documento da Verdade define `TRUST-ARCH` como hard dependency gate. Enquanto OPEN, não é permitido congelar enforcement definitivo de KYC/KYB/no-show/reporting/suspension/dispute.

Pesquisas/evidências:
- `docs/evidencias/TRUST_ARCH_RESEARCH_2026-09-22.md`;
- `docs/evidencias/TRUST_PROVIDER_REFERENCE_BOUNDARY_v1.84.md`.

## Problema

Precisamos proteger profissionais, empresas e a plataforma sem:
- punir automaticamente uma pessoa com base em relato isolado;
- misturar bloqueio de uma empresa com suspensão global;
- armazenar documentos pessoais sensíveis além do necessário;
- transformar Reliability Score em mecanismo opaco de punição;
- impedir contraditório/recurso;
- criar burocracia desnecessária para casos de baixo risco;
- permitir que um provider externo imponha IDs internos, tenant, score, suspensão ou decisão de culpa.

## Arquitetura proposta

### 1. Verificação como capability gate

Estados separados:
- `identity_verification_status`: `pending | verified | rejected | needs_review`;
- `business_verification_status`: `pending | verified | rejected | needs_review`.

Capacidades sensíveis são liberadas por status, não por leitura direta de documentos no produto.

Princípio de minimização: quando possível, persistir `provider`, `provider_reference`, `status`, timestamps e evidence reference, e não documento bruto.

### 2. Fronteira de provider/reference

Um provider real de KYC/KYB/identidade é autoridade apenas sobre fatos e referências pertencentes ao próprio provider.

O callback externo não pode ser tratado como autoridade para:
- `tenantId` interno;
- `identityId`/business ID internos;
- memberships/roles;
- score/reliability;
- suspensão/deactivation;
- culpa ou conclusão de Safety case;
- cancelamento de assignment/pagamento.

Fluxo obrigatório antes de qualquer integração real:

1. autenticar callback/evento do provider;
2. extrair referência externa do provider;
3. resolver essa referência por vínculo criado/controlado pelo backend para uma única instrução/caso de verificação interno;
4. derivar tenant e sujeito internos somente após a resolução confiável;
5. entrar no contexto RLS correspondente;
6. normalizar o fato externo como evidência/estado de verificação;
7. manter enforcement material separado e sujeito às regras/human review do TRUST-ARCH.

Referência desconhecida, ambígua, duplicada ou conflitante deve parar em rejeição/revisão; nunca em busca cross-tenant por tentativa.

Como `verification_cases` é tenant-scoped por RLS, a resolução pré-RLS deve usar mecanismo mínimo e explicitamente revisado de provider-reference routing, sem conceder acesso cross-tenant geral ao `app_runtime`.

Detalhes: `docs/evidencias/TRUST_PROVIDER_REFERENCE_BOUNDARY_v1.84.md`.

### 3. Escopo de restrição explícito

Ações distintas:
- `tenant_block`: uma empresa não deseja trabalhar novamente com determinado profissional;
- `platform_restriction`: limita uma capability específica;
- `platform_suspension`: impede novas oportunidades globalmente por tempo determinado;
- `platform_deactivation`: ação permanente/excepcional, sujeita a processo reforçado.

Um `tenant_block` não deve virar suspensão global automaticamente.

### 4. Causalidade obrigatória

Ocorrências operacionais devem declarar causa:
- `professional`;
- `company`;
- `force_majeure`;
- `platform`;
- `undetermined`.

Somente eventos com causalidade adequada podem alimentar regras futuras de reliability/enforcement. `force_majeure`, `company` e `platform` não podem penalizar automaticamente o profissional.

### 5. Case-first enforcement

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

### 6. Appeal/dispute

Toda ação material contestável deve possuir:
- canal de recurso;
- vínculo com ação/caso original;
- motivo apresentado pelo usuário;
- anexos/evidence refs quando cabível;
- estado `submitted | reviewing | upheld | modified | reversed`;
- decisão e timestamp;
- trilha de auditoria.

### 7. Emergência

Risco imediato de violência, fraude ativa, account takeover ou risco material pode justificar restrição temporária preventiva, com revisão humana posterior e motivo registrado. Isso não equivale automaticamente a decisão final de culpa.

### 8. Compromissos já confirmados

Suspensão de **novas** oportunidades e cancelamento de compromissos **já confirmados** são ações separadas. O comportamento por categoria de risco deve ser definido pela matriz de enforcement antes do fechamento do gate.

## O que NÃO está aprovado ainda

- provider específico de KYC/KYB;
- prazos ou número de strikes;
- threshold de score para suspensão;
- suspensão permanente automática;
- regra definitiva de cancelamento de assignments existentes;
- retenção final de documentos/evidências;
- SLA jurídico de recursos;
- background check obrigatório de forma geral.

## Critérios para CLOSED/APROVADO

1. revisão jurídica brasileira: trabalhista/contratual/LGPD;
2. provider KYC/KYB selecionado com termos de tratamento avaliados;
3. callback autenticado/idempotente em sandbox com provider-reference resolution segura e sem confiar em IDs internos externos;
4. reason-code taxonomy e enforcement matrix aprovadas;
5. política de appeal/dispute aprovada;
6. decisão sobre assignments existentes durante restrição;
7. testes negativos/abuso desenhados e executados;
8. revisão adversarial/pentest externo concluído;
9. Documento da Verdade e Requirements Ledger atualizados.

## Critério de reabertura

Mudança material em legislação, provider, modelo de referência/callback, modelo contratual, tratamento de dados, categorias de risco, política de suspensão/recurso ou evidência de abuso/falso positivo reabre `TRUST-ARCH`.
