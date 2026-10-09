# Evidência — Identidade visual das áreas da Empresa v1.28

**Data:** 2026-10-09  
**Escopo:** quatro áreas canônicas da Empresa no aplicativo mobile  
**Status:** correção integrada; Visual Truth Gate global ainda em andamento

## Referência normativa
- Documento da Verdade v1.20: navegação canônica com identidade roxa.
- Documento da Verdade v1.23: **Início | Trabalhos | Equipe | Conta** da Empresa com identidade roxa, cards, hierarquia simples e ações contextualizadas.
- Documento da Verdade v1.27: continuidade integral das versões anteriores.

## Divergência observada
A implementação usava azul `#064A9B` e superfícies azuladas nas quatro áreas da Empresa e no estado ativo de `CompanyNav`. Isso contrariava a identidade roxa explicitamente registrada, embora a estrutura e as funções estivessem corretas.

## Correção
Foram reconciliados:
- `apps/mobile/app/empresa-inicio.tsx`;
- `apps/mobile/app/empresa.tsx`;
- `apps/mobile/app/equipes.tsx`;
- `apps/mobile/app/empresa-conta.tsx`;
- `apps/mobile/components/CompanyNav.tsx`.

A paleta passou a usar `#651FFF` nas telas, `#5B21F3` na navegação ativa e superfícies/bordas roxas suaves relacionadas. Nenhum fluxo, dado, contrato ou regra de negócio foi alterado.

## Rastreabilidade
- PR: [#335](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/335)
- Head validado: `fafa8b7bd2b458ff31acf66e0e691fe44cc21195`
- Merge em `main`: `460bd1fbaa1bc284848caf5c609fb916ebab5ee7`
- CI/foundation: [run 37978237083](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/37978237083) — sucesso
- Standalone Pilot APK: [run 37978237199](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/37978237199) — sucesso
- Teste decisivo: APK instalado e aberto sem Metro, processo ativo, atividade detectada e artefato validado publicado

## Limites da evidência
A evidência comprova consistência normativa no código, compilação e smoke test Android standalone. Não substitui inspeção visual em aparelho físico, auditoria das telas/estados restantes, pentest independente nem gates externos de PSP/KYC/sandbox, WEB-ARCH e custos.
