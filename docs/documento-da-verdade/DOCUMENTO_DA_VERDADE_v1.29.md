# MLIVRETRABALHO — DOCUMENTO DA VERDADE v1.29

**Status:** NORMATIVO — DELTA SOBRE v1.28  
**Data:** 2026-10-09

## Continuidade
A v1.29 preserva integralmente a v1.28, conclui a reconciliação estática do conjunto de 11 telas-alvo do Visual Truth Gate e registra os endurecimentos necessários para manter CI e APK Standalone confiáveis em runners hospedados.

## Reconciliação de entrada e autenticação
As três superfícies restantes — abertura, entrada e criação de conta — passam a seguir a identidade canônica do aplicativo:
- marca MLIVRETRABALHO e hierarquia tipográfica coerentes;
- roxo canônico `#651FFF` nos CTAs, destaques e estados selecionados;
- cores de texto, superfícies, bordas e contraste alinhados às áreas já reconciliadas;
- seleção visível e semanticamente exposta entre conta Profissional e Empresa;
- rolagem dos formulários para comportar dispositivos menores e teclado;
- papéis, rótulos e estados de acessibilidade aplicáveis.

A alteração preserva endpoints, autenticação, payloads, redirecionamentos, regras de negócio e dependências. A tipagem explícita do payload de cadastro substitui `any` sem alterar o contrato enviado.

## Visual Truth Gate — estado do conjunto estático
O conjunto documental de 11 telas-alvo está reconciliado em código:
- quatro áreas canônicas do Profissional: **Início | Trabalhos | Ganhos | Perfil**;
- quatro áreas canônicas da Empresa: **Início | Trabalhos | Equipe | Conta**;
- três superfícies de entrada/autenticação: **Abertura | Entrar | Criar conta**.

Este fechamento é de auditoria estática, estrutura, navegação, estados, legibilidade, rolagem e identidade implementada. Ele não substitui inspeção visual navegada em aparelho físico nem aceite de piloto. Qualquer divergência observada em dispositivo real reabre o gate correspondente.

## Resiliência do APK Standalone
O Android hospedado pode expor o PackageManager antes de o serviço interno de armazenamento estar pronto. Foi observada uma exceção interna `PackageManagerInternal.freeStorage` antes da instalação do aplicativo.

O workflow agora repete a instalação do mesmo APK por até seis tentativas, durante no máximo um minuto, preserva a saída de cada erro e falha ao final se o problema persistir. A proteção não ignora falhas reais do pacote.

## Resiliência do CI
O CI pós-merge encontrou duas falhas externas antes do checkout: limite anônimo do Docker Hub ao baixar `postgres:17`. O serviço de testes passa a usar o espelho público da Docker Official Image em `public.ecr.aws/docker/library/postgres:17`.

Versão do PostgreSQL, variáveis, healthcheck, banco e suíte de testes permanecem inalterados.

## Evidência
- PR visual: [#337](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/337).
- Merge visual validado: `2bb27ea09e7233f2b4c93a70c02d0e7fbf2c0962`.
- CI do PR visual: run `37988712992`, sucesso.
- Standalone Pilot APK do PR visual: run `37988712988`, sucesso.
- Standalone Pilot APK pós-merge: run `37991615638`, sucesso.
- PR de resiliência do CI: [#338](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/338).
- CI da PR de resiliência: run `37991825498`, sucesso.
- Merge de resiliência: `74cfa372b8f824adee3e99394556450eec24d9c3`.
- CI pós-merge da `main`: run `37992084863`, sucesso.
- Registro detalhado: `docs/evidencias/MOBILE_VISUAL_AUDIT_ENTRADA_v1.29.md`.

## Gates remanescentes
Permanecem abertos e separados:
- inspeção visual navegada e aceite em aparelho físico/piloto;
- pentest independente;
- PSP/KYC/KYB/PLD, sandbox e contratos do provider;
- FIN-RISK e TRUST-ARCH provider-specific;
- WEB-ARCH e decisões de custo/deploy.

Nenhum desses gates externos é considerado concluído por CI, emulador ou auditoria estática.
