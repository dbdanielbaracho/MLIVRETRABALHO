# Evidência — v1.103

## Prazo e erro na leitura da empresa ativa para publicar trabalho

loadContext de Criar novo trabalho aguardava authenticatedTenantHeaders sem timer ou catch. Se SecureStore/auth não resolvia, contexto ficava indisponível sem mensagem de prazo; se rejeitava, loadContext rejeitava sem tratamento na chamada de foco. Seis regressões dos handlers reais pré-JSX reproduziram5falhas/1pass na versão anterior.

A leitura ganha controller registrado no conjunto já abortado em blur e prazo15s. Callback atual invalida context/contextReady e informa falha de verificação; resposta tardia após prazo/blur/retry não autoriza formulário. Erro de credencial é capturado e apresentado somente no request/foco atual. finally limpa timer/controller. Nenhuma requisição HTTP é feita por loadContext, nenhuma empresa/token é inventada e não se habilita publicação antes da verificação existente.

Deadline/falha não apagam draftContext, campos do rascunho ou flag de publicação incerta. Mudança verificada de company/owner mantém somente o comportamento preexistente de clearDraft; a correção não altera esse contrato. Handler create, validação/body/post/ACK/rejected/unknown, guardas de submissão, JSX e StyleSheets são preservados por comparação integral. Não publicar trabalho real ou repetir mutation para verificar a leitura.

PASS12/12 local:6novos +6company-job-publication. Fixtures explícitas de hooks/auth/timer, handler real e parser de publicação real; sem renderReactNative, SecureStore nativo, HTTP ou publicação externa. Cobre credencial pendente/late, rejeição, retry, foco/deadline antigo, preservação de rascunho/uncertain e ausência de tenant. CI próprio esperado458mobile/145API/4web/3CLI +typecheck/build/export/migrations/HTTP eAPK standalone no SHA exato obrigatórios; pendentes antes de publicar. React19.1.4/RN0.81.6/lockfile/scopes/tenant/RLS/standalone/desenho preservados. Visual Truth físico/gates externos abertos.

## Estado verificado

Verificação em2026-10-10 23:24:23 UTC: main4b797cb19dc9a7f498a86bd5ba98f003d3239991/tree8be87c3522a1f0b1b65d0e5bf30a0026f77693bf, Documento vigentev1.100. #401–411 integradas; todos os CI pós-merge aplicáveis comprovados por passos/logs/contagens/typecheck/build/export/migrations/HTTP no SHA real. Pré-merges/pais/árvores/digests em v1.100/v1.101 e evidências, sem repetir integração ou substituir pós-gates por pré-gates.

| PR | Merge real | CI pós-merge comprovado (web/mobile/API/CLI) | APK pós-merge |
|---|---|---|---|
| #401 | 0ee519ee064087802ad67cef4c96be4d97165e14 | 38094002384/job114336027866: 4/352/105/3 | 38094002404 em execução |
| #402 | 4420c9b6b192ae9fc1cdd2a8d07198ba64b23b39 | 38094031044/job114336112406: 4/352/110/3 | N/A: paths/mobile equivalentes |
| #403 | 694991dc62ed3292be501d90661ab16aecd2b3a8 | 38094055691/job114336187752: 4/369/110/3 | 38094055730 em execução |
| #404 | 94053d598ad5f2a3c4402181577a5dd6eafeb509 | 38094078457/job114336251332: 4/377/110/3 | 38094078455 em execução |
| #405 | f82251ad97e11bf2de2745fba7acee7d3aa5e6ac | 38094096342/job114336299768: 4/377/119/3 | N/A: paths/mobile equivalentes |
| #406 | 3edd8067280fe001f25cabae5c704de91abffc9b | 38094118894/job114336366057: 4/377/131/3 | N/A: paths/mobile equivalentes |
| #407 | 60a49f2322dad50d0c0d83de5117cfc7d74adbd5 | 38094135415/job114336415459: 4/377/140/3 | N/A: paths/mobile equivalentes |
| #408 | 2ffaa52836a5c2a181353bddaee7f4547464de0a | 38094159144/job114336485319: 4/383/140/3 | 38094159162 em execução |
| #409 | d5a1a799189fd4ca26b4ad785db4c12a1ab18b14 | 38094180653/job114336548733: 4/396/140/3 | 38094180701 em execução |
| #410 | 104fdd9aef14eec9530d5df609da3d4f498c03d7 | 38094197753/job114336599695: 4/408/140/3 | 38094197754 em execução |
| #411 | 4b797cb19dc9a7f498a86bd5ba98f003d3239991 | 38094465582/job114337396456: 4/408/145/3 | N/A: paths/mobile equivalentes |

#411 pósCI38094465582/job114337396456 aprovado408mobile/145API/4web/3CLI; marker23:19:04.1028281Z comprova semana real PostgreSQL terça/quinta em ordem. OwnAPK N/A por paths e apps/mobile15f3227015d480516a847308f59eb95e8b408796 idêntico410. Não dispensa pósAPKs anteriores nem aceite físico.

#412 ABERTA, base main, head2318c8606a7770ebbf0cbd3e559aa8cbbdd13686/tree8e61d924a88647eb1e24494a84ac26042fc1fbc9.12arquivos remotos byteidênticos e diff revisto. CI38094564390/job114337698890 success no SHA exato, todos os passos/log completo:424mobile/145API/4web/3CLI, typecheck/build/export/migrations/HTTP. Marker23:20:49.8820572Z da cronologia real. APK próprio38094564411/job114337699062 em build na reconsulta23:23UTC; não integrada. Documento v1.101 é delta dessa branch, ainda não vigente na main.
PósAPKs40138094002404/job114336028036;40338094055730/job114336187885;40438094078455/job114336251341;40838094159162/job114336485119;40938094180701/job114336549165: build aprovado/device smoke em execução23:23UTC.41038094197754/job114336599660 ainda build. Acompanhar sem rerun enquanto executam. Emulador e ZIPdigest não são aceite físico nem digest individual APK.

Atualização em2026-10-10 23:29:53 UTC: #413 aberta, basefix/talents-safety-read-deadline, head890ce8507b7e8d2e4a2a72b1d87f8c695708a134/tree21f33ff05de5d657690f252ca241330b0a89d8b9.14arquivos remotos byteidênticos/patch revisto. CI38094974272/job114338910703 aprovado no SHA exato, todos os passos/logs:452mobile/145API/4web/3CLI; marker cronologia HTTP23:27:13.1988519Z. APK próprio38094974311 in_progress, não integrada. #412 próprio APK38094564411 in_progress, não integrada; seu CI424/145 já comprovado. Retarget só em ordem após predecessor integrado e com próprios gates exatos. Main continua4b797cb19dc9a7f498a86bd5ba98f003d3239991/v1.100; deltas101/102 pertencem às branches abertas.

## CI próprios comprovados

```json
{
  "ci412": {
    "run": 38094564390,
    "job": 114337698890,
    "counts": [
      4,
      424,
      145,
      3
    ],
    "head": "2318c8606a7770ebbf0cbd3e559aa8cbbdd13686",
    "http": [
      "2026-10-10T23:20:49.8820572Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
    ]
  },
  "ci413": {
    "run": 38094974272,
    "job": 114338910703,
    "head": "890ce8507b7e8d2e4a2a72b1d87f8c695708a134",
    "counts": [
      4,
      452,
      145,
      3
    ],
    "http": [
      "2026-10-10T23:27:13.1988519Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
    ]
  }
}
```

Visual Truth físico (desenho original, dados e todos os estados, cobertura completa), Native/SecureStore/teclado/payload/restart e piloto/distribuição, pentest independente, providers/TRUST, PSP/FIN-RISK e WEB-ARCH permanecem separados e abertos. Não confundir CI/emulador/merge com deploy ou conclusão integral. Sem dinheiro real, PSP habilitado, nova cobrança, infraestrutura ou deploy pago.
Preferências: falta contrato de campos/semântica/escopo/persistência/efeito de matching; não inventar defaults nem renomear capacidades como preferências. Ajuda nova sem membership: falta autoridade por identidade/isolamento/retenção aprovada, sem tenant global arbitrário ou bypass RLS. Forecast/no-show ML depende de dados reais e validação; integrações enterprise precisam alvo/contrato. Sandbox/provider e aparelho/pentest dependem evidência externa. São impedimentos parciais, sem bloquear correções seguras independentes. Issue214closed confirmado19:00UTC;215/219/220/224/228open; ledger base já se declara snapshot histórico2026-09-24.
