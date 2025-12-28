import {useTranslation} from 'react-i18next'

import ShareButton from '@/components/commons/ShareButton'
import {useYear} from '@/contexts/YearContext'

export default function EndingSection() {
    const {t} = useTranslation()
    const {year} = useYear()

    return (
        <div className="h-screen snap-start flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden w-full">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />

            <div className="relative z-10 text-center w-full max-w-7xl mx-auto space-y-8 sm:space-y-10 md:space-y-12 px-4">
                <div className="space-y-6 sm:space-y-8">
                    <div className="space-y-4 sm:space-y-6">
                        <h3 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 tracking-tight leading-none drop-shadow-2xl">
                            {t('outro.yearLabel', {year})}
                        </h3>
                        <h4 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-xl">
                            {t('outro.thankYou')}
                        </h4>
                    </div>
                </div>

                <div className="space-y-6 sm:space-y-8 max-w-3xl mx-auto">
                    <p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-bold leading-relaxed">
                        {t('outro.message1')}
                        <br />
                        {t('outro.message2')}
                    </p>
                    <p className="text-lg sm:text-xl md:text-2xl text-white/70 font-medium">{t('outro.message3')}</p>
                </div>

                {/* Share Button */}
                <div className="pt-4">
                    <ShareButton />
                </div>

                {/* Credit */}
                <a
                    href="https://github.com/yongholeeme/github-recap"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full"
                >
                    <span className="text-xs text-white/50">Made with</span>
                    <span className="text-xs text-red-400">❤️</span>
                </a>
            </div>
        </div>
    )
}
