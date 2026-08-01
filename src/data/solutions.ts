export interface AdvantageCard {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface TaskBadge {
  id: string;
  label: string;
}

export interface TechBadge {
  id: string;
  label: string;
  icon?: string;
}

export interface FeaturedPromoCase {
  badgeLabel: string;
  title: string;
  subtitle: string;
  description: string;
  linkText: string;
}

// Exact "Чому Al Hub від IT SmartFlex?" cards from Figma
export const advantagesData: AdvantageCard[] = [
  {
    id: "practical-experience",
    title: "Перевірено на практиці",
    description: "Усі кейси базуються на реальному досвіді застосування ШІ в бізнес- та операційних процесах",
  },
  {
    id: "real-results",
    title: "Реальний результат",
    description: "Кожен кейс демонструє не технологію заради технології, а конкретну задачу та отриману цінність.",
  },
  {
    id: "scalable-solutions",
    title: "Масштабовані рішення",
    description: "Підходи та сценарії, які можуть бути адаптовані для різних галузей і функцій.",
  }
];

// Exact "Оберіть задачу, яку хочете вирішити" pills from Figma
export const taskBadgesData: TaskBadge[] = [
  { id: "1", label: "Підвищення продуктивності" },
  { id: "2", label: "Автоматизація процесів" },
  { id: "3", label: "Оптимізація витрат" },
  { id: "4", label: "Покращення клієнтського сервісу" },
  { id: "5", label: "Прискорення розробки ПЗ" },
  { id: "6", label: "Аналіз та пошук інформації" },
  { id: "7", label: "Підвищення якості комунікацій" },
  { id: "8", label: "Скорочення часу виконання задач" },
  { id: "9", label: "Підтримка прийняття рішень" },
];

// Exact "Практичний досвід AI-розробок" tech stack items from Figma
export const techBadgesData: TechBadge[] = [
  { id: "azure", label: "Microsoft Azure AI" },
  { id: "aws", label: "AWS AI Services" },
  { id: "copilot", label: "Copilot" },
  { id: "elevenlabs", label: "ElevenLabs" },
  { id: "google-ai", label: "Google AI Services" },
  { id: "gen-ai", label: "GenAI-рішення" },
];

// Exact Hero Promo Case from Figma
export const promoCaseData: FeaturedPromoCase = {
  badgeLabel: "Кейс / Інфраструктура",
  title: "Автоматична генерація звітів з інфраструктури",
  subtitle: "Роботизований збір інфраструктурних метрик та миттєва генерація бізнес-звітів для менеджменту.",
  description: "Після проведення навантажувальних або регресійних тестів інженери витрачають години на вивантаження даних із баз моніторингу, ручне зведення графіків, пошук інтервалів деградації та оформлення презентацій для керівництва.",
  linkText: "Читати детальніше"
};
