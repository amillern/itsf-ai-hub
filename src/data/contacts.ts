export interface ContactPageData {
  pageTitle: string;
  sectionTitle: string;
  sectionDescription: string;
  emailTitle: string;
  email: string;
  linkedinTitle: string;
  linkedinUrl: string;
  formTitle: string;
  formButtonText: string;
}

export const contactsData: ContactPageData = {
  pageTitle: "Контакти",
  sectionTitle: "Обговоримо вашу задачу",
  sectionDescription: "Не всі сценарії застосування штучного інтелекту можна описати готовими кейсами. Розкажіть про ваші бізнес-процеси, виклики або ідеї - допоможемо визначити можливості використання AI саме для вашої організації.",
  emailTitle: "Напишіть нам",
  email: "ai-hub@itsmartflex.com",
  linkedinTitle: "Зв'яжіться через LinkedIn",
  linkedinUrl: "https://linkedin.com",
  formTitle: "Форма зворотного зв'язку",
  formButtonText: "Обговорити задачу"
};
