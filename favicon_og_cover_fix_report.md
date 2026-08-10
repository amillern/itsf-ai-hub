# Звіт: іконки та прев'ю

## Задача 1. Копіювання
| файл | розмір у dist | квадрат |
|---|---|---|
| `public/favicon.svg` | вектор (1:1) | квадрат |
| `public/favicon.ico` | 48×48 | квадрат |
| `public/favicon-48.png` | 48×48 | квадрат |
| `public/favicon-96.png` | 96×96 | квадрат |
| `public/apple-touch-icon.png` | 180×180 | квадрат |
| `public/icon-192.png` | 192×192 | квадрат |
| `public/icon-512.png` | 512×512 | квадрат |
| `public/assets/og-cover.png` | 1200×630 | НЕ квадрат |

- **public/favicon.svg перезаписаний новим знаком**: ТАК
- **public/favicon.ico перезаписаний**: ТАК
- **public/favicon.png видалений**: ТАК

## Задача 2. Оголошення
```diff
--- a/src/layouts/Layout.astro
+++ b/src/layouts/Layout.astro
@@ -35,3 +35,5 @@
     <!-- Clean Uncropped Favicon Icons -->
     <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
-    <link rel="shortcut icon" type="image/svg+xml" href="/favicon.svg" />
-    <link rel="apple-touch-icon" href="/assets/logo-small.svg" />
+    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png" />
+    <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png" />
+    <link rel="shortcut icon" href="/favicon.ico" />
+    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
```

## Задача 3. og:image
```diff
--- a/src/layouts/Layout.astro
+++ b/src/layouts/Layout.astro
@@ -16,1 +16,1 @@
-  image = "/assets/og-preview.jpg",
+  image = "/assets/og-cover.png",
```
- **Сторінки кейсів зберегли власні обкладинки**: ТАК (`/assets/cards/<slug>.jpg`)

## Задача 4. Перевірка
```
=== розміри у dist ===
dist/favicon-48.png:   pixelWidth: 48   pixelHeight: 48 
dist/favicon-96.png:   pixelWidth: 96   pixelHeight: 96 
dist/apple-touch-icon.png:   pixelWidth: 180   pixelHeight: 180 
dist/icon-192.png:   pixelWidth: 192   pixelHeight: 192 
dist/icon-512.png:   pixelWidth: 512   pixelHeight: 512 
dist/favicon.ico:   pixelWidth: 48   pixelHeight: 48 
dist/assets/og-cover.png:   pixelWidth: 1200   pixelHeight: 630 

=== оголошення іконок на головній ===
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png">
<link rel="shortcut icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

=== og:image на головній ===
<meta property="og:image" content="https://ai.itsmartflex.com/assets/og-cover.png">

=== og:image на сторінці кейсу (має лишитись обкладинка кейсу) ===
<meta property="og:image" content="https://ai.itsmartflex.com/assets/cards/copilot-dev.jpg">
```
- **Знак читається на 48×48**: ТАК
- **Логотип по центру полотна**: ТАК
- **DEV Сервіс**: `https://ai-hub-webpage-358601432150.europe-west1.run.app` (Ревізія `ai-hub-webpage-00060-qct`)

## Помічене, але не змінене
| що | де |
|---|---|
| Python модуль `PIL` недоступний у системі, перевірку точних розмірів виконано системною утилітою `sips` | local environment |

## Команди, що впали
| крок | команда | помилка дослівно |
|---|---|---|
| — | — | — |
