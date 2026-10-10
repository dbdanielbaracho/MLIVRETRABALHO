# Perfil: estados reais e referência recuperada — v1.34

**Data:** 09/10/2026  
**Base:** #343 head 31f546868356775b993dc69bff2f08ef42998001, código dos controladores ProfessionalProfile/WorkPassport lido antes da alteração.

## Achados
Perfil ignorava HTTP não-ok, mostrava 0 avaliações/trabalhos enquanto aguardava resposta e não diferenciava Passport ausente de falha. Save não tinha guarda/timeout; falha podia parecer ausência de histórico.

## Mudança
Recursos independentes com loading/erro/ready, null apenas conforme contrato real. HTTP/rede/JSON/schema inválidos permanecem erro. Ausência de Passport só no 404 documentado. Retry/recarga no foco com timeout/cancelamento/geração. Rascunhos preservados ao recarregar e em falha de save; guard de submissão; limpeza local no signout mesmo offline. Atalhos #342 preservados; estilo original preservado.

## Verificação
5 testes novos: ausência de perfil vs erro/schema; 404 documentado vs demais falhas; zero real após resposta; estatísticas reais/coerentes; retry. Mais 14 anteriores, **19/19 UTC e São Paulo**. Nenhum é apresentado como prova da UI, guard de toque ou dispositivo. CI/typecheck/export/HTTP/isolamento e APK sem Metro ainda pendentes na abertura desta fatia.

Referência original extraída sem alteração do DOCX v1.2, imagem intacta/hash/proveniência em docs/referencias. Imagem verificada visualmente; ainda não comparada com capturas de todas as jornadas reais. Visual Truth Gate OPEN.

## Integração
Branch fix/profile-honest-network-states parte do head #343. PR deve ser retargetado a main apenas após #343, reconciliado, revisado e integrado só com gates próprios aprovados no SHA exato. #341 pós-merge CI passou e APK em andamento; #342/#343 CI passaram e APKs em andamento no registro inicial.
