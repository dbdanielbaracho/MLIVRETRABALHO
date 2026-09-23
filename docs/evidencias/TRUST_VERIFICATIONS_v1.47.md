# Evidência — Trust Verifications v1.47

Data: 2026-09-22

## Escopo
Baseline provider-agnostic para KYC/KYB sem autoaprovação e sem enforcement automático.

## Implementado
- migration `0023_verification_cases.sql` com isolamento por tenant;
- casos `identity` (KYC) e `business` (KYB);
- estados `pending`, `reviewing`, `verified`, `rejected`, `expired`;
- provider e provider_reference opcionais para futura integração;
- API para consultar e solicitar/reabrir verificação própria e empresarial;
- apenas owner/admin/company podem solicitar KYB; manager pode consultar;
- nenhuma rota de usuário altera status para `verified`;
- runtime pode SELECT/INSERT/UPDATE, mas não DELETE verification cases;
- política testada: apenas `verified` satisfaz um gate restrito; retry apenas quando ausente/rejected/expired.

## Limite explícito
Este baseline **não conclui TRUST-ARCH nem KYC/KYB**. Não existe provider real integrado, callback autenticado, revisão jurídica concluída nem enforcement de elegibilidade conectado a ações de produto. Portanto, nenhum trabalhador ou empresa é bloqueado automaticamente por este baseline.
