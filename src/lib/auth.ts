import {Octokit} from 'octokit'

import type {User} from '@/types/user'
import type {QueryClient} from '@tanstack/react-query'

import {config} from '@/../config'
import {PAT_STORAGE_KEY, REACT_QUERY_CACHE_STORAGE_KEY} from '@/constants/storage'

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
