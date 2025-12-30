import {useMemo} from 'react'

import {useUser} from '@/contexts/UserContext'
import {type RepositoryCommitStats} from '@/libs/github/commits'
import {useCommits} from '@/libs/hooks/useCommits'

/**
 * Groups commits by repository and returns sorted stats.
 * Reuses useCommits data to avoid duplicate API calls.
 */
export function useRepositoryCommits(year: number) {
    const user = useUser()
    const {data: commits, isFetching} = useCommits(year)

    const data = useMemo(() => {
        if (isFetching || !user || commits.length === 0) {
            return undefined
        }

        // Group commits by repository
        const repoMap = new Map<string, RepositoryCommitStats & {username: string}>()

        for (const commit of commits) {
            // Extract repository info from commit URL
            // URL format: https://github.com/{owner}/{repo}/commit/{sha}
            const urlParts = commit.url.split('/')
            const owner = urlParts[3]
            const repo = urlParts[4]
            const repoFullName = `${owner}/${repo}`

            if (repoMap.has(repoFullName)) {
                repoMap.get(repoFullName)!.commitCount++
            } else {
                repoMap.set(repoFullName, {
                    repo: repoFullName,
                    owner,
                    username: user.user_name,
                    commitCount: 1,
                })
            }
        }

        // Sort by commit count descending
        return Array.from(repoMap.values()).sort((a, b) => b.commitCount - a.commitCount)
    }, [isFetching, user, commits])

    return {
        data,
        isFetching,
        isError: false,
        error: null,
    }
}
