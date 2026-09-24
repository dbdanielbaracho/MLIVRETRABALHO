# Pilot Android distribution baseline — v1.82

**Data:** 2026-09-24  
**Escopo:** piloto interno Android  
**Gate:** Issue #220 permanece OPEN

## Decisão de distribuição

Para o piloto fechado inicial, o canal definido é **APK Android instalado diretamente (sideload)**, sem depender de Play Store e sem custo recorrente obrigatório.

O build pode ser produzido por:

1. workflow manual `.github/workflows/pilot-android.yml`, quando GitHub Actions estiver alocando runner; ou
2. o mesmo script `scripts/build-android-pilot.sh` em ambiente local com Android SDK/Java disponível.

## Identidade isolada do piloto

`apps/mobile/app.json` usa:

- nome: `MLivreTrabalho Pilot`;
- Android package: `com.predibeacon.mlivretrabalho.pilot`.

A identidade é deliberadamente de **piloto**, para não congelar antecipadamente o application ID definitivo de produção/store.

## Assinatura

O baseline v1.82 gera `assembleDebug`, portanto usa assinatura Android de debug e é apropriado **somente para piloto interno fechado**.

Não constitui assinatura de produção, Play Store readiness ou gestão de keystore de produção.

Uma chave de release definitiva deve ser criada, armazenada e governada separadamente antes de distribuição pública/produção.

## Artefatos produzidos

`scripts/build-android-pilot.sh` produz:

- `artifacts/android-pilot/MLivreTrabalho-Pilot-debug.apk`;
- `artifacts/android-pilot/SHA256SUMS.txt`;
- `artifacts/android-pilot/BUILD_INFO.txt`.

`BUILD_INFO.txt` registra:

- produto;
- versão;
- Android package;
- commit SHA;
- horário UTC do build;
- modo de assinatura.

O workflow publica esses arquivos juntos como artifact `mlivretrabalho-pilot-apk`, com retenção limitada.

## Instalação no aparelho — procedimento do piloto

Quando o APK real estiver disponível:

1. conferir `BUILD_INFO.txt` e o commit SHA;
2. conferir o hash SHA-256 do APK contra `SHA256SUMS.txt`;
3. transferir o APK ao aparelho piloto por canal controlado;
4. permitir instalação de app da fonte escolhida apenas quando necessário;
5. instalar o APK;
6. registrar modelo do aparelho, versão Android, commit/build e horário;
7. executar a checklist real do Issue #220;
8. capturar screenshots/logs/evidência do resultado.

Esses passos ainda exigem **aparelho físico** e não são considerados concluídos por este documento.

## Atualização durante o piloto

Como o package do piloto é estável (`com.predibeacon.mlivretrabalho.pilot`), builds posteriores do mesmo canal podem substituir o app piloto, desde que a compatibilidade de assinatura seja preservada.

Como o baseline atual usa debug signing, a compatibilidade deve ser verificada no ambiente que efetivamente gerar os APKs. Se os APKs forem gerados por ambientes distintos com chaves debug diferentes, pode ser necessário desinstalar o build anterior antes de instalar o novo.

Por isso, **update path real permanece pendente até ser provado em aparelho físico**.

## Rollback

Para cada build instalado no piloto, registrar:

- commit SHA;
- versão;
- hash SHA-256;
- artifact correspondente;
- data de instalação;
- resultado da smoke checklist.

Se um build novo apresentar regressão:

1. interromper novas instalações;
2. identificar o último build piloto conhecido como bom;
3. usar seu APK e SHA-256 registrados;
4. se a assinatura permitir downgrade/substituição, instalar o build anterior;
5. se Android bloquear downgrade ou assinatura diferir, desinstalar o app piloto e reinstalar o APK conhecido como bom;
6. considerar que desinstalação pode remover dados/sessão locais; testar login/reentrada após rollback;
7. registrar regressão, rollback e evidência no GitHub antes de retomar distribuição.

## Suporte do piloto

Durante o piloto, todo incidente deve registrar no GitHub/evidências:

- build/commit;
- aparelho e versão Android;
- jornada afetada;
- passos para reproduzir;
- resultado esperado/observado;
- logs/screenshots quando disponíveis;
- severidade e workaround;
- commit de correção e reteste.

P0/P1 Trust/Safety seguem a política proposta em `TRUST_INCIDENT_SLA_PROPOSED_2026-09-24.md`; isso não substitui serviço de emergência.

## O que esta fatia fecha internamente

- canal de distribuição de piloto definido;
- application ID de piloto separado;
- processo reproduzível para gerar APK interno;
- artifact com hash e build identity;
- procedimento documentado de instalação, atualização, rollback e suporte.

## O que continua externo

- GitHub Actions runner realmente executar o workflow;
- APK efetivamente produzido por ambiente Android funcional;
- instalação real em aparelho físico;
- validação do update path no aparelho;
- notificações/deep links/localização em aparelho real;
- assinatura release/produção e custódia de keystore;
- pentest independente.

Nenhum desses itens externos é considerado concluído pela existência do script/workflow.
