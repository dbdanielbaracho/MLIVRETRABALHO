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


## APÊNDICE DE RECIBO FINAL — PR #532 — 2026-10-14

- **Correção:** o leitor móvel de agenda rejeita datas de calendário ISO impossíveis antes de usar `Date`; regressões cobrem assignments e disponibilidade. Escopo exclusivo MLIVRETRABALHO.
- **Merge real:** `c8fceda23f0f0a423efff2fcc47d80f93b564126`.
- **Pais ordenados:** `260a2b27b25cde8571eae2dcb93db373e7cd4f24`, `442442c7fcd77afb1cef0190d30b3cd5a2ea0892`.
- **Árvore da main:** `df233cd974eadb953271e0d76c9e8d63ce39c630`, confirmada no branch `main`.
- **CI próprio do HEAD:** run `38619287186`, job `116042294770`, SUCCESS em todos os passos, incluindo testes, HTTP/Postgres e Production Truth.
- **APK próprio do HEAD:** run `38619287198`, job `116042294382`, SUCCESS em build, KVM, instalação, smoke sem Metro e upload do APK. Isso é emulador/standalone, não aparelho físico.
- **Pós-merge real:** CI run `38626600072`, job `116067212891`, SUCCESS; APK run `38626599740`, job `116067209142`, SUCCESS; Activity Watch run `38626599724`, job `116067209613`, SUCCESS.
- **Revisão:** alteração restrita a mobile/teste/evidência/documentação; sem mudança de dependências, lockfile, API, payload, headers, tenant/RLS ou produção.
- **Estado de aceite:** este recibo não declara aceite integral das 13 áreas; gates externos #215, #219, #220, #224 e #228 permanecem separados. Não misturar com Creator Commerce OS.
