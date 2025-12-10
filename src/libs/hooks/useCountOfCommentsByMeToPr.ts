import {useQuery} from '@tanstack/react-query'

import {useUser} from '@/contexts/UserContext'
import {fetchCountOfCommentsByMeToPr} from '@/libs/github/pullRequests'
import {queryKeys} from '@/libs/queryKeys'

export function useCountOfCommentsByMeToPr(year: number) {
    const user = useUser()

    return useQuery({
        queryKey: queryKeys.useCountOfCommentsByMeToPr(year),
        queryFn: () => fetchCountOfCommentsByMeToPr(year),
        enabled: !!user,
    })
}
