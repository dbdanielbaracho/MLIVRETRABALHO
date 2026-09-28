# Gates externos restantes — MLIVRETRABALHO — 2026-09-28

Este documento registra apenas gates que realmente permanecem externos após a recuperação do hosted runner e as provas de CI/produção/Web/APK. O estado normativo é v1.14.

## Já não são blockers externos
- GitHub Actions hosted runner: restaurado.
- Production Truth/CI #214: CLOSED; canonical public gate passou no run `36372097656`.
- PR #245: CI #841 green, merged e deployed.
- APK generation: concluída no run `36371402054`, artifact `10949985331`.
- Web dependency graph/build/test: provados em CI; PRs #249–#254.

## FIN-RISK — #215 / #228
Permanecem externos:
- elegibilidade/contrato do PSP para o modelo;
- fees reais/unit economics contratados;
- PF/PJ + KYC/KYB/PLD e responsabilidades;
- chargeback/refund/default/saldo negativo;
- sandbox autenticado do produto exato;
- provider-reference binding/idempotência/reconciliação no sandbox;
- tratamento contábil/tributário operacional aplicável.

Nenhum real-money flow é liberado antes dessas provas.

## TRUST-ARCH — #219 / #228 / #220
Runtime privacy/Safety interno está provado. Permanecem externos:
- provider KYC/KYB somente se onboarding PSP-native deixar lacuna;
- callback/reference binding/propagation provider-specific em sandbox quando aplicável;
- pentest independente e retest.

Human review/appeal permanecem obrigatórios para enforcement material.

## Mobile / piloto — #220
- instalar APK em Android físico fora do tooling de desenvolvimento;
- fresh install/update/fallback;
- jornadas profissional/empresa/multi-company;
- localização allowed/denied/unavailable;
- notification/deep-link real;
- evidência sanitizada de aparelho/build/casos;
- release signing/push credentials quando necessários para o canal escolhido.

## Web — #224
Código/build/testes estão internos e provados. O gate externo restante é publicar a Web como serviço separado e executar public smoke. Novo Railway service é recurso metered e não é criado sem autorização explícita de custo.

## Segurança — #220
Pentest independente em auth/session, tenant/RLS/IDOR, admin/Safety, webhook financeiro, rate limiting e demais superfícies do piloto. Independência não pode ser autoatestada pelo projeto.

## Regra
Nenhum gate externo é fechado por documentação, inferência ou teste interno equivalente. Evidência real do terceiro/hardware/ambiente requerido deve ser preservada no repositório.
