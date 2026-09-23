# Evidência — Company Onboarding v1.53

## Objetivo
Eliminar a dependência de fixture/admin para o primeiro workspace de uma empresa sem anexar profissionais artificialmente a tenants empresariais.

## Implementação
- `POST /v1/auth/signup` aceita `accountType=company` e `workspaceName`;
- a criação de identity, tenant e membership `owner` acontece em uma única instrução SQL/ operação atômica;
- signup profissional mantém o comportamento independente e não recebe membership empresarial artificial;
- signin retorna memberships reais da identity;
- mobile permite escolher `Quero trabalhar` ou `Sou empresa` no cadastro;
- após login de empresa, o app salva seu tenant e abre a operação empresarial.

## Teste HTTP
`scripts/http-company-onboarding-e2e.sh` prova sem acesso direto ao banco:
1. signup de empresa;
2. retorno de `tenantId` e role `owner`;
3. signin;
4. `/v1/me` confirma o membership;
5. empresa publica uma vaga usando o tenant recém-criado;
6. signout.

O CI roda esse teste antes da jornada HTTP principal.

## Limite arquitetural
Esta fatia fecha apenas o auto-provisionamento empresarial. O profissional continua sem tenant empresarial por design. Descoberta/interesse de vagas entre empresas deve ser resolvida como `NETWORK_SHARED`, conforme ADR-MT-001, sem enfraquecer RLS dos dados privados de empresa.

## Definition of Done
Typecheck, build, testes, migration runner, company onboarding HTTP E2E, jornada HTTP principal, readiness e Production Truth contract devem passar antes do merge.
