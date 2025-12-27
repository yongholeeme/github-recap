import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'

import en from './locales/en'
import ko from './locales/ko'

const LANGUAGE_STORAGE_KEY = 'github-recap-language'

// 브라우저 언어 감지
function detectLanguage(): string {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if (stored && ['ko', 'en'].includes(stored)) {
        return stored
    }

    const browserLang = navigator.language.split('-')[0]
    return browserLang === 'ko' ? 'ko' : 'en'
}

i18n.use(initReactI18next).init({
    resources: {
        ko: {translation: ko},
        en: {translation: en},
    },
    lng: detectLanguage(),
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
})

export function setLanguage(lang: 'ko' | 'en') {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
    i18n.changeLanguage(lang)
}
