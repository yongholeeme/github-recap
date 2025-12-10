import {useQuery} from '@tanstack/react-query'

import {useUser} from '@/contexts/UserContext'
import {fetchMostDiscussedIssue} from '@/libs/github/issues'
import {queryKeys} from '@/libs/queryKeys'

export function useMostDiscussedIssue(year: number) {
    const user = useUser()

    return useQuery({
        queryKey: queryKeys.useMostDiscussedIssue(year),
        queryFn: () => fetchMostDiscussedIssue(year),
        enabled: !!user,
    })
}
