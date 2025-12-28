import {useQueries, useQuery} from '@tanstack/react-query'

import {useUser} from '@/contexts/UserContext'
import {getUsername} from '@/libs/github/auth'
import {fetchMentionsByMonth} from '@/libs/github/issues'
import {queryKeys} from '@/libs/queryKeys'

export function usePeopleToMentionMe(year: number, limit = 10) {
    const user = useUser()

    const {data: currentUsername} = useQuery({
        queryKey: ['currentUser'],
        queryFn: getUsername,
        enabled: !!user,
    })

    const queries = useQueries({
        queries: Array.from({length: 12}, (_, i) => i + 1).map((month) => ({
            queryKey: queryKeys.usePeopleToMentionMe(year, month),
            queryFn: () => fetchMentionsByMonth(year, month),
            enabled: !!user,
        })),
    })

    const allMentions = queries.flatMap((query) => query.data ?? [])
    const isFetching = queries.some((query) => query.isFetching)

    // Count mentions by the issue/PR author (excluding self-mentions)
    const mentionDetails = (() => {
        if (allMentions.length === 0 || !currentUsername) {
            return []
        }

        const mentionCounts = new Map<string, number>()

        for (const item of allMentions) {
            const author = item
            // Exclude self-mentions
            if (author && author !== currentUsername) {
                mentionCounts.set(author, (mentionCounts.get(author) || 0) + 1)
            }
        }

        // Sort and return top mentions
        return Array.from(mentionCounts.entries())
            .map(([username, count]) => ({username, count}))
            .sort((a, b) => b.count - a.count)
            .slice(0, limit)
    })()

    return {
        data: mentionDetails,
        isFetching,
    }
}
