# Publicação com confirmação real — v1.46

**Data:** 09/10/2026; verificação UTC 10/10/2026 02:13.
**Base:** #355 05e2c7e6cf4ea8ef1c7553e2f9928af3b6a25d71.

## Divergência e contrato
CompanyJobCreateController reconsultado: POST insere novo trabalho, sem chave de idempotência, retorna campos reais e normaliza título/cidade/ISO. empresa.tsx antes esperava indefinidamente e aceitava qualquer HTTP ok para apagar o formulário. Nenhuma criação real foi executada nesta revisão.

## Correção revisada
15s/guard síncrono/inputs disabled; ack id/título/cidade/status/valor/instantes antes do sucesso. 4xx diferente de resultado desconhecido; falhas mantêm rascunho, sem retry automático. Link Planejamento para conferência manual. Validações de calendário/dinheiro, payload, CompanyNav fora ScrollView, estilos e backend/tenant policies preservados. Texto de turno igual corrigido para refletir calendário já existente.

## Validação
73/73 testes UTC e America/Sao_Paulo; quatro novos em company-job-publication.test.mjs: ack real/ISO equivalente, inconsistências/dados truncados, rejeição/5xx/JSON e perda de resposta sem repetir POST. CI/APK exatos, diff PR, merge e pós-merge pendentes até comprovação. Visual Truth/taps/piloto físico permanecem OPEN.

## Android: fatos sem contorno
#343 38014252773 job 114100922318; #349 38014598041 job 114101968886; #350 38014796852 job 114102576498: build sucesso, input/settings Broken pipe exit224 no emulador antes do script do projeto. Retry tentativa2 solicitado para cada job, preservando head. Nenhuma instalação/launch/DEVICE_SMOKE_OK comprovada nas tentativas falhas. Workflow já usa disable-animations false; não repetir essa opção como correção. Acompanhar retries e diagnosticar se persistir. #348 APK 38014454871 já sucesso no head corrigido.

## Limites
APK de emulador não é piloto físico nem prova completa de desenho/dados/jornadas. Sem dinheiro real/provider/custo/deploy pago. Evidências pós-merge #342 permanecem comprovadas em v1.45.
