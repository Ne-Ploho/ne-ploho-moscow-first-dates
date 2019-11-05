import { setupI18n } from '@lingui/core';
import { LocaleResolver, DETECTORS, TRANSFORMERS } from 'locales-detector';

import catalogEn from '../locales/en.js';
import catalogRu from '../locales/ru.js';

export default function initI18n(location) {
  return setupI18n({
    locales: ['en', 'ru'],
    locale: getDefaultLang(location),
    catalogs: {
      en: catalogEn,
      ru: catalogRu
    }
  });
}

export function getDefaultLang(location) {
  const locales = new LocaleResolver(
    [
      new DETECTORS.UrlDetector('l', location),
      typeof window === 'undefined' ? null : new DETECTORS.NavigatorDetector()
    ].filter(Boolean),
    [
      new TRANSFORMERS.LanguageOnlyTransformer(),
      new TRANSFORMERS.AllowOnlyTransformer(['ru', 'en'])
    ]
  ).getLocales();
  return locales[0] || 'ru';
}
