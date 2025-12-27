import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'

import en from './locales/en'
import ja from './locales/ja'
import ko from './locales/ko'

export type SupportedLanguage = 'ko' | 'en' | 'ja'

const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['ko', 'en', 'ja']
const LANGUAGE_STORAGE_KEY = 'github-recap-language'

// 브라우저 언어 감지
function detectLanguage(): SupportedLanguage {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if (stored && SUPPORTED_LANGUAGES.includes(stored as SupportedLanguage)) {
        return stored as SupportedLanguage
    }

    const browserLang = navigator.language.split('-')[0]
    if (SUPPORTED_LANGUAGES.includes(browserLang as SupportedLanguage)) {
        return browserLang as SupportedLanguage
    }

    return 'en'
}

i18n.use(initReactI18next).init({
    resources: {
        ko: {translation: ko},
        en: {translation: en},
        ja: {translation: ja},
    },
    lng: detectLanguage(),
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
})

export function setLanguage(lang: SupportedLanguage) {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
    i18n.changeLanguage(lang)
}
