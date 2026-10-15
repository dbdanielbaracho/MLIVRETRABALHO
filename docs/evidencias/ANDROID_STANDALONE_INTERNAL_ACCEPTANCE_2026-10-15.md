# Aceite interno técnico — Android standalone em emulador


## Aceite técnico interno — área10 Android standalone — 2026-10-15 UTC

**Base verificada:** `f0767618020c1efe20b8ce5d24ab10cb296c1f59`, árvore `a2775bbaa0794048364477a3ca5c39a8f4fcfb64`. Escopo exclusivo MLIVRETRABALHO. Este apêndice supersede somente o estado de aceite interno técnico da linha10 da matriz; todos os textos e snapshots anteriores permanecem históricos.

**Resultado da área10:** CONCLUÍDO INTERNO no escopo técnico já definido pela matriz: insumos native/build revalidados, APK release standalone e smoke no SHA aplicável. A linha10 exclui explicitamente Android físico, SecureStore nativo e piloto (#220). Jornadas completas de telas/estados continuam na área1 e nos fluxos3–9; não foram aceitas pelo simples lançamento do APK.

| Critério técnico | Prova observada |
|---|---|
| Build canônico release | `scripts/build-android-pilot.sh`: prebuild limpo, NODE_ENV production, assembleRelease, bundle embarcado obrigatório; steps reais SUCCESS nos próprios e pós-APKs538/539 |
| Proveniência própria | HEAD538 `b2b25a5e21dae06cf322ec726bc0fe444e625100` e HEAD539 `f8626256750129a557ef5c5bcf60eff1f311cde4`; checkouts sintéticos3f21a160.../06f8e34... têm pais/árvores equivalentes às candidatas; BUILD_INFO não foi apresentado como HEAD literal |
| Pós-merge real | #538 `e756d5ecf5af4c804e02b31ca8158fb49510a7d4` e #539 `f0767618020c1efe20b8ce5d24ab10cb296c1f59`; BUILD_INFO dos ZIPs baixados contém os SHAs reais respectivos |
| Emulador | Android35/x86_64/pixel6, KVM, instalação Success, PID/atividade presentes e ausência dos padrões fatais do gate; DEVICE_SMOKE_OK metro_required=false nos logs primários de ambos pós-merges |
| Artefato final539 | ZIP11945526772,28.911.942bytes, digestSHA256422c1a965e94fec5b5fb4d960e3ee9a303be25856e0374cfb56bfca977c76d49, não expirado (2026-10-29T03:10:50Z) |
| Integridade individual | APK66.161.516bytes, SHA25663eaf7f141b62226fc839dbd6322344c0974f3ffc0641b315b6e0cda7c72cc84 confereSHA256SUMS; CRC ZIP/APK válidos; assets/index.android.bundle presente |
| CI e gates pós539 | CI38673970850/job116223244281 SUCCESS127Web/750mobile/392API/3CLI/11monitor,0falhas,todossteps; APK38673970923/job116223244739 SUCCESS; ActivityWatch38673970938/job116223245485 SUCCESS |

**Correções funcionais aceitas pelos gates:** #538 rejeita calendário impossível em leituras de agenda/ganhos/notificações e ACKs de presença/avaliação/leitura; RED45PASS/11FAIL→GREEN56/56 focal,747mobile completos. #539 garante fallback textual para status futuro que coincide com propriedade herdada; RED5PASS/3FAIL→GREEN8/8 ganhos,750mobile completos.15 regressões novas totais; testes antigos preservados. As áreas3/4/6/9 receberam essas correções, mas não são declaradas integralmente aceitas.

**Situação das13 áreas:** área10 com aceite interno técnico acima;1/2/3/4/5/6/7/8/9/11/12/13 continuam sem aceite integral. Área1: checagem estática de27 rotas e41 referências literais sem destinos inexistentes, incluindo8 destinos das barras canônicas; isso não prova taps/render/teclado/estados. Prosseguir confrontando requisitos, código e provas de cada área. Preferências/ajuda sem vínculo/previsão/integrações sem contrato/dados não autorizam política inventada.

**Recibos finais:** evidência `docs/evidencias/ANDROID_STANDALONE_INTERNAL_ACCEPTANCE_2026-10-15.md` e corposPR538/539 registram HEADs/pais/tree/runs/jobs/instalação/smoke e digests separados. O snapshot candidato "PENDENTE" preservado nos documentos não é estado final. React19.1.4/RN0.81.6/frozenlock/tenantRLS/Postgres/desenho preservados; sem produção, novos serviços, custos, dinheiro real ou PSP. Gates externos215/219/220/224/228 continuam OPEN; não há conclusão integral do projeto.

## Recibos completos finais das correções funcionais

### PR538
```json
{
  "head": "b2b25a5e21dae06cf322ec726bc0fe444e625100",
  "merge": "e756d5ecf5af4c804e02b31ca8158fb49510a7d4",
  "parents": [
    "884f207f722145fd1e909f73fca96d6d16870859",
    "b2b25a5e21dae06cf322ec726bc0fe444e625100"
  ],
  "tree": "811bef5c3e81355db096365670f426bbd9cce611",
  "ownCI": {
    "run": 38672540085,
    "job": 116218751512,
    "success": true,
    "counts": [
      127,
      747,
      392,
      3,
      11
    ]
  },
  "ownAPK": {
    "run": 38672540050,
    "job": 116218751476,
    "success": true,
    "install": "2026-10-15T02:54:07.0852431Z",
    "smoke": "2026-10-15T02:54:19.5008138Z",
    "metro": false,
    "artifacts": [
      {
        "id": 11945102073,
        "size": 28911931,
        "digest": "sha256:72743e532f786c50a7c4606f4490abf8e55897e40c0aac749a406839c2cb85e9",
        "expires": "2026-10-29T02:54:20Z",
        "expired": false
      }
    ]
  },
  "ownArtifactVerification": {
    "zip_sha256": "72743e532f786c50a7c4606f4490abf8e55897e40c0aac749a406839c2cb85e9",
    "zip_bytes": 28911931,
    "apk_bytes": 66161488,
    "apk_sha256": "ccee941a5a1c7b4255bdc6a66e59c1df337869f2d5d30cdb50074b42a27e3097",
    "zip_crc_valid": true,
    "apk_crc_valid": true,
    "bundles": [
      "assets/index.android.bundle"
    ],
    "build_info": "product=MLivreTrabalho Pilot\nversion=0.1.0\nandroid_package=com.predibeacon.mlivretrabalho.pilot\ncommit_sha=3f21a160168ce72dc4f9fed4194e01a57f8e445f\nbuild_time_utc=2026-10-15T02:52:38Z\nbuild_variant=release\nmetro_required=false\nsigning=android_release_internal_pilot_only\n",
    "sums_match": true
  },
  "checkout": {
    "sha": "3f21a160168ce72dc4f9fed4194e01a57f8e445f",
    "parents": [
      "884f207f722145fd1e909f73fca96d6d16870859",
      "b2b25a5e21dae06cf322ec726bc0fe444e625100"
    ],
    "tree": "811bef5c3e81355db096365670f426bbd9cce611",
    "synthetic": true
  },
  "post": {
    "ci": {
      "run": 38673569609,
      "job": 116221968812,
      "success": true,
      "sha": "e756d5ecf5af4c804e02b31ca8158fb49510a7d4",
      "counts": [
        127,
        747,
        392,
        3,
        11
      ]
    },
    "apk": {
      "run": 38673569589,
      "job": 116221968875,
      "sha": "e756d5ecf5af4c804e02b31ca8158fb49510a7d4",
      "success": true,
      "install": "2026-10-15T03:07:55.9648553Z",
      "smoke": "2026-10-15T03:08:08.3378492Z",
      "metro": false,
      "artifact": {
        "id": 11945581422,
        "size": 28911946,
        "digest": "sha256:a72d9b81345860498a5658ecd54d10b35d0039a934ee6c93ab81cf0462e1f4db",
        "expires": "2026-10-29T03:08:10Z",
        "expired": false
      },
      "verification": {
        "zip_sha256": "a72d9b81345860498a5658ecd54d10b35d0039a934ee6c93ab81cf0462e1f4db",
        "zip_bytes": 28911946,
        "apk_sha256": "772003ddfbb14f86e5e4c0f6d0e0684b8ede2a4652d2132179a88b2da8faa68a",
        "apk_bytes": 66161488,
        "zip_crc_valid": true,
        "apk_crc_valid": true,
        "sums_match": true,
        "bundles": [
          "assets/index.android.bundle"
        ],
        "build_info": {
          "product": "MLivreTrabalho Pilot",
          "version": "0.1.0",
          "android_package": "com.predibeacon.mlivretrabalho.pilot",
          "commit_sha": "e756d5ecf5af4c804e02b31ca8158fb49510a7d4",
          "build_time_utc": "2026-10-15T03:06:39Z",
          "build_variant": "release",
          "metro_required": "false",
          "signing": "android_release_internal_pilot_only"
        }
      }
    },
    "watch": {
      "run": 38673569643,
      "job": 116221968985,
      "success": true
    }
  }
}
```

### PR539
```json
{
  "head": "f8626256750129a557ef5c5bcf60eff1f311cde4",
  "merge": "f0767618020c1efe20b8ce5d24ab10cb296c1f59",
  "parents": [
    "e756d5ecf5af4c804e02b31ca8158fb49510a7d4",
    "f8626256750129a557ef5c5bcf60eff1f311cde4"
  ],
  "tree": "a2775bbaa0794048364477a3ca5c39a8f4fcfb64",
  "ownCI": {
    "run": 38672870429,
    "job": 116219791014,
    "success": true,
    "counts": [
      127,
      750,
      392,
      3,
      11
    ]
  },
  "ownAPK": {
    "run": 38672870436,
    "job": 116219791241,
    "success": true,
    "install": "2026-10-15T02:59:15.7704026Z",
    "smoke": "2026-10-15T02:59:28.1990703Z",
    "metro": false,
    "artifacts": [
      {
        "id": 11944714839,
        "size": 28911947,
        "digest": "sha256:8e9ce6eb0b57e0a81e1a65efdddafa91be6648caeea0d8d3802de78e1dc25fdb",
        "expires": "2026-10-29T02:59:29Z",
        "expired": false
      }
    ]
  },
  "ownArtifactVerification": {
    "zip_sha256": "8e9ce6eb0b57e0a81e1a65efdddafa91be6648caeea0d8d3802de78e1dc25fdb",
    "zip_bytes": 28911947,
    "apk_sha256": "730110fd71468b750a61ddc4ab513d3670012215384a4eb6c6753ea38c6ac558",
    "apk_bytes": 66161516,
    "zip_crc_valid": true,
    "apk_crc_valid": true,
    "sums_match": true,
    "bundles": [
      "assets/index.android.bundle"
    ],
    "build_info": {
      "product": "MLivreTrabalho Pilot",
      "version": "0.1.0",
      "android_package": "com.predibeacon.mlivretrabalho.pilot",
      "commit_sha": "06f8e34ad05318b4ea4fcba8e564cb60c3030320",
      "build_time_utc": "2026-10-15T02:57:51Z",
      "build_variant": "release",
      "metro_required": "false",
      "signing": "android_release_internal_pilot_only"
    }
  },
  "checkout": {
    "sha": "06f8e34ad05318b4ea4fcba8e564cb60c3030320",
    "parents": [
      "b2b25a5e21dae06cf322ec726bc0fe444e625100",
      "f8626256750129a557ef5c5bcf60eff1f311cde4"
    ],
    "tree": "a2775bbaa0794048364477a3ca5c39a8f4fcfb64",
    "synthetic": true,
    "actualBaseEquivalentTree": true
  },
  "post": {
    "ci": {
      "run": 38673970850,
      "job": 116223244281,
      "sha": "f0767618020c1efe20b8ce5d24ab10cb296c1f59",
      "success": true,
      "counts": [
        127,
        750,
        392,
        3,
        11
      ]
    },
    "apk": {
      "run": 38673970923,
      "job": 116223244739,
      "sha": "f0767618020c1efe20b8ce5d24ab10cb296c1f59",
      "success": true,
      "install": "2026-10-15T03:10:36.4479766Z",
      "smoke": "2026-10-15T03:10:48.9809506Z",
      "metro": false,
      "artifact": {
        "id": 11945526772,
        "size": 28911942,
        "digest": "sha256:422c1a965e94fec5b5fb4d960e3ee9a303be25856e0374cfb56bfca977c76d49",
        "expires": "2026-10-29T03:10:50Z",
        "expired": false
      },
      "verification": {
        "zip_sha256": "422c1a965e94fec5b5fb4d960e3ee9a303be25856e0374cfb56bfca977c76d49",
        "zip_bytes": 28911942,
        "apk_sha256": "63eaf7f141b62226fc839dbd6322344c0974f3ffc0641b315b6e0cda7c72cc84",
        "apk_bytes": 66161516,
        "zip_crc_valid": true,
        "apk_crc_valid": true,
        "sums_match": true,
        "bundles": [
          "assets/index.android.bundle"
        ],
        "build_info": {
          "product": "MLivreTrabalho Pilot",
          "version": "0.1.0",
          "android_package": "com.predibeacon.mlivretrabalho.pilot",
          "commit_sha": "f0767618020c1efe20b8ce5d24ab10cb296c1f59",
          "build_time_utc": "2026-10-15T03:09:06Z",
          "build_variant": "release",
          "metro_required": "false",
          "signing": "android_release_internal_pilot_only"
        }
      }
    },
    "watch": {
      "run": 38673970938,
      "job": 116223245485,
      "success": true
    }
  }
}
```

## Fontes de critério

Matriz das13áreas, linha10; scripts/build-android-pilot.sh; scripts/android-standalone-smoke.sh; .github/workflows/standalone-pilot-apk.yml; referência visual original docs/referencias/BASELINE_MOBILE_ORIGINAL.md. Os8 testes de diagnóstico do smoke também passaram nos jobs APK, mas são fixtures de comandos, não substitutos do emulador real acima. O escopo técnico não inclui publicação em loja ou assinatura de distribuição pública.
