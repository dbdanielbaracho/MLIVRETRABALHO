# Execução verificada — 2026-10-10_2343Z

Verificação em2026-10-10 23:42 UTC: main4b797cb19dc9a7f498a86bd5ba98f003d3239991/tree8be87c3522a1f0b1b65d0e5bf30a0026f77693bf, READMEv1.100. #401–411 integradas; CI pós-merge de todas e APKs pós-merge aplicáveis agora comprovados nos SHAs reais, com passos/logs/contagens, instalação Success, DEVICE_SMOKE_OK sem Metro e ZIP não expirado vinculado ao SHA exato. N/A de402/405/406/407/411 permanece condicionado a paths e árvore mobile idênticos. Provas dos pais/árvores/pré-gates em v1.100/101; não repetir merges históricos351–411.

| PR | Merge real | CI pós-merge (web/mobile/API/CLI) | Native pós-merge |
|---|---|---|---|
| #401 | 0ee519ee064087802ad67cef4c96be4d97165e14 | 38094002384/job114336027866: 4/352/105/3 | 38094002404/job114336028036 aprovado; ZIP11685268251 |
| #402 | 4420c9b6b192ae9fc1cdd2a8d07198ba64b23b39 | 38094031044/job114336112406: 4/352/110/3 | N/A; mobile e528995c9c2f9d17d0f94ae89faaeb214742f267 |
| #403 | 694991dc62ed3292be501d90661ab16aecd2b3a8 | 38094055691/job114336187752: 4/369/110/3 | 38094055730/job114336187885 aprovado; ZIP11685253801 |
| #404 | 94053d598ad5f2a3c4402181577a5dd6eafeb509 | 38094078457/job114336251332: 4/377/110/3 | 38094078455/job114336251341 aprovado; ZIP11685667513 |
| #405 | f82251ad97e11bf2de2745fba7acee7d3aa5e6ac | 38094096342/job114336299768: 4/377/119/3 | N/A; mobile 39e121e416614fa92ce16775d19e65648492d9f3 |
| #406 | 3edd8067280fe001f25cabae5c704de91abffc9b | 38094118894/job114336366057: 4/377/131/3 | N/A; mobile 39e121e416614fa92ce16775d19e65648492d9f3 |
| #407 | 60a49f2322dad50d0c0d83de5117cfc7d74adbd5 | 38094135415/job114336415459: 4/377/140/3 | N/A; mobile 39e121e416614fa92ce16775d19e65648492d9f3 |
| #408 | 2ffaa52836a5c2a181353bddaee7f4547464de0a | 38094159144/job114336485319: 4/383/140/3 | 38094159162/job114336485119 aprovado; ZIP11685692686 |
| #409 | d5a1a799189fd4ca26b4ad785db4c12a1ab18b14 | 38094180653/job114336548733: 4/396/140/3 | 38094180701/job114336549165 aprovado; ZIP11685094005 |
| #410 | 104fdd9aef14eec9530d5df609da3d4f498c03d7 | 38094197753/job114336599695: 4/408/140/3 | 38094197754/job114336599660 aprovado; ZIP11685418696 |
| #411 | 4b797cb19dc9a7f498a86bd5ba98f003d3239991 | 38094465582/job114337396456: 4/408/145/3 | N/A; mobile 15f3227015d480516a847308f59eb95e8b408796 |

#412–414 continuam abertas, com CI próprios comprovados e APKs próprios em execução na consulta23:40UTC; nenhum merge antecipado:
- #412: head2318c8606a7770ebbf0cbd3e559aa8cbbdd13686/tree8e61d924a88647eb1e24494a84ac26042fc1fbc9; CI38094564390/job114337698890 aprovado4/424/145/3, typecheck/build/export/migrations/HTTP conferidos; APK38094564411 pendente. Base main.
- #413: head890ce8507b7e8d2e4a2a72b1d87f8c695708a134/tree21f33ff05de5d657690f252ca241330b0a89d8b9; CI38094974272/job114338910703 aprovado4/452/145/3, typecheck/build/export/migrations/HTTP conferidos; APK38094974311 pendente. Base fix/talents-safety-read-deadline.
- #414: head92bfffc9bac8972959f726fbbb5dc8d4dcf1bbb8/treeb584e15cfda45fe1f1fc2a624024924c6ef24628; CI38095282240/job114339798025 aprovado4/458/145/3, typecheck/build/export/migrations/HTTP conferidos; APK38095282246 pendente. Base fix/primary-read-deadline.

Deltas v1.101–103 pertencem às branches ainda abertas; v1.104 é a correção desta branch, não conclusão integral na main. ZIPdigest não é digest do APK individual; smoke do emulador não aceita Visual Truth físico.

## Prazo da leitura de trabalhos e da sessão para abrir ajuda

Agenda load e openSupport usavam timer que apenas abortava o controller. Credencial, transporte, JSON ou autenticação final que não resolvessem deixavam a lista carregando; a verificação da sessão para ajuda também não apresentava falha até a credencial resolver. Nove regressões dos handlers reais pré-JSX reproduziram seis falhas e três sucessos no código anterior.

operation aceita callback opcional de prazo, mantendo o default usado nas escritas. load invalida displayedAuthorization e mostra error imediatamente após 15s somente no requestId/epoch atual. openSupport faz o mesmo para ajuda/contexto e mostra a mensagem de verificação expirada, somente no helpRequest/epoch atual. Respostas ou timers de foco, tentativa, owner e seleção anteriores não substituem o estado atual; nenhuma credencial tardia autoriza painel expirado. Retentativa de leitura permanece explícita. Nenhum dado de trabalho é inventado.

PASS local24/24 em 2026-10-10: nove testes novos, sete agenda-support-screen e oito contratos/parser de Agenda. Fixtures explícitas de hooks/auth/fetch/timers usam handlers reais e loadAgenda real; não provam render React Native, SecureStore nativo ou rede externa. Cobrem auth/fetch/JSON/auth final pendentes, prazo imediato e rejeição de dados tardios, blur/novo foco, retry, troca de owner, prazo de sessão para ajuda e seleção mais recente em tenant distinto com mesmo assignment ID. Não enviam suporte nem lifecycle POST.

Corpo de action (check-in/check-out/avaliação), optionalCoordinates, imports, JSX/StyleSheets e navegação comparados e preservados; operação de escrita continua com default anterior. SupportRequest e protocolo durável não alterados. CI próprio esperado467mobile/145API/4web/3CLI, typecheck/build/export/migrations/HTTP e APK standalone no SHA exato são obrigatórios e ainda pendentes antes da publicação. React19.1.4/RN0.81.6, lockfile, tenant/RLS e desenho canônico preservados. Visual Truth físico permanece aberto.

Visual Truth físico (desenho original, dados e todos os estados, cobertura completa), Native/SecureStore/teclado/payload/restart e piloto/distribuição, pentest independente, providers/TRUST, PSP/FIN-RISK e WEB-ARCH permanecem separados e abertos. Não confundir CI/emulador/merge com deploy ou conclusão integral. Sem dinheiro real, PSP habilitado, nova cobrança, infraestrutura ou deploy pago.
Preferências: falta contrato de campos/semântica/escopo/persistência/efeito de matching; não inventar defaults nem renomear capacidades como preferências. Ajuda nova sem membership: falta autoridade por identidade/isolamento/retenção aprovada, sem tenant global arbitrário ou bypass RLS. Forecast/no-show ML depende de dados reais e validação; integrações enterprise precisam alvo/contrato. Sandbox/provider e aparelho/pentest dependem evidência externa. São impedimentos parciais, sem bloquear correções seguras independentes. Issue214closed confirmado19:00UTC;215/219/220/224/228open; ledger base já se declara snapshot histórico2026-09-24.

Publicar fix/agenda-read-deadline sobre head41492bfffc9bac8972959f726fbbb5dc8d4dcf1bbb8/treeb584e15cfda45fe1f1fc2a624024924c6ef24628, basefix/company-publication-context-deadline. Conferir bytes remotos e diff, CI467mobile/145API e APK próprio antes de merge. Integrar412,413,414 e esta fatia em ordem, só com gates aplicáveis no SHA exato, retargetmain/reconsulta eventual, merge-base tree equivalente, pais/tree/main e pós-gates reais. Registrar número/SHA/runs reais após publicação, sem antecipar resultados. Não repetir401–411 nem rerun de job em execução.
Próxima correção independente a reproduzir: Equipes loadBase/selectTeam/selectAllocation usam timer abort-only; verificar auth/HTTP/JSON/auth final/foco/seleção/company e preservar mutations/resultado incerto. Rotas secundárias precisam auditoria factual própria. Preferências, autoridade para nova ajuda semmembership, ML/dados e integraçãoenterprise precisam contratos/provas externas; físico/pentest/providers/Web seguem separados. Encerrar rodada não encerra projeto; manter continuidade até conclusão integral comprovada ou ordem expressa.
