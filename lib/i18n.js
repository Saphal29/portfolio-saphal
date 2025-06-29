import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from '../src/locales/en/translation.json';
import npTranslation from '../src/locales/np/translation.json';
import frTranslation from '../src/locales/fr/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      np: {
        translation: npTranslation,
      },
      fr: {
        translation: frTranslation,
      },
    },
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // react already escapes by default
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n; 