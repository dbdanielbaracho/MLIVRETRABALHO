# Evidência — Trust Verifications v1.43

Data: 2026-09-22

## Escopo
Baseline provider-agnostic para KYC/KYB sem autoaprovação.

## Implementado
- migration `0020_verification_cases.sql` com isolamento por tenant;
- casos `identity` (KYC) e `business` (KYB);
- estados `pending`, `reviewing`, `verified`, `rejected`, `expired`;
- provider e provider_reference opcionais para futura integração;
- API para consultar e solicitar/reabrir verificação própria e empresarial;
- apenas owner/admin/company podem solicitar KYB; manager pode consultar;
- nenhuma rota de usuário altera status para `verified`;
- política testada: apenas `verified` libera ação restrita; retry apenas quando ausente/rejected/expired.

## Limite explícito
Este baseline **não conclui KYC/KYB**. Falta selecionar/integrar provider ou backoffice confiável, autenticar callbacks, armazenar evidência mínima necessária e ligar gates de produto às ações que realmente exigem verificação.
