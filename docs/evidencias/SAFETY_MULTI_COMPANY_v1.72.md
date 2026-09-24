# Safety Multi-Company v1.72

## Objetivo
Tornar o canal de segurança utilizável no mobile multiempresa sem transformar relatos em punição automática.

## Profissional
- `Segurança` aparece na navegação profissional;
- a Agenda oferece `Relatar problema de segurança` já vinculando `assignmentId` + `tenantId` corretos;
- a tela Segurança também permite escolher o trabalho por nome/local, sem UUID técnico;
- criação usa token global + `x-tenant-id` do assignment selecionado;
- `GET /v1/safety-cases/mine` sem tenant agrega somente os próprios relatos entre memberships autorizadas;
- cada consulta tenant-owned continua executando RLS e filtro explícito de `tenant_id`.

## Empresa
- nova tela `Relatos de segurança` disponível no painel Operação;
- somente owner/admin pode listar/alterar status conforme política já existente;
- consultas/listas e updates usam `tenant_id` explícito além do RLS;
- status possíveis continuam `open`, `reviewing`, `resolved`, `dismissed`;
- alterar status do caso não suspende, bloqueia nem penaliza automaticamente profissional ou empresa.

## E2E dedicado
`scripts/http-safety-e2e.sh` prova:
1. profissional + duas empresas independentes;
2. profissional confirmado pela empresa A;
3. criação de safety case ligado ao assignment A;
4. histórico `mine` sem workspace selecionado retorna o caso + tenant A;
5. empresa A vê o caso;
6. empresa B não vê o caso;
7. empresa B recebe 404 ao tentar atualizar o caso A;
8. empresa A pode mover o caso para `reviewing`;
9. profissional vê o novo status no histórico agregado.

O script passa a ser obrigatório no CI junto com frozen lockfile, Android export, migration runner, demais E2Es e Production Truth contract.

## Gate
`TRUST-ARCH` permanece OPEN/BLOCKING para provider, revisão jurídica, enforcement definitivo, suspensão/deactivation, apelação/SLA e demais políticas normativas. Esta fatia é reporting/workflow neutro, não enforcement.
