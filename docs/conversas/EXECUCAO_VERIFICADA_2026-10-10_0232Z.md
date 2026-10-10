# Execução verificada — MLIVRETRABALHO — 2026-10-10 02:32 UTC

Este registro consolida integração e gates desta rodada. Reconsultar GitHub antes de agir; snapshots históricos em versões anteriores não representam o estado atual automaticamente. Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO, main.

## Estado material
Main observado: **83872fc1dbfd89165ae45376a08b56f53414c432**, árvore **77c170d6f49ac466f2ffc18de15d269490dd177f**, documento normativo v1.39. PRs #343–#349 integrados por merge commit, preservando ancestralidade. Cada head abaixo teve CI e APK standalone aprovados antes do merge, diff revisado após retarget. Árvore de cada integração igual à do head testado e parents conferidos. Pós-merge CI/APK acompanham a tabela; pending não significa conclusão ou bloqueio definitivo.

| PR | Head aprovado | CI / APK pré-merge |
|---|---|---|
| #343 | 4f39c2c92750c3a5c70bae21986d823a1eeff637 | 38014252721 / 38014252773 tentativa2: sucesso |
| #344 | b2f81a5e5c8e7151e16edcaf4345739c1aba4a67 | 38013195821 / 38013195786: sucesso |
| #345 | 58b3b9455b1406923a2676d9cc8b0ec0916a7d4c | 38013501602 / 38013501605: sucesso |
| #346 | ea36faf73c22a533cb5461cb561c248412d9a0b0 | 38013571739 / 38013571804: sucesso |
| #347 | a6a78dd3623fa75800d72e67e271f727e534a5c8 | 38013852204 / 38013852251: sucesso |
| #348 | 4b1cb40d093acc578da1629388c260889bedb0f7 | 38014454751 / 38014454871: sucesso |
| #349 | edfdfb569aa232e82b34834548e4cc77b5408a39 | 38014598006 / 38014598041 tentativa2: sucesso |

Mudanças integradas: Disponibilidade/Notificações, Perfil/PNG original, Ganhos reais, painel Empresa, Agenda por estado, cards originais do Início alimentados por APIs e catálogo/interest de Trabalhos. Não há nomes/ganhos/contagens/opportunities/reputação fictícios como substitutos de dados.

## Pós-merge em acompanhamento
| PR | SHA integrado | Runs no SHA e resultado observado |
|---|---|---|
| #343 | ebcb89d8869d0d2bb69235f231ed3355e73fbdda | Standalone Pilot APK 38017087594: in_progress; CI 38017087592: success |
| #344 | d12dcbc8d5a3e66f1620a17b1a3c1c4495ba33a3 | CI 38017117653: success; Standalone Pilot APK 38017117640: in_progress |
| #345 | a26822b172b2ffd7f012af3d9ef64ae8394bf56a | Standalone Pilot APK 38017162774: in_progress; CI 38017162742: success |
| #346 | 966e0a574c97226ec39893683f374c83aa521520 | Standalone Pilot APK 38017199889: in_progress; CI 38017199842: in_progress |
| #347 | bac5ef11859e8633b46e56bd0fc87d38d535e325 | CI 38017208075: in_progress; Standalone Pilot APK 38017208050: in_progress |
| #348 | 3064a18491ee376d4ae45e7d9d15c06227c14288 | Standalone Pilot APK 38017215617: in_progress; CI 38017215590: in_progress |
| #349 | 83872fc1dbfd89165ae45376a08b56f53414c432 | Standalone Pilot APK 38017288773: in_progress; CI 38017288733: in_progress |

#341 e #342 já tiveram CI/APK pós-merge sucesso; artefato #34211655825530 e digest do zip em v1.45. Estas provas não aprovam outros SHAs.

## Fila implementada sem afirmar entrega em main
| PR | Head exato | Gates observados |
|---|---|---|
| #350 | f1bda2d848eda85652ddb9b85f591d898d5689a8 | Standalone Pilot APK 38014796852 (tentativa 2): in_progress; CI 38014796796 (tentativa 1): success |
| #351 | 5e8fffdfee0944b1e518d9b38ec556b65d62a6b9 | CI 38015021179 (tentativa 1): success; Standalone Pilot APK 38015021164 (tentativa 1): success |
| #352 | 953bdcf9426d66b0e25bc054dbfa56b83dbf2f8e | CI 38015213524 (tentativa 1): success; Standalone Pilot APK 38015213470 (tentativa 1): success |
| #353 | 5560abdf3a11bbdf63800ed2767d6db7e656ff17 | CI 38015338561 (tentativa 1): success; Standalone Pilot APK 38015338504 (tentativa 1): success |
| #354 | da169b62efdc52a4e72ccdb3d2d4b77ef491ae3f | CI 38015650955 (tentativa 1): success; Standalone Pilot APK 38015650952 (tentativa 1): success |
| #355 | 05e2c7e6cf4ea8ef1c7553e2f9928af3b6a25d71 | Standalone Pilot APK 38015874364 (tentativa 2): in_progress; CI 38015874275 (tentativa 1): success |
| #356 | 5ddcb0d59c2bd13a49b5d4654efbcc02331699cf | Standalone Pilot APK 38016256788 (tentativa 1): in_progress; CI 38016256770 (tentativa 1): success |
| #357 | 449d25095c91fc63611ece504300448dd7192d50 | CI 38016412800 (tentativa 1): success; Standalone Pilot APK 38016412662 (tentativa 1): in_progress |
| #358 | 8e580893cf18ef31ef2f6aaa1ac168497fab46aa | Standalone Pilot APK 38016571422 (tentativa 1): in_progress; CI 38016571399 (tentativa 1): success |
| #359 | d4567c39e4c113870382fbfcc9d2bc1bff71dcb7 | CI 38016694893 (tentativa 1): success; Standalone Pilot APK 38016694857 (tentativa 1): in_progress |
| #360 | 1c1756fd20ae369a6df6855f79b873ce07ca0967 | CI 38016951965 (tentativa 1): success; Standalone Pilot APK 38016951942 (tentativa 1): in_progress |

#350 Interessados; #351 Equipe; #352 Conta/Notificações empresa; #353 Planejamento/Pagamentos; #354 Membros; #355 Relatos admin; #356 Publicação; #357 Talentos; #358 Substituições/score0–100; #359 Conversa; #360 Segurança profissional. Todos têm código, documentação normativa/evidências/ledger/memória/checkpoint na mesma alteração. Maior head implementado **1c1756fd20ae369a6df6855f79b873ce07ca0967**, v1.50, **101/101 testes locais UTC e America/Sao_Paulo**, CI38016951965 sucesso. APK próprio ainda em andamento; não substituir por APK de outro head.

## Android: incidente e prova de recuperação
#343 job114100922318 e #349 job114101968886 tentativa1: build sucesso, input/settings Broken pipe exit224 no emulador antes script/instalação do projeto. Retry controlado no mesmo head aprovou:
- #343 job114104929565: DEVICE_SMOKE_OK efetivo **2026-10-10T02:26:36.1846662Z**, pacote com.predibeacon.mlivretrabalho.pilot, metro_required=false. Artefato11656373408,28.816.522bytes, zipSHA256 **062e128cd8375d532c426063c0865f2a5b72fdb6eee67d6825a858d839412474**.
- #349 job114106103149: DEVICE_SMOKE_OK efetivo **2026-10-10T02:29:50.2486410Z**, mesmo pacote e sem Metro.
- #347 job114099698750: smoke efetivo2026-10-10T02:01:13.5353688Z.
- #348 job114101529280: smoke efetivo2026-10-10T02:10:22.7650701Z.

#350 tentativa1job114102576498 e #355 tentativa1job114105863345: mesma falha input Broken pipe224 antes script, APK compilado. Retry2 controlado solicitado, em acompanhamento, sem contornar gate. Fonte primária do action v2 consultada: sys.boot_completed precede input keyevent82; falha desse comando acontece antes do script próprio. Workflow já usa disable-animations false, sem alteração especulativa de action/API/SDK.

## Próxima ação concreta
1. Acompanhar pós-merge #343–#349 e gates exatos #350. Revalidar main/head/diff/contexto, integrar #350 somente CI/APK sucesso; retarget #351 e sequência até #360, mesmos gates e pós-merge. Não esperar digitar continuar.
2. Acompanhar retry2 #350/#355, diagnosticar nova falha real. Nenhum gate antigo/outroSHA autoriza merge.
3. Inspecionar Analytics/Copilot/Privacidade/onboarding e restantes contra requisitos/contratos antes de escolher nova correção. As correções já prontas não provam cobertura total de produto.
4. Auditar capturas/jornadas/loading/erro/vazio/dados reais contra referência original docs/referencias/baseline-mobile-original.png. **Visual Truth Gate OPEN**, fechamento v1.29 revogado v1.30. Recuperação do PNG/unidade/smoke não fecha gate.
5. #220 device/piloto/pentest, #228/#215/#219 provider/contrato/sandbox e #224WEB-ARCH/custo são dependências por item; não bloqueiam tarefas independentes. Sem dinheiro real/PSP/custos/deploy pago sem autorização. Rotina de continuidade permanece ativa; projeto não declarado completo.

## Preservação e gates deste registro
Somente documentação. React19.1.4/RN0.81.6/lockfile/código/workflows/backend/RLS inalterados. CI no SHA deste PR documental obrigatório. Paths do workflow APK não incluem docs; APK técnico anterior e pós-merges de código continuam acompanhados e não são dispensados. Pointers em checkpoint/memória/registry mantêm snapshot recuperável, sem alterar corpo histórico das versões em fila.
