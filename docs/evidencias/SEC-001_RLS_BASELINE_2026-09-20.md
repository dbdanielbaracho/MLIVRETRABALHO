# SEC-001 — Evidência inicial de isolamento RLS

**Data:** 20/09/2026  
**Requirement:** SEC-001 / SEC-002  
**ADR:** `docs/adr/ADR-MT-001.md`  
**PR:** #1 — Foundation v0.1: API, tenancy RLS and CI  
**PR head testado:** `b7a03b29256830cc909ca3028d55aa8a2ff2b9a3`  
**Merge squash em main:** `77fdcad7bf903c1d0b8e987270f496baa58b82d8`  
**GitHub Actions run:** `35553977088`  
**Conclusão do CI:** SUCCESS

## O que o CI provou

Com PostgreSQL 17 real no serviço do GitHub Actions, o pipeline executou com sucesso:

1. instalação das dependências;
2. TypeScript typecheck;
3. build;
4. migration inicial de tenancy;
5. teste de visibilidade isolada Tenant A/Tenant B;
6. bloqueio de UPDATE cross-tenant;
7. bloqueio de DELETE cross-tenant;
8. rejeição de INSERT atribuído a outro tenant;
9. contexto ausente retornando zero linhas tenant-owned;
10. `SET LOCAL` sem vazamento de contexto após `COMMIT` na mesma sessão;
11. confirmação de que `app_runtime` não é superuser nem possui `BYPASSRLS`;
12. confirmação de que o registro do Tenant B não foi alterado pelo Tenant A.

## Limite desta evidência

Esta é evidência de **baseline de implementação/CI**, não certificação de produção.

SEC-001 ainda não é Production-DONE porque faltam, conforme aplicável:
- integração real da API com PostgreSQL usando tenant context por transação;
- resolução de tenant/membership a partir de identidade autenticada;
- testes de integração HTTP end-to-end;
- deploy em ambiente operacional;
- smoke/Production Truth Gate;
- pentest antes da produção pública.

Falha futura de isolamento permanece **Stop-the-Line**.
