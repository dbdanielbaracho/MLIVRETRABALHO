# Execução verificada — 2026-10-10 07:13:49 UTC

Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO. Registro de fatos observados, preservando journals anteriores.

## Integrações recentes reais
#366 integrado como 4a8f652806bf995b6ef751d5ab7e20542a41545f: head 1c4b713e02d0bba8e3ef0b7d7f970f500e834391, CI38031507265/APK38031507225 success no SHA exato. Pais 1c89d39cc4b25c66104eb7ffb06cf4cae5125e0e + head; árvore b6f700d1216ea94cc8a4f4c847c722a37e237731 idêntica ao head aprovado. APK job114153234859 smoke em 2026-10-10T06:59:59.8803884Z, artefato11662662287, digest ZIP sha256:6ed722b4632c6470bd88bf3efa789e874e46f5a187d18e7d02d83c3ae6cea426.

#367 integrado como 61341937bdf54ce15d6cf211061051b1c074baed: head 93a120a78fcdbb6e7190f70d9aa94673788e56d4, CI38031708927/APK38031709034 success no SHA exato. Pais 4a8f652806bf995b6ef751d5ab7e20542a41545f + head; árvore131c98ec9c22ba3dcc21abe1c309b7affd752be2 idêntica ao head aprovado. APK job114153855686 smoke em 2026-10-10T06:58:19.7670009Z, artefato11662776833, digest ZIP sha256:450d2b1ba539967b57997944d65e698d7a625177737030ca5dafa127718803aa.

Main #367/v1.56 foi reconsultada, assim como README/verdade/memória/checkpoint. #368 retarget main confirmado; head inalterado. Nenhum merge repetido ou gates de predecessor usados como aprovação própria.

## Pós-merge por SHA exato
| PR | Merge main | CI pós-merge | APK pós-merge |
|---|---|---|---|
|356|e0d472a5b53e30633fbfa25d624643d2af274f92|38030456954 success|38030456925 success|
|357|1317f3623f74bc29457daa3b39608ef230853ba2|38030523152 success|38030523164 attempt2 success|
|358|3aafc8a8912f9807d70dba64f2e2b33751bd3974|38030527858 success|38030527903 attempt2 success|
|359|0c588982f4132ef291f6cf75b70a3c8af1c883a4|38030533668 success|38030533744 success|
|360|1369cfba1cf569e6ef810f260b257bcc557b8ff1|38030539260 success|38030539264 success|
|362|f1028c64e5d02105ba0bb24e87a533478b6b0ceb|38030545118 success|38030545125 success|
|363|177f15c92323b9bf807a6cbee1c802f5953ac907|38030550928 success|38030550899 success|
|364|8844a118caa19ea454dc713565db47827e58f853|38032152612 success|38032152603 em execução|
|365|1c89d39cc4b25c66104eb7ffb06cf4cae5125e0e|38032899056 success|38032899307 em execução|
|366|4a8f652806bf995b6ef751d5ab7e20542a41545f|38033123872 success|38033123852 em execução|
|367|61341937bdf54ce15d6cf211061051b1c074baed|38033158137 success|38033158118 em execução|

Todos os APKs success acima foram conferidos em jobs/steps, linha efetiva DEVICE_SMOKE_OK com metro_required=false e artefato do mesmo SHA. #357 attempt2 job114153840160: smoke2026-10-10T06:59:01.2826553Z, artefato11663301370, digestZIP sha256:15bb9f23c2ed38bf7efb4ce50b2a83957e60b6d6a5f3497c8462a0d522f02ef5. #358 attempt2 job114154393849: smoke2026-10-10T07:03:36.9065394Z, artefato11663311935, digestZIP sha256:f9b7e0d4ac19cfef26d5a67d2a9c9e745f8d854d0e9c6b3d737146d2c0b92443. Esses digests são dos ZIPs, não do APK individual. Provas dos outros jobs/artefatos nos journals0645/0650/0700Z e anteriores. #353/#355 retries recuperados; nenhuma falha desses casos autoriza ignorar smoke.

## #368: falha transitória diagnosticada, merge retido
CI38032107600 success. APK38032107689 attempt1 job114155030484 compilou e instalou com Success em 07:08:13.2791049Z. ANR em com.android.phone durante startup, Monkey aborted/Events injected0; pidof app vazio, sem logcat/artefato apesar da etapa upload. Não prova crash da aplicação. Retentativa única do job solicitada no MESMO head 3d98b392d39b60028025d7fe58f270447b62938c, sem código/skip/relaxar gate. Aguardar resultado e diagnosticar eventual nova falha antes de outra ação.

#369 head72f8455f4fde9a1f917f7a69bc6ad2acf4ab27a0 CI38032533108 success/APK38032533146 em execução; base368. #370 head1939f0240fdf7d79152a9a548da8523b3ef4d70a CI38033048796 success/APK38033048772 em execução; base369.

## Próxima alteração concreta
Membros vincula persistência do tenant aceito ao token+tenant de origem dentro da fila, releitura/rollback/foco; leitura/revogação conferem contexto após resposta. 6 testes novos;168/168 locais UTC/SP. Branch fix/members-verified-tenant-selection sobre370, CI/APK/PR a consultar após publicação, sem autoaprovação. Backend owner/roles/email/RLS intactos; sem convite/login real.

Pendências independentes verificadas: EmpresaInicio action só usa response.ok e signout limpa par sem comparar sessão; Agenda POST lifecycle/rating só usa response.ok e não retém sessão de origem. Ler contratos reais antes de alterar, preservar confirmação humana/localização opcional/políticas. Bootstrap sem consumidor já auditado, sem tarefa artificial. Visual Truth OPEN até cobertura física completa, #220/pentest; PSP/FIN-RISK/providers #215/#219/#228 e WEB-ARCH#224 separados. Nenhum custo/credencial/operação real acionado.
