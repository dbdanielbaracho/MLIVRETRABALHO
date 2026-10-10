# MLIVRETRABALHO — Documento da Verdade v1.44

**Status:** NORMATIVO — DELTA SOBRE v1.43  
**Data:** 2026-10-09

Preserva v1.43, referência original e continuidade v1.30. Visual Truth Gate OPEN.

## Membros: convites e participação reais
GET members/invitations distingue loading/falha/vazio/403, schema, foco/retry/15s, cancelamento/geração. Gestão exige ambas leituras válidas e permanece owner-only no backend. Empresa/identidade dos dados exibidos são comparadas antes de gerar/revogar; contexto alterado exige refresh. Membros e convites não são fabricados em falha.

Gerar/aceitar/revogar seguem ações manuais/contratos existentes, com guard síncrono e campos/ações desabilitados durante operação. Código gerado só aparece após ack com email/role/tenant-bound code/expiry corretos e contexto ainda igual; é limpo no blur/mudança de contexto. Convite desconhecido em timeout/5xx não é gerado novamente automaticamente; novo envio depende de atualização explícita bem-sucedida da lista, porque backend rotaciona/revoga convite anterior.

Aceite só salva tenant local/redireciona após accepted true, tenant correspondente ao código e papel de gestão autorizado pelo backend; sessão deve continuar igual após resposta. Rejeições específicas email mismatch e mudança de papel vedada preservadas; falha mantém código, sem participação local otimista. Revogação requer ack do convite correto e releitura; POST sem body preservado.

Não altera owner-only, papéis, checks de email/membership, promoção existente/policies/RLS/backend. Não distribui códigos automaticamente nem introduz novo papel/acesso.

## Provas/gates
Seis testes novos; 63/63 locais UTC/São Paulo. Leitura/schema/403/partial success, contexto, geração/unknown sem retry, aceite tenant/role e revogação ack/payload. Styles/rotas/dependências preservados. CI/APK head exato/pós-merge/taps obrigatórios; unidade não valida jornada em aparelho. Evidência MOBILE_MEMBERS_STATES_v1.44.md; após #353.

## Falha transitória acompanhada
#343 APK 38014252773 tentativa 1 falhou dentro do action emulador antes da instalação/script do projeto: settings service Broken pipe exit224, boot ~472s. APK compilado/CI aprovados, sem evidência de crash do app. Job 114100922318 repetido de forma controlada no mesmo SHA 4f39c2c92750c3a5c70bae21986d823a1eeff637. Não dispensar gate nem usar aprovação do head antigo. Fila continua; demais gates verdes são preservados. Relatos de segurança ainda pendente de guards/estados sem alterar decisão humana.
