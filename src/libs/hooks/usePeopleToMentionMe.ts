import {useQuery} from '@tanstack/react-query'

import {useUser} from '@/contexts/UserContext'
import {getUsername} from '@/libs/github/auth'
import {fetchMentionsByYear} from '@/libs/github/issues'
import {QUERY_PREFIX} from '@/libs/queryKeys'

/**
 * Fetches all mentions for a year and groups them by author.
 * Uses single request for most users, falls back to monthly for 1000+ mentions.
 */
export function usePeopleToMentionMe(year: number, limit = 10) {
    const user = useUser()

    const {data: currentUsername} = useQuery({
        queryKey: ['currentUser'],
        queryFn: getUsername,
        enabled: !!user,
    })

    const {data: allMentions, isFetching} = useQuery({
        queryKey: [QUERY_PREFIX.YEAR, year, 'usePeopleToMentionMe'] as const,
        queryFn: () => fetchMentionsByYear(year),
        enabled: !!user,
    })

    // Count mentions by the issue/PR author (excluding self-mentions)
    const mentionDetails = (() => {
        if (!allMentions || allMentions.length === 0 || !currentUsername) {
            return []
        }

        const mentionCounts = new Map<string, number>()

        for (const author of allMentions) {
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
