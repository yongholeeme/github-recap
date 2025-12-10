import {useQuery} from '@tanstack/react-query'

import {useUser} from '@/contexts/UserContext'
import {fetchCountOfPrsReviewedByMe} from '@/libs/github/pullRequests'
import {queryKeys} from '@/libs/queryKeys'

export function useCountOfPrsReviewedByMe(year: number) {
    const user = useUser()

    return useQuery({
        queryKey: queryKeys.useCountOfPrsReviewedByMe(year),
        queryFn: () => fetchCountOfPrsReviewedByMe(year),
        enabled: !!user,
    })
}
