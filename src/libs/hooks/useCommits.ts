import {useQuery} from '@tanstack/react-query'

import {useUser} from '@/contexts/UserContext'
import {fetchCommitsByYear} from '@/libs/github/commits'
import {QUERY_PREFIX} from '@/libs/queryKeys'

/**
 * Fetches all commits for a year using a single request.
 * Falls back to monthly requests only if total exceeds 1000 (GitHub limit).
 *
 * Optimization: Reduced from 12 parallel requests to 1 request for most users.
 */
export function useCommits(year: number) {
    const user = useUser()

    const query = useQuery({
        queryKey: [QUERY_PREFIX.YEAR, year, 'useCommits'] as const,
        queryFn: () => fetchCommitsByYear(year),
        enabled: !!user,
    })

    return {
        data: query.data ?? [],
        isFetching: query.isFetching,
    }
}
