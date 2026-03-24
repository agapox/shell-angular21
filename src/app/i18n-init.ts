import { getStoredLanguage, setGlobalLanguage } from '@platform/i18n';

export function initLanguage() {
  const lang = getStoredLanguage();
  setGlobalLanguage(lang);
}
