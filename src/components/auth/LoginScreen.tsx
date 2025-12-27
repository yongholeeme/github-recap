import {config} from '@config'

import {loginWithOAuth} from '@/libs/auth'

interface LoginScreenProps {
    onPATLogin: () => void
}

export default function LoginScreen({onPATLogin}: LoginScreenProps) {
    const currentYear = new Date().getFullYear()

    const handleOAuthLogin = async () => {
        await loginWithOAuth()
    }

    return (
        <div className="snap-start h-screen flex items-center justify-center p-4 sm:p-8 relative overflow-hidden w-full bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
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
                            {currentYear}
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
                            {currentYear}
                        </span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 mt-2">
                            GitHub Wrapped
                        </span>
                    </span>

                    {/* Main text */}
                    <span className="relative block text-gray-200">{currentYear}</span>
                    <span className="relative block text-gray-200 mt-2">GitHub Wrapped</span>
                </h1>

                {/* Login CTA - Blue accent */}
                <div className="inline-flex flex-col items-center gap-4">
                    {config.auth.method === 'oauth' ? (
                        <button
                            type="button"
                            onClick={handleOAuthLogin}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full hover:from-blue-400 hover:to-purple-400 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub로 시작하기
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={onPATLogin}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full hover:from-blue-400 hover:to-purple-400 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                                />
                            </svg>
                            토큰으로 시작하기
                        </button>
                    )}
                    <p className="text-sm text-white/40 max-w-xs text-center">
                        모든 데이터는 브라우저에서만 처리되며
                        <br />
                        서버에 저장되지 않습니다
                    </p>
                </div>
            </div>
        </div>
    )
}
