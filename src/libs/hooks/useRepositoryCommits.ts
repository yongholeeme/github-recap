import {useMemo} from 'react'

import {useQueries} from '@tanstack/react-query'

import {useUser} from '@/contexts/UserContext'
import {fetchCommitsByMonth, type RepositoryCommitStats} from '@/libs/github/commits'
import {queryKeys} from '@/libs/queryKeys'

export function useRepositoryCommits(year: number) {
    const user = useUser()

    const monthQueries = useQueries({
        queries: Array.from({length: 12}, (_, i) => ({
            queryKey: [...queryKeys.useRepositoryCommits(year), i + 1],
            queryFn: () => fetchCommitsByMonth(year, i + 1),
            staleTime: 1000 * 60 * 5,
        })),
    })

    const isFetching = monthQueries.some((r) => r.isFetching)
    const isError = monthQueries.some((r) => r.isError)
    const error = monthQueries.find((r) => r.error)?.error

    const data = useMemo(() => {
        if (isFetching || !user) {
            return undefined
        }

        // Process all commits from all months
        const repoMap = new Map<string, RepositoryCommitStats & {username: string}>()

        for (const result of monthQueries) {
            const commits = result.data ?? []

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
        }

        // Sort by commit count descending
        return Array.from(repoMap.values()).sort((a, b) => b.commitCount - a.commitCount)
    }, [isFetching, user, monthQueries])

    return {
        data,
        isFetching,
        isError,
        error,
    }
}
