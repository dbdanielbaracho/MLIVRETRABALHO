# Evidência — Payout recipient integrity v1.77

## Objetivo
Eliminar uma classe de erro crítico: registrar um payout como pago sem provar que o destinatário corresponde ao profissional do assignment.

## Controles
- eventos `payout_sent`, `payout_paid` e `payout_failed` exigem `recipientProfessionalId` no adapter assinado;
- `payment_events` ganha `recipient_professional_id` com FK para `professional_profiles`;
- novos eventos de payout são recusados no banco quando não possuem destinatário;
- webhook compara o destinatário assinado com `work_assignments.professional_id`;
- destinatário diferente retorna `payout_recipient_mismatch` e o evento não entra no ledger;
- destinatário faz parte da identidade de idempotência do evento;
- administradores podem auditar o destinatário armazenado;
- E2E cria dois profissionais, tenta payout assinado para o profissional errado e exige HTTP 400; somente o payout correto reconcilia.

## Limite
Este controle não envia dinheiro e não escolhe PSP. `FIN-RISK` continua OPEN/BLOCKING até sandbox real, contrato, fees, compliance, chargeback/default e revisão externa estarem comprovados.
