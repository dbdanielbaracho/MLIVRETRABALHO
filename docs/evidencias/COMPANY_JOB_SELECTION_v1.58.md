# Company Job Selection v1.58

## Problema
A tela mobile de interessados exigia que a empresa digitasse manualmente o UUID da vaga. Isso aumentava fricção e não era compatível com a experiência operacional pretendida.

## Solução
- `GET /v1/company/jobs` lista as vagas do tenant autenticado;
- a consulta filtra `tenant_id` explicitamente além do RLS/app_runtime;
- a tela `candidatos.tsx` carrega vagas abertas e permite selecionar uma delas por título/local;
- candidatos são carregados após o toque, sem copiar/colar ID;
- confirmação continua usando o `jobId` selecionado internamente.

## Compatibilidade com Matching
`requiredRole` continua opcional no mobile porque o backend usa o título da vaga como fallback quando o campo não é enviado.

## Prova E2E
A jornada HTTP com duas empresas valida que:
- empresa A lista e vê somente a vaga A;
- empresa B lista e vê somente a vaga B;
- nenhum tenant recebe a vaga da outra empresa;
- a jornada completa existente continua até chat, conclusão, ganhos, avaliação e Work Passport.

## Gate
Integrar somente com CI completo verde: typecheck, build, testes, migration runner, jornada HTTP e Production Truth contract.
