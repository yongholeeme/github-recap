import {useState} from 'react'

import {config} from '@config'

import type {User} from '@/types/user'

import LoginModalLayout from '@/components/commons/LoginModalLayout'
import {loginWithPAT} from '@/libs/auth'

interface PATLoginModalProps {
    isOpen: boolean
    onClose: () => void
    onLogin: (user: User) => void
}

export default function PATLoginModal({isOpen, onClose, onLogin}: PATLoginModalProps) {
    const [patToken, setPATToken] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    if (!isOpen) {
        return null
    }

    const tokenUrl = `${new URL(config.github.url).origin}/settings/tokens/new?scopes=repo,read:user`

    const handleLogin = async () => {
        setError('')
        setIsLoading(true)

        try {
            const user = await loginWithPAT(patToken)
            onLogin(user)
            onClose()
        } catch (e) {
            setError(e instanceof Error ? e.message : '유효하지 않은 토큰입니다')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <LoginModalLayout
            onClose={onClose}
            title="로그인"
            description={
                <>
                    Personal Access Token으로
                    <br />
                    올해의 활동을 확인하세요
                </>
            }
        >
            <div>
                <label htmlFor="pat" className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub Personal Access Token
                </label>
                <input
                    id="pat"
                    type="password"
                    value={patToken}
                    onChange={(e) => setPATToken(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    placeholder="ghp_xxxxxxxxxxxx"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    disabled={isLoading}
                />
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                <p className="mt-2 text-xs text-gray-500">
                    <a
                        href={tokenUrl}
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
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? '확인 중...' : '계속하기'}
            </button>
        </LoginModalLayout>
    )
}
