import {useQueries} from '@tanstack/react-query'

import {useUser} from '@/contexts/UserContext'
import {fetchCommitsByMonth} from '@/libs/github/commits'
import {queryKeys} from '@/libs/queryKeys'

export function useCommits(year: number) {
    const user = useUser()

    const queries = useQueries({
        queries: Array.from({length: 12}, (_, i) => i + 1).map((month) => ({
            queryKey: queryKeys.useCommits(year, month),
            queryFn: () => fetchCommitsByMonth(year, month),
            enabled: !!user,
        })),
    })

    return {
        data: queries.flatMap((query) => query.data ?? []),
        isFetching: queries.some((query) => query.isFetching),
    }
}
