export interface CaseStudy {
  id?: string;
  slug: string;
  type?: string;
  badge: { uk: string; en: string };
  title: { uk: string; en: string };
  subtitle: { uk: string; en: string };
  bannerImage: string;
  overview: { uk: string; en: string };
  challenge: { uk: string; en: string };
  solution: { uk: string; en: string };
  scope: { uk: string; en: string };
  difficultyWithout: { uk: string; en: string };
  difficultyWith: { uk: string; en: string };
  tags: string[];
  metrics: Array<{ label: { uk: string; en: string }; value: string }>;
  keyFeatures: Array<{ title: { uk: string; en: string }; desc: { uk: string; en: string } }>;
  techStack: string[];
}

export const caseStudies: CaseStudy[] = [
  // ==================== 5 CASE STUDIES (type: "business") ====================
  {
    id: "case-copilot-dev",
    slug: "copilot-dev",
    type: "business",
    badge: { uk: "Розробка ПЗ", en: "Software Engineering" },
    title: { 
      uk: "Програма підвищення продуктивності інженерних команд за допомогою ШІ-асистентів розробки", 
      en: "Engineering Productivity Program Powered by AI Assistants" 
    },
    subtitle: { 
      uk: "Пілотування ШІ-інструмента GitHub Copilot в IT SmartFlex з метою оцінки його реального впливу на швидкість розробки. Інструмент успішно випробували дві команди інженерів. Зафіксовано чіткий тренд до системного зниження середнього часу на реалізацію технічних задач після старту проєкту.", 
      en: "Piloting GitHub Copilot at IT SmartFlex to evaluate its real impact on software engineering velocity across development teams." 
    },
    bannerImage: "/assets/cards/copilot-dev.jpg",
    scope: { uk: "Розробка ПЗ, Тестування ПЗ", en: "Software Engineering & Testing" },
    difficultyWithout: { uk: "Висока (110 год / задача)", en: "High (110 hrs / task)" },
    difficultyWith: { uk: "Низька (70-103 год / задача)", en: "Low (70-103 hrs / task)" },
    overview: {
      uk: "Швидша розробка продуктів та помітне підвищення продуктивності команди. Ефективність інженерів зросла на 7–15% під час виконання задач розробки. Середня тривалість виконання задач зменшилась зі 110 до 103 годин у першій команді та з 83 до 70 годин у другій команді. Масштабували на 10 команд, на цілий підрозділ.",
      en: "Faster product delivery and noticeable team productivity gains. Engineering efficiency increased by 7-15% with task completion time drops across teams."
    },
    challenge: {
      uk: "Висока трудомісткість рутинного кодування, великий обсяг шаблонного коду та тривалий цикл реалізації складних технічних тасок без ШІ-інструментів.",
      en: "High manual effort in boilerplate coding and extended execution cycles for technical tasks prior to AI integration."
    },
    solution: {
      uk: "Проведення комплексного пілотування інструменту GitHub Copilot на базі двох діючих команд розробки (10 людей у кожній). Впровадження наскрізного трекінгу та детального порівняння часу виконання аналогічних завдань до та після початку використання ШІ.",
      en: "Comprehensive piloting of GitHub Copilot across two active engineering teams with end-to-end tracking of task completion metrics."
    },
    tags: ["Підвищення продуктивності", "Прискорення розробки ПЗ", "Оптимізація витрат", "Скорочення часу виконання задач"],
    metrics: [
      { label: { uk: "Зростання ефективності", en: "Efficiency Growth" }, value: "7-15%" },
      { label: { uk: "Скорочення часу задач", en: "Task Time Drop" }, value: "з 110 до 103 год" },
      { label: { uk: "Масштабування", en: "Scaling" }, value: "10 команд" }
    ],
    keyFeatures: [
      {
        title: { uk: "Як це працює", en: "How it works" },
        desc: { uk: "ШІ-плагін, інтегрований безпосередньо в середовище розробки (IDE), аналізує контекст написання коду в реальному часі, автоматично пропонує готові фрагменти функцій, допомагає шукати помилки та миттєво генерує рутинний (boilerplate) код.", en: "IDE-integrated AI plugin analyzes realtime code context, suggesting functions, fixes, and boilerplate code." }
      },
      {
        title: { uk: "Архітектура", en: "Architecture" },
        desc: { uk: "Хмарна інтеграція інструменту розробки із середовищем IDE інженерів (наприклад, VS Code або JetBrains) через захищені плагіни з автентифікацією в корпоративній організації GitHub Enterprise.", en: "Secure enterprise cloud integration with VS Code and JetBrains IDEs via GitHub Enterprise." }
      },
      {
        title: { uk: "Окупність (ROI)", en: "ROI" },
        desc: { uk: "Розробник виконує на 7–15% більше задач за той самий проміжок часу.", en: "Developers complete 7-15% more tasks within the exact same timeframe." }
      }
    ],
    techStack: ["GitHub Copilot", "OpenAI Models & Others", "VS Code / JetBrains"]
  },

  {
    id: "case-support-bot",
    slug: "support-bot",
    type: "business",
    badge: { uk: "Клієнтський сервіс", en: "Customer Service" },
    title: { 
      uk: "ШІ-асистент автоматичного опрацювання звернень та прийому скарг клієнтів", 
      en: "AI Assistant for Automated Customer Request & Complaint Processing" 
    },
    subtitle: { 
      uk: "Інтелектуальний ШІ-бот у Microsoft Teams для повної автоматизації першої лінії підтримки та обробки запитів від користувачів. Система самостійно класифікує звернення користувачів, відкриває інциденти в HPSM та звітує перед менеджментом.", 
      en: "Smart MS Teams AI bot automating 1st line customer support, ticket creation in HPSM, and management reporting." 
    },
    bannerImage: "/assets/cards/support-bot.jpg",
    scope: { uk: "Клієнтський сервіс, Операційна діяльність, Сервісна підтримка", en: "Customer Support & Operations" },
    difficultyWithout: { uk: "Середня (3/5)", en: "Medium (3/5)" },
    difficultyWith: { uk: "Низька (1/5)", en: "Low (1/5)" },
    overview: {
      uk: "Повністю знято навантаження з операторів лінії 111 щодо заявок Friendly Users. Успішно опрацьовано 1100+ складних звернень від понад 1000 унікальних користувачів. Вартість обробки одного запиту впала з 25,4 грн ($0,58) до 0,26–4,3 грн ($0,006–0,1).",
      en: "Fully automated 1st-line support for Friendly Users, processing 1100+ complex requests while slashing cost per request from 25.4 UAH to 0.26-4.3 UAH."
    },
    challenge: {
      uk: "Перевантаження стандартної лінії підтримки через велику кількість запитів від користувачів. Потреба радикально знизити вартість обробки рутинних скарг та уникнути затримок у реакції на критичні технічні проблеми.",
      en: "Support tier overload with routine requests, requiring a drastic reduction in handling costs and response times."
    },
    solution: {
      uk: "Впровадження інтелектуального чат-бота як єдиного цифрового вікна для користувачів. Бот бере на себе первинну комунікацію, автоматично створює структуровані заявки в системі HPSM та самостійно формує щоденну аналітичну звітність для технічної команди.",
      en: "Deployed a single digital window chatbot handling initial contact, HPSM ticket creation, and automated reporting."
    },
    tags: ["Покращення клієнтського сервісу", "Автоматизація процесів", "Оптимізація витрат", "Скорочення часу виконання задач"],
    metrics: [
      { label: { uk: "Опрацьовано звернень", en: "Processed Requests" }, value: "1100+" },
      { label: { uk: "Зниження вартості", en: "Cost Reduction" }, value: "до 99%" },
      { label: { uk: "Вартість запиту", en: "Cost / Request" }, value: "0.26-4.3 грн" }
    ],
    keyFeatures: [
      {
        title: { uk: "Як це працює", en: "How it works" },
        desc: { uk: "Користувач пише скаргу у довільній формі в чат MS Teams. ШІ за допомогою алгоритмів NLP виокремлює суть проблеми, формує параметри заявки, через API передає її в HPSM та надсилає користувачу номер тікета.", en: "User submits complaints in MS Teams chat; NLP parses intent, creates HPSM tickets via API, and returns ticket numbers." }
      },
      {
        title: { uk: "Архітектура", en: "Architecture" },
        desc: { uk: "Модуль діалогового інтерфейсу MS Teams з'єднаний через хмарні сервіси обробки мови з інтеграційною шиною, яка за допомогою безпечних API-запитів вносить дані в Service Desk систему (HPSM) та зберігає логи для звітності.", en: "MS Teams conversational interface integrated with cloud Azure NLP services and HPSM API." }
      },
      {
        title: { uk: "Окупність (ROI)", en: "ROI" },
        desc: { uk: "Економія до 99% операційних витрат на кожному окремому запиті.", en: "Up to 99% operational expense savings on every single request." }
      }
    ],
    techStack: ["Azure Bot Service", "MS Teams", "Azure OpenAI", "GPT-5.x", "HPSM API"]
  },

  {
    id: "case-b2b-crm-assistant",
    slug: "b2b-crm-assistant",
    type: "business",
    badge: { uk: "Продажі та CRM", en: "Sales & CRM" },
    title: { 
      uk: "Інтелектуальний ШІ-коректор бізнес-комунікації в B2B CRM на базі локальних моделей", 
      en: "AI Assistant for Business Communication in B2B CRM Powered by On-Prem LLMs" 
    },
    subtitle: { 
      uk: "Безшовно вбудоване в B2B CRM рішення для автоматичного виправлення, стилізації та покращення ділових текстів працівників. Інструмент працює на базі повністю автономних локальних мовних моделей. Це дозволяє безпечно обробляти конфіденційні клієнтські дані, не передаючи їх у зовнішні хмари.", 
      en: "Embedded CRM assistant refining B2B communication on autonomous local LLMs without external cloud data leaks." 
    },
    bannerImage: "/assets/cards/b2b-crm-assistant.jpg",
    scope: { uk: "Продажі, Корпоративні комунікації, Клієнтський сервіс", en: "B2B Sales, Corporate Comms & Support" },
    difficultyWithout: { uk: "Середня (3/5)", en: "Medium (3/5)" },
    difficultyWith: { uk: "Низька (1/5)", en: "Low (1/5)" },
    overview: {
      uk: "Успішно опрацьовано 300+ запитів за перший же місяць роботи. ШІ суттєво економить час менеджерів на формулювання думок, усуває людські помилки у листах та масштабується на відділи обслуговування і скарг з нульовими витратами на зовнішні ліцензії.",
      en: "Processed 300+ communication requests in month 1, eliminating errors and saving manager time with zero external API fees."
    },
    challenge: {
      uk: "Ризик витоку комерційної та таємної інформації через використання співробітниками публічних ШІ-сервісів (як-от ChatGPT). Висока ціна комерційних ліцензій (Copilot 365 від $30/міс. на користувача) та зниження якості офіційних відповідей клієнтам через втому персоналу наприкінці робочого дня.",
      en: "Data privacy risks with public LLMs, high commercial license costs, and communication quality drops due to staff fatigue."
    },
    solution: {
      uk: "Розгортання та безшовна інтеграція локальних мовних моделей безпосередньо в інтерфейс B2B CRM. Додано модулі миттєвого виправлення орфографії, автоматичної зміни тональності тексту на офіційно-ділову та інструменти швидкого підсумовування довгих діалогів.",
      en: "Deployed local open-source LLMs directly into B2B CRM interface for instant spellchecking, tone adjustment, and thread summarization."
    },
    tags: ["Підвищення продуктивності", "Підвищення якості комунікацій", "Скорочення часу виконання задач"],
    metrics: [
      { label: { uk: "Опрацьовано запитів (міс 1)", en: "Month 1 Requests" }, value: "300+" },
      { label: { uk: "Витрати на API", en: "API Costs" }, value: "$0" },
      { label: { uk: "Конфіденційність", en: "Data Privacy" }, value: "100% On-Prem" }
    ],
    keyFeatures: [
      {
        title: { uk: "Як це працює", en: "How it works" },
        desc: { uk: "Співробітник виділяє або пише чернетку тексту в CRM-системі та натискає кнопку «Покращити». Текст передається на внутрішній захищений сервер, де локальна LLM виправляє помилки, структурує текст та повертає його в поле введення за частки секунди.", en: "Employee drafts message in CRM, clicks 'Improve', and local LLM refines, structures, and fixes text within milliseconds." }
      },
      {
        title: { uk: "Архітектура", en: "Architecture" },
        desc: { uk: "Клієнтський плагін у CRM-системі взаємодіє через захищений внутрішній API-шлюз із виділеним сервером (On-Premise), на якому розгорнуто оптимізовану мовну модель під керуванням корпоративного середовища виконання.", en: "CRM client plugin connects via secure internal API gateway to on-premise GPU server running optimized LLMs." }
      },
      {
        title: { uk: "Окупність (ROI)", en: "ROI" },
        desc: { uk: "$0 додаткових витрат за обробку кожного запиту (повна автономність та незалежність від сторонніх платних API).", en: "$0 per-request cost due to complete cloud API independence." }
      }
    ],
    techStack: ["GPT-OSS", "Python/FastAPI", "Docker", "B2B CRM Integrations"]
  },

  {
    id: "case-commercial-approval",
    slug: "commercial-approval-bot",
    type: "business",
    badge: { uk: "Автоматизація угод", en: "Deal Approvals" },
    title: { 
      uk: "Автоматизація погодження комерційної інформації через ШІ-чатбот", 
      en: "Automated B2B Commercial Approvals via AI Chatbot" 
    },
    subtitle: { 
      uk: "Спеціалізований бот, який з'єднує корпоративний месенджер із CRM-системою для миттєвого затвердження та верифікації комерційних умов у B2B-сегменті. Дозволяє менеджерам та керівникам оперативно керувати угодами без необхідності постійно заходити у важкі інтерфейси систем.", 
      en: "Specialized chatbot linking MS Teams with CRM for instant approval and verification of B2B commercial terms." 
    },
    bannerImage: "/assets/cards/commercial-approval-bot.jpg",
    scope: { uk: "Продажі, Юридичний напрям, Бек-офіс, Корпоративні комунікації", en: "Sales, Legal, Back-Office & Corporate Comms" },
    difficultyWithout: { uk: "Середня (3/5)", en: "Medium (3/5)" },
    difficultyWith: { uk: "Низька (1/5)", en: "Low (1/5)" },
    overview: {
      uk: "Радикальне пришвидшення внутрішніх операційних погоджень, оптимізація робочого часу комерційних директорів та B2B-менеджерів, мінімізація простою комерційних угод на етапах валідації.",
      en: "Radical acceleration of internal commercial approvals, optimizing executive time and eliminating sales deal bottlenecks."
    },
    challenge: {
      uk: "Затягнутий процес погодження знижок, нестандартних тарифів та комерційних пропозицій для B2B-клієнтів через довгі ланцюжки комунікації в пошті, що призводить до втрати угод та низької операційної швидкості сейлз-команд.",
      en: "Slow email-based approval chains for custom B2B discounts and terms leading to lost deals and delayed sales cycles."
    },
    solution: {
      uk: "Створення ШІ-бота в середовищі MS Teams, який автоматично надсилає відповідальним особам запити на погодження у вигляді інтерактивних карток та вносить фінальні рішення безпосередньо в CRM.",
      en: "Created MS Teams AI bot dispatching interactive approval cards to decision-makers and syncing decisions back to CRM."
    },
    tags: ["Автоматизація процесів", "Скорочення часу виконання задач", "Оптимізація витрат", "Підвищення якості комунікацій"],
    metrics: [
      { label: { uk: "Час погодження", en: "Approval Time" }, value: "-75%" },
      { label: { uk: "Конверсія продажів", en: "Sales Conversion" }, value: "+18%" },
      { label: { uk: "Інтеграція", en: "System Sync" }, value: "100% CRM & Teams" }
    ],
    keyFeatures: [
      {
        title: { uk: "Як це працює", en: "How it works" },
        desc: { uk: "Коли менеджер створює заявку в CRM, ШІ-бот готує коротке резюме пропозиції (summary) та надсилає керівнику в Teams інтерактивну картку з кнопками «Затвердити/Відхилити» і супровідним ШІ-аналізом.", en: "When CRM deal triggers approval, AI bot generates a deal summary card in Teams with instant Approve/Reject buttons." }
      },
      {
        title: { uk: "Архітектура", en: "Architecture" },
        desc: { uk: "Інтеграційний мікросервіс, що відстежує події (webhooks) в CRM і Microsoft Teams, забезпечуючи двосторонню синхронізацію статусів погодження.", en: "Webhook-based microservice synchronizing deal states bidirectionally between CRM and Microsoft Teams." }
      },
      {
        title: { uk: "Окупність (ROI)", en: "ROI" },
        desc: { uk: "Скорочення часу циклу погодження документів та угод всередині компанії, що веде до підвищення конверсії у продажі.", en: "Shorter deal cycles directly boost closed-won conversion rates." }
      }
    ],
    techStack: ["Azure Bot Service", "MS Teams SDK", "Node.js", "CRM API"]
  },

  {
    id: "case-ops-automation",
    slug: "operational-reporting-bot",
    type: "business",
    badge: { uk: "Операційна діяльність", en: "Operations & Back-Office" },
    title: { 
      uk: "Розумна автоматизація рутинних операційних процесів та бек-офісної звітності", 
      en: "Intelligent Automation of Operational Processes & Back-Office Reporting" 
    },
    subtitle: { 
      uk: "Інтелектуальне ШІ-рішення, створене для автоматичного збору операційних даних з різних джерел, їхнього смислового аналізу та формування консолідованої відповіді для працівників. Бот мінімізує потребу у залученні людей до щоденної рутинної ручної праці.", 
      en: "AI solution aggregating operational data across internal systems, generating consolidated reports and answers." 
    },
    bannerImage: "/assets/cards/business-case-analytics.png",
    scope: { uk: "Операційна діяльність, Бек-офіс та адміністрування", en: "Operations & Back-Office Administration" },
    difficultyWithout: { uk: "Середня (3/5)", en: "Medium (3/5)" },
    difficultyWith: { uk: "Низька (1/5)", en: "Low (1/5)" },
    overview: {
      uk: "Суттєве вивільнення робочого часу адміністративного персоналу, повне усунення помилок у щоденних розрахунках і звітах, миттєвий доступ керівництва до точної аналітики.",
      en: "Frees administrative staff hours, eliminates reporting manual errors, and provides management instant access to precise analytics."
    },
    challenge: {
      uk: "Велика кількість розпорошених даних у внутрішніх системах, значні часові витрати спеціалістів на щоденне ручне зведення операційних звітів та високий ризик виникнення помилок через «людський фактор».",
      en: "Fragmented data across legacy databases, high staff hours spent on manual consolidation, and human calculation errors."
    },
    solution: {
      uk: "Впровадження автоматизованого ШІ-помічника, який за розкладом або запитом самостійно витягує дані з внутрішніх баз, агрегує їх, проводить інтелектуальну класифікацію та формує відповіді у зручному для сприйняття вигляді. Доступний через уніфікований канал комунікації, забезпечує взаємодію із внутрішніми системами.",
      en: "Deployed AI reporting assistant fetching internal data on schedule or on-demand, generating clean visual reports in Teams."
    },
    tags: ["Автоматизація процесів", "Оптимізація витрат", "Підвищення продуктивності", "Скорочення часу виконання задач"],
    metrics: [
      { label: { uk: "Економія людино-годин", en: "Hours Saved" }, value: "60+ год/міс" },
      { label: { uk: "Точність розрахунків", en: "Calculation Accuracy" }, value: "100%" },
      { label: { uk: "Швидкість звіту", en: "Reporting Time" }, value: "Миттєво" }
    ],
    keyFeatures: [
      {
        title: { uk: "Як це працює", en: "How it works" },
        desc: { uk: "Бот за скриптом збирає неструктуровані або напівструктуровані дані, використовує ШІ для структурування інформації, надсилає відповідь або сповіщення в уніфікований канал. Отримує вхідні дані від користувача та відправляє у внутрішні корпоративні системи.", en: "Bot automatically fetches raw data, uses AI for structuring, and delivers instant reports into corporate channels." }
      },
      {
        title: { uk: "Архітектура", en: "Architecture" },
        desc: { uk: "Автономний сервіс на базі скриптів автоматизації, який працює всередині захищеного контуру компанії із доступом до необхідних джерел даних.", en: "Secure internal microservice executing data aggregation scripts within corporate perimeter." }
      },
      {
        title: { uk: "Окупність (ROI)", en: "ROI" },
        desc: { uk: "Мінімізація годин ручної праці адміністраторів на користь аналітичних та стратегічних завдань.", en: "Reallocates administrative staff hours from manual entry to strategic business tasks." }
      }
    ],
    techStack: ["Python", "SQL", "Azure OpenAI", "Microsoft Teams", "Dify"]
  },

  // ==================== 5 USE CASES (type: "usecase") ====================
  {
    id: "case-ui-generation",
    slug: "ui-component-generation",
    type: "usecase",
    badge: { uk: "UI & Proto", en: "UI & Proto" },
    title: { 
      uk: "Швидке створення UI-компонентів дизайн-системи та прототипів за графічним макетом або Figma-посиланням", 
      en: "Rapid UI Component & Prototype Generation from Figma Layouts" 
    },
    subtitle: { 
      uk: "Автоматична генерація готових кодових UI-компонентів та клікабельних HTML-прототипів з Figma-макетів за допомогою ШІ.", 
      en: "Instant AI generation of production-ready UI components and clickable prototypes from Figma designs." 
    },
    bannerImage: "/assets/cards/business-case-dev.png",
    scope: { uk: "Розробка ПЗ, IT, Продуктова розробка, R&D, MVP", en: "Software Engineering & R&D" },
    difficultyWithout: { uk: "4 год / компонент", en: "4 hrs / component" },
    difficultyWith: { uk: "1 год / компонент", en: "1 hr / component" },
    overview: {
      uk: "Значне прискорення виходу фіч (Time-to-Market). Замість довгих текстових узгоджень команда отримує \"живий\" прототип для демо стейкхолдерам за 24 години. Повністю нівелюється \"monkey job\" при ручному копіюванні інтерфейсів. Економія часу складає 75%.",
      en: "Dramatically accelerates Time-to-Market. Delivers clickable prototypes in 24 hours while cutting UI development time by 75%."
    },
    challenge: {
      uk: "Фронтенд-розробники та бізнес-аналітики витрачають години на рутинне копіювання стилів, розмітку UI-форм, написання однотипних компонентів (списки, форми, лоадинг-стейти) або створення складних паперових ТЗ.",
      en: "Frontend engineers and BAs spend hours manually translating Figma styles, layouts, and forms into code."
    },
    solution: {
      uk: "Розробник підключає спеціалізовані контекстні інструкції (Figma MCP) або завантажує скріншот мокапу форми напряму у діалог. Модель аналізує існуючі стилі проєкту та інкрементально (патчами, без повної регенерації файлу) створює чистий код або готовий клікабельний HTML-прототип для грумінгу.",
      en: "Engineers connect Figma MCP context; AI analyzes design tokens and incrementally generates clean component code."
    },
    tags: ["Підвищення продуктивності", "Прискорення розробки ПЗ", "Скорочення часу виконання задач"],
    metrics: [
      { label: { uk: "Економія часу", en: "Time Savings" }, value: "75%" },
      { label: { uk: "Час без ШІ", en: "Time without AI" }, value: "4 год" },
      { label: { uk: "Час з ШІ", en: "Time with AI" }, value: "1 год" }
    ],
    keyFeatures: [
      {
        title: { uk: "Архітектура", en: "Architecture" },
        desc: { uk: "Клієнт-серверна інтеграція середовища розробки (IDE) з дизайн-платформою через протокол Model Context Protocol (MCP). Налаштовуються два рівні інструкцій: глобальні правила кодингу (generic) та специфічні правила фічі (feature instructions).", en: "IDE-to-Figma Model Context Protocol (MCP) integration with feature-specific design token instructions." }
      },
      {
        title: { uk: "Рівень зрілості", en: "Maturity Level" },
        desc: { uk: "Перевірено на практиці в бойових проектах розробки IT SmartFlex.", en: "Battle-tested in live IT SmartFlex engineering projects." }
      }
    ],
    techStack: ["GitHub Copilot", "Figma MCP", "Claude Sonnet", "Claude Opus"]
  },

  {
    id: "case-trace-log-analysis",
    slug: "trace-log-analysis",
    type: "usecase",
    badge: { uk: "Аналіз логів", en: "Log Analytics" },
    title: { 
      uk: "Крос-системний аналіз логів за Trace ID для миттєвого виявлення аномалій у складних бізнес-процесах", 
      en: "Cross-System Trace ID Log Analysis & Anomaly Detection" 
    },
    subtitle: { 
      uk: "AI-аналіз розподілених системних логів для виявлення прихованих багів та аномалій у складних мікросервісах.", 
      en: "Distributed log tracing with AI for instant cross-service anomaly detection." 
    },
    bannerImage: "/assets/cards/trace-log-analysis.jpg",
    scope: { uk: "Операційна діяльність, Інфраструктура та експлуатація", en: "Operations & DevOps" },
    difficultyWithout: { uk: "48 год / інцидент", en: "48 hrs / incident" },
    difficultyWith: { uk: "16 год / інцидент", en: "16 hrs / incident" },
    overview: {
      uk: "Швидкість локалізації інцидентів зростає у 3 рази. Знижується кількість пропущених дефектів. AI дозволяє виявити приховані баги в архітектурі суміжних систем ще до того, як вони завдадуть фінансових чи репутаційних збитків на Production. Економія часу 66%.",
      en: "Triples incident localization speed, cutting investigation time by 66% and detecting architectural bugs before Production impact."
    },
    challenge: {
      uk: "Аналіз поведінки мікросервісів на стику інтеграції кількох команд. Коли процес-флоу заплутаний, QA-інженери витрачають дні на ручне вивантаження та зіставлення логів у спробах зрозуміти, чому ланцюжок транзакцій перервався.",
      en: "Microservice integration troubleshooting across teams consumes days of manual log dumping and correlation."
    },
    solution: {
      uk: "Усі залежні проєкти об'єднуються в один робочий простір. На основі початкового TraceID робиться зліпок (снепшот) логів, який завантажується в контекст ШІ разом зі схемами процес-флоу. Модель проводить глибокий перехресний аудит та підсвічує логічні розбіжності.",
      en: "TraceID snapshots are loaded into AI context alongside process flow diagrams for automated cross-system audit."
    },
    tags: ["Аналіз та пошук інформації", "Підтримка прийняття рішень", "Скорочення часу виконання задач"],
    metrics: [
      { label: { uk: "Прискорення аналізу", en: "Speedup" }, value: "3x" },
      { label: { uk: "Економія часу", en: "Time Savings" }, value: "66%" },
      { label: { uk: "Час з ШІ", en: "Time with AI" }, value: "16 год" }
    ],
    keyFeatures: [
      {
        title: { uk: "Архітектура", en: "Architecture" },
        desc: { uk: "Локальне ізольоване аналітичне середовище. Сніпшоти логів із CI/CD або систем моніторингу завантажуються в єдиний контекст разом із технічною документацією (DAC / Process Flow) для запобігання галюцинаціям.", en: "Isolated analytical environment pairing CI/CD log dumps with DAC/Process Flow documentation." }
      },
      {
        title: { uk: "Рівень зрілості", en: "Maturity Level" },
        desc: { uk: "Перевірено на практиці у високонавантажених платформах.", en: "Battle-tested in high-load production platforms." }
      }
    ],
    techStack: ["GitHub Copilot", "GPT-5.x", "Tracing Tools"]
  },

  {
    id: "case-self-healing-qa",
    slug: "self-healing-qa",
    type: "usecase",
    badge: { uk: "QA Automation", en: "QA Automation" },
    title: { 
      uk: "Побудова автономних тестових екосистем з функцією самовиправлення (Automated QA Engine & Self-Healing Tests)", 
      en: "Autonomous Self-Healing Test Ecosystems (QA Engine)" 
    },
    subtitle: { 
      uk: "ШІ-агенти для автоматичного написання, запуску та самостійного виправлення коду автотестів без участі людини.", 
      en: "Autonomous AI agents generating, running, and self-healing test automation code." 
    },
    bannerImage: "/assets/cards/self-healing-qa.jpg",
    scope: { uk: "Тестування ПЗ, Розробка ПЗ, QA Automation", en: "QA Automation & Software Testing" },
    difficultyWithout: { uk: "32 год / фреймворк", en: "32 hrs / framework" },
    difficultyWith: { uk: "16 год / фреймворк", en: "16 hrs / framework" },
    overview: {
      uk: "Повна ліквідація однотипної рутини для інженерів. Суттєве збільшення покриття коду тестами, підвищення стабільності релізів та можливість виконувати значно більше бізнес-задач у межах одного спринту. Економія часу 50%.",
      en: "Eliminates routine QA work, increases test coverage, enhances release stability, and cuts test framework setup by 50%."
    },
    challenge: {
      uk: "Написання автотестів, покриття коду юніт-тестами, рутинне заповнення інфраструктурних Page Objects та ручне дофікшування дрібних багів після кожного прогону забирає до 40% часу всього спринту команди розробки.",
      en: "Writing auto-tests and fixing broken Page Objects consumes up to 40% of development sprint capacity."
    },
    solution: {
      uk: "Створюється архітектурний план тестування за допомогою AI. Далі розгортається кастомний локальний тест-агент, який автоматично пише код автотестів, запускає їх на happy flow / e2e сценаріях, самостійно аналізує помилки виконання й виправляє свій код без участі людини.",
      en: "Deploys multi-agent test engines that automatically generate e2e tests, execute runs, parse errors, and self-heal code."
    },
    tags: ["Автоматизація процесів", "Підвищення продуктивності", "Прискорення розробки ПЗ"],
    metrics: [
      { label: { uk: "Економія часу", en: "Time Savings" }, value: "50%" },
      { label: { uk: "Час без ШІ", en: "Time without AI" }, value: "32 год" },
      { label: { uk: "Час з ШІ", en: "Time with AI" }, value: "16 год" }
    ],
    keyFeatures: [
      {
        title: { uk: "Архітектура", en: "Architecture" },
        desc: { uk: "Мультиагентна вертикальна структура: Агент-Архітектор (створює план) ➔ Агент-Менеджер (делегує в IDE) ➔ Агент-Програміст та Агент-Тестувальник (працюють у закритому циклі генерації та валідації виконання).", en: "Multi-agent hierarchy: Architect Agent -> Manager Agent -> Programmer & QA Agents operating in a closed loop." }
      },
      {
        title: { uk: "Рівень зрілості", en: "Maturity Level" },
        desc: { uk: "Перевірено на практиці.", en: "Battle-tested in production." }
      }
    ],
    techStack: ["GitHub Copilot", "Claude Sonnet", "Claude Opus", "GitLab CI/CD", "Playwright MCP"]
  },

  {
    id: "case-architecture-design-ai",
    slug: "architecture-design-ai",
    type: "usecase",
    badge: { uk: "Architecture & R&D", en: "Architecture & R&D" },
    title: { 
      uk: "Гібридне проєктування системної архітектури та підготовка до технічних форумів із захистом рішень", 
      en: "Hybrid System Architecture Design & Technical Forum Defense" 
    },
    subtitle: { 
      uk: "Двовекторне ШІ-проектування системної архітектури з мінімізацією витрат токенів та підготовкою аргументованої документації.", 
      en: "Two-stage AI architecture modeling delivering rigorous technical documentation at optimal token cost." 
    },
    bannerImage: "/assets/cards/architecture-design-ai.jpg",
    scope: { uk: "Розробка ПЗ, Інфраструктура та експлуатація, Enterprise Architecture", en: "Enterprise Architecture & R&D" },
    difficultyWithout: { uk: "24 год / дослідження", en: "24 hrs / study" },
    difficultyWith: { uk: "4 год / дослідження", en: "4 hrs / study" },
    overview: {
      uk: "Скорочення часу на підготовку до архітектурних комітетів у 6 разів (економія до 83%). Команда отримує глибоко аргументоване, структуроване бачення ризиків та підводних каменів до початку розробки. Досягається критична економія хмарних AI-кредитів та квот компанії.",
      en: "Cuts architecture committee prep time by 6x (83% savings), delivering risk analysis while optimizing AI token quotas."
    },
    challenge: {
      uk: "Дослідження ринку, порівняння технологічних альтернатив під жорсткі обмеження корпоративного стеку та написання технічної документації вимагає колосального аналітичного ресурсу. При цьому пряме використання найдорожчих ШІ-моделей для написання всього коду призводить до перевитрат бюджету компанії.",
      en: "Evaluating tech stacks against strict enterprise rules requires vast engineering effort, while raw top-tier LLM usage inflates costs."
    },
    solution: {
      uk: "Робота ділиться на дві фази. У \"Plan Mode\" найпотужніша ШІ-модель вивчає вихідні вимоги (OBM Knowledge Base) як єдине джерело правди та ітеративно вибудовує покроковий архітектурний план. Сформований та зафіксований план віддається на виконання дешевшим моделям.",
      en: "Split-execution architecture: flagship LLM creates master plan from OBM Knowledge Base, passed to cost-effective models for execution."
    },
    tags: ["Підтримка прийняття рішень", "Підвищення продуктивності", "Прискорення розробки ПЗ"],
    metrics: [
      { label: { uk: "Скорочення часу", en: "Time Cut" }, value: "6x" },
      { label: { uk: "Економія часу", en: "Time Savings" }, value: "83%" },
      { label: { uk: "Час з ШІ", en: "Time with AI" }, value: "4 год" }
    ],
    keyFeatures: [
      {
        title: { uk: "Архітектура", en: "Architecture" },
        desc: { uk: "Двовекторна модель споживання токенів (Split-Execution System Architecture). Верхній рівень — аналіз документації та збирання Master-промпту флагманською моделлю. Нижній рівень — імплементація та кодування рутинними локальними моделями.", en: "Split-Execution System Architecture separating high-level strategic reasoning from routine coding execution." }
      },
      {
        title: { uk: "Рівень зрілості", en: "Maturity Level" },
        desc: { uk: "Перевірено на практиці.", en: "Battle-tested in enterprise projects." }
      }
    ],
    techStack: ["GPT-5.4", "Claude Sonnet", "Claude Opus", "OBM Knowledge Base"]
  },

  {
    id: "case-infra-reporting",
    slug: "infrastructure-reporting",
    type: "usecase",
    badge: { uk: "DevOps & SRE", en: "DevOps & SRE" },
    title: { 
      uk: "Роботизований збір інфраструктурних метрик та миттєва генерація бізнес-звітів для менеджменту", 
      en: "Robotic Infrastructure Metric Collection & Instant Executive Reporting" 
    },
    subtitle: { 
      uk: "Автоматизований збір інфраструктурних показників (Prometheus, CI/CD) та ШІ-генерація зрозумілих графічних звітів для керівництва.", 
      en: "Automated aggregation of SRE/Prometheus metrics into concise executive visual summaries." 
    },
    bannerImage: "/assets/cards/use-case-robot.png",
    scope: { uk: "Інфраструктура та експлуатація, SRE, DevOps, Performance Testing", en: "SRE, DevOps & Infrastructure" },
    difficultyWithout: { uk: "40 год / звіт", en: "40 hrs / report" },
    difficultyWith: { uk: "6 год / звіт", en: "6 hrs / report" },
    overview: {
      uk: "Швидкість підготовки звітності для менеджменту зростає на порядки — замість кількох годин зведення даних звіт готовий за кілька секунд (економія часу 85%). Керівництво миттєво отримує відповідь: чи витримала система навантаження та де знаходяться слабкі місця.",
      en: "Accelerates management reporting by orders of magnitude (85% time savings), providing instant visibility into load test bottlenecks."
    },
    challenge: {
      uk: "Після проведення навантажувальних або регресійних тестів інженери витрачають години на вивантаження даних із баз моніторингу, ручне зведення графіків, пошук інтервалів деградації та оформлення презентацій для керівництва.",
      en: "Engineers spend hours manually extracting Prometheus metrics, compiling charts, and formatting management slide decks after load tests."
    },
    solution: {
      uk: "Створюється автоматизований скрипт, який за вказаними параметрами (час старту, тривалість, цільове навантаження) самостійно звертається до сховищ моніторингу (Prometheus). AI витягує метрики (RPS, error rate, 95th response time), аналізує поведінку системи, будує графіки, виявляє аномалії та автоматично формує стислий executive summary.",
      en: "Automated connector queries Prometheus, analyzes RPS/error rate/latency, builds charts, and generates executive summaries."
    },
    tags: ["Автоматизація процесів", "Підтримка прийняття рішень", "Оптимізація витрат"],
    metrics: [
      { label: { uk: "Економія часу", en: "Time Savings" }, value: "85%" },
      { label: { uk: "Час без ШІ", en: "Time without AI" }, value: "40 год" },
      { label: { uk: "Час з ШІ", en: "Time with AI" }, value: "6 год" }
    ],
    keyFeatures: [
      {
        title: { uk: "Архітектура", en: "Architecture" },
        desc: { uk: "Інтеграційний скрипт-конектор між CI/CD логами/Prometheus та сервісом генерації документів за зафіксованим шаблоном стилю.", en: "Integration connector linking Prometheus and CI/CD logs with document generation services using locked styling templates." }
      },
      {
        title: { uk: "Рівень зрілості", en: "Maturity Level" },
        desc: { uk: "Перевірено на практиці.", en: "Battle-tested in SRE workflows." }
      }
    ],
    techStack: ["GitHub Copilot", "Claude Sonnet", "Python/Bash", "Prometheus STG", "CI/CD Logs"]
  }
];
