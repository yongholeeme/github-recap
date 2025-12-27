import {useState} from 'react'

import {config} from '@config'
import {useTranslation} from 'react-i18next'


import type {User} from '@/types/user'

import LoginModalLayout from '@/components/commons/LoginModalLayout'
import {loginWithPAT} from '@/libs/auth'

interface PATLoginModalProps {
    isOpen: boolean
    onClose: () => void
    onLogin: (user: User) => void
}

export default function PATLoginModal({isOpen, onClose, onLogin}: PATLoginModalProps) {
    const {t} = useTranslation()
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
            setError(e instanceof Error ? e.message : t('auth.patLogin.invalidToken'))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <LoginModalLayout
            onClose={onClose}
            title={t('auth.patLogin.title')}
            description={
                <>
                    {t('auth.patLogin.description')}
                    <br />
                    {t('auth.patLogin.description2')}
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
                    placeholder={t('auth.patLogin.enterToken')}
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
                        {t('auth.patLogin.createToken')}
                    </a>{' '}
                    {t('auth.patLogin.requiredScopes')}
                </p>
            </div>
            <button
                type="button"
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? t('auth.patLogin.checking') : t('auth.patLogin.continue')}
            </button>
        </LoginModalLayout>
    )
}
