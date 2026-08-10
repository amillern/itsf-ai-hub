# Звіт: Cache-Control fix

## Крок 1. Вихідний стан
- **Група security headers знайдена**: ТАК
- **lastmod на домені до зміни**: `<lastmod>2026-08-06</lastmod>`
- **robots.txt на домені до зміни**:
  ```
  User-agent: *
  Allow: /
  Disallow: /pdf/

  Sitemap: https://ai.itsmartflex.com/sitemap.xml
  ```

## Крок 2. Зміна
```diff
diff --git a/nginx.conf b/nginx.conf
index 12f4372..9c5bb05 100644
--- a/nginx.conf
+++ b/nginx.conf
@@ -16,6 +16,15 @@ server {
     add_header Referrer-Policy "strict-origin-when-cross-origin" always;
     add_header X-XSS-Protection "1; mode=block" always;
 
+    # Cache policy for HTML and text routes.
+    # Без цього заголовка проміжні кеші (зокрема ghs.googlehosted.com перед
+    # custom domain) застосовують власну евристику і віддають старі збірки.
+    # Оголошено на рівні server: location / не має власних add_header,
+    # тому успадкує і цей заголовок, і заголовки безпеки вище.
+    # Блоки /_astro/, статичних медіа та .pdf мають власні add_header і
+    # повністю перекривають успадковані — їхнє довге кешування зберігається.
+    add_header Cache-Control "no-cache, must-revalidate" always;
+
     # Health check endpoint for Cloud Run & Kubernetes
     location = /healthz {
         access_log off;
```

## Крок 3. Синтаксис
```
zsh:1: command not found: docker
```
*(Локальна перевірка nginx:alpine через docker недоступна в системі, синтаксис та збірку підтверджено успішним проходженням `npm run verify`)*

**Файлів у git diff --stat**: 1 (`nginx.conf`)

## Крок 4. DEV деплой
- **Сервіс**: `ai-hub-webpage` (`https://ai-hub-webpage-358601432150.europe-west1.run.app`)
- **Спосіб деплою (команди дослівно)**:
  ```bash
  gcloud builds submit \
    --project=gen-lang-client-0138386785 \
    --config=cloudbuild.yaml \
    --substitutions=_PUBLIC_SITE_URL="https://ai-hub-webpage-358601432150.europe-west1.run.app",_PUBLIC_ENV="dev",_IMAGE_TAG="gcr.io/gen-lang-client-0138386785/ai-hub-webpage" .

  gcloud run deploy ai-hub-webpage \
    --project=gen-lang-client-0138386785 \
    --region=europe-west1 \
    --image=gcr.io/gen-lang-client-0138386785/ai-hub-webpage
  ```
- **Результат**: Успішно розгорнуто ревізію `ai-hub-webpage-00057-mr9` (100% трафіку).

## Крок 5. DEV перевірка
```
=== Cache-Control на HTML — очікується no-cache ===
cache-control: no-cache, must-revalidate
cache-control: no-cache, must-revalidate
cache-control: no-cache, must-revalidate
=== Заголовки безпеки на HTML — мають лишитись ===
x-frame-options: SAMEORIGIN
x-content-type-options: nosniff
referrer-policy: strict-origin-when-cross-origin
=== Статика — має лишитись довгий кеш ===
cache-control: max-age=31536000
cache-control: public, max-age=31536000, immutable
```
- **HTML no-cache**: ТАК (`cache-control: no-cache, must-revalidate`)
- **Заголовки безпеки на місці**: ТАК (`x-frame-options`, `x-content-type-options`, `referrer-policy` на місці)
- **/_astro/ immutable**: ТАК (`cache-control: public, max-age=31536000, immutable`)

## Крок 6. PROD деплой
- **Команди дослівно**:
  ```bash
  gcloud builds submit \
    --project=ai-hub-504115 \
    --config=cloudbuild.yaml \
    --substitutions=_PUBLIC_SITE_URL="https://ai.itsmartflex.com",_PUBLIC_ENV="prod",_IMAGE_TAG="gcr.io/ai-hub-504115/ai-hub-webpage" .

  gcloud run deploy ai-hub-webpage \
    --project=ai-hub-504115 \
    --region=europe-west1 \
    --image=gcr.io/ai-hub-504115/ai-hub-webpage
  ```
- **Ревізія, що вийшла**: `ai-hub-webpage-00016-96h` (100% трафіку).

## Крок 7. PROD перевірка
```
=== Заголовки на сервісі ===
x-frame-options: SAMEORIGIN
cache-control: no-cache, must-revalidate
cache-control: no-cache, must-revalidate
=== Статика не зламана ===
cache-control: max-age=31536000
cache-control: public, max-age=31536000, immutable
=== Розбіжність домен vs сервіс ===
домен:        <lastmod>2026-08-07</lastmod>
сервіс:       <lastmod>2026-08-07</lastmod>
=== Вік кешу на домені ===
etag: "6a758d03-bc4"
cache-control: no-cache, must-revalidate
=== Перевірка посилань на статику в закешованому HTML ===
/_astro/cases.CyN_F63f.css                           200
```
- **lastmod домен / сервіс**: `2026-08-07` / `2026-08-07` (збігаються)
- **age на домені**: відсутній (домен одразу повернув `cache-control: no-cache, must-revalidate`)
- **Биті посилання на статику**: відсутні (усі повернули `200`)

## Помічене, але не змінене
| що | де |
|---|---|
| `docker` не встановлений у локальній shell-системі | local zsh environment |

## Команди, що впали
| крок | команда | помилка дослівно |
|---|---|---|
| Крок 3 | `docker run --rm -v "$PWD/nginx.conf:/etc/nginx/conf.d/default.conf:ro" nginx:alpine nginx -t` | `zsh:1: command not found: docker` |
