# Company Shift Window v1.59

## Problema
A tela mobile de publicação de trabalho não enviava `startsAt`/`endsAt`. Como o Matching Engine compara a disponibilidade profissional com a janela real da vaga, trabalhos criados pelo app podiam ficar sem sinal de disponibilidade comprovável.

## Solução mobile
`apps/mobile/app/empresa.tsx` agora solicita:
- função/trabalho;
- cidade;
- local opcional;
- data em `DD/MM/AAAA`;
- início em `HH:MM`;
- fim em `HH:MM`;
- valor.

A tela converte a data/hora local para ISO antes do POST. Se o horário final for menor ou igual ao inicial, a interface interpreta o encerramento como sendo no dia seguinte, cobrindo turnos noturnos sem adicionar nova dependência.

## Hardening da API
`POST /v1/company/jobs` agora exige `startsAt` e `endsAt`, rejeita datas inválidas e rejeita `endsAt <= startsAt`. O banco recebe timestamps ISO normalizados.

## Prova E2E
`scripts/http-company-onboarding-e2e.sh` valida:
1. criação sem janela de turno → HTTP 400;
2. fim anterior ao início → HTTP 400;
3. janela válida → vaga criada `open` com `startsAt` e `endsAt` persistidos.

A jornada HTTP principal já usa janelas reais para as duas empresas e continua exercitando availability/matching.

## Dependências
Nenhuma dependência mobile nova foi adicionada; isso evita ampliar o gap atual de lockfile.

## Gate
Integrar apenas após typecheck, build, testes, migration runner, HTTP E2E e Production Truth contract verdes.
