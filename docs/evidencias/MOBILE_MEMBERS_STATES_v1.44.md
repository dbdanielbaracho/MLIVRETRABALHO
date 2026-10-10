# Membros: estados e operações guardadas — v1.44

**Data:** 09/10/2026. **Base:** #353 5560abdf3a11bbdf63800ed2767d6db7e656ff17.

## Fontes/divergências
CompanyMembersController integral lido. Gestão GET/invite/revoke owner-only; gerar convite revoga anteriores do email e cria código novo. Accept exige email da identidade e preserva regras existentes de papel/membership; revoke ack id. Tela anterior não tratava falha de rede, guard não era síncrono e aceite confiava em JSON sem schema para salvar tenant.

## Correção/revisão
Loading/erro/vazio/403/schema/foco/retry/15s e epoch/cancelamento. Snapshot tenant+identidade para gestão, ack correto, guard/inputs disabled; generation impede estado/tenant local de ação anterior. Código gerado aparece somente com contexto atual, sem logs/cópia/envio automático; blur/contexto remove código. Geração unknown exige refresh explícito antes de novo POST; não muda rotação backend. Accept valida ack e identidade antes de saveTenant. Payloads existentes preservados, inclusive revoke bodyless POST. Roles/policies/backend/RLS/style intactos.

## Provas
Seis testes novos; **63/63 UTC/São Paulo**. Dados reais/partial failure/403/datas inválidas, contexto, ack gerado/email/role/tenant, unknown/rejected, aceite específico/role/tenant, revoke ack/payload/falhas. Não são testes de aparelho/taps/segredos reais. CI/APK exatos e pós-merge pendentes; Visual Truth OPEN.

## Continuidade/transiente
#343 run 38014252773 falhou no action emulador com settings Broken pipe exit224 antes do script; build passou. Job 114100922318 repetido no mesmo head 4f39c2c92750c3a5c70bae21986d823a1eeff637. Gate obrigatório continua pendente; não reusar APK antigo de outro SHA. #353 CI 38015338561 aprovado/APK 38015338504 em andamento. #347 CI/APK próprios aprovados; sequência de integração permanece. Prosseguir Relatos/revisão visual e registrar resultados reais.
