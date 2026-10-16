# Diagnóstico de startup do navegador — evidência funcional


## PR #561 — diagnóstico estruturado da inicialização do navegador — 2026-10-16 UTC

### Reprodução e correção limitada do harness

O próprio HEADf5a0a9c616f1a956e7eb30a0c04170d388a2b0bc falhou no CI38832425218/job116753961589 attempt1: `WEB_BROWSER_STARTUP_DIAGNOSTIC` vazio em01:00:59.8601685Z, seguido de startup timeout15s. Reprodução local executou a Promise REAL original com child/clock explícitos: stderr silencioso produz exatamente o mesmo diagnóstico vazio. Isso não esclarece por que o Chrome não iniciou e não é prova de falha API/CORS/produção.

Novo helper `waitForBrowserEndpoint` mantém prazo15000ms e falha fechada, mas observa spawn/exit/error/PID/exitCode/signalCode/killed/nome do binário, quantidade de bytes de stdout/stderr e apenas presença/validade do DevToolsActivePort do perfil descartável próprio. Flags sanitizadas de stderr; sem texto bruto, diretório do perfil, endpoint/UUID de depuração, credenciais, headers ou bodies. `stdout` e arquivo de porta são SOMENTE diagnóstico, nunca substitutos de readiness. A única readiness continua um endpoint stderr loopback real e validado; host externo/userinfo/query/hash/path inesperado são recusados. Não há nova porta exposta, grant de permissão, disable de Fetchguard/CORS/sandbox, timeout maior, retry ou alteração de browserflags.

Quatro regressões executam o helper REAL com EventEmitter/streams/clock/file fixtures explícitos: timeout silencioso ainda falha em15s com metadados, endpoint stderr fragmentado válido resolve sem timer/listener residual, stdout/porta/endpoint externo não geram falsoPASS nem vazam texto sensível, spawnerror/earlyexit falham imediatamente e limpam prazo/listeners. 4/4 PASS local, node--check PASS; suíte Web inteira145/145 (141anteriores+4), zeroFAILSKIPCANCEL. NÃO é Chrome real/typecheck/CI próprio, e não é correção comprovada da causa de startup nem do ERR_ABORTED anterior. Aplicação page.tsx/handlers/API/SQL/JSX/CSS/deps/lock/mobile continuam byte-idênticos a f5. Novo CI do novo HEAD é obrigatório e ainda PENDENTE nesta preparação. Uma eventual execução verde não explica falhas intermitentes antigas.

### Recibos finais anteriores consolidados neste ciclo funcional

| HEAD | CI próprio / job / attempt | Resultado real e limite |
|---|---|---|
| f5a0a9c616f1a956e7eb30a0c04170d388a2b0bc | 38832425218 /116753961589 /1 | FAILURE, zero retries.1318unit=[141Web,753mobile,410API,3CLI,11monitor]PASS, fail/skipped/cancelled0. Typecheck/build/export/migrationsrunner2x/privacyPASS; HTTP/browserFAIL/PostSetupNodeSKIPPED/ProductionTruth posterior NÃO executado. Nenhuma versão Chrome/DOM/PNG/jornada observada nesse HEAD. |
| 389a7d21534cf42fa20f7b17d9fe618c75f7e973 | 38832096131 /116752936911 /1 | SUCCESS,1316unit=[139Web,753mobile,410API,3CLI,11monitor], zeroFAILSKIPCANCEL/todos18steps. ProductionTruth00:57:07.6734810Z. Browser partial503/recovery PASS00:56:21.0769921Z e journey00:56:21.4874099Z. Prova do389, não f5 nem novoHEAD. |

f5 checkoutfc734c28f3c9ad4f0bc7dc4e3fd7e580d60fe114 SINTÉTICO pais[dd715c6573bcc6d6e5e3c749cc634e276db83ef0,f5a0a9c616f1a956e7eb30a0c04170d388a2b0bc], treec1d377f3cb283cf2317d2366c7051e81bc1a5b49 igualcandidata.389 checkout20dc2aa779ca00e9bd6940051ed6b3fcbc9d7350 SINTÉTICO pais[dd715c6573bcc6d6e5e3c749cc634e276db83ef0,389a7d21534cf42fa20f7b17d9fe618c75f7e973], treec4dbd7c7e1825f1eeb8f9456116870f00071e446 igualcandidata. Nenhum é HEADliteral. Nenhum merge/pós561 existe neste snapshot; não repetir ready/merge/rerun de falha concluída para ficar verde.

389 Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision3ff7ac5a9224be9156d7f8703a06e22890aafd34: uma GETteams503 consumida por fixture local,11outras GET200 reais distintas, loading/unknown, recuperação humana via Atualizar dados exige12NOVASGET200/equipe1/zeroPOSTextra desde ENVIO. Login401/vazio, equipe+vaga reais/persistpay12345/datas/render, reloaddocumentonovo/timeOrigin+readycomplete, logoutPOST201 (nãoOPTIONS204), actualbrowserbearerGETme401/outrasessãoMESMAidentity200/Bisolado. Não é Android/físico/SecureStore/VisualTruth/piloto/produção nem prova de causa do transporte.

Cinco PNGs primários389 recuperados novamente do log116752936911 e persistidos em `docs/evidencias/web-section-availability-2026-10-15/PR561_389_*` com manifesto de HEAD/checkout/tree/run/job/resultadoSUCCESS, bytes/SHA256/dimensões1365x900. Assinatura/bytes/SHA/dims verificadas independentemente; frames partial/recovered inspecionados. São do389, NÃO f5 nem próximoHEAD. Capturas560/0ffd/recibos históricos permanecem intactos, inclusive falhas. Não há imagem nova inventada nem commit somente de metadados: este ciclo muda código de diagnóstico e regressões.

### Gates preservados

Cinco documentos originais+matriz recebem somente este apêndice, mantendo todos os prefixos e estados históricos. Main dd715c6573bcc6d6e5e3c749cc634e276db83ef0 inalterada, PR558/560/561drafts; novos SHA/tree/CI precisam revisão de bytes/modes/pais/árvore/ancestrais, ownCI completo e, somente se justificado e GREEN, merge único expectedSHA e pósCI REAL com browser novamente. APK N/A deve ser comprovado por identidade integral de mobile/native/shareddeps/lock/workflows/build/smoke e grafo Android, não ausência de runs/artefato emprestado. React19.1.4/RN0.81.6, RLS/tenant/produção preservados. Sóárea10 tem aceite técnico interno;12outraspendentes, externos215/219/220/224/228 separados. Sem produção, custos, novos serviços, credenciais, contratos, PSP ou dinheiroreal. Bloqueio parcial do navegador não fecha nem bloqueia automaticamente as outras áreas.
