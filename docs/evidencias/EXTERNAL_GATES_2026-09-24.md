# Gates externos restantes — MLIVRETRABALHO — 2026-09-24

Este documento separa trabalho interno concluível no repositório de validações que exigem terceiros, ambiente externo ou hardware real.

## Production Truth
- Railway build/deploy precisa estar SUCCESS no commit corrente.
- probe HTTP público canônico precisa passar contra o domínio de produção.
- GitHub Actions precisa voltar a alocar runner e executar o pipeline completo.
- rastreamento: Issue #214.

## FIN-RISK
- elegibilidade comercial do PSP para o modelo;
- fees reais/unit economics;
- PF/PJ, KYC/KYB/PLD;
- chargeback/refund/default/saldo negativo;
- sandbox real com webhook/assinatura do provider;
- payout real de teste e reconciliação;
- revisão contábil/tributária/jurídica brasileira.
- rastreamento: Issue #215.

## TRUST-ARCH
- provider KYC/KYB real;
- matriz de enforcement e limites de automação;
- direito de recurso/revisão humana;
- retenção e SLA de incidentes;
- revisão jurídica brasileira e validação adversarial externa.

## Mobile / operação real
- E2E em aparelho Android físico;
- permissões reais de localização foreground;
- deep links/notificações em dispositivo;
- instalação/distribuição de build piloto;
- jornada profissional e empresa completa fora do simulador/HTTP.

## Segurança
- pentest independente com foco em auth/session, multi-tenancy/RLS, IDOR, rate limiting, webhook financeiro, upload/documentos quando existirem, e superfícies admin.

## Regra
Nenhum desses gates será marcado como concluído apenas por build, teste unitário, HTTP local, documentação ou deploy Railway isolado.
