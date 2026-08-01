import { ui, defaultLang, type Lang } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ui[lang][key] || ui[defaultLang][key] || key;
  };
}

export function localizePath(pathname: string, targetLang: Lang): string {
  // Strip leading /en if present
  let cleanPath = pathname.replace(/^\/en/, '');
  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }
  
  if (targetLang === 'uk') {
    return cleanPath || '/';
  }

  // English prefix
  if (cleanPath === '/') {
    return '/en/';
  }

  return `/en${cleanPath}`;
}
