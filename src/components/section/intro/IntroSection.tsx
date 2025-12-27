import {useState} from 'react'

import {config} from '@config'
import {useQueryClient} from '@tanstack/react-query'
import {useTranslation} from 'react-i18next'

import {useUser} from '@/contexts/UserContext'
import {useYear} from '@/contexts/YearContext'
import {logout, logoutOAuth} from '@/libs/auth'

export default function IntroSection() {
    const {t} = useTranslation()
    const user = useUser()
    const {year} = useYear()
    const avatarUrl = user?.avatar_url || ''
    const userName = user?.user_name || ''
    const [showAvatar, setShowAvatar] = useState(false)
    const queryClient = useQueryClient()

    const handleLogout = async () => {
        if (config.auth.method === 'oauth') {
            await logoutOAuth(queryClient)
        } else {
            logout(queryClient)
        }
        window.location.reload()
    }

    return (
        <div className="snap-start h-screen flex items-center justify-center p-4 sm:p-8 relative overflow-hidden w-full">
            {/* Animated gradient orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
            <div
                className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse"
                style={{animationDelay: '1s'}}
            />
            <div
                className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse"
                style={{animationDelay: '2s'}}
            />
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />

            {/* Main content - Apple Event Style */}
            <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
                {/* Main title - Gradient & Bold with Glow */}
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-[-0.02em] mb-16 relative">
                    {/* Glow layers */}
                    <span
                        className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
                        aria-hidden="true"
                    >
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500">
                            {year}
                        </span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 mt-2">
                            GitHub Wrapped
                        </span>
                    </span>
                    <span
                        className="absolute inset-0 blur-2xl opacity-20 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400"
                        aria-hidden="true"
                    >
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
                            {year}
                        </span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 mt-2">
                            GitHub Wrapped
                        </span>
                    </span>

                    {/* Main text */}
                    <span className="relative block text-gray-200">{year}</span>
                    <span className="relative block text-gray-200 mt-2">GitHub Wrapped</span>
                </h1>

                {/* Profile button */}
                {userName && (
                    <div className="inline-flex flex-col items-center gap-3 mb-6">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white text-sm font-medium rounded-full shadow-lg">
                            {avatarUrl && (
                                <img
                                    src={avatarUrl}
                                    alt={userName}
                                    onLoad={() => setShowAvatar(true)}
                                    onError={() => setShowAvatar(false)}
                                    className={`w-6 h-6 rounded-full ring-2 ring-white/30 ${showAvatar ? 'opacity-100' : 'opacity-0 absolute'}`}
                                />
                            )}
                            <span>@{userName}</span>
                        </div>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="text-xs text-white/40 hover:text-white/70 transition-colors"
                        >
                            {t('auth.logout')}
                        </button>
                    </div>
                )}

                {/* Scroll CTA - Blue accent */}
                <div className="inline-flex flex-col items-center gap-3 text-blue-400 hover:text-blue-300 transition-colors cursor-default">
                    <span className="text-sm font-semibold">{t('intro.scrollHint')}</span>
                    <div className="flex items-center gap-3 animate-bounce">
                        <svg className="w-5 h-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                        <div className="flex gap-1.5">
                            <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs font-bold text-blue-300">
                                ↑
                            </kbd>
                            <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs font-bold text-blue-300 ">
                                ↓
                            </kbd>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
