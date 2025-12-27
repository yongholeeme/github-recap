import {useState} from 'react'

import {useTranslation} from 'react-i18next'

import {setLanguage} from '@/libs/i18n'

const FLAGS = {
    ko: '🇰🇷',
    en: '🇺🇸',
} as const

const LANGUAGE_NAMES = {
    ko: '한국어',
    en: 'English',
} as const

export default function LanguageSwitcher() {
    const {i18n} = useTranslation()
    const currentLang = i18n.language as 'ko' | 'en'
    const [isOpen, setIsOpen] = useState(false)

    const handleSelect = (lang: 'ko' | 'en') => {
        setLanguage(lang)
        setIsOpen(false)
    }

    return (
        <>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="w-10 h-10 flex items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
                {FLAGS[currentLang]}
            </button>

            {/* Modal Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                >
                    {/* Modal Content */}
                    <div
                        className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-2xl p-6 shadow-2xl min-w-[280px]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-lg font-bold text-white mb-4 text-center">Language</h3>
                        <div className="flex flex-col gap-2">
                            {(['ko', 'en'] as const).map((lang) => (
                                <button
                                    key={lang}
                                    type="button"
                                    onClick={() => handleSelect(lang)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                        currentLang === lang
                                            ? 'bg-blue-500/20 border border-blue-500/50 text-white'
                                            : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    <span className="text-2xl">{FLAGS[lang]}</span>
                                    <span className="font-medium">{LANGUAGE_NAMES[lang]}</span>
                                    {currentLang === lang && (
                                        <svg
                                            className="w-5 h-5 ml-auto text-blue-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
