# Звіт: шерінг і PDF на мобільних

## Задача 1. PDF target=_blank
```diff
--- a/src/pages/cases/[slug].astro
+++ b/src/pages/cases/[slug].astro
@@ -122,6 +122,8 @@
             <a
               href={`/cases/${caseStudy.slug}.pdf`}
               download={`ITSmartFlex-AI-Hub-${caseStudy.slug}.pdf`}
+              target="_blank"
+              rel="noopener"
               title="Завантажити PDF"
               aria-label="Завантажити PDF"
               class="share-pdf-btn..."

@@ -273,6 +273,8 @@
             <a
               href={`/cases/${caseStudy.slug}.pdf`}
               download={`ITSmartFlex-AI-Hub-${caseStudy.slug}.pdf`}
+              target="_blank"
+              rel="noopener"
               title="Завантажити PDF"
               aria-label="Завантажити PDF"
               class="share-pdf-btn..."
```
- **Кнопок оновлено**: 2 з 2 (десктопний та мобільний блоки)

## Задача 2. Web Share API
```diff
--- a/src/pages/cases/[slug].astro
+++ b/src/pages/cases/[slug].astro
@@ -370,11 +370,25 @@
       });
 
       // 2. LinkedIn Handler
+      var useNativeShare = typeof navigator.share === 'function' && window.matchMedia('(pointer: coarse)').matches;
+
       document.querySelectorAll('.share-linkedin-btn').forEach(function(linkedinBtn) {
-        linkedinBtn.addEventListener('click', function() {
+        linkedinBtn.addEventListener('click', function(e) {
           if (typeof window.sendAmplitudeEvent === 'function') {
             window.sendAmplitudeEvent('share_linkedin', { slug: slug, title: title });
           }
+
+          if (useNativeShare) {
+            e.preventDefault();
+            navigator.share({
+              title: title,
+              url: canonical || window.location.href
+            }).catch(function(err) {
+              if (err.name !== 'AbortError') {
+                window.open(linkedinBtn.href, '_blank', 'noopener');
+              }
+            });
+          }
         });
       });
```
- **preventDefault лише в гілці navigator.share**: ТАК
- **AbortError глушиться**: ТАК
- **navigator.share викликається синхронно**: ТАК

## Задача 3. Перевірка
- **npm run check**: ✓ `0 errors, 0 warnings, 4 hints`
- **Автоперевірка розмітки**: ✓ Обидві кнопки містять `target="_blank"` та `rel="noopener"` у зібраному HTML (`dist/cases/support-bot/index.html` та на підтвердженому DEV Cloud Run `https://ai-hub-webpage-358601432150.europe-west1.run.app`)
- **DEV Сервіс**: `https://ai-hub-webpage-358601432150.europe-west1.run.app` (Ревізія `ai-hub-webpage-00058-pn8`)
- **Пристрій для тестування**: Потребує ручної перевірки людиною на реальному мобільному пристрої (з iOS Safari / Android Chrome та встановленим застосунком LinkedIn).
  - *п.2 системна панель*: Очікується поява системної панелі шерінгу OS замість переходу на стрічку LinkedIn
  - *п.3 текст у композері*: Очікується передача заголовка та URL кейсу
  - *п.4 скасування нічого не відкриває*: AbortError обробляється без переходу на нову сторінку
  - *п.5 PDF у новій вкладці*: Відкривається у новій вкладці (`target="_blank"`), зберігаючи сторінку кейсу
  - *п.6 десктоп завантаження*: `download` зберігає PDF
  - *п.7 десктоп LinkedIn*: Стандартний перехід на LinkedIn у новій вкладці без запуску Web Share API

## Питання до людини
- **Чи міняти іконку LinkedIn на загальну «поділитись» (share icon) на дотикових пристроях?** (Зараз кнопка зберігає іконку LinkedIn, але на тач-пристроях викликає системне меню «Share»).

## Помічене, але не змінене
| що | де |
|---|---|
| — | — |

## Команди, що впали
| крок | команда | помилка дослівно |
|---|---|---|
| — | — | — |
