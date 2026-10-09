# Evidência — Visual Truth Gate da tela Ganhos v1.27

**Data:** 2026-10-09  
**Escopo:** aplicativo mobile do MLIVRETRABALHO  
**Status:** correção integrada; auditoria visual global ainda em andamento

## Divergência observada
Em `apps/mobile/app/ganhos.tsx`, as etiquetas dos dias do gráfico semanal usavam `#EDE8FF` sobre fundo branco. A combinação deixava o texto praticamente ilegível e contrariava a hierarquia visual aprovada.

## Correção
A propriedade `dayLabel.color` foi alterada para `#65708A`. Não houve alteração de dados, rotas, API, autenticação, regras de negócio, estados ou lockfile.

## Rastreabilidade
- PR: [#333](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/333)
- Head validado: `e78dfe4e174c56ebdd7455ce961d12fd831665d0`
- Merge em `main`: `cb7b689983976255798af661ca2e59a2d4c738c0`
- CI/foundation do PR: [run 37972636600](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/37972636600) — sucesso
- Standalone Pilot APK do PR: [run 37972636568](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/37972636568), tentativa 2 — sucesso
- Teste decisivo: APK instalado e aberto sem Metro, processo ativo, atividade detectada e sem padrões fatais configurados no logcat
- Artefato `MLivreTrabalho-standalone-apk` publicado pelo workflow aprovado

## Incidentes do gate e correções
Durante a validação, o Android hospedado expôs condições de corrida entre `sys.boot_completed`, PackageManager e o provedor `settings`. O workflow foi ajustado para:

1. reconectar o ADB;
2. confirmar `sys.boot_completed=1`;
3. aguardar o serviço `package`;
4. executar uma consulta real ao PackageManager;
5. aguardar o provedor de configurações;
6. limitar cada sondagem com `timeout`;
7. somente então instalar e abrir o APK.

A primeira tentativa do run final falhou dentro do executor do emulador com `Broken pipe` antes do script do projeto. A repetição controlada passou integralmente. Essa falha transitória não foi classificada como defeito do aplicativo.

## Limites da evidência
Esta evidência comprova a correção estática no código e o smoke test Android standalone sem Metro. Ela não substitui:

- inspeção visual em aparelho físico;
- auditoria das demais telas e estados;
- pentest independente;
- validações externas de PSP/KYC/sandbox;
- fechamento de WEB-ARCH ou decisões com custo.
