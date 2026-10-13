# Evidência — prazo nas mutações Web de força de trabalho (2026-10-13)

## Escopo

Esta evidência cobre adicionar/remover membro de equipe, confirmar candidato, solicitar/selecionar substituição e adicionar/remover profissional do talent pool no console Web. Não cobre aparelho físico, pentest, PSP/KYC, implantação paga ou qualquer transação real.

## Falha reproduzida

No source após o merge #506, cada operação podia manter a interface em `loading=true` para sempre em dois pontos independentes:

1. o `fetch` da mutação não resolvia;
2. o transporte respondia, mas `response.json()` não resolvia.

Foram adicionadas 14 regressões determinísticas (sete operações × dois pontos de espera). Resultado RED: 106 testes anteriores aprovados e 14 falhas novas, todas observando `loading=true` após o prazo simulado.

## Correção

As sete mutações passaram a executar transporte + JSON dentro de um prazo explícito de 15 segundos. Quando ele expira:

- `loading` é liberado;
- a interface informa que o resultado pode ser desconhecido;
- nenhuma revisão é avançada;
- seleção e formulários permanecem;
- nenhuma confirmação é fabricada;
- não ocorre retry automático;
- conclusão ou ACK tardio é ignorado pela operação expirada;
- o timer é limpo.

O prazo é uma proteção de estado da interface. Ele não cancela nem revoga uma escrita que o servidor talvez já tenha recebido; por isso a orientação é atualizar os dados antes de novo envio.

## Regressão

`node --experimental-strip-types --test apps/web/app/*.test.ts`

Resultado local depois da correção: 120 testes, 120 aprovados, zero falhas. Os testes anteriores de ACK continuam verificando método, payload, headers, tenant, vínculo exato, erro HTTP, resultado incerto e ausência de retry; somente seus ambientes VM passaram a fornecer os timers existentes no navegador/Node.

## Predecessor

O #506 foi integrado no merge real `a981a6ccc67787526ebbeeb299d5b2a8668096d8`, árvore `cf038ee9953af9013fe9bcfa4033d6fb3738a4bf`. CI próprio `38358738843`/job `115167636921` e pós-CI `38359224213`/job `115169187903`: SUCCESS, contagens 106/731/385/3/10 e Production Truth aprovado.

## Estado dos gates deste ciclo

No snapshot de preparação, PR, CI próprio, revisão final de árvore, merge e pós-CI ainda são pendentes. O fechamento factual deve ser registrado no corpo do PR depois dos resultados reais, sem criar commit autorreferente apenas para metadados.
