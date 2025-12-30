/// <reference types="vite/client" />

const githubUrl = import.meta.env.VITE_GITHUB_URL || 'https://github.com'
const githubApiUrl = import.meta.env.VITE_GITHUB_API_URL || 'https://api.github.com'
const isSelfHosted = githubUrl !== 'https://github.com'

export const config = {
    basepath: import.meta.env.VITE_BASE_PATH || '/',
    github: {
        url: githubUrl,
        apiUrl: githubApiUrl,
        isSelfHosted,
    },
    supabase: {
        url: import.meta.env.VITE_SUPABASE_URL || '',
        anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
    },
    auth: {
        // self-hosted: PAT 기반 인증, 그 외: OAuth 기반 인증
        method: isSelfHosted ? 'pat' : 'oauth',
    },
} as const

export type AuthMethod = 'pat' | 'oauth'
