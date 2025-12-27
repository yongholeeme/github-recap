import {useState} from 'react'

import {useTranslation} from 'react-i18next'

import {setLanguage, type SupportedLanguage} from '@/libs/i18n'

const LANGUAGES: {code: SupportedLanguage; flag: string; name: string}[] = [
    {code: 'ko', flag: '🇰🇷', name: '한국어'},
    {code: 'en', flag: '🇺🇸', name: 'English'},
    {code: 'ja', flag: '🇯🇵', name: '日本語'},
]

export default function LanguageSwitcher() {
    const {i18n} = useTranslation()
    const currentLang = i18n.language as SupportedLanguage
    const [isOpen, setIsOpen] = useState(false)

    const currentFlag = LANGUAGES.find((l) => l.code === currentLang)?.flag ?? '🌐'

    const handleSelect = (lang: SupportedLanguage) => {
        setLanguage(lang)
        setIsOpen(false)
    }

    return (
        <>
            {/* Floating Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="fixed top-6 right-6 sm:top-8 sm:right-8 z-50 w-12 h-12 flex items-center justify-center bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-full text-xl shadow-xl hover:shadow-2xl hover:border-white/30 transition-all duration-300"
            >
                {currentFlag}
            </button>

            {/* Modal Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                >
                    {/* Modal Content */}
                    <div
                        className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-2xl p-6 shadow-2xl min-w-[280px]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-lg font-bold text-white mb-4 text-center">Language</h3>
                        <div className="flex flex-col gap-2">
                            {LANGUAGES.map((lang) => (
                                <button
                                    key={lang.code}
                                    type="button"
                                    onClick={() => handleSelect(lang.code)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                        currentLang === lang.code
                                            ? 'bg-blue-500/20 border border-blue-500/50 text-white'
                                            : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    <span className="text-2xl">{lang.flag}</span>
                                    <span className="font-medium">{lang.name}</span>
                                    {currentLang === lang.code && (
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
