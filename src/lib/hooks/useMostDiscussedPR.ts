import {useQuery} from '@tanstack/react-query'

import {useUser} from '@/contexts/UserContext'
import {fetchMostDiscussedPR} from '@/lib/github/pullRequests'
import {queryKeys} from '@/lib/queryKeys'


export function useMostDiscussedPR(year: number) {
    const user = useUser()

    return useQuery({
        queryKey: queryKeys.useMostDiscussedPR(year),
        queryFn: () => fetchMostDiscussedPR(year),
        enabled: !!user,
    })
}
