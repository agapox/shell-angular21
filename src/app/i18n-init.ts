import { getStoredLanguage, setGlobalLanguage } from '../../../platform-i18n/language-bus';

export function initLanguage() {
  const lang = getStoredLanguage();
  setGlobalLanguage(lang);
}
