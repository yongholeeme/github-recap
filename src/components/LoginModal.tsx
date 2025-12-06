import {useState} from 'react'

import type {User} from '@/types/user'

import {config} from '@/../config'
import {loginWithOAuth, loginWithPAT} from '@/lib/auth'

interface LoginModalProps {
    isOpen: boolean
    onClose: () => void
    onLogin: (user: User) => void
}

const isPATAuth = config.auth.method === 'pat'

export default function LoginModal({isOpen, onClose, onLogin}: LoginModalProps) {
    const [patToken, setPATToken] = useState('')
    const [patError, setPATError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    if (!isOpen) {return null}

    // Generate token URL based on config
    const getTokenUrl = () => {
        const url = new URL(config.github.url)
        const origin = url.origin
        // For GitHub Enterprise, the URL pattern is the same
        return `${origin}/settings/tokens/new?scopes=repo,read:user`
    }

    const handlePATLogin = async () => {
        setPATError('')
        setIsLoading(true)

        try {
            const user = await loginWithPAT(patToken)
            onLogin(user)
            onClose()
        } catch (error) {
            setPATError(error instanceof Error ? error.message : '유효하지 않은 토큰입니다')
            console.error('PAT validation error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleOAuthLogin = async () => {
        setIsLoading(true)
        try {
            await loginWithOAuth()
        } catch (error) {
            setPATError(error instanceof Error ? error.message : 'OAuth 로그인에 실패했습니다')
            console.error('OAuth login error:', error)
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="relative max-w-md w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-3xl opacity-20" />
                <div className="relative bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-2xl">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            로그인
                        </h2>
                        <p className="text-gray-600 text-sm">
                            {isPATAuth ? (
                                <>
                                    Personal Access Token으로
                                    <br />
                                    올해의 활동을 확인하세요
                                </>
                            ) : (
                                <>
                                    GitHub 계정으로
                                    <br />
                                    올해의 활동을 확인하세요
                                </>
                            )}
                        </p>
                    </div>

                    <div className="space-y-4">
                        {isPATAuth ? (
                            <>
                                <div>
                                    <label htmlFor="pat" className="block text-sm font-medium text-gray-700 mb-2">
                                        GitHub Personal Access Token
                                    </label>
                                    <input
                                        id="pat"
                                        type="password"
                                        value={patToken}
                                        onChange={(e) => setPATToken(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handlePATLogin()
                                            }
                                        }}
                                        placeholder="ghp_xxxxxxxxxxxx"
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                                        disabled={isLoading}
                                    />
                                    {patError && <p className="mt-2 text-sm text-red-600">{patError}</p>}
                                    <p className="mt-2 text-xs text-gray-500">
                                        <a
                                            href={getTokenUrl()}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            토큰 생성하기
                                        </a>{' '}
                                        (필요한 권한: repo, read:user)
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={handlePATLogin}
                                    disabled={isLoading}
                                    className="w-full px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? '확인 중...' : '계속하기'}
                                </button>
                            </>
                        ) : (
                            <>
                                {patError && <p className="text-sm text-red-600 text-center">{patError}</p>}
                                <button
                                    type="button"
                                    onClick={handleOAuthLogin}
                                    disabled={isLoading}
                                    className="w-full px-8 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    {isLoading ? '로그인 중...' : 'GitHub로 로그인'}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
