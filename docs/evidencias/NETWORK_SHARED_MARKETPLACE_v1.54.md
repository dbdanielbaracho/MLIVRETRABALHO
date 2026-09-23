# Evidência — NETWORK_SHARED Marketplace v1.54

## Objetivo
Permitir que um profissional independente descubra vagas e demonstre interesse sem se tornar membro de todas as empresas, preservando RLS dos dados privados de cada workspace.

## Classificação de dados
Conforme ADR-MT-001:
- `company_jobs`: **TENANT** — fonte privada/canônica da empresa, continua sob RLS;
- `marketplace_jobs`: **NETWORK_SHARED** — projeção explícita apenas dos campos de vaga destinados à descoberta;
- `marketplace_interests`: **NETWORK_SHARED** — sinal de interesse profissional por vaga;
- `professional_availability_network`: **PROFESSIONAL_OWNED** compartilhado com matching.

## Implementação
Migration `0026_network_shared_marketplace.sql`:
- cria projeção `marketplace_jobs`;
- cria `marketplace_interests`;
- cria disponibilidade profissional independente de tenant;
- backfill compatível com dados históricos;
- trigger `SECURITY DEFINER` com `search_path` fixo mantém a projeção de vaga sincronizada;
- acesso direto de runtime à projeção de vaga é somente leitura;
- nenhuma role comum de empresa recebe BYPASSRLS.

API:
- `GET /v1/jobs` exige sessão, mas não `x-tenant-id`;
- interesse em vaga exige sessão + perfil, mas não membership empresarial;
- disponibilidade do profissional não depende de tenant;
- candidatos/recomendações da empresa leem somente interesses da vaga que passou por `requireJob` dentro do tenant;
- ao confirmar, a empresa cria membership `professional` somente naquele tenant e só então cria o assignment tenant-owned;
- confirmação retorna `tenantId` operacional.

Mobile:
- tela Trabalhos usa apenas autenticação;
- tela Disponibilidade usa apenas autenticação;
- bootstrap de tenant deixa de usar localhost fixo;
- Agenda tenta descobrir o membership operacional depois que uma empresa confirma o profissional.

## Teste de jornada
`scripts/http-journey-e2e.sh` foi convertido para jornada **sem fixtures administrativas**:
1. signup profissional;
2. signup empresa cria workspace/owner;
3. perfil profissional;
4. disponibilidade profissional global;
5. vaga tenant-owned da empresa é projetada para a rede;
6. profissional lista vaga sem tenant;
7. demonstra interesse sem tenant;
8. empresa recebe recomendação;
9. empresa confirma;
10. membership `professional` aparece em `/v1/me`;
11. assignment/check-in/start/check-out/completion continuam sob tenant/RLS;
12. earnings, rating e Work Passport continuam funcionando.

## Limites
- pós-confirmação, o mobile ainda usa um tenant operacional por vez; agregação simultânea de assignments de múltiplas empresas permanece evolução separada;
- a projeção usa cidade de baixa precisão, não localização exata;
- Production Truth público no domínio oficial continua gate separado.
