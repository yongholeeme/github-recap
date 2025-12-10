import {useQuery} from '@tanstack/react-query'

import {useUser} from '@/contexts/UserContext'
import {fetchCountOfPrsApprovedByMe} from '@/libs/github/pullRequests'
import {queryKeys} from '@/libs/queryKeys'

export function useCountOfPrsApprovedByMe(year: number) {
    const user = useUser()

    return useQuery({
        queryKey: queryKeys.useCountOfPrsApprovedByMe(year),
        queryFn: () => fetchCountOfPrsApprovedByMe(year),
        enabled: !!user,
    })
}
