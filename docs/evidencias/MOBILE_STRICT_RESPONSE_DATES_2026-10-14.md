# Evidência — datas impossíveis em respostas móveis — 2026-10-14

## Escopo

Esta evidência pertence exclusivamente ao projeto MLIVRETRABALHO. A alteração cobre o leitor móvel de agenda profissional em `apps/mobile/lib/professional-home.ts`; não altera Creator Commerce OS, produção, Railway, pagamentos reais, contratos externos ou gates físicos.

## Falha reproduzida

O validador anterior aceitava qualquer string para a qual `new Date(value)` produzisse um timestamp finito. O runtime JavaScript normaliza datas de calendário impossíveis:

```text
input=2026-02-30T12:00:00Z
parsed=2026-03-02T12:00:00.000Z
finite=true
```

Assim, uma resposta de API contendo 30 de fevereiro podia ser apresentada como um horário real de 2 de março. O caso foi reproduzido antes da correção com o comando Node acima e convertido em regressão no teste `professional-home.test.mjs` para início/fim de assignment e início de disponibilidade. A regressão exige estado `error`, não uma data normalizada ou uma lista aparentemente válida.

## Correção

`validDate` agora exige prefixo ISO de calendário e valida ano/mês/dia por componentes UTC antes de aceitar o timestamp. Datas legítimas com offset, como as já cobertas pelos testes, continuam preservadas; a correção não altera payloads, headers, tenant/RLS, endpoints, estados de loading, escrita no servidor ou retry.

## Verificação e limites

- regressão nova: assignment com `2026-02-30` em `startsAt` e `endsAt`;
- regressão nova: janela de disponibilidade com `2026-02-30`;
- os testes anteriores de agenda, ganhos, disponibilidade e leituras independentes permanecem;
- a execução CI/APK no SHA desta branch ainda é gate pendente até o workflow real concluir;
- isso não é validação em aparelho físico e não fecha nenhum gate externo.

## Proveniência

Branch: `fix/mobile-strict-response-dates-20261014`.
Base revisada: `main` em `260a2b27b25cde8571eae2dcb93db373e7cd4f24`.
