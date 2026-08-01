export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  tagline: string;
  description: string;
  siteUrl: string;
  nav: NavItem[];
  company: {
    name: string;
    copyright: string;
    email: string;
    phone: string;
    address: string;
    instagram: string;
    linkedin: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "IT SmartFlex AI Hub",
  title: "IT SmartFlex AI Hub | Екосистема практичних AI-рішень",
  tagline: "IT SmartFlex",
  description: "Реальні приклади та сценарії застосування AI на основі практичного досвіду команди фахівців IT SmartFlex",
  siteUrl: "https://ai.itsmartflex.com",
  nav: [
    { label: "Головна", href: "/" },
    { label: "Каталог AI-рішень", href: "/catalog/" },
    { label: "Контакти", href: "/contacts/" },
  ],
  company: {
    name: "IT SmartFlex",
    copyright: "© 2026 IT SmartFlex. Всі права захищені.",
    email: "contact_us@itsmartflex.com",
    phone: "+380 (44) 123-45-67",
    address: "м. Київ, Україна",
    instagram: "https://www.instagram.com/itsmartflex/",
    linkedin: "https://ua.linkedin.com/company/it-smartflex",
  },
};
