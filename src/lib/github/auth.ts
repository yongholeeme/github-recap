import {Octokit} from 'octokit'

import {config} from '@/../config'
import {PAT_STORAGE_KEY} from '@/constants/storage'

export async function getOctokit(): Promise<Octokit> {
    const pat = sessionStorage.getItem(PAT_STORAGE_KEY)

    if (!pat) {
        throw new Error('GitHub Personal Access Token이 없습니다. 다시 로그인해주세요.')
    }

    return new Octokit({
        auth: pat,
        baseUrl: config.github.apiUrl,
    })
}

let cachedUsername: string | null = null
let usernamePromise: Promise<string> | null = null

export async function getUsername(): Promise<string> {
    if (cachedUsername) {
        return cachedUsername
    }

    if (usernamePromise) {
        return usernamePromise
    }

    usernamePromise = (async () => {
        try {
            const octokit = await getOctokit()
            const {data} = await octokit.rest.users.getAuthenticated()
            cachedUsername = data.login
            return cachedUsername
        } finally {
            usernamePromise = null
        }
    })()

    return usernamePromise
}
