import {config} from '@config'
import {Octokit} from 'octokit'

import type {User} from '@/types/user'
import type {QueryClient} from '@tanstack/react-query'

import {PAT_STORAGE_KEY, REACT_QUERY_CACHE_STORAGE_KEY} from '@/constants/storage'
import {supabase} from '@/libs/supabase'

/**
 * Validate PAT and fetch user information
 */
export async function loginWithPAT(patToken: string): Promise<User> {
    if (!patToken.trim()) {
        throw new Error('토큰을 입력해주세요')
    }

    try {
        const octokit = new Octokit({auth: patToken, baseUrl: config.github.apiUrl})
        const {data} = await octokit.rest.users.getAuthenticated()

        // Save PAT to sessionStorage
        sessionStorage.setItem(PAT_STORAGE_KEY, patToken)

        return {
            avatar_url: data.avatar_url,
            user_name: data.login,
        }
    } catch {
        throw new Error('유효하지 않은 토큰입니다')
    }
}

/**
 * Check if user is already logged in and fetch user info
 */
export async function checkAuth(): Promise<User | null> {
    const pat = sessionStorage.getItem(PAT_STORAGE_KEY)

    if (!pat) {
        return null
    }

    try {
        const octokit = new Octokit({auth: pat, baseUrl: config.github.apiUrl})
        const {data} = await octokit.rest.users.getAuthenticated()

        return {
            avatar_url: data.avatar_url,
            user_name: data.login,
        }
    } catch {
        // Invalid PAT, remove it
        sessionStorage.removeItem(PAT_STORAGE_KEY)
        return null
    }
}

/**
 * Logout user and clear all cached data
 */
export function logout(queryClient: QueryClient): void {
    // Clear all React Query cache
    queryClient.clear()

    // Clear localStorage cache
    localStorage.removeItem(REACT_QUERY_CACHE_STORAGE_KEY)

    // Clear session token
    sessionStorage.removeItem(PAT_STORAGE_KEY)
}

/**
 * Clear cache before login (for switching users)
 */
export function clearCacheBeforeLogin(queryClient: QueryClient): void {
    // Clear localStorage cache
    localStorage.clear()

    // Clear React Query cache
    queryClient.clear()
}

/**
 * Login with GitHub OAuth via Supabase
 */
export async function loginWithOAuth(): Promise<void> {
    const {error} = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            scopes: 'repo read:user',
            redirectTo: window.location.origin,
        },
    })

    if (error) {
        throw new Error(error.message)
    }
}

/**
 * Check OAuth session and get user info
 */
export async function checkOAuthSession(): Promise<User | null> {
    // URL fragment에서 OAuth 토큰 파싱 시도 (redirect 후)
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const accessToken = hashParams.get('access_token')
    const providerToken = hashParams.get('provider_token')

    if (accessToken && providerToken) {
        // URL에서 토큰을 찾았으면 세션 설정
        const {error} = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: hashParams.get('refresh_token') || '',
        })

        if (!error) {
            // URL fragment 정리
            window.history.replaceState(null, '', window.location.pathname)

            // provider_token 저장
            sessionStorage.setItem(PAT_STORAGE_KEY, providerToken)

            const {
                data: {user},
            } = await supabase.auth.getUser()

            if (user) {
                return {
                    avatar_url: user.user_metadata.avatar_url,
                    user_name: user.user_metadata.user_name,
                }
            }
        }
    }

    // Check existing session
    const {
        data: {session},
    } = await supabase.auth.getSession()

    if (!session) {
        return null
    }

    // Check provider_token from session
    if (session.provider_token) {
        sessionStorage.setItem(PAT_STORAGE_KEY, session.provider_token)
    }

    // Require login if no token stored in sessionStorage
    const storedToken = sessionStorage.getItem(PAT_STORAGE_KEY)
    if (!storedToken) {
        return null
    }

    const user = session.user
    return {
        avatar_url: user.user_metadata.avatar_url,
        user_name: user.user_metadata.user_name,
    }
}

/**
 * Logout from OAuth session
 */
export async function logoutOAuth(queryClient: QueryClient): Promise<void> {
    await supabase.auth.signOut()
    logout(queryClient)
}
