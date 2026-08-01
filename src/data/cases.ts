export interface CaseStudy {
  slug: string;
  badge: { uk: string; en: string };
  title: { uk: string; en: string };
  subtitle: { uk: string; en: string };
  bannerImage: string;
  overview: { uk: string; en: string };
  challenge: { uk: string; en: string };
  solution: { uk: string; en: string };
  tags: string[];
  metrics: Array<{ label: { uk: string; en: string }; value: string }>;
  keyFeatures: Array<{ title: { uk: string; en: string }; desc: { uk: string; en: string } }>;
  techStack: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "support-bot",
    badge: { uk: "Опрацювання звернень", en: "Customer Support" },
    title: { 
      uk: "Автоматизація обробки звернень клієнтів за допомогою AI", 
      en: "Customer Support Automation Powered by AI" 
    },
    subtitle: { 
      uk: "Розумний асистент підтримки 24/7 з автоматичною класифікацією, маршрутизацією та генерацією відповідей", 
      en: "Smart 24/7 support assistant with automated request classification, routing, and instant answer drafts" 
    },
    bannerImage: "/assets/cards/support-bot.jpg",
    overview: {
      uk: "Впровадження інтелектуального чат-бота та AI-класифікатора для першої лінії підтримки дозволило автоматизувати понад 65% рутинних звернень клієнтів без залучення живих операторів.",
      en: "Implementing an intelligent chatbot and AI classifier for first-line support automated over 65% of routine customer requests without human agent intervention."
    },
    challenge: {
      uk: "Високе навантаження на першу лінію підтримки в пікові години призводило до затримок у відповідях до 45 хвилин та підвищеної плинності кадрів через монотонну роботу.",
      en: "High workload on the first support tier during peak hours led to response delays up to 45 minutes and elevated agent turnover due to monotonous tasks."
    },
    solution: {
      uk: "Розроблено мультимовний AI-асистент на базі LLM із синхронізацією з CRM, який розпізнає намір клієнта (Intent Recognition), формує відповіді на основі регламентів компанії та ескалює складні VIP-запити на фахівців.",
      en: "Developed an LLM-based multilingual AI assistant synced with CRM that detects customer intent, answers using company guidelines, and escalates complex VIP requests to specialists."
    },
    tags: ["LLM", "NLP", "CRM Integration", "Automated Support"],
    metrics: [
      { label: { uk: "Автоматизація запитів", en: "Automated Requests" }, value: "65%" },
      { label: { uk: "Час відповіді клієнту", en: "Avg Response Time" }, value: "< 15 сек" },
      { label: { uk: "Задоволеність (CSAT)", en: "CSAT Score" }, value: "4.8 / 5" }
    ],
    keyFeatures: [
      {
        title: { uk: "Аналіз тональності звернення", en: "Sentiment & Urgency Detection" },
        desc: { uk: "Автоматичне виявлення роздратованих клієнтів та миттєва передача їх звернень старшому менеджеру.", en: "Instant detection of dissatisfied customers with real-time escalation to senior managers." }
      },
      {
        title: { uk: "Формування чернеток для операторів", en: "Smart Response Drafting" },
        desc: { uk: "Для складних питань AI готує готовий контекст та точну чернетку відповіді, скорочуючи час обробки на 70%.", en: "Generates precise response drafts for human agents, reducing ticket handle time by 70%." }
      },
      {
        title: { uk: "Інтеграція з CRM & Helpdesk", en: "CRM & Helpdesk Integration" },
        desc: { uk: "Повна автоматична синхронізація історії спілкування та статусів заявок у CRM системі.", en: "Full automatic sync of conversation history and ticket statuses directly into CRM." }
      }
    ],
    techStack: ["OpenAI GPT-4o", "LangChain", "Node.js", "PostgreSQL", "CRM Webhooks"]
  },

  {
    slug: "doc-ai",
    badge: { uk: "DocAI & OCR", en: "DocAI & OCR" },
    title: { 
      uk: "Автоматизована обробка та аналіз документів (DocAI)", 
      en: "Automated Document Extraction & Analysis (DocAI)" 
    },
    subtitle: { 
      uk: "Миттєвий аналіз договорів, рахунків, накладних та паспортних даних з точністю розпізнавання до 99%", 
      en: "Instant processing of contracts, invoices, bills, and ID data with up to 99% extraction accuracy" 
    },
    bannerImage: "/assets/cards/doc-ai.jpg",
    overview: {
      uk: "DocAI дозволяє перетворити стоси паперових сканів та PDF-документів на структуровані дані у вашій ERP за лічені секунди.",
      en: "DocAI converts piles of paper scans and PDFs into structured JSON/ERP data in mere seconds."
    },
    challenge: {
      uk: "Ручне внесення даних з тисяч первинних документів та договорів щомісяця займало сотні людино-годин і супроводжувалося помилками при ручному вводі.",
      en: "Manual data entry from thousands of invoices and contracts each month consumed hundreds of man-hours and created frequent human entry errors."
    },
    solution: {
      uk: "Впроваджено інтелектуальний OCR-конвеєр з використанням мультимодальних моделей комп'ютерного бачення для автоматичної валідації печаток, підписів, реквізитів та табличних даних.",
      en: "Deployed an intelligent OCR pipeline utilizing multimodal vision models for automatic verification of stamps, signatures, banking details, and complex data tables."
    },
    tags: ["DocAI", "OCR", "Vision Models", "ERP Integration"],
    metrics: [
      { label: { uk: "Точність розпізнавання", en: "Extraction Accuracy" }, value: "99.1%" },
      { label: { uk: "Прискорення обробки", en: "Processing Speedup" }, value: "10x" },
      { label: { uk: "Економія людино-годин", en: "Hours Saved / Month" }, value: "350+ год" }
    ],
    keyFeatures: [
      {
        title: { uk: "Вилучення таблиць та специфікацій", en: "Table & Schedule Extraction" },
        desc: { uk: "Точне зчитування багаторадкових специфікацій та рахунків будь-якої складності.", en: "Flawless extraction of multi-row line items and financial statements of any complexity." }
      },
      {
        title: { uk: "Перевірка валідності та ризиків", en: "Compliance & Risk Audit" },
        desc: { uk: "AI порівнює реквізити та підсвічує ризиковані пункти або розбіжності у договорах.", en: "AI cross-checks credentials and highlights high-risk clauses or contract anomalies." }
      }
    ],
    techStack: ["Google Vision OCR", "Claude 3.5 Sonnet", "Python", "FastAPI", "Docker"]
  },

  {
    slug: "rag-knowledge-base",
    badge: { uk: "Корпоративний RAG", en: "Corporate RAG" },
    title: { 
      uk: "Корпоративна база знань та AI-пошук (RAG)", 
      en: "Enterprise Knowledge Base & AI Search (RAG)" 
    },
    subtitle: { 
      uk: "Безпечний пошук та відповіді за всією внутрішньою документацією компанії з посиланнями на першоджерела", 
      en: "Secure semantic search and exact answers across internal company docs with source citations" 
    },
    bannerImage: "/assets/cards/rag-ai.jpg",
    overview: {
      uk: "Система RAG дозволяє працівникам миттєво отримувати відповіді на внутрішні регламенти, технічні інструкції та баз знань без витоку конфіденційних даних.",
      en: "The RAG system enables employees to query company SOPs, technical guides, and internal wikis with zero data leakage risk."
    },
    challenge: {
      uk: "Пошук релевантної інформації серед тисяч регламентів у Notion, Confluence та локальних дисках займав у співробітників до 20% робочого часу.",
      en: "Searching for relevant policy information across Notion, Confluence, and shared drives consumed up to 20% of employees' working hours."
    },
    solution: {
      uk: "Створено локальну векторизовану базу знань на основі RAG (Retrieval-Augmented Generation) з рольовою моделлю доступу (RBAC) та точними цитатами сторінок джерел.",
      en: "Built a vectorized RAG engine with Role-Based Access Control (RBAC) and exact page-level source citations."
    },
    tags: ["RAG", "Vector DB", "Enterprise Search", "Security"],
    metrics: [
      { label: { uk: "Скорочення часу пошуку", en: "Search Time Reduction" }, value: "85%" },
      { label: { uk: "Безпека даних", en: "Data Security" }, value: "100% On-Prem / Hybrid" },
      { label: { uk: "Точність відповідей", en: "Answer Accuracy" }, value: "97.4%" }
    ],
    keyFeatures: [
      {
        title: { uk: "Точні посилання на джерела", en: "Exact Source Citation" },
        desc: { uk: "Кожна відповідь містить клікабельне посилання на konkretний документ та абзац.", en: "Every generated answer links directly to the specific document paragraph." }
      },
      {
        title: { uk: "Рольова модель доступу (RBAC)", en: "Role-Based Access Control" },
        desc: { uk: "Співробітники бачать відповіді лише з тих документів, до яких мають офіційний доступ.", en: "Employees receive answers filtered strictly according to their organizational clearance." }
      }
    ],
    techStack: ["Qdrant Vector DB", "LangChain", "OpenAI Embeddings", "Python", "FastAPI"]
  },

  {
    slug: "copilot-dev",
    badge: { uk: "Dev Productivity", en: "Dev Productivity" },
    title: { 
      uk: "Підвищення продуктивності команд розробки (Dev Copilot)", 
      en: "Developer Productivity & Code Copilot" 
    },
    subtitle: { 
      uk: "AI-помічники для автодоповнення коду, генерації модульних тестів та автоматичного проведення Code Review", 
      en: "AI tools for intelligent code completion, automated unit test generation, and pull request Code Reviews" 
    },
    bannerImage: "/assets/cards/copilot-dev.jpg",
    overview: {
      uk: "Впровадження Dev Copilot прискорило цикл розробки програмного забезпечення на 35% та підвищило покриття коду тестами без збільшення штату.",
      en: "Integrating Dev Copilot accelerated the software delivery lifecycle by 35% and increased unit test coverage effortlessly."
    },
    challenge: {
      uk: "Значний час витрачався на написання шаблонного коду, юніт-тестів та ручне проведення рев'ю коду старшими інженерами.",
      en: "Engineering teams spent substantial time drafting boilerplate code, writing unit tests, and manually reviewing pull requests."
    },
    solution: {
      uk: "Налаштовано захищене середовище AI Copilot з генерацією тестів, автодоповненням коду та ботом автоматичного перевірки безпеки у GitLab/GitHub CI/CD.",
      en: "Configured a secure AI Copilot environment featuring automated test generation, code completion, and CI/CD security review bots."
    },
    tags: ["DevOps", "AI Copilot", "Code Review", "CI/CD"],
    metrics: [
      { label: { uk: "Прискорення кодингу", en: "Coding Velocity" }, value: "+35%" },
      { label: { uk: "Покриття тестами", en: "Test Coverage" }, value: "+45%" },
      { label: { uk: "Швидкість Code Review", en: "Review Cycle Speed" }, value: "3x" }
    ],
    keyFeatures: [
      {
        title: { uk: "Автогенерація unit-тестів", en: "Automated Unit Testing" },
        desc: { uk: "AI аналізує функції та створює повні набори крайових тестів в один клік.", en: "AI inspects code functions and generates exhaustive edge-case test suites in one click." }
      },
      {
        title: { uk: "Аналіз вразливостей коду", en: "Vulnerability Scanning" },
        desc: { uk: "Автоматична перевірка коду на вразливості OWASP до потрапляння в продакшн.", en: "Automated pre-deployment scanning for OWASP vulnerabilities directly in Git PRs." }
      }
    ],
    techStack: ["GitHub Copilot Enterprise", "Anthropic Claude 3.5", "GitLab CI", "Python", "TypeScript"]
  },

  {
    slug: "business-analytics",
    badge: { uk: "Predictive Analytics", en: "Predictive Analytics" },
    title: { 
      uk: "Прогнозна бізнес-аналітика та AI BI Дашборди", 
      en: "Predictive Business Analytics & AI BI Dashboards" 
    },
    subtitle: { 
      uk: "Аналіз великих масивів даних, прогнозування попиту та автоматичне виявлення аномалій у продажах", 
      en: "Big data processing, demand forecasting, and automated sales anomaly detection" 
    },
    bannerImage: "/assets/cards/business-case-analytics.png",
    overview: {
      uk: "Платформа прогнозної аналітики трансформує сирі транзакційні дані у готові бізнес-інсайти та точні прогнози попиту.",
      en: "Predictive analytics platform converts raw transactional data into actionable business insights and demand forecasts."
    },
    challenge: {
      uk: "Складність обробки різнорідних даних про продажі та відсутність точного короткострокового прогнозування складських залишків.",
      en: "Difficulty consolidating fragmented sales channels and lack of accurate short-term inventory stock forecasting."
    },
    solution: {
      uk: "Побудовано машинні моделі машинного навчання для спрогнозування попиту та інтерактивні BI-дашборди з природно-мовним інтерфейсом запитів (Natural Language Query).",
      en: "Built ML forecasting models alongside interactive BI dashboards featuring Natural Language Querying (NLQ)."
    },
    tags: ["Machine Learning", "Big Data", "BI", "Forecasting"],
    metrics: [
      { label: { uk: "Точність прогнозу попиту", en: "Demand Forecast Accuracy" }, value: "94.2%" },
      { label: { uk: "Скорочення надлишків", en: "Overstock Reduction" }, value: "28%" },
      { label: { uk: "Швидкість побудови звітів", en: "Reporting Speed" }, value: "Instant" }
    ],
    keyFeatures: [
      {
        title: { uk: "Запити мовою спілкування (NLQ)", en: "Natural Language Queries" },
        desc: { uk: "Керівники запитують «Які продажі по регіону Х за тиждень?» і отримують готовий графік.", en: "Execs type 'Show Region X sales for last week' and receive instant visual charts." }
      }
    ],
    techStack: ["Python", "Pandas", "Scikit-Learn", "BigQuery", "PowerBI"]
  },

  {
    slug: "robotics",
    badge: { uk: "Robotics & Vision", en: "Robotics & Vision" },
    title: { 
      uk: "AI у робототехніці та комп'ютерному баченні", 
      en: "AI in Robotics & Computer Vision" 
    },
    subtitle: { 
      uk: "Навігація робототехнічних систем, розпізнавання об'єктів та контроль якості виробництва у реальному часі", 
      en: "Robotic system navigation, object recognition, and real-time manufacturing quality control" 
    },
    bannerImage: "/assets/cards/use-case-robot.png",
    overview: {
      uk: "Комп'ютерне бачення та автономне керування робототехнікою забезпечують безперервний контроль якості та безпеку виробничих процесів.",
      en: "Computer vision and autonomous robotics control ensure continuous quality inspection and operational safety."
    },
    challenge: {
      uk: "Високий відсоток шлюбу при візуальному контролі готової продукції людиною та потреба у безпечній навігації роверів на складі.",
      en: "High defect oversight during human visual product inspection and the need for safe warehouse rover navigation."
    },
    solution: {
      uk: "Розроблено edge-системи комп'ютерного бачення для миттєвої детекції дефектів на конвеєрі та AI-моделі для автономної орієнтації робототехнічних платформ.",
      en: "Engineered edge computer vision systems for real-time assembly line defect detection and autonomous robotic platform navigation."
    },
    tags: ["Computer Vision", "Edge AI", "Robotics", "Quality Control"],
    metrics: [
      { label: { uk: "Детекція дефектів", en: "Defect Detection Rate" }, value: "99.8%" },
      { label: { uk: "Затримка обробки (Edge)", en: "Edge Inference Latency" }, value: "< 10 мс" },
      { label: { uk: "Зниження виробничого шлюбу", en: "Manufacturing Waste Cut" }, value: "40%" }
    ],
    keyFeatures: [
      {
        title: { uk: "Аналіз відеопотоку у реальному часі", en: "Real-time Video Stream Analysis" },
        desc: { uk: "Виявлення найменших мікротріщин чи розбіжностей у розмірах на швидкості конвеєра.", en: "Detection of micro-cracks or dimensional variances at full assembly line speed." }
      }
    ],
    techStack: ["YOLOv8", "OpenCV", "TensorRT", "NVIDIA Jetson", "C++"]
  }
];
