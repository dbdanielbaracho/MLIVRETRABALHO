# MLIVRETRABALHO — DOCUMENTO DA VERDADE v1.28

**Status:** NORMATIVO — DELTA SOBRE v1.27  
**Data:** 2026-10-09

## Continuidade
A v1.28 preserva integralmente a v1.27 e fecha a divergência de identidade visual encontrada nas quatro áreas canônicas da Empresa.

## Identidade canônica da Empresa
Os Documentos da Verdade v1.20 e v1.23 definem identidade roxa para a experiência mobile, inclusive nas áreas **Início | Trabalhos | Equipe | Conta** da Empresa. A auditoria encontrou azul `#064A9B` na navegação ativa, ações primárias, seleção, ícones e destaques dessas áreas.

A implementação passa a usar o roxo canônico:
- `#651FFF` para CTAs, métricas, seleção, ícones e destaques das telas;
- `#5B21F3` no estado ativo da navegação inferior, igual ao fluxo Profissional;
- `#F6F3FF`, `#F0EBFF`, `#EDE8FF` e `#D8CCFF` nas superfícies e bordas de apoio relacionadas.

A alteração é exclusivamente visual. Não cria rotas e não altera endpoints, autenticação, contratos, regras de negócio, estados, React, React Native ou lockfile.

## Evidência
- PR: [#335](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/335).
- Merge validado: `460bd1fbaa1bc284848caf5c609fb916ebab5ee7`.
- CI do PR: run `37978237083`, concluído com sucesso.
- Standalone Pilot APK do PR: run `37978237199`, concluído com sucesso.
- Registro detalhado: `docs/evidencias/MOBILE_VISUAL_AUDIT_EMPRESA_IDENTIDADE_v1.28.md`.

## Gates remanescentes
Esta versão fecha apenas a divergência de paleta das quatro áreas principais da Empresa. O Visual Truth Gate continua aberto para telas, estados e fluxos restantes e para inspeção em aparelho físico quando aplicável.

Permanecem separados os gates externos de dispositivo/piloto, pentest independente, PSP/KYC/sandbox, WEB-ARCH e decisões de custo/deploy.
