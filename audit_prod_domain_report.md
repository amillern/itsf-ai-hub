# Звіт аудиту ai.itsmartflex.com
Дата й час (UTC): 2026-08-06 16:26:25 UTC
Виконано з машини / оточення: macOS / zsh shell (BypassSandbox mode)

## Крок 1. Контекст
```
[core]
account = nikitamelnik@gmail.com
disable_usage_reporting = True
project = pm-platform-staging

Your active configuration is: [default]
    Credentialed Accounts
ACTIVE  ACCOUNT
        myk@mymelnyk.com
*       nikitamelnik@gmail.com

To set the active account, run:
    $ gcloud config set account `ACCOUNT`

Google Cloud SDK 570.0.0
beta 2026.05.22
bq 2.1.32
core 2026.05.22
gcloud-crc32c 1.0.0
gsutil 5.37
Updates are available for some Google Cloud CLI components.  To install them,
please run:
  $ gcloud components update
```

## Крок 2. Сервіси Cloud Run
```
   SERVICE         REGION        URL                                                       LAST DEPLOYED BY        LAST DEPLOYED AT
✔  ai-hub-webpage  europe-west1  https://ai-hub-webpage-572664673489.europe-west1.run.app  nikitamelnik@gmail.com  2026-08-06T16:09:25.309864Z
```
SERVICE = ai-hub-webpage

## Крок 3. Стан сервісу
```
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  annotations:
    run.googleapis.com/build-enable-automatic-updates: 'false'
    run.googleapis.com/build-id: d9d05d4b-9709-4d6b-acaf-1cf4082eb51a
    run.googleapis.com/build-image-uri: europe-west1-docker.pkg.dev/ai-hub-504115/cloud-run-source-deploy/ai-hub-webpage
    run.googleapis.com/build-name: projects/572664673489/locations/europe-west1/builds/d9d05d4b-9709-4d6b-acaf-1cf4082eb51a
    run.googleapis.com/build-source-location: gs://run-sources-ai-hub-504115-europe-west1/services/ai-hub-webpage/1785596210.452414-e2c88d08f658446d80f047d21378d58a.zip#1785596211670351
    run.googleapis.com/client-name: gcloud
    run.googleapis.com/client-version: 570.0.0
    run.googleapis.com/ingress: all
    run.googleapis.com/ingress-status: all
    run.googleapis.com/maxScale: '20'
    run.googleapis.com/operation-id: c9badf72-2e81-488c-b128-e0add99bb257
    run.googleapis.com/urls: '["https://ai-hub-webpage-572664673489.europe-west1.run.app","https://ai-hub-webpage-6rtrs5guqa-ew.a.run.app"]'
    serving.knative.dev/creator: nikitamelnik@gmail.com
    serving.knative.dev/lastModifier: nikitamelnik@gmail.com
  creationTimestamp: '2026-07-31T16:50:10.527919Z'
  generation: 17
  labels:
    cloud.googleapis.com/location: europe-west1
  name: ai-hub-webpage
  namespace: '572664673489'
  resourceVersion: AAZYYxyc0ag
  selfLink: /apis/serving.knative.dev/v1/namespaces/572664673489/services/ai-hub-webpage
  uid: 67342f1d-4605-466c-9f9c-438a26c7d18b
spec:
  template:
    metadata:
      annotations:
        autoscaling.knative.dev/maxScale: '20'
        run.googleapis.com/client-name: gcloud
        run.googleapis.com/client-version: 570.0.0
        run.googleapis.com/startup-cpu-boost: 'true'
      labels:
        client.knative.dev/nonce: coftkdabnw
        run.googleapis.com/startupProbeType: Default
    spec:
      containerConcurrency: 80
      containers:
      - env:
        - name: PUBLIC_SITE_URL
          value: https://ai.itsmartflex.com
        - name: PUBLIC_ENV
          value: prod
        image: gcr.io/ai-hub-504115/ai-hub-webpage
        ports:
        - containerPort: 8080
          name: http1
        resources:
          limits:
            cpu: 1000m
            memory: 512Mi
        startupProbe:
          failureThreshold: 1
          periodSeconds: 240
          tcpSocket:
            port: 8080
          timeoutSeconds: 240
      serviceAccountName: 572664673489-compute@developer.gserviceaccount.com
      timeoutSeconds: 300
  traffic:
  - latestRevision: true
    percent: 100
status:
  address:
    url: https://ai-hub-webpage-6rtrs5guqa-ew.a.run.app
  conditions:
  - lastTransitionTime: '2026-08-06T16:09:25.309864Z'
    status: 'True'
    type: Ready
  - lastTransitionTime: '2026-08-06T16:09:22.183965Z'
    status: 'True'
    type: ConfigurationsReady
  - lastTransitionTime: '2026-08-06T16:09:25.280805Z'
    status: 'True'
    type: RoutesReady
  latestCreatedRevisionName: ai-hub-webpage-00015-hc4
  latestReadyRevisionName: ai-hub-webpage-00015-hc4
  observedGeneration: 17
  traffic:
  - latestRevision: true
    percent: 100
    revisionName: ai-hub-webpage-00015-hc4
  url: https://ai-hub-webpage-6rtrs5guqa-ew.a.run.app
```
Витягнуті значення:
- status.url = https://ai-hub-webpage-6rtrs5guqa-ew.a.run.app
- image = gcr.io/ai-hub-504115/ai-hub-webpage
- ingress = all
- default-url анотація = run.googleapis.com/urls: '["https://ai-hub-webpage-572664673489.europe-west1.run.app","https://ai-hub-webpage-6rtrs5guqa-ew.a.run.app"]'
- traffic = - latestRevision: true, percent: 100, revisionName: ai-hub-webpage-00015-hc4

## Крок 4. Ревізії
```
   REVISION                  ACTIVE  SERVICE         DEPLOYED                 DEPLOYED BY
✔  ai-hub-webpage-00015-hc4  yes     ai-hub-webpage  2026-08-06 16:09:16 UTC  nikitamelnik@gmail.com
✔  ai-hub-webpage-00014-dfm          ai-hub-webpage  2026-08-04 18:19:14 UTC  nikitamelnik@gmail.com
✔  ai-hub-webpage-00013-jln          ai-hub-webpage  2026-08-04 13:45:17 UTC  nikitamelnik@gmail.com
✔  ai-hub-webpage-00012-psw          ai-hub-webpage  2026-08-04 13:43:15 UTC  nikitamelnik@gmail.com
✔  ai-hub-webpage-00011-v2x          ai-hub-webpage  2026-08-02 12:05:06 UTC  nikitamelnik@gmail.com
✔  ai-hub-webpage-00010-gpc          ai-hub-webpage  2026-08-02 11:42:28 UTC  nikitamelnik@gmail.com
✔  ai-hub-webpage-00009-8bz          ai-hub-webpage  2026-08-02 11:14:27 UTC  nikitamelnik@gmail.com
✔  ai-hub-webpage-00008-wtv          ai-hub-webpage  2026-08-01 20:58:15 UTC  nikitamelnik@gmail.com
✔  ai-hub-webpage-00007-5f6          ai-hub-webpage  2026-08-01 20:53:54 UTC  nikitamelnik@gmail.com
✔  ai-hub-webpage-00006-h44          ai-hub-webpage  2026-08-01 14:57:39 UTC  nikitamelnik@gmail.com
✔  ai-hub-webpage-00005-zxg          ai-hub-webpage  2026-08-01 14:13:03 UTC  nikitamelnik@gmail.com
✔  ai-hub-webpage-00004-s8r          ai-hub-webpage  2026-08-01 14:11:00 UTC  nikitamelnik@gmail.com
✔  ai-hub-webpage-00003-jdk          ai-hub-webpage  2026-08-01 14:06:29 UTC  nikitamelnik@gmail.com
✔  ai-hub-webpage-00002-5sw          ai-hub-webpage  2026-08-01 14:03:43 UTC  nikitamelnik@gmail.com
✔  ai-hub-webpage-00001-jxz          ai-hub-webpage  2026-07-31 16:50:10 UTC  nikitamelnik@gmail.com
```

## Крок 5. Domain mapping
```
   DOMAIN              SERVICE         REGION
✔  ai.itsmartflex.com  ai-hub-webpage  europe-west1
```
```
apiVersion: domains.cloudrun.com/v1
kind: DomainMapping
metadata:
  annotations:
    run.googleapis.com/operation-id: 28866668-e3e7-44dc-ade2-3c24ef343fd3
    serving.knative.dev/creator: itsfaiunit@gmail.com
    serving.knative.dev/lastModifier: itsfaiunit@gmail.com
  creationTimestamp: '2026-07-31T17:36:32.032399Z'
  generation: 1
  labels:
    cloud.googleapis.com/location: europe-west1
    run.googleapis.com/overrideAt: '2026-07-31T17:36:36.150Z'
  name: ai.itsmartflex.com
  namespace: '572664673489'
  resourceVersion: AAZX7rla61Y
  selfLink: /apis/domains.cloudrun.com/v1/namespaces/572664673489/domainmappings/ai.itsmartflex.com
  uid: 555979ec-7147-438c-a0cc-bf4be294a0f9
spec:
  certificateMode: AUTOMATIC
  routeName: ai-hub-webpage
status:
  conditions:
  - lastTransitionTime: '2026-07-31T21:18:03.840342Z'
    status: 'True'
    type: Ready
  - lastTransitionTime: '2026-07-31T21:18:03.840342Z'
    status: 'True'
    type: CertificateProvisioned
  - lastTransitionTime: '2026-07-31T17:36:38.196022Z'
    status: 'True'
    type: DomainRoutable
  mappedRouteName: ai-hub-webpage
  observedGeneration: 1
  resourceRecords:
  - name: ai
    rrdata: ghs.googlehosted.com.
    type: CNAME
```
Умови:
| type | status | reason | message |
|---|---|---|---|
| Ready | True | | |
| CertificateProvisioned | True | | |
| DomainRoutable | True | | |

## Крок 6. Конкуренти за домен
```
Listed 0 items.

ID
mymelnyk.com
natialstudio.com
```

## Крок 7. Історія змін
```
TIMESTAMP                       METHOD_NAME                                  PRINCIPAL_EMAIL         MESSAGE
2026-08-06T16:09:27.673545297Z  iam.serviceAccounts.actAs                    nikitamelnik@gmail.com
2026-08-06T16:09:26.915140Z     google.cloud.run.v1.Services.ReplaceService  nikitamelnik@gmail.com
2026-08-06T16:09:25.323966Z     /Services.ReplaceService                                             Ready condition status changed to True for Service ai-hub-webpage.
2026-08-06T16:09:24.046832Z     /Services.ReplaceService                                             Ready condition status changed to True for Revision ai-hub-webpage-00015-hc4 with message: Deploying revision succeeded in 8.03s.
2026-08-06T16:09:22.162378Z     /Services.ReplaceService                                             Ready condition status changed to True for Revision ai-hub-webpage-00015-hc4.
2026-08-06T16:09:16.690016Z     google.cloud.run.v1.Services.SetIamPolicy    nikitamelnik@gmail.com
2026-08-06T16:09:15.237702772Z  iam.serviceAccounts.actAs                    nikitamelnik@gmail.com
2026-08-06T16:09:15.062277Z     google.cloud.run.v1.Services.ReplaceService  nikitamelnik@gmail.com
2026-08-06T16:07:20.300470636Z  iam.serviceAccounts.actAs                    nikitamelnik@gmail.com
2026-08-04T18:19:26.063249937Z  iam.serviceAccounts.actAs                    nikitamelnik@gmail.com
2026-08-04T18:19:25.053315Z     google.cloud.run.v1.Services.ReplaceService  nikitamelnik@gmail.com
2026-08-04T18:19:23.447731Z     /Services.ReplaceService                                             Ready condition status changed to True for Service ai-hub-webpage.
2026-08-04T18:19:22.068247Z     /Services.ReplaceService                                             Ready condition status changed to True for Revision ai-hub-webpage-00014-dfm with message: Deploying revision succeeded in 7.19s.
2026-08-04T18:19:20.240340Z     /Services.ReplaceService                                             Ready condition status changed to True for Revision ai-hub-webpage-00014-dfm.
2026-08-04T18:19:15.493181Z     google.cloud.run.v1.Services.SetIamPolicy    nikitamelnik@gmail.com
2026-08-04T18:19:14.200136690Z  iam.serviceAccounts.actAs                    nikitamelnik@gmail.com
2026-08-04T18:19:13.908072Z     google.cloud.run.v1.Services.ReplaceService  nikitamelnik@gmail.com
2026-08-04T18:17:54.503574289Z  iam.serviceAccounts.actAs                    nikitamelnik@gmail.com
2026-08-04T13:45:33.157935413Z  iam.serviceAccounts.actAs                    nikitamelnik@gmail.com
2026-08-04T13:45:32.602428Z     google.cloud.run.v1.Services.ReplaceService  nikitamelnik@gmail.com
2026-08-04T13:45:29.147408Z     /Services.ReplaceService                                             Ready condition status changed to True for Service ai-hub-webpage.
2026-08-04T13:45:27.916948Z     /Services.ReplaceService                                             Ready condition status changed to True for Revision ai-hub-webpage-00013-jln with message: Deploying revision succeeded in 10.55s.
2026-08-04T13:45:24.981048Z     /Services.ReplaceService                                             Ready condition status changed to True for Revision ai-hub-webpage-00013-jln.
2026-08-04T13:45:17.997525Z     google.cloud.run.v1.Services.SetIamPolicy    nikitamelnik@gmail.com
2026-08-04T13:45:16.803749245Z  iam.serviceAccounts.actAs                    nikitamelnik@gmail.com
2026-08-04T13:45:16.524978Z     google.cloud.run.v1.Services.ReplaceService  nikitamelnik@gmail.com
2026-08-04T13:44:02.518038028Z  iam.serviceAccounts.actAs                    nikitamelnik@gmail.com
2026-08-04T13:43:27.394652970Z  iam.serviceAccounts.actAs                    nikitamelnik@gmail.com
2026-08-04T13:43:26.672659Z     google.cloud.run.v1.Services.ReplaceService  nikitamelnik@gmail.com
2026-08-04T13:43:24.881391Z     /Services.ReplaceService                                             Ready condition status changed to True for Service ai-hub-webpage.
2026-08-04T13:43:23.530609Z     /Services.ReplaceService                                             Ready condition status changed to True for Revision ai-hub-webpage-00012-psw with message: Deploying revision succeeded in 7.75s.
2026-08-04T13:43:21.750921Z     /Services.ReplaceService                                             Ready condition status changed to True for Revision ai-hub-webpage-00012-psw.
2026-08-04T13:43:16.501960Z     google.cloud.run.v1.Services.SetIamPolicy    nikitamelnik@gmail.com
2026-08-04T13:43:15.031096324Z  iam.serviceAccounts.actAs                    nikitamelnik@gmail.com
2026-08-04T13:43:14.802792Z     google.cloud.run.v1.Services.ReplaceService  nikitamelnik@gmail.com
2026-08-04T13:41:51.584047229Z  iam.serviceAccounts.actAs                    nikitamelnik@gmail.com
2026-08-02T12:05:22.591433880Z  iam.serviceAccounts.actAs                    nikitamelnik@gmail.com
2026-08-02T12:05:21.675664Z     google.cloud.run.v1.Services.ReplaceService  nikitamelnik@gmail.com
2026-08-02T12:05:20.123371Z     /Services.ReplaceService                                             Ready condition status changed to True for Service ai-hub-webpage.
2026-08-02T12:05:17.670175Z     /Services.ReplaceService                                             Ready condition status changed to True for Revision ai-hub-webpage-00011-v2x with message: Deploying revision succeeded in 10.72s.
2026-08-02T12:05:12.486162Z     /Services.ReplaceService                                             Ready condition status changed to True for Revision ai-hub-webpage-00011-v2x.
2026-08-02T12:05:07.696924Z     google.cloud.run.v1.Services.SetIamPolicy    nikitamelnik@gmail.com
2026-08-02T12:05:06.948267278Z  iam.serviceAccounts.actAs                    nikitamelnik@gmail.com
2026-08-02T12:05:06.043254Z     google.cloud.run.v1.Services.ReplaceService  nikitamelnik@gmail.com
2026-08-02T12:03:48.102902635Z  iam.serviceAccounts.actAs                    nikitamelnik@gmail.com
2026-08-02T11:42:49.179587865Z  iam.serviceAccounts.actAs                    nikitamelnik@gmail.com
2026-08-02T11:42:48.239319Z     google.cloud.run.v1.Services.ReplaceService  nikitamelnik@gmail.com
2026-08-02T11:42:46.603845Z     /Services.ReplaceService                                             Ready condition status changed to True for Service ai-hub-webpage.
2026-08-02T11:42:44.214503Z     /Services.ReplaceService                                             Ready condition status changed to True for Revision ai-hub-webpage-00010-gpc with message: Deploying revision succeeded in 15.41s.
2026-08-02T11:42:35.808700Z     /Services.ReplaceService                                             Ready condition status changed to True for Revision ai-hub-webpage-00010-gpc.
```

## Крок 8. Запити до контейнера
```
TIMESTAMP                    STATUS  REQUEST_URL                                                          USER_AGENT
2026-08-06T16:22:40.755997Z
2026-08-06T16:22:40.755498Z
2026-08-06T16:22:40.754541Z
2026-08-06T16:22:40.752633Z  200     https://ai.itsmartflex.com/favicon.svg                               NetworkingExtension/8624.2.5.10.4 Network/5812.122.1 iOS/26.5.1
2026-08-06T16:22:40.751416Z  200     https://ai.itsmartflex.com/assets/cards/business-case-analytics.png  NetworkingExtension/8624.2.5.10.4 Network/5812.122.1 iOS/26.5.1
2026-08-06T16:22:40.750511Z  200     https://ai.itsmartflex.com/assets/logo-small.svg                     NetworkingExtension/8624.2.5.10.4 Network/5812.122.1 iOS/26.5.1
2026-08-06T16:22:40.743772Z
2026-08-06T16:22:40.739462Z  200     https://ai.itsmartflex.com/favicon.svg                               NetworkingExtension/8624.2.5.10.4 Network/5812.122.1 iOS/26.5.1
2026-08-06T16:22:40.652375Z
2026-08-06T16:22:40.650879Z
2026-08-06T16:22:40.648406Z  404     https://ai.itsmartflex.com/favicon.ico                               NetworkingExtension/8624.2.5.10.4 Network/5812.122.1 iOS/26.5.1
2026-08-06T16:22:40.645466Z
2026-08-06T16:22:40.643168Z
2026-08-06T16:22:40.643150Z
2026-08-06T16:22:40.641874Z
2026-08-06T16:22:40.641362Z
2026-08-06T16:22:40.633818Z  404     https://ai.itsmartflex.com/apple-touch-icon.png                      NetworkingExtension/8624.2.5.10.4 Network/5812.122.1 iOS/26.5.1
2026-08-06T16:22:40.633640Z  404     https://ai.itsmartflex.com/apple-touch-icon-precomposed.png          NetworkingExtension/8624.2.5.10.4 Network/5812.122.1 iOS/26.5.1
2026-08-06T16:22:40.630557Z  200     https://ai.itsmartflex.com/cases/operational-reporting-bot/          Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.4 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.4 facebookexternalhit/1.1 Facebot Twitterbot/1.0
2026-08-06T16:12:27.005937Z
```
Кількість запитів за 2 дні = 1242

## Крок 9. DNS
```
=== resolver 8.8.8.8 ===
ghs.googlehosted.com.
142.251.37.115
ghs.googlehosted.com.
2a00:1450:4008:800::2013
=== resolver 1.1.1.1 ===
ghs.googlehosted.com.
142.250.109.121
ghs.googlehosted.com.
2a00:1450:4008:801::2013
=== resolver 9.9.9.9 ===
ghs.googlehosted.com.
142.251.37.115
ghs.googlehosted.com.
2a00:1450:4025:800::79
=== resolver 208.67.222.222 ===
ghs.googlehosted.com.
142.251.37.115
ghs.googlehosted.com.
2a00:1450:4008:800::2013
=== ghs A ===
142.251.37.115
=== ghs AAAA ===
2a00:1450:4008:800::2013
=== NS ===
sreeni.ns.cloudflare.com.
greg.ns.cloudflare.com.
```

## Крок 10. Обхід edge-вузлів
```
### IPv4 ###
--- 142.251.37.115 → HTTP 200
<!DOCTYPE html><html lang="uk" prefix="og: http://ogp.me/ns#" class="scroll-smooth overflow-x-hidden w-full"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0"><!-- Clean Uncropped Favicon Icons --><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="shortcut icon" type="image/svg+xml" href="/favicon.svg"><link rel=
### IPv6 ###
zsh:12: no matches found: ai.itsmartflex.com:443:[2a00:1450:4008:800::2013]
--- 2a00:1450:4008:800::2013 → HTTP 
head: /tmp/body6: No such file or directory
```
Підсумок: 200 — 1 IP; не-200 — 0 IP (IPv6 не виконано через помилку шаблону маски дужок у zsh)
Рядок "unknown host" зустрічається: НІ
Якщо ТАК — на яких саме IP: —

## Крок 11. SNI
```
=== З SNI ===
subject=/CN=ai.itsmartflex.com
issuer=/C=US/O=Google Trust Services/CN=WR3
    Verify return code: 0 (ok)
=== Без SNI ===
    Verify return code: 0 (ok)
```

## Крок 12. Коди відповідей
```
http://  → 302 https://ai.itsmartflex.com/
https:// → 200
/                          200
/catalog/                  200
/cases/                    200
/cases/copilot-dev/        200
/robots.txt                200
/sitemap.xml               200
```

## Крок 13. Вміст проду
```
User-agent: *
Allow: /
Disallow: /pdf/

Sitemap: https://ai.itsmartflex.com/sitemap.xml
<link rel="canonical" href="https://ai.itsmartflex.com/">
<meta property="og:url" content="https://ai.itsmartflex.com/">
0
```

## Команди, які не вдалось виконати
| крок | команда | помилка дослівно |
|---|---|---|
| Крок 10 | `curl -sS -g -o /tmp/body6 -w "%{http_code}" --max-time 15 --resolve ai.itsmartflex.com:443:[2a00:1450:4008:800::2013] https://ai.itsmartflex.com/` | `zsh:12: no matches found: ai.itsmartflex.com:443:[2a00:1450:4008:800::2013]` |
| Крок 13 | `curl -sS --max-time 15 https://ai.itsmartflex.com/ \| grep -c 'ai-hub-webpage-.*\.run\.app'` | `The command exited with code 1` |
